---

## article_number: 9
slug: hong-2012-tiresias
pdf: Hong_2012_Tiresias.pdf
extraction_status: ok
last_updated: 2026-06-26

# Raw PDF text — Article 9 (hong-2012-tiresias)

- **Source PDF:** `Literature Review PDFs/03_Hierarchical_Time_Series/Hong_2012_Tiresias.pdf`
- **Wiki source page:** [[../sources/hong-2012-tiresias|hong-2012-tiresias]]

## Extracted text

--- Page 1 ---
Tiresias: Online Anomaly Detection for
Hierarchical Operational Network Data
Chi-Yao Hong, Matthew Caesar
University of Illinois at Urbana-Champaign
{cyhong|caesar}@illinois.edu
Nick Dufﬁeld, Jia Wang
AT&T Labs - Research
{dufﬁeld|jiawang}@research.att.com
Abstract— Operational network data , management data such
as customer care call logs and equipment system logs, is a
very important source of information for network operators to
detect problems in their networks. Unfortunately, there is lack
of efﬁcient tools to automatically track and detect anomalous
events on operational data, causing ISP operators to rely on
manual inspection of this data. While anomaly detection has
been widely studied in the context of network data, operational
data presents several new challenges, including the volatility and
sparseness of data, and the need to perform fast detection (com-
plicating application of schemes that require ofﬂine processing
or large/stable data sets to converge).
To address these challenges, we propose Tiresias, an auto-
mated approach to locating anomalous events on hierarchical
operational data. Tiresias leverages the hierarchical structure
of operational data to identify high-impact aggregates (e.g.,
locations in the network, failure modes) likely to be associated
with anomalous events. To accommodate different kinds of
operational network data, Tiresias consists of an online detection
algorithm with low time and space complexity, while preserving
high detection accuracy. We present results from two case
studies using operational data collected at a large commercial
IP network operated by a Tier-1 ISP: customer care call logs
and set-top box crash logs. By comparing with a reference set
veriﬁed by the ISP’s operational group, we validate that Tiresias
can achieve >94% accuracy in locating anomalies. Tiresias also
discovered several previously unknown anomalies in the ISP’s
customer care cases, demonstrating its effectiveness.
Index Terms—anomaly detection; operational network data;
time series analysis; log analysis.
I. I NTRODUCTION
Network monitoring is becoming an increasingly critical
requirement for protecting large-scale network infrastructure.
Criminals and other Internet miscreants make use of in-
creasingly advanced strategies to propagate spam, viruses,
worms, and exercise DoS attacks against their targets [1], [2],
[3]. However, the growing size and functionality of modern
network deployments have led to an increasingly complex
array of failure modes and anomalies that are hard to detect
with traditional approaches [4], [5].
Detection of statistically anomalous behavior is an impor-
tant line of defense for protecting large-scale network infras-
tructure. Such techniques work by analyzing network trafﬁc
(such as trafﬁc volume, communication outdegree, and rate
of routing updates), characterizing “typical” behavior, and
extracting and reporting statistically rare events as alarms [6],
[7], [8], [9], [10].
While these traditional forms of data are useful, the
landscape of ISP management has become much broader.
Commercial ISPs collect an increasingly rich variety of
operational data including network trouble tickets, customer
care cases, equipment system logs, and repair logs. Several
properties of operational data make them highly useful for
network monitoring. Operational data is often annotated with
semantics. Customer care representatives annotate call logs
with detailed characteristics on the end user’s experience of
the outage, as well as information on the time and location
of the event. Repair logs contain information about the
underlying root cause of the event, and how the problem
was repaired. This provides more detailed information on
the meaning and the type of event that occurred from a
smaller amount of data. More importantly, operational data is
often presented in an explicitly-described hierarchical format.
While the underlying signal may be composed across multiple
dimensions, correlations across those dimensions are explic-
itly described in the provided hierarchy, allowing us to detect
anomalies at higher levels of the tree when information at the
leaves is too sparse.
While operational data can serve as rich sources of infor-
mation to help ISPs manage network performance, there is
still a lack of an effective mechanism to assist ISP opera-
tion teams in using these data sources to identify network
anomalies. For example, currently a Tier- 1 ISP operation
group manually inspects >300,000 customer care calls in
a working day to deduce network incidents or performance
degradations. Unfortunately, the sheer volume of data makes
it difﬁcult to manually form a “big picture” understanding of
the data, making it very challenging to locate root causes of
performance problems accurately.
To deal with this, it is desirable to automatically detect
anomalies in operational data. Unfortunately, several unique
features of operational data complicate application of previ-
ous work in this space:
Operational data is complex: Operational data is sparse in
the time domain, with a low rate of underlying events; it
is composed of data spread over a large hierarchical space,
reducing the magnitude of the signal. Operational data is also
volatile, being sourced from a data arrival rate that changes
rapidly over time, complicating the ability to detect statistical
variations. Unfortunately, the fact that user calls arrive on
the order of minutes for a particular network incident (as
arXiv:1203.2163v1  [cs.NI]  9 Mar 2012

--- Page 2 ---
opposed to sub-millisecond reporting in traditional network
trafﬁc monitoring systems) means that the ISP may need to
make a decision on when to react after a few calls.
Operational data represents urgent concerns: Opera-
tional data contains mission-critical failure information, often
sourced after the problem has reached the customer. Opera-
tional data such as call logs reﬂects problems crucial enough
to motivate the customer to contact the call center. Moreover,
call logs that affect multiple customers typically reﬂect large-
scale outages that need immediate attention. Unfortunately,
the richness of operational data incurs signiﬁcant processing
requirements, complicating use of traditional anomaly detec-
tion approaches (which rely on ofﬂine processing).
To address these challenges, we propose Tiresias 1, an
automated approach to locating anomalous events (e.g., net-
work outages or intermittent connection drops) on operational
data. To leverage the hierarchical nature of operational data,
we build upon previous work on hierarchical heavy hitter -
based anomaly detection [7], [11]. In a large hierarchy space,
heavy hitters are nodes with higher aggregated data counts,
which are suspicious locations where anomalies (signiﬁcant
spikes) could happen. However, these works relied on ofﬂine
processing for anomaly detection, which does not scale to
operational data (refer to§VIII for further details). We extend
these works to perform anomaly detection in an online
and adaptive fashion. To quickly detect anomalies without
incurring high processing requirements, we propose novel
algorithms to maintain a time series characterization of data at
each heavy hitter that is updated in both time and hierarchical
domain dynamically without requiring storage of older data.
To avoid redundant reports of the same anomaly, our approach
also automatically discounts data from descendants that are
themselves heavy hitters.
We ﬁrst characterize two large-scale operational datasets
(customer care calls and set-top boxes crash logs; §II) via
measurement. Then we formally deﬁne our problem ( §III).
We present a high-level overview of our design and its
limitations (§IV). To achieve online detection, we propose
novel algorithms to update the time series in both time and
hierarchical domain dynamically (§V). We adopt time series
analysis to derive the data seasonality and perform time series
based anomaly detection ( §VI). We evaluate the efﬁciency
and effectiveness of Tiresias using large-scale operational
datasets (§VII). Our ﬁndings suggest that Tiresias can scale
to these real datasets with sufﬁciently low computational
resources (§VII-A). We compare the set of anomalies detected
by Tiresias on customer call cases with an existing approach
used by a major US broadband provider ( §VII-B). Tiresias
discovers >94% of the anomalies found by the reference
method as well as many previously unknown anomalies
hidden in the lower levels. We present related work ( §VIII)
before we conclude (§IX).
1The name comes from the intuition that our system detects network
anomalies without needing to understand the context of operational logs.
TABLE I
CCD CUSTOMER CALLS
Ticket Types Percentage (%)
TV 39.59
All Products 26.71
Internet 10.04
Wireless 9.26
Phone 8.46
Email 3.59
Remote Control 2.35
II. C HARACTERIZING OPERATIONAL DATA
It is arguably impossible to accurately detect anomalous
events without understanding the underlying data. We ﬁrst
present characterization results of two operational datasets
(§II-A). Then we conduct a measurement analysis to study
the properties of the operational datasets ( §II-B).
A. Operational Datasets
The data used in this study was obtained from a major
broadband provider of bundled Internet, TV and V oIP services
in the US. We present the results based on the datasets 2 col-
lected from May to September 2010. Two distinct operational
datasets were used, which we now describe.
Customer Care Call Dataset (CCD): The study used data
derived from calls to the broadband service customer care
center. A record is generated for each such call. Based on
the conversation with the customer, the care representative
assigns a category to the call, choosing from amongst a set
of predetermined hierarchical classes. We focus on analyzing
customer calls that are related to performance troubles (ser-
vice disruptions/degradation, intermittent connectivity, etc.)
and discard records unrelated to performance issues (e.g.,
calls about provisioning, billing, accounting). The resulting
operator-assigned category constitutes a trouble description,
which is drawn from a hierarchical tree with a height of
5 levels3. We summarize the distribution of the number of
customer tickets for the ﬁrst-level categories (Table I). Each
record also speciﬁes information concerning the network path
to the customer premises, which is drawn from a hierarchical
tree comprising 5 levels4.
STB Crash Dataset (SCD): At the customer premises,
a Residential Gateway serves as a modem and connects to
one or more Set-Top Boxes (STBs) that serve TVs and
enable user control of the service. Similar to other types
2all customer identifying information was hashed to a unique customer
index to protect privacy.
3These categories indicate the broad area of the trouble: IPTV , home
wireless network, Internet, email, digital home phone, and a more speciﬁc
detail within the category. For example, [Trouble Management]⇒ [TV]
⇒ [TV No Service ] ⇒ [No Pic No Sound ] ⇒ [Dispatched to
Premise].
4The top (root) level is SHO (Super Head-end Ofﬁce), which is the main
source of national IPTV content. Under SHO, there are multiple VHOs
(Video Head-end Ofﬁce) in the second level, each of which is responsible
for the network service in a region. A VHO serves a number of IOs
(intermediate ofﬁces), each of which serves a metropolitan area network.
An IO serves multiple routers/switches called COs (central ofﬁces), and
each CO serves multiple switches DSLAMs (digital subscriber line access
multiplexers) before reaching a customer residence.

--- Page 3 ---
0.0001
 0.001
 0.01
 0.1
 1
 0.0001  0.001  0.01  0.1  1
CCDF over nodes over time
[log scale]
Normalized count of appearances
[log scale]
All
Depth = 1
Depth = 2
Depth = 3
Depth = 4
(a)
 0.0001
 0.001
 0.01
 0.1
 1
 0.0001  0.001  0.01  0.1  1
CCDF over nodes over time
[log scale]
Normalized count of appearances
[log scale]
National
VHO level
IO level
CO level
DSLAM level (b)
 0.0001
 0.001
 0.01
 0.1
 1
 0.0001  0.001  0.01  0.1  1
CCDF over nodes over time
[log scale]
Normalized count of appearances
[log scale]
National
CO level
DSLAM level
STB level (c)
Fig. 1. For each level in the hierarchy, the complementary cumulative distribution function of the normalized count of cases across nodes and time units.
(a) trouble issues of CCD, (b) network locations of CCD, and (c) network locations of SCD. Note that both x- and y-axes are log scale.
 0
 0.2
 0.4
 0.6
 0.8
 1
05/01 05/02 05/03 05/04 05/05 05/06 05/07 05/08
Normalized count
of appearances
Local Time
(a)
 0.2
 0.4
 0.6
 0.8
 1
09/02 09/03 09/04 09/05 09/06 09/07 09/08 09/09
Normalized count
of appearances
Local Time (b)
Fig. 2. Two representative time series of the count of appearances in a 15-minute precision for the datasets (a) CCD and (b) SCD. The data count is
normalized, by dividing it by the maximal count in the time series. (a) and (b) starts from Saturday and Thursday, respectively.
TABLE II
HIERARCHY PROPERTIES
Data Type Depth Typical degree at kth level
k = 1 k = 2 k = 3 k = 4
CCD Trouble descr. 5 9 6 3 5
Network path 5 61 5 6 24
SCD Network path 4 2,000 30 6 N/A
of computer devices, an STB may crash, then subsequently
reboot. This study used logs of STB crash events from the
same broadband network, that are generated by the STB.
By combining the STB identiﬁer reported in the log, with
network conﬁguration information, network path information
similar to that described for CCD can be associated with each
crash event. This information is represented in a hierarchical
tree of 4 levels. The broad properties such as node degrees
in different levels are summarized (Table II).
B. Characteristics of Operational Data
Sparsity: We measure the case arrival rate for difference
aggregates in the hierarchies (Fig. 1). The number of cases per
node, especially for nodes in the lower levels, is very sparse
over time in both data sets. For example, we observe that in
about 93% (70%) of the time we have no cases for nodes in
the CO level in CCD (SCD). Anomaly detection over sparse
data is usually inaccurate as it is hard to differentiate the
anomalous and normal case [12]. However, larger localized
bursts of calls relating to certain nodes do occur; these are
obvious candidates for anomalies.
Volatility: In both datasets, we observe the number of cases
varies signiﬁcantly over time. For example, consider the root
node of trouble issues in CCD (“All” in Fig. 1(a)), we observe
that the case number at the 90th percentile of the appearance
count distribution is ≈ 35 times higher than that at the 10th
percentile. We observe that the sibling nodes (nodes that share
a common parent) in the hierarchy could have very different
case arrival rates. The above observations imply that the set of
heavy hitters could change signiﬁcantly over time. Therefore,
observing any ﬁxed subset of nodes in the hierarchy could
easily miss signiﬁcant anomalies.
Seasonality: To observe the variation on arrival case counts,
we measured the time series of the normalized count of
appearances in 15-minute time units (Fig. 2). Overall, a
diurnal pattern is clearly visible in both the datasets. This
pattern is especially strong in CCD. In particular, the daily
peaks are usually around 4 PM, while the daily minimum is
at around 4 AM. Moreover, the weekly pattern is observed in
CCD where we have fewer cases in ﬁrst two days (May 1−2,
2010), which are Saturday and Sunday (Fig. 2). Regardless
of the differences observed in the two datasets, one common
property is the presence of large spikes. Some spikes last
only a short period (e.g., <30 minutes at 5 AM, May 2nd in
Fig. 2(a)), while some spikes last longer (e.g., >5 hours at
off-peak time, Sept 7th in Fig. 2(b)). These spikes are by no
means unique over time – we observed a similar pattern in
other time periods.
III. P ROBLEM STATEMENT
In this section, we formally deﬁne the online anomaly de-
tection problem. In particular, we ﬁrst describe the operational
data format, and then we deﬁne hierarchical heavy hitter
which allows us to identify the high-impact aggregates. To
detect if the event related to these heavy hitters is anomalous,
we deﬁne time series based anomaly detection .
An input stream S = s0,s 1,... is a sequence of opera-
tional network data si. Each data si = (ki,ti) consists of two
components: category ki provides classiﬁcation information
about the data; time ti denotes the recorded date and time
of si. The data can be classiﬁed into “timeunits” based on
its time information ti. The data category is drawn from a
hierarchical domain (i.e., tree) where each node n in the tree
is associated with a weight valueAn[k,t ] for timeunit t. For

--- Page 4 ---
Operational data
Date Time
Category
Level 1 Level k
Data list
Operational data #1
Operational data #2
Time
DetectionHistory period
Timeunit (size =Δ)
Time window (ℓ timeunits)
Timeunit
1
Timeunit
2
Timeunit
ℓ
Time increment = ϛCurrent time instance t
period
Step 1: Classifying
data into timeunits
Step 2:
Detecting heavy
hitters and
constructing
time series
Step 4: Seasonal forcasting
for anomaly detection
Step 6: Checking
new incoming data
Step 5: Reporting
anomalous events
User interfaces
Web Report
Database
Querying /
searching
Technician / network
administrator
Frequency
MagnitudeStep 3:
(optional)
Data
seasonality
analysis
All
VHO VHO
IO IO
CO CO
DSLAM DSLAM
Level 1
Level 2
Level 3
Level 4
Level 5
Back end Front end
Time
Count of
appearances
Spectrum
analysis
Wavelet
multi-
resolution
analysis
Time
Wavelet #1
Time
Wavelet #q
(a)
(b) (c) (d)
(e) (f)
Fig. 3. System diagram: (a) abstraction of streaming operational data, (b) a window-based structure to classify input data into time units, (c) heavy hitter
detection and time series construction in a hierarchical domain, (d) data seasonality analysis, (e) seasonal forecasting model for anomaly detection, and (f)
a user interface enables an administrator to query for anomalous events. For details, refer to §IV.
leaf nodes, the weight An[k,t ] is deﬁned by the number of
data items in S whose category is k and occur in timeunit t.
For non-leaf nodes (i.e., interior nodes), the weight An[k,t ]
is the summation of the weights of its children. We deﬁned
the hierarchical heavy hitter (HHH) as follows:
Deﬁnition 1: (HHH; Hierarchical Heavy Hitter). Consider
a hierarchical tree where each node n is weighted by An[k,t ]
for timeunit t. Then the set of HHH for timeunit t can be
deﬁned by HHH [θ,t ] ={n|An[k,t ]≥θ} for a threshold θ.
These heavy hitters (i.e., high-volume aggregates) are sus-
picious locations where anomalies (i.e., signiﬁcant spikes)
could happen 5.
In Deﬁnition 1, the count of appearances of any leaf node
will contribute to all its ancestors. Therefore, if we perform
anomaly detection without taking the hierarchy into account,
an anomaly in a leaf node may be reported multiple times
(at each of its ancestors). To address this, one could reduce
the redundancy by removing a heavy hitter node n if its
weight can be inferred from that of heavy hitter node nd
that is a descendant of n. To arrive at this more “compact”
representation, we consider a more strict deﬁnition of HHHs
to ﬁnd nodes whose weight is no less thanθ, after discounting
the weights from descendants that are themselves HHHs .
Deﬁnition 2: (SHHH; Succinct Hierarchical Heavy Hitter).
Consider a hierarchical tree where each node n is associated
with a modiﬁed weight valueWn[k,t ] for timeunit t. For leaf
nodes, the modiﬁed weight Wn[k,t ] is equal to the original
weight An[k,t ]. For non-leaf (internal) nodes, the modiﬁed
weight Wn[k,t ] is the summation of weights of its children
that are themselves not a heavy hitter; In other words, given
the set of SHHHs, denoted by SHHH [θ,t ], the modiﬁed
weight for non-leaf nodes can be derived by
Wn[k,t ] =
∑
m
Wm[k,t ] :m∈child(n)∩m /∈SHHH [θ,t ]
5Intuitively, if an aggregate has very little data in a timeunit, it is unlikely
to see a huge spike there. We expect to capture most anomalies by setting a
sufﬁcient small heavy hitter threshold.
and the succinct hierarchical heavy hitter set is deﬁned by
SHHH [θ,t ] ={n|Wn[k,t ]≥θ}.
Notice that both the set of SHHHs and the modiﬁed
weights are unique, i.e., there can be only one heavy hitter
set satisfying the above recursive deﬁnition 6. An intuitive
explanation is that the question of whether each node joins
the set only depends on the weight of its descendants. It is not
hard to see that a bottom-up traversal on the hierarchy would
give the correct set. We will use this deﬁnition throughout
this paper (for brevity, we will write “heavy hitter” instead
of “succinct hierarchical heavy hitter” hereafter).
To detect anomalous events, we will construct forecasting
models on heavy hitter nodes to detect anomalous events. As
heavy hitter nodes could change over time instances, we need
to construct the time series only for nodes which are heavy
hitters in the most recent timeunit.
Deﬁnition 3: (Time Series). For each timeunit t, consider
a hierarchical tree where each noden is weighted byAn[k,t ].
Given the heavy hitter set in the last timeunit (t = 1 ),
i.e., SHHH [θ, 1], the time series of any heavy hitter node
n ∈ SHHH [θ, 1] is denoted by T [n,t ] = An[k,t ]−∑
mAm[k,t ] : m ∈ child(n)∩ m ∈ SHHH [θ, 1], for
1≤t≤ℓ, where ℓ is the length of time series.
Deﬁnition 4: (Anomaly). Given a time seriesT [n,t ] of any
noden, 1≤t≤ℓ, the forecast trafﬁc of the latest time period
T [n, 1] is given by F [n, 1], derived by some forecasting
model. Then there is an anomalous event happening at node
n in the latest time period iff T [n, 1]/F [n, 1] > RT and
T [n, 1]−F [n, 1] > DT, where RT and DT are sensitivity
thresholds, which are selected by sensitivity test ( §VII). We
consider both absolute and relative differences to minimize
false detections at peak and dip time.
6Suppose that more than one solution exists. Then there must exist one
node n who is in one set SHHH (1) but not in another set SHHH (2).
Then we know W (1)
n ̸=W (2)
n . By deﬁnition, there must exist a node m∈
child(n) where W (1)
m ̸= W (2)
m . Repeating the above procedures, we end
up having a leaf nodep whereW (1)
p ̸=W (2)
p , which violates the deﬁnition
of the modiﬁed weight for leaf nodes.

--- Page 5 ---
IV. TIRESIAS S YSTEM OVERVIEW
We present our system diagram in Fig. 3. For each succes-
sive time period we receive a data list consisting of a set of
newly arrived operational data (Fig. 3(a)).
Step 1: We maintain a sliding time window to group the input
streaming data into “timeunits” based on its time information
ti (Fig. 3(b)). In particular, a time window consists of ℓ units,
each of which is of size ∆. When new data lists arrived, we
simply shift the time instance / window (by a conﬁgurable
offsetς) to keep track of newly available data. For each time
instance / window, we focus on detecting anomalous events in
the last timeunit (the detection period in Fig. 3(b)), while the
data in other timeunits is used as the history for forecasting
(the history period in Fig. 3(b)).
Step 2: Based on the category information ki on the data, we
construct a classiﬁcation tree (Fig. 3(c)), where each category
ki can be bijectively mapping to a leaf node in the tree.
As nodes associated with higher aggregated data counts in
the last timeunit are suspicious places where anomaly could
happen, we ﬁrst detect the heavy hitter set in the classiﬁcation
tree (Fig. 3(c); Deﬁnition 2). Then we construct time series
for these heavy hitters (Deﬁnition 3). We will present efﬁcient
algorithms to achieve these goals (§V).
Step 3: We perform data seasonality analysis (Fig. 3(d)) to
automatically choose seasonal factors. In particular, we apply
fast fourier transform and `a-trous wavelet transform [13] to
identify signiﬁcant seasonal factors ( §VI). The results are
used as the parameters for anomaly detection in the next step.
Step 4: Given the time series and its seasonalities, we apply
time series based anomaly detection (Fig. 3(e); Deﬁnition 4)
on heavy hitter nodes. In particular, we apply the Holt-
Winters’ seasonal forecasting model [14] to detect anoma-
lies (§VI).
Step 5: We report anomalous events to a database. A Web-
based front-end system (Fig. 3(f)) is developed in JavaScript
to allow SQL queries from a text database.
Step 6: As we consider an online problem where the data
arrives in a certain time period, we keep checking if new
incoming data is arrived.
A. Limitations
Naturally, the power of Tiresias is limited by the opera-
tional data we have. We use a customer care call dataset to
illustrate some of the fundamental limitations.
First, Tiresias can only detect network incidents that di-
rectly or indirectly affect customers. For example, Tiresias
cannot detect upticks in memory utilization on aggregate
routers if it has no sensible impact to customers. This will
require a more powerful detector which has access to runtime
memory usage.
Second, it is difﬁcult to verify whether the customer call
cases have been miscategorized. For example, Tiresias cannot
locate an anomaly correctly if a majority of customers provide
incorrect information about their geographical location. To
minimize the human error, well-trained service represen-
tatives will classify the problem based on the predeﬁned
categories. We believe that the selection is much less prone
to error than mining natural language.
Third, Tiresias can only process input data which is drawn
from an additive hierarchy. We limit our focus on hierarchical
domains as it reﬂects the nature of the operational datasets we
had in practice (§II-A). The more general data representation
(e.g., directed acyclic graph) is out scope of this paper and
is left for future work.
Finally, Tiresias cannot detect anomalies where the data
rate abruptly drops, for example, link outages in network
trafﬁc data [15]. We did not consider this particular type
of anomalies because detecting spikes (i.e., unexpectedly
increases) is much more interesting in operational data like
customer care calls.
V. O NLINE HHH D ETECTION AND TIME SERIES
CONSTRUCTION
While we presented our system overview in the previous
section, it is still unclear how to efﬁciently detect the heavy
hitters and construct time series in an online fashion (Step
2 in Fig. 3). To motivate our design, we start by presenting
a strawman proposal STA (§V-A). Since the heavy hitter set
may vary over timeunits, STA reconstructs the time series
for new heavy hitters by traversing each timeunit within the
sliding window of history. This requires to maintain ℓ trees
at any time. Moreover, whenever the sliding window shifts
forward, we need to traverse all of these ℓ trees to construct
a time series for each heavy hitter. This is inefﬁcient in time
and space as the length of the time window ℓ (in terms of
the timeunit size ∆) is usually a large number, resulting in
an inefﬁcient algorithm. While this overhead can be reduced
by increasing ∆, or reducing the amount of history, doing
so also reduces the accuracy of inference. The typical value
of ℓ is 8,064 (a 12-week time window that is long enough
to accurately construct forecasting model, and a 15-minute
timeunits that is short enough to react to operational issues).
To solve this problem, we propose ADA, a novel algorithm
which works by adaptively update the previous time series’
position in the hierarchy (§V-B).
A. A Strawman Proposal STA
1 for time instance t =t1,t 1 + ∆,t 1 + 2∆,... do
2 if (t ==t1) then κ =ℓ; else κ = 1;
3 foreach timeunit 1≤i≤κ do
4 Read any data item within time period [t−i∆,t−i∆ + ∆)
from the input stream to construct a tree Tree [t−i∆] such
that each node in the tree is associated with a count of
appearances; Notice that we use Tree [τ] to represent a tree
constructed by the data within time period (τ,τ + ∆].
5 end
6 Do a bottom-up traversal on Tree [t− ∆] to derive the
SHHH [θ,t− ∆];
7 foreach timeunit 1≤i≤ℓ do
8 Given the ﬁxed heavy hitter set SHHH [θ,t− ∆], do a
bottom-up traversal on Tree [t−i∆] to compute time series
T [n,i ] for each node n∈SHHH [θ,t− ∆];
9 end
10 end
Fig. 4. Strawman Algorithm STA.
We ﬁrst describe a strawman algorithm STA (Fig. 4), which
reuses the same data structure in different time instances,

--- Page 6 ---
i.e., we destroy a tree iff it will not be used in the next
time instance. While in the ﬁrst iteration (i.e., t = t1) we
constructℓ trees, the time spent on the ﬁrst time instance can
be amortized to other time instances where we construct only
one tree. However, the time complexity of STA is dominated
by time series construction (lines 7-9). In particular, for each
time instance we need to traverse ℓ trees to construct a time
series for each heavy hitter.
B. A Low-Complexity Adaptive Scheme
In this section, we propose ADA, an adaptive scheme
that greatly reduces the running time while simultaneously
retaining high accuracy. First, we present the data structure
and the pseudocode ( §V-B1) for ADA. In particular, ADA
maintains only one tree (rather than ℓ trees in STA), and
only those heavy hitter nodes in the tree associated with
a time series. However, the key challenge is that heavy
hitters changes over time – we need efﬁcient operations
(instead of traversing ℓ trees) to derive the time series for
heavy hitters nodes in the current time instance. To this
end, we construct time series by adapting the time series
generated in the previous time instance (§V-B2). For example,
consider a tree with only three nodes: a root node and its
two children. Suppose the root node is a heavy hitter only in
the current time instance, while the two children are heavy
hitters only in the last time instance. In this case, we can
derive the root node’s time series by merging the time series
from its two children. Although the adaptation process is
very intuitive in the above example, the problem becomes
more complicated as tree height increases. We will show the
proposed algorithm always ﬁnds the correct heavy hitter set
(§V-B3). While the positions of heavy hitters are perfectly
correct, the corresponding time series might be biased after
performing the split function. To address this problem, we
will present two heuristics ( §V-B4–§V-B5) to improve the
accuracy.
Without loss of generality we assume that the time instance
will keep increasing by a constant ς≤ ∆, where ∆ is the
timeunit size. We can always map the problem with time
increment ς > ∆ to another equivalent problem with using
a smaller time increment ς′ ≤ ∆ such that ς′ is a divisor
of ς. For simplicity, we describe our algorithm by assuming
ς = ∆. We further propose a recursive procedure to consider
any ς≤ ∆ where ς is a divisor of ∆ (§V-B6).

1. Data structure and Pseudocode: We maintain a tree-
based data structure as follows. Each node n in the tree is
associated with a type ﬁeld n.type. Fields n.child[i] and
n.parent point to the i-th child and parent of the node,
n.depth represents the depth of the node, and n.weight
maintains the modiﬁed weight of the node (after discounting
the weight from other descendants that are themselves heavy
hitters; Deﬁnition 2). Array n.actual stores the time series of
the modiﬁed weights for the node n, and Array n.forecast
stores the time series of the forecasted values for the node n.
Now we describe the core algorithm of ADA (Fig. 5). We
maintain a tree structureTree and a set of heavy hitter nodes,
denoted by SHHH over time instances. For the ﬁrst time
1 for time instance t =t1,t 1 + ∆,t 1 + 2∆,... do
2 if (t ==t1) then
3 Perform the same operations as lines 2-9 in STA. This gives
us a tree Tree and a heavy hitter set SHHH ; We set
n.ishh by true if n∈SHHH . Otherwise, we set n.ishh
by false. Each heavy hitter node n∈SHHH also has a
time series of actual values n.actual and a time series of
forecast values n.forecast ;
4 continue;
5 end
6 foreach node n∈Tree do
7 n.washh← n.ishh; n.weight← 0; n.tosplit← 0;
8 end
9 foreach streaming item (key,time ) such that
t− ∆≤time<t do
10 Find the node n such that n.type ==key. Increase
n.weight by 1;
11 end
12 Update-Ishh-and-Weight(nroot); // Update n.ishh and n.weight
13 foreach node n∈Tree (bottom-up level order traversal) do
14 if (n.ishh∨n.tosplit∧n /∈SHHH ) then
15 n.parent.tosplit←true;
16 end
17 end
18 foreach node n∈Tree (top-down level order traversal) do
19 if ((n∈SHHH∨n.depth == 1)∧n.tosplit) then
SPLIT(n);
20 end
21 foreach node n∈Tree (bottom-up level order traversal) do
22 if (n∈SHHH∧¬n.ishh) then MERGE(n);
23 end
24 if (nroot.weight<θ ) then SHHH ←SHHH\nroot;
25 else SHHH ←SHHH∪nroot;
26 foreach node n∈SHHH do
27 Append n.weight to n.actual; Remove the ﬁrst element
from n.actual and that from n.forecast ;
28 Derive the newest forecast value and append it to
n.forecast ;
29 end
30 end
Fig. 5. Core Algorithm of ADA. This algorithm calls three functions:
Update-Ishh-and-Weight (Fig. 6), SPLIT (Fig. 7) and MERGE (Fig. 8).
int Update-Ishh-and-Weight(node n)
1 1foreach node nc =n.child do
2 2 n.weight←n.weight + Update-Ishh-and-Weight(nc);
3 3if (n.weight≥θ) then
4 4 n.ishh← 1; return 0;
5 5else
6 6 n.ishh← 0; return n.weight;
Fig. 6. Updating ﬁelds n.ishh andn.weight. This function recursively
updates n.ishh and n.weight in a bottom-up fashion.
SPLIT(node n)
1 1Cn←{nc|nc∈n.children[·],nc /∈SHHH};
2 2if (∃nc∈Cn s.t. nc.weight≥θ) then
3 3 foreach node nc∈Cn do
4 4 Split the time series from n to nc with a scale ratio of
F (nc,Cn); (The function F (·) is deﬁned in §V-B4)
5 5 Clear n.weight;
6 6 SHHH ← (SHHH∪Cn)\{n};
Fig. 7. Splitting time series to children.
MERGE(node n)
1 1if (n.weight<θ ) then
2 2 np←n.parent; Cn←{nc|nc∈
{np}∪ np.children[·],nc∈SHHH,n c.weight<θ };
3 3 np.weight← ∑
nc∈Cnnc.weight;
4 4 SHHH ← (SHHH\Cn)∪{np};
5 5 Merge the time series from every nc∈Cn to n;
Fig. 8. Merging time series to parent.

--- Page 7 ---
instance (lines 2-5), ADA performs the same operations as
STA. However, starting from the second time instance (lines
6-29), ADA consists of the following three stages.
Initialization (lines 6-12): We reset variables n.washh,
n.ishh, and n.weight. Subsequently, we recursively call a
function Update-Ishh-and-Weight(n) (Fig. 6) to calculate the
n.ishh and n.weight according to the Deﬁnition 2.
SHHH and Time Series Adaptations (lines 13-25): Unlike
STA, where we explicitly update SHHH using a bottom-
up traversal, in this stage we present a novel way to derive
the set of SHHH. We ﬁrst perform an inverse level order
traversal (bottom-up) to check which node should “split” its
time series to the children ( n.tosplit). Then we perform a
top-down level order traversal to split (§V-B2) the time series
of any node n with n.tosplit to its children. We then do a
bottom-up level order traversal to check if we should “merge”
(§V-B2) the time series from some neighboring nodes to the
parent. Throughout these split and merge operations, we keep
updatingSHHH so that any noden∈SHHH iffn has time
series n.actual and n.forecast (except for the root node).
Finally, we simply add/remove the root node to/fromSHHH
based on its weight. We will show that SHHH satisﬁes the
Deﬁnition 2 after performing this stage ( §V-B3).
Time Series Update (lines 26-29). We update the time series
for each heavy hitter node in SHHH . Unlike STA, the time
series can be updated in constant time.
2) Split and Merge: This section presents two functions,
split and merge, to adapt the position of heavy hitter nodes.
Before the adaptation, heavy hitter nodes are placed in the
location given in the previous timeunit. The goal is to move
these heavy hitter nodes (with the binding time series and
forecast) to their new positions according to the data in the
current timeunit, to satisfy the Deﬁnition 2.
We leverage a SPLIT(n) function (Fig. 7) to linearly
decompose the time series from node n into its non-heavy-
hitter children. In other words, a heavy hitter node n will
be split into one or more heavy hitters in the lower level. In
this function, we ﬁrst check if there exists any child node
nc /∈SHHH with weight≥θ. If so, we split the time series
ofn with a scale ratio ofF (nc,Cn) for each non-heavy-hitter
childnc to approximate the time series of its children. We will
discuss different heuristics to estimate scale ratio F (nc,Cn)
(§V-B4).
We present a MERGE(n) function (Fig. 8) to combine the
time series from one or more lower level nodes to a higher
level node. In this function, we ﬁrst check if the weight of the
node n is smaller than θ. If so, we merge the time series of
n and its siblings and parent who meet the same requirement
as n.
3) Correctness of Heavy Hitter Set: It sufﬁces to show
that Tiresias always selects the correct heavy hitter set after
performing the stage “SHHH and Time Series Adaptation”
(lines 13-21), i.e., Deﬁnition 2 will hold. The high-level
intuition is that top-down split operations ensure that there is
no heavy hitter hidden in the lower levels, while bottom-up
merge operations ensure all non-heavy-hitter nodes propagate
the weight to its heavy hitter ancestor correctly. The proof is
given by Lemma 1.
Lemma 1: For each time instance, after the adaptations we
haven.ishh iffn∈SHHH for any node n∈Tree .
Proof: We prove by induction on time instance. It is
clear the argument will hold for the ﬁrst time instance as
there is no adaptation. Now we show the proof will hold
for any time instance. For the “if” direction, suppose (by
contradiction) there exists a node n ∈ SHHH such that
n.ishh is false . Then we have n.weight < θbecause the
function Update-Ishh-and-Weight() (Fig. 6) enforces n.ishh
iffn.weight≥θ. Then by the merge rules (line 22 in Fig. 5
and line 1 in Fig. 8), node n will be merged to its parent so
we have n /∈ SHHH . The only exception is the root node
nroot which has no parent to merge. However, we check this
special case (lines 24-25 in Fig. 5) to enforce nroot.ishh iff
nroot∈SHHH .
For the “only if” direction, suppose (by contradiction) there
exists a node n such that n.ishh is true and n /∈ SHHH .
Similarly, we have n.weight≥ θ. Because n.ishh is true,
n.parent.tosplit is also true (by lines 13-17 in Fig. 5). We
consider the following two cases. (i)n.parent.washh is true.
In this case, by the induction hypothesis we know n.parent
was in SHHH before any adaptation in this time instance,
and therefore n.parent will split its time series to n (line
15 in Fig. 5 and line 2 in Fig. 7). If n has no child, then
we have n∈SHHH . Otherwise, if n splits its time series,
there must exists a child nc such thatnc.weight<θ . If there
does not exist such a child nc, then we have n.weight = 0
which contradicts our previous inference n.weight≥θ> 0.
Because we have nc.weight < θ, by the merge rules (line
22 in Fig. 5 and line 1 in Fig. 8) nc will merge back the
time series to n. Therefore, we have n∈ SHHH after the
adaptation stage. If the time series of nc is further split into
some children, similarly, there much exists a child nc′ of nc
such that nc′.weight≤nc.weight<θ . Then nc′ will merge
its time series tonc, and thennc will merge back ton. It is not
hard to see we can apply this argument multiple times to make
sure that n∈ SHHH after the adaptation stage. Consider
another case (ii) n.parent.washh is false. Then we have
n.parent /∈ SHHH before the adaptation stage. Because
n /∈SHHH , we have n.parent.weight≥n.weight≥θ. If
n.parent.parent.washh is true, then n.parent.parent will
split its time series to n.parent, and then n.parent will
split its time series to n such that n∈ SHHH after the
adaptation. Otherwise, if n.parent.parent.washh is false,
we can repeatedly apply the above argument, and ﬁnally we
have nroot.weight ≥ θ and¬nroot.washh. Therefore, nroot
was not in SHHH before the any adaptation in this time
instance, and this violates the our enforcement on root node
(lines 24-25 in Fig. 5) in the previous time instance. This
implies the induction hypothesis is false, and we reach the
contradiction. □
4) Split Rules and Error Estimation: Recall that in
SPLIT(n) function (Fig. 7), we split the time series from node
n to each non-heavy-hitter childrennc∈Cn with a scale ratio

--- Page 8 ---
0.001
 0.01
 0.1
 1
 1  2  3  4  5  6  7  8  9  10
Relative error RE[t+k]
[log scale]
iteration k
ξ =2F[t]
ξ =F[t]
ξ =0.5F[t]
Fig. 9. Relative error RE[t +k] after k iterations. (y-axis is log10 scale;
α = 0.5; T [i] = 1)
of F (nc,Cn), where Cn = {nc|nc ∈ n.children[·],nc /∈
SHHH}. The scale ratio is derived by F (nc,Cn) =
Xnc/∑
∀m∈CnXm, where Xn is a weight-related property
of node n. Below we consider four split rules for deriving
the scale ratio.
Uniform: each element in the time series of n is uni-
formly split to all its children nc /∈SHHH , i.e., Xn = 1.
Last-Time-Unit: we assign Xn by the weight of node
n in the previous timeunit. This assumes the weight is similar
in the current timeunit and the previous one.
Long-Term-History: we assign Xn by the total
weight seen by the node across all previous timeunits.
EWMA: The Last-Time-Unit only captures the distribu-
tion in the last timeunit, while the Long-Term-History
treats past observations equally. This heuristic takes a dif-
ferent approach – the Xn is assigned by an exponentially
smoothed weight.
We next discuss the estimation error of the “split” operation
over time. For simplicity, we illustrate this by considering a
EWMA-based forecast modelF [t] =αT [i−1]+(1−α)F [t−
1], whereT [t] is the actual time series. Suppose we did a split
for any time seriesT at timet. Also, suppose the forecastF [t]
is biased by ξ, i.e., the estimated forecast FE[t] = F [t] +ξ.
Then after k iterations, the estimated forecast can be derived
by
FE[t +k] = α



k∑
j=1
(1−α)j−1T [t +k−j]



+(1−α)k−1(F [t] +ξ) (1)
for any k> 0. Then we have relative error
RE[t +k] = |FE[t +k]−F [t +k]|
F [t +k] (2)
As the proposed algorithm derives the forecast value in a re-
cursive way, the inaccuracy will remain in the future forecast.
However, the forecast error will exponentially decrease over
time because of the exponential smoothing, and this is evident
in Figure 9.
5) Reference Time Series: To further reduce the time series
errors induced by the split operations, we propose a simple
add-on to ADA by adding a set of reference time series .
Consider a noden with categoryk in the hierarchical domain,
the reference time series are time series of its unmodiﬁed
weightAn[k,t ] (instead of Wn[k,t ] which discounts weights
from heavy hitter descendants) and the time series of its
forecast values. Now we illustrate how to use the reference
time series to reduce the estimation error induced by the
split operations. Suppose a node n splits the time series
into its children using a split rule. As split operations can
be inaccurate, we assume that a child node nc received
a “biased” time series T [nc,i ], 1 ≤ i ≤ ℓ. If nc has a
reference time series TREF[nc,i ], we will replace the T [nc,i ]
by TREF[nc,i ]−∑
n⋆∈N ⋆T [n⋆,i ], 1≤ i≤ ℓ, where N⋆ is
the set of nc’s heavy hitter descendants, i.e.,N⋆ ={n⋆|n⋆∈
SHHH ∧ n⋆∈desc(nc)}. We maintain the reference time
series only for nodes in the top h levels in the hierarchy, and
the memory and detection accuracy tradeoffs are discussed
(§VII-A)
6) Multiple Time Scales: We now show that ADA can
support any case where ∆ is a multiple of ς by generalizing
ADA to support multiple time scales: consider a vector of η
time scales where the i-th time scale is λi−1∆, 1≤ i≤ η
for any two given positive integers λ and η.
To this end, we need to maintain time series in mul-
tiple time scales. We use two-dimension dynamic arrays
(i.e., vector< vector >) for ﬁelds n.actual and
n.forecast , where the ﬁrst dimension represents time scales.
Recall that we append the new value to the tail of time
series in the single time scale case (line 27 in Fig. 5). To
consider multiple timescales, we deﬁned a recursive function
UPDATE TS(n,w,i) to append a new value w to the time
series of noden for thei-th time scale (Fig. 10). In particular,
when the size of any time series in the i-th time scale is a
multiple of λ, we sum up the last λ elements and recursively
update the weight to the ( i + 1)-th time scale. It is simple
to see that UPDATE TS(n,w,i) will be called for every λi
timeunits, for 1 ≤ i ≤ η. Then for κ timeunits, we will
call UPDATE TS(·) ∑η
i=1κ/λi≤ 2κ times. Therefore, the
update operation remains Θ(1) amortized time for each time
instance.
With multiple time scales, it sufﬁces to show that ADA
can support any case where ∆ is a multiple of ς. Consider a
problemPA with parameters ∆A andςA. It is not hard to see
thatPA is equivalent to another problem PB with parameters
∆B =ςB =ςA by assigning λB = ∆A/ςA and ηB = 1.
UPDATE TS(node n, int w, int i)
1 1n.forecast[i].push back(α×w + (1−α)×n.forecast[i].last());
2 2n.actual[i].push back(w);
3 3s←n.actual[i].size();
4 4if (i<η ∧ s = 0 (mod λ)) then
5 5 w′← ∑
1≤j≤λn.actual[i][s−j];
6 6 UPDATE TS(n, w′, i + 1);
7 7 if (s =ℓ +λ) then
8 8 Do n.actual[i].pop head() λ times.
Fig. 10. Update time series in multiple time scales.
VI. T IME SERIES ANALYSIS
To study the seasonality, we apply Fast Fourier Transform
(FFT) to obtain the count of appearances in frequency spec-
trum (Fig. 11). We observe that the most signiﬁcant period

--- Page 9 ---
1e-06 1e-05 0.0001 0.001 0.01 0.1 1
 12 24  83  170  200
FFT
Period (hours)
(a)
 1e-06 1e-05 0.0001 0.001 0.01 0.1 1
 12 24  200
FFT
Period (hours) (b)
Fig. 11. The Fast Fourier Transform for the datasets (a) CCD and (b) SCD. The log-scale y axis is normalized by the maximal magnitude.
is 24 hours (i.e., day period) for both datasets, while 170
hours (i.e., the most measurable time to the weekly period)
is also noticeable in CCD. To validate this, we also perform
the `a-trous wavelet transform [13] to convert the time series
of our datasets to “smoothed” approximations at different
timescales. To avoid phase shifting, we use the low-pass B3
spline ﬁlter ( 1
16, 1
4, 3
8, 1
4, 1
16) as in previous work done on time
series smoothing [16]. Given the approximated time series
cj(t) at timescale j, the detail of c(t) at timescale t can be
derived by dj(t) =cj−1(t)−cj(t). Then we have the energy
of the detail signal dj(t) = ∑
∀tdj(t), which indicates the
strength of the ﬂuctuations at timescale j. For both datasets,
we apply this to multiple timescales (ranging from 5 seconds
to 4 weeks), and the signiﬁcant periodicities we found are
consistent with that given by FFT. The results clearly suggest
using time series model with multiple seasonalities for CCD.
We found that the periodicities of operational datasets we
had are fairly stable across time. Therefore, in our current
implementation we perform the data seasonality analysis in
an ofﬂine fashion, i.e., only in the ﬁrst time instance.
To distinguish anomalous behavior, we characterize typ-
ical behavior by applying the forecasting model on time
series. As we observed strong periodicities in the datasets,
simple forecasting models like exponential weighted moving
average (EWMA) [17] will be very inaccurate. To address
this, we adopt the additive Holt-Winters’ seasonal forecasting
model [14], which decouples a time series T [t] into three
factors: level L[t], trend B[t] and seasonal S[t]:
L[t] = α(T [t]−S[t−υ]) + (1−α)(L[t− 1] +B[t− 1])
B[t] = β(L[t]−L[t− 1]) + (1−β)(B[t− 1])
S[t] = γ(T [t]−L[t]) + (1−γ)(S[t−υ])
where the season length is denoted by υ. Then the forecast
G[t] is simply adding up these three factors, i.e., G[t] =
L[t−1]+B[t−1]+S[t−υ]. To initialize the seasonality, we
assume there are at least two seasonal cycles T [t− 1],T [t−
2],...,T [t− 2υ]. The starting values L[t− 1],B [t− 1] and
S[t− 1],...,S [t− 2υ] can be derived by
L[t− 1] = 1
2υ
t−2υ∑
j=t−1
T [j]
B[t− 1] = 1
2υ




υ∑
j=t−1
T [j]

−


2υ∑
j=t−υ−1
T [j]




S[t−j] = T [t−j]−L[t− 1],j = 1,..., 2υ
The use of Holt-Winters’ seasonal model does not com-
promise the update cost. Given the factors in the previous
timeunits, the forecast can be computed in constant time.
Moreover, we choose the additive Holt-Winters’ seasonal
model because of its linearity – there is no need to recalculate
the forecast value after merge / split.
Lemma 2: (Holt-Winter Linearity). Given k Holt-Winter
forecasts G1[t],G 2[t],Gk[t], where Gi[t] =L[t− 1] +B[t−
1]+S[t−υ]. Consider a time seriesT∗[t] =∑k
i=1Ti[t] and its
Holt-Winter forecastG∗[t] =L∗[t−1]+B∗[t−1]+S∗[t−υ].
Then G∗[t] =∑k
i=1Gi[t].
Proof: We prove L∗[t] = ∑k
i=1Li[t], B∗[t] =∑k
i=1Bi[t] and S∗[t] = ∑k
i=1Si[t] by induction on t. For
the initialization, we have
L∗[t− 1] = 1
2υ
t−2υ∑
j=t−1
T∗[j]
= 1
2υ
t−2υ∑
j=t−1
k∑
i=1
Ti[j]
=
k∑
i=1

 1
2υ
t−2υ∑
j=t−1
Ti[j]


=
k∑
i=1
Li[t− 1] (3)
B∗[t− 1] = 1
2υ




υ∑
j=t−1
T∗[j]

−


2υ∑
j=t−υ−1
T∗[j]




= 1
2υ




υ∑
j=t−1
k∑
i=1
Ti[j]


−


2υ∑
j=t−υ−1
k∑
i=1
Ti[j]




=
k∑
i=1



1
2υ




υ∑
j=t−1
Ti[j]


−


2υ∑
j=t−υ−1
Ti[j]







=
k∑
i=1
Bi[t− 1] (4)

# --- Page 10 ---
For j = 1,..., 2υ, we have
S∗[t−j] = T∗[t−j]−L∗[t− 1]

# ( k∑
i=1
Ti[t−j]
)
−
( k∑
i=1
Li[t− 1]
)

# k∑
i=1
(Ti[t−j]−Li[t− 1])

k∑
i=1
S[t−j] (5)
Then we have following induction hypothesis for j = t−
1,t− 2,...,t − 2υ.
L∗[j] =
k∑
i=1
Li[j] (6)
B∗[j] =
k∑
i=1
Bi[j] (7)
S∗[j] =
k∑
i=1
Si[j] (8)
Given the induction hypothesis, now we prove the theorem
would hold when j =t.
L∗[t] = α(T∗[t]−S∗[t−υ])
+(1−α)(L∗[t− 1] +B∗[t− 1])
= α
[( k∑
i=1
Ti[t]
)
−
( k∑
i=1
Si[t−υ]
)]

- (1−α)
×
[( k∑
i=1
Li[t− 1]
)
- 

# ( k∑
i=1
Bi[t− 1]
)]

k∑
i=1
{α (Ti[t]−Si[t−υ])

- # (1−α) (Li[t− 1] +Bi[t− 1])}
  # k∑
  i=1
  Li[t] (9)
  S∗[t] = γ(T∗[t]−L∗[t]) + (1−γ)(S∗[t−υ])
  = γ
  [( k∑
  i=1
  Ti[t]
  )
  −
  ( k∑
  i=1
  Li[t]
  )]
  +(1−γ)
  ( k∑
  i=1
  Si[t−υ]
  )
  (by (8), (9))
  # k∑
  i=1
  {γ(Ti[t]−Li[t]) + (1−γ)(Si[t−υ])}
  k∑
  i=1
  Si[t] (10)
  VII. E VALUATION
  To evaluate the performance of our algorithms, we build
  a C++ implementation of Tiresias, including ADA and
  STA. All our experimental results were conducted using a
  single core on a Solaris cluster with 2.4GHz processors. In
  our evaluation, we ﬁrst study Tiresias’s system performance
  (§VII-A). Comparing it with the strawman proposal STA,
  the adaptive algorithm ADA provides (i) lower running time
  (by a factor of 14.2), (ii) lower memory requirement (by
  a factor of 2), (iii) time series with < 1% absolute error,
  and (iv) identiﬁed anomalies with 99.7% accuracy. We then
  compare Tiresias with a current best practice used by an ISP
  operational team (§VII-B). Tiresias not only detects >94% of
  the anomalies found by the reference method but also many
  previously unknown anomalies hidden in the lower levels.
  System parameters: For SCD, we use the Holt-Winters’
  seasonal model with single seasonal factorSday[t]. To capture
  both diurnal and weekly patterns observed in CCD, we
  consider two seasonal factors Sday[t] and Sweek[t] for CCD.
  To incorporate these two seasonal factors in the Holt-Winters’
  model, we linearly combine the factors, i.e., the seasonal
  factor is deﬁned as S = ξSday[t] + (1− ξ)Sweek[t]. We
  choose the weight ξ =FFT day/FFT week = 0.76 according
  to the measured magnitude FFT t of frequency 1/t. To ﬁnd
  the other parameters for the Holt-Winters’ forecasting model,
  we measure the mean squared error of the forecast values
  (∝ ∑(actual− forecast )2) to choose the parameters in
  an ofﬂine fashion. The parameters with the minimal mean
  squared error are chosen for the evaluation throughout this
  section. We choose a small heavy hitter threshold θ, which
  gives us around 125 (5) heavy hitters in the “busy” (“quiet”)
  period in CCD, and 500 heavy hitters in SCD. We perform a
  sensitivity test and chose sensitivity thresholds RT = 2.8 and
  DT = 8, which gave reasonable performance in comparison
  with the reference method (§VII-B).
  A. System Performance
  We ﬁrst evaluate the performance of Tiresias using algo-
  rithms ADA and STA. We then present the results for CCD,
  and we summarize the results from SCD.
  Computational Time: We use Long-Term-History as
  a representative heuristic as we observed very similar running
  time for these heuristics. In Table III, we summarize the
  running time of Tiresias using CCD in May 2010. We observe
  that ADA with 15-minute (1-hour) timeunits reduces the over-
  all running time by a factor of 14.2 (5.4) as compared with
  STA. If we subtract the running time for reading traces (which
  is arguably necessary for any algorithm), we observed a factor
  of 49.5 (41.3) improvement. To better understand why ADA
  has a better running time, we divide the program into four
  stages: Reading Traces, Updating Hierarchies, Creating Time
  Series and Detecting Anomalies. Among these stages, we
  observed that Creating Time Series is clearly a bottleneck
  in STA, which contributes 83.1% (93.9%) time of the total
  time of all stages for timeunits of size 15-minute ( 1-hour).
  As the time complexity of this stage for STA is proportional

--- Page 11 ---
TABLE III
SUMMARY OF TOTAL RUNNING TIME OF TIRESIAS IN MINUTES WITH DIFFERENT ALGORITHMS . T HE RUNNING TIME FOR ADA IS 5-14 TIMES LESS
THAN THAT FOR ADA. T HE GAP INCREASES WITH THE DECREASE OF TIMEUNIT SIZE .
Timeunit size ( ∆) in minutes 15 60
Algorithm ADA STA ADA STA
Reading Traces Mean 18.6 (74.0%) 19.592 (5.4%) 19.096 (89.0%) 18.885 (16.2%)
Variance 12.493 11.493 15.802 12.801
Updating Hierarchies Mean 4.762 (18.9%) 0.198 (0.1%) 1.699 (7.9%) 0.273 (0.2%)
Variance 1.082 0.082 0.287 0.116
Creating Time Series Mean 339.216 (93.9%) 96.943 (83.1%)
Variance 83.114 86.518
Detecting Anomalies Mean 1.785 (7.1%) 2.232 (0.6%) 0.67 (3.1%) 0.546 (0.5%)
Variance 0.912 2.311 0.373 0.483
Sum 25.507 (100.0%) 361.238 (100.0%) 21.465 (100.0%) 116.647 (100.0%)
to ℓ, we expect the running time of this stage would be
inversely proportional to the timeunit size 7. Fortunately, we
also observe that the “per timeunit” running time of this stage
with 15-minute timeunits is slightly smaller (with a factor of
0.87) than that with 1-hour time units. This is because the
trace we used is sparse, and therefore we have a smaller tree
size when using smaller timeunits.
Memory Requirement: We evaluate memory costs for ADA
(again, different split rules have very similar memory costs)
and STA (Table IV). To eliminate cold-start effects, we focus
on measuring space costs after a long run. We observe the
memory cost of ADA is ≈36% of that of STA. We maintain
the reference time series for any node in the top h levels in
the hierarchy (the root level is not included). With two levels
of reference nodes, the memory cost of ADA is only ≈43%
of that of STA.
TABLE IV
NORMALIZED MEMORY COSTS OF TIRESIAS WITH DIFFERENT
ALGORITHMS . (N ORMALIZED MEMORY COST = TOTAL MEMORY COST /
AVERAGE NUMBER OF NODES IN THE TREE / THE MEMORY COST OF
EACH NODE .)
Algorithm # ref. Normalized
levels (h) Space
STA N/A 744.3
ADA
0 271.1
1 280.2
2 322.6
Time Series Accuracy: As the split operations might in-
troduce inaccuracy, we next examine how much distortion of
time series we have. We conduct the experiment by leveraging
the results generated by STA as the ground truth. In particular,
for each timeunit t in any time series T [t], the absolute error
is derived by |TADA[t]− TSTA [t]|. We ﬁrst consider the
impact of adding reference time series (Fig. 12). We observe
the use of the reference time series signiﬁcantly reduces the
error rate. Consider Tiresias with reference time series for
nodes in the top h = 1 , 2, 3 and 4 levels, we have 61,
322, 1,926 and 45,479 reference time series, respectively.
We observe that a large number of reference time series is
not necessary as two layers of reference time series ( h = 2)
already gives us a very accurate time series estimation (∼1%
error in Fig. 12). Forh = 2, we maintain reference time series
for only 322/45,479≈0.7% of total nodes. Moreover, we
compare the accuracy for different split rules. We observe that
7For a time series with ﬁxed length, we have ℓ = 1/∆.
0.25 %
1 %
4 %
16 %
64 %
-40 -30 -20 -10  0
Mean absolute
error [log4 scale]
Time unit
Long-T erm-History; h=0
Long-T erm-History; h=1
Long-T erm-History; h=2
EWMA α=0.8; h=2
EWMA α=0.4; h=2
Last-Time-Unit; h=2
Uniform; h=2
(a)
0.25 %
1 %
4 %
16 %
 0  1  2  3  4
Mean absolute
error [log4 scale]
Depth in hierarchy
Long-T erm-History; h=2
EWMA α=0.8; h=2
EWMA α=0.4; h=2
Last-Time-Unit; h=2
Uniform; h=2
(b)
Fig. 12. The absolute error of time series for different heuristics versus (a)
timeunits and (b) depths. The error is averaged over different timeunits in
the time series and over the time series of heavy hitters. The reference time
series are not included. The timeunit 0 is the most recent time for any time
instance. We use h andα to denote the number of reference levels ( §V-B5)
and the smoothing rate of EWMA, respectively.
only Long-Term-History has slightly better accuracy,
while the accuracy results of the other heuristics are fairly
close. Besides, we observe the accuracy is very stable over
different timeunits. While for brevity we did not present the
accuracy results for every timeunit in the ﬁgure, we observe
very similar results for older timeunits.
Anomaly Detection Accuracy: We observed the heavy hitter
set detected by ADA is the same as the real heavy hitter set
across time. To quantify the inaccuracy introduced by the
split operation, we compare the anomalies detected by ADA
and STA. We use STA as the ground truth as it reconstructs
accurate time series for each time instance. In Table V, we
summarize the accuracy metrics for different heuristics of
ADA. The results are collected across 100 time instances
between May 16-21, 2010. Overall, we found that ADA was
able to detect anomalies with an accuracy of 99.7% against
STA. However, there are some tradeoffs between split rules.
We observe that EWMA (with rate α = 0.4) has the highest
precision, while Uniform has the best result on sensitivity.
We also observe Long-Term-History has good results
on all metrics under investigation.
Results for SCD: Compared with CCD, it takes longer
running time (with a factor of 3) for reading traces from
SCD. Because of this, we observe the overall running time
of ADA for SCD is slightly increased (with a factor of

--- Page 12 ---
TABLE V
ANOMALY DETECTION ACCURACY OF ALGORITHM ADA. W E USE h TO
DENOTE THE NUMBER OF REFERENCE LEVELS .
Split rule h Accuracy Precision Recall
Long-Term-History
0 97.2% 37.8% 41.8%
1 98.6% 78.6% 49.3%
2 99.6% 94.4% 88.1%
EWMA (rate = 0.8) 2 99.6% 96.5% 82.8%
EWMA (rate = 0.6) 2 99.6% 96.6% 84.3%
EWMA (rate = 0.4) 2 99.7% 96.7% 87.3%
Last-Time-Unit 2 99.6% 96.5% 82.8%
Uniform 2 99.3% 79.2% 94.0%
TABLE VI
A COMPARISON OF ADA AGAINST THE REFERENCE METHOD
Performance metric Value
Type 1 (Accuracy) = #TPs+#TNs
#Cases 94.1%
Type 2 = #TPs
#TPs+#MAs 90.9%
Type 3 = #TNs
#TNs+#NAs 94.1%
1.3). However, the overall running time of STA for SCD
is greatly increased by a factor of 7.4. In particular, the
running time for Creating Time Series is increased by a factor
of 6.4 because of the increase in the size of the hierarchy.
Besides, we also observe an increased memory consumption
for both ADA and STA in a factor of 2 because of the larger
hierarchical space. However, with h = 0 (h = 1 ) level of
reference nodes, the memory requirement of ADA is 43%
(46%) of that of STA. For the time series accuracy of ADA,
we observed an average absolute error of only 0.8% with
h = 1. The primary reason of high accuracy for SCD is that
the split operations are performed less frequently because of
the smaller variance of the number of cases over time in SCD
(Fig. 1(c)). Consequently, we observe a very good accuracy
of anomaly detection for SCD. In particular, we have no false
positives and very few false negatives (in only about 0.13%
of all negative cases with h = 1).
B. Comparison with Current Practice
To evaluate the performance of Tiresias in identifying
live network problems, we compared the set of anomalies
detected by our methods from CCD with a set of reference
anomalies identiﬁed using an existing approach based on
applying control charts to time series of aggregates at the ﬁrst
network level (the VHO level). This existing approach is not
scaled to lower levels and is currently used by an operational
team of a major US broadband provider.
For the purposes of this study we treat the reference
anomalies as the ground truth against which we evaluate
the performance of our method. Unfortunately, the reference
anomaly set is not complete – it only looks at the anomalies
that happened in the ﬁrst network level (VHO). Because of
this, we cannot simply use the standard terms {True|False}
{Positive|Negative} in describing the anomalies found by
our method relative to the reference set. To undertake the
comparison, we deﬁne the following comparison metrics. Let
AOP and ATiresias denote the set of reference anomalies
and those found by Tiresias, respectively. Clearly, each
anomaly a can be one-to-one mapping to a certain network
location L(a) and timeunit T (a). In particular, for each
anomaly aOP ∈ AOP , we have a true alarm (TA) case
if there exists an anomaly aTiresias ∈ ATiresias such
that T (aOP ) = T (aTiresias ) and L(aOP )⊒ L(aTiresias ),
where L1 ⊒ L2 iff L1 is equal to or an ancestor of
L2. In this case, Tiresias is able to locate the anomaly
with ﬁner granularity. For each anomaly in AOP , we
have a missed anomaly (MA) case if there does not exist
any anomaly satisfying the above requirement. Moreover,
let AI
Tiresias ⊂ ATiresias denote the set of Tiresias’s
anomalies which is not related to any anomaly aOP∈AOP .
Speciﬁcally, AI
Tiresias =G(ATiresias,AOP ) = ATiresias   
{aTiresias∈ATiresias|∃aOP∈AOP,T (aOP ) =T (aTiresias ),
L(aOP )⊒L(aTiresias )}. We say there is a new
anomaly (NA) case for each element in AI
Tiresias . Let
ˆATiresias denote the set of heavy hitters which are not
reported as anomalies by Tiresias. For each element in
ˆaTiresias∈ ˆATiresias , we have a true negative (TN) case if
ˆaTiresias is unrelated to any anomaly in AOP . In particular,
the set of TN cases is deﬁned by G( ˆATiresias,AOP ), where
the functionG(·) is deﬁned in the NA case.
We compare the reported anomalies using CCD in the
period of 14−24th, September 2010. In Table VI, we observe
that ADA effectively detects most of the anomalies found by
the reference method with an accuracy of 94%, i.e., we have
a large number of true alarms and true negatives, while the
number of missed anomaly is very small.
Furthermore, the results suggest that Tiresias is promis-
ing to ﬁnd previous unknown anomalies. This is likely
attributable to the fact that Tiresias is able to adapt heavy
hitter positions to detect anomalies below the ﬁrst level,
whereas the reference method is only able to trace the ﬁrst
network level nodes. We perform a simple data aggregation
of the NAs to remove any redundant anomalies which are
an ancestor of other anomalies. The fraction of the resulting
cases in the (VHO, IO, CO, DSLAM) level is ( 5%, 56.3%,
29.3%, 9.4%). The majority (95%) of NA cases are localized
below the VHO level; These are inherently harder to detect
with the reference dataset due to their VHO-level aggregation
with non-anomalous call loads.
VIII. R ELATED WORK
Given the increasing severity of DoS, scanning, and other
malicious trafﬁc, trafﬁc anomaly detection in large networks
is gaining increased attention. To address this, several works
detect statistical variations in trafﬁc matrices constructed us-
ing summarizations of trafﬁc feature distributions [18], [19].
Statistical methods used in these works include sketch-based
approach [20], ARIMA modeling [21], Kalman ﬁlter [22]
and wavelet-based methods [23]. ASTUTE [15] was recently
proposed to achieve high detection accuracy for correlated
anomalous ﬂows. Lakhina et al. [8], [9] showed that Principal
Component Analysis (PCA) can improve scaling by reduc-
ing the dimensionality over which these statistical methods
operate. Huang et al. [24] proposed a novel approximation
scheme for PCA which greatly reduce the communication
overheads in a distributed monitoring setting. More recently,
Xu et al. [25] also applied PCA to mine abnormal feature
vectors in console logs. However, it is unclear how to

--- Page 13 ---
transform hierarchical domain in operational data to multiple
dimensions for PCA. While entropy of data distribution might
be a useful measure as suggested in previous studies [9], [26],
Ringberg et al. [27] showed that the choice of aggregation
can signiﬁcantly impact the detection accuracy of PCA.
There are several works on hierarchical heavy hitter detec-
tion [28], [7], [29], [11]. Among these, our earlier work [11]
on hierarchical heavy hitter detection is the closest in spirit to
Tiresias. However, HHD assumes cash-register model [30],
where the input stream elements cannot be deleted [28].
Therefore, HHD is more useful to detect long-term heavy
hitters over a coarser time granularity. To detect heavy hitters
on the most recent time period, our strawman proposal STA
can be seen as a nature extension of HHD where we apply
HHD for every timeunit.
IX. C ONCLUSION
We develop Tiresias to detect anomalies designed toward
the unique characteristics of operational data, including a
novel adaptive scheme to accurately locate the anomalies
using hierarchical heavy hitters. Using the operational data
collected at a tier-1 ISP, our evaluation suggests that Tiresias
maintains accuracy and computational efﬁciency that scales
to large networks. We deploy our implementation on a tier-1
ISP, and our major next step is to optimize system parameters
based on the feedback from ISP operational teams.
REFERENCES
[1] P. Porras, H. Saidi, and V . Yegneswaran, “A foray into Conﬁcker’s logic
and rendezvous points,” in LEET, 2009.
[2] Z. Qian, Z. M. Mao, Y . Xie, and F. Yu, “Investigation of triangular
spamming: A stealthy and efﬁcient spamming technique,” in IEEE
Symposium on Security and Privacy , 2010.
[3] S. Stover, D. Dittrich, J. Hernandez, and S. Dietrich, “Analysis of the
Storm and Nugache trojans: P2P is here.” in USENIX Magazine ;login:,
2007.
[4] D. R. Choffnes, F. E. Bustamante, and Z. Ge, “Crowdsourcing service-
level network event monitoring,” in SIGCOMM, 2010.
[5] A. Mahimkar, J. Yates, Y . Zhang, A. Shaikh, J. Wang, Z. Ge, and
C. T. Ee, “Troubleshooting chronic conditions in large IP networks,”
in CoNEXT, 2008.
[6] D. Brauckhoff, X. Dimitropoulos, A. Wagner, and K. Salamatian,
“Anomaly extraction in backbone networks using association rules,”
in IMC, 2009.
[7] C. Estan, S. Savage, and G. Varghese, “Automatically inferring patterns
of resource consumption in network trafﬁc,” in SIGCOMM, 2003.
[8] A. Lakhina, M. Crovella, and C. Diot, “Diagnosing network-wide trafﬁc
anomalies,” in SIGCOMM, 2004.
[9] ——, “Mining anomalies using trafﬁc feature distributions,” in SIG-
COMM, 2005.
[10] J. Zhang, J. Rexford, and J. Feigenbaum, “Learning-based anomaly de-
tection in BGP updates,” in SIGCOMM Workshop on Mining Network
Data, 2005.
[11] Y . Zhang, S. Singh, S. Sen, N. Dufﬁeld, and C. Lund, “Online
identiﬁcation of hierarchical heavy hitters: Algorithms, evaluation, and
applications,” in IMC, 2004.
[12] Y . Zhao, Y . Xie, F. Yu, Q. Ke, Y . Yu, Y . Chen, and E. Gillum,
“BotGraph: Large scale spamming botnet detection,” in NSDI, 2009.
[13] M. Shensa, “The discrete wavelet transform: Wedding the `a trous and
mallat algorithms,” in IEEE Transactions on Signal Processing , 1992.
[14] J. D. Brutlag, “Aberrant behavior detection in time series for network
monitoring,” in USENIX Conference on System Administration , 2000.
[15] F. Silveira, C. Diot, N. Taft, and R. Govindan, “ASTUTE: Detecting a
different class of trafﬁc anomalies,” in SIGCOMM, 2010.
[16] K. Papagiannaki, N. Taft, Z.-L. Zhang, and C. Diot, “Long-term
forecasting of Internet backbone trafﬁc,” in INFOCOM, 2003.
[17] C. C. Holt, “Forecasting seasonals and trends by exponentially
weighted moving averages,” in International Journal of Forecasting ,
2004.
[18] G. Cormode and S. Muthukrishnan, “An improved data stream sum-
mary: the count-min sketch and its applications,” J. Algorithms, 2005.
[19] C. Estan and G. Varghese, “New directions in trafﬁc measurement and
accounting,” in SIGCOMM, 2002.
[20] B. Krishnamurthy, S. Sen, Y . Zhang, and Y . Chen, “Sketch-based
change detection: Methods, evaluation, and applications,” inIMC, 2003.
[21] G. E. P. Box and G. Jenkins, Time series analysis, forecasting and
control. Prentice Hall, 1994.
[22] A. Soule, K. Salamatian, and N. Taft, “Combining ﬁltering and statis-
tical methods for anomaly detection,” in IMC, 2005.
[23] P. Barford and D. Plonka, “Characteristics of network trafﬁc ﬂow
anomalies,” in SIGCOMM Workshop on Internet Measurement , 2001.
[24] L. Huang, X. Nguyen, M. Garofalakis, J. Hellerstein, A. D. Joseph,
M. Jordan, and N. Taft, “Communication-efﬁcient online detection of
network-wide anomalies,” in INFOCOM, 2007.
[25] W. Xu, L. Huang, A. Fox, D. Patterson, and M. I. Jordan, “Detecting
large-scale system problems by mining console logs,” in SOSP, 2009.
[26] G. Nychis, V . Sekar, D. G. Andersen, H. Kim, and H. Zhang, “An
empirical evaluation of entropy-based trafﬁc anomaly detection,” in
IMC, 2008.
[27] H. Ringberg, A. Soule, J. Rexford, and C. Diot, “Sensitivity of PCA
for trafﬁc anomaly detection,” in SIGMETRICS, 2007.
[28] G. Cormode, F. Korn, S. Muthukrishnan, and D. Srivastava, “Diamond
in the rough: Finding hierarchical heavy hitters in multi-dimensional
data,” in SIGMOD, 2004.
[29] A. A. Mahimkar, Z. Ge, A. Shaikh, J. Wang, J. Yates, Y . Zhang, and
Q. Zhao, “Towards automated performance diagnosis in a large IPTV
network,” in SIGCOMM, 2009.
[30] S. Muthukrishnan, “Data streams: Algorithms and applications,” in
SODA, 2003.