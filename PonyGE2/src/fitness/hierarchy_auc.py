import pandas as pd
from fitness.base_ff_classes.base_ff import base_ff
from algorithm.parameters import params
from fitness.mobai_utils import pheno_to_dict, rm_empty_agg, create_final_hierarchy, calculate_AUC_hierarchy

class hierarchy_auc(base_ff):
    """
    Fitness function
    """

    maximise = True

    def __init__(self):
        # Initialise base fitness function class.
        super().__init__()
        print("Reading data...")
        self.df = pd.read_csv(params["DATASET_TRAIN"])
        print("Done!")

    def evaluate(self, ind,**kwargs):
        # print(ind.phenotype)

        hierarchy = pheno_to_dict(ind.phenotype)
        if len(hierarchy) == 0:
            return self.default_fitness

        # TODO
        #rm_ft_hierarchy = rm_empty_agg(self.df,hierarchy,empty_db="../datasets/Mobai/empty_combinations.csv")
        #print("rm: ",rm_ft_hierarchy)
        #if len(rm_ft_hierarchy) == 0:
        #    return

        aggregated_df = create_final_hierarchy(self.df, hierarchy)

        auc_hierarchy = calculate_AUC_hierarchy(aggregated_df)

        return auc_hierarchy