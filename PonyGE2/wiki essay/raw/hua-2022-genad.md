---

## article_number: 7
slug: hua-2022-genad
pdf: Hua_2022_GenAD.pdf
extraction_status: ok
last_updated: 2026-06-26

# Raw PDF text — Article 7 (hua-2022-genad)

- **Source PDF:** `Literature Review PDFs/02_Grouped_Time_Series/Hua_2022_GenAD.pdf`
- **Wiki source page:** [[../sources/hua-2022-genad|hua-2022-genad]]

## Extracted text

--- Page 1 ---
GenAD: General Representations of Multivariate Time Series
for Anomaly Detection
Xiaolei Hua1,5, Lin Zhu1,5*, Shenglin Zhang2,5, Zeyan Li3,5, Su Wang4,
Dong Zhou4, Shuo Wang4, Chao Deng1,5
1JIUTIAN Team, China Mobile Research Institute, Beijing, China. 2Nankai University, Tianjin, China.
3Tsinghua University, Beijing, China. 4Beijing University of Posts and Telecommunications, Beijing, China.
5Tsinghua University-China Mobile Communications Group Co., Ltd. Joint Institute, Beijing, China.
{huaxiaolei, zhulinyj}@chinamobile.com, [zhangsl@nankai.edu.cn](mailto:zhangsl@nankai.edu.cn), [zy-li18@mails.tsinghua.edu.cn](mailto:zy-li18@mails.tsinghua.edu.cn),
{wangsu, hardworkzd, shuowangg}@bupt.edu.cn, [dengchao@chinamobile.com](mailto:dengchao@chinamobile.com)
Abstract
The reliability of wireless base stations in China Mobile is
of vital importance, because the cell phone users are con-
nected to the stations and the behaviors of the stations are
directly related to user experience. Although the monitoring
of the station behaviors can be realized by anomaly detection
on multivariate time series, due to complex correlations and
various temporal patterns of multivariate series in large-scale
stations, building a general unsupervised anomaly detection
model with a higher F1-score remains a challenging task.
In this paper, we propose a General representation of mul-
tivariate time series for Anomaly Detection(GenAD). First,
we pre-train a general model on large-scale wireless base sta-
tions with self-supervision, which can be easily transferred
to a speciﬁc station anomaly detection with a small amount
of training data. Second, we employ Multi-Correlation At-
tention and Time-Series Attention to represent the correla-
tions and temporal patterns of the stations. With the above
innovations, GenAD increases F1-score by total 9% on real-
world datasets in China Mobile, while the performance does
not signiﬁcantly degrade on public datasets with only 10% of
the training data.
Introduction
There are millions of wireless base stations (WBS) in China
Mobile, serving hundreds of millions of cell phone users.
The reliability of these stations is of vital importance be-
cause the users are directly connected to the stations, as
shown in Fig. 1. Once there is an anomaly with WBS-2, it
will directly cause various problems to the users connected
to it, including failed calls, slow access to the Internet, which
will impact user experience and even lead to economic loss.
The behaviors of a WBS can be characterized by the mul-
tiple metrics, such aswireless connection rate, wireless drop
rate, handover success rate, etc. When one of these metrics
becomes anomalous, the WBS is likely to suffer from per-
formance degradation, while in turn impacting user expe-
rience. These metrics are continuously collected at a pre-
deﬁned time interval and form a multivariate time series
*Lin Zhu is the corresponding author.
Copyright © 2022, Association for the Advancement of Artiﬁcial
Intelligence ([www.aaai.org](http://www.aaai.org)). All rights reserved.
WBS-1
cell-1
cell-2
cell-3
cell-4
cell-5
WBS-2
cell-6
cell-7
cell-8
cell-9
cell-10
WBS-2 failed, affecting cell-6~cell-10
Figure 1: Relationship between WBS and cells.
(MTS). Then the detection of WBSes’ anomalous behaviors
is converted to MTS anomaly detection. Due to anomaly di-
versity and lack of training labels, only unsupervised meth-
ods can be used. Recently, a collection of unsupervised deep
learning-based methods(Aytekin et al. 2018; Zhou and Paf-
fenroth 2017) has been proposed for MTS anomaly detec-
tion. But there are two challenges in applying the methods
in China Mobile. Challenge 1: Large-scale WBSes . The
number of WBSes in China Mobile has reached a million
level, while with the large-scale commercialization of 5G,
the number of WBSes is rapidly increasing. Due to the lim-
itations on storage resources for large-scale WBSes, only
480 training data can be used for each WBS. Although deep
learning methods (Zong et al. 2018; Zhang et al. 2019; Su
et al. 2019) perform superiorly for a single device after be-
ing carefully designed, it is impossible to deploy such meth-
ods on large-scale WBSes in China Mobile due to the huge
overhead in training data. Moreover, as millions of stations
behave in various patterns because of the various surround-
ing environment and different manufacturers, it is also in-
appropriate to train one anomaly detection model for all
WBSes, which can not express the heterogeneity of each
WBS and degrade the accuracy. Therefore, unsupervised
MTS anomaly detection for large-scale and heterogeneous
WBSes with a small amount of training data is challeng-
ing. Challenge 2: MTS of each WBS is difﬁcult to ex-
press. The existing methods (Zong et al. 2018; Zhang et al.
arXiv:2202.04250v1  [cs.NI]  9 Feb 2022

--- Page 2 ---
2019; Su et al. 2019) detect anomalies based on reconstruc-
tion errors or reconstruction probabilities, which are directly
related to the representation of the correlations and tempo-
ral patterns of MTS. But the MTS of each WBS is difﬁ-
cult to express, as there are more than 18 dimensions in the
MTS of a WBS, with complex inter-dependencies (i.e., cor-
relations among time series) and various intra-dependencies
(i.e., temporal patterns within one time series). More im-
portantly, these inter-dependencies and intra-dependencies
of each WBS are dynamic. For example, some WBSes be-
have a pattern on weekdays, while the pattern can be dynam-
ically changed during the holidays. And an exam or concert
can also change the pattern of WBS. These existing meth-
ods (Kingma and Welling 2013; Liu et al. 2019; Burgess
et al. 2018), either do not learn the inter-dependencies or
intra-dependencies well, or lose the dynamic characteristics.
To address the above challenges, we propose a General
multivariate time series representation for Anomaly Detec-
tion(GenAD), with the following contributions:
• GenAD pre-trains a general model on large-scale WBSes
with self-supervision. For each station-speciﬁc pattern,
only a small amount of data are required to ﬁne-tune the
model, which solves the ﬁrst challenge.
• GenAD employs Multi-Correlation Attention and Time-
Series Attention to represent the complex correlations
and temporal patterns of MTS simultaneously. The at-
tention mechanism is introduced to capture the dynamics
among time series and within one time series. Multi-head
and hidden-layers are also used to capture Non-linear,
Coupling, Higher-order correlations, and Trend, Delay,
Periodicity of N-dimensional series.
• For the large-scale scene, we apply 3000 real-world WB-
Ses in China Mobile for pre-training and the monitoring
data of 30 WBSes to evaluate the performance of the gen-
eral model GenAD (denoted as GenAD(G)). GenAD(G)
increases F1-score by total 9%. To demonstrate the ver-
satility, the performance of GenAD(G) does not signiﬁ-
cantly degrade on public datasets with only 10% of the
training data.
• For further demonstrating the representations of com-
plex correlations and various temporal patterns, we train
GenAD without pre-training (denoted as GenAD(WP))
for each speciﬁc node. GenAD(WP) increases F1-Score
by 2.1% to 4.8% over the state-of-the-art models on three
public datasets, and by 3.4% on synthetic datasets.
BACKGROUND
• WBS: WBS serves as the central connection point to
communicate (making calls, accessing the Internet, etc.)
for wireless devices, as shown in Fig. 1. When a WBS
becomes anomalous, users may experience failed calls,
slow access to the Internet, resulting in serious degrada-
tion of user experience or income loss.
• MTS of WBS : WBS carries lots of real-time services,
so the behaviors of WBS can be characterized by the
MTS of the services. For example, wireless connection
rate can be simply understood as the number of success-
fully established connections divided by the number of
established connection requests for communication,han-
dover success rate can be understood as the total number
of successful handovers divided by the total number of
handover requests. A drop in these metrics indicates that
more users suffering from bad experiences.
• General Correlations of MTS in WBS : The MTS of
different WBSes have general correlations. For example,
regardless of the environment or the manufacturer of sta-
tions, interference level directly affects wireless connec-
tion rate, while there is no direct relationship between
interference level and upstream trafﬁc. The general cor-
relations provide conditions for the general pre-training
model.
Approach
In this section, we ﬁrst present the problem statement of
anomaly detection for MTS. Second, we introduce the over-
all workﬂow and model architecture of GenAD. Then, we
illustrate Time-Series Attentionand Multi-Correlation Atten-
tion in detail, which are the key components of GenAD. Fi-
nally, we describe the methods for anomaly detection.
Problem Statement
Given the multivariate time seriesX of a WBS, which con-
tains N dimensions andTX time points, i.e.,
X = (x1
TX,x 2
TX,··· ,x N
TX )∈ RN×TX (1)
we learn the complex correlations and various temporal pat-
terns of X, then determine whether there are anomaly seg-
ments ofX in future time points.
Network Architecture and Pre-training
Core ideas GenAD detects anomalies of MTS by evaluat-
ing the reconstruction error between the original series and
the reconstructed series, so the effect of the reconstructed
series determines the effect of anomaly detection. Moreover,
in large-scale scenarios of WBS monitoring, there are only
480 data points of each WBS for model training (1/20 of the
public SMD Dataset training data size). Then the problem
is: how to reconstruct time series well on a small amount
of training data? GenAD ﬁrst randomly selected 20% of N-
dimensions to be masked with a ﬁxed random series in Te
as shown in Fig. 2 like Bert model(Devlin et al. 2018). Then
the left 80% unmasked series inTe and all N-dimensions in
Ta toTd are used to reconstruct the 20% masked series. As
20% of N-dimensions are selected randomly, GenAD does
not know which series of N has been selected to be masked
or have been used to be reconstructed during model train-
ing, which will force the model to learn correlations and
temporal patterns of MTS to minimize loss after the sufﬁ-
cient number of training epochs. Choosing 20% of MTS in
Te here means reconstructing one series with four series in
each training epoch.
Network Architecture Fig. 2 shows network architec-
ture of GenAD. GenAD consists of three parts, which are
four hidden-layers with Time-Series Attention and Multi-
Correlation Attention in each layer, Linear-layer and Loss

# --- Page 3 ---
Linear
Loss(cosh of original series and reconstructed series)
N-dimensions
TbTa TdTc Te
20% of N-
dimensions
are masked with
a fixed random
series in T_e
…
…
…
…
…
TT10 T_ab T_bc T_cd
Reconstruct the masked series
Original
value of the
masked series
T_e
TIME-SERIES ATTENTION
(Head_1~~Head_8)
TIME-SERIES ATTENTION
(Head_1~~Head_8)
TIME-SERIES ATTENTION
(Head_1~~Head_8)
TIME-SERIES ATTENTION
(Head_1~~Head_8)
MULTI-CORRELATION ATTENTION
(Head_1~~Head_8)
MULTI-CORRELATION ATTENTION
(Head_1~~Head_8)
MULTI-CORRELATION ATTENTION
(Head_1~~Head_8)
MULTI-CORRELATION ATTENTION
(Head_1~~Head_8)
Layer-1
Layer-2
Layer-3
Layer-4
GenAD
Figure 2: Model Architecture
function. Four hidden-layers and Linear-layer are intro-
duced to reconstruct series. Loss is capture by cosh between
the reconstructed series and original series.
More Details of Input Series Input series is N-
dimensions MTS with time length Tall. Time length Tall is
divided into (0,T 1) and (T1,T ), as shown in Fig. 2, while
the length of (0,T 1) is equal to 4 times the length of(T1,T ).
Given the length of(T1,T ) isTe, the length of(0,T 1) is sum
ofTa,Tb,Tc, andTd, while length ofTa,Tb,Tc, andTd are
the same and all equal to Te. 20% of N-dimensions are ran-
domly selected to be masked with a ﬁxed random series in
Te. Then, the left 80% original series and 20% masked se-
ries inTe, as well as all series inTa toTd, are input series of
GenAD.
Pre-training GenAD We pre-train GenAD based on
3000 real-world WBS Dataset (unlabeled data) with 18-
dimensional MTS each station in China Mobile for learn-
ing the general correlations and temporal patterns. For each
speciﬁc station, only a small amount of data are required to
ﬁne-tune the model, which empowers GenAD to be used in
Large-scale WBSes monitoring.
Multi-Correlation Attention and Time-Series
Attention
Multi-Correlation Attention Existing deep models use
CNN, AE, or V AE, to represent correlations of MTS. Once
model training has been completed ofﬂine, the correlations
will not change during online inference. However, the MTS
of WBS in China Mobile are not identically distributed.
For example, there may exist strong correlation between xi
andxj ofX in (0,T 1), but when distribution of xi andxj
has changed, there will be weak or no correlation between
xi and xj in (T1,T ). Therefore, GenAD introduces Multi-
Correlation Attention to capture the dynamic correlation, as
well as non-linear, coupling, and high-order correlations.
The input of Multi-Correlation Attention is all the MTS
in (T1,T ) (including the masked and unmasked series), as
shown in Fig. 3a. Assuming the original and masked series
in (T1,T ) isX Te, and the reconstructed series by surround-
ings is ˜X Te (only the masked series are reconstructed rather
than the entire series). Given one of the masked series xiTe
in X Te as an example, the reconstructed series of xiTe is
˜xTe
i , Multi-Correlation Attention is implemented by “(2)”:
˜xTe
i =MultiCorrelationAttention[xi
Te ]

∑
j=(1,2,...,i−1,i+1,...,N )
sof tmax( (Qi
Te )(Kj
Te )
T ranspose
√
d
)Vj
Te
(2)
where Qi
Te is obtained through transformation of xiTe
in (T1,T ). Transformation of xiTe means that xiTe is mul-
tiplied by the transition matrix, and transition matrix can
be learned through model training. Kj
Te and Vj
Te are ob-
tained through transforming of surrounding series of xiTe
in (T1,T ). Transpose is the transpose of a matrix, d is
the length of xiTe in time (T1,T ). Multi-Correlation At-
tention ﬁrst obtains the correlations between Qi
Te and all
Kj
Te by (Qi
Te )(Kj
Te )T ranspose
√
d , then reconstructesxiTe by a
weighted sum ofVj
Te:
˜xTe
i =
∑
j=(1,2,...,i−1,i+1,...,N )
simjVj
Te (3)
sim is correlations and obtained throughsoftmax of the real-
time Dot-Product of Qi
Te and Kj
Te. Although transition
matrix ofQi
Te andKj
Te remain constant after ofﬂine train-
ing, as xiTe and surrounding series of xiTe keep changing
online, the result ofQi
Te andKj
Te also keep changing, with
the dynamic correlations (sim) between xiTe and all series
being captured, as well as non-linear and coupling correla-
tions from ReLU activation function and Dot-Product oper-
ation. The ability to represent correlation can be increased
by introducing Multi-head. Multi-Correlation Attention also

--- Page 4 ---
captures the higher-order correlation by stacking multiple
layers. In summary, Multi-Correlation Attention consists of
two layers at least. The ﬁrst layer learns the dynamic, non-
linear, and coupling correlation, and the second layer learns
high-order correlations.
Time-Series Attention Existing deep models use RNN,
GRU, or LSTM, to represent temporal patterns of MTS.
However, GRU or LSTM is difﬁcult to capture the various
temporal patterns (including dynamic, trend, delay, and peri-
odicity) of N-dimensional series simultaneously, especially
when N is large. GenAD employs Time-Series Attention to
represent the various temporal patterns of MTS.
Givenxk inX as an example, and assuming xk in time
(T1,T ) (denoted asxkTe) is masked with a ﬁxed random se-
ries. Then the input of Time-Series Attention isxk in (0,T ),
denoted as xkTa, xkTb, xkTc, xkTd and xkTe, as shown in
Fig. 3b. The reconstructed series of xkTe is ˜xTe
k and Time-
Series Attention is implemented by “(4)”
˜xTe
k =TimeSeriesAttention[xk
Te] =
∑
t=(Ta,Tb,Tc,Td)
soft max((Qk
Te)(Kk
t)
T ranspose
√
d
)Vk
t
(4)
WhereQk
Te is the transformation of xk in timeTe;Kk
t
andVk
t are the transformation ofxk in timeTa,Tb,Tc,Td;
Transpose is the transpose of a matrix; d is the length ofxk
in time Te. Equation “(4)” means that GenAD reconstructs
xk in time Te by learning the various temporal patterns of
xk inTa,Tb,Tc,Td.
After sufﬁcient model training for Multi-head and Hid-
den layer of Time-Series Attention, GenAD can represent
the various temporal patterns of MTS simultaneously. At-
tention mechanism, different from LSTM, also allows for
parallelization, which is especially important at longer se-
ries lengths.
Fusion of Two Attentions GenAD introduces Time-Series
Attention and Multi-Correlation Attention to capture the
temporal patterns and correlations of MTS. We can set the
ﬁrst and third hidden-layers of GenAD to be Time-Series
Attention, while the second and fourth hidden-layers to
be Multi-Correlation Attention. However, such an indepen-
dent architecture will artiﬁcially reduce the representation
of GenAD, so we adopt the fusion of Time-Series Attention
and Multi-Correlation Attention. Each layer captures both
the temporal patterns of series and the correlations among
series. The fusion can be implemented by concatenating two
kinds of attention or adopting the general attention represen-
tations which can support two kinds of attention at the same
time. GenAD chooses the latter and automatically learns the
representation parameters.
Method for Anomaly Detetion
As GenAD evaluates the reconstruction error between the
original series and the reconstructed series to detect anoma-
lies, we set a two-level dynamic threshold (denoted as
metric-level thresholdGatemetric and entity-level threshold
Gateentity), which is derived from the anomaly rate. For the
metric-level, if reconstruction error of one time series at time
t is greater then Gatemetric, the time series is declared as
anomalous. For an N-dimensional entity at time t′, if there
are M time series ( M > Gatemetric) that are anomalous,
then the entity is declared as anomalous.
GenAD gets a dynamic anomaly threshold on different
datasets by anomaly rate. Assuming that the anomaly rate is
AR, the anomaly threshold is Gate, and the reconstruction
error of single-dimensional or multi-dimensional in Te are
ETe, then
P (ETe≤Gate) = 1−AR (5)
Assume that the probability density function of ETe is
f(e), and the probability distribution function F (e) =∫ e
−∞f(t)dt, then “(5)” becomes
F (Gate) =
∫ Gate
−∞
f(t)dt = 1−AR (6)
We need to get the probability distribution function F (e)
of ETe, and then calculate the dynamic anomaly thresh-
old Gate. The simple idea is to obtain F (e) by analyz-
ing the statistical features of ETe, for example, ETe obeys
gaussian-distribution or t-distribution. However, this method
is not available in large-scale service or equipment scenar-
ios, as the statistical features of each service are different
and there are few data of each service for analysis. Futher-
more, OmniAnomaly(Su et al. 2019) applies Extreme Value
Theory (EVT)(Siffer et al. 2017) to estimate the parameters
of the distribution forETe. However, the complexity of this
method is high, which makes it difﬁcult to quickly obtain the
anomaly thresholdGate. Different from the above methods,
we estimate the probability density function f(e) of ETe
based on the data ofETe,
f(e)=
N umE∑
i=1
eTe
gatei,e Te
gatei =
{
1,if (e− ∆e≤ETe
i <e )
0,else
(7)
Num E is the number of ETe,ETe
i isith sample data of
ETe, and ∆e is the sample interval of ETe for f(e). Then
we integratef(e) to get the probability distribution function
F (e) =
e∑
min ETe
f(t), and get the dynamic threshold Gate
by “(6)”. It is worth noting that in order to reduce the error
of parameter estimation through sampled data, we setA′
R =
η +AR and “(6)” becomes F (Gate) =
∫ Gate
−∞ f(t)dt =
1−A′
R , whereη∈ [−0.01, 0.01] is set to maximize the F1-
score during the validation period. Subsequent experimental
results show that this threshold selection method is simple
but effective.
EXPERIMENTS
In this section, we ﬁrst introduce the experimental datasets,
comparison methods and evaluation metrics. We further
show the feasibility of our model in large-scale anomaly de-
tection scenarios. In addition, we also conduct experiments
to verify the contributions of each component in GenAD.
Finally, we describe the Versatility of GenAD.

--- Page 5 ---
a) Input series of Multi-Correlation Attention Multi-Correlation Attention
N-dimensions
TbTa TdTc Te
…
…
…
…
…
TT10 T_ab T_bc T_cd
…
…
…
…
…
b) Input series of Time-Series Attention Time-Series Attention
N-dimensions
TbTa TdTc Te
…
…
…
…
…
TT10 T_ab T_bc T_cd
…
…
…
…
…
masked
series
masked
series
Figure 3: Input of Multi-Correlation Attention and Time-Series Attention
Experimental Setup
Datasets We evaluate the performance of GenAD on 3
Datasets.
(1) WBS Dataset. WBS datasets are collected from real-
world WBSes in China Mobile, and are divided into unla-
beled data and labeled data. As there are large-scale stations
that need to be monitored, only 10-day-long MTS with 15-
minute sample intervals (960 data points) were stored for
each station. We ﬁrst randomly select 3000 WBSes (un-
labeled data) with 18-dimensional MTS in each station.
The 3000 WBSes are lack training labels. Moreover, we
randomly select three more areas denoted as WBS-Area1,
WBS-Area2, WBS-Area3 respectively, and then randomly
select 10 WBSes in each area (labeled data). The MTS of
each station is divided into two parts of the same length, of
which the training set size is 480 points (too small for exist-
ing deep models) and the testing set size is 480 points.
(2) Public Datasets. We use SMD (Server Machine
Dataset) (Su et al. 2019), MSL (Mars Science Laboratory
rover) and SMAP (Soil Moisture Active Passive satellite)
for experimental studies. (i) SMD is a 5-week-long dataset
collected from a large Internet company, where each ob-
servation is equally spaced by 1 minute. SMD is collected
from 28 machines classiﬁed into three groups (denoted as
SMD-1, SMD-2, and SMD-3 respectively). Each machine
subset contains approximately 28000 time points, the former
14,000 data points consist of the training set, and the latter
forms the testing set. (ii) MSL has 132,046 time points, of
which the training set size is 58317 and the testing set size
is 73729. Compared with SMD, MSL contains more met-
rics, a higher anomaly rate and more types of anomalies.
(iii) SMAP has 562,798 time points, of which the training
set size is 135182 and the testing set size is 427616.
(3) Synthetic Dataset. We also use MSCRED Synthetic
Dataset(Zhang et al. 2019) and our synthetic dataset(GenAD
Synthetic Dataset) for empirical studies. (i) MSCRED Syn-
thetic Dataset simulates temporal patterns(Trend, Delay, and
Periodicity) by Sin and Cos function. Two sinusoidal waves
have high correlation when their frequencies are similar.(ii)
GenAD Synthetic Dataset simulates various temporal pat-
terns by Sin, Cos, Sawtooth wave and Square wave, while
simulates complex correlations by linear, non-linear and
higher-order inter-dependencies.
Baseline Methods We compare GenAD with the follow-
ing baseline methods: LSTM-NDT(Hundman et al. 2018),
the state-of-the-art unsupervised method OmniAnomaly and
MSCRED. Of these baselines, LSTM-NDT applies LSTM
for MTS prediction, MSCRED detects anomalies based on
reconstruction errors, and OmniAnomaly is based on recon-
struction probability.
Evaluation Metrics We use 3 metrics of Precision, Re-
call, and F1-Score to evaluate the anomaly detection per-
formance of GenAD and baseline methods. In practice, ab-
normal observations usually appear continuously to form
an anomaly segment. Generally, operators care more about
whether the anomaly detection model can detect a continu-
ous anomaly segment, rather than ﬁnding every anomaly in
the segment. Following the suggestion of (Su et al. 2019),
we adopt a point-adjust approach(Xu et al. 2018) to calcu-
late the evaluation metrics, that is, if any observation in the
anomaly segment is detected, it is considered that the entire
segment is correctly detected.
Model Architecture and Parameters All models in the
experiment use the same architecture. The hyper-parameter
of GenAD includes: MASK ratio (default=20%), Hidden
layers(default=3), Attention heads(default=8) and Length of
input series(default=32).
Model Description
We use the general model of GenAD (denoted as
GenAD(G)) to show the feasibility in large-scale scenarios.
GenAD(G) is ﬁrst pre-trained on the large-scale dataset, then
is ﬁne-tuned for each WBS-speciﬁc pattern. We also use
GenAD without pre-training (denoted as GenAD (WP)) and

--- Page 6 ---
GenAD without Time-Series Attention (denoted as GenAD
(WT)) to evaluate the contributions of components.
Overall Performance
It is difﬁcult to deploy existing deep learning models on
large-scale WBSes in China Mobile, due to the huge over-
head in training data for each WBS-speciﬁc pattern. Un-
like these models, the general model of GenAD (denoted
as GenAD(G)) is pre-trained on 3000 real-world unlabeled
WBSes in China Mobile to learn the general representation
of MTS. Then for the given labeled WBSes dataset, only 480
data points of each WBS are required to ﬁne-tune the general
model. After each WBS is ﬁne-tuned for 10,000 steps, the
loss is reduced to below 7, indicating that the model repre-
sents the complex correlations and various temporal patterns
of WBS Datasets well. Table 1 lists the precision, recall,
and F1-score of different WBSes, in which the best score
is highlighted in bold. Note that the precision and recall are
the average values of the datasets, and F1 is derived from
the precision and recall. Although each of these methods
provides an algorithm for calculating the anomaly thresh-
old, they all need a parameter (e.g. the parameter ’level’ in
OmniAnomaly) that quantiﬁes the degree of anomaly as in-
put. Therefore, we conduct multiple experiments to choose
parameters to get the best results for all the methods.
We can see that GenAD(G) performs better than all
baseline methods, with F1-score increasing by 9% over
the best baseline on the total WBS labeled dataset. Com-
pared with other deep learning models(e.g. MSCRED and
OmniAnomaly), GenAD(G) performs better on two steps
framework of pre-training and ﬁne-tuning. As 480 data
points of each WBS are too small for training deep mod-
els, which affects the representations of correlations and
temporal patterns. But GenAD(G) is ﬁne-tuned on pre-
training model, so the speciﬁc models can be easily trans-
ferred with a small amount of training data. We also ob-
serve that reconstruction-based models perform better than
prediction-based models(e.g. LSTM-NDT). This is because
the prediction-based method is more sensitive to noise, and
some series in WBS are less predictable due to some uncon-
trollable factors (such as changes in the network environ-
ment).
Contributions of Components
To show the effects of three key techniques in GenAD,
which are pre-training, Time-Series Attention and Multi-
Correlation Attention, we reconﬁgure GenAD to create two
models: GenAD without pre-training (denoted as GenAD
(WP)) and GenAD without Time-Series Attention (denoted
as GenAD (WT)).
Effect of Pre-training. To verify the effectiveness
of pre-training, we train GenAD without pre-training
(GenAD(WP)) on WBS datasets. We ﬁrst train GenAD(WP)
on each WBS for 10,000 steps like GenAD(G), but the re-
construction loss is only reduced to around 1000, indicating
that GenAD(WP) is not converged well. So we increase the
training steps of GenAD(WP) from 10,000 to 20,000, with
training time increasing from 8 minutes to 16 minutes. As
/uni0000003a/uni00000025/uni00000036/uni00000010/uni00000024/uni00000055/uni00000048/uni00000044/uni00000014/uni0000003a/uni00000025/uni00000036/uni00000010/uni00000024/uni00000055/uni00000048/uni00000044/uni00000015/uni0000003a/uni00000025/uni00000036/uni00000010/uni00000024/uni00000055/uni00000048/uni00000044/uni00000016
/uni00000030/uni00000052/uni00000047/uni00000048/uni0000004f/uni00000003/uni0000005a/uni0000004c/uni00000057/uni0000004b/uni00000052/uni00000058/uni00000057/uni00000003/uni00000033/uni00000055/uni00000048/uni00000010/uni00000057/uni00000055/uni00000044/uni0000004c/uni00000051/uni0000004c/uni00000051/uni0000004a
/uni00000013
/uni00000013/uni00000011/uni00000015
/uni00000013/uni00000011/uni00000017
/uni00000013/uni00000011/uni00000019
/uni00000013/uni00000011/uni0000001b
/uni00000013/uni00000011/uni0000001c
/uni00000014/uni00000011/uni00000013/uni00000029/uni00000014/uni00000010/uni00000056/uni00000046/uni00000052/uni00000055/uni00000048
GenAD(G)
GenAD(WP)
Figure 4: Model without Pre-training
/uni0000003a/uni00000025/uni00000036/uni00000010/uni00000024/uni00000055/uni00000048/uni00000044/uni00000014/uni00000010/uni00000057/uni00000052/uni00000057/uni00000044/uni0000004f/uni0000003a/uni00000025/uni00000036/uni00000010/uni00000024/uni00000055/uni00000048/uni00000044/uni00000014/uni00000010/uni00000014/uni0000003a/uni00000025/uni00000036/uni00000010/uni00000024/uni00000055/uni00000048/uni00000044/uni00000014/uni00000010/uni00000015/uni0000003a/uni00000025/uni00000036/uni00000010/uni00000024/uni00000055/uni00000048/uni00000044/uni00000014/uni00000010/uni00000016
/uni00000030/uni00000052/uni00000047/uni00000048/uni0000004f/uni00000003/uni0000005a/uni0000004c/uni00000057/uni0000004b/uni00000052/uni00000058/uni00000057/uni00000003/uni00000037/uni0000004c/uni00000050/uni00000048/uni00000010/uni00000036/uni00000048/uni00000055/uni0000004c/uni00000048/uni00000056/uni00000003/uni00000024/uni00000057/uni00000057/uni00000048/uni00000051/uni00000057/uni0000004c/uni00000052/uni00000051
/uni00000013
/uni00000013/uni00000011/uni00000015
/uni00000013/uni00000011/uni00000017
/uni00000013/uni00000011/uni00000019
/uni00000013/uni00000011/uni0000001b
/uni00000013/uni00000011/uni0000001c
/uni00000014/uni00000011/uni00000013/uni00000029/uni00000014/uni00000010/uni00000056/uni00000046/uni00000052/uni00000055/uni00000048
GenAD(G)
GenAD(WT)
Figure 5: Model without Time-Series Attention
shown in Fig. 4, GenAD(G) achieves a higher F1-score on
WBS Datasets with only 1/2 training time. This is under-
standable because GenAD(G) is pre-trained on 3000 real-
world WBSes, which empowers GenAD(G) to represent the
general correlations and temporal patterns of MTS. After
only 10,000 ﬁne-tuning steps, GenAD(G) can be transferred
to a speciﬁc WBS anomaly detection. But 480 data points
and 10,000 training steps of each station are too small to
represent the MTS for GenAD(WP).
Effect of Time-Series Attention. We evaluate the per-
formance of the GenAD without Time-Series Attention
(GenAD (WT)) on WBS-Area1, and the results are shown
in Fig. 5, which are WBS-Area1-total and three WBSes se-
lected in WBS-Area1 datasets (denoted as WBS-Area1-1,
WBS-Area1-2, and WBS-Area1-3). Due to the loss of var-
ious temporal patterns, the total performance (WBS-Area1-
total) of GenAD (WT) decreases 4% compared with GenAD
(G). This is because GenAD (WT) can not represent the var-
ious temporal patterns of MTS in WBSes well.
Effect of Multi-Correlation Attention. We do not eval-
uate the performance of GenAD without Multi-Correlation
Attention. As if we use GenAD without Multi-Correlation
Attention, the model will detect each time series in isolation

--- Page 7 ---
Table 1: Results of GenAD(G) and baselines(WBS Datasets)
WBS-Area1 WBS-Area2 WBS-Area3 Total
Method Pre Rec F1 Pre Rec F1 Pre Rec F1 Pre Rec F1
LSTM-NDT 0.500 0.200 0.286 1.000 0.154 0.267 0.500 0.200 0.286 0.667 0.185 0.289
MSCRED 0.599 1.000 0.749 0.603 1.000 0.753 0.608 1.000 0.757 0.603 1.000 0.753
OmniAnomaly 0.768 1.000 0.868 0.762 1.000 0.865 0.747 1.000 0.855 0.759 1.000 0.863
GenAD(G) 0.926 1.000 0.962 0.932 1.000 0.965 0.872 1.000 0.931 0.910 1.000 0.953
/uni00000036/uni00000030/uni00000027/uni00000010/uni00000014/uni00000036/uni00000030/uni00000027/uni00000010/uni00000015/uni00000036/uni00000030/uni00000027/uni00000010/uni00000016
/uni00000036/uni00000030/uni00000027/uni00000003/uni00000027/uni00000044/uni00000057/uni00000044/uni00000056/uni00000048/uni00000057
/uni00000013
/uni00000013/uni00000011/uni00000015
/uni00000013/uni00000011/uni00000017
/uni00000013/uni00000011/uni00000019
/uni00000013/uni00000011/uni0000001b
/uni00000013/uni00000011/uni0000001c
/uni00000014/uni00000011/uni00000013/uni00000029/uni00000014/uni00000010/uni00000056/uni00000046/uni00000052/uni00000055/uni00000048
GenAD(G)
GenAD(WP)
Figure 6: Evaluation of the GenAD(G) on SMD Dataset.
and lose the correlations among multivariate series, which
results in lower performance of an entity.
Versatility of GenAD
General Representation of MTS To demonstrate the ver-
satility of the GenAD(G), we also use SMD Dataset. We ﬁrst
use the data of the ﬁrst 4 machines in each SMD-1, SMD-2,
and SMD-3 (12 machines total) for pre-training, and ﬁne-
tune the general model based on only 10% of the training
data in each test machine. Then we train 16 speciﬁc mod-
els of GenAD (GenAD(WP)) for SMD Dataset. As shown
in Fig. 6, despite the reduction in training data, the perfor-
mance of GenAD(G) does not signiﬁcantly degrade. Inter-
estingly, GenAD(G) performs better than GenAD on SMD-
2. This is understandable because GenAD may be over-ﬁtted
on some speciﬁc training sets and thus sensitive to noise.
On the contrary, GenAD(G) obtains fewer details of spe-
ciﬁc data, which can prevent overﬁtting and get a higher F1-
score.
Represent Inter-dependencies and Intra-dependencies.
For further demonstrating the representations of complex
correlations and various temporal patterns, we train GenAD
without pre-training (GenAD(WP)) for each speciﬁc node
on Public Datasets and Synthetic Dataset.
Public Datasets. We evaluate GenAD(WP) and baselines
on 5 public datasets: SMD-1, SMD-2, SMD-3, MSL and
SMAP. Table 2 shows GenAD(WP) performs better than
all baseline methods, with F1-score increasing by 2.1% to
4.8% over the best baseline of each dataset and 4.3% of total
datasets. So GenAD(WP) performs better on representations
of complex correlations and various temporal patterns.
Synthetic Dataset. Table 3 shows GenAD(WP) per-
forms better than all baseline methods, with F1-score in-
creasing by 3.4% over the best baseline on total Synthetic
Dataset. GenAD(WP) represents the various temporal pat-
terns of each time series, including Sin, Cos, Sawtooth wave
and Square wave, while represents complex correlations of
MTS, including linear, non-linear and higher-order inter-
dependencies.
Validation of Design Choices
Impact of number of attention heads and hidden layers
The number of attention heads and hidden layers is impor-
tant for GenAD. Table 4 shows the F1-score of GenAD(WP)
on SMD-1 by varying different attention head numbers and
hidden layer numbers. We observe that by keeping the num-
ber of heads constant and changing the number of layers,
the 4-layers perform best. The 2-layer Multi-Correlation At-
tention is weak in representing deep and high-order corre-
lations, which leads to a decrease in F1-score; the 6-layer
requires a higher amount of training data, and the model
convergence is not as good as the 4-layer. In addition, we
try the 12-layer attention, and the model can not converge,
which further veriﬁes the analysis results. Similarly, keeping
4-layers unchanged, and changing the number of heads, 12-
head attention performs best. The 8-head Multi-Correlation
Attention has a weak ability to capture dynamic, non-linear
and coupling relationships, while Time-Series Attention has
a decline in the ability to capture the number of periodic fre-
quencies and trends, resulting in a decline in F1; 16-heads
are consistent with the 6-layer analysis.
How Results Vary If We Change The Ratio of MASK If
the ratio of MASK selection is increased, for example, mod-
iﬁed to 40%, Multi-Correlation Attention will learn less in-
formation with less input, which lowers the speed of model
training. If the ratio of MASK selection is reduced, for ex-
ample, modiﬁed to 10%, then each time series can be learned
for reconstruction after at least 10 times in model training.
While for 20%, each series can be learned after at least 5
times in model training. So the reduction in the ratio will in-
crease the number of training epochs. Of course, 20% is not
ﬁxed and can be changed according to the actual datasets.
RELATED WORK
The existing unsupervised anomaly detection models for
MTS can be categorized into the following types:

--- Page 8 ---
Table 2: Results of GenAD(WP) and baselines(Public Datasets)
SMD-1 SMD-2 SMD-3 MSL SMAP Total
Method Pre Rec F1 Pre Rec F1 Pre Rec F1 Pre Rec F1 Pre Rec F1 F1
LSTM-NDT 0.773 0.298 0.431 0.767 0.282 0.412 0.819 0.428 0.557 0.632 0.330 0.433 0.525 0.776 0.627 0.528
MSCRED 0.869 0.853 0.861 0.922 0.898 0.910 0.839 0.908 0.872 0.892 0.934 0.912 0.866 0.982 0.920 0.896
OmniAnomaly 0.891 0.926 0.908 0.829 0.994 0.904 0.858 0.875 0.866 0.916 0.854 0.884 0.936 0.547 0.690 0.862
GenAD(WP) 0.924 0.941 0.933 0.941 0.964 0.952 0.884 0.903 0.893 0.929 0.966 0.947 0.965 0.970 0.968 0.939
Table 3: Results of GenAD(WP) and baselines(Synthetic Dataset)
MSCRED Synthetic GenAD(WP) Synthetic Total
Method Pre Rec F1 Pre Rec F1 Pre Rec F1
LSTM-NDT 0.200 1.000 0.333 0.750 0.600 0.667 0.475 0.800 0.596
MSCRED 0.975 0.933 0.954 0.951 0.999 0.975 0.963 0.966 0.964
OmniAnomaly 0.369 0.695 0.482 0.709 0.799 0.752 0.539 0.747 0.626
GenAD(WP) 0.999 1.000 0.999 0.992 1.000 0.996 0.996 1.000 0.998
Table 4: F1-score of GenAD(WP) with different number of
attention heads and hidden layers
Attention heads 12 12 12 8 16
Hidden layers 2 6 4 4 4
F1-score 0.913 0.927 0.933 0.923 0.902
(1) Anomaly detection can be implemented for each
dimension of MTS, and the overall status of an entity
is voted or weighed on the outputs of each dimension.
Anomaly detection for each dimension can be realized
by statistical principles or distance measurements, includ-
ing 3sigma(Son et al. 2016), boxplot(Moumena and Gues-
soum 2015), HBOS(Goldstein and Dengel 2012), KNN,
AvgKNN(Angiulli and Pizzuti 2002), OCSVM(Das et al.
2010), etc. These models obtain the distribution or the far-
thest distance of normal series, while anomaly is detected
as outliers. These models require less training data, which
are suitable for large-scale series. However, most of these
models perform better for short-term abnormalities, while
the performance will be attenuated for long-term abnormal-
ities. Anomaly detection for each dimension can also be re-
alized by prediction(ARIMA(Contreras et al. 2003), LSTM,
Prophet(Medina et al. 2007)) or reconstruction (AE, V AE).
These models learn the intra-dependencies of series and
adapt well to time series. However, these models detect each
time series in isolation and lose the correlations among mul-
tivariate series, which results in lower performance of an en-
tity. Moreover, these models require large and different data
for training, which limits the application for large-scale se-
ries.
(2) Anomaly detection can also be implemented at
the Entity-level than for each dimension. PCA(Shyu
et al. 2003), RPCA(Paffenroth, Kay, and Servi 2018),
MCD(Rousseeuw and Driessen 1999) learn Inter-
dependency patterns of multivariate series and detect
anomalies based on changes in correlations, which requires
less training data. But these models only represent the
linear correlations. DEC(Xie, Girshick, and Farhadi 2016),
DR+K-means(Yang et al. 2017), DAGMM reduce the di-
mension of multivariate series by DNN or AE, which solves
the problem of representations of non-linear correlation.
RSRAE(Lai, Zou, and Lerman 2019) combines AE and
RSR to learn non-linear correlation, which also exhibits
robustness to abnormal points in the training data. However,
none of the above models is suitable for time series. MS-
CRED(Zhang et al. 2019) detected anomalies by calculating
the differences between the reconstructed and the original
correlation matrix. However, MSCRED only measures the
correlation matrix and loses the intra-dependencies of the
series itself. Moreover, the correlation matrix is obtained
by a simple inner-product of two time series, which is im-
possible to ﬁnd the deep higher-order correlation. Omni(Su
et al. 2019) introduces V AE to mine the inter-dependencies
and combines GRU to represent intra-dependencies of
series, which achieves robust results. However, single-layer
GRU is difﬁcult to capture the various temporal patterns
of N-dimensional series when N is large. Omni also lose
dynamic correlation and requires large training data, which
also limits the application in large-scale MTS.
Compared with the above approaches, GenAD can not
only obtain dynamic, non-linear and deep higher-order cor-
relations, but also represent various temporal patterns of
time series. More importantly, GenAD proposes a pre-
training algorithm on large-scale MTS, which can be easily
transferred to a speciﬁc entity with only a small amount of
training data.
Conclution
In this paper, we propose a general pre-training algorithm
on large-scale WBSes in China Mobile, which can be easily
transferred to a speciﬁc AD task with only a small amount
of training data. we also adopt Multi-Correlation Attention
to represent the complex correlations among the MTS and
employ Time-Series Attention to represent the various tem-

--- Page 9 ---
poral patterns of each time series. Through extensive experi-
ments, GenAD increases F1-score by total 9% on real-world
datasets in China Mobile, while the performance does not
signiﬁcantly degrade on public datasets with only 10% of the
training data. We have applied GenAD in monitoring large-
scale WBS behaviors in China Mobile, which has improved
operation efﬁciency by 30%-40%.
References
Angiulli, F.; and Pizzuti, C. 2002. Fast outlier detection
in high dimensional spaces. In European conference on
principles of data mining and knowledge discovery , 15–27.
Springer.
Aytekin, C.; Ni, X.; Cricri, F.; and Aksu, E. 2018. Cluster-
ing and unsupervised anomaly detection with l 2 normalized
deep auto-encoder representations. In 2018 International
Joint Conference on Neural Networks (IJCNN), 1–6. IEEE.
Burgess, C. P.; Higgins, I.; Pal, A.; Matthey, L.; Watters, N.;
Desjardins, G.; and Lerchner, A. 2018. Understanding dis-
entangling inβ-V AE.arXiv preprint arXiv:1804.03599.
Contreras, J.; Espinola, R.; Nogales, F. J.; and Conejo, A. J.
2003. ARIMA models to predict next-day electricity prices.
IEEE transactions on power systems, 18(3): 1014–1020.
Das, S.; Matthews, B. L.; Srivastava, A. N.; and Oza, N. C.
2010. Multiple kernel learning for heterogeneous anomaly
detection: algorithm and aviation safety case study. In Pro-
ceedings of the 16th ACM SIGKDD international conference
on Knowledge discovery and data mining, 47–56.
Devlin, J.; Chang, M. W.; Lee, K.; and Toutanova, K. 2018.
BERT: Pre-training of Deep Bidirectional Transformers for
Language Understanding.
Goldstein, M.; and Dengel, A. 2012. Histogram-based out-
lier score (hbos): A fast unsupervised anomaly detection al-
gorithm. KI-2012: Poster and Demo Track, 59–63.
Hundman, K.; Constantinou, V .; Laporte, C.; Colwell, I.; and
Soderstrom, T. 2018. Detecting spacecraft anomalies using
lstms and nonparametric dynamic thresholding. In Proceed-
ings of the 24th ACM SIGKDD international conference on
knowledge discovery & data mining, 387–395.
Kingma, D. P.; and Welling, M. 2013. Auto-encoding varia-
tional bayes. arXiv preprint arXiv:1312.6114.
Lai, C.-H.; Zou, D.; and Lerman, G. 2019. Robust Sub-
space Recovery Layer for Unsupervised Anomaly Detec-
tion. arXiv preprint arXiv:1904.00152.
Liu, Y .; Li, Z.; Zhou, C.; Jiang, Y .; Sun, J.; Wang, M.; and
He, X. 2019. Generative adversarial active learning for un-
supervised outlier detection. IEEE Transactions on Knowl-
edge and Data Engineering.
Medina, I.; Montaner, D.; T´arraga, J.; and Dopazo, J. 2007.
Prophet, a web-based tool for class prediction using microar-
ray data. Bioinformatics, 23(3): 390–391.
Moumena, A.; and Guessoum, A. 2015. Fast anomaly detec-
tion using Boxplot rule for multivariate data in cooperative
wideband cognitive radio in the presence of jammer. Secu-
rity and Communication Networks, 8(2): 212–219.
Paffenroth, R.; Kay, K.; and Servi, L. 2018. Robust pca
for anomaly detection in cyber networks. arXiv preprint
arXiv:1801.01571.
Rousseeuw, P. J.; and Driessen, K. V . 1999. A fast algorithm
for the minimum covariance determinant estimator. Techno-
metrics, 41(3): 212–223.
Shyu, M.-L.; Chen, S.-C.; Sarinnapakorn, K.; and Chang,
L. 2003. A novel anomaly detection scheme based on
principal component classiﬁer. Technical report, MIAMI
UNIV CORAL GABLES FL DEPT OF ELECTRICAL
AND COMPUTER ENGINEERING.
Siffer, A.; Fouque, P.-A.; Termier, A.; and Largouet, C.
2017. Anomaly detection in streams with extreme value
theory. In Proceedings of the 23rd ACM SIGKDD Interna-
tional Conference on Knowledge Discovery and Data Min-
ing, 1067–1075.
Son, S.; Gil, M.-S.; Moon, Y .-S.; and Won, H.-S. 2016.
Anomaly Detection of Hadoop Log Data Using Moving Av-
erage and 3-Sigma. KIPS Transactions on Software and
Data Engineering, 5(6): 283–288.
Su, Y .; Zhao, Y .; Niu, C.; Liu, R.; Sun, W.; and Pei, D.
2019. Robust anomaly detection for multivariate time series
through stochastic recurrent neural network. In Proceed-
ings of the 25th ACM SIGKDD International Conference on
Knowledge Discovery & Data Mining, 2828–2837.
Xie, J.; Girshick, R.; and Farhadi, A. 2016. Unsupervised
deep embedding for clustering analysis. In International
conference on machine learning, 478–487.
Xu, H.; Chen, W.; Zhao, N.; Li, Z.; Bu, J.; Li, Z.; Liu,
Y .; Zhao, Y .; Pei, D.; Feng, Y .; et al. 2018. Unsupervised
anomaly detection via variational auto-encoder for seasonal
kpis in web applications. In Proceedings of the 2018 World
Wide Web Conference, 187–196.
Yang, B.; Fu, X.; Sidiropoulos, N. D.; and Hong, M. 2017.
Towards k-means-friendly spaces: Simultaneous deep learn-
ing and clustering. In international conference on machine
learning, 3861–3870. PMLR.
Zhang, C.; Song, D.; Chen, Y .; Feng, X.; Lumezanu, C.;
Cheng, W.; Ni, J.; Zong, B.; Chen, H.; and Chawla, N. V .
2019. A deep neural network for unsupervised anomaly de-
tection and diagnosis in multivariate time series data. InPro-
ceedings of the AAAI Conference on Artiﬁcial Intelligence ,
volume 33, 1409–1416.
Zhou, C.; and Paffenroth, R. C. 2017. Anomaly detec-
tion with robust deep autoencoders. In Proceedings of the
23rd ACM SIGKDD International Conference on Knowl-
edge Discovery and Data Mining, 665–674.
Zong, B.; Song, Q.; Min, M. R.; Cheng, W.; Lumezanu, C.;
Cho, D.; and Chen, H. 2018. Deep autoencoding gaussian
mixture model for unsupervised anomaly detection. In In-
ternational Conference on Learning Representations.