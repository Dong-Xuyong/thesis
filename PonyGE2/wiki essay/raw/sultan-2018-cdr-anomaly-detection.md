---
article_number: 2
slug: sultan-2018-cdr-anomaly-detection
pdf: Sultan_2018_CDR_Anomaly_Detection.pdf
extraction_status: ok
last_updated: 2026-06-26
---

# Raw PDF text — Article 2 (sultan-2018-cdr-anomaly-detection)

- **Source PDF:** `Literature Review PDFs/01_Telecom_Anomaly_Detection/Sultan_2018_CDR_Anomaly_Detection.pdf`
- **Wiki source page:** [[../sources/sultan-2018-cdr-anomaly-detection|sultan-2018-cdr-anomaly-detection]]

## Extracted text

--- Page 1 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 1
Call Detail Records Driven Anomaly Detection and
Trafﬁc Prediction in Mobile Cellular Networks
Kashif Sultan, Hazrat Ali, Zhongshan Zhang*
Abstract—Mobile networks possess information about the users
as well as the network. Such information is useful for making
the network end-to-end visible and intelligent. Big data analytics
can efﬁciently analyze user and network information, unearth
meaningful insights with the help of machine learning tools.
Utilizing big data analytics and machine learning, this work
contributes in three ways. First, we utilize the call detail records
(CDR) data to detect anomalies in the network. For authentication
and veriﬁcation of anomalies, we use k-means clustering, an
unsupervised machine learning algorithm. Through effective
detection of anomalies, we can proceed to suitable design for
resource distribution as well as fault detection and avoidance.
Second, we prepare anomaly-free data by removing anomalous
activities and train a neural network model. By passing anomaly
and anomaly-free data through this model, we observe the effect
of anomalous activities in training of the model and also observe
mean square error of anomaly and anomaly free data. Lastly, we
use an autoregressive integrated moving average (ARIMA) model
to predict future trafﬁc for a user. Through simple visualization,
we show that anomaly free data better generalizes the learning
models and performs better on prediction task.
Keywords— Anomaly, Call Data Records, Data Analytics.
I. I NTRODUCTION
M
OBILE technologies and cellular networks are getting
smarter day by day, so mobile phone devices such
as smartphones, tablets, wearable devices as well as mobile
phone subscribers are increasing rapidly. According to report
presented by Ericsson, the mobile devices have surpassed
the world population [1]. Due to such a huge growth in
mobile devices and mobile phone subscribers, the congestion
of mobile network is not unusual. Hence the provision of best
quality of services for such a huge number of mobile phone
subscribers is challenging. With the massive growth of mobile
devices and mobile phone subscribers, the data generated
from these devices is increasing explosively. According to
Kashif Sultan and Zhongshan Zhang are with School of Com-
puter and Communication Engineering, University of Science and Tech-
nology Beijing, 30 Xueyuan Road, Haidian District, Beijing, 100083,
PR China. e-mail: kashif rao@outlook.com; kashif sultan@xs.ustb.edu.cn;
zhangzs@ustb.edu.cn
Hazrat Ali is with Department of Electrical Engineering, COMSATS
University Islamabad, Abbottabad Campus, 22060, Abbottabad, Pakistan. e-
mail: hazratali@ciit.net.pk. ORCID: https://orcid.org/0000-0003-3058-5794
Manuscript received February 2018; revised xx xx, 2018.
This work was supported by the key project of the National Natural Science
Foundation of China (No. 61431001), Beijing Natural Science Foundation
(L172026), Key Laboratory of Cognitive Radio and Information Processing,
Ministry of Education (Guilin University of Electronic Technology), and
the Foundation of Beijing Engineering and Technology Center for Conver-
gence Networks and Ubiquitous Services (*Corresponding author: Zhongshan
Zhang)
CISCO survey, the data increased 4000-fold during the last
ten years [2]. From CISCO report, global mobile data trafﬁc
is generating 24 Exabyte (EB) data per month and this trend
is continuously rising [2]. This huge data has following 4Vs
characteristics making it different from the traditional data.
V olume: The data has very large volume; of order of picobytes
(PB). As reported in [3], 12 Terabytes (TB) data is generated
by Twitter every day. On average, 1.2 Zeta bytes of data
is being produced every year since 2012 and this value is
continuously rising [4], [5].
V elocity: The ﬂow rate of data at which the data goes in or out
from mobile devices and mobile network is termed velocity of
data. This determines the dynamic nature of the data and big
data is highly dynamic.
V ariety: This huge and dynamic data comes from various
sources and occurs in different formats such as structured,
unstructured and semi-structured.
V alue: According to IDC report, a very famous group for big
data research activities, big data technologies describes a new
generation of technology, designed to extract value from a huge
volume of a wide variety of data [6].
Fig. 1: Attributes of big data
From the above discussions, data with 4Vs characteristics
(volume, velocity, variety and value ) is known as big data.
The 4Vs characteristics of big data is shown in Figure 1.
Hence, the management and analysis of such big data is termed
as big data analytics. Big data analytics is a broader term
and encompasses hardware and software solutions for efﬁcient
analysis and management of the data. In big data analytics,
statistical machine learning and algorithms are applied on vast
amount of complex data, which unveil hidden information from
the data [7]. Big data analytics is different from the traditional
data analytics. As in traditional data analytics, we choose
only random samples from the entire data set and apply data
analytics on selected partial dataset. Decisions are made on the
basis of data analysis of partial dataset. Hence results obtained
arXiv:1807.11545v1  [cs.LG]  30 Jul 2018

--- Page 2 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 2
from this partial data analytics are not essentially accurate
and precise. Not long ago, big data anlaytics and machine
learning tools were not developed enough to analyze entire
dataset, attributed to limitations on available computational
resources. Recently, with advancements in such technologies,
the analytics of big datasets has become feasible. Hence, the
results generated by big data analytics are more precise and
accurate as compared to traditional analytics. For network
data analytics applications such as network optimization, re-
source allocation, identiﬁcation of sleeping cells and proactive
caching, we need accurate and precise information, which can
be obtained through big data analytics.
With emergence of 5G networks, there will be hundreds
of billions of connected devices [8] and comparable number
of network nodes. Hence, by analyzing information such
as call details record (CDR) information, reference signal
receive power (RSRP), and location information from core
network and radio access nodes, one can improve the network
performance as well as give the best quality of service (QoS)
and quality of experience (QoE) to mobile phone subscribers.
In this work, we exploit the CDR information of mobile
networks. This CDR information helps in determining the
user activities at a particular date and time. In this work,
we name the unexpected or abnormal behavior of the user
as an anomaly. Such type of unusual activity degrades the
network performance. Anomalies in the network may occur
due to different issues such as network failure, sleeping cells,
overloading of trafﬁc and low coverage area. Hence, successful
anomaly detection and anomaly removal are useful in opti-
mizing network performance. We will discuss this in detail in
subsequent section. This paper contributes as below:
• We present a concept of identifying anomalies in
CDR data and verify the anomalies through clus-
tering algorithm. We then provide an insight into
how the anomalous data can be removed to obtain
anomaly free data.
• We present an artiﬁcial neural network model
trained with anomalous as well as anomaly free
data. Through mean square error calculation, we
show that the neural network model learns better
information from the data if the anomalies are
removed.
• We also explore the use of ARIMA model for future
activity prediction of mobile subscribers.
The rest of the paper is organized as follows: In Section II
we discuss related work. In Section III we describe importance
and use case of CDR data analytics in optimizing network
performance and improving the QoS for mobile subscribers.
In Section IV, we present the system model and also describe
the dataset used. We present anomaly detection by ground
truth data and machine learning algorithms and discuss the
veriﬁcation in Section V. In Section VI, we present neural
network based training model for comparing mean square
error of anomaly and anomaly-free data. In Section VII we
present ARIMA model for predicting future activities of the
user. Finally, we conclude our work in Section VIII.
II. R ELATED WORK
Anomaly detection has been reported before in work as
summarized below:
Naboulsi et al., [9] presented a framework, in which a
large scale CDR dataset was sub-categorized according to the
history of activities. The framework reported in [9] determines
the irregular and unexpected activities termed as anomalies.
The authors in [10], [11] used k-means clustering techniques
for determining regions of interest such as commercial areas,
residential areas, ofﬁce areas, and recreational areas etc. The
authors in [12], [13] also used k-means clustering for anomaly
detection purpose. The authors divided data into clusters of
anomalous data and normal data. The authors in [14] analyzed
CDR information of wireless network and detected anomalies
by rule based approach. Authors in [15], [16] presented the
signiﬁcance of CDR data analysis in case of natural disasters.
The CDRs being generated daily are huge in number. The
CDR data contains valuable insights that can be used for the
beneﬁt of the network operators as well as subscribers. A
milestone for such a huge CDRs data analysis is presented in
[17]. The authors in [17] have presented a stream processing
model which is able to analyze 6 billion CDRs generated per
day. The model has the ability to support higher throughput,
lower latency and fault tolerance. Parallel processing, de-
duplication and easy to use platform for network operators
are the main aspects of the model.
The authors in [18] presented a big data analytics based
model for optimizing 5G networks and showed that the
network will be faster and proactive with the aid of big
data analytics. The authors in [19] showed that bandwidth
(resource) can be efﬁciently distributed with the aid of big data
analytics. The authors in [20] presented that self-organizing
network (SON) which will be used for enabling 5G, can
be efﬁciently implemented with big data analytics. Such a
framework based on SON was named a BSON [20]. The
authors in [21] showed that big data analytics will be helpful
for proactive caching which is very important for empowering
5G.
Motivated from the literature, we use k-means clustering
algorithm and detect the anomalous behavior of the users. Our
work is different from the previously reported work which was
limited to anomaly detection only. We perform veriﬁcation
of the anomaly detection through comparison with ground
truth data. After successful anomaly detection and veriﬁca-
tion, we prepare anomaly-free data. We also train a neural
network model for observing mean square error of anomaly
and anomaly-free data. Finally, we train ARIMA prediction
model for predicting users’ future activities. Furthermore, we
discuss that such type of insights are also helpful towards 5G
networks’ requirements such as proactive caching, maximum
throughput and close-to-zero latency.
III. T HE IMPORTANCE OF CDR DATA AND USE CASE
CDR data contains information about a subscriber’s
phone usage. The CDR data includes identiﬁcation code of
caller/receiver, the location of base tower station (BTS), di-
rection of the voice call and activity type (i.e., SMS or call).

--- Page 3 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 3
The CDR data of a cellular network can be used for analyzing
user or network behavior. With the aid of CDR data analysis,
one may extract information and detect unusual events of
critical signiﬁcance e.g., a terrorism activity, earthquakes,
ﬂoods, Christmas eve, soccer world cup, black Friday etc. If
there is any such type of natural or unnatural event, the mobile
subscriber activities (CDR activities) will be increased (or may
be decreased). The CDR activity can also be used to detect
the movements of mobile phone subscriber i.e., the ﬂow of
humans during a natural disaster occurrence. If CDR activities
at particular time and location are dramatically increasing, the
rise in activity level can be linked with events such as a road
accident on a highway, an usual blast or terror activity in a
mall, market, earth quake or other natural disaster. Under such
circumstances, people start calling, texting to their relatives
or friends or rescue services resulting in exponential rise in
the CDR activity. People also tend to move away from such
a location directly showing a rise in users’ movement away
from a particular location [15], [16]. Thus, CDR data analysis
provides spatio-temporal information of mobile users, which
means the exact location and time of a particular event can
be determined. If there is ﬂood, earthquake or any terrorism
activity in a particular region, the CDR activities (calls, SMSs)
will be increased in that region as mobile phone subscribers
will give calls, send SMS to other people to inform about such
activity in that region and will ask for rescue and help. Besides,
there will be tendency of movements from the effected location
to safer venues.
If there is information available about the CDR activities
of a cellular network and a massive increase occurs in CDR
activities at particular day or speciﬁc time frame then unusual
events can be anticipated. In the event of unusual circum-
stances, provision of rescue services can be accelerated and
help activity can be enhanced. Thus, precious lives could be
saved.
Because of such type of abnormal behavior or anomalous
activities, the performance of network will be down and
mobile phones subscribers will have poor QoS. However, after
detecting and predicting such type of anomalous activities
for the next time frame, the network operator can provide
some extra resources for speciﬁc time frame on a particular
area. In this way the mobile phone subscribers can have
improved QoS. These extra resource allocation is in the form
of allocating more bandwidth to a particular area, increasing
network coverage area by sending small cell nodes as drones.
Hence, network congestion can be avoided and a better QoS
can be ensured. Beside event detection, the analysis of CDR
activity can also be used to enhance the QoS and QoE and
of mobile phone subscribers. As CDR dataset has information
about the number of voice calls, duration of voice calls, caller
ID, number of SMS, anlaysis of bigger CDR dataset for
records spanning over several months/years is possible through
machine learning and big data analytics. We can thus predict
mobile subscribers’ behavior i.e., the number of voice calls or
the duration of voice calls for next time slot.
Fig. 2: System Model
IV. S YSTEM MODEL AND DATASET DESCRIPTION
A generic architecture of mobile communication consists of
three components; (i) mobile users or clients (ii) middle tier
or access networks and (iii) back-end system or core network.
Mobile users are in small cells as well as in macro-cells.
Macro-cells are connected with core network and vice versa.
Due to densiﬁcation in next generation networks (billions of
connected devices), there will be huge number of small-cells
as well as macro-cells [8]. Typically, mobile users’ activities
are different in different cells at a particular time and area.
With these considerations, we make our system model and
divide the middle tier of the generic architecture according to
mobile users’ activity level. The hypothetical representation
in Figure 2 shows that there are three types of areas, low
activity area, average activity area and high activity area.
The mobile resource requirements are different in these areas.
We analyze CDR data of mobile users for observing and
predicting the activities of the mobile users. We utilize CDR
data from cellular network, as available to us from [22]–
[24]. As discussed above, the architecture for the network
consists of three layers. The layer one consists of users’
mobile devices or users’ equipment, layer two is used to
connect users’ mobile devices or users’ equipment via evolved
nodeB (eNodeB). The third layer consists of logical nodes such
as mobility management entity (MME), packet data network
gateway (PGW) and service gateway (SGW), etc. The CDR
information we use is collected from layer 3 of the network.
This CDR data information is used to observe the behavior of
the users as well as the network . From this CDR information
we determine anomaly and its whereabouts in the network.
The network model is shown in Figure 3.

--- Page 4 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 4
Fig. 3: Network Architecture
A. Description of Dataset
We use three different datasets of cellular networks. The
ﬁrst CDR dataset is obtained from CRAWDAD community.
CRAWDAD ( Community Resource for Archiving Wireless
Data Dartmouth ) is a wireless network data resource for
the research community [22]. Table I shows the CRAWDAD
dataset and its associated ﬁelds. This dataset contains the
mobile phone records of 142 days from September 2010 to
February 2011. The dataset has following ﬁelds:
Date: The date of the users’ activity are represented as
YYYYMMDD. Users’ activity is in the form of incoming call,
outgoing call, incoming SMS and outgoing SMS.
Time: Time of the users’ activity which is hhmmss.
Type: Type of the users’ activity (voice call, SMS).
Direction: direction of the users’ activity (incoming or outgo-
ing).
Duration: Duration of the voice call.
TABLE I: CRAWDED dataset ﬁelds
Date Time Type Direction Duration[s]
20100916 130748 V oice Incoming 18
20100916 133131 V oice Outgoing 99
20100916 131324 V oice Incoming 214
20100916 131735 V oice Incoming 72
20100916 135342 V oice Incoming 37
The second CDR dataset is obtained from Nodobo, which is
a suite of software developed at the University of Strathclyde ,
and allows precise capture and replay of smartphone user
interactions sessions [23], [25]. This dataset was collected
during a study of mobile phone usage of 27 high school
students. The datset contains the mobile records for a period
of six months from September 2010 to February 2011
[23]. Table II shows the second dataset and its associated
ﬁelds. This dataset includes 13035 voice call records, 83542
messages records and other related data. The dataset has the
following ﬁelds:
User: This ﬁeld contains the ID of the subscriber or caller.
Other: This contains ID of the receiver.
Direction: Direction of the user’s activity (incoming or
outgoing).
Duration: Duration of the voice calls.
Timestamp: This ﬁeld contains date and time of the user’s
activity.
TABLE II: Nodobo dataset ﬁelds
User Other Direction Duration Timestamp
7641036117 7588304495 Incoming 1224 Thu Sep 9 19:35:37
100 2010
7981267897 7784425582 Outgoing 474 Thu Sep 9 18:43:44
100 2010
7981267897 7743039441 Missed 0 Thu Sep 9 19:51:30
100 2010
7981267897 7784425582 Outgoing 0 Thu Sep 9 20:57:55
100 2010
7981267897 7784425582 Outgoing 605 Fri Sep 10 20:17:00
100 2010
The third dataset is obtained from open big data database
of Dandelion API web forum. The dataset which we use from
this open big data database is for Telecom Italia. This CDR
available from the Telecom Italia is for the city of Milano.
The dataset includes CDRs for a period of two months from
Ist November 2013 to Ist January 2014. Table III represents
sample of this dataset. This dataset provides the following
information:
Grid ID: This ﬁeld contains the identiﬁcation number of the
grid.
Time stamp: The time of the activity (in milisecond).
Received SMS: It represents number of SMS received at
each time step.
Sent SMS: It represents number of SMS sent at each time
step.
Incoming Calls: Duration of the incoming calls.
Outgoing Calls: Duration of outgoing calls.
TABLE III: Telecom Italia dataset ﬁelds
Grid ID Timestamp Recevied
SMS
activity
Sent
SMS
activity
Incoming
Calls
activity
Outgoing
Calls
activity
1 10 0.2724 0.1127 0.0035 0.0807
10 20 0.0101 0.0693 0.0573 0.0446
B. Data Pre-processing
The data from these sources contain missing entries or noise
causing misleading pattern. Data pre-processing step removes
such type of irregularities. Through pre-processing, we obtain
data now ready for further analysis.
V. A NOMALY DETECTION AND VERIFICATION
In this section, we discuss anomaly detection with machine
learning tools. We then verify anomalies through visualization

--- Page 5 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 5
of the ground truth data and comparison with the anomalies
detected through clustering.
A. k-means Clustering
Clustering is a process of partitioning a group of data
into small number of clusters and sub-groups. In k-means
clustering, ′n′ is number of objects or data points to be
portioned and′k′ is the number of clusters or sub-groups. The
k-means clustering algorithm is summarized in Algorithm 1.
Algorithm 1 Algorithm
input← K(number of cluster)
input← training set x1,x 2,........,x m
xi∈ℜ n (drop x0=1 convention )
Randomly initialize K cluster centroids
u1,u 2,......,u K∈ℜ n
repeat
for i =1 to m do
ci :=index(from 1 to K) of cluster centroid closed to
xi
end for
for k =1 to K do
uk := average (mean) of points assigned to cluster k
end for
until (converge)
After k-means clustering, we obtain number of clusters with
different data points. Thus, the data is divided into different
clusters. As one can anticipate, cluster of fewer objects or data
points is the cluster of anomalous activities.
B. Anomaly Detection through Ground truth Data
Figure 4 shows the activity of users over a week from
September 16 to September 24 in the year of 2010. It is
observed from Figure 4 that the activity level is very high
in some parts of entire weeks activity. These higher levels are
showing an unexpected and irregular behavior of the users, so
we consider these activities as anomalies. It is also observed
from entries of the dataset that these anomalies occurred on
September 17 (5.32 pm), September 19 (5.40 pm), September
22 (12.48 pm) and September 24 (9.37 pm). It can also be
observed from the plot of ground truth data and entries of the
dataset that on September 24 during 5pm to 6pm, there was
zero activity. These activities are also considered as anomalies
because at this time period as zero activity might have been
due to a network failure. Similarly, the users’ activities for
second and third datasets are shown in Figure 5 and Figure
6, respectively. Anomalies in second dataset are also obvious
from Figure 6. These anomalous activities are also helpful
to identify region of interest (ROI) e.g., locations with high
density of users such as shopping malls, hospitals, or stadium;
or identify events of interest e.g., natural disaster, fatal road
accidents, or terror activity.
Fig. 4: Anomaly detection with ground truth data (ﬁrst
dataset)
Fig. 5: Anomaly detection with ground truth data (second
dataset)
C. Anomaly Detection through k-means
As anomalous activities are unexpected and irregular making
them unique and fewer in number than normal activities.
Through k-means clustering algorithms, normal activities are
grouped into the same clusters different than the one in which
abnormal activities are placed. As shown in Figure 7, there
are three clusters. Objects or users which lie in the range of
Fig. 6: Anomaly detection with ground truth data (third
dataset)

--- Page 6 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 6
activity level 1-150 are grouped in cluster 1, users which lie in
the range of activity level 150-400 are grouped in cluster 2 and
remaining users with much higher activity level are grouped in
cluster 3. From ﬁgure 7, we observe that most of the users are
in cluster 1 and cluster 2. On the other hand, cluster 3 has fewer
users with higher activity level. Cluster 3 represents abnormal
activities of the users and hence characterized as cluster of
anomalous activities. It is veriﬁed from Figure 4 and Figure
7 that k-means clustering algorithm detects a similar pattern
of anomalous activities as seen from the plot of ground truth
data. Similarly, Figure 6 and Figure 8 verify the anomalies for
the second dataset.
As in case of future generation network or 5G, which will be
proactive, have close to zero latency, maximum throughput and
connected with billions of devices [8], the exact prediction of
anomalies will perform a key role in fulﬁlling requirements of
these networks. For implementation of such ultra fast hyper
dense networks (5G), there must be intelligent prediction
model that could forecast the future activities. The fuel of
such model is precise and accurate information. For example
if prediction model is not trained with clean and anomaly-free
data, the model would fail to predict. In the next section, we
present an approach to prepare anomaly-free data and pass
it through neural network based training model and ARIMA
time series prediction model for observing error difference and
predicting future activities.
Fig. 7: Anomaly detection through k-means clustering (ﬁrst
dataset)
VI. P REPARATION OF ANOMALY -FREE DATA AND MEAN
SQUARE ERROR EVALUATION
A. Preparation of anomaly-free data
After detection and veriﬁcation of anomalies by ground truth
data and machine learning algorithm, we clean the data from
such anomalous and abnormal activities making data anomaly-
free. For preparation of anomaly-free data, we replace the
anomalous activities of the users by average activities of all the
users. Figure 10 and Figure 11 show the anomaly-free data for
ﬁrst and second dataset respectively. It is clear from the plot
of anomaly-free data that the users’ activities are in a regular
pattern. We train neural network model with anomaly as well
as anomaly free data and observe mean square errors.
Fig. 8: Anomaly detection through k-means clustering
(second dataset)
Fig. 9: Anomaly detection through k-means clustering (third
dataset)
B. Mean Square Error Evaluation
For observing error difference in anomaly and anomaly-free
data, we train a neural network model. We pass anomalous and
anomaly-free data through this model and observe mean square
error. Figure 12 shows the mean square error for anomalous
and anomaly-free data. It is observed that the mean square
error of test, train and validation data is high when anomalous
Fig. 10: Anomaly-free data (ﬁrst dataset)

--- Page 7 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 7
Fig. 11: Anomaly-free data (second dataset)
data is passed through the model. On the other hand, when
the model is trained with anomaly free data, the overall mean
square error is decreased. The mean square error of anomalous
and anomaly-free data of second dataset is shown in Figure 13.
In order to highlight the signiﬁcance of the pre-processing step
for data pre-preparation, it is important to use a numeric metric.
We calculate the mean square error for the model training with
both anomalous and anomaly-free data. Thus, the mean square
error serves as a numeric parameter to ascertain the impact of
outliers in the cellular data. The mean square error calculation
for both the datasets shows that anomaly free data help us
develop a better model (as shown in Figure 12 and Figure 13.
The effect of the mean square error can be severe, depending
upon the target of the model. For example in the case of
sleeping cell detection, if anomalous data is used in the model,
then the model would not be able to detect sleeping cells
correctly. Under worst scenarios, this may lead to network
outage as a consequence of denial of service for newer devices.
Fig. 12: Left: MSE of training model with anomalous data.
Right: MSE of training model with anomaly-free data.
VII. ARIMA T IME -SERIES FORECASTING MODEL
The CDR Datasets which are used in this work are time
series data. CDR time series data can be used for predicting
and detecting future anomalous behavior of the network and
subscribers [26], [27]. Among the time series forecasting
models, ARIMA is a popular and widely used time-series fore-
casting model. ARIMA stands for Autoregressive Integrated
Moving Average. It is generalized auto-regressive model and
adds the notion of integration [28]. The keys features of the
model are explained below,
Fig. 13: Left: MSE of training model with anomalous data
(second dataset). Right: MSE of training model with
anomaly-free data (second dataset)
AR (Autoregression): This feature uses the dependency rela-
tionship between current observations and a speciﬁed number
of previous observations. The mathematical representation of
AR(p) is shown in Equation 1. The mathematical represen-
tation of auto-regression model in equation 1 shows that
the variable of interest Yt is predicted by using the linear
combination of its past values ( Yt−1):
Yt =c +
p∑
i=1
ϕiYt−1 +ϵt (1)
whereϕi,...,ϕ p are parameters, c is constant and ϵt is white
noise.
I (Integrated): This feature is used for making a series
stationary if it is non-stationary, done by subtracting raw
observations. Mathematically, this feature is represented in the
form of Equation 2.
Y‘
t = Yt−Yt−1 (2)
Where the consecutive observations are differences i.e., the
past value of the variable (Yt−1) is subtracted from the current
value of (Yt).
MA (Moving average): This feature uses dependency be-
tween an observation and a residual error from a moving
average model applied to lagged observations. Equation 3
represents MA feature.
Yt =µ +ϵt +
q∑
i=1
θiϵt−1 (3)
where θi,...,θ q are parameters, µ is expectation of Yt and ϵt
, ϵt−1 are white noise error terms.
ARIMA time series forecasting model works in following
steps as shown in Figure 14.
A. Data Stationarity
We visualize the data and observe increasing or decreasing
trends of the data. This time series data is non-stationary, as
can be observed from Figure 15. We take necessary action to
make the data stationary as required for time series forecasting
model.
It is typically assumed (and required) for time series fore-
casting models that the input data is stationary. If time series
data is not stationary, it should be made stationary before

--- Page 8 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 8
Fig. 14: Time series process
Fig. 15: Time series data plot
training a time series forecasting model1. In summary statistics,
it is observed that for stationary time series data, mean and
variance should be constant for observations.
For stationarity conﬁrmation of the data, The Augmented
Dicky-Fuller (ADF) statistical test is used. ADF test is also
called unit root test. The ADF test has two hypothesis; Null
hypothesis and Alternate hypothesis . Null hypothesis suggests
that time series data has a unit root, so data is non-stationary.
Alternate hypothesis suggests that time series data does not
have any unit root implying that data is stationary. These
hypothesis are interpreted by p value of the ADF test. If p-
value is greater than 0.05, null hypotheses is accepted and data
is non-stationary. Similarly, if p-value is less than or equal to
0.05, null hypothesis is rejected and data is stationary. We
have applied ADF test on one day’s CDR activities of the
users for conﬁrmation of data stationarization. ADF statistics
of available dataset shows that p-value is 0.6177, implying
that the data is non-stationary. Hence after conﬁrmation of
non-stationary behavior of data, we make the data stationary
by differencing. For comparison purpose, non-stationary and
stationary time series are plotted together in Figure 16. The
upper part of Figure 16 represents the non-stationary time
1For determining the stationarity of time series models, there are differ-
ent methods such as visualizing the time series’s plot, observing summary
statistics, augmented Dickey-Fuller test.
series and the lower part represents the stationary time series.
Fig. 16: Non-stationary and stationary time series. (As CDR
activities of users are aggregated on 10 minutes interval in
available dataset, so x-axis represents the 10 minutes
intervals of one day’s CDR activity and y-axis represents
activity level)
B. Parameter Estimation
After determining and conﬁrming the stationarity of the
time series, the next step is to determine the optimal value
of model’s parameters AR(p) and MA(q). The optimal values
of p and q is determined with the help of auto-correlation
function (ACF) and partial auto-correlation function (PACF)
plots.
1) Autocorrelation Function (ACF): The plot of ACF in
Figure 17 shows the correlation between an observations with
lag values. On the x-axis of the ACF plot is number of lags
and on y-axis is the correlation coefﬁcient. The model is AR
if the ACF trails off after a lag and has a hard cut-off in the
PACF after a lag. This lag is taken as the value for p.
2) Partial Autocorrelation Function (PACF): The plot sum-
marizes the correlations for an observation with lag values not
accounted for by prior lagged observations. The model is MA
if the PACF trails off after a lag and has a hard cut-off in
the ACF after the lag. This lag value is taken as the value
for q. The model is a mix of AR and MA if both the ACF
and PACF trail off. The plots of ACF and PACF for one day’s
CDR activity of the users are shown in Figure 17. The cone
in the plot represents the conﬁdence interval which shows that
the correlations outside this cone are very likely a correlation.
In the plot of ACF and PACF, all lag values are printed which

--- Page 9 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 9
makes plot difﬁcult to visualize, for ease of visualization of
plot we limit the lag values to 50. After visualizing the plots
of ACF and PACF, the order of AR and MA is decided.
Fig. 17: ACF and PACF plot of time series data
C. Build the ARIMA model
After deﬁning the optimal values and the order of model’s
parameters (p,d,q ), we build ARIMA model and ﬁt data in the
model. The dataset is divided into train and test sequences. The
model is trained on 70 percent data and tested on remaining
30 percent data.
D. Make Prediction
After building the model, we use it for forecasting. Firstly
we analyze the model with the available data, in this model
precision is observed. Figure 18 shows prediction with ARIMA
model applied on data for one day. We also apply the model
on user’s activity of a week. Figure 19 shows the prediction
of user’s activity over a week.
With such time series forecasting for CDR data, the trends
in mobile network as well as mobile’s subscribers are pre-
dicted well before time. This help in interpretation, and thus
smart management of cellular networks in terms of spectrum
management, fault detection/avoidance and provision of just-
in-time services. These applications have great potential use in
next generation networks.
VIII. C ONCLUSION AND FUTURE DIRECTION
In this work, we analyzed CDR data from mobile network.
For CDR data analysis, we used k-means clustering technique.
The users’ activities which exhibit unusual behavior are termed
as anomalies. We veriﬁed anomalies by plotting ground truth
data and analysis plot for k-means clustering algorithm. After
detection and veriﬁcation of anomalies, we can also identify
the region where such anomalies occur. This helps in identiﬁca-
tion of region of interest (an important geo location) or event of
Fig. 18: Time series process forecasting
Fig. 19: Time series process forecasting over a week
interest (an extraordinary incident). After identiﬁcation of such
regions or events, proper action such as resource distribution,
sending drone small cells etc can be taken in advance and on
time. Hence because of such actions, the users requirements
will be fulﬁlled and will have best QoS as well as network
congestion will be avoided.
CDR data analytics will help in understanding the dynamics
of the users which will helpful in empowering the concept
of smart colonies. Also the hidden information obtained from
CDR data analytics of user will be helpful in efﬁcient resource
allocation and distribution.
REFERENCES
[1] Ericsson, “More than 50 billion connected devices,” 2011, White
Paper, Accessed: Jan 2017. [Online]. Available: http://www.akos-rs.si
[2] Cisco, “Cisco Visual Networking Index: Global Mobile Data Trafﬁc
Forecast Update , 2015-2020,” 2011, White Paper. [Online]. Available:
http://www.cisco.com/c/en/us/solutions/collateral/service-provider/
visual-networking-index-vni/mobile-white-paper-c11-520862.pdf.
[3] K. Rupanagunta, D. Zakkam, and H. Rao, “How to mine unstructured
data,” Article in Information Management, June , vol. 29, 2012.
[4] E. Letouz ´e, “Key Facts & Figures on Big Data and Call
Detail Records,” 2014, Accessed Jan 2017. [Online]. Available:
http://datapopalliance.org/key-facts-ﬁgures/

--- Page 10 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 10
[5] S. Wellen, “The Physical size of Big Data,” https://www.domo.com/
blog/the-physical-size-of-big-data/, Accessed: Jan 2017.
[6] J. Gantz and D. Reinsel, “Extracting value from chaos,” IDC iview, vol.
1142, no. 2011, pp. 1–12, 2011.
[7] G. King, “Big data is not about the data!” Presentation (Harvard
University USA, 19 November 2013) , 2013.
[8] J. G. Andrews, S. Buzzi, W. Choi, S. V . Hanly, A. Lozano, A. C. Soong,
and J. C. Zhang, “What will 5G be?” IEEE Journal on Selected Areas
in Communications , vol. 32, no. 6, pp. 1065–1082, 2014.
[9] D. Naboulsi, R. Stanica, and M. Fiore, “Classifying call proﬁles in
large-scale mobile trafﬁc datasets,” in INFOCOM, 2014 Proceedings
IEEE. IEEE, 2014, pp. 1806–1814.
[10] V . Soto and E. Fr ´ıas-Mart´ınez, “Automated land use identiﬁcation
using cell-phone records,” in Proceedings of the 3rd ACM international
workshop on MobiArch . ACM, 2011, pp. 17–22.
[11] A. Zoha, A. Saeed, A. Imran, M. A. Imran, and A. Abu-Dayya,
“A SON solution for sleeping cell detection using low-dimensional
embedding of MDT measurements,” in Personal, Indoor , and Mobile
Radio Communication (PIMRC), 2014 IEEE 25th Annual International
Symposium on . IEEE, 2014, pp. 1626–1630.
[12] G. M ¨unz, S. Li, and G. Carle, “Trafﬁc anomaly detection using k-means
clustering,” in GI/ITG Workshop MMBnet , 2007.
[13] M. F. Lima, B. B. Zarpelao, L. D. Sampaio, J. J. Rodrigues, T. Abrao,
and M. L. Proenc ¸a, “Anomaly detection using baseline and k-means
clustering,” in Software, Telecommunications and Computer Networks
(SoftCOM), 2010 International Conference on . IEEE, 2010, pp. 305–
309.
[14] I. A. Karatepe and E. Zeydan, “Anomaly detection in cellular network
data using big data analytics,” in European Wireless 2014; 20th Euro-
pean Wireless Conference; Proceedings of . VDE, 2014, pp. 1–5.
[15] P. W. Gething and A. J. Tatem, “Can mobile phone data improve
emergency response to natural disasters?” PLoS Med , vol. 8, no. 8,
p. e1001085, 2011.
[16] L. Bengtsson, X. Lu, A. Thorson, R. Garﬁeld, and J. V on Schreeb,
“Improved response to disasters and outbreaks by tracking population
movements with mobile phone network data: a post-earthquake geospa-
tial study in haiti,” PLoS Med , vol. 8, no. 8, p. e1001083, 2011.
[17] E. Bouillet, R. Kothari, V . Kumar, L. Mignet, S. Nathan, A. Ran-
ganathan, D. S. Turaga, O. Udrea, and O. Verscheure, “Experience
report: Processing 6 billion cdrs/day: From research to production,”
in Conference on Distributed Event-Based Systems (DEBS) , 2012, pp.
264–267.
[18] K. Zheng, Z. Yang, K. Zhang, P. Chatzimisios, K. Yang, and W. Xiang,
“Big data-driven optimization for mobile networks toward 5G,” IEEE
Network, vol. 30, no. 1, pp. 44–51, 2016.
[19] B. Fan, S. Leng, and K. Yang, “A dynamic bandwidth allocation
algorithm in mobile networks with big data of users and networks,”
IEEE Network , vol. 30, no. 1, pp. 6–10, 2016.
[20] A. Imran, A. Zoha, and A. Abu-Dayya, “Challenges in 5G: how to
empower SON with big data for enabling 5G,” IEEE Network, vol. 28,
no. 6, pp. 27–33, 2014.
[21] E. Bas ¸tu ˘g, M. Bennis, E. Zeydan, M. A. Kader, I. A. Karatepe, A. S.
Er, and M. Debbah, “Big data meets telcos: A proactive caching
perspective,” Journal of Communications and Networks , vol. 17, no. 6,
pp. 549–557, 2015.
[22] M. Ficek, “CRAWDAD dataset (v. 2012-03-15),” Downloaded from
http://crawdad.org/ctu/personal/20120315, Mar. 2012.
[23] A. McDiarmid, S. Bell, J. Irvine, and J. Banford, “Nodobo: De-
tailed mobile phone usage dataset,” Unpublished paper , accessed at
http://nodobo. com/papers/iet-el. pdf on , pp. 9–21, 2013.
[24] [Online]. Available: https://dandelion.eu
[25] Accessed: Jan 2017. [Online]. Available: http://nodobo.com/release.
html
[26] P. J. Brockwell and R. A. Davis, Introduction to time series and
forecasting. Springer, 2002.
[27] J. Brownlee, Introduction to time series forecasting with python , 2017.
[28] https://machinelearningmastery.com/arima-for-time-series-forecasting-with-python/.
Kashif Sultan received Masters degree in Informa-
tion and Communication Engineering from Univer-
sity of Science and Technology Beijing, China, in
2015. Currently, he is a PhD researcher at the School
of Computer and Communication Engineering, Uni-
versity of Science and Technology Beijing, China.
He is the recipient of USTB Chancellors scholarship.
His research interests include communication signal
processing, next generation networks and big data
analytics.
Hazrat Ali received in BSc and MSc degrees in elec-
trical engineering in 2009 and 2012 respectively. He
did his PhD in 2015 from University of Science and
Technology Beijing, China. He is currently Assistant
Professor at Department of Electrical Engineering,
COMSATS Institute of Information Technology Ab-
bottabad. At CIIT, he is the member of the signal
processing and machine learning research group. He
is also the course head for Digital Signal Processing
course. His research interests lie in unsupervised
learning, generative and discriminative approaches,
and speech and image processing. He is Associate Editor at IEEE and served
as reviewer at IEEE Access, IEEE Transactions on Neural Networks and
Learning Systems, Springer Neural Processing Letters, ACM Transactions
on Asian and Low Resource Language Information Processing, Elsevier
Computers and Electrical Engineering, International Journal of Artiﬁcial Intel-
ligence Tools, Journal of Experimental and Theoretical Artiﬁcial Intelligence,
Transactions on Internet and Information Systems, Springer Multimedia Tools
and Applications and as PC member at Frontiers of Information Technology
conference (FIT 2016), ICACT 2018, ICACT 2017, and IEEE WiSPNet 2018.
He is selected as young researcher at the 5th Heidelberg Laureate Forum,
Heidelberg, Germany. He is the recipient of the HEC Scholarship, IEEE
Student Travel Award, the IBRO grant, the TERENA/CISCO Travel grant,
QCRI/Boeing Travel grant and the Erasmus Mundus STRoNGTiES research
grant.

--- Page 11 ---
IEEE ACCESS JOURNAL, VOL. XX, NO. XX, JANUARY 20XX 11
Zhongshan Zhang received the B.E. and M.S. de-
grees in computer science from the Beijing Uni-
versity of Post and Telecommunications (BUPT) in
1998 and 2001, respectively, and the Ph.D. degree
in electrical engineering from BUPT in 2004. From
2004, he joined the DoCoMo Beijing Laboratories
as an Associate Researcher, and was promoted to
be a Researcher in 2005. In 2006, he joined the
University of Alberta, Edmonton, AB, Canada, as a
Post-Doctoral Fellow. In 2009, he joined the Depart-
ment of Research and Innovation, Alcatel-Lucent,
Shanghai, as a Research Scientist. From 2010 to 2011, he was with the
NEC China Laboratories, as a Senior Researcher. He is currently a Professor
with the School of Computer and Communication Engineering, University of
Science and Technology Beijing. His main research interests include statistical
signal processing, self-organized networking, cognitive radio, and cooperative
communications. He served or is serving as a Guest Editor and/or an Editor
for several technical journals, such as the IEEE Communications Magazine
and the KSII Transactions on Internet and Information Systems.
