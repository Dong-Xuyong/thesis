# Literature Review

## 1. Anomaly Detection in Telecommunications Networks

Telecommunication anomaly detection is difficult because labels are scarce. Moreover, the industry produces large amounts of data, with few viable labels that can be identified as anomalies. Often, the problem is not detecting the anomaly but selecting which subsection of the network window to monitor.

(González et al., 2024) shows that the modern multivariate detector is actually modest at detecting in a fixed, fully aggregated view where the labels are sparse. Of 730,000 samples, only 9,000 were labeled using a fixed set of 12 features. Using the DC-VAE, the mean range-F1 is around 52%.

(Burgueño et al., 2020) indicates the network had 25,000 mobile base station coverage areas. Moreover, for each cell, they can measure 240 features, but the study focuses on only 15 of the most important. From this perspective, manual selection is a bottleneck because the 225 unmonitored features may still contain relevant information; for example, anomalies may occur in an unmonitored signal.

Call Detail Records (CDR) are per-call metadata — timestamps, originating and terminating parties, and service type — and are widely used in telecom monitoring. Sultan et al. (2018) detect anomalous activity in public CDR datasets by clustering aggregated call and SMS counts with k-means and treating the high-activity cluster as anomalous. No precision, recall, F1, or AUC is reported for that detection step; the cleaned series are then used for neural-network and ARIMA traffic prediction.

Orange Paris case, features are manually selected to construct hand-designed aggregations (Lemaire et al., 2024). Moreover, the best precision they achieve is 28.63% for matching real events, indicating that many alarms were false positives. The system is actually useful but noisy.

Existing work assumes a fixed aggregation and therefore may miss anomalies that would only appear under a different grouping, so manual feature selection does not scale. Automated search is useful when the best aggregation is not obvious in advance; in those papers, there is a fixed review of aggregation, but they do not address how to automate the aggregation of time series. The next section will be about this topic.

## 2. Anomaly Detection in Grouped Time Series

Anomaly detection in group time series treats the detector input as a chosen representation, not the whole network. The dataset is aggregated by related features/entities at the aggregation level, rather than treating a network as a flat collection of features. It is important because the detection quality is dependent on the aggregation of features, not only the detector.

Mefleh et al. (2025) used an unsupervised Mahalanobis distance approach in a telecommunications setting. They got an improvement from 0.77 on the raw features to 0.86 when the denominator information is included, then to 0.93, adjusting the ratios, and finally to 0.99 with learned adjustments. This result shows that detection quality changes with feature transformation and aggregation.

Hua et al. (2022) show that the base stations share some operational behavior, which the model can learn and train to detect other anomalies in the other stations. GenAD was pre-trained on 3,000 unlabeled base stations, using multivariate time series features from China Mobile base stations. *Hua et al.'s* F1 score is 0.953 (precision 0.910). However, Hua et al.'s evaluation used point-adjusted segment scoring, treating anomaly detection as an entire time interval, not as a separate timestamp. So the performance across grouped time series studies is not directly comparable because data sets, anomaly labels, and evaluation metrics differ.

In the study by Oğuz and Kalaycıoğlu (2022), they simulate a multi-tier network that includes aggregations from the user equipment measurements and classifies the state of each femtocell access point. Performance changes with the region of interest radius, signal shadowing, and aggregation methods. At a 30 m region of interest with 2 dB shadowing, the 1D CNN achieved 80.1% accuracy, but as ROI size and the shadowing increase, the accuracy decreases, so this shows that including more observations is not necessarily beneficial when added signals are less relevant or noisier.

Based on observations, we can extract that grouping and representations can strongly affect anomaly detection performance. Although aggregations are selected manually before modeling the relevant KPIs, entities, aggregation levels, and spatial boundaries, none of them systematically search for an aggregation structure that best characterizes the anomaly. So we will explore how grammatical evolution will search from a grammar-defined structure space of valid hierarchical aggregation of telecommunication data, rather than selecting the fixed group time series.

## 3. Anomaly Detection in Hierarchical Time Series

The main difference between grouped time series and hierarchical time series is that grouped time series are a chosen representation. Whereas in the hierarchy, the anomaly sits inside the structure. In telecom, Anomaly alert is not enough because the operator also needs to know where the anomaly appears in the network or service structure. Hierarchy provides that location information; grouping does not.

Hierarchy in anomaly detection is important because an alert such as "traffic is abnormal" is not enough for a telecom operator to act on. The operator must determine whether it affects the entire network, a region or specific cell of the switch or only one KPI category. So this top-down approach helps break down into smaller branches; although that hierarchy is not necessarily the best aggregation for detecting anomalies.

Hong et al. (2012) detect and localize anomalies in hierarchical ISP call-detail data. It analyzes customer-care call logs and signaling call records across predefined hierarchies, allowing operators to identify not only that an abnormal behavior occurs but also the level at which it appears. They found over 94% of reference anomalies, and separately reported 99.7% anomaly identification accuracy. These results were obtained from a fixed additive hierarchy and Holt-Winters spike forecasting. So the author demonstrates hierarchical localization rather than searching over alternative aggregation structures. It does not search for alternative partial aggregations or score non-spike discords, which is the gap addressed by this thesis.

On the other hand, Wolff et al. (2022) treat anomaly localization as the sequential search problem of a known tree of processes. Instead of measuring every leaf process equally, their hierarchical dynamic search method first samples aggregate internal nodes and then moves towards the branch most likely to contain an anomaly. This can be useful for the thesis because it shows that hierarchy can be an active search space, not merely a reporting structure used after detection. However, Wolff assumed tree topology is already known, as search is only within it. This differs from our approach, which uses a GE to generate candidate aggregations before applying  the anomaly scorer.

Huang et al. (2026) propose HYDRA, a multi-level hierarchy-driven anomaly detector that ranked first among 40 algorithms across 40 TSB-AD datasets.

## 4. Matrix Profile and Time-Series Discord Detection

Matrix Profile is introduced here because the GE generates many aggregations, and for each produced candidate series, GE needs a scorer. Also, MP is exact, label-light, and computationally feasible for many candidates. It takes one candidate time series and computes the nearest-neighbour distances for each subsequence and returns a discord score. 

A time-series discord is the subsequence most distant from its nearest non-self match (Keogh et al., 2005). On the Matrix Profile, the discord is the position with the maximum nearest-neighbour distance (Yeh et al., 2017). For a short and unusual subsequence or spike, the discord may capture well, but may poorly capture a level shift, which is a sustained change to a new level; a ramp, which gradually drifts upwards over time; or a multivariate contextual anomaly, where each series looks normal alone but the relationship is abnormal. Computational efficiency is substantially improved: a refinery time-series self-join is reduced from an estimate of 153.8 days by brute force to 1.2 hours with STAMP/STOMP (Yeh et al., 2017). Also, Zhu et al. (2016) showed GPU-STOMP could process 100 million subsequences in about 12 days, compared to the estimate of 1585 years for brute force. STUMPY (Law, 2019) gives the practical implementation of this process in Python. Although Matrix Profile can score a candidate, it doesn't know which candidate aggregation to score. That's why we are moving on to combinatorial optimization.

## 5. Combinatorial Optimization for Selecting Time Series

Feature/subset selection is complex, so the combinatorial optimization will search a space of many candidates. The chosen set is large enough that the enumeration fails because the space is 2^n, (Xue et al., 2016); you also need to search for the candidates and score each one by the fitness function.

Linares-Barrera et al. (2024) select lagged forecasting features on an electricity dataset, reducing the feature set from 7,704 to 3,813, with MAE improved from 207.193 to 194.400, supporting representation pruning.

Contreras et al. (2024) study financial direction prediction with modest AUROC (~0.58–0.62), using GA with AUROC fitness, where each candidate feature subset is scored.