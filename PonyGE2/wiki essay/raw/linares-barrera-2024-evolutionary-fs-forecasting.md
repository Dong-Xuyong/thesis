---
article_number: 18
slug: linares-barrera-2024-evolutionary-fs-forecasting
pdf: Linares_Barrera_2024_Evolutionary_FS_Forecasting.pdf
extraction_status: ok
last_updated: 2026-06-26
---

# Raw PDF text — Article 18 (linares-barrera-2024-evolutionary-fs-forecasting)

- **Source PDF:** `Literature Review PDFs/05_Combinatorial_Optimisation_Time_Series/Linares_Barrera_2024_Evolutionary_FS_Forecasting.pdf`
- **Wiki source page:** [[../sources/linares-barrera-2024-evolutionary-fs-forecasting|linares-barrera-2024-evolutionary-fs-forecasting]]

## Extracted text

--- Page 1 ---
Evolutionary Feature Selection for Time-Series Forecasting
M. L. Linares-Barrera
Department of Computer Languages
and Systems, University of Seville
Seville, Spain
mlinares@us.es
M. J. Jiménez-Navarro
Department of Computer Languages
and Systems, University of Seville
Seville, Spain
mjimenez3@us.es
I. Sofia Brito
Escola Superior de Tecnologia e
Gestão, Instituto Politécnico de Beja
Beja, Portugal
Centre of Technology and Systems
(UNINOVA)
Caparica, Portugal
isabel.sofia@ipbeja.pt
J.C. Riquelme
Department of Computer Languages
and Systems, University of Seville
Seville, Spain
riquelme@us.es
M. Martínez-Ballesteros
Department of Computer Languages
and Systems, University of Seville
Seville, Spain
mariamartinez@us.es
ABSTRACT
In machine learning, feature selection is crucial for pinpointing the
key subset of features that enhances interpretability and preserves
or boosts the model’s original performance. Filter methods, which
assess features using statistical metrics, are particularly notable.
Recently, a novel metric called Conditional Dependence Coefficient
has been proposed to measure the dependence between subsets of
variables.
This paper introduces a novel filter feature selection method
that integrates the Conditional Dependence Coefficient metric with
an evolutionary algorithm to find the optimal feature subset. This
approach combines the adaptability of genetic algorithms with the
strength of an intuitive metric. Unlike many filter-based methods,
our technique does not rely on parameters directly linked to the
number of features (like thresholds). Moreover, it evaluates the col-
lective merit of feature subsets rather than individual significance.
We conducted tests on six different multivariate time-series
datasets to address the forecasting challenge, determining the rele-
vant lags. Considering no selection as baseline, experimental results
indicate that our approach is competitive in terms of efficacy while
demonstrating a reduction in the number of features selected.
CCS CONCEPTS
• Computing methodologies→ Genetic algorithms; Neural
networks; Feature selection; Supervised learning by regres-
sion.
KEYWORDS
Machine Learning, Feature Selection, Genetic Algorithm, Regres-
sion, Time-Series Forecasting
Permission to make digital or hard copies of part or all of this work for personal or
classroom use is granted without fee provided that copies are not made or distributed
for profit or commercial advantage and that copies bear this notice and the full citation
on the first page. Copyrights for third-party components of this work must be honored.
For all other uses, contact the owner/author(s).
SAC ’24, April 8–12, 2024, Avila, Spain
© 2024 Copyright held by the owner/author(s).
https://doi.org/10.1145/3605098.3636191
ACM Reference Format:
M. L. Linares-Barrera, M. J. Jiménez-Navarro, I. Sofia Brito, J.C. Riquelme,
and M. Martínez-Ballesteros. 2024. Evolutionary Feature Selection for Time-
Series Forecasting. In The 39th ACM/SIGAPP Symposium on Applied Com-
puting (SAC ’24), April 8–12, 2024, A vila, Spain. ACM, New York, NY, USA,
Article 13463.315, 3 pages. https://doi.org/10.1145/3605098.3636191
1 INTRODUCTION
In the era of big data [14], where most of the sampled data often
comprise an overwhelming number of attributes, feature selection
becomes crucial in machine learning analysis. It involves identifying
relevant feature subsets that provide several benefits while enhanc-
ing or closely maintaining baseline efficacy. These improvements
encompass reducing computational complexity [12], mitigating the
curse of dimensionality [15], and enhancing model interpretability
[4].
A standard categorization of feature selection techniques [ 2]
distinguishes between filter, wrapper [8], and embedded [9] meth-
ods. Within filter methods, the Conditional Dependence Coefficient
(CODEC) [1] stands out as a competitive metric for capturing the
dependence between feature subsets and the target variable.
The CODEC metric identifies linear and nonlinear dependen-
cies, making it invaluable in intricate inter-feature contexts. This
is particularly evident in time series forecasting, where complex
relationships between past events and the future are often observed.
This paper introduces a novel approach that integrates CODEC
as the core of a filter method powered by a Genetic Algorithm
(GA). The proposed algorithm, named SEISEN (Selecting features
through Evolution-Inspired Search based on dependence Estima-
tioN), focuses on assessing the collective importance of subsets,
moving away from the traditional individual rankings approach
and offering the advantage of not requiring threshold tuning.
The structure of this paper is as follows. Section 2 delves into re-
lated works on feature selection research. Section 3 details the main
components of the proposal. Section 4 describes the experimental
methodology. Section 5 presents the results obtained across six
time-series datasets. Finally, Section 6 summarizes the key findings
and presents our future work within this subject area.
395

--- Page 2 ---
SAC ’24, April 8–12, 2024, Avila, Spain M. L. Linares-Barrera, M. J. Jiménez-Navarro, I. Sofia Brito, J.C. Riquelme, and M. Martínez-Ballesteros
Figure 1: Methodology workflow.
2 RELATED WORKS
Feature selection has emerged as a highly active research area
in recent years. There is a growing effort towards incorporating
feature selection methods to boost the predictive performance of
neural networks. A notable study is the research conducted by
Khemphila et al. [10], which combines an information gain score
and a Multilayer Perceptron for heart disease diagnosis. Similarly,
Niu et al. [13] combined the nonlinear feature selection algorithm
RReliefF with several neural network architectures.
Among the various feature selection approaches, filter meth-
ods are gaining significant prominence. A relevant example is the
CODEC metric, proposed in 2021 [1]. This novel methodology has
inspired further research, exploring its potential applications in var-
ious fields, such as identifying genes with potentially far-reaching
implications in cancer [11].
In the area of time-series feature selection, some recent con-
tributions include the application of the Fourier transform as a
filter-based method [
5] and the integration of a feature selection
layer into neural networks as an embedded approach [9].
3 DESCRIPTION OF SEISEN ALGORITHM
This section highlights our main contribution. Briefly, we utilize
a GA with the CODEC metric as the fitness criterion to evaluate
individuals in the population. The GA heuristic is designed to op-
timize exploration in the feature space, and applying the CODEC
metric assists in pinpointing essential features for selection.
We adopt an inverse strategy using GA to minimize the CODEC
measure. Consequently, features with the least dependence are
marked after the GA process. We retain the original set of features
and discard those identified by the GA for removal.
We now delve deeper into the core components of SEISEN:
• Fitness Function: the CODEC metric assesses the depen-
dence between a subset of predictors𝑍 and the target vari-
able𝑌 . It is defined as:
𝐶𝑂𝐷𝐸𝐶(𝑌,𝑍) :=
Í𝑁
𝑖=1

𝑁 min

𝑅𝑖,𝑅 𝑀(𝑖)

−𝐿2
𝑖

Í𝑁
𝑖=1𝐿𝑖(𝑁−𝐿𝑖)
(1)
where𝑁 is the sample size,𝑅𝑖 is the index𝑗 such that𝑌𝑗≤𝑌𝑖,
𝐿𝑖 is the index 𝑗 such that𝑌𝑗 ≥ 𝑌𝑖, and 𝑀(𝑖) is the index
of the nearest observation to𝑍𝑖. We use the CODEC metric
as fitness function, aiming to minimize CODEC to deter-
mine which features should be eliminated (less dependent
features).
• Individual Codification: Each individual in the popula-
tion is represented by a binary vector, with ’1’ indicating a
feature’s exclusion.
• Elitism: This strategy ensures the preservation of the top
30% of high-performing individuals from each generation,
contributing to the retention of effective solutions.
• Crossover: We adopted a multi-parent approach, using
two-point crossovers involving three parents randomly cho-
sen from the elite population. Additionally, we have imple-
mented measures to prevent incest in the selection process.
• Mutation: It is applied with a 60% probability, altering the
binary values in 80% of an individual’s genes to increase
randomness.
Note that the parameters for the GA are not optimized, as our
results suggest that the parameters are good enough to obtain
competitive results in the tested datasets.
4 METHODOLOGY AND EXPERIMENTATION
This section provides an in-depth look at the methodology used
throughout the experimentation, as depicted in Figure 1, which
includes the following steps:
(1) Data Partitioning: The initial dataset is divided into train-
ing, validation, and test sets (proportions 70%-15%-15%).
(2) Preprocessing: This involves the creation of fixed-sized
windows, standardization, and feature selection. Each time
series is divided into non-overlapping windows of a fixed size
and then flattened into a one-dimensional vector. Standard-
ization is applied to every partition. In experiments related
to the SEISEN proposal, we employ a feature selection algo-
rithm on the training set to eliminate less relevant features.
(3) Hyperparameter Tuning: This step involves optimizing
the hyperparameters of the neural network on the validation
set through Bayesian optimization, a state-of-the-art tech-
nique [16] used to efficiently explore the hyperparameter
space and identify configurations that lead to optimal results.
(4) Training and Evaluation: The neural network is trained
over the selected features using the optimal hyperparameters,
followed by the evaluation of the model on the test set.
We used a fully connected neural network (MLP) with one or two
hidden layers, each containing 50 to 100 ReLU-activated neurons.
The Adam optimizer is employed with a learning rate ranging from
0.0001 to 0.01. Early stopping is implemented to prevent overfitting.
The experiments will be conducted with and without feature
selection, collecting metrics for comparison.
396

--- Page 3 ---
SEISEN: Evolutionary Feature Selection for Time-Series SAC ’24, April 8–12, 2024, Avila, Spain
5 RESULTS AND DISCUSSION
In this section, we review the experimental results. Section 5.1
introduces the datasets, and Section 5.2 shows the effectiveness of
SEISEN and provides the analysis of the results focusing on the
efficacy and the number of selected features.
5.1 Datasets
Our approach is tested on the time-series datasets summarized in
Table 1.
The Torneo dataset [7] provides data on four pollutants and three
meteorological attributes gathered by hourly sensors in the Torneo
region (Seville). This dataset has been divided into four subsets
(Torneo𝐶𝑂, Torneo𝑁𝑂 2, Torneo𝑂3, and Torneo𝑃𝑀 10). The goal is
to predict the next hour’s pollutant.
The Electricity dataset [6] contains hourly measurements of elec-
tricity consumption in Portugal. The target variable is the prediction
of energy use for the next hour.
The traffic dataset [3] collects road occupancy rates, which range
from 0 to 1, monitored every 10 minutes by various sensors on the
San Francisco Bay Area highways. Its primary objective is to predict
conditions one hour ahead.
Table 1: Summary of datasets.
Dataset #
Instances #
Features T
arget
T
orneo [7] 2798 168 Ne
xt hour pollutant
Ele
ctricity [6] 1095 7704 Ele
ctricity consumption
T
raffic [3] 730 20688 Ne
xt hour occupancy
5.2 Discussion of results
Table 2 presents the effectiveness of our proposal compared to the
baseline no-selection results.
Table 2: Efficacy results and Number of features selected.
Efficacy
(MAE) Numb
er of Features
Datasets
No Selection SEISEN No
Selection SEISEN
T
orneoO3 1.387
1.406 168
56
TorneoCO 1.292
1.523 168
69
TorneoNO2 1.400 1.380 168
64
TorneoPM10 1.274 1.260 168
58
Electricity 207.193 194.400 7704
3813
Traffic 0.008 0.007 20688
10316
Notably, in four time-series datasets (TorneoNO2, TorneoPM10,
Electricity, and Traffic), our approach slightly surpasses the MAE
achieved by the model using all features. Based on these results,
our method appears especially effective for datasets with a larger
number of features.
The SEISEN approach not only consistently reduces the number
of features, thereby enhancing the interpretability, but it also does so
without compromising the original effectiveness. This demonstrates
its robustness for time-series data and offers a distinct advantage
in preserving model efficiency while simplifying its complexity.
6 CONCLUSIONS AND FUTURE WORKS
In this study, we introduced the SEISEN algorithm, which is tailored
to leverage the CODEC metric for feature selection. The experi-
mental results demonstrate that SEISEN provides a reliable feature
selection for time-series data. The proposal excels at pinpointing
pivotal features with substantial predictive power, enhancing model
interpretability while ensuring competitive efficacy.
Future research will focus on enhancing the proposal by employ-
ing Principal Component Analysis and parallelization for improved
scalability. This refined approach will be applied to omic data to
facilitate the identification of disease-related biomarkers.
ACKNOWLEDGMENTS
The authors would like to thank the Spanish Ministry of Science and
Innovation for the support under the projects PID2020-117954RB-
C22/AEI/10.13039/501100011033 and TED2021-131311B-C21.
REFERENCES
[1]
M. Azadkia and S. Chatterjee. 2021. A simple measure of conditional dependence.
The Annals of Statistics 49, 6 (2021), 3070–3102.
[2] V. Bolón-Canedo, A. Alonso-Betanzos, L. Morán-Fernández, and B. Cancela.
2022. Feature selection: From the past to the future. In Proceedings of Advances
in Selected Artificial Intelligence Areas: World Outstanding Women in Artificial
Intelligence. Springer, 11–34.
[3] CDT. 2015. California department of transportation.
[4] J. Dunn, L. Mingardi, and Y.D. Zhuo. 2021. Comparing interpretability and
explainability for feature selection.
[5] F. J. Galán-Sales, P. Reina-Jiménez, M. Carranza-García, and J. M. Luna-Romera.
2023. An Approach to Enhance Time Series Forecasting by Fast Fourier Trans-
form. In Proceedings of the International Conference on Soft Computing Models in
Industrial and Environmental Applications. Springer, 259–268.
[6] R. Godahewa, C. Bergmeir, G. Webb, R. Hyndman, and P. Montero-Manso. 2020.
Electricity Hourly Dataset.
[7] A. Gómez-Losada, G. Asencio–Cortés, F. Martínez–Álvarez, and J.C. Riquelme.
2018. A novel approach to forecast urban surface-level ozone considering hetero-
geneous locations and limited information. Environmental Modelling & Software
110 (2018), 52–61.
[8] M.J. Jiménez-Navarro, C. Restrepo-Estrada, L. Melgar-García, and D. Gutierrez-
Aviles. 2023. Feature Selection Guided by CVOA Metaheuristic for Deep Neural
Networks: Application to Multivariate Time Series Forecasting. In Proceedings of
18th International Conference on Soft Computing Models in Industrial and Environ-
mental Applications. Springer, 209–218.
[9] M. J. Jiménez-Navarro, M. Martínez-Ballesteros, I. Brito, F. Martínez-Álvarez, and
G. Cortés. 2022. Feature-Aware Drop Layer (FADL): A Nonparametric Neural
Network Layer for Feature Selection. InProceedings of the International Conference
on Soft Computing Models in Industrial and Environmental Applications. Springer,
557–566.
[10] A. Khemphila and V. Boonjing. 2011. Heart Disease Classification Using Neural
Network and Feature Selection. Proceedings of the International Conference on
Systems Engineering 21 (2011), 406–409.
[11] M. L. Linares-Barrera, M. Martínez-Ballesteros, J. M. García-Heredia, and J. C.
Riquelme. 2023. A Feature Selection and Association Rule Approach to Identify
Genes Associated with Metastasis and Low Survival in Sarcoma. In Proceedings
of the International Conference on Hybrid Artificial Intelligence Systems. Springer,
731–742.
[12] J. Miao and L. Niu. 2016. A survey on feature selection. Procedia computer science
91 (2016), 919–926.
[13] T. Niu, J. Li, W. Wei, and H. Yue. 2022. A hybrid deep learning framework
integrating feature selection and transfer learning for multi-step global horizontal
irradiation forecasting. Applied Energy 326 (2022), 119964.
[14] M. Rong, D. Gong, and X. Gao. 2019. Feature selection and its use in big data:
challenges, methods, and trends. IEEE Access 7 (2019), 19709–19725.
[15] S. Velliangiri and S. Alagumuthukrishnan. 2019. A review of dimensionality
reduction techniques for efficient computation. Procedia Computer Science 165
(2019), 104–111.
[16] J. Wu, X. Chen, H. Zhang, L. Xiong, H. Lei, and S. Deng. 2019. Hyperparame-
ter optimization for machine learning models based on Bayesian optimization.
Journal of Electronic Science and Technology 17, 1 (2019), 26–40.
397
