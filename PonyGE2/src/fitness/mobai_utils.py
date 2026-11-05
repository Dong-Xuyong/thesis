import pandas as pd
from scipy.stats import norm
import re
import json
from sklearn.metrics import roc_auc_score
import stumpy
from sklearn.preprocessing import MinMaxScaler
import numpy as np

def pheno_to_dict(pheno):

    # Initialize hierarchies and other variables
    hierarchies = []
    current_hierarchy = []
    current_conditions = []
    last_indentation = 0

    # Mapping of letters to their descriptions
    mapping = {
    'A': 'Call Type',
    'B': 'Event Type',
    'C': 'Subscriber Type',
    'D': 'Traffic Type',
    'E': 'Service Type',
    'F': 'Partner Description'
    }

    available_categories = json.load(open("../datasets/Mobai/available_categories.json"))

    # Compile the regex pattern
    pattern = re.compile(r'([A-F])(\d+)')

    # Helper function to get category value

    # Split the text into lines and iterate over each line
    lines = pheno.splitlines()
    skipping_level = 999
    for line in lines:
        stripped_line = line.strip()
        if not stripped_line:
            continue
        # Find the current indentation level
        current_indentation = (len(line) - len(stripped_line))//2

        if current_indentation >= skipping_level:
            continue
        else:
            skipping_level = 999

        # Find all matches in the current line
        matches = pattern.findall(stripped_line)
        if matches:
            # Process the matches and build conditions
            for match in matches:
                category = mapping[match[0]]
                value = available_categories[category][int(match[1])]
                condition = (category, value)

                # Compare current and last indentation levels.
                indentation_diff = current_indentation - last_indentation
                # If not going deeper, remove latest condition(s), depending on how many levels we are popping out from
                if indentation_diff<=0:
                    # print(current_conditions)
                    
                    # print("removing")
                    # print(current_conditions[:indentation_diff-1])
                    
                    
                    current_conditions = current_conditions[:indentation_diff-1]
                last_indentation = current_indentation

                # If this line's condition acts on a category already selected for,
                # ignore and treat the parent as a leaf
                # print(line, current_indentation, skipping_level, condition)
                if category in [c[0] for c in current_conditions]:
                    # print("Skipping")
                    current_hierarchy.append(current_conditions)
                    # Skip all lines until previous level of indentation
                    skipping_level = current_indentation
                    # Correct the last level of indentation to the last VALID one
                    last_indentation = current_indentation-1
                    continue

                # Add this line's condition to the current list of conditions 
                current_conditions.append(condition)

                # If it's a leaf, write it to the hierarchy
                if stripped_line.endswith('END'):
                    current_hierarchy.append(current_conditions)

        # To handle text with multiple hierarchies
        elif current_indentation == 0:
            if current_hierarchy:
                hierarchies.append(current_hierarchy)
            current_hierarchy = []
            current_conditions = []

    if current_hierarchy:
        hierarchies.append(current_hierarchy)

    """
    # Example of output
    for hierarchy in hierarchies:
        print("Parsed {} hierarchies".format(len(hierarchies)))
        print("Hierarchy:")
        for conditions in hierarchy:
            print(conditions)
    """

    # Return first hierarchy, with conditions converted to a dictionary
    if len(hierarchies)==0:
        return [{}]
    hierarchy = []
    for conditions in hierarchies[0]:
        hierarchy.append({c[0]:c[1] for c in conditions})

    return hierarchy


def rm_empty_agg(df,ft_hierarchy,empty_db=None):

    empty_list = pd.read_csv(empty_db)

    items = []
    print("Removing the empty aggregations from the hierarchy!")

    if empty_db is not None:
        for conditions in ft_hierarchy:
            #TODO
            items.append(conditions)

    else:
        for conditions in ft_hierarchy:
            if contain_condition(df, conditions):
                items.append(conditions)

    return items

def contain_condition(df, conditions):
    if not conditions:
        return False
    pd_conditions = " & ".join([f'`{key}` == "{value}"' for key, value in conditions.items()])
    return df.eval(pd_conditions).any()


def create_final_hierarchy(df, rm_ft_hierarchy, is_train=True):
    aggregated_df = {}
    
    for i, conditions in enumerate(rm_ft_hierarchy, start=1):
        agg_df = filter_and_aggregate(df, conditions, hierarchy=True)

        if not agg_df.empty:
            agg_df = set_leaf(agg_df, is_train=is_train)

        aggregated_df[f'leaf_{i}'] = agg_df

    return aggregated_df

def filter_and_aggregate(df, filter_conditions, hierarchy=False):
    """
    Filters the DataFrame based on given conditions and aggregates by summing up a specified column.
    
    Args:
    - df: The original DataFrame.
    - filter_conditions: A dictionary where keys are column names and values are the values to filter on.
    
    Returns:
    - A new DataFrame with the filtered and aggregated data.
    """

    # Create a query string with the filter conditions
    query_str = " and ".join([f"`{col}` == '{val}'" for col, val in filter_conditions.items()])

    # Apply the query to filter the DataFrame and make a copy
    if query_str is not "":
        df_fil = df.query(query_str).copy()
    else:
        df_fil = df.copy()

    # Drop the columns used for filtering
    df_fil.drop(columns=list(filter_conditions.keys()),inplace=True)

    # Group by 'TIMESTAMP' and sum up the '#Events' column
    if hierarchy:
        df_agg = df_fil.groupby('TIMESTAMP')[['#Events','Anomaly']].sum().reset_index()
    else:
        df_agg = df_fil.groupby('TIMESTAMP')['#Events'].sum().reset_index()

    return df_agg

def set_leaf(df, is_train=True):
    """
    Processes a DataFrame containing anomaly data and ensures it has a consistent timestamp range
    with 1-hour intervals. Fills in missing timestamps and ensures the `Anomaly` column is properly
    formatted (1 for positive values, 0 otherwise).

    Args:
        df (pd.DataFrame): The input DataFrame containing at least the following columns:
            - `TIMESTAMP`: Timestamps for the data points.
            - `#Events`: Number of events recorded at each timestamp.
            - `Anomaly`: Anomaly values (positive values indicate anomalies).

    Returns:
        pd.DataFrame: A new DataFrame with the following columns:
            - `TIMESTAMP`: A complete range of timestamps from `2022-07-18 00:00:00` to `2022-10-13 21:00:00`
              at 1-hour intervals.
            - `#Events`: Number of events, filled with 0 for missing timestamps.
            - `Anomaly`: Anomaly values, with positive values set to 1 and missing values filled with 0.
    """
    # Convert Anomaly column to binary values (1 for positive values, 0 otherwise)
    df['Anomaly'] = df['Anomaly'].apply(lambda x: 1 if x > 0 else x)
    
    # Define start and end timestamps
    if is_train:
        start = '2022-07-18 00:00:00'
        end = '2022-09-14 18:00:00'
    else:
        start = '2022-09-14 19:00:00'
        end = '2022-10-13 21:00:00'
    
    # Generate the timestamp range at 1-hour intervals
    timestamp_range = pd.date_range(start=start, end=end, freq='h')
    
    # Create the default DataFrame
    df_default = pd.DataFrame({
        'TIMESTAMP': timestamp_range,
        '#Events': 0,
        'Anomaly': 0
    })
    
    # Ensure the TIMESTAMP column in the input DataFrame is of type datetime64[ns]
    df["TIMESTAMP"] = df["TIMESTAMP"].astype("datetime64[ns]")

    # Merge the input DataFrame with the default DataFrame based on 'TIMESTAMP'
    df_default = pd.merge(df_default, df, on='TIMESTAMP', how='left', suffixes=('', '_y'))
    
    # Overwrite columns with values from df if available
    for column in df.columns[1:]:  # assuming 'TIMESTAMP' is at index 0
        df_default[column] = df_default[column + '_y'].combine_first(df_default[column])
    
    # Drop helper columns
    df_default.drop(columns=[col for col in df_default.columns if '_y' in col], inplace=True)
    
    return df_default


def leaf_scores(df, m=168):
    """
    Score a leaf series with the Matrix Profile.

    Args:
        df (pd.DataFrame): Input DataFrame containing '#Events' and 'Anomaly' columns.
        m (int): Window size for Matrix Profile calculation. Default is 168.

    Returns:
        tuple: (y_true, scores) aligned arrays, scores normalised to [0, 1],
        or None if the input is invalid.
    """
    # Check if required columns exist
    if not all(col in df.columns for col in ["#Events", "Anomaly"]):
        print("Aviso: DataFrame deve conter as colunas '#Events' e 'Anomaly'.")
        return None
    
    # Extract time series and check length
    ts = df["#Events"].to_numpy().astype(float)
    if len(ts) < m:
        print(f"Aviso: Série temporal muito curta para calcular o Matrix Profile com m={m}.")
        return None
    
    # Calculate Matrix Profile
    try:
        matrix_profile = stumpy.stump(ts, m=m, ignore_trivial=True)
        mp_values = matrix_profile[:, 0]  # Extract Matrix Profile values
        mp_values = np.diff(mp_values)  # Calculate differences of Matrix Profile
    except Exception as e:
        
        print(f"Erro ao calcular o Matrix Profile: {e}")
        return None
    
    # Normalize Matrix Profile values to [0, 1]
    mp_min, mp_max = np.min(mp_values), np.max(mp_values)
    if mp_max == mp_min:
        mp_values_normalized = np.zeros_like(mp_values)
    else:
        mp_values_normalized = (mp_values - mp_min) / (mp_max - mp_min)
    
    y_true = df["Anomaly"][m:].to_numpy().astype(float)
    return y_true, mp_values_normalized


def calculate_AUC(df, m=168):
    """
    Calculate the AUC for a given DataFrame using the Matrix Profile.

    Args:
        df (pd.DataFrame): Input DataFrame containing '#Events' and 'Anomaly' columns.
        m (int): Window size for Matrix Profile calculation. Default is 168.

    Returns:
        float: AUC score or NaN if the input is invalid.
    """
    scored = leaf_scores(df, m)
    if scored is None:
        return float('nan')
    y_true, y_pred_prob = scored
    
    # Check for at least two classes in y_true
    if len(np.unique(y_true)) < 2:
        print(f"Aviso: Apenas uma classe presente em y_true. Classes: {np.unique(y_true)}")
        return float('nan')
    
    # Calculate AUC
    try:
        auc = roc_auc_score(y_true, y_pred_prob)
    except Exception as e:
        print(f"Erro ao calcular o AUC: {e}")
        return float('nan')
    
    return auc

def calculate_AUC_hierarchy(aggregated_df):
    """
    Calculate the weighted mean AUC for all leaf nodes with at least two classes.

    Args:
        aggregated_df (dict): Dictionary of DataFrames, where each key is a leaf name.

    Returns:
        float: Weighted mean AUC score or NaN if no valid leaf nodes are found.
    """
    # Filter leaf nodes with at least two classes
    valid_leafs = {
        leaf_name: df_leaf
        for leaf_name, df_leaf in aggregated_df.items()
        if len(df_leaf["Anomaly"][168:].unique()) >= 2
    }
    
    # Check if there are valid leaf nodes
    if not valid_leafs:
        print("Aviso: Nenhum df_leaf com duas classes encontrado.")
        return float('nan')
    
    # Calculate total events for valid leaf nodes
    total_events = sum(df_leaf["#Events"].sum() for df_leaf in valid_leafs.values())
    
    # Calculate weighted AUC scores
    auc_scores = {}
    for leaf_name, df_leaf in valid_leafs.items():
        weight = df_leaf["#Events"].sum() / total_events
        auc_score = calculate_AUC(df_leaf)
        # print(leaf_name,weight, auc_score)
        
        if not np.isnan(auc_score):  # Only include valid AUC scores
            auc_scores[leaf_name] = auc_score * weight
    
    # Calculate weighted mean AUC
    auc_score_mean = sum(auc_scores.values())
    return auc_score_mean

# def calculate_AUC(df):    
#     df_aux = df.copy()
#     mean = df_aux["#Events"].mean()
#     std = df_aux["#Events"].std()
#     df_aux['z_score'] = abs(df_aux['#Events'] - mean) / std
#     df_aux['quantile'] = norm.cdf(df_aux['z_score'])
#     auc = roc_auc_score(df_aux['Anomaly'],df_aux['quantile'])
#     # print(auc.size)
#     return auc
