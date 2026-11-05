---

## article_number: 6
slug: garcia-gonzalez-2022-milets-dc-vae
pdf: Garcia_Gonzalez_2022_MILETS_DC-VAE.pdf
extraction_status: ok
last_updated: 2026-06-26

# Raw PDF text — Article 6 (garcia-gonzalez-2022-milets-dc-vae)

- **Source PDF:** `Literature Review PDFs/02_Grouped_Time_Series/Garcia_Gonzalez_2022_MILETS_DC-VAE.pdf`
- **Wiki source page:** [[../sources/garcia-gonzalez-2022-milets-dc-vae|garcia-gonzalez-2022-milets-dc-vae]]

## Extracted text

--- Page 1 ---
Mining Multivariate Time-Series for Anomaly Detection in Mobile Networks
On the Usage of Variational Auto Encoders and Dilated Convolutions
G. García González, S. Martinez Tagliafico, A. Fernández, G. Gómez
J. Acuña, C. Mariño, (†) P. Casas
IIE-FING, Universidad de la República; (†) AIT Austrian Institute of Technology
ABSTRACT
The automatic detection of anomalies in communication networks
plays a central role in network management. Despite the many
attempts and approaches for anomaly detection explored in the
past, the detection of rare events in multidimensional network
data streams still represents a complex to tackle problem. Network
monitoring data generally consists of hundreds of counters periodi-
cally collected in the form of time-series, resulting in a complex-to-
analyze multivariate time-series (MTS) process. Traditional time-
series anomaly detection methods target univariate time-series
analysis, which makes the multivariate analysis cumbersome and
prohibitively complex when dealing with MTS data. In this paper
we introduce DC-V AE, a novel approach to anomaly detection in
MTS data, leveraging convolutional neural networks (CNNs) and
variational auto encoders (VAEs). DC-V AEdetects anomalies in
MTS data through a single model, exploiting temporal informa-
tion without sacrificing computational and memory resources. In
particular, instead of using recursive neural networks, large causal
filters, or many layers, DC-V AErelies on Dilated Convolutions
(DC) to capture long and short term phenomena in the data, avoid-
ing complex and less-efficient deep architectures, thus simplifying
learning. We evaluate DC-V AEon the detection of anomalies in
the TELCO dataset, a large-scale, multi-dimensional network mon-
itoring dataset collected at an operational mobile Internet Service
Provider (ISP), where anomalous events were manually labeled
by experts during a time span of seven-months, at a five-minutes
granularity. Results show the main properties and advantages in-
troduced by VAEs for time-series anomaly detection, as well as
the out-performance of DC-V AEas compared to standard VAEs
for time-series modeling. We also evaluate DC-V AEin open, pub-
licly available datasets, comparing its performance against other
multivariate anomaly detectors based on deep learning generative
models. For the sake of reproducibility and as an additional con-
tribution, we make the TELCO dataset publicly available to the
community, and openly release the code implementing DC-V AE.
KEYWORDS
Anomaly Detection, Deep Learning, Multivariate Time-Series, Di-
lated Convolution, VAE, Reproducibility, New Datasets
1 INTRODUCTION
Network monitoring data often consists of hundreds or thousands
of variables periodically measured and analyzed in the form of time-
series, resulting in a complex-to-analyze multivariate time-series
(MTS) process. Real-time anomaly detection in such MTS processes
is a key ingredient for network operation and management. There
is a vast literature on the problem of anomaly detection in time-
series using traditional statistical models [ 1, 3, 4, 10, 25]; due to
the non-stationary, non-linear, and high-noise characteristics of
network monitoring time-series data, these traditional models have
difficulty predicting these data with high precision. Hence, modern
approaches to time-series anomaly detection based on deep learning
technology have flourished in recent years [16]. Most approaches in
the literature address the problem by either focusing on univariate
time-series modeling and analysis – running an independent detec-
tor for each time-series, or by considering multi-dimensional input
data with short-term memory analysis, to avoid the scalability limi-
tations introduced by very deep architectures, or the complexities
and delays introduced by recurrent topologies.
In this paper we introduce DC-V AE, an unsupervised and mul-
tivariate approach to anomaly detection in time-series, based on
popular Variational Auto-Encoders (VAEs). VAEs are a generative
version of classical auto-encoders, with the particularity of hav-
ing, by conception, continuous latent spaces; as such, VAEs map
the input variables into a multivariate latent distribution, which
enables a generative process. A VAE provides a probabilistic man-
ner to describe an observation in the latent space. Thus, rather
than training an encoder which outputs a single value describing
each latent state attribute, the encoder is formulated to describe
a probability distribution for each latent attribute. One of the key
advantages of VAEs for anomaly detection is that, for a given in-
put, they produce as output prediction (i.e., reconstruction) not
only an expected value, but also the associated standard deviation,
corresponding to the distribution the model understands (i.e., has
learned) generated the corresponding input. This automatically de-
fines a normality region for each independent time-series, which can
then be easily exploited for detecting deviations beyond this region.
Using VAEs as underlying approach allows the user to visualize the
region of normal behavior in a simple and appealing way, enabling
fine-grained, per univariate time-series anomaly detection.
To exploit the temporal dependencies and characteristics of time-
series data in a fast and efficient manner, we take a Dilated Convolu-
tional (DC) Neural Network (NN) as the VAE’s encoder and decoder
architecture. DCNNs have shown excellent performance for process-
ing sequential data in a causal manner [15], i.e., without relying on
recursive architectures, which are generally less time-efficient and
more difficult to train (e.g., gradient exploding/vanishing problems).
Compared to normal convolutions, dilated convolutions improve
time-series modeling by increasing the receptive field of the neural
network, reducing computational and memory requirements, and
most importantly, enabling training – and detection – on longer-
in-the-past temporal sequences.
We apply DC-V AEto a MTS dataset arising from the monitoring
of an operational mobile ISP, detecting anomalies of very different
structural properties. Referred to as the TELCO dataset, this large-
scale – about 750 thousand samples,long time-span – seven months’
1

--- Page 2 ---
MiLeTS ’22, August 15, 2022, Washington, DC, USA García González et al.
𝑥 𝑞𝜙(𝑧|𝑥)
𝜇𝑧
𝜎𝑧
𝑔(𝜇𝑧, 𝜎𝑧) 𝑝𝜃(𝑥|𝑧)
𝜇𝑥
𝜎𝑥
𝑧
Encoder Decoder
Reparameterization
trick
Figure 1: Variational autoencoder and the reparameterization
trick.
worth of measurements collected at a five-minutes scale, multi-
dimensional – twelve different metrics (time-series), network moni-
toring dataset includes ground-truth labels for anomalous events
at each individual time-series, manually labeled by the experts of
the network operation center (NOC) managing the mobile ISP. We
compare DC-V AEagainst a traditional VAE model for snapshot-
input-based anomaly detection, where the encoder/decoder archi-
tecture is based on standard, fully connected feed-forward neural
networks, and the input corresponds to the MTS at the specific time
of detection. We shall refer to this model as Standard-VAE (S-VAE).
In addition, we evaluate DC-V AEin an open, publicly available
dataset commonly used in the literature – the SWaT dataset [14],
and compare its performance against other MTS anomaly detectors
based on deep learning generative models, which have become
very popular in recent years. For the sake of reproducibility and as
an additional contribution, we make the TELCO dataset publicly
available to the community, and openly releaseDC-V AE’s code (due
to double-blind reviewing, we would add the link to the repository
in case of acceptance of the paper).
The reminder of the paper is organized as follows: Section 2
briefly overviews the related work; in Section 3 we describe the
DC-V AEmodel in detail; Section 4 presents the TELCO mobile ISP
dataset collected for evaluation, and reports the results obtained
with DC-V AEin the detection of anomalies in TELCO, benchmark-
ing its performance against S-VAE, as well as against other ap-
proaches in the SWaT open dataset. Finally, Section 5 concludes
the paper.
2 RELATED WORK
There are multiple surveys on general-domain anomaly detection
techniques [3, 4, 10] as well as on network anomaly detection [1, 25].
The diversity of data characteristics and types of anomalies results
in a lack of universal anomaly detection models. Modern approaches
to time-series anomaly detection based on deep learning technology
have flourished in recent years [16]. Due to their data-driven nature
and achieved performance in multiple domains, generative models
such as VAEs and Generative Adversarial Networks (GANs) have
gained relevance in the anomaly detection field [5, 7–9, 13, 22, 23].
Modeling data sequences through a combination of variational in-
ference and deep learning architectures has been vastly researched
in other domains in recent years, mostly by extending VAEs to
Recurrent Neural Networks (RNNs), with architectures such as
1
0
1
AACCost
1
0
1
AADCost
1
0
1
AASCost
1
0
1
ADTCost
1
0
1
ECPCost
1
0
GSPCost
1
0
1
AACCount
2
0
AADTraffic
1
0
1
AASCount
1
0
1
ADTCount
2
0
ECPCount
1
0
GSPCount
Variable
x
x
TS2
TS3
TS1
TS4
TS5
TS6
TS7
TS8
TS9
TS10
TS11
                        TS12
1
0
1
AACCost
1
0
1
AADCost
1
0
1
AASCost
1
0
1
ADTCost
1
0
1
ECPCost
1
0
GSPCost
1
0
1
AACCount
2
0
AADTraffic
1
0
1
AASCount
1
0
1
ADTCount
2
0
ECPCount
1
0
GSPCount
Variable
x
x
TS2
TS3
TS1
TS4
TS5
TS6
TS7
TS8
TS9
TS10
TS11
                        TS12
(a) Prediction of time-series TS3. (b) Prediction of time-series TS 5.
1
0
1
AACCost
1
0
1
AADCost
1
0
1
AASCost
1
0
1
ADTCost
1
0
1
ECPCost
1
0
GSPCost
1
0
1
AACCount
2
0
AADTraffic
1
0
1
AASCount
1
0
1
ADTCount
2
0
ECPCount
1
0
GSPCount
Variable
x
x
TS2
TS3
TS1
TS4
TS5
TS6
TS7
TS8
TS9
TS10
TS11
                        TS12
1
0
1
AACCost
1
0
1
AADCost
1
0
1
AASCost
1
0
1
ADTCost
1
0
1
ECPCost
1
0
GSPCost
1
0
1
AACCount
2
0
AADTraffic
1
0
1
AASCount
1
0
1
ADTCount
2
0
ECPCount
1
0
GSPCount
Variable
x
x
TS2
TS3
TS1
TS4
TS5
TS6
TS7
TS8
TS9
TS10
TS11
                        TS12
(c) Prediction of time-series TS9. (d) Prediction of time-series TS12.
Figure 2: Example of time-series analysis through DC-V AE,
for the TELCO dataset. The normal-operation region is de-
fined by 𝝁𝒙 and 𝝈𝒙 .
STORN [2], VRNN [6], and Bi-LSTM [17] among others. Convolu-
tional layers with dilation have been also incorporated into some
of these approaches [11, 21], allowing to speed up the training pro-
cess based on the possibilities of parallelization offered by these
architectures.
Our work is inspired by previous work on generative models for
network anomaly detection in mutivariate time-series [8]; the Net-
GAN detector [8] follows an architecture based on GANs and RNNs,
where Long Short-Term Memory networks (LSTMs) are employed
as both generator and discriminator models to capture temporal
dependencies in the data.
3 ANOMALY DETECTION WITH DC-V AE
Sequential data such as time-series is generally processed through
sliding windows, condensing the information of the most recent𝑇
measurements. Let us define 𝒙 as a matrix in R𝑀×𝑇 , where𝑀 is the
number of variables in the MTS process, i.e., defines the dimension
of the problem. We also define𝑥(𝑡)∈ R𝑀×1 as an𝑀-dimensional
vector, representing the MTS at a certain time𝑡, and𝑥𝑚(𝑡), with
𝑚∈{ 1,...,𝑀 }, as the value of the𝑚-th time-series at time𝑡.
As depicted in Figure 1, for a given input 𝒙, the trained VAE
model produces two different predictions, 𝝁𝑥 and 𝝈𝑥 – matrices
in R𝑀×𝑇 , corresponding to the parametrization of the probability
distribution which better represents the given input. If the VAE
model was trained (mainly) with data describing the normal behav-
ior of the monitored system, then the output for a non-anomalous
input would not deviate from the mean 𝝁𝑥 more than a specific
integer 𝜶 times the standard deviation 𝝈𝑥 . On the contrary, if the
input presents an anomaly, the output would not belong to the
region determined by the predicted mean and standard deviation.
For reference, Figure 2 presents the main ideas behind the usage
of VAEs for time-series anomaly detection, in this case portraying
the results obtained in the analysis of the TELCO dataset, used
in this paper for evaluation purposes (see Section 4). For each of
the displayed time-series TS𝑖 – the TELCO dataset corresponds to
2

--- Page 3 ---
DC-V AE, Variational Auto Encoders and Dilated Convolutions for Anomaly Detection in MTS MiLeTS ’22, August 15, 2022, Washington, DC, USA
• In order to deal with long-range temporal dependencies needed for raw audio generation,
we develop new architectures based on dilated causal convolutions, which exhibit very
large receptive ﬁelds.
• We show that when conditioned on a speaker identity, a single model can be used to gener-
ate different voices.
• The same architecture shows strong results when tested on a small speech recognition
dataset, and is promising when used to generate other audio modalities such as music.
We believe that WaveNets provide a generic and ﬂexible framework for tackling many applications
that rely on audio generation (e.g. TTS, music, speech enhancement, voice conversion, source sep-
aration).
2 W AVENET
In this paper we introduce a new generative model operating directly on the raw audio waveform.
The joint probability of a waveform x ={x1,...,x T} is factorised as a product of conditional
probabilities as follows:
p (x) =
T∏
t=1
p (xt|x1,...,x t−1) (1)
Each audio samplext is therefore conditioned on the samples at all previous timesteps.
Similarly to PixelCNNs (van den Oord et al., 2016a;b), the conditional probability distribution is
modelled by a stack of convolutional layers. There are no pooling layers in the network, and the
output of the model has the same time dimensionality as the input. The model outputs a categorical
distribution over the next value xt with a softmax layer and it is optimized to maximize the log-
likelihood of the data w.r.t. the parameters. Because log-likelihoods are tractable, we tune hyper-
parameters on a validation set and can easily measure if the model is overﬁtting or underﬁtting.
2.1 D ILATED CAUSAL CONVOLUTIONS
Input
Hidden Layer
Hidden Layer
Hidden Layer
Output
Figure 2: Visualization of a stack of causal convolutional layers.
The main ingredient of WaveNet are causal convolutions. By using causal convolutions, we
make sure the model cannot violate the ordering in which we model the data: the prediction
p (xt+1|x1,...,x t) emitted by the model at timestept cannot depend on any of the future timesteps
xt+1,x t+2,...,x T as shown in Fig. 2. For images, the equivalent of a causal convolution is a
masked convolution (van den Oord et al., 2016a) which can be implemented by constructing a mask
tensor and doing an elementwise multiplication of this mask with the convolution kernel before ap-
plying it. For 1-D data such as audio one can more easily implement this by shifting the output of a
normal convolution by a few timesteps.
At training time, the conditional predictions for all timesteps can be made in parallel because all
timesteps of ground truth x are known. When generating with the model, the predictions are se-
quential: after each sample is predicted, it is fed back into the network to predict the next sample.
2
Because models with causal convolutions do not have recurrent connections, they are typically faster
to train than RNNs, especially when applied to very long sequences. One of the problems of causal
convolutions is that they require many layers, or large ﬁlters to increase the receptive ﬁeld. For
example, in Fig. 2 the receptive ﬁeld is only 5 (= #layers + ﬁlter length - 1). In this paper we use
dilated convolutions to increase the receptive ﬁeld by orders of magnitude, without greatly increasing
computational cost.
A dilated convolution (also called `a trous, or convolution with holes) is a convolution where the
ﬁlter is applied over an area larger than its length by skipping input values with a certain step. It is
equivalent to a convolution with a larger ﬁlter derived from the original ﬁlter by dilating it with zeros,
but is signiﬁcantly more efﬁcient. A dilated convolution effectively allows the network to operate on
a coarser scale than with a normal convolution. This is similar to pooling or strided convolutions, but
here the output has the same size as the input. As a special case, dilated convolution with dilation
1 yields the standard convolution. Fig. 3 depicts dilated causal convolutions for dilations 1, 2, 4,
and 8. Dilated convolutions have previously been used in various contexts, e.g. signal processing
(Holschneider et al., 1989; Dutilleux, 1989), and image segmentation (Chen et al., 2015; Yu &
Koltun, 2016).
Input
Hidden Layer
Dilation = 1
Hidden Layer
Dilation = 2
Hidden Layer
Dilation = 4
Output
Dilation = 8
Figure 3: Visualization of a stack of dilated causal convolutional layers.
Stacked dilated convolutions enable networks to have very large receptive ﬁelds with just a few lay-
ers, while preserving the input resolution throughout the network as well as computational efﬁciency.
In this paper, the dilation is doubled for every layer up to a limit and then repeated: e.g.
1, 2, 4,..., 512, 1, 2, 4,..., 512, 1, 2, 4,..., 512.
The intuition behind this conﬁguration is two-fold. First, exponentially increasing the dilation factor
results in exponential receptive ﬁeld growth with depth (Yu & Koltun, 2016). For example each
1, 2, 4,..., 512 block has receptive ﬁeld of size 1024, and can be seen as a more efﬁcient and dis-
criminative (non-linear) counterpart of a1×1024 convolution. Second, stacking these blocks further
increases the model capacity and the receptive ﬁeld size.
2.2 S OFTMAX DISTRIBUTIONS
One approach to modeling the conditional distributions p (xt|x1,...,x t−1) over the individual
audio samples would be to use a mixture model such as a mixture density network (Bishop, 1994)
or mixture of conditional Gaussian scale mixtures (MCGSM) (Theis & Bethge, 2015). However,
van den Oord et al. (2016a) showed that a softmax distribution tends to work better, even when the
data is implicitly continuous (as is the case for image pixel intensities or audio sample values). One
of the reasons is that a categorical distribution is more ﬂexible and can more easily model arbitrary
distributions because it makes no assumptions about their shape.
Because raw audio is typically stored as a sequence of 16-bit integer values (one per timestep), a
softmax layer would need to output 65,536 probabilities per timestep to model all possible values.
To make this more tractable, we ﬁrst apply a µ-law companding transformation (ITU-T, 1988) to
the data, and then quantize it to 256 possible values:
f (xt) = sign(xt)ln (1 +µ|xt|)
ln (1 +µ) ,
3
(a) Normal convolution. (b) Dilated convolution.
Figure 3:(∗) Figure taken from the original WaveNet paper [ 15]. Using CNNs with causal filters requires large filters or many
layers to learn from long sequences. Dilated convolutions improve time-series modeling by increasing the receptive field of the
neural network, reducing computational and memory requirements, enabling training on long sequences.
tweleve time-series TS1 to TS12, its real value 𝑥𝑖, along with the
outputs of the VAE𝜇𝑥𝑖 and𝜎𝑥𝑖 , are reported.
In the VAE model, observations 𝒙 are assumed to depend on
a random variable 𝒛 that comes from a lower-dimensional latent
space. The objective is to maximize 𝑃(𝒙), the probability of the
observations through the model. Similar to 𝒙, 𝒛 will also be a se-
quence of length𝑇 , but with a smaller number of dimensions𝐽 <𝑀,
𝒛∈ R𝐽×𝑇 . In formal terms, given an input sample𝒙 characterized by
an unknown probability distribution𝑃(𝒙), the objective is to model
or approximate the data’s true distribution𝑃 using a parametrized
distribution𝑝𝜃 with parameters𝜃. Let 𝒛 be a random vector jointly-
distributed with 𝒙, representing the latent encoding of 𝒙. We can
express𝑝𝜃(𝒙) as:
𝑝𝜃(𝒙) =
∫
𝒛
𝑝𝜃(𝒙, 𝒛)𝑑𝒛, (1)
where𝑝𝜃(𝒙, 𝒛) represents the joint distribution under𝑝𝜃 of the
observable data 𝒙 and its latent representation or encoding 𝒛. Ac-
cording to the chain rule, the equation can be rewritten as:
𝑝𝜃(𝒙) =
∫
𝒛
𝑝𝜃(𝒙|𝒛)𝑝𝜃(𝒛)𝑑𝒛 (2)
In the vanilla VAE,𝑝𝜃(𝒙|𝒛) is considered a Gaussian distribution,
and therefore,𝑝𝜃(𝒙) is a mixture of Gaussian distributions. The
computation of 𝑝𝜃(𝒙) is very expensive and in most cases even
intractable. To speed up training and make it feasible, it is neces-
sary to introduce a further function to approximate the posterior
distribution𝑝𝜃(𝒛|𝒙), in the form of𝑞𝜙(𝒛|𝒙)≈ 𝑝𝜃(𝒛|𝒙). In this way,
the overall problem can be easily translated into the autoencoder
domain, in which the conditional likelihood distribution𝑝𝜃(𝒙|𝒛) is
performed by the probabilistic decoder, while the approximated pos-
terior distribution𝑞𝜙(𝒛|𝒙) is computed by the probabilistic encoder,
cf. Figure 1.
To train this autoencoder and make the application of back-
propagation feasible, a so-called reparameterization trick is gen-
erally introduced. The main assumption on the latent space is
that it can be considered as a set of multivariate Gaussian dis-
tributions, and therefore, 𝒛 ∼ 𝑞𝜙(𝒛|𝒙) = N( 𝝁𝒛, 𝝈𝒛 2). Given a
random matrix 𝜺 ∼N( 0, 𝑰) and⊙ defined as the element-wise
product, the reparameterization trick permits to explicitly define
𝒛 =𝑔(𝝁𝒛, 𝝈𝒛) = 𝝁𝒛+ 𝝈𝒛⊙ 𝜺. Thanks to this transformation, the
variational autoencoder is trainable and the probabilistic encoder
𝒙
M
𝝁𝒛
J
T
Input
Hidden layer 0
Dilation = 1
Hidden layer 1
Dilation = 2
Hidden layer 2
Dilation = 4
Output
𝝈𝒛
Figure 4: Encoder architecture using causal dilated convo-
lutions, implemented through a stack of 1D convolutional
layers.
has to learn how to map a compressed representation of the input
into the two latent vectors 𝝁𝒛 and 𝝈𝒛, while the stochasticity re-
mains excluded from the updating process and is injected in the
latent space as an external input through 𝜺.
To exploit the temporal dimension of the input time-series, we
proposed an encoder/decoder architecture based on popular CNNs,
using Dilated Convolutions (DCs) [15]. DC is a technique that ex-
pands the input by inserting gaps between its consecutive samples.
In simpler terms, it is the same as a normal convolution, but it
involves skipping samples, so as to cover a larger area of the input.
Figure 3 explains the basic idea behind DCs. The convolutions must
be causal, so that detection can be implemented in real-time. Be-
cause such architectures do not have recurrent connections, they
are often much faster to train than RNNs, and do not suffer from
3

--- Page 4 ---
MiLeTS ’22, August 15, 2022, Washington, DC, USA García González et al.
dataset # samples duration # anomalous samples
training 310,974 3 months 5,672 (1.8%)
validation 103,680 1 month 385 (0.4%)
testing 317,953 3 months 3,080 (1.0%)
total 732,607 7 months 9,137 (1.2%)
Table 1: TELCO dataset. Seven-months worth of measure-
ments were manually labeled, for twelve different metrics.
complex-to-tame gradient exploding/vanishing problems. Using
DCs instead of standard convolutions has several advantages for
real-time analysis: (i) they increase the so-called receptive field,
meaning that longer-in-the-past information can be fed into the
detection; (ii) DCs are computationally more efficient, as they pro-
vide larger coverage at the same computation cost; (iii) by using
DC, the pooling steps are omitted, thus resulting in lesser memory
consumption; (iv) finally, for the same temporary receptive field,
the resulting network architecture is much more compact.
Figure 4 depicts the encoder architecture used in DC-V AE. The
network architecture must be such that the output values depend
on all previous input values. The length𝑇 of the sliding window
plays a key role here, as it must ensure that the output at𝑡 depends
on the input at that time and at {𝑡− 1,𝑡− 2,...,𝑡 −𝑇+ 1}. The
simplest way to achieve this is to use filters of length 𝐹 = 2 and
DCs with dilatation factor𝑑 =𝐹ℎ, which grow exponentially with
the layer depthℎ∈[ 0,𝐻− 1], where𝐻 is the number of layers of
the network. Subsequently,𝐻 is the minimum value that verifies:
𝑇≤ 2∗𝐹𝐻−1. In the example, the window length is𝑇 = 8, and the
target is achieved by taking𝐻 = 3 layers. This direct relationship
between𝑇 and the network architecture has a strong practical
impact, making it easy to construct the encoder/decoder, based on
the desired temporal-depth of the analysis.
Model training is conducted on top of normal-operation data,
to capture the baseline for anomaly detection. Once trained, the
detection process runs continually, rolling the sliding window of
length𝑇 by a unitary-time step. At each time𝑡, the DC-V AEmodel
takes as input the matrix 𝒙∈ R𝑀×𝑇 , constructed out of the last𝑇
samples observed in the MTS, and produces as output matrices 𝝁𝒙
and 𝝈𝒙 – for notation brevity, we define 𝝁 = 𝝁𝒙 and 𝝈 = 𝝈𝒙. From
these two output matrices, the anomaly detection only considers
their values at time𝑡, corresponding to two vectors𝜇(𝑡) and𝜎(𝑡).
For each of the univariate time-series𝑚, an anomaly is detected at
time𝑡 if its value𝑥𝑚(𝑡) falls outside the normal-operation region,
defined by𝜇𝑚(𝑡) and𝜎𝑚(𝑡). More precisely, an anomaly in time-
series𝑚 is declared at time𝑡 if:
|𝑥𝑚(𝑡)− 𝜇𝑚(𝑡)| >𝛼𝑚×𝜎𝑚(𝑡), (3)
where 𝜶 =(𝛼1,...,𝛼 𝑚,...,𝛼 𝑀) is a vector of𝑀 detection sensi-
tivity thresholds, where each𝛼𝑚 can be set independently for each
time-series, allowing for fine-grained, per time-series calibration of
the detection process.
0
2
AACCost
2
0
2
AADCost
2
0
2
AASCost
0
2
ADTCost
0
5
ECPCost
04-15 00 04-15 12 04-16 00 04-16 12 04-17 00 04-17 12 04-18 00 04-18 12 04-19 00 04-19 12
0
2
GSPCost
Variable
x
x
0
2
AACCount
2
0
2
AADTraffic
0
2
AASCount
0
2
ADTCount
0
2
ECPCount
04-15 00 04-15 12 04-16 00 04-16 12 04-17 00 04-17 12 04-18 00 04-18 12 04-19 00 04-19 12
0
2
GSPCount
Variable
x
x
(a) Prediction of time-series TS3.
0
2
AACCost
2
0
2
AADCost
2
0
2
AASCost
0
2
ADTCost
0
5
ECPCost
04-15 00 04-15 12 04-16 00 04-16 12 04-17 00 04-17 12 04-18 00 04-18 12 04-19 00 04-19 12
0
2
GSPCost
Variable
x
x
0
2
AACCount
2
0
2
AADTraffic
0
2
AASCount
0
2
ADTCount
0
2
ECPCount
04-15 00 04-15 12 04-16 00 04-16 12 04-17 00 04-17 12 04-18 00 04-18 12 04-19 00 04-19 12
0
2
GSPCount
Variable
x
x
(b) Prediction of time-series TS5.
0
2
AACCost
2
0
2
AADCost
2
0
2
AASCost
0
2
ADTCost
0
5
ECPCost
04-15 00 04-15 12 04-16 00 04-16 12 04-17 00 04-17 12 04-18 00 04-18 12 04-19 00 04-19 12
0
2
GSPCost
Variable
x
x
0
2
AACCount
2
0
2
AADTraffic
0
2
AASCount
0
2
ADTCount
0
2
ECPCount
04-15 00 04-15 12 04-16 00 04-16 12 04-17 00 04-17 12 04-18 00 04-18 12 04-19 00 04-19 12
0
2
GSPCount
Variable
x
x
(c) Prediction of time-series TS9.
0
2
AACCost
2
0
2
AADCost
2
0
2
AASCost
0
2
ADTCost
0
5
ECPCost
04-15 00 04-15 12 04-16 00 04-16 12 04-17 00 04-17 12 04-18 00 04-18 12 04-19 00 04-19 12
0
2
GSPCost
Variable
x
x
0
2
AACCount
2
0
2
AADTraffic
0
2
AASCount
0
2
ADTCount
0
2
ECPCount
04-15 00 04-15 12 04-16 00 04-16 12 04-17 00 04-17 12 04-18 00 04-18 12 04-19 00 04-19 12
0
2
GSPCount
Variable
x
x
(d) Prediction of time-series TS12.
Figure 5: Example of time-series analysis through DC-V AE,
for the TELCO dataset, using𝑇 = 512 samples – almost 2 days
of temporary receptive field in the past.
4 TELCO AND DC-V AEEV ALUATION
4.1 The TELCO Dataset
A recent study [19] alerts on the limitations of evaluating anomaly
detection algorithms on popular time-series datasets such as Yahoo,
Numenta, or NASA among others. In particular, these datasets are
noted to suffer from known flaws such as trivial anomalies, unreal-
istic anomaly density, mislabeled ground truth, and run-to-failure
bias. For this reason, we decided to evaluate DC-V AEin a propri-
etary MTS dataset, corresponding to real measurements collected
at an operation mobile ISP – note that we are publicly releasing
this dataset to the community. The TELCO dataset corresponds
to twelve different time-series, with a temporal granularity of five
minutes per sample, collected and manually labeled for a period of
seven months, between January 1 and July 31, 2021. This temporal
length is seldom available in other publicly available datasets of
this nature, and is highly relevant and useful to allow for long-term
seasonal behavior analysis.
Each time-series corresponds to aggregated data from different
sources; to keep business confidentiality, we do not specify the
exact type of data reflected by each time-series. The twelve time-
series are typical data monitored in a mobile ISP, including number
and amount of prepaid data transfer fees, number and cost of calls,
volume of data traffic, number of SMS, and more.
Table 1 presents the main details of the dataset. Note in partic-
ular how strongly imbalanced is the dataset in terms of normal-
operation and anomalous samples, which is the typical case for real
network measurements in operational deployments. By definition,
anomalies are rare events. We split the full dataset in three inde-
pendent, time-ordered sub-sets, using measurements from January
to March for model training, April for model validation, and May
to July for testing purposes.
4

--- Page 5 ---
DC-V AE, Variational Auto Encoders and Dilated Convolutions for Anomaly Detection in MTS MiLeTS ’22, August 15, 2022, Washington, DC, USA
4.2 Anomaly Detection Results in TELCO
Figure 5 shows DC-V AEin action, using a sliding-window of length
𝑇 = 512 samples, corresponding to roughly two days of past mea-
surements. This length of time-window is the one providing better
validation results in the TELCO dataset. We take the same time-
series depicted in Figure 2 as reference, but now considering a
longer time span of four days. DC-V AEcan properly track different
types of behavior in the time-series, including the strong seasonal
daily component, but also the operation during weekdays and week-
ends, e.g., visible in Figure 5(d). In this example, time-series TS 3
and TS9 are noisier than time-series TS5 and TS12, which justifies
the need for different sensitivity thresholds𝛼𝑚 to address the un-
derlying nature of each monitored metric. Note in addition how
different periods of time-series variability result in more or less
tight normal-operation regions estimated by DC-V AE, as defined
by𝜎(𝑡).
To apply DC-V AEfor anomaly detection, we have to calibrate
the sensitivity thresholds 𝜶 , which is usually done in a supervised
manner, relying on the labeled anomalies available in the training
and validation datasets. This step is the only one which requires
certain level of “supervision” (in the sense of ground-truth avail-
ability), but could also be done in a self-supervised manner, by
labeling anomalies through outlier detection techniques. In our
specific problem, each sensitivity threshold𝛼𝑚 is calibrated on a
per time-series basis, by maximizing the𝐹 1 score over the training
and validation datasets, doing a grid-search of integer values from
1 to 5. In a nutshell, we decide how many standard deviations𝜎𝑚
shall be considered as tolerance for the normal-operation variability
of the data.
Figure 6 reports some examples of real (i.e., labeled) anomalies
present in the TELCO dataset, in particular for time-series TS 2
and TS4, along with their corresponding identification by DC-V AE,
where sensitivity thresholds 𝜶 were calibrated as mentioned before.
DC-V AEcan detect different types of anomalies present in the data,
of a more transient and spiky nature in the case of TS 4, or on
a more structural basis in the case of TS 2. Note also how some
of the actual measurements fall significantly outside the normal-
operation region – e.g. in Figure 6(c), but still these were not labeled
as anomalous by the expert operator. Whether or not this is a false-
positive produced by DC-V AE, or a non-labeled anomaly missed by
the expert operator is difficult to know.
We also run a quantitative performance analysis ofDC-V AEin the
testing dataset (cf. Table 1). As performance metrics, we consider an
elaborated version of the traditionally used, per-sample evaluation
metrics, to consider a more natural and practical approach for real
anomaly detection applications, evaluating detection performance
in the form of anomaly temporal-ranges. Traditional metrics can
make sense for point anomalies where a true positive corresponds
to a correct detection at the precise point in time. However, as
shown for example in Figure 6(b), many anomalies occur in the
form of multiple, consecutive point anomalies, defining an anom-
aly range. In such scenarios, it could be already enough to have a
partial overlap between the real anomaly range and the predicted
anomaly interval to consider a correct detection. Previous work
have considered these observations [12, 18, 20], defining new met-
rics which prioritize early or delayed detection, or focusing mainly
1.5
1.0
0.5
0.0
0.5
1.0
1.5
2.0 Variable
x
 x
Anomaly
(a) Example of real anomalies in TS2.
1
0
1
2
3
Variable
x
 x
Anomaly
(b) Example of real anomalies in TS2.
2
1
0
1
2
3
4 Variable
x
 x
Anomaly
(c) Example of real anomalies in TS4.
2
0
2
4
Variable
x
 x
Anomaly
(d) Example of real anomalies in TS4.
Figure 6: Examples of real anomalies present in the analyzed
dataset, and their identification by DC-V AE.
on range anomalies. We therefore take the extended definitions of
recall and precision as defined in [18] to generalize for ranges of
anomalies, considering a correct detection if at least one of the sam-
ples between the start and the end of the actual anomaly are flagged
by the model. We refer to these extended, range-based metrics as
𝑅𝑟 ,𝑃𝑟 , and𝐹 1𝑟 , for recall, precision, and f1-score, respectively. Fi-
nally, evaluations are reported independently for each to the twelve
time-series TS𝑚 in the TELCO dataset.
To show the advantages of DC-V AEas compared to the usage
of standard, vanilla VAEs for anomaly detection in time-series,
we define the Standard-VAE (S-VAE) as a snapshot-input-based
anomaly detection model, where the encoder/decoder architecture
is based on a standard 3-layers, fully connected feed-forward neural
network, and the input corresponds to the MTS at the specific time
of detection – i.e.,𝑇 = 1 in S-VAE. Table 2 reports the corresponding
results in the testing dataset, independently for each time-series,
and as an average value. The first observation is that achieved
results are in general rather poor, achieving𝐹 1𝑟 scores around 60%
for eight out of the twelve time-series, and below for the rest. This
is highly in contrast with the high 𝐹 1 scores usually reported in
the literature, when dealing with simulated or flawed datasets [19].
Indeed, dealing with in-the-wild measurements and human-labeled,
highly-imbalanced datasets is more complex than what the results
in the literature usually report – real, in practice MTS anomaly
5

--- Page 6 ---
MiLeTS ’22, August 15, 2022, Washington, DC, USA García González et al.
S-V AE DC-V AE
TS ID 𝑅𝑟 𝑃𝑟 𝐹 1𝑟 𝑅𝑟 𝑃𝑟 𝐹 1𝑟
TS1 23% 56% 32% 58% 71% 64%
TS2 16% 92% 27% 74% 20% 67%
TS3 71% 50% 59% 86% 47% 60%
TS4 63% 25% 36% 63% 21% 32%
TS5 50% 20% 29% 75% 50% 60%
TS6 14% 100% 25% 57% 83% 68%
TS7 45% 100% 63% 72% 90% 80%
TS8 57% 35% 43% 44% 80% 57%
TS9 6% 4% 4% 17% 11% 13%
TS10 39% 81% 52% 52% 59% 55%
TS11 67% 17% 27% 100% 25% 40%
TS12 0% 0% 0% 100% 11% 22%
mean 38% 48% 33% 67% 47% 52%
median 42% 43% 31% 68% 49% 59%
Table 2: Anomaly detection performance with DC-V AEand
S-V AE.
detection is highly complex. Performance is significantly different
for some of the time-series, which corresponds to the different
nature and underlying behavior (cf. Figure 5). Nevertheless, the
outperformance of DC-V AEas compared to S-VAE is outstanding,
largely improving both detection of anomalies (i.e.,𝑅𝑟 ) as well as
overall performance (i.e.,𝐹 1𝑟 ), by almost a factor of two on average.
A preliminary assessment on the low performance obtained for
some of the time-series reveals issues linked to poor labeling in some
cases, as well as lack of sensitivity in some others (i.e., finer-grained
𝜶 values might be needed). Still, DC-V AEresults in terms of its
modeling and tracking capabilities for multivariate time-series data
are promising, and its application to real measurements additionally
permits to evidence the difficulties behind a broadly studied, yet
unsolved problem. A deeper evaluation of DC-V AEin the TELCO
dataset is part of our ongoing work, including the benchmarking
of other anomaly detection approaches in this dataset.
4.3 Benchmarking DC-V AEin SWaT
For the sake of completeness and to provide a stronger and more
comprehensive benchmarking, we compare DC-V AEagainst other
deep-learning-based MTS anomaly detectors in SWaT. The SWaT
dataset consists of 51 time-series of data collected over eleven days
in 2015-2016, on a water treatment operational test-bed, which
represents a small-scale version of a large modern cyber-physical
system. The dataset contains two sub-sets temporally split; the
first week is anomaly free and is considered as the training dataset,
whereas the last four days of data contain 36 attacks of different
nature and duration (from a few minutes to an hour), and is meant
for testing purposes. The total number of anomaly samples accounts
for about 5.8% of the total measurements.
Detector 𝑅 𝑃 𝐹 1
Auto Encoder 53% 73% 61%
EGAN 68% 41% 51%
NET-GAN-(G)enerator 65% 98% 78%
NET-GAN-(D)iscriminator 65% 29% 40%
MAD-GAN-P (best precision) 55% 100% 70%
MAD-GAN-R (best recall) 100% 12% 22%
MAD-GAN-F1 (best F1 score) 64% 99% 77%%
DC-V AE 67% 94% 78%
Table 3: Anomaly detection performance benchmarking
against deep-learning generative models in SWaT.
GAN-based MTS detectors are very popular in the literature,
given their flexibility to model a complex MTS process without
making any assumptions on the underlying distributions. GANs
are a powerful approach to learn the underlying distributions of
data samples, in a purely data-driven, model-agnostic manner. Such
models can be used in the practice to construct better normal-
operation baselines, improving the identification of instances which
deviate from this baseline. We therefore compare DC-V AEagainst
three GAN-based detectors proposed in recent years, including
EGAN [24], MAD-GAN [13], and NET-GAN [8].
To train DC-V AEin SWaT, we take an architecture using𝐽 = 16
as dimension of the latent space, and a sequence length𝑇 = 128,
both parameters calibrated in the same way we did it in TELCO.
We train both DC-V AEand NET-GAN in the SWaT training dataset,
using a small share of samples from the attacks for calibration.
Regarding EGAN and MAD-GAN, we decided to report in here
the results obtained by the authors in [13], which would generally
correspond to the best performance which could be achieved by
these methods. Finally, we also include a standard Auto Encoder
(AE) model as the simplest approach comparable to DC-V AE.
Table 3 reports the results obtained in the testing dataset in terms
of recall, precision, and 𝐹 1 scores. We fall back to the standard
evaluation on point anomalies instead of range anomalies, to be
consistent with the results obtained in SWaT as reported in the
literature. We consider two variations of NET-GAN detectors [8],
one using the generator function (NET-GAN-G), and the other one
the discriminator function (NET-GAN-D). We also consider three
different variations of MAD-GAN, optimized for best precision
(MAD-GAN-P), recall (MAD-GAN-R), and𝐹 1 score (MAD-GAN-
F1). DC-V AEresults are comparable to those obtained with NET-
GAN-G and MAD-GAN-F1, and significantly better than EGAN or
the AE model. In addition, absolute results are also significantly
better than those obtained in TELCO, helping us demonstrating that
anomaly detection in real data as the one in TELCO, dealing with the
error-prone process of human labeling, is much more complex than
what the literature usually reports on such benchmarks. To sum-
up, we can claim that DC-V AErealizes state-of-the-art detection
performance, while again, flagging its underlying advantages.
6

--- Page 7 ---
DC-V AE, Variational Auto Encoders and Dilated Convolutions for Anomaly Detection in MTS MiLeTS ’22, August 15, 2022, Washington, DC, USA
5 CONCLUDING REMARKS
DC-V AEis a novel approach to anomaly detection in multivariate
time-series, leveraging dilated convolutional neural networks and
variational auto encoders. DC-V AEdetects anomalies in multivari-
ate time-series, exploiting temporal information without sacrificing
computational and memory resources. In particular, instead of us-
ing recursive neural networks, large causal filters, or many layers,
DC-V AErelies on dilated convolutions to capture long and short
term phenomena in the data, avoiding complex and less-efficient
deep architectures, simplifying learning. The application of DC-
V AEto real measurements collected at a mobile ISP showed that
its underlying architecture is better than traditional, vanilla VAEs
when it comes to time-series anomaly detection, showing as such
promising results. The parametrization of DC-V AE’s architecture
is basically defined by a single parameter, namely the length of
the sliding window used for temporal analysis, and the normal
operation region can be easily adapted on a per time-series basis by
adjusting a single integer value, all of these important advantages
in practice.
The quantitative and qualitative advantages of DC-V AEwith
respect to S-VAE evidenced the contribution of the convolutional
layers in capturing a longer time horizon. The benchmarking on
the SWaT dataset shows the on-par performance to state-of-the-art
MTS anomaly detectors in the literature.
In addition to the open publication of the code implementing
and evaluating DC-V AE, the release of the TELCO dataset to the
community provides a real, more representative environment for
assessment and benchmarking of anomaly detectors, providing as
such a strong contribution to advance the domain.
ACKNOWLEDGMENT
This work has been partially supported by the Austrian FFG ICT-
of-the-Future project DynAISEC – Adaptive AI/ML for Dynamic Cy-
bersecurity Systems, by the ANII-FMV project with reference FMV-
1-2019-1-155850 Anomaly Detection with Continual and Streaming
Machine Learning on Big Data Telecommunications Networks, and by
Telefónica. Gastón García was supported by the ANII scholarship
POS-FMV-2020-1-1009239, and by CSIC, under program Movilidad
e Intercambios Académicos 2022 .
REFERENCES
[1] Mohiuddin Ahmed, Abdun Naser Mahmood, and Jiankun Hu. 2016. A survey
of network anomaly detection techniques. Journal of Network and Computer
Applications 60 (2016), 19–31.
[2] Justin Bayer and Christian Osendorfer. 2014. Learning stochastic recurrent
networks. arXiv preprint arXiv:1411.7610 (2014).
[3] Ane Blázquez-García, Angel Conde, Usue Mori, and Jose A. Lozano. 2021. A
Review on Outlier/Anomaly Detection in Time Series Data. ACM Comput. Surv.
54, 3, Article 56 (April 2021), 33 pages. [https://doi.org/10.1145/3444690](https://doi.org/10.1145/3444690)
[4] Varun Chandola, Arindam Banerjee, and Vipin Kumar. 2009. Anomaly Detection:
A Survey. ACM Comput. Surv. 41, 3, Article 15 (July 2009), 58 pages. https:
//doi.org/10.1145/1541880.1541882
[5] Run-Qing Chen, Guang-Hui Shi, Wanlei Zhao, and Chang-Hui Liang. 2021. A joint
model for IT operation series prediction and anomaly detection. Neurocomputing
448 (2021), 130–139.
[6] Junyoung Chung, Kyle Kastner, Laurent Dinh, Kratarth Goel, Aaron C Courville,
and Yoshua Bengio. 2015. A recurrent latent variable model for sequential data.
Advances in neural information processing systems 28 (2015).
[7] Jeff Donahue, Philipp Krähenbühl, and Trevor Darrell. 2016. Adversarial feature
learning. arXiv preprint arXiv:1605.09782 (2016).
[8] Gastón García González, Pedro Casas, Alicia Fernández, and Gabriel Gómez.
2021. On the Usage of Generative Models for Network Anomaly Detection in
Multivariate Time-Series. SIGMETRICS Perform. Eval. Rev. 48, 4 (may 2021), 49–52.
[https://doi.org/10.1145/3466826.3466843](https://doi.org/10.1145/3466826.3466843)
[9] Alexander Geiger, Dongyu Liu, Sarah Alnegheimish, Alfredo Cuesta-Infante, and
Kalyan Veeramachaneni. 2020. TadGAN: Time series anomaly detection using
generative adversarial networks. In 2020 IEEE International Conference on Big
Data (Big Data). IEEE, 33–43.
[10] Manish Gupta, Jing Gao, Charu Aggarwal, and Jiawei Han. 2014. Outlier detection
for temporal data. Synthesis Lectures on Data Mining and Knowledge Discovery 5,
1 (2014), 1–129.
[11] Guokun Lai, Bohan Li, Guoqing Zheng, and Yiming Yang. 2018. Stochastic
wavenet: A generative latent variable model for sequential data. arXiv preprint
arXiv:1806.06116 (2018).
[12] Alexander Lavin and Subutai Ahmad. 2015. Evaluating real-time anomaly detec-
tion algorithms–the Numenta anomaly benchmark. In2015 IEEE 14th International
Conference on Machine Learning and Applications (ICMLA) . IEEE, 38–44.
[13] Dan Li, Dacheng Chen, Baihong Jin, Lei Shi, Jonathan Goh, and See-Kiong Ng.
2019. MAD-GAN: Multivariate anomaly detection for time series data with
generative adversarial networks. In International Conference on Artificial Neural
Networks. Springer, 703–716.
[14] A. P. Mathur and N. O. Tippenhauer. 2016. SWaT: A Water Treatment Testbed
for Research and Training on ICS Security. In IEEE International Workshop on
Cyber-physical Systems for Smart Water Networks (CySWater) . 31–36.
[15] Aaron van den Oord, Sander Dieleman, Heiga Zen, Karen Simonyan, Oriol
Vinyals, Alex Graves, Nal Kalchbrenner, Andrew Senior, and Koray Kavukcuoglu.
2016. Wavenet: A generative model for raw audio.arXiv preprint arXiv:1609.03499
(2016).
[16] Guansong Pang, Chunhua Shen, Longbing Cao, and Anton Van Den Hengel.
2021. Deep Learning for Anomaly Detection: A Review. ACM Comput. Surv. 54,
2, Article 38 (March 2021), 38 pages. [https://doi.org/10.1145/3439950](https://doi.org/10.1145/3439950)
[17] Samira Shabanian, Devansh Arpit, Adam Trischler, and Yoshua Bengio. 2017.
Variational bi-LSTMs. arXiv preprint arXiv:1711.05717 (2017).
[18] Nesime Tatbul, Tae Jun Lee, Stan Zdonik, Mejbah Alam, and Justin Gottschlich.
2018. Precision and Recall for Time Series. 32nd Conference on Neural Information
Processing Systems (NeurIPS) (2018).
[19] Renjie Wu and Eamonn Keogh. 2021. Current Time Series Anomaly Detection
Benchmarks are Flawed and are Creating the Illusion of Progress. IEEE Transac-
tions on Knowledge and Data Engineering (2021), 1–1. [https://doi.org/10.1109/](https://doi.org/10.1109/)
TKDE.2021.3112126
[20] Haowen Xu, Wenxiao Chen, Nengwen Zhao, Zeyan Li, Jiahao Bu, Zhihan Li,
Ying Liu, Youjian Zhao, Dan Pei, Yang Feng, et al. 2018. Unsupervised anomaly
detection via variational auto-encoder for seasonal KPIs in web applications. In
Proceedings of the 2018 World Wide Web Conference . 187–196.
[21] Zichao Yang, Zhiting Hu, Ruslan Salakhutdinov, and Taylor Berg-Kirkpatrick.
2017. Improved variational autoencoders for text modeling using dilated convo-
lutions. In International conference on machine learning . PMLR, 3881–3890.
[22] Sultan Zavrak and Murat Iskefiyeli. 2020. Anomaly-based intrusion detection
from network flow features using variational autoencoder. IEEE Access 8 (2020),
108346–108358.
[23] Houssam Zenati, Chuan Sheng Foo, Bruno Lecouat, Gaurav Manek, and Vijay Ra-
maseshan Chandrasekhar. 2018. Efficient GAN-based anomaly detection. arXiv
preprint arXiv:1802.06222 (2018).
[24] Houssam Zenati, Chuan Sheng Foo, Bruno Lecouat, Gaurav Manek, and Vijay Ra-
maseshan Chandrasekhar. 2018. Efficient GAN-Based Anomaly Detection. CoRR
abs/1802.06222 (2018).
[25] Weiyu Zhang, Qingbo Yang, and Yushui Geng. 2009. A survey of anomaly
detection methods in networks. In 2009 International Symposium on Computer
Network and Multimedia Technology. IEEE, 1–3.
7