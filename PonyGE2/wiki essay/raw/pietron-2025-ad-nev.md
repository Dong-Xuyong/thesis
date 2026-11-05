---
article_number: 30
slug: pietron-2025-ad-nev
pdf: Pietron_2025_AD-NEv_Neuroevolution_Anomaly_Detection.pdf
extraction_status: ok
last_updated: 2026-10-01
---

# Raw PDF text — Article 30 (pietron-2025-ad-nev)

- **Source PDF:** `Literature Review PDFs/05_Combinatorial_Optimisation_Time_Series/Pietron_2025_AD-NEv_Neuroevolution_Anomaly_Detection.pdf`
- **Wiki source page:** [[../sources/pietron-2025-ad-nev|pietron-2025-ad-nev]]

## Extracted text

--- Page 1 ---
AD-NE V: A S CALABLE MULTI-LEVEL NEUROEVOLUTION
FRAMEWORK FOR MULTIVARIATE ANOMALY DETECTION ∗
Marcin Pietron
Institute of Electronics
AGH-UST
Krakow
pietron@agh.edu.pl
Dominik Zurek
Institute of Computer Science
AGH-UST
Krakow
dzurek@agh.edu.pl
Kamil Faber
Institute of Computer Science
AGH-UST
Krakow
kfaber@agh.edu.pl
Roberto Corizzo
Department of Computer Science
American University
Washington
rcorizzo@american.edu
ABSTRACT
Anomaly detection tools and methods present a key capability in modern cyberphysical and failure
prediction systems. Despite the fast-paced development in deep learning architectures for anomaly
detection, model optimization for a given dataset is a cumbersome and time consuming process.
Neuroevolution could be an effective and efficient solution to this problem, as a fully automated
search method for learning optimal neural networks, supporting both gradient and non-gradient
fine tuning. However, existing methods mostly focus on optimizing model architectures without
taking into account feature subspaces and model weights. In this work, we propose Anomaly
Detection Neuroevolution (AD-NEv) – a scalable multi-level optimized neuroevolution framework for
multivariate time series anomaly detection. The method represents a novel approach to synergically:
i) optimize feature subspaces for an ensemble model based on the bagging technique; ii) optimize
the model architecture of single anomaly detection models; iii) perform non-gradient fine-tuning of
network weights. An extensive experimental evaluation on widely adopted multivariate anomaly
detection benchmark datasets shows that the models extracted by AD-NEv outperform well-known
deep learning architectures for anomaly detection. Moreover, results show that AD-NEv can perform
the whole process efficiently, presenting high scalability when multiple GPUs are available.
Keywords Neuroevolution · Anomaly Detection · Autoencoders · Neural Architecture Search
1 Introduction
Modern cyberphysical and failure prediction systems involve sophisticated equipment that records multivariate time-
series data from several up to thousands of features. Such systems need to be continuously monitored to prevent
expensive failures. In anomaly detection, it is common to have abundant availability of normal data deriving from
sensor monitoring, and scarcity of labeled anomalies. For this reason, most anomaly detection works focus on semi-
supervised learning settings, where model training is conducted exclusively using normal data [ 1], [2], as well as
unsupervised learning settings, where training data is mostly normal but may contain a small number of unknown
anomalies [1]. Amongst recent works on semi-supervised and unsupervised multivariate time-series anomaly detection,
deep learning-based methods achieve the best results on well known benchmarks [3, 4, 5, 6, 7, 8, 9, 10].
∗ This work has been submitted to the IEEE TNNLS for possible publication. Copyright may be transferred without
notice, after which this version may no longer be accessible.
arXiv:2305.16497v1  [cs.LG]  25 May 2023

--- Page 2 ---
Running Title for Header
Within deep learning methods, a wide spectrum of autoencoder-based approaches were designed to deal with the
anomaly detection problem. The most efficient are those based on convolutional, fully connected, and LSTM layers,
or a combination of them in single model. Alternative methods are based on adversarial techniques [ 7] as well as
variational autoencoders [11] Other recent and very promising trends include autoencoders based on Graph Neural
Networks [12], GAN-based architectures [4], supervised classification models [13] and ensemble autoencoders [14].
In this context, one important problem is the identification of a suitable and optimized architecture for a given dataset,
in a fully automated way. Neuroevolution is a form of artificial intelligence that uses evolutionary approaches to find
optimal neural networks. The most popular forms of neuroevolution algorithms include NEAT [15], HyperNEAT [16]
and coDeepNEAT [17], which aim to optimize parameters, model architectures, or both. However, despite its potential,
neuroevolution approaches have been focused on the optimization of model architectures without taking into account
the joint optimization of model architectures with feature subspaces and model weights.
In this paper, we aim to fill this gap proposing AD-NEv, a multi-level neuroevolution approach that aims to identify
robust and optimized autoencoder architectures for anomaly detection. Inspired by the framework formulated in [18],
which is loosely based on the coDeepNEAT algorithm, we consider two populations: models and subspaces. The
former contains neural network architectures that evolve during the neuroevolution process. The latter consists of
subspaces, which define subsets of input features. After the neuroevolution process, the framework sets up a bagging
technique-based ensemble model from single optimised architectures. Moreover, our approach optimizes a single
model for each subspace, overcoming the limitation of a single sub-optimal solution for all subspaces. Subsequently,
a fully scalable non-gradient fine-tuning process is performed to iteratively select the best solutions and generate
model populations. Additionally, fine-tuning is performed on the evolved ensemble model. Our extensive experimental
evaluation shows that our proposed multi-level neuroevolution approach yields deep ensembles of auto-encoder models
that outperform state-of-the-art methods without requiring any predefined scoring function.
The main contributions of our work can be summarized in the following:
• A novel multi-level neuroevolution approach with a separate population of models for each subspace of
features, which can be evolved independently, leading to a a better adaptation of specific models to each
subspace.
• A novel selection process for models evolution based on an adapted distance measure for deep autoencoders
that promotes model diversity.
• A fast non gradient-based fine-tuning approach for the evolved model architecture, leveraging adaptations of
neural network weights in the evolution process, which improves results achieved by the previous levels.
• Automatic induction of a regularized ensemble model with a low number of sub-models, which further
improves anomaly detection performance.
• An extensive evaluation with benchmark datasets that are widely adopted for multivariate anomaly detection.
The paper is organized as follows: Section 2 describes related works. Section 3 presents the proposed neuroevolution
approach in detail. Section 4 describes and discusses our experiments. Section 5 summarizes the key results obtained in
our study. Section 6 focuses on our ablation study. Finally, Section 7 concludes the paper and outlines directions for
future work.
Figure 1: AD-NEv framework architecture. Time series data is used to train and evaluate a set of models during neuroevolution
through different levels. The framework returns an optimized ensemble model that can be used for inference.
2

--- Page 3 ---
Running Title for Header
2 Related works
In this section, we analyze anomaly detection methods for multivariate time-series data, as well as neuroevolution
methods that are most relevant for our research scope. Recent surveys on general anomaly detection [19], deep learning
based anomaly detection [1], [2] and unsupervised time-series anomaly detection [20] present techniques relevant to
unsupervised and semi-supervised multivariate time series anomaly detection. Autoencoder-based methods include
fully-connected auto-encoder (FC AE), USAD [7], and UAE [14]. LSTM-based methods include NASA-LSTM [13],
LSTM-AE [14] (which is based on [3]), and LSTM-V AE [21]. CNN-based methods include temporal convolutional AE
(TCN AE) [22]. GAN-based methods include OCAN [10], and BeatGAN [4]. Graph neural network-based approaches
include [12]. Finally, hybrid approaches include MSCRED [23], DAGMM [24], and OmniAnomaly [25].
Regarding autoencoder-based approaches, the FC AE model introduced in [14] is similar to UAE, but it involves a single
model over all the features, where the input sample is a vector resulting from the concatenation of time steps observed
for all sensors. The USAD model is an auto-encoder with an additional discriminator model and loss extensions to boost
the final scores. In [14] authors present comparative studies on multivariate anomaly detection models. They describe
Univariate fully-connected Auto-Encoder (UAE) as a model consisting of multiple auto-encoders, each connected by
its input to a separate feature. Each encoder is a multi-layer perceptron with a number of nodes corresponding to the
number of time steps (window size), and a reduced number of dimensions in the latent space by a factor of 2. The
decoder is a mirror image of the encoder with tanh activation. The resulting ensemble model outperforms many other
deep learning architectures.
Focusing on LSTM-based approaches, NASA LSTM is a 2-layer LSTM model that uses predictability modeling, i.e.,
forecasting for anomaly detection [ 13]. The LSTM-AE presented in [ 14] consists of single LSTM layer for each
encoder and decoder. LSTM-V AE [26] models the data generating process from the latent space to the observed space
using variational techniques.
The CNN-based approach of temporal convolutional network AE (TCN AE) described in [ 14] is an architecture in
which the encoder is built from a stack of temporal convolution (TCN) [22] residual blocks. In the decoder, convolutions
in the TCN residual blocks are replaced with transpose convolutions. The study shows that the scoring function has a
significant impact on the point-wise f1-score.
GAN-based methods include OCAN [ 10], an end-to-end one-class classification method in which the generator is
trained to produce examples that are complimentary to normal data patterns, which is used to train a discriminator
for anomaly detection using the GAN framework. BeatGAN [4] uses a Generative Adversarial Network framework
where reconstructions produced by the generator are regularized by the discriminator instead of fixed reconstruction
loss functions.
The dense graph neural network approach presented in [12] models the anomaly detection problem as a graph neural
network, where each node represents a single feature, and edges allow to represent data exchanged between different
nodes. The graph-based modeling capabilities represent a distinctive trait of this method, and were shown to yield a
significant performance boost other state-of-the-art methods with very well known multivariate time series datasets.
Hybrid methods such as MSCRED [ 23] learn to reconstruct signature matrices, i.e. matrices representing cross-
correlation relationships between channels constructed by pairwise inner product of the channels. It is efficient in the
case of long-term anomalies that are significantly out of the normal data distribution. Deep Autoencoding Gaussian
Mixture Model [24] uses a deep autoencoder to generate a low-dimensional representation and reconstruction error for
each input data point. The output of the autoencoder is further fed into a Gaussian Mixture Model (GMM). DAGMM
jointly optimizes the parameters of the deep autoencoder and the mixture model in an end-to-end fashion. The joint
optimization balances autoencoding reconstruction and density estimation of latent representation. The proposed
regularization helps the autoencoder escape from less attractive local optima and further reduce reconstruction errors.
OmniAnomaly [25] is a stochastic recurrent neural network for multivariate time series. Its main idea is to capture
the normal patterns of multivariate time series by learning their robust representations with key techniques such as
stochastic variable connection and planar normalizing flow. Then, it reconstructs input data and uses the reconstruction
probabilities to determine anomalies.
One common drawback of these methods is that they do not perform automatic model optimization, and therefore
require a significant manual effort to identify and tune the right architecture for the right domain and dataset. This
limitation may be solved by neuroevolution approaches, which have recently been used in many machine learning tasks
for improving the accuracy of deep learning models and finding optimal network topologies [27], [28], [29] and [30].
The authors in [17] show that a two-level neuroevolution strategy scheme can outperform human-designed models
in some specific tasks e.g. language modeling and image classification. This strategy is based on the co-deep NEAT
algorithm with two optimisation levels: single sub-block optimisation and composition of sub-blocks to form a whole
3

--- Page 4 ---
Running Title for Header
network. In [30], a novel deep reinforcement learning-based framework is proposed for electrocardiogram time-series
signal. The framework is optimized by neuroevolution algorithm. The authors in [ 29] present the framework of the
self-organizing map-based neuroevolution solver by which the SOM-like network represents the abstract carpool service
problem. The self organizing map network is trained by using neural learning and evolutionary mechanism. In [28]
the novel neuroevolution approach is described. The algorithm is incorporated with powerful representation which
unifies most of the neural networks into one representation and with new diversity preserving method called spectrum
diversity. The combination of spectrum diversity with a unified neuron representation enables the algorithm to either
outperform or have similar performance with NeuroEvolution of Augmenting Topologies (NEAT) on five classes of
problems tested. Ablation tests show the importance of new added features in the unified neuron representation. In [ 31]
a novel neuroevolutionary method for optimization the architecture and hyperparameters of convolutional autoencoders.
The hypervolume indicator in the context of neural architecture search is introduced. Results show that images can
be compressed by a factor of more than 10, while still retaining enough information. In [32] it is shown that genetic
algorithm could evolve autoencoders that can reproduce the data better as the manually created autoencoders with
more hidden units. The experiments were performed on the MNIST dataset. The first approach of co-evolutionary
neuroevolution-based multivariate anomaly detection system is presented in [18]. However, one substantial limitation is
that optimization of subspaces and models occur separately, so that one model is optimized for all subspaces. This
characteristic limits the capability of the neuroevolution process to optimize the model for each specific subspace,
forcing the model to compromise in order to handle all subspaces simultaneously, and potentially resulting in a loss
of anomaly detection accuracy. Moreover, the proposed method does not provide fine-tuning capabilities, which
would provide the opportunity to further optimize the model and improve anomaly detection performance. Fine-tuning
is a quite popular technique for improving the accuracy of the pre-trained models. The most popular technique is
gradient-based fine-tuning [33], [34]. The non-gradient approach is quite rare but can yield significant improvements as
shown in [35]. The presented method improves the accuracy of pretrained quantised models.
One common drawback of existing neuroevolution methods is that they typically optimize model architectures or
model weights in isolation. Moreover, the majority of approaches that optimize model weights focus on shallow neural
networks. Finally, to the best of our knowledge, there is no neuroevolution approach that jointly optimizes feature
spaces, model architecture, and model weights.
3 Method
In this section, we describe AD-NEv, a scalable multi-level neuroevolution framework that jointly addresses the
aforementioned limitations of anomaly detection and neuroevolution methods. The starting point of the framework is
data preparation – which consists of downsampling training data used in the following evolution levels, and splitting it
into overlapping windows, which reduces the computational cost of the following steps. The next step is finding the
optimal partition of input features into subspaces, leading to an effective matching between features and models, as well
as a reduced number of models in the final ensemble. After that, model evolution is performed for each subspace. As
the next level, the best model for each subspace extracted from the previous level is fine-tuned using the non-gradient
genetic optimization method. Subsequently, the ensemble model combines all fine-tuned models evaluating them using
a voting mechanism. A visual representation of the framework architecture is shown in Figure 1. In the following, we
describe all levels in detail in separate subsections.
3.1 Autoencoders
AD-NEv leverages a deep neural network architecture consisting of autoencoders as base models for the neuroevolution
process. Autoencoders are unsupervised learning models that learn a compressed representation of raw input data, which
is then used to accurately reconstruct inputs. They consist of two parts: an encoder E and a decoder D. The encoder
learns how to efficiently compress and encode the input data X in a new representation with reduced dimensionality –
latent variables Z. The decoder learns how to reconstruct the latent variables Z back to their original shape. The model
is trained to minimize the reconstruction loss, which corresponds to minimizing the difference between the decoder’s
output and the original input data. It can be expressed as:
L(X, ˆX) = ||X − AE(X)||2, (1)
where:
AE(X) = D(Z), Z= E(X). (2)
The autoencoder in our method can consist of various layers, e.g., fully connected layers and convolutional layers.
Several variants of autoencoder architecture exists, including AAE (Adversarial AutoEncoder [36]), V AE (Variational
AutoEncoder [37]) or DAE (Denoising AutoEncoder [38]) but the general idea of reconstruction loss minimization is
4

--- Page 5 ---
Running Title for Header
similar in all cases, eq. 1. When dealing with time series data, the error is predicted at each time point (norm between
input and multivariate reconstructed vector), as in Equation 3:
Ert = ||Xt − AE(xt)||2. (3)
3.2 Data reduction
The algorithm starts by reducing the training data for the evolution process. Specifically, consecutive number of data
points σ are aggregated by averaging values for each feature, leading to a coarser time granularity. As a result, we are
able to provide a fast evolution while retaining the most important information. The original training dataset X contains
N samples, and each sample contains data from M features, as shown in Equation 4 and 5:
X = {xt, t∈ 1, 2, ..., N}. (4)
xt = {xti , i∈ {1, 2, ..., M}}. (5)
The reduced dataset is annotated as Xr, whereas σ is the reduction ratio parameter:
Xr = {xrt , t∈ 1, 2, ...,N
σ }. (6)
Single data points from Xr are obtained according to Equation 7, where med is the median function:
xrt = med({xt∗σ, xt∗σ+1, ..., x(t+1)∗σ}). (7)
During this step, data points are grouped into overlapping windows used in the following steps. The rationale is based
on the fact that, working with time-series data, an aggregated context can be more beneficial for the algorithm than a
single data point. The window size lw can change during the evolution process, since it is one of the parameters subject
to mutation.
3.3 General evolution algorithm
In our multi-level neuroevolution framework, we apply a genetic algorithm in three levels: subspaces, models, and non
gradient fine-tuning. Genetic operators such as crossover and mutation are different for each specific level, and the
models’ evolution and fine-tuning have a unique selection process. Nevertheless, the structure of the genetic algorithm
is the same for all levels. For this reason, the general algorithm is introduced here, and details about each specific level
are provided later on in the paper.
The genetic process starts with the generation of the initial population P0. Each population contains Np solutions.
After that, the single iteration is repeated Ng times. Each iteration starts with creating offspring from the parents
by the crossover operator. Next, the mutation operator mutates each solution from the offspring with the probability
pm. Subsequently, the fitness of each solution is calculated. In our approach, generation process works on the model
architecture in the evolution of a single model, on subspaces in the subspace optimization, and on weight values during
fine-tuning. The combination of these three levels in our framework allow us to explore and exploit a larger search
space during model optimization. A single genetic iteration finishes with the selection of solutions that form a new
population. The result of the genetic process is the final population PNg.
3.4 Subspaces evolution
The goal of the this level of the algorithm is to find an optimal partitioning of input features into subspaces. We define a
subspace Gi as a subset of the input features that is specific for each dataset, as shown in the following equation:
Gi(X) ⊆ {X0, X1, X2, ..., XM }, (8)
where Xi denotes data from the i-th input feature.
The partition S of input features contains K subspaces. There is no restriction on the frequency of the presence for
a single input feature in subspaces, which means that it can be used in zero, one, or more subspaces. Our method
leverages the genetic algorithm to find the optimal partition of the input features into subspaces. A single gene provides
information about a given feature being present in a subspace G. To perform subspace evolution we adopt the genetic
5

--- Page 6 ---
Running Title for Header
Algorithm 1: Subspaces Crossover Algorithm
Result: S′— solution created by crossover
Input: S1—parent solution with K subspaces
Input: S2—parent solution with K subspaces
1 S′ = {};
2 for i ∈ [0, 1, . . . , K] do
3 g1 = S1i ; // Subspace from S1
4 g2 = S2i ; // Subspace from S2
5 gmin = min (min (g1), min (g2));
6 gmax = max (max (g1), max (g2));
7 γ = randint (gmin, gmax) ; // Split point
8 g′ = {};
9 for κ ∈ g1 do
10 if κ < γthen
11 g′ ← g′ ∪ κ;
12 for κ ∈ g2 do
13 if κ > γthen
14 g′ ← g′ ∪ κ;
15 S′ ← S′ ∪ g′ ;
16 return S′
Algorithm 2: Subspaces Moving Mutation
Result: S′— solution created by mutation
Input: S—solution containing K subspaces
Input: Pm—probability of a mutation
1 S′ ← ∅;
2 for i ∈ [0, 1, . . . , K] do
3 sample r from N (0, 1);
4 if r < Pm then
5 sample κ from Si ; // Feature to move
6 j = (i + 1) mod K ; // id of the next subspace in solution
7 S′
j ← Sj ∪ κ;
8 S′ ← S′ ∪ S′
j
9 return S
Algorithm 3: Subspaces Vanishing Mutation
Result: S′— solution created by mutation
Input: S—solution containing K subspaces
1 S′ ← ∅;
2 for Si ∈ S do
3 S′
i = Si ;
4 for κ ∈ Si do
5 Cκ = P
Si∈S
1, if κ ∈ Si
0, otherwise ;
6 sample r from N (0, 1);
7 if r > 1
Cκ
then
8 S′
i ← S′
i \ {κ} ;
9 S′ ← S′ ∪ S′
i ;
10 return S′
6

--- Page 7 ---
Running Title for Header
Algorithm 4: Subspaces Adding Feature Mutation
Result: S′— solution created by mutation
Input: S—solution containing K subspaces
Input: F — set of all features
1 S′ ← {S′
0, S′
1, . . . , S′
K}, where S′
i = Si ;
2 for κ ∈ F do
3 if κ /∈ S then
4 for Si ∈ S do
5 sample r from N (0, 1);
6 if r > 1
K then
7 S′
i ← S′
i ∪ κ;
8 return S′
operators defined in [18]: Crossover (Algorithm 1), Moving Mutation (Algorithm 2), Vanishing Mutation (Algorithm 3)
and Adding Mutation (Algorithm 4).
To improve the convergence speed of the genetic algorithm, we form the initial population based on the correlation
between features, instead of using a randomly generated population. Features are clustered performing agglomerative
clustering with a degree of randomness to achieve a diverse population. This process has the effect of recursively
merging pair of clusters leveraging the linkage distance [39]. In our approach, we leverage correlations between features
as an intuitive and automatic way to estimate their similarity and drive the clustering process.
3.5 Models evolution
This level follows subspace evolution and its aim is to find optimal models that can later be parts of the ensemble model.
Models for each subspace are evaluated independently, since a model that is optimal for one subspace may not be
efficient in another subspace. Therefore, we create and evaluate a single population of models for each subspace. We
denote PGi as a population of models specific for subspace Gi:
PGi = {F j
Θ(Gi), j= 0, ..., NP }. (9)
Each model is represented by an encoder and a decoder, as in Equation 10 and 11, where the layers in encoder and
decoder appear in reversed order:
z = E(F j
ΘE (Gi)) = f j
θE
N
(f j
θE
N −1
...(f j
θE
0
(Gi))), (10)
Gr
i = D(F j
ΘD (z)) = f j
θD
0
...(f j
θD
N −1
(f j
θD
N
(z))) (11)
Performing D(E(F j
Θ(Gi))) we obtain the reconstructed subspace – Gr
i .
Each population PGi is evolved independently from the others in order to find the best solution for each subspace Gi
by means of a genetic algorithm. The genetic operators follow the specifications in [ 18] and include crossover and
mutation of the following parameters: number of layers, number of input and output channels for each layer i (F [i]ic,
F [i]oc), window size (lw) (Algorithm 5 and 6)2. If a mutation of the number of layers takes place, the LF parameter
is modified by removing the last Λl layers in the encoder (f j
θE
N
, f j
θE
N −1
, ...) (lines 10-12, Algorithm 5) and the first Λl
layers in the decoder ( f j
θD
N
, f j
θD
N −1
, ...) or adding new ones to the end of the encoder after the f j
θE
N
layer, and to the
decoder before f j
θD
N
(lines 14-17, Algorithm 5). The mutation of the output channels in specific layer is described in
lines 3-7, Algorithm 5, the window size mutation is presented between lines 18-20. In the case of a crossover, the
chosen l-th layer of the encoder fθE
l
and of the decoder fθD
l
are exchanged between two child models F ′
1 and F ′
2 in
a subgroup population (lines 4-8, Algorithm 6). The next option of crossover is to exchange the length between two
parent autoencoders (lines 10-18, Algorithm 6).
2Without loss of generality, Algorithms 5 and 6 operate on any layer of the neural network. For conciseness, we do not report
processing of the encoder and the decoder parts of the model.
7

--- Page 8 ---
Running Title for Header
As the loss function δ for model F and subspace G on dataset X, we use the mean squared error defined as:
δ(F, G(X)) = 1
|G(X)|
X
x∈G(X)
(F (x) − x)2. (12)
Algorithm 5: Single Model Mutation
Input: F - a model
Input: wmax - maximum window size, Lmax - maximum number of conv layers
1 F ′ ← copy(F );
2 sample m from {0, 1, 2} ; // mutation types
3 if m = 0 then
// mutate the number of channels in a layer
4 sample l from {0, . . . , LF − 1};
5 c′ = randint(F [l]ic, F[l + 1]ic);
6 F ′[l]oc ← c′;
7 F ′[l + 1]ic ← c′;
8 if m = 1 then
// reduce the length of the model
9 sample l from {0, . . . , Lmax};
10 if l < LF then
11 for k ∈ [l + 1, . . . , LF ] do
12 F ′[k] ← ∅;
13 else
14 for k ∈ [LF , . . . , l− 1] do
15 c′ = randint(F [k]oc, F[k]oc + cmax);
16 F ′[k + 1]ic ← F [k]oc;
17 F ′[k + 1]oc ← c′;
18 if m = 2 then
// mutate window size
19 sample w from {1, . . . , wmax};
20 F ′[0]ic ← w;
21 return F ′
The genetic algorithm needs to calculate the fitness ∆ for each single model F and subspace G. To achieve this goal,
the methods relies on a windowed training dataset X which is split into consecutive parts according to the timestamp
of data points: a training part Xt (80%) and validation part Xv (20%). During the evolution, the model is trained on
the training part Xt. After each evolution iteration, we calculate the fitness as the weighted loss from the validation
datasets. The value is negated because the goal of the genetic algorithm is to maximise the fitness, whereas we want to
minimise loss values. The whole calculation is expressed in the following equation:
∆(F, G) = − |Xt| ∗δ(F, G(Xt)) + |Xv| ∗δ(F, G(Xv))
|Xt| + |Xv| . (13)
Our method introduces a novel selection process in the evolution of the models. Its goal is to avoid convergence to a
local optimum by keeping diversity in the models’ population. To achieve this goal, we modify the selection process.
Instead of choosing only the best models in each generation, we also keep a few of the most different models. We
calculate the distance dF between models Fi and Fj. The value is based on the models’ hyperparameters, such as the
number of layers L and the number of channels γ in the convolutional or fully connected layer. The distance calculation
is performed as:
dF (Fi, Fj) = LFi − LFj +
X
la,lb∈LFi ,LFj
abs(γ(la) − γ(lb))
min(γ(la), γ(lb)) , (14)
where abs denotes the absolute value.
3.6 Non-gradient fine-tuning
Changing weights values of pretrained models with gradient-based methods can result in sub-optimal models that could
be further optimized. This phenomenon was noticed and presented in [35], which shows that performing non-gradient
8

--- Page 9 ---
Running Title for Header
Algorithm 6: Models Crossover
Input: F1, F2
1 F ′
1 ← copy(F1);
2 F ′
2 ← copy(F2);
3 sample m from {0, 1} ; // type of crossover
4 if m = 0 ; // exchange the layers
5 then
6 sample l from {0, 1, . . . ,min (LF1 , LF2 )} ;
7 F ′
1[l] ← F2[l];
8 F ′
2[l] ← F1[l];
9 if m = 1 ; // exchange the lengths of models
10 then
11 if LF1 > LF2 then
12 F ′
1[LF2 − 1]oc ← F2[LF2 − 1]oc;
13 for k ∈ [LF2 , . . . , LF1 ] do
14 F ′
1[k] ← F2[k];
15 F ′
2[k] ← ∅;
16 else
17 F ′
2[LF1 − 1]oc ← F1[LF1 − 1]oc;
18 for k ∈ [LF1 , ..., LF2 ] do
19 F ′
2[k] ← F1[k];
20 F ′
1[k] ← ∅;
21 return F ′
1, F′
2
fine-tuning after gradient-based optimization can yield more accurate models. Inspired by this work, we perform
non-gradient fine-tuning on the best models extracted from the previous level. As the optimization step, we choose the
evolutionary approach in which the genetic operators modify weights values to improve the performance of the models.
The mutation operator modifies the chosen weights by the mutation power τ with mutation probability pm as in:
θ′ = θ ∗ (1 ± pm ∗ τ ), (15)
where θ is a single weight.
Algorithm 7: Fine-tuning
Result: R - A set of fine-tuned models
Input: F - The best model from previous level
Input: NP - Size of fine-tuning population in every generation
Input: Ng - Number of generations in the fine-tuning
Input: pm - Mutation probability
Input: τ - Mutation power
1 R ← ∅;
2 g ← 0 ; // Generation number
3 Fg ← F ;
4 while g < Ng do
5 Pg ← {FΘ′
1 , FΘ′
2 , . . . , FΘ′
NP
} where θ′ is created by mutating weights from Fg using eq. 15 with pm and τ;
6 Fg ← arg min
Fi∈Pg
F P(Fi) ;
7 if F P(Fg) = 0∨
8 ∀k∈[g−5,g−4,...,g−1]F P(Fk) = F P(Fg) ; // is stagnated
9 then
10 R ← R ∪ Fg ;
11 Fg ← arg max
F ′∈P
dF (F, F′) ; // dF (·, ·) from eq. 16
12 g ← g + 1
13 return R
9

--- Page 10 ---
Running Title for Header
During the fine-tuning process formalized in Algorithm 7, the algorithm randomly mutates a percentage of the weights3
(line 5, Algorithm 7). The fitness for each solution is calculated in the population as the number of False Positives (FPs)
(line 6, Algorithm 7). During the fine-tuning process, a sample is marked as an anomaly (FP) if its reconstruction error
is higher then the average value of all reconstruction errors, multiplied by a constant factor that determines the allowed
deviation from the mean. The best solutions are selected to be included in the new population (lines 6-11, Algorithm
7). In the following iteration, a complete new set of models is generated based on the best models selected from the
previous iteration.
If a fitness value of zero FPs is achieved (line 7, Algorithm 7), or when a model does not further improve for a given
number of iterations, i.e. stagnation condition (line 8, Algorithm 7), no further improvement is possible. We recall that
this assumption holds since model training takes place in a semi-supervised setting, in which training data contains no
anomalies. If zero FPs are achieved or the stagnation condition occurs, the best model is removed from the population
and is used for the inference phase, during which it is evaluated on testing data.
In all cases, after removing the best model, another model is selected (line 11, Algorithm 7) and further improved in the
following iterations. The new model is selected based on the highest distance from the best model, as in the following
equation:
dθ(Fi, Fj) =
Layers(Fi)X
k=0
q
|θFik − θFjk |2. (16)
The distance represents the difference between the value of the weights of the two models. The process of selecting
most diverse model aims at achieving the exploration of a larger space of models, while avoiding getting stuck in a
local minima.
The fine-tuning process does not involve the crossover operation, since its adoption would provide the same effect as a
very high value of the pm parameter. In that case, model weights would likely drift to a wrong direction in a single
iteration, leading to a drastic loss in model’s accuracy (as further showcased in Section 6.2).
3.7 Ensemble model
The outcome of the previous steps can be summarized as:
• An optimised partition of input features into subspaces: {Gi, i∈ {0, ..., K}}.
• An optimised and fine-tuned model for each subspace Gi: {FGi , i∈ {0, ..., K}}.
Our next goal is to build an ensemble model that is capable to classify input data as normal or as anomaly. To accomplish
this goal, we add a threshold to each models to return a binary prediction: either 0 (normal) or 1 (anomaly). Therefore,
for each subspace Gi, we create a model F ′
Gi that compares the output of FGi to the threshold ηi, specifically defined
for each model:
F ′
Gi (x) =
0 FGi (x) < ηi
1 FGi (x) ≥ ηi. (17)
As a result of this process, we compose base models into the ensemble model Fe adopting a crisp voting strategy:
Fe(x) =
(
0 PK
i=0 F ′
Gi (x) = 0
1 PK
i=0 F ′
Gi (x) > 0. (18)
Fe(x) ⇐ ⇒(FG1 (xG1 ), FG2 (xG2 ), ... , FGK (xGK )). (19)
This voting mechanism was empirically determined and selected since it gives better results than standard approaches
such as majority voting. As a result, the ensemble model Fe can classify input data as normal or an anomaly based on
the output of single models.
4 Experiments
Our experiments focus on multivariate anomaly detection with time series data, which represents a challenging task that
is crucially important in many real-life applications.
3To change weights, the plus/minus sign is randomly chosen with a probability of 50%.
10

--- Page 11 ---
Running Title for Header
More specifically, our experiments aim to address the following research questions:
• RQ1: Does AD-NEv yield a higher anomaly detection performance than state-of-the-art anomaly detection
methods for multivariate time series?
• RQ2: Are all modeling levels in AD-NEv contributing to the achievement of the final anomaly detection
performance of the method?
• RQ3: Does AD-NEv model training present a reasonable time complexity in terms of execution time for all
its levels (training, subspaces, models, fine-tuning)?
• RQ4: Does the AD-NEv framework present satisfactory speedup values, allowing to efficiently scale model
optimization when using multiple GPGPUs?
• RQ5: Does AD-NEv present a stable and efficient model evolution and fine tuning convergence process
considering different values for the population size, τ, and mutation probability parameters?
To answer these questions, we perform a set of quantitative and qualitative experiments that assess the performance of
AD-NEv from different perspectives. In the following subsections, we describe the evaluation protocol followed in
our study, the datasets analyzed, the metrics used to assess the anomaly detection performance, as well as competitor
methods considered and their configuration. Results are discussed in Section 5.
4.1 Datasets
We selected relevant time series datasets, including the Secure Water Treatment Dataset (SWAT) [ 40], the Water
Distribution dataset (WADI) [41], the Mars Science Laboratory Rover dataset (MSL), and the Soil Moisture Active
Passive Satellite dataset (SMAP) [13]. All datasets either involve data gathered in real environments (MSL and SMAP)
or carefully prepared testbeds reflecting existing systems (SW AT and W ADI). The datasets contain anomalies resulting
from either device malfunctions or external malicious activity. It is noteworthy that the chosen datasets are popular
benchmarks used in many recent studies.4
For all datasets, a clear separation in training and testing sets is provided. Training data contains clean conditions of
the process without anomalies, whereas testing data contains both normal data and anomalies. As a result, our models
are exclusively trained on normal data, without anomalies. Both training and testing data are processed in windows,
according to the value of window size (in channels in the Conv1D layer) chosen during model optimization. Statistics
about datasets characteristics are shown in Table 1.
Table 1: Statistics of the used datasets
Datasets Features Training size Test size Anomalies
SW AT 51 49,668 44,981 11.97%
W ADI-2017 123 1,048,571 172,801 5.99%
W ADI-2019 123 784,571 172,801 5.77%
SMAP 55 138,004 435,826 12.82%
MSL 27 58,317 73,729 10.48%
While the SW AT and W ADI datasets contain one continuous data stream, SMAP and MSL are more complex and they
are split into smaller subsets called entities. We concatenate data from these subsets for the evolution of subspaces and
models. Following this idea, to better fit specific data characteristics of entities, we build subspaces separately for each
entity, and then train and fine-tune separate models. The final result is calculated as the concatenation of the results
from each entity. During prediction time, we choose the model corresponding to the particular entity of the source that
generated the data instance.
4.2 Metrics
The F1-score is a standard metric providing information about test accuracy. It is well-suited for anomaly detection
tasks, as it is more resistant to class imbalance than other metrics such as Accuracy (which are susceptible to yield
high values when the normal class in testing data is large and the anomaly class is underrepresented). We adopt F1 as a
point-wise metric, i.e. we evaluate every data point independently. While sequence-based evaluation also represents a
feasible choice and it is largely adopted in the literature, it usually results in higher values for performance metrics,
4Extended descriptions and statistics of the datasets are available in the supplementary material.
11

--- Page 12 ---
Running Title for Header
Table 2: Point-wise F1 score. * – models were evaluated using Gauss-D scoring function; N/A – results are not available. The best
result for every dataset is in bold.
SW AT W ADI MSL SMAP Mean
MAD-GAN 0.77 0.37 N/A N/A N/A
GNN 0.81 0.57 N/A N/A N/A
USAD 0.79 0.43 N/A N/A N/A
CNN 1D 0.78 0.27 0.44 0.52 0.50
NASA LSTM* 0.13 0.20 0.55 0.59 0.37
UAE* 0.58 0.47 0.54 0.58 0.54
LSTM-AE* 0.45 0.33 0.54 0.53 0.46
LSTM-V AE* 0.42 0.50 0.49 0.49 0.48
TCN AE* 0.43 0.43 0.55 0.55 0.49
BeatGAN 0.48 0.46 0.53 0.57 0.51
OCAN 0.15 0.0 0.30 0.28 0.18
DAGMM 0.0 0.13 0.14 0.17 0.11
OmniAnomaly 0.15 0.24 0.41 0.38 0.29
AD-NEv 0.82 0.62 0.57 0.77 0.70
Table 3: Ablation study showing point-wise F1 score using a baseline model with basic subspace and model evolution and without
fine tuning (A), using AD-NEv with enhanced subspace and model evolution (B), and with the full version of AD-NEv that includes
fine-tuning (C). The best result for each dataset is reported in bold.
Method SW AT W ADI MSL SMAP
A: Baseline model [18] 0.79 0.54 0.45 0.52
B: AD-NEv: Evolution 0.81 0.59 0.50 0.67
C: AD-NEv: Evolution + 0.82 0.62 0.57 0.77
Fine-tuning
without providing precise information about how well the algorithm can decide whether a single data point is an
anomaly.
5 Results and discussion
5.1 Anomaly detection performance
Table 2 presents the results for AD-NEv in comparison to the results of well-known anomaly detection methods. Some
models are evaluated using an optimised Gauss-D scoring function [14], which features a data transformation step on
previously observed data points, aiming at increasing F1 values. However, in our experiments, this scoring function did
not provide significant improvements to model’s accuracy and was therefore discarded in the final experiments. For the
largest dataset (W ADI), AD-NEv outperforms the second-best method (GNN) by 0.05, whereas theF1 of the third-best
model (LSTM-V AE) is significantly lower, with a margin of 0.12. Most of the other methods obtain even worse results.
The differences are less impressive with the SW AT dataset, where AD-NEv outperforms GNN and USAD by a value of
0.01 and 0.02, respectively. The smaller difference is probably related to the fact that SW AT is smaller and less complex
than W ADI, which results in methods being more aligned in terms of predictive performance. In the case of MSL, all
the best models provide results that are very close to each other. However, AD-NEv improves the results of NASA
LSTM and TCN AE by 0.02. However, AD-NEv provides a radical improvement with the SMAP dataset, where it
outperforms the second-best model (NASA-LSTM) by 0.18.
Overall, it is noteworthy that the models extracted by AD-NEv achieve the best results across all datasets when compared
with all the other methods. For some datasets, the difference is very significant, while for others it is relatively smaller.
However, the other methods considered in our experiments usually achieve high results with only few of the analyzed
datasets. For example, NASA LSTM is the second-best method for MSL and SMAP datasets, but it does not handle
SW AT and W ADI very well (in which theF1 is 0.13 and 0.20, respectively). On the other hand, AD-NEv showcases
the capability to adjust the evolving model to specific dataset requirements thanks to the neuroevolution approach. This
result can be clearly observed looking at the mean value of F1 across all datasets in Table 2 (RQ1).
Table 3 presents results for an ablation study consisting of three models:i) A baseline model [18]; ii) After our subspaces
and models evolution; iii) After the fine-tuning level. This table reveals the improvements introduced by our newly
introduced approaches for subspaces optimization, model evolution, and fine-tuning. Comparing the results from [18]
with the results following our improvements in subspaces and model evolution, we see improvements in terms of F1 on
SWAT by 0.01, WADI by 0.05, MSL by 0.05, and SMAP by 0.15. These results show that the introduced novelties,
such as the independent population for each subspace, improve the results with all datasets (RQ2). Fine-tuning also
12

--- Page 13 ---
Running Title for Header
Table 4: Hyperparameters of the genetic process during each level
Parameter Subspaces Models Fine-tuning
Population size 16 24 24
Mutation probability 0.1 0.5 0.02
Crossover probability 0.1 0.5 not applicable
Number of generations 10 16 64
Table 5: Other hyperparameters of the neuroevolution process
Parameter Value
Reduction ratio σ (W ADI, SW AT) 5
Reduction ratio σ (MSL, SMAP) 1
Mutation power τ 1
256
Number of layers range [3-6]
Number of channels range [16-6144]
Window size range [1-12]
Learning rate range [0.000001-0.1]
positively impacts all datasets: SWAT by 0.01, WADI by 0.03, MSL by 0.07, and SMAP by 0.10. The gains are
lower for SWAT and WADI, as the results for these datasets are already higher. Those results confirm the positive
contributions introduced by the new components proposed in this paper, and highlight that non-gradient fine-tuning can
be an efficient method to boost the pretrained models’ performance in anomaly detection tasks.
5.2 Time Complexity and Scalability
The framework was implemented5 with Python and PyTorch. All presented calculations were executed leveraging
Nvidia Tesla V100-SXM2-32GB GPUs6. Since AD-NEv supports parallel model optimization, experiments were
performed using a pool of 8 GPGPUs (each subspace/model was processed on a separate GPGPU).
SWAT WADI MSL SMAP
0
10
20
30
40
50
60time (h)
1.0 1.8
4.0
6.0
9.0
18.0
0.8 1.2
20.0
62.0
2.0 3.0
44.0
50.0
12.0
48.0
training
subspaces
models
fine-tuning
Figure 2: Execution times in hours using 8 GPGPUs with all datasets (SW AT, W ADI, MSL, SMAP).
We provide the values of the parameters of the neuroevolution process for each level in Table 4 and 5. We also present
the execution times in Figure 2. It is important to note that SMAP and MSL datasets are processed in full, without
downsampling, since most feature are binary, and this operation would results in information loss. Considering all
datasets, the evolution of subspaces level took a minimum of 0.8 and a maximum of 18 hours. The best results in terms
of accuracy were achieved with a value of the maximum number of possible subspaces (parameter K of the evolution
5The implementation will be provided upon publication.
6https://www.nvidia.com/en-us/data-center/v100/
13

--- Page 14 ---
Running Title for Header
process) set to 5. The rationale for this choice was to find the highest number yielding a reasonable execution time. We
experimentally observed that a higher value for K exceeds the time limits of evolution process (>140h). Considering
all datasets, the model evolution process took a minimum of 2 and a maximum of 62 hours. Fine-tuning was on average
more time consuming, taking between 12 and 50 hours. It is noteworthy that model training and fine-tuning were
performed separately for each entity in the SMAP and MSL datasets. Therefore, the whole neuroevolution process,
including the final training and evaluation, lasted the following execution times: SW AT – 74h; W ADI – 131.8h; MSL
– 18.8h; SMAP – 58.2h. Overall, all the executions for each single dataset required less than 132 hours, which we
consider to be a reasonable time frame considering the size of the datasets and the satisfactory accuracy achieved by the
resulting models (RQ3).
It is also noteworthy that the execution time can be easily be reduced by adding more GPGPUs, since each model can
be trained and evaluated independently on a separate GPGPU. Results in Figure 3 show that a speedup of up to 4x can
be obtained for the fine-tuning level, and up to 5x for the model evolution level 7. The results also highlight that model
evolution level of the AD-NEv framework exhibits a linear speedup with an increasing number of GPUs. The fine
tuning process also benefits from the execution on multiple GPUs, achieving comparable performances with respect
to the model evolution level. Figure 3 also shows results in terms of scaleup, where problem complexity (population
size) and computational resources (GPUs) increase at the same time, i.e. from a population size of 4 with 1 GPU, to a
population size of 32 with 8 GPUs. Results show a remarkable performance which positions very close to the ideal
curve, i.e. a constant scaleup of 1 across all configurations. Both speedup and scaleup results support our assumption
that multiple GPGPUs can significantly reduce the execution time of the AD-NEv framework, effectively distributing
the training and evaluation of multiple models on different GPUs, thus resulting in a significant speedup. Overall, the
AD-NEv framework can be effectively scaled, supporting the efficient optimization of a large number of models (RQ4).
1 2 3 4 5 6 7 8
GPUs
0
1
2
3
4
5
6
7
8Speedup factor
Model evolution
Fine-tuning
1 (4) 2 (8) 3 (12) 4 (16) 5 (20) 6 (24) 7 (28) 8 (32)
GPUs (Population size)
0.00
0.25
0.50
0.75
1.00
1.25
1.50
1.75
2.00Scaleup factor
Figure 3: Scalability results showing speedup (left) and scaleup (right) factors for both model evolution and fine-tuning levels with
an increasing number of GPUs and population size (for scaleup only) on the x-axis.
The models extracted after the neuroevolution process differ depending on the specific dataset and subspace. We present
the complete architecture of the best model for the best subspace in every dataset in the supplementary material. The
final models for the SWAT and WADI datasets consist of three convolutional layers in the encoder and the decoder
parts of the model. However, the SW AT model presents a higher number of channels. The models for MSL and SMAP
consist of six convolutional layers in the encoder and decoder. After the first two levels of the framework and before
fine-tuning, the final training was run with 120 epochs in the case of the W ADI dataset, 90 epochs for SW AT, and 250
for SMAP and MSL.
It is noteworthy that presented AD-NEv framework requires a smaller number of computational units than the state-
of-the-art ensemble method in [ 14], which achieves the best anomaly detection performance on multivariate time
series benchmarks. While the model in [14] requires a number of submodels equal to the number of features, S = M,
7The hyperparameter values specification for the scalability experiment are reported in Table 4 and 5
14

--- Page 15 ---
Running Title for Header
AD-NEv produces an ensemble model with K submodels working on K subspaces, K << M. The complexity and
memory reduction of our solution is ≃ K
M (the impact of the input size is negligible).
6 Convergence study
This section presents the impact of neuroevolution parameters on model’s accuracy. A detailed analysis for the most
complex dataset (W ADI) is presented in the following, focusing on a selection of relevant model parameters. Regarding
the SMAP and the MSL datasets, a separate model was generated and tuned for each entity (see Section 4.1). For this
reason, we do not present partial results for those datasets. It should be noted that, for all datasets, the behavior is
consistent with that observed with W ADI.
6.1 Convergence of the model evolution process
Figure 4 presents the fitness on the validation dataset (not containing anomalies) of the best model in each iteration
during model evolution process for version: i) with the distance function for model evolution dF (Fi, Fj) introduced in
Section 3.5 - blue and ii) without the distance function - orange. The distance function aims at achieving model diversity
during the model evolution process. It could be observed that, in the scenario where the distance function is adopted,
the value of the loss function was persisting on the same level over the first eight iterations. During the following
eight iterations, the fitness value was improved twice. Finally, the model with the lowest value of loss function was
evaluated on the test dataset achieving F1 score equal to 0.59. In the case of the scenario without diversity introduced
by the distance function, the stagnation was persistent over 10 iterations, and it improved only once in the following
iterations. Moreover, in this case, the loss value was always higher than the scenario with distance function. The best
model evolved without distance function achieved the final F1 score of 0.54. We can clearly see that introducing the
distance function dF (Fi, Fj) ensuring diversity to the population during evolution improved not only the convergence,
but also the anomaly detection performance (RQ5). Table 6 presents F1 scores for W ADI and SW AT on the test dataset,
with different values of the population size parameter. As expected, the most effective models were extracted with the
highest value for this parameter (24), showing the contribution of a large population of models during the evolution
process8
0 2 4 6 8 10 12 14
Iteration
0.0050
0.0055
0.0060
0.0065
0.0070
0.0075
0.0080
0.0085Fitness on validation dataset
Legend (F1 score on WADI)
With distance function (F1=0.59)
Without distance function (F1=0.55)
Figure 4: Convergence plot for the WADI dataset during the models evolution for population size 24. The diversity in selection
process introduced by distance function improves not only convergence, but also F1 score on test dataset (F1 0.59 in comparison to
0.55 without distance function).
8The largest population size was set to 24 due to time limitations given the available computation resources.
15

--- Page 16 ---
Running Title for Header
Table 6: F 1 score on W ADI and SW AT datasets after evolution model process depending on population size.
Population size F1 on W ADI F1 on SW AT
8 0.54 0.79
16 0.56 0.80
24 0.59 0.81
6.2 Convergence of the non-gradient fine-tuning process
Results in Table 7 show the average convergence and theF1 obtained on the W ADI dataset using different configurations
for Np, pm, and τ parameters. Results show that with an increasing value of the population size, the algorithm required
a reduced number of iterations to achieve a zero value of FP (8 iterations on average for NP = 8 , and 4.92 on
average iterations for NP = 24). Moreover, a higher number of NP also translates to an improved anomaly detection
performance, resulting in an increased F1 value.
Table 7: Fine tuning convergence (number of iterations) and F1 obtained with varying values of NP , pm, and τ.
NP pm τ F1 on W ADI Avg convergence
(iterations)
8 0.02 1
256 0.60 8
16 0.02 1
256 0.61 5.82
24 0.02 1
256 0.62 4.92
24 0.02 1
128 0.59 2.67
24 0.02 1
512 0.62 12.8
24 0.05 1
256 0.53 21.33
Figure 5 represents a detailed example for row 3 in Table 7 (best configuration), showing the values of the fitness
function. Additional plots showing the convergence trends of all models are reported in the Appendix.
Figure 5: Fine-tuning convergence in terms of a different number false-positives (FP) for the best generated model in each iteration.
The experiments were conducted on the W ADI dataset with a population size of 24,τ = 1
256 , and a mutation probability of 0.02. We
also report F1 for each converged fine-tuned model.
Another perspective of results in Table 7 is how fast the model was able to converge with different values of the mutation
power τ. Results (rows 3, 4 and 5) shows that the optimal model was obtained faster when this parameter had a higher
value ( 1
128 ), but it does not have an impact on the final F1 score. Moreover, using a large value for τ allows the process
to converge faster. It is worth noting that reducing the value of theτ parameter to τ = 1
512 allowed us to obtain the same
F1 score as τ = 1
128 but the algorithm required a higher number of iterations to converge. We argue that generating a
compact set of models may be preferred over a large number of models to reduce the time impact of models evaluation
on testing data.
Finally, one interesting aspect worth analysis is how increasing the value of mutation probability pm from 2%
(pm = 0.02) to 5% (pm = 0.05) resulted in a decrease of efficiency for the algorithm. In this case, the best achieved
16

--- Page 17 ---
Running Title for Header
F1 score was 0.53, which is worse than the base F1 value of 0.59. Comparing row 3 and 5, it could be observed that
when too many weights are modified during a single iteration, the convergence process is slower. Overall, results show
that the convergence process for the fine-tuning level is stable and efficient with respect to selected ranges of values of
population size, τ, and mutation probability parameters (RQ5).
7 Conclusions and future work
In this paper, we proposed AD-NEv – a novel multi-level framework for evolving ensemble deep learning auto-encoder
architectures for multivariate anomaly detection. Its novelty consists in an efficient multi-level optimization that includes
the evolution of input features subspaces, the model architecture for each subspace, and non-gradient fine-tuning.
To further boost the anomaly detection performance, AD-NEv builds an ensemble model with voting to combine
the outputs of single optimized models. We show that each introduced optimization component contributes to the
achievement of the final model accuracy. An extensive experimental evaluation results show that the final ensemble
model outperforms state-of-the-art anomaly detection models for multivariate time series data, while presenting a
reasonable execution time, even with large datasets. AD-NEv’s execution can be seamlessly scaled up by adding
computational resources. Directions for future work include the integration of the framework with redefined genetic
operators for graph neural networks. Another possibility worth of investigation is the introduction of modified operators
that enhance neural network architectures, such as different types of layers in a model or adding dense connections to
each layer. Finally, we will further explore possible data distillation strategies to further reduce training data and reduce
the execution time of the evolution level.
References
[1] R. Chalapathy and S. Chawla. Deep learning for anomaly detection: A survey. arxiv, arXiv preprint
arXiv:1901.03407, 2019.
[2] G. Pang, C. Shen, L. Cao, and A. V . D. Hengel. Deep learning for anomaly detection.ACM, 54(2):1–38, March
2019.
[3] P. Malhotra, A. Ramakrishnan, G. Anand, L. Vig, P. Agarwal, and G. Shroff. Lstm-based encoder-decoder for
multi-sensor anomaly detection. CoRR abs/1607.00148, 2016.
[4] B. Zhou, S. Liu, B. Hooi, X. Cheng, and J. Ye. Beatgan: anomalous rhythm detection using adversarially generated
time series. Proceedings of the 28th International Joint Conference on Artificial Intelligence, page 4433–4439,
2019.
[5] Y . Zhang, Z. Y . Dong, W. Kong, and K. Meng. A composite anomaly detection system for data-driven power
plant condition monitoring. IEEE Transactions on Industrial Informatics, 2019.
[6] Y . Su, Y . Zhao, C. Niu, R. Liu, W. Sun, and D. Pei. Robust anomaly detection for multivariate time series
through stochastic recurrent neural network. Proceedings of the 25th ACM SIGKDD International Conference on
Knowledge Discovery and Data Mining, pages 2828–2837, 2019.
[7] Julien Audibert, Pietro Michiardi, Frédéric Guyard, Sébastien Marti, and Maria A. Zuluaga. Usad: Unsupervised
anomaly detection on multivariate time series. In Proceedings of the 26th ACM SIGKDD International Conference
on Knowledge Discovery Data Mining, KDD ’20, page 3395–3404, New York, NY , USA, 2020. Association for
Computing Machinery.
[8] S. Tariqa, S. Lee, Y . Shin, M. S. Lee, O. Jung, D. Chung, , and S. S. Woo. Detecting anomalies in space using
multivariate convolutional lstm with mixtures of probabilistic pca. Proceedings of the 25th ACM SIGKDD
International Conference on Knowledge Discovery and Data Mining, page 2123–2133, 2019.
[9] A. Tuor, S. Kaplan, B. Hutchinson, N. Nichols, and S. Robinson. Deep learning for unsupervised insider threat
detection in structured cybersecurity data streams. Workshops at the Thirty-First AAAI Conference on Artificial
Intelligence, 2017.
[10] P. Zheng, S. Yuan, X. Wu, J. Li, and A. Lu. One-class adversarial nets for fraud detection. Proceedings of the
AAAI Conference on Artificial Intelligence, 33:1286–1293, 2019.
[11] Daehyung Park, Yuuna Hoshi, and Charles C. Kemp. A multimodal anomaly detector for robot-assisted feeding
using an lstm-based variational autoencoder. IEEE Robotics and Automation Letters, 3(3):1544–1551, 2018.
[12] A. Deng and B. Hooi. Graph neural network-based anomaly detection in multivariate time series. AAAI
International Conference on Artificial Intelligence, 2021.
17

--- Page 18 ---
Running Title for Header
[13] K. Hundman, V . Constantinou, C. Laporte, I. Colwell, and T. Soderstrom. Detecting spacecraft anomalies using
lstms and nonparametric dynamic thresholding. Proceedings of the 24th ACM SIGKDD International Conference
on Knowledge Discovery & Data Mining, page 387–395, 2018.
[14] Astha Garg, Wenyu Zhang, Jules Samaran, Ramasamy Savitha, and Chuan-Sheng Foo. An evaluation of anomaly
detection and diagnosis in multivariate time series. IEEE Transactions on Neural Networks and Learning Systems,
pages 1–10, 2021.
[15] Kenneth O. Stanley and Risto Miikkulainen. Evolving neural networks through augmenting topologies. Evolu-
tionary Computation, 10(2):99–127, 2002.
[16] Kenneth O. Stanley, David Ambrosio, and Jason Gauci. A hypercube-based indirect encoding for evolving
large-scale neural networks. Artificial Life journal, 15(2), 2009.
[17] R. Miikkulainen, J. Liang, E. Meyerson, A. Rawal, D. Fink, O. Francon, B. Raju, H. Shahrzad, A. Navruzyan,
N. Duffy, and B. Hodjat. Evolving deep neural networks. CoRR abs/1703.00548, Mar 2017.
[18] Kamil Faber, Marcin Pietron, and Dominik Zurek. Ensemble neuroevolution-based approach for multivariate time
series anomaly detection. Entropy, 23(11), November 2021.
[19] V . Chandola, A. Banerjee, and V . Kumar. Anomaly detection: A survey. ACM computing surveys (CSUR) ,
41(3):1–58, 2009.
[20] A. Blazquez-Garc´ıa, A. Conde, U. Mori, and J. A. Lozano. A review on outlier/anomaly detection in time series
data. arXiv preprint arXiv:2002.04236, 2020.
[21] Run-Qing Chen, Guang-Hui Shi, Wanlei Zhao, and Chang-Hui Liang. Sequential lstm-vae for anomaly detection
on time series. ArXiv, abs/1910.03818, 2019.
[22] Shaojie Bai, J. Zico Kolter, and Vladlen Koltun. An empirical evaluation of generic convolutional and recurrent
networks for sequence modeling. 2018.
[23] Song D. Chen X. Feng C. Lumezanu W. Cheng J. Zong B. Chen H. Zhang, C. and N. Chawla. A deep neural
network for unsupervised anomaly detection and diagnosis in multivariate time series data. Proceedings of the
AAAI Conference on Artificial Intelligence, 33:1409–1416, 2019.
[24] B. Zong, Q. Song, M. R. Min, W. Cheng, C. Lumezanu, D. Cho, , and H. Chen. Deep autoencoding gaussian
mixture model for unsupervised anomaly detection. ICLR, 2018.
[25] Y . Su, Y . Zhao, C. Niu, R. Liu, W. Sun, and D. Pei. Robust anomaly detection for multivariate time series
through stochastic recurrent neural network. Proceedings of the 25th ACM SIGKDD International Conference on
Knowledge Discovery and Data Mining, page 2828–2837, 2019.
[26] D. Park, Y . Hoshi, and C. C. Kemp. A multimodal anomaly detector for robot-assisted feeding using an lstm-based
variational autoencoder. IEEE Robotics and Automation Letters, 3:1544–1551, 2018.
[27] Mooney P. Galvan E. Neuroevolution in deep neural networks: Current trends and future challenges. CoRR
abs/2006.05415, Jun 2020.
[28] Danilo Vasconcellos Vargas and Junichi Murata. Spectrum-diverse neuroevolution with unified neural models.
IEEE Transactions on Neural Networks and Learning Systems, 28(8):1759 – 1773, 2016.
[29] Ming-Kai Jiau and Shih-Chia Huang. Self-organizing neuroevolution for solving carpool service problem with
dynamic capacity to alternate matches. IEEE Transactions on Neural Networks and Learning Systems, 30(4):1048
– 1060, 2018.
[30] Yu Huang, Gary Yen, and Vincent Tseng. Snippet policy network v2: Knee-guided neuroevolution for multi-lead
ecg early classification. IEEE Transactions on Neural Networks and Learning Systems, pages 1 – 15, 2022.
[31] Daniel Dimanov, Emili Balaguer-Ballester, Colin Singleton, and Shahin Rostami. Moncae: Multi-objective
neuroevolution of convolutional autoencoders. ICLR, Neural Architecture Search Workshop, 2021.
[32] Hidehiko Okada. Neuroevolution of autoencoders by genetic algorithm. International Journal of Science and
Engineering Investigations, 6:127–131, 2017.
[33] Yuxiang Zhou, Lejian Liao, Yang Gao, Rui Wang, and Heyan Huang. Topicbert: A topic-enhanced neural
language model fine-tuned for sentiment classification. IEEE Transactions on Neural Networks and Learning
Systems (Early Access), 2021.
[34] Youngmin Ro, Jongwon Choi, Byeongho Heo, and Jin Young Choi. Rollback ensemble with multiple local
minima in fine-tuning deep learning networks. IEEE Transactions on Neural Networks and Learning Systems
(Early Access), 2021.
18

--- Page 19 ---
Running Title for Header
[35] Markus Nagel, Rana A. Amjad, Mart van Baalen, Christos Louizos, and Tijmen Blankevoort. Up or down?
adaptive rounding for post-training quantization. Proceedings of ICML, 2020.
[36] A. Makhzani, J. Shlens, N. Jaitly, I. Goodfellow, and B. Frey. Adversarial autoencoders. arXiv:1511.05644, 2015.
[37] H. Xu, W. Chen, N. Zhao, Z. Li, J. Bu, Z. Li, Y . Liu, Y . Zhao, D. Pei, and Y . Feng. Unsupervised anomaly
detection via variational autoencoder for seasonal kpis in web applications. Proceedings of the 2018 World Wide
Web Conference, pages 187–196, 2018.
[38] Y . Bengio, G. Alain L. Yao, and P. Vincent. Generalized denoising auto-encoders as generative models.ArXiv,
arXiv:1305.6663, 2013.
[39] Analysis of agglomerative clustering. Algorithmica, 69(1):184–215, 2014.
[40] Aditya P. Mathur and Nils Ole Tippenhauer. Swat: a water treatment testbed for research and training on ics
security. In 2016 International Workshop on Cyber-physical Systems for Smart Water Networks (CySWater), pages
31–36, 2016.
[41] Chuadhry Ahmed, Venkata Palleti, and Aditya Mathur. Wadi: a water distribution testbed for research in the
design of secure cyber physical systems. pages 25–28, 04 2017.
19
