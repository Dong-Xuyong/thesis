"""Section layout for Literature Review PDFs (matches Ch. 3 sections)."""

from __future__ import annotations

import os

PDF_ROOT_NAME = "Literature Review PDFs"

SECTIONS: list[tuple[str, str, range]] = [
    (
        "01_Telecom_Anomaly_Detection",
        "Anomaly Detection in Telecommunications Networks",
        range(1, 5),
    ),
    (
        "02_Grouped_Time_Series",
        "Anomaly Detection in Grouped Time Series",
        range(5, 9),
    ),
    (
        "03_Hierarchical_Time_Series",
        "Anomaly Detection in Hierarchical Time Series",
        range(9, 13),
    ),
    (
        "04_Matrix_Profile_Discord_Detection",
        "Matrix Profile and Time-Series Discord Detection",
        range(13, 17),
    ),
    (
        "05_Combinatorial_Optimisation_Time_Series",
        "Combinatorial Optimisation for Selecting Time Series",
        range(17, 21),
    ),
    (
        "06_Combinatorial_Optimisation_Anomaly_Detection",
        "Combinatorial Optimisation in Anomaly Detection",
        range(21, 25),
    ),
    (
        "07_Genetic_Programming_Grammatical_Evolution",
        "Genetic Programming and Grammatical Evolution",
        range(25, 29),
    ),
]

PDF_FILENAMES: dict[int, str] = {
    1: "Gonzalez_2024_One_Model_to_Find_Them_All.pdf",
    2: "Sultan_2018_CDR_Anomaly_Detection.pdf",
    3: "Burgueno_2020_Online_Anomaly_Detection_Mobile_Networks.pdf",
    4: "Lemaire_2024_Early_Detection_Critical_Urban_Events.pdf",
    5: "Mefleh_2025_Beyond_the_Norm_Mahalanobis.pdf",
    6: "Garcia_Gonzalez_2022_MILETS_DC-VAE.pdf",
    7: "Hua_2022_GenAD.pdf",
    8: "Oguz_2022_Multi_Tiered_Cellular_Networks.pdf",
    9: "Hong_2012_Tiresias.pdf",
    10: "Huang_2026_HYDRA.pdf",
    11: "Wolff_2022_Composite_Anomaly_Hierarchical_Search.pdf",
    12: "Pang_2022_Hierarchical_Forecasting_Root_Cause.pdf",
    13: "Yeh_2017_Matrix_Profile_Unifying_View.pdf",
    14: "Zhu_2016_Matrix_Profile_II.pdf",
    15: "Keogh_2005_HOT_SAX.pdf",
    16: "Law_2019_STUMPY.pdf",
    17: "Xue_2016_EC_Feature_Selection_Survey.pdf",
    18: "Linares_Barrera_2024_Evolutionary_FS_Forecasting.pdf",
    19: "Yeh_2016_Matrix_Profile_I.pdf",
    20: "Contreras_2024_GA_Financial_Feature_Selection.pdf",
    21: "He_2021_Mining_Anomalies_Subspaces.pdf",
    22: "Zhang_2020_Many_Objective_EC_AD_Feature_Selection.pdf",
    23: "Riahi_Madvar_2021_MI_Subspace_Outlier_Detection.pdf",
    24: "Li_2022_VAE_GA_Outlier_Detection.pdf",
    25: "Koza_1992_Genetic_Programming_Book.pdf",
    26: "ONeill_2001_Grammatical_Evolution.pdf",
    27: "ONeill_2003_Grammatical_Evolution_Book.pdf",
    28: "Fenton_2017_PonyGE2.pdf",
    29: "VanOnsem_2023_Variable_Length_Motif_Discovery.pdf",
    30: "Pietron_2025_AD-NEv_Neuroevolution_Anomaly_Detection.pdf",
}

ARTICLE_TO_SECTION_DIR: dict[int, str] = {}
for folder, _title, nums in SECTIONS:
    for n in nums:
        ARTICLE_TO_SECTION_DIR[n] = folder
ARTICLE_TO_SECTION_DIR[29] = "04_Matrix_Profile_Discord_Detection"
ARTICLE_TO_SECTION_DIR[30] = "05_Combinatorial_Optimisation_Time_Series"


def pdf_relpath(article_num: int) -> str | None:
    filename = PDF_FILENAMES.get(article_num)
    folder = ARTICLE_TO_SECTION_DIR.get(article_num)
    if not filename or not folder:
        return None
    return f"{folder}/{filename}"


def pdf_abspath(pdf_root: str, article_num: int) -> str | None:
    rel = pdf_relpath(article_num)
    return os.path.join(pdf_root, rel) if rel else None


def pdf_by_article_str_keys() -> dict[str, str]:
    return {
        str(n): rel
        for n in PDF_FILENAMES
        if (rel := pdf_relpath(n)) is not None
    }
