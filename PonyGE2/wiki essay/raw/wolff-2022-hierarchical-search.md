---
article_number: 11
slug: wolff-2022-hierarchical-search
pdf: Wolff_2022_Composite_Anomaly_Hierarchical_Search.pdf
extraction_status: ok
last_updated: 2026-06-26
---

# Raw PDF text — Article 11 (wolff-2022-hierarchical-search)

- **Source PDF:** `Literature Review PDFs/03_Hierarchical_Time_Series/Wolff_2022_Composite_Anomaly_Hierarchical_Search.pdf`
- **Wiki source page:** [[../sources/wolff-2022-hierarchical-search|wolff-2022-hierarchical-search]]

## Extracted text

--- Page 1 ---
arXiv:2202.10418v6  [cs.IT]  11 Aug 2022
1
Anomaly Search over Composite Hypotheses in
Hierarchical Statistical Models
Benjamin Wolff, Tomer Gafni, Guy Revach, Nir Shlezinger, an d Kobi Cohen ( Senior Member , IEEE)
Abstract—Detection of anomalies among a large number of
processes is a fundamental task that has been studied in mult iple
research areas, with diverse applications spanning from sp ectrum
access to cyber-security. Anomalous events are characteri zed
by deviations in data distributions, and thus can be inferre d
from noisy observations based on statistical methods. In so me
scenarios, one can often obtain noisy observations aggrega ted
from a chosen subset of processes. Such hierarchical search
can further minimize the sample complexity while retaining
accuracy. An anomaly search strategy should thus be designe d
based on multiple requirements, such as maximizing the dete ction
accuracy; efﬁciency, be efﬁcient in terms of sample complex ity;
and be able to cope with statistical models that are known onl y up
to some missing parameters (i.e., composite hypotheses). I n this
paper , we consider anomaly detection with observations tak en
from a chosen subset of processes that conforms to a prede-
termined tree structure with partially known statistical m odel.
We propose Hierarchical Dynamic Search (HDS), a sequential
search strategy that uses two variations of the Generalized Log
Likelihood Ratio (GLLR) statistic, and can be used for detec tion
of multiple anomalies. HDS is shown to be order-optimal in te rms
of the size of the search space, and asymptotically optimal i n
terms of detection accuracy. An explicit upper bound on the e rror
probability is established for the ﬁnite sample regime. In a ddition
to extensive experiments on synthetic datasets, experimen ts have
been conducted on the DARPA intrusion detection dataset,
showing that HDS is superior to existing methods.
I. I NTRODUCTION
The task of detecting anomalies in data streams arises in
a wide variety of applications. These applications include dy-
namic spectrum access and sensing in wireless communicatio n
[
2]; detecting attacks and intrusions in computer networks [ 3];
and detecting anomalies in infrastructures that may indica te
catastrophes [ 4]. Such tasks involve distinguishing anomalous
processes from typical ones based on noisy observations.
The noisy nature of the observations implies that the
typical behavior can be modeled by a normal or benign
distribution, and the anomalous behavior is captured by an
abnormal distribution. The goal of a decision-maker boils
B. Wolff and T. Gafni contributed equally to this work.
A short version of this paper that introduces the algorithm, and preliminary
simulation results was presented at the IEEE International Symposium on
Information Theory (ISIT) 2022 [
1]. In this journal version we include: (i) A
more general model that includes multiple anomalies; (ii) a detailed discussion
on the implementation of the algorithm; (iii) a rigorous the oretical analysis
of the algorithm with detailed proofs; (iv) more extensive s imulation results
including new experiments using synthetic and real data; an d (v) a detailed
discussion of the results, and comprehensive discussion an d comparison with
the existing literature.
B. Wolff and G. Revach are with the Institute for Signal and In for-
mation Processing (ISI), D-ITET, ETH Z ¨ urich, Switzerland , (e-mail: be-
wolff@student.ethz.ch; grevach@ethz.ch). T. Gafni, N. Shlezinger, and K. Co-
hen are with the School of Electrical and Computer Engineeri ng, Ben-Gurion
University of the Negev, Beer-Sheva, Israel (e-mail:gafni to@post.bgu.ac.il;
{nirshl, yakovsec }@bgu.ac.il). This research was partially supported by the
ISRAEL SCIENCE FOUNDA TION (grant No. 2640/20), and by the Is rael
National Cyber Directorate via the Cyber Security Research Center at Ben-
Gurion University of the Negev.
down to deciding whether to reject the null hypothesis and to
declare a process as anomalous. Here we consider the task of
detecting an anomalous process (or processes) out of a large
set of data streams. This requires to sample (observe) each
process at least once, and preferably more for better detect ion
accuracy due to uncertainty. Hence, a decision-maker should
design an efﬁcient sampling policy, that for a given detection
accuracy minimizes the number of samples needed to reach a
decision, or alternatively, given a sampling budget maximi zes
the detection accuracy.
The class of problems involving a sequential design of
experiments for active binary hypothesis testing problem w as
pioneered by Chernoff [
5]. Chernoff proposed a randomized
strategy and showed that it is asymptotically optimal as the
error probability approaches zero. However, the Chernoff t est
results in a linear sample complexity in the size of the searc h
space. When the number of processes (data streams) is very
large, as is often the case in practice, it is likely to be inef ﬁcient
to sample each process multiple times. Therefore, sampling
strategies with a sub-linear sampling complexity are desir able.
The need for efﬁciency requires to exploit a certain structu re
in the data, which may lead to a signiﬁcant performance gain.
A common structure that can be utilized for this end is the
ability to access the data in a hierarchical fashion.
The hierarchical structure model represents settings wher e
a massive number of data streams can be observed at different
levels of granularity. Such modeling faithfully captures t he op-
eration of various applications. In ﬁnance, transactions c an be
aggregated at different temporal and geographic scales [
6]. In
visual monitoring applications, the ability to zoom-in or z oom-
out is equivalent to the aggregation of pixels, and can lead
to faster detection of anomalies (targets, interesting eve nts)
by giving suspicious pixels more attention than others [
7]. In
internet trafﬁc monitoring, there is a need for detecting he avy
hitters, i.e., a small number of ﬂows that accounts for most o f
the total trafﬁc, and thus representing the measurements as a
tree structure, where each node represents an aggregated ﬂo w
can lead to efﬁcient detection [ 8]. Other applications include
direction of arrival estimation [ 9] and system control [ 10].
In light of the aforementioned potential gains of the hier-
archical structure, here, we consider the problem of detect ing
anomalous processes (targets), for which there is uncertai nty
in the distribution of observations. We assume that in each
time step, a decision-maker can observe a chosen subset of
processes that conforms to a predetermined tree structure, and
get access to aggregated observations that are drawn from a
general distribution that depends on a chosen subset of pro-
cesses. The uncertainty in the anomalous distribution yiel ds a
composite hypothesis case, where measurements drawn when
observing a subset of processes follow a common distributio n
parameterized by an unknown vector when containing the

--- Page 2 ---
2
target. The objective is to design a sampling policy (a searc h
strategy), that minimizes a Bayesian risk that accounts for
sample complexity and detection accuracy, by selecting whi ch
subset to observe, and when to terminate the search and make
a decision, in an adaptive way.
Dynamic search strategies were proposed for various forms
of anomaly detection problems. In [
11], the Information-
Directed Random Walk (IRW) algorithm was proposed, for
cases where the statistical model is fully known. IRW was
shown to be asymptotically optimal in terms of detection
accuracy and order optimal with respect to the number of
processes. When the anomalous hypothesis is composite, the
IRW policy serves as a benchmark for the performance one
can achieve with partially known modeling. The recent stud-
ies [
12]–[ 14] considered hierarchical search under unknown
observation models. The search strategies in [ 12], [ 13] are
based on a sample mean statistic, which fails to detect a
general anomalous distribution with a mean close to the
mean of the normal distribution. The work in [
14] does
not assume a structure on the abnormal distribution, and
uses the Kolmogorov-Smirnov statistic, which fails to util ize
the parametric information considered in our setting. This
motivates the derivation of a dynamic search policy for data
of hierarchical structure which can cope with partially kno wn
anomalous distributions and reliably detect based on stati stics
of a higher order than a sample mean.
In this work we consider for the ﬁrst time the task of
hierarchical anomaly detection over a general and known
family of distributions with unknown parameters. Here, the
measurements can take continuous values and the decision-
maker is allowed to sample an aggregated subset of processes
that conforms to a tree structure. To cope with this observat ion
model in a dynamic search setting with possibly multiple
anomalies of different types, we develop a dedicated sequen tial
search strategy, dubbed Hierarchical Dynamic Search (HDS) .
HDS uses two carefully chosen statistics to harness the in-
formation on the null hypothesis and the structure of the
hierarchical samples, allowing it to achieve asymptotical ly
optimal performance. The proposed policy is shown to be
asymptotically optimal with respect to the detection accur acy
and order optimal with respect to the size of the search space .
Extensive numerical experiments on synthetic and real
datasets support the theoretical results. Our numerical ev alua-
tion shows that HDS effectively captures changes in the traf ﬁc
that are associated with network anomalies. HDS with active
local tests for the high level nodes is also analyzed numeric ally
and is shown to outperform the ﬁxed sample-size local test
and approach the performance bound of IRW. Our non-
synthetic experiments numerically evaluate the performan ce
of HDS in a cyber-security task using the DARP A intrusion
detection dataset. We show that the proper modeling of the
network trafﬁc data in a hierarchical fashion combined with the
application of HDS can successfully detect denial of servic e
(DoS) attacks from a limited number of samples.
The rest of this paper is organized as follows: in Section
II
we present the system model and discuss its relationship wit h
the existing literature. Section III designs the HDS policy and
analyzes its performance. We numerically evaluate HDS in
Section IV, and provide concluding remarks in Section V.
II. S YSTEM MODEL AND PRELIMINARIES
In this section, we describe the statistical setting of our s ys-
tem model and discuss some of the relevant related literatur e
on dynamic search policies.
A. Problem F ormulation
Anomaly Detection: We consider the problem of detecting
K anomalous (targets) processes (data streams) out of a large
set of M processes, where K is assumed to be known. Here,
the decision-maker should ﬁrst actively collect evidence ( data,
observations, samples), and then decide for each process m ∈
{1, .., M} whether it is anomalous or not. Since there is cost
on gaining samples, this problem presents an inherent trade -
off between the need to maximize the detection accuracy to
the need to minimize the length of the exploration phase.
In particular, in each time step t, where t ∈ { 1, 2, . . .},
the decision-maker can access only one process and sample
an observation yt in an i.i.d. manner. The main challenge is
to know when to stop exploring and to reach a decision. We
denote the data collected in the time horizon τ and provide
a decision based on Dτ = {yt}τ
t=1. Given the collected
evidence, the decision rule boils down to simultaneous testing
of multiple binary hypotheses. Let Hm = 0 denote the
null hypothesis , i.e., the process m is not anomalous, then
the decision-maker should decide whether to reject the null
hypothesis, and declare process m as anomalous, i.e., Hm = 1,
or not.
Assuming that at time t, process m was chosen to be
sampled by the decision-maker, then its sampling distribut ion
is given by
yt ∼ f (y | θ ),
{ θ = θ0, Hm = 0
θ ∈ Θ 1, Hm = 1 (1)
where f (·) is a known family of a parametric probability
distributions. While θ0 is a known parameter describing the
distribution of the non-anomalous samples, for anomalous
processes, the parameter is not assumed to be known, but only
that it is restricted to belong to a known set Θ 1.
Hierarchical Sampling: To reach a decision, the decision-
maker must actively sample information from the M pro-
cesses. Generally speaking, if the complexity of an active
sampling policy is linear, when the number of processes
M scales up, such policy becomes inefﬁcient and can be
computationally infeasible. Therefore, to cope more efﬁci ently
with a large number of processes, and to reduce the sam-
pling complexity, we consider the case of hierarchical data
streams. Here, in addition to observing individual process es,
the decision-maker can measure aggregated processes that
conform to a binary tree structure. Sampling an internal nod e
of the tree gives a blurry image of the processes beneath it,
as schematically depicted in Fig.
1. The key to utilizing the
hierarchical structure of the sampling space to its full ext ent,
is to determine the number of samples one should obtain at
each level of the tree, and when to zoom in or out on the
hierarchy.

--- Page 3 ---
3
To model hierarchical sampling, let the tuple (l, j) denote
node j at level l of the tree, with l = 0, . . . ,log2 M and j =
1, . . . ,2log2 M −l. The tree structure encodes the relationship
between the nodes. The abnormal distribution of a target lea ds
to an abnormal distribution in every ancestor of the target, i.e.,
every node on the shortest path from this target to the root.
We denote by H(l,j) = 0 the hypothesis that node (l, j) is not
anomalous, and H(l,j) = 1 denotes that it is anomalous.
The observations yt of an internal node j on level ℓ of the
tree follow a similar statistical model as in (
1):
yt ∼ fℓ(y | θ ),
{
θ = θ (ℓ)
0 , H(l,j) = 0
θ ∈ Θ (ℓ)
1 , H(l,j) = 1 (2)
where fℓ(·), θ (ℓ)
0 , and Θ (ℓ)
1 are the probability distribution, the
known parameter of the non-anomalous distribution, and the
set of the anomalous parameter, respectively, at level ℓ, and
f0(·) ≡ f (·), θ (0)
0 ≡ θ0, Θ (0)
1 ≡ Θ 1. Here, we assume that
the observations at all levels are informative, as formulat ed in
the following:
AS1 The Kullback Leibler (KL) divergence Dℓ(·||·) between
fℓ(· | x) and fℓ(· | z) satisﬁes:
Dℓ
(
θ (ℓ)
0 ||θ
)
≥ ∆ , Dℓ
(
θ ||θ (ℓ)
0
)
≥ ∆ , ∀θ ∈ Θ (ℓ)
1 ,
(3)
for some ∆ > 0 independent of M for all l.
Note that
AS1 implies that the anomalous and non-anomalous
distributions are distinguishable.
Search Policy: An active search (i.e., sampling and deci-
sion) policy (strategy), denoted as π, is deﬁned by the tuple
(φ, τ, δ). Here, φ is a sampling selection rule, i.e., a mapping
from the time t and the data collected to a node from which
we need to sample next, namely
φ : (t, Dt) ↦→(ℓ, j); (4)
a stopping rule τ , i.e., the time at which the decision-maker
decides to end the search; and a decision rule δ
δ : (Dτ ) ↦→[0, 1]M , (5)
which is a mapping from the evidence collected until stoppin g
time τ , to a Boolean vector of size M , where δm = 1
corresponds to the decision that process m is anomalous.
Aim: We aim to ﬁnd a policy π∗ out of the set of possible
policies Π that minimizes the Bayesian risk , namely
π∗ = arg min
π∈Π
{R(π)}, (6)
where
R(π) ≜ PErr(π) + c · Q(π). (7)
The term PErr(π) is the error probability, Q(π) is the sample
complexity, and c ∈ (0, 1) is the sampling cost assigned for
each observation. Speciﬁcally, let H be a set of all Boolean
vectors of size M with exactly K entries equal to 1, such that
|H| =
(M
K
)
. Let Hb ∈ H be any Boolean vector of size M
with exactly K entries equal to 1, and H ∈ H be a Boolean
vector of size M corresponding to the true hypothesis, where
an mth entry equals to 1 implies that process m is anomalous.
Then, the error probability given that H = Hb is:
PErr(π|H = Hb) ≜ P(δ(Dτ ) ̸= Hb|π, H = Hb), (8)
↑
anomaly
ℓ = 0
ℓ = 1
ℓ = 2
ℓ = 3
Fig. 1: A binary tree observation model with M = 8 processes,
log2 M = 3 levels, and a single anomaly. The anomaly is
measurable at the red nodes.
and the error probability is averaged under given prior pb for
hypothesis H = Hb:
PErr(π) ≜
∑
Hb∈H
pb · PErr(π|H = Hb). (9)
Similarly, the sampling complexity is averaged under prior pb
for hypothesis H = Hb, and is given by:
Q(π) ≜ E[τ |π]. (10)
B. Related Literature
Target search problems have been widely studied under var-
ious scenarios. Optimal policies for target search with a ﬁx ed
sample size were derived in [
15]–[ 18] under restricted settings
involving binary measurements and symmetry assumptions.
Results under the sequential setting can be found in [
19],
[20], assuming single process observations. In this paper we
address the optimality question under the asymptotic regim e as
the error probability approaches zero. Asymptotically opt imal
results for sequential anomaly detection in a linear (i.e., non-
hierarchical) search under various setting can be found in [ 21]–
[24]. In this paper, however, we consider a composite hypoth-
esis case, which was not addressed in the above. Results unde r
the composite hypothesis case with linear search can be foun d
in [ 25]–[ 29]. Detecting anomalies or outlying sequences has
also been studied under different formulations, assumptio ns,
and objectives [ 30]–[ 35]; see survey in [ 36]. These studies, in
general, do not address the optimal scaling in the detection
accuracy or the size of the search space.
As mentioned in Section
I, the problem considered here also
falls into the general class of sequential design of experim ents
pioneered by Chernoff in [ 5]. Compared with the classical
sequential hypothesis testing pioneered by Wald [ 37] where
the observation model under each hypothesis is ﬁxed, active
hypothesis testing has a control aspect that allows the deci sion-
maker to choose different experiments (associated with dif fer-
ent observation models) at each time. The work [
38] developed
a variation of Chernoff’s randomized test that achieves the
optimal logarithmic order of the sample complexity in the
number of hypotheses under certain implicit assumptions on
the KL divergence between the observation distributions un der
different hypotheses. These assumptions, however, do not
always hold for general observation models as considered he re.
In contrast to Chernoff’s randomized policy, in this paper
we propose an active deterministic strategy. The work [
39]

--- Page 4 ---
4
have showed that a simpler deterministic algorithm applies in
this setting and obtained the same asymptotic performance
as Chernoff’s policy, with better performance in the ﬁnite
sample regime under a linear search setting with known
distributions. A modiﬁed algorithm has been developed in
[
40] for spectrum scanning with time constraint. This setting
was extended in [ 41] to the composite case, which proposed
an asymptotically optimal deterministic policy. The probl em
addressed in this work is fundamentally different, focusin g on
efﬁcient exploitation of aggregated and potentially low-q uality
measurements to achieve an optimal sublinear order with the
size of the search space.
Tree-based search in data structures is a classical problem in
computer science (see, for example, [
42], [ 43]). It is mostly
studied in a deterministic setting; i.e., the observations are
deterministic when the target location is ﬁxed. The problem
studied in this work is a statistical inference problem, whe re
the observations taken from the tree nodes follow general
statistical distributions. This problem also has intrinsi c con-
nections with several problems studied in different applic ation
domains. We discuss here two representative studies most
pertinent to this paper and emphasize the differences in our
approach from these existing studies:
1) The ﬁrst is group testing, where the objective is to identify
the defective items in a large population by performing test s
on subsets of items that reveal whether the tested group
contains any defective items. Formulations of group testin g
can be mapped to our setting by mapping the individual
items to the leaf nodes of a tree. The action of testing a
node on the tree corresponds to a group test. Differ from our
setting, most existing work on Boolean group testing assume s
error-free test outcomes, or limited noise models (e.g., bi nary
symmetric noise or one-sided noise [
44], [ 45]). Moreover,
most of the existing results on noisy group testing focus on
non-adaptive open-loop strategies [
46], [ 47], and the issue of
sample complexity in terms of the detection accuracy is abse nt
in the basic formulation.
2) Our setting also applies to adaptive sampling with noisy
response, for example, in the fundamental problem of estima t-
ing a step function in [0, 1] [
48]. The main body of work on
adaptive sampling is based on a Bayesian approach with binar y
noise of a known model. Although several strategies (e.g.,
the Probabilistic Bisection Algorithm) have been extensiv ely
studied in the literature [
49], [ 50], there is little known
about the theoretical guarantees, especially when it comes to
unknown noise models. HDS, derived in the sequel based on
the problem formulated in Subsection
II-A can be considered
as a non-Bayesian approach to the adaptive sampling problem
under general parametric noise models, and its theoretical
guarantees apply in this problem.
III. H IERARCHICAL DYNAMIC SEARCH
In this section we present and analyze the propose
d HDS
active search strategy. We start by introducing the algorit hm
in the case of one anomaly (i.e., K = 1) in Subsection III-A,
after which we analyze its performance in Subsection III-B. In
Subsection III-C we extend HDS to multi-target setting, and
we conlclude the section with a discussion in Subsection III-D.
A. Algorithm Design
We start by focusing on detecting a single target ( K = 1).
Rationale: The anomaly is searched using a random walk
on the process tree that starts at the root node. The individu al
steps of the walk are determined by local tests. On internal
(i.e., high level) nodes, the outcome of the test can be movin g
to the left or right child, or returning to the parent node (wh ere
the parent of the root is itself). The internal test is constr ucted
to create a bias in the walk towards the anomalous leaf. On
a leaf node of index m, the possible outcomes are either
terminating the search and declaring process m anomalous,
or moving back to parent node. The leaf test is designed to
terminate at the anomaly with sufﬁciently high probability .
In particular, HDS uses the ﬁxed sample size Generalized
Log Likelihood Ratio (GLLR) statistic for the high level nod es
test and the sequential Adaptive Log Likelihood Ratio (ALLR )
statistic for the leaf nodes test. The ALLR statistic, intro duced
by Robbins and Siegmund [
51], [52], builds upon the one-stage
delayed estimator of the unknown parameter; i.e., the densi ty
of the n-th observation is estimated based on the previous n−1
observations, while the current observation is not include d in
this estimate. As opposed to the GLLR, the ALLR preserves
the martingale properties. This allows one to choose thresh olds
in a way to control speciﬁed rates of error probability, and s o
to ensure the desired asymptotic properties. In the followi ng,
we specify the internal and leaf tests.
Internal T est: Suppose that the random walk arrives at a
node on level ℓ > 0. A ﬁxed number Kℓ−1 of samples y(i) is
drawn from both children, and are used to compute the GLLRs
˜S(l−1)
GLLR (Kl−1) ≜
Kℓ−1∑
i=1
log
fℓ−1
(
y(i) | ˆθ (l−1)
1
)
fℓ−1
(
y(i) | θ (l−1)
0
) , (11)
where ˆθ (l−1)
1 is the maximum likelihood estimate of the
anomaly parameter, given by
ˆθ (l−1)
1 = argmax
θ ∈Θ (l−1)
1
Kℓ−1∏
i=1
fℓ−1(y(i) | θ ). (12)
The statistics ( 11) utilize the information on the normal
distribution. If at least one of the children has a strictly p ositive
GLLR, the random walk moves to the child with the greater
GLLR. Otherwise, it moves to the parent. The sample size
Kℓ for ℓ = 0, . . . ,log2 M − 1 is determined ofﬂine, such that
the probability of moving in the direction of the anomaly is
greater than 1
2 . Note that Kℓ is ﬁnite under AS1.
Leaf T est: When the random walk visits a leaf node,
we perform an ALLR test. Here, samples y(i) are drawn
sequentially from the process and the local ALLR
˜SALLR(n) =
n∑
i=1
log
f0
(
y(i) | ˆθ (0)
1 (i − 1)
)
f0
(
y(i) | θ (0)
0
) , (13)
is continuously updated, where
ˆθ (0)
1 (i − 1) = argmax
θ ∈Θ (0)
1
i−1∏
j=1
f0(y(j) | θ ), (14)

--- Page 5 ---
5
is the delayed maximum likelihood estimate of θ (0)
1 . To
initialize the estimate ˆθ (0)
1 (0), a ﬁxed number Nleaf ≥ 0 (which
is independent of M, c) of samples is drawn from the leaf. In
Appendix B we elaborate on how to set Nleaf. As opposed to
the GLLR, ˜SALLR(n) is a viable likelihood ratio, so that the
Wald likelihood ratio identity can still be applied to upper -
bound the error probabilities of the sequential test [ 37].
At every time step n > 0, the ALLR ( 13) is examined: if
˜SALLR(n) > log log2 M
c , the random walk terminates and the
tested process is declared anomalous, while a negative ALLR
results in returning to the parent node. The resulting searc h
policy is summarized in Algorithm
1.
Algorithm 1: Single Target HDS
Input: Inspected node at level ℓ
1 if l > 0 (internal node) then
2 Measure Kℓ−1 samples from each child node;
3 Compute GLLR for each child via ( 11);
4 if Both GLLRs are negative then
5 Invoke Algorithm 1 on parent node;
6 else
7 Invoke Algorithm 1 on child with larger GLLR;
8 else
9 Init θ (0)
1 according to ( 46) and n = 1;
10 Draw y(n) and compute ALLR ( 13);
11 if ˜SALLR(n) > log log2 M
c then
12 Identify node as target and terminate;
13 else if ˜SALLR(n) < 0 then
14 Invoke Algorithm 1 on parent node;
15 Increment n and jump to step 9;
B. Performance Analysis
We next theoretically analyze the HDS policy, denoted
πHDS, for K = 1 . In particular, we establish that πHDS is
asymptotically optimal in c, i.e.,
lim
c→0
R(πHDS)
R∗ = 1, (15)
and order optimal in M , namely,
lim
M→∞
R(πHDS)
R∗ = O(1) (16)
where R∗ is a lower bound on the Bayesian risk. This is stated
in the following theorem:
Theorem 1. When
AS1 holds and Θ (ℓ)
1 is ﬁnite for all 0 ≤
ℓ ≤ log2 M − 1, the Bayesian risk of πHDS is bounded by
R(πHDS) ≤ cBlog2 M + c log log2 M
c
D0
(
θ (0)
1 ||θ (0)
0
) + O(c) , (17)
where B is a constant independent of M and c.
Proof: The complete proof is given in Appendix B. Here,
we only present the proof outline, which divides the traject ory
of the random walk into two stages: search and target test .
In the search stage the random walk explores the high level
nodes and is expected to eventually concentrate on the true
T3
T2
T1
T0
↑
anomaly
ℓ = 0
ℓ = 1
ℓ = 2
ℓ = 3
Fig. 2: An illustration of the subtrees T0, . . . ,Tlog2 M used in
the analysis of the HDS algorithm.
anomaly. Based on this insight, we partition the tree T into
a sequence of subtrees T0, T1, . . . ,Tlog2 M (Fig.
2). Subtree
Tlog2 M is obtained by removing the halftree that contains the
target from T . Subtree Tℓ is iteratively obtained by removing
the halftree that contains the target from T \Tℓ+1. T0 consists
of only the target node. We then deﬁne the last passage time τℓ
of the search phase from each subtree Tℓ. An upper bound on
the end of this ﬁrst stage is found by proving that the expecte d
last passage time to each of the halftrees that do not contain
the target is bounded by a constant. Summing the upper bound
on the last passage times yields the ﬁrst term in (
17).
The second stage is the leaf target test , which ends by
declaring the target with expected time E[τ0]. To bound E[τ0],
we ﬁrst deﬁne a random time τM L to be the smallest integer
such that the estimator of the target leaf’s parameter equal s to
θ (0)
1 for all n > τ M L, and we show that E[τM L] is bounded by
a constant independent of c and M . We then bound E[τ0] using
Wald’s equation [ 37] and Lorden’s inequality [ 53], which
yields the second and third terms in ( 17). Finally, we show that
the detection error is of order O(c). By using the martingale
properties of the ALLR statistic we prove that the false posi tive
rate of the leaf test is bounded by c
log2 M . In addition, the
expected number of times a normal leaf is tested is in the orde r
of log2 M . The resulting error rate PErr(πHDS) is therefore in
the order of c (third term in ( 17)).
The optimality properties of the Bayesian risk of HDS in
both c and M directly carry through to the sample complexity
of HDS, as stated in the following corollary:
Corollary 1. The sample complexity of HDS is bounded by:
Q(πHDS) ≤ B · log2 M + log log2 M
c
D0
(
θ (0)
1 ||θ (0)
0
) + O(1) (18)
Q(πHDS) ≥ log2 M
Imax
+ log 1−c
c
D0
(
θ (0)
1 ||θ (0)
0
) + O(1) (19)
where Imax is the maximum mutual information between the
true hypothesis and the observation under an optimal action .
Proof: The upper bound ( 18) follows directly from The-
orem 1, while ( 19) is obtained using [ 38, Thm. 2].
Corollary 1 indicates that HDS is asymptotically optimal in
c and order optimal in M .

--- Page 6 ---
6
declared
anomalous
ℓ = 0
ℓ = 1
ℓ = 2
ℓ = 3
Fig. 3: Multi-target detection illustration. On the third r un of
the random walk, the nodes in the dashed box are no longer
sampled from or visited.
C. Multi-T arget Detection
We next consider the detection of K > 1 anomalous pro-
cesses. Our derivation and analysis is based on the followin g
additional assumptions:
AS2 The number of anomalous processes K is a-priori known.
AS3 The search policy can remove a declared process from
the tree, e.g., as in group testing the defective item is no
longer tested in subsequent group tests.
AS4 The distinguishability assumption
AS1 is extended such
that the distribution of a node that contains multiple
anomalies is more similar to a node that contains a single
anomaly, than to a normal node. To formulate mathemati-
cally, let Θ (ℓ)
j be the set of parameters of a node that con-
tains j anomalies. We require, that there is ∆ > 0 such
that (
3) holds and that for all levels ℓ = 1 , . . . ,log2 M ,
number of anomalies j = 1 , . . . ,min
(
K, 2ℓ)
and multi-
anomaly parameter θj ∈ Θ (ℓ)
j it holds that
∃θ (ℓ)
1 ∈ Θ (ℓ)
1 : Dℓ
(
θj||θ (ℓ)
0
)
− Dℓ
(
θj||θ (ℓ)
1
)
≥ ∆ . (20)
This assumption holds in a wide variety of scenarios and
ensures that there is a bounded number of samples K for
the internal test, such that the random walk approaches
the closest anomaly with a probability greater than 0.5.
Algorithm Design: Since K is known by
AS2, HDS
formulated in Algorithm 1 can be extended to locate the targets
one-by-one. A process is declared anomalous by running
the algorithm detailed in Subsection
III-A. This operation is
feasible by AS3. This means that subsequent random walks
only visit nodes that contain undeclared processes (Fig. 3).
As a result, we only have to sample from one of the children
during some internal tests.
For the internal test, we still use the anomalous parameter
sets Θ (ℓ)
1 that describe the distribution for one anomaly within
the node. This is justiﬁed by
AS4. The resulting procedure is
summarized as Algorithm 2.
Performance Analysis: The theoretical guarantees derived
for a single target in Subsection III-B carry also to the multi-
target setting when AS2-AS4 hold, in addition to AS1. This is
stated in the following theorem:
Algorithm 2: K Target HDS
Input: Number of targets K
1 for k = 1, . . . , K do
2 Identify kth target by invoking Algorithm 1 at
level l = 0;
3 Remove detected anomalous leaf node from tree;
4 end
T3
T2 T2
T1 T1
T0 T0
ℓ = 0
ℓ = 1
ℓ = 2
ℓ = 3
Fig. 4: Illustration of the tree partition T0, . . . ,Tlog2 M used in
the analysis of the HDS algorithm for multiple targets.
Theorem 2. When
AS1-AS4 hold, and Θ (ℓ)
1 is ﬁnite for all
0 ≤ ℓ ≤ log2 M − 1, the Bayesian risk of πHDS with K
anomalous processes is bounded by:
R(πHDS) ≤ cKB log2 M + cK log log2 M
c
D0
(
θ (0)
1 ||θ (0)
0
) + O(c) , (21)
where B is a constant independent of M, c and K.
Proof: The complete proof is given in appendix C. Here,
we only present the proof outline, which extends on the
rationale of the proof of Theorem
1: Again, we divide the tree
T into a similar partition T0, . . . ,Tlog2 M , where the sets Tℓ are
recursively obtained by removing the halftrees at level ℓ that
contain at least one anomaly from T \ T ℓ+1 (Fig. 4). Roughly
speaking, due to the assumption in ( 20), the internal test and
the leaf test have a greater probability of moving towards th e
closest anomaly than away from it. This results in the same
constant upper bound on the expected last passage times to
the sets T1, . . . ,Tlog2 M as in the single-target scenario, which
implies that the ﬁrst term in (
21) is the ﬁrst term of ( 17) scaled
by the number of anomalies K. The leaf test is unaffected by
the additional anomalies. Therefore, the sample complexit y of
a single random walk in the multi-target scenario has the sam e
upper bound as in the single-target scenario resulting agai n
in the sample complexity in the second and third terms being
scaled by K. Finally, the upper bound on the probability of the
declaring a normal process anomalous remains unaffected to o.
Applying the union bound over the K random walks yields
an error rate in the order of c in the third term.
Similarly to risk guarantees, one can also bound the sample
complexity of Algorithm 2, as stated in the following:
Corollary 2. The sample complexity of πHDS for the detection

--- Page 7 ---
7
of K anomalies under AS1-AS4 is bounded via
Q(πHDS) ≤ KB · log2 M + K log log2 M
c
D0
(
θ (0)
1 ||θ (0)
0
) + O(1). (22)
Proof: The upper bound ( 22) follows directly from The-
orem 2.
Corollary 2 and the lower bound in ( 19) indicate that HDS
is order optimal in M and has an asymptotic ratio of K when
c approaches zero.
D. Discussion
The proposed HDS algorithm is designed to efﬁciently
search in hierarchical data structures while coping with an
unknown anomaly distribution. It can be viewed as an exten-
sion of the IRW method [
11] to unknown anomaly parameters,
while harnessing the existing knowledge regarding the dist ri-
bution of the anomaly-free measurements. The uncertainty i n
the anomaly distribution makes both the algorithm design an d
the performance analysis much more involved. In contrast to
existing hierarchical algorithms, HDS can incorporate gen eral
parameterized anomaly observation models, resulting in it
being order optimal with respect to the search space size and
asymptotically optimal in detection accuracy.
The derivation of HDS motivates the exploration of several
extensions. First, HDS is derived for hierarchical data tha t
can be represented as a binary tree, while anomaly search
with adaptive granularity may take the form of an arbitrary
tree. In such case, the path length from each leaf to the root
may be different, and thus the distribution of each node does
not depend solely on its level on the tree. We conjecture
that with some modiﬁcations on the HDS algorithm, optimal
performances can be also guaranteed in this case. However,
we leave this analysis for future work
Furthermore, we design HDS for detecting leaf targets,
while in some scenarios one may have to cope with hierarchi-
cal targets, i.e., where intermediate nodes can be anomalou s.
An additional extension would be to consider a composite
model for both normal and anomalous distributions. V arious
models can be assumed in this case (i.e., identical/differe nt
parameter for all normal cells). Whether asymptotic optima lity
can be achieved under this setting remains open. We leave the
extension of HDS to these settings for future work.
IV. N UMERICAL EVALUATIONS
We next empirically compare HDS with the existing search
strategies of Deterministic Search (DS) [
41], IRW [11], and the
Conﬁdence Bounds based Random Walk (CBRW) algorithm
[
12]. The IRW algorithm has access to the true anomaly
parameter θ (ℓ)
1 , while the other algorithms only have access to
Θ (ℓ)
1 . IRW and HDS use ﬁxed size internal tests that are not
optimized for the speciﬁc simulation. Instead the sample si zes
Kℓ are chosen as small as possible such that the desired drift
towards the target is ensured. The performance of IRW should
therefore be a best-case scenario for HDS. IRW, DS, and HDS
use c = 10 −2, and CBRW uses p0 = 0 .2 and ǫ = 10 −2. The
values are averaged over 106 Monte Carlo runs
1.
1The source code can be found in
https://github.com/DrummingBeb/Composite-Anomaly-Detection-via-Hierarchical-Dynamic-Search .
0 20 40 60 80 100 120 140
10−1
10−0.5
number of processes
Bayesian risk DS
CBRW
HDS
IRW
Fig. 5: Risk vs. number of processes, scenario 1.
Scenario 1: Exponential Distributions
We ﬁrst simulate a scenario where the decision-maker observ es
the interoccurrence time of Poisson point processes with
normal rate λ0 = 1 and anomalous rate λ1 = 10 3. The rates
at the internal nodes are equal to the sum of the rates of
their children. The minimum rate that is considered anomalo us
is λ1,min = λ0+λ1
2 such that the anomaly parameter set is
Θ (0)
1 = [ λ1,min, ∞). This scenario models the detection of
heavy hitters among Poisson ﬂows where the measurements
are exponentially distributed packet inter-arrival times . CBRW
uses the mean threshold ηℓ, such that the generalized likeli-
hood ratio is one at ηℓ and exact bounds for the mean of
exponentially distributed random variables with rate λℓ = 1
ηℓ
.
Fig. 5 depicts the risk R(π) as in ( 7) versus the number of
processes M . We can clearly observe that HDS outperforms
CBRW and DS for most values, and it is within a minor
gap of that of IRW. While for M ≥ 16, HDS only slightly
outperforms CBRW, it notably outperforms DS
. However, it is
noted that CBRW uses sequential internal tests, which shoul d
be more efﬁcient than the ﬁxed size internal tests of HDS. For
this reason, in this scenario we also compare an alternative
internal test for HDS. The results of this study, depicted in
fig.
6, show that switching to the sequential GLLR statistic for
the leaf test instead of the ALLR statistic yields a performance
gain for all M . An even greater jump in performance is
achieved by using an active test for the internal nodes. The
details of the active test are given in Appendix
A.
Scenario 2: Bernoulli Interference
Next, we simulate our decision making algorithm when con-
sidering a set of Poisson point processes with rate λ0 = 0 .1.
Here, the measurements of the nodes that contain the anomaly
are corrupted by Bernoulli interference; i.e.,
y(i) ∼ Exp
(
2ℓλ0
)
+ z · [−6 + (a + 6) · Bernoulli(0.5)]. (23)
In (
23), z ∈ { 0, 1} indicates whether the node is anomalous,
and a is unknown. The node parameter θ is given by the
pair (z, a), where θ (ℓ)
0 = (0 , 0), θ (ℓ)
1 = (1 , 10), and Θ (ℓ)
1 =
{1} × {1, 5, 10} for all levels 0 ≤ ℓ ≤ log2 M . CBRW uses
ηℓ = 1 and sub-Gaussian bounds with ξ = 0.05.

--- Page 8 ---
8
0 20 40 60 80 100 120 140
10−1.4
10−1.2
10−1
10−0.8
number of processes
Bayesian risk
ﬁxed ALLR
ﬁxed GLLR
active GLLR
Fig. 6: HDS with different internal tests (ﬁxed sample size v s.
active) and leaf test statistics (ALLR vs. GLLR), scenario 1 .
The active test uses a conﬁdence level of p = 1
2 + 10−16.
0 20 40 60 80 100 120 140
10−0.5
100
100.5
number of processes
Bayesian risk DS
CBRW
HDS
IRW
Fig. 7: Risk vs. number of processes, scenario 2.
In this case the mean values of the normal and abnormal
distribution are close to each other, and the anomalous process
is reﬂected by higher moments of the distributions. The
results for this setting, depicted in Fig.
7, show that while
CBRW achieves poor performance, HDS detects the anomaly
efﬁciently, resulting in a larger gap between HDS and CBRW
than in the ﬁrst scenario.
Scenario 3: Multiple Anomalies
Here we extend scenario 1 to K = 5 anomalies. HDS and IRW
use active internal tests. Additionally HDS uses the GLLR
statistic for the leaf tests. Fig.
8 shows a very similar picture
as Fig. 5, in which HDS performs close to IRW and better than
CBRW and DS. However, the performance HDS surpasses the
non-hierarchical DS at M = 30 processes as opposed to after
already M = 10 processes in scenario 1.
Scenario 4: Denial of Service Detection
In this scenario, we detect DoS attacks using the DARP A
intrusion detection data set [
54]. Every entry in the data set
corresponds to a packet arriving at an interface. We only
consider the timestamp, packet size and label (either norma l or
DoS trafﬁc) of each packet. The anomalous process ( K = 1 )
0 60 120 180 240 300 360 420 480 540
10−0.5
100
100.5
number of processes
Bayesian risk DS
CBRW
HDS
IRW
Fig. 8: Bayesian risk vs. number of processes, scenario 3.
corresponds to an interface that receives DoS trafﬁc, so we
simulate with permutations the entire data set. The normal
processes are simulated by permutations of the packets that
are labeled as normal trafﬁc.
We use the model in [
41] that considered a sample entropy
for packet-size modeling, and demonstrated strong perfor-
mance in detecting anomalous data on the DARP A data set.
Every 100ms seconds a sample is drawn by calculating the
sample entropy of the packet sizes observed in the probed nod e
during the current 100ms interval. Sampling from an interna l
node is naturally done by aggregating the packets of the
processes within the node. The sample entropy is modeled wit h
a Gaussian distribution that is parametrized by its mean and
standard deviation. Using 1000 permutations of the trainin g
split ( 50% of the data), the distribution of the sample entropy
is estimated for normal and anomalous nodes at all levels
i.e. θ (ℓ)
0 =
(
µ(ℓ)
0 , σ(ℓ)
0
)
and θ (ℓ)
1 =
(
µ(ℓ)
1 , σ(ℓ)
1
)
are estimated
respectively for ℓ = 0, . . . ,log2 M −1. The anomalous sample
entropy is expected to have a smaller mean and variance i.e.
µ(ℓ)
1 < µ (ℓ)
0 and σ(ℓ)
1 < σ (ℓ)
0 . For DS and HDS, the anomaly
parameter sets are Θ (ℓ)
1 =
(
− ∞ , µ(ℓ)
1
2
]
×
(
0, σ(ℓ)
1
2
]
where
µ(ℓ)
1
2
= µ(ℓ)
0 +µ(ℓ)
1
2 and σ(ℓ)
1
2
= σ(ℓ)
0 +σ(ℓ)
1
2 . HDS and IRW use
active internal tests, and HDS uses the sequential GLLR for
the leaf tests. CBRW uses thresholds ηℓ =
µ(ℓ)
0 +µ(ℓ)
1
2
2 and exact
conﬁdence intervals for the mean of normally distributed ra n-
dom variables with standard deviation σ(ℓ) =
σ(ℓ)
0 +σ(ℓ)
1
2
2 . Due
to instability of DS, we discarded runs with more than 1000
samples. Therefore, the evaluation of DS is very generous.
Fig.
9 shows the risk as a function of the number processes.
Interestingly, HDS scales better with the size of the search
space when compared to the other hierarchical algorithms,
namely IRW and CBRW. We attribute this to the fact that the
estimates can be inaccurate at high levels despite using a la rge
training split and many permutations. IRW loses performanc e
because it relies on the point estimate θ (ℓ)
1 while the composite
anomaly model of HDS is more robust.

--- Page 9 ---
9
0 20 40 60 80 100 120 140
10−1
100
number of processes
Bayesian risk DS
IRW
CBRW
HDS
Fig. 9: Bayesian risk vs. number of processes, scenario 4.
V. C ONCLUSIONS
In this work we developed a sequential search strategy for
the composite hierarchical anomaly detection problem dubb ed
HDS. HDS uses two variations of the GLLR statistic to ensure
a biased random walk for a quick and accurate detection of
the anomaly process. HDS is shown to be order optimal with
respect to the size of the search space and asymptotically
optimal with respect to the detection accuracy. The additio n of
the hierarchical search signiﬁcantly improves the perform ance
over linear search methods in the common case of a large
number of processes and heavy hitting anomalies. We empir-
ically show that the performance can be further improved by
using different statistics and local tests, and that for rea l-world
data the composite anomaly model of HDS is more robust to
inaccurate estimates from training than existing algorith ms that
assume a known anomalous distribution model.
APPENDIX A
ACTIVE INTERNAL TEST
Instead of the ﬁxed size internal test described in sec-
tion
III-A, we can use an active internal test:
Let SL(t) and SR(t) be the GLLR of the left and right children
respectively at time t and initialize them with zero at t = 0 .
As in the IRW active test [ 11], we deﬁne the thresholds
v0 ≜ − log 2p
1 − p , v 1 ≜ log 2p
1 − p (24)
where p > 1
2 is the conﬁdence level. Let child
x(t − 1) = argmax
i∈{L,R}
Si(t − 1) (25)
be the child with the higher GLLR at time t − 1. Then, in
every step t, we draw a sample from child x(t− 1) and update
Sx(t)(t). The other child ˜x(t) ̸= x(t) keeps the previous GLLR
i.e., S˜x(t)(t) = S˜x(t)(t − 1). The test terminates at the random
time
k = inf
{
t ∈ N | Sx(t)(t) ≤ v0 or Sx(t)(t) ≥ v1
}
. (26)
If Sx(k)(k) ≥ v1, the random walk zooms into child x(k) and
if Sx(k)(k) ≤ v0, the random walk zooms out to the parent.
We observe a signiﬁcant gain in empirical performance
when compared to the ﬁxed sample internal test (Fig. 6).
APPENDIX B
PROOF OF THEOREM 1
To ﬁnd an upper bound on the Bayesian risk of HDS, we
analyze the case where it is implemented indeﬁnitely , meaning
that HDS probes the processes indeﬁnitely according to its
selection rule, while the stopping rule is disregarded. We
divide the trajectory of indeﬁnite HDS into discrete steps a t
times t ∈ N. A step is not necessarily associated with every
sample as will become clear later. Let τ∞ mark the ﬁrst time
that indeﬁnite HDS performs a leaf test on the true anomaly
and ˜SALLR rises above the threshold. It is easy to see that
regular HDS terminates no later than τ∞. We divide the initial
trajectory t = 1, 2, . . . , τ∞ of the indeﬁnite random walk into
two stages:
• In the search stage the random walk explores the high
level nodes and eventually concentrates at the true
anomaly. This stage ends at time τs which is the last
time a leaf test is started on the true anomaly before τ∞.
• The second stage is the target test which ends with the
declaration of the target. The duration of this stage is τ0.
Step 1: Bound the sample complexity of the search stage:
We partition the tree T into a sequence of sub-trees
T0, T1, . . . ,Tlog2 M (Fig.
2) and deﬁne the last passage time
τℓ as described in section III-B. Let G(t) indicate the sub-tree
of the node tested at time t. The last passage time to Tlog2 M
is
τlog2 M = sup
{
t ∈ N : G(t) = Tlog2 M
}
(27)
For the smaller sub-trees T1, . . . ,Tlog2 M −1 the last passage
times are deﬁned recursively such that
τi = sup {t ∈ N : G(t) = Ti} − τi+1. (28)
Notice, that the search time is bounded by
τs = sup
1≤ℓ≤log2 M
τℓ ≤
log2 M∑
ℓ=1
τℓ. (29)
Next, we bound the expected last passage times E[τℓ] for
1 ≤ ℓ ≤ log2 M . Towards this end, we deﬁne a distance Dt
from the state of the indeﬁnite random walk at time t to the
anomalous leaf. When an internal node is probed, Dt is equal
to the discrete distance to the anomaly on the tree. Since the
walk starts at the root, we have D0 = log 2 M . when testing
a normal leaf, Dt is equal to the sum of the discrete distance
on the tree and the accumulated ˜SALLR of the current leaf test.
When the true anomaly is probed, the distance is negative i.e .
Dt = − ˜SALLR. Let the step Wt be the random change in the
distance at time t such that Dt+1 = Dt + Wt. Internal tests
comprise only a single step either towards or away from the
anomaly, i.e., Wt ∈ {−1, 1}. Because the sample sizes Kℓ of
the internal tests are constructed such that P(Wt = 1) < 1
2 ,
we have
E[Wt] = 2 P[Wt = 1] − 1 < 0. (30)
We now show that if the sets of anomalous parameters Θ (ℓ)
1
are ﬁnite, there exists a bounded number of samples Kℓ such

--- Page 10 ---
10
that ( 30) holds for the internal test at all levels. We identify
the two events
E0 = the tested node does not contain the anomaly (31)
E1 = the tested node contains the anomaly . (32)
The probability of making a step in the wrong direction with
an internal test is upper bounded by
P[Wt = 1] ≤ max (P[Wt = 1 | E0], P[Wt = 1 | E1]). (33)
We ﬁrst bound the ﬁrst term in the maximization of (
33). Let
Pθ i be the probability measure when the true state of nature
is θi, i = 0 , 1, and let Eθ i be the operator of expectation
with respect to the measure Pθ i. Let Sθ 0 and Sθ 1 be the
random GLLRs based on K samples from a normal node and
an anomalous node respectively, where we omit the level ℓ
for readability. Then, under Eθ 0 an error implies that at least
one of the GLLRs is strictly positive. By applying the union
bound we get
P[Wt = 1 | E0] ≤ 2P[Sθ 0 > 0]. (34)
Let ˜θ = argmax θ ∈Θ
∏ K
i=1 f (y(i) | θ ) be the maximum likeli-
hood estimate (MLE) in the set Θ = {θ0}∪Θ 1. The event that
Sθ 0 is strictly positive implies that ˜θ ̸= θ0 via the deﬁnition
of the MLE. Therefore, we ﬁnd that
P[Sθ 0 > 0] =
∑
θ 1∈Θ 1
Pθ 0
[
˜θ = θ1
]
. (35)
Applying the deﬁnition of the MLE, the Chernoff bound and
the independent and identically distributed (i.i.d.) prop erty
yields
Pθ 0
[
˜θ = θ1
]
≤ P θ 0
[ K∑
i=1
log f (y(i) | θ1)
f (y(i) | θ0) ≥ 0
]
≤
(
Eθ 0
[
exp
(
−s log f (y(i) | θ0)
f (y(i) | θ1)
)]) K
(36)
for all s ≥ 0. Notice, that the derivative of the expectation on
the RHS of ( 36) with respect to s, −D(θ0||θ1) ≤ −∆ < 0, is
strictly negative for all θ1 due to the assumption in ( 3). Thus,
for all θ1 ∈ Θ 1 there exists a s > 0 such that the RHS of
(36) decays exponentially meaning that there exist a bounded
C > 0 and a γ > 0 such that
Pθ 0
[
˜θ = θ1
]
≤ Ce −γK . (37)
Combining ( 34), ( 35) and ( 37), we ﬁnd that P[Wt = 1|E0]
decays exponentially with the number of samples K.
Next, we show that P[Wt = 1|E1] also decays exponen-
tially. Under E 1, the event that the GLLR of the anomalous
child is strictly positive and the GLLR of the normal child is
negative implies, that we move towards the anomaly, resulti ng
in
P[Wt = 1 | E1] = 1 − P [Wt = −1 | E1]
≤ 1 − P [Sθ 1 > 0] · P [Sθ 0 ≤ 0] ≤ P [Sθ 1 ≤ 0] + P[Sθ 0 > 0].
We already showed that P[Sθ 0 > 0] decays exponentially with
K, it remains to show the same for P[Sθ 1 ≤ 0]. Using the
deﬁnition of the MLE, the Chernoff bound and the i.i.d.
property ﬁnd
P[Sθ 1 ≤ 0] ≤ P θ 1
[ K∑
i=1
log f (y(i) | ˆθ1)
f (y(i) | θ0) ≤ 0
]
≤ P θ 1
[ K∑
i=1
log f (y(i) | θ1)
f (y(i) | θ0) ≤ 0
]
≤
(
Eθ 1
[
exp
(
−s log f (y(i) | θ1)
f (y(i) | θ0)
)]) K
. (38)
for all s ≥ 0. Once again, the derivative of the expectation on
the RHS of ( 38) with respect to s, −D(θ1||θ0) ≤ − ∆ < 0,
is strictly negative for all θ1 due to the assumption in ( 3).
It follows that P[Wt = 1 | E1] decays exponentially with the
number of samples K. Thus, there exists a bounded K such
that ( 30) holds.
On leaf nodes, every single sample of the sequential test
comprises a step. A step is therefore the change in ˜SALLR.
Using the assumption in ( 3) and the independence of ˆθ (0)
1 (i −
1) and y(i) we ﬁnd that for normal leafs
E[Wt] = Eθ (0)
0

log
f0
(
y(t) | ˆθ (0)
1 (t − 1)
)
f0
(
y(t) | θ (0)
0
)

 ≤ −∆ < 0.
(39)
Similarly, we want to show that for the anomalous leaf that
E[Wt] = Eθ (0)
1

− log
f0
(
y(t) | ˆθ (0)
1 (t − 1)
)
f0
(
y(t) | θ (0)
0
)

 < 0. (40)
Denoting ˆθ = ˆθ (0)
1 (t − 1), we split the term and use the law
of total expectation to ﬁnd that
E[Wt] = Eθ (0)
1

− log
f0
(
y(t) | ˆθ
)
f0
(
y(t) | θ (0)
0
) + log
f0
(
y(t) | θ (0)
1
)
f0
(
y(t) | θ (0)
1
)
  
=0


= −D0
(
θ (0)
1 || θ (0)
0
)
+ Pθ (0)
1
[
ˆθ ̸= θ (0)
1
]
D0
(
θ (0)
1 || ˆθ
)
(41)
where we used the fact that D0
(
θ (0)
1 || θ (0)
1
)
= 0. For (
40) to
hold, it remains to be shown that
Pθ (0)
1
[
ˆθ ̸= θ (0)
1
]
< inf
ˆθ ∈Θ 0
1
D0
(
θ (0)
1 || θ (0)
0
)
D0
(
θ (0)
1 || ˆθ
) ≜ λθ (0)
1
. (42)
Notice, that the λθ (0)
1
are strictly positive due to the assumption
in (3) and assuming that supθ (0)
1 , ˆθ ∈Θ 0
1
D0
(
θ (0)
1 || ˆθ
)
< ∞. For
this purpose, we ﬁrst introduce the following Lemma:
Lemma 1. Let Θ (0)
1 be ﬁnite, i.e., R = |Θ (0)
1 | < ∞ and
let ˆθ (0)
1 (n) be the ML estimate of θ (0)
1 using n samples. Let
τM L be the smallest integer such that ˆθ (0)
1 (n) = θ (0)
1 for all
n > τ M L. Then, there exist a bounded C > 0 and a γ > 0
independent of M and c such that
Pθ (0)
1
[τM L > n] ≤ Ce −γn. (43)

--- Page 11 ---
11
Proof: The event τM L > n implies that there exists a
time t > n such that ˆθ (0)
1 (t) ̸= θ (0)
1 and therefore we have
Pθ (0)
1
[τM L > n] ≤
∞∑
t=n
Pθ (0)
1
[
ˆθ (0)
1 (t) ̸= θ (0)
1
]
. (44)
By deﬁnition of the maximum likelihood estimate, the event
ˆθ (0)
1 (t) ̸= θ (0)
1 implies ∑ t
i=1 S ˜θ (i) ≥ 0 for some ˜θ ̸= θ (0)
1 ,
where S ˜θ (i) = log
f(y(i)| ˜θ )
f
(
y(i)|θ (0)
1
) . Applying the Chernoff bound
and using the i.i.d. property yields
Pθ (0)
1
[ t∑
i=1
S ˜θ (i) ≥ 0
]
≤
(
Eθ (0)
1
[
esS ˜θ (i)
]) t
(45)
for all s ≥ 0. The moment generating function (MGF) esS ˜θ (i)
is equal to one at s = 0 . The derivative of the MGF at
s = 0 is Eθ (0)
1
[
S ˜θ (i)
]
= −D0
(
θ (0)
1 || ˜θ
)
< 0. Because the
derivative is negative and assuming that the distribution o f
S ˜θ (i) is light-tailed 2, there exist s > 0 and γ > 0 such
that E
[
esS ˜θ (i)]
= e−γ < 1 and the RHS of ( 45) decays
exponentially with t. Summing over all ˜θ ̸= θ (0)
1 , we get
Pθ (0)
1
[
ˆθ (0)
1 (t) ̸= θ (0)
1
]
≤ Re−γt, and thus the RHS of ( 44) is
bounded by ∑ ∞
t=n Re−γt = R
1−e−γ e−γn.
In light of lemma 1, we propose the following mechanism to
ensure that ( 42) holds: Whenever a leaf test is started, before
beginning with the sequential test described in section III-A,
a ﬁxed number Nleaf ≥ 0 of samples {yi}0
i=−Nleaf+1 is drawn
from the leaf to initialize the estimate ˆθ (0)
1 , meaning, instead
of (
14) we write
ˆθ (0)
1 (i − 1) = argmax
θ ∈Θ (0)
1
i−1∏
j=−Nleaf+1
f0(y(j) | θ ). (46)
This has the effect, that at every step of the subsequent
sequential test, the estimate ˆθ (0)
1 is based on at least Nleaf
samples. Since ˆθ ̸= θ (0)
1 implies that τM L > N leaf, we have
Pθ (0)
1
[
ˆθ ̸= θ (0)
1
]
≤ P θ (0)
1
[τM L > N leaf]. (47)
Using λ = inf θ (0)
1 ∈Θ (0)
1
λθ (0)
1
and lemma 1 we ﬁnd that (
42)
is satisﬁed if Nleaf > − log λ
C
γ . Notice, that Nleaf is chosen
independent of the size of search space M and the cost c.
With ( 30), ( 39) and ( 40) we established that HDS has the
same drift behavior as IRW . Furthermore, we assume that the
distribution of log
f0(y(i) | ˜θ )
f0
(
y(i) | θ (0)
0
) is light-tailed for all ˜θ ∈ Θ (0)
1 .
Thus, we can apply [
11, Lemma 1,2] and ﬁnd that the
expected last passage times E[τi] for 1 ≤ i ≤ log2 M are
bounded by a constant β independent of M and c. Applying
(29) yields
E[τs] ≤ βlog2 M . (48)
Let Kmax = sup 0≤ℓ≤log2 M−1{Kℓ} be the maximum number
of samples taken from a child during an internal test. Then
every step Wt takes at most Nmax = max {2Kmax, Nleaf + 1}
2A distribution with density f is light-tailed if ∫ ∞
−∞ eλx f (x)dx < ∞ for
some λ > 0 [
55].
samples and the complexity of the search stage Qs is bounded
by
Qs ≤ NmaxE[τs] ≤ B log2 M (49)
where B = βNmax is a constant independent of M and c.
Step 2: Bound the sample complexity of the target test:
In the analysis of the target test we associate a time step n =
1, 2, . . . , τ0 with every sample. Using lemma 1 and the tail
sum for expectation we ﬁnd
E[τM L] = O(1). (50)
At all times n > τ M L, we necessarily have ˆθ (0)
1 = θ (0)
1 . From
the deﬁnition of ˜SLALLR in ( 13) it is easy to see, that after
n = τM L+1, the leaf test is essentially a sequential likelihood
ratio test. The expected time until the threshold log log2 M
c is
reached τf = τ0 − τM L is bounded by
E[τf ] ≤ log log2 M
c
D0
(
θ (0)
1 ||θ (0)
0
) + O(1) (51)
where we used Wald’s equation [ 37] and Lorden’s inequality
[53] and assumed that the ﬁrst two moments of the log-
likelihood ratio are ﬁnite. Combining ( 50) and ( 51) yields the
sample complexity of the target test
Qt = E[τ0] ≤ log log2 M
c
D0
(
θ (0)
1 ||θ (0)
0
) + O(1). (52)
Step 3: Bound the error rate:
Notice, that detection errors can only occur in the search st age.
The expected number of times a normal leaf is tested E[N ]
is bounded by the number of steps in the search stage. Thus,
using (
48) we get
E[N ] ≤ E[τs] ≤ βlog2 M . (53)
Let Z(n) = exp
(
˜SALLR(n)
)
be adaptive likelihood ratio at
time n. In the following, we use the properties of the ALLR
to bound the false positive rate of the leaf test
α = Pθ (0)
0
[
Z(n) ≥ log2 M
c for some n ≥ 1
]
. (54)
Note that on normal leafs Z(n) is a non-negative martingale,
i.e.,
Eθ (0)
0
[Z(n + 1) | {y(i)}n
i=1] (55)
= Z(n)Eθ (0)
0


f
(
y(n + 1) | ˆθ (0)
1 (n)
)
f
(
y(n + 1) | θ (0)
0
)

 = Z(n) (56)
where we used the independence of ˆθ (0)
1 (n) and y(n + 1) in
the last step. Using a lemma for nonnegative supermartingal es
[
56] we ﬁnd
Pθ (0)
0
[
Z(n) ≥ log2 M
c for some n ≥ 1
]
≤ c
log2 M Eθ (0)
0
[Z(1)].
Since Z(1) = Eθ (0)
0
[
f
(
y(1) | ˆθ (0)
1 (0)
)
f
(
y(1) | θ (0)
0
)
]
= 1 , the false positive
rate is bounded by
α ≤ c
log2 M . (57)

--- Page 12 ---
12
Finally, combining ( 53) and ( 57) yields the bound on the error
rate
PErr(πHDS) ≤ α · E[N ] ≤ βc = O(c) (58)
Theorem 1 follows from ( 49), ( 52) and ( 58).
APPENDIX C
PROOF OF THEOREM 2
To ﬁnd an upper bound on the Bayesian risk of HDS in
the multi-target scenario, we analyze the K random walks
separately. This can be done because there is at least one
undeclared anomalous leaf in the tree T during each random
walk.
Step 1: Bound the sample complexity of the search stage:
Similar to the proof in appendix
B, we divide the tree T
as described in section III-C and fig. 4. The last passage
times are deﬁned recursively by eqs. (27)– (28) and the search
time is bounded by ( 29). Let D(i)
t be the distance to the i-th
anomalous leaf at time t, where the distance is deﬁned as in
appendix B. Now consider the change in the distance to the
closest anomaly Wt = Dt+1 − Dt where Dt = min i D(i)
t .
We want to show that in expectation the minimum distance
decreases at all times during the random walk i.e.
E[Wt] < 0. (59)
As the leaf test is unaffected by additional anomalies and th e
currently tested leaf is also the closest, it only remains to show
that (
59) holds for the internal test. Recall, that the number of
samples Kℓ of an internal test is chosen such that ( 59) holds.
In appendix B, we have proven that such a Kℓ exists for the
two events E 0 and E 1 deﬁned in eqs. (31)– (32). Notice, that
under E 0 the closest anomaly lies outside the tested node and
the distance to it is in expectation reduced by moving to the
parent by following the same argument as for a single anomaly .
Now, we recognize the events
Ej = the tested node contains j anomalies (60)
for j ≥ 1. Notice, that the j anomalies within the node are
the closest anomalies and they are equally close. Moving to a
child that contains at least one anomaly reduces Dt by 1. We
distinguish the two events
E(1)
j = one of the children contains anomalies (61)
E(2)
j = both of the children contains anomalies . (62)
Let Sθ j be the random GLLRs based on K ′ samples from
a node containing j anomalies, where we omit the level ℓ
for readability. Then under E (1)
j , the event that the GLLR of
the anomalous child is strictly positive and the GLLR of the
normal child is negative, implies Wt = −1 such that
P
[
Wt = 1 | E(1)
j
]
= 1 − P
[
Wt = −1 | E(1)
j
]
≤ 1 − P
[
Sθ j > 0
]
· P [Sθ 0 ≤ 0] ≤ P
[
Sθ j ≤ 0
]
+ P[Sθ 0 > 0].
We already showed that P[Sθ 0 > 0] and P[Sθ 1 ≤ 0] decay
exponentially with K ′ (Appendix
B), it remains to show the
same for P
[
Sθ j ≤ 0
]
with j > 1. Using the deﬁnition of the
MLE, the Chernoff bound and the i.i.d. property ﬁnd
P
[
Sθ j ≤ 0
]
≤ P θ j


K ′
∑
i=1
log f (y(i) | ˆθ1)
f (y(i) | θ0) ≤ 0


≤ P θ j


K ′
∑
i=1
log f (y(i) | θ1)
f (y(i) | θ0) ≤ 0


≤
(
Eθ j
[
exp
(
−s log f (y(i) | θ1)
f (y(i) | θ0)
)]) K ′
.
(63)
for all θ1 ∈ Θ 1 and s ≥ 0. Due to the assumption in ( 20), for
all θj ∈ Θ j there exists a θ1 such that the derivative of the
expectation on the RHS of ( 63) with respect to s
Dℓ(θj||θ1) − Dℓ(θj||θ0) ≤ −∆ < 0. (64)
is strictly negative. Therefore P
[
Sθ j ≤ 0
]
and
P
[
Wt = 1 | E(1)
j
]
decay exponentially with K ′.
Next, we consider E (2)
j . Moving away from the closest
anomalies implies that the GLLR of both children is negative
such that
P
[
Wt = 1 | E(2)
j
]
= P
[
Sθ jl
≤ 0
]
· P
[
Sθ jr ≤ 0
]
. (65)
where θjl and θjr are the parameters of the left and right
child containing jl and jr anomalies respectively. The factors
on the RHS of (
65) decay exponentially with K ′. It follows
that there exists a bounded number of samples K ′ such that
(59) holds.
Following the same arguments as in step 1 of appendix B,
we ﬁnd that the sample complexity of a single random walk is
bounded by (
49). Consequently, the complexity of the search
stages of the K random walks is bounded by
Qs ≤ KB log2 M. (66)
Step 2: Bound the sample complexity of the target test:
Since, the leaf target test is unaffected by additional anom alies,
its sample complexity is bounded by (
52) and summing over
the K random walks yields
Qt ≤ KE[τ0] ≤ K log log2 M
c
D0
(
θ (0)
1 ||θ (0)
0
) + O(1). (67)
Step 3: Bound the error rate: Applying the reasoning in
step 3 of appendix B we ﬁnd that the error rate is bounded by
(58) and applying the union bound over the K random walks
yields
PErr(πHDS) = KαE[N ] ≤ Kβc = O(c). (68)
Theorem 2 follows from ( 66), ( 67) and ( 68).
REFERENCES
[1] B. Wolff, T. Gafni, G. Revach, N. Shlezinger, and K. Cohen , “Composite
anomaly detection via hierarchical dynamic search,” in IEEE Interna-
tional Symposium on Information Theory (ISIT) , 2022.
[2] Q. Zhao and B. M. Sadler, “A survey of dynamic spectrum acc ess,”
IEEE Signal Process. Mag. , vol. 24, no. 3, pp. 79–89, 2007.

--- Page 13 ---
13
[3] J. Zhang and M. Zulkernine, “Anomaly based network intru sion de-
tection with unsupervised outlier detection,” in IEEE International
Conference on Communications , vol. 5, 2006, pp. 2388–2393.
[4] B. Genge, D. A. Rusu, and P . Haller, “A connection pattern -based
approach to detect network trafﬁc anomalies in critical inf rastructures,”
in European W orkshop on System Security , 2014.
[5] H. Chernoff, “Sequential design of experiments,” The Annals of Math-
ematical Statistics , vol. 30, no. 3, pp. 755–770, 1959.
[6] M. Ahmed, A. N. Mahmood, and M. R. Islam, “A survey of anoma ly
detection techniques in ﬁnancial domain,” Future Generation Computer
Systems, vol. 55, pp. 278–288, 2016.
[7] K. Singh, S. Rajora, D. K. Vishwakarma, G. Tripathi, S. Ku mar, and
G. S. Walia, “Crowd anomaly detection using aggregation of e nsembles
of ﬁne-tuned convnets,” Neurocomputing, vol. 371, pp. 188–198, 2020.
[8] K. Thompson, G. J. Miller, and R. Wilder, “Wide-area inte rnet trafﬁc
patterns and characteristics,” IEEE Network , vol. 11, no. 6, pp. 10–23,
1997.
[9] S.-E. Chiu, N. Ronquillo, and T. Javidi, “Active learnin g and csi
acquisition for mmwave initial alignment,” IEEE J. Sel. Areas Commun. ,
vol. 37, no. 11, pp. 2474–2489, 2019.
[10] T. Simsek, R. Jain, and P . V araiya, “Scalar estimation a nd control with
noisy binary observations,” IEEE Trans. Autom. Control , vol. 49, no. 9,
pp. 1598–1603, 2004.
[11] C. Wang, K. Cohen, and Q. Zhao, “Information-directed r andom walk
for rare event detection in hierarchical processes,” IEEE Trans. Inf.
Theory, vol. 67, no. 2, pp. 1099–1116, 2020.
[12] S. V akili, Q. Zhao, C. Liu, and C.-N. Chuah, “Hierarchic al heavy hitter
detection under unknown models,” in IEEE International Conference
on Acoustics, Speech and Signal Processing (ICASSP) , 2018, pp. 6917–
6921.
[13] S. V akili and Q. Zhao, “A random walk approach to ﬁrst-or der stochastic
convex optimization,” in IEEE International Symposium on Information
Theory (ISIT) , 2019, pp. 395–399.
[14] T. Gafni, K. Cohen, and Q. Zhao, “Searching for unknown a nomalies
in hierarchical data streams,” IEEE Signal Process. Lett. , vol. 28, pp.
1774–1778, 2021.
[15] K. P . Tognetti, “An optimal strategy for a whereabouts s earch.” Opera-
tions Research, vol. 16, no. 1, 1968.
[16] J. B. Kadane, “Optimal whereabouts search,” operations Research ,
vol. 19, no. 4, pp. 894–904, 1971.
[17] Y . Zhai and Q. Zhao, “Dynamic search under false alarms, ” in IEEE
Global Conference on Signal and Information Processing , 2013, pp.
201–204.
[18] D. A. Castanon, “Optimal search strategies in dynamic h ypothesis
testing,” IEEE Transactions on Systems, Man, and Cybernetics , vol. 25,
no. 7, pp. 1130–1138, 1995.
[19] K. S. Zigangirov, “On a problem in optimal scanning,” Theory of
Probability & Its Applications , vol. 11, no. 2, pp. 294–298, 1966.
[20] E. Klimko and J. Y ackel, “Optimal search strategies for wiener pro-
cesses,” Stochastic Processes and their Applications , vol. 3, no. 1, pp.
19–33, 1975.
[21] K. Cohen, Q. Zhao, and A. Swami, “Optimal index policies for anomaly
localization in resource-constrained cyber systems,” IEEE Trans. Signal
Process., vol. 62, no. 16, pp. 4224–4236, 2014.
[22] B. Huang, K. Cohen, and Q. Zhao, “Active anomaly detecti on in
heterogeneous processes,” IEEE Trans. Inf. Theory , vol. 65, no. 4, pp.
2284–2301, 2018.
[23] A. Gurevich, K. Cohen, and Q. Zhao, “Sequential anomaly detection
under a nonlinear system cost,” IEEE Trans. Signal Process. , vol. 67,
no. 14, pp. 3689–3703, 2019.
[24] T. Lambez and K. Cohen, “Anomaly search with multiple pl ays under
delay and switching costs,” IEEE Trans. Signal Process. , vol. 70, pp.
174–189, 2021.
[25] N. K. V aidhiyan and R. Sundaresan, “Learning to detect a n oddball
target,” IEEE Trans. Inf. Theory , vol. 64, no. 2, pp. 831–852, 2017.
[26] S. Nitinawarat and V . V . V eeravalli, “Universal scheme for optimal
search and stop,” in 2015 Information Theory and Applications W ork-
shop (ITA) . IEEE, 2015, pp. 322–328.
[27] K. Cohen and Q. Zhao, “Asymptotically optimal anomaly d etection via
sequential testing,” IEEE Trans. Signal Process. , vol. 63, no. 11, pp.
2929–2941, 2015.
[28] A. G. Tartakovsky, “Nearly optimal sequential tests of composite hy-
potheses revisited,” Proceedings of the Steklov Institute of Mathematics ,
vol. 287, no. 1, pp. 268–288, 2014.
[29] A. G. Tartakovsky, G. Sokolov, and Y . Bar-Shalom, “Near ly optimal
adaptive sequential tests for object detection,” IEEE Trans. Signal
Process., vol. 68, pp. 3371–3384, 2020.
[30] R. Caromi, Y . Xin, and L. Lai, “Fast multiband spectrum s canning
for cognitive radio systems,” IEEE Transactions on Communications ,
vol. 61, no. 1, pp. 63–75, 2012.
[31] J. Heydari, A. Tajer, and H. V . Poor, “Quickest linear se arch over
correlated sequences,” IEEE Trans. Inf. Theory , vol. 62, no. 10, pp.
5786–5808, 2016.
[32] J. Geng, W. Xu, and L. Lai, “Quickest sequential multiba nd spectrum
sensing with mixed observations,” IEEE Trans. Signal Process. , vol. 64,
no. 22, pp. 5861–5874, 2016.
[33] A. Tajer and H. V . Poor, “Quick search for rare events,” IEEE Trans.
Inf. Theory , vol. 59, no. 7, pp. 4462–4481, 2013.
[34] A. Tsopelakos, G. Fellouris, and V . V . V eeravalli, “Seq uential anomaly
detection with observation control,” in IEEE International Symposium
on Information Theory (ISIT) , 2019, pp. 2389–2393.
[35] A. Tsopelakos and G. Fellouris, “Sequential anomaly de tection under
sampling constraints,” IEEE Transactions on Information Theory , pp.
1–1, 2022.
[36] A. Tajer, V . V . V eeravalli, and H. V . Poor, “Outlying seq uence detection
in large data sets: A data-driven approach,” IEEE Signal Process. Mag. ,
vol. 31, no. 5, pp. 44–56, 2014.
[37] A. Wald, Sequential analysis . Courier Corporation, 2004.
[38] M. Naghshvar and T. Javidi, “Active sequential hypothe sis testing,” The
Annals of Statistics , vol. 41, no. 6, pp. 2703–2738, 2013.
[39] K. Cohen and Q. Zhao, “Active hypothesis testing for ano maly detec-
tion,” IEEE Trans. Inf. Theory , vol. 61, no. 3, pp. 1432–1450, 2015.
[40] M. Egan, J.-M. Gorce, and L. Cardoso, “Fast initializat ion of cognitive
radio systems,” in IEEE International W orkshop on Signal Processing
Advances in Wireless Communications (SPAWC) , 2017.
[41] B. Hemo, T. Gafni, K. Cohen, and Q. Zhao, “Searching for a nomalies
over composite hypotheses,” IEEE Trans. Signal Process. , vol. 68, pp.
1181–1196, 2020.
[42] J. L. Bentley, “Multidimensional binary search trees u sed for associative
searching,” Communications of the ACM , vol. 18, no. 9, pp. 509–517,
1975.
[43] D. D. Sleator and R. E. Tarjan, “Self-adjusting binary s earch trees,”
Journal of the ACM (JACM) , vol. 32, no. 3, pp. 652–686, 1985.
[44] G. K. Atia and V . Saligrama, “Boolean compressed sensin g and noisy
group testing,” IEEE Trans. Inf. Theory , vol. 58, no. 3, pp. 1880–1901,
2012.
[45] V . Y . Tan and G. K. Atia, “Strong impossibility results f or noisy group
testing,” in IEEE International Conference on Acoustics, Speech and
Signal Processing (ICASSP) , 2014, pp. 8257–8261.
[46] Y . Kaspi, O. Shayevitz, and T. Javidi, “Searching for mu ltiple targets
with measurement dependent noise,” in IEEE International Symposium
on Information Theory (ISIT) , 2015, pp. 969–973.
[47] J. Scarlett, “Noisy adaptive group testing: Bounds and algorithms,” IEEE
Trans. Inf. Theory , vol. 65, no. 6, pp. 3646–3661, 2018.
[48] P . I. Frazier, S. G. Henderson, and R. Waeber, “Probabil istic bisection
converges almost as quickly as stochastic approximation,” Mathematics
of Operations Research , vol. 44, no. 2, pp. 651–667, 2019.
[49] R. Waeber, P . I. Frazier, and S. G. Henderson, “Bisectio n search with
noisy responses,” SIAM Journal on Control and Optimization , vol. 51,
no. 3, pp. 2261–2279, 2013.
[50] M. Ben-Or and A. Hassidim, “The Bayesian learner is opti mal for
noisy binary search (and pretty good for quantum as well),” i n IEEE
Symposium on F oundations of Computer Science , 2008, pp. 221–230.
[51] H. Robbins and D. Siegmund, “A class of stopping rules fo r testing
parametric hypotheses,” in Proceedings of the Sixth Berkeley Symposium
on Mathematical Statistics and Probability, V olume 4: Biol ogy and
Health. University of California Press, 1972, pp. 37–41.
[52] ——, “The expected sample size of some tests of power one, ” The
Annals of Statistics , vol. 2, no. 3, pp. 415–436, 1974.
[53] G. Lorden, “On excess over the boundary,” The Annals of Mathematical
Statistics, vol. 41, no. 2, pp. 520–527, 1970.
[54] “Darpa intrusion detection data sets,”
https://archive.ll.mit.edu/ideval/data/2000data.html, 2000, [Online;
accessed 18-April-2022].
[55] S. Foss, D. Korshunov, and S. Zachary, An introduction to heavy-tailed
and subexponential distributions , ser. Springer Series in Operations
Research and Financial Engineering. Springer, 2011.
[56] H. Robbins and D. Siegmund, “A class of stopping rules fo r testing
parametric hypotheses,” in Proc. 16th Berkeley Symp. Math. Statist.
Probability (Univ. Calif. Press) . Berkeley, CA, 1972, pp. 37–41.
