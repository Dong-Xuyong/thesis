---
article_number: 23
slug: riahi-madvar-2021-mi-subspace-outliers
pdf: Riahi_Madvar_2021_MI_Subspace_Outlier_Detection.pdf
extraction_status: ok
last_updated: 2026-06-26
---

# Raw PDF text — Article 23 (riahi-madvar-2021-mi-subspace-outliers)

- **Source PDF:** `Literature Review PDFs/06_Combinatorial_Optimisation_Anomaly_Detection/Riahi_Madvar_2021_MI_Subspace_Outlier_Detection.pdf`
- **Wiki source page:** [[../sources/riahi-madvar-2021-mi-subspace-outliers|riahi-madvar-2021-mi-subspace-outliers]]

## Extracted text

--- Page 1 ---
Knowledge-BasedSystems216(2021)106733
Contents lists available at ScienceDirect
Knowledge-BasedSystems
journal homepage: www.elsevier.com/locate/knosys
Anewdensity-basedsubspaceselectionmethodusingmutual
informationforhighdimensionaloutlierdetection
MahboobehRiahi-Madvar a,AhmadAkbariAzirani b,∗,BabakNasersharif c,
BijanRaahemi d
a School of Computer Engineering, Iran University of Science and Technology, Tehran, Iran
b School of Computer Engineering, Center of Excellence in Future Networks, Iran University of Science and Technology, Tehran, Iran
c Department of Computer Engineering, K.N. Toosi University of Technology, Tehran, Iran
d Knowledge Discovery and Data Mining Lab, University of Ottawa, Ottawa, Canada
a r t i c l e i n f o
Article history:
Received10October2020
Receivedinrevisedform19December2020
Accepted29December2020
Availableonline2January2021
Keywords:
Highdimensionaldata
Relevantsubspaceselection
Density-basedrepresentation
Maximum-Relevance-to-Density
minimum-Redundancy-Maximum-
Relevance-to-Density
Mutualinformation
a b s t r a c t
Outlier detection in high dimensional data faces the challenge of curse of dimensionality, where
irrelevantfeaturesmaypreventdetectionofoutliers.Inthisresearch,weproposeanovelefficient
unsuperviseddensity-basedsubspaceselectionforoutlierdetectionintheprojectedsubspace.First,
theMaximum-Relevance-to-Densityalgorithm(MRD)isproposedtoselecttherelevantsubspacebased
onthemutualinformation.Then,applyingtheconceptofredundancyamongfeatures,wepresent
anefficientrelevantsubspaceselectionmethodcalledminimum-Redundancy-Maximum-Relevance-
to-Density(mRMRD).Finally,thedegreeofoutliernessofdatapointsinthecorrespondingrelevant
subspace is computed based on Local Outlier Factor(LOF). Experimental results on both real and
synthetic data demonstrate that the proposed algorithms – based on MRD and mRMRD criteria –
increase the accuracy of outlier detection while reducing computational complexity and execution
time.Moreover,asthedimensionalityincreases,theaccuracyofoutlierdetectiononmRMRD-based
relevant subspace is higher than MRD-based relevant subspace. This verifies that the proposed
mRMRD-based subspace selection algorithm can efficiently select the subspace by considering the
relevancebetweenfeatures.
©2021ElsevierB.V.Allrightsreserved.
1. Introduction
Outlierdetectionisanimportantyetchallengingtaskindata
mining. Outlier detection refers to finding data points which
have significantly different characteristics thanthe majority of
thedata.Outlierdetectionhasextensiveapplicationsinvarious
areas such as fraud detection, fault detection, intrusion detec-
tion, biological analysis, marketing [1], medical diagnoses [2],
and bioinformatics data [3]. To achieve accurate and reliable
performancewithhighdimensionalandlargesamplesizedata,
humananalysisisnotsufficient[3],andassuch,itisessential
to provide automatic outlier detection methods. In real-world
applications, the outlier detection problem is an unsupervised
learningproblembecauseoutliersarerareandthedatalabeling
iscostly[2].
Outlierdetectionhasreceivedspecialattentioninmanyre-
searchareas,butmostoutlierdetectiontechniquesfacesignif-
icantchallengesonhighdimensionaldataduetothecurseof
∗ Correspondingauthor.
E-mail addresses: m_riahi@comp.iust.ac.ir(M.Riahi-Madvar),
akbari@iust.ac.ir(A.AkbariAzirani),bnasersharif@eetd.kntu.ac.ir
(B.Nasersharif),braahemi@uottawa.ca(B.Raahemi).
dimensionality.Thus,thereisadesirableneedtodeveloppow-
erfultheoreticalmethodologiesandpracticaltoolsforanalyzing
dataandreducingfeatures[3].Somerecentresearchesproposed
subspaceoutlierdetectionthatsearchoutliersinoneormorelow
dimensionalsubspacestoavoidthecurseofdimensionality[4].
Themainchallengeinsubspaceoutlierdetectionischoosing
therightsubspace[5]duetothecomputationalcomplexityof
thesubspacesearchinhighdimensionaldata,andtheunsuper-
vised nature of measuring relevance feature to outliers. Thus,
in order to select a near-optimal subspace, it is important to
address how to measure the relevance of features to outliers
usinganefficientalgorithmwithlinearcomplexitywhiledata
isnotlabeledandnoassumptionismadeonthedata.Inthis
work, a novel efficient subspace outlier detection algorithm is
proposed which includes two separate components: relevant
subspace selection; and outlier scoring. Similar to High Con-
trastSubspaces(HiCS)[6],thisseparationallowsustoinvestigate
anddevelopthetwocomponentsindependently.Thisstudyfo-
cuses on the relevant subspace selection for outlier detection
in high dimensional data. First, we present a novel density-
basedrepresentationwhichallowsunsupervisedsubspaceselec-
tion.Ourrelevantsubspaceselectionismotivatedbyselecting
https://doi.org/10.1016/j.knosys.2020.106733
0950-7051/©2021ElsevierB.V.Allrightsreserved.

--- Page 2 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
a compact subspace of features with maximum relevance to
outlierdetectionwhiletheyhaveminimumredundancyamong
themselves.Havingremovedirrelevantfeatures,outliersinhigh
dimensional data can be detected efficiently. To achieve such
a relevant subspace, we define two new mutual information-
based criteria Maximum-Relevance-to-Density and minimum-
Redundancy-Maximum-Relevance-to-Densitytoanalyzetherel-
evancedegreeofeachfeature.Italsoshowshowanincremental
algorithmcanbeusedtoselectthebestpossiblesubspaceac-
cording to the minimum-Redundancy-Maximum-Relevance-to-
Densitycriterion.Anydensity-basedoutlierscoringcanbeused
forrankingdatapoints.
Themaincontributionsandnoveltyofthisstudyaresumma-
rizedasfollows:
1. Proposinganefficientdensity-basedmethodforcompact
datarepresentationwhichallowsustoemployanunsu-
pervisedmutualinformation-basedsubspaceselection.The
newrepresentationusingdatareductionnotonlyimproves
theefficiencyofourproposedsubspaceselectionstrategy,
alsomakesitefficientforlargedatasets.
2. Combining supervised minimum-redundancy-maximum-
relevancecriterion[7]forfeatureselectionwithunsuper-
visedoutlierdetectionproblem.Usingtheconceptofdata
density,newcriteria(Maximum-Relevance-to-Densityand
minimum-Redundancy-Maximum-Relevance-to-Density)
aredevelopedtochooserelevantmutualinformation-based
subspaceinordertoselectasubsetofusefulandcompact
features.
3. Usinganincrementalsearchtofindarelevantsubspacefor
outlierdetection,wherearelevantcompactsubspacecan
becomputedatalowcost.
4. Conductingseveralexperimentstocomparetheproposed
method with previous arts. Analysis of the experiments
indicatesthatourapproachsignificantlyoutperformsthe
previousmethodsmentionedintheliteratureintermsof
accuracyandexecutiontime.
Therestofthepaperisstructuredasfollows:InSection2,
areviewoftherelatedworksispresented.InSection3,mutual
informationisbrieflyreviewed.Section4describestheproposed
density-basedoutlierdetectionincludingourdensity-basedrep-
resentationandtwonewrelevantsubspaceselectionalgorithms
based on Maximum-Relevance-to-Density and minimum-
Redundancy-Maximum-to-Density criteria. The experimental
studies and analyses of the results are explained in Section 5,
followedbydiscussionsinSection6.Finally,Section7concludes
thepaperandpresentslimitationsandfuturedirections.
2. Related works
Outlierdetectionmethodscanbedividedintothreecategories
according to the availability of data labels: supervised, semi-
supervised,andunsupervised[8].Insupervisedmethods,dataare
labeledasnormalandoutlier.Insemi-supervisedmethods,all
dataareconsideredtobenormal[9].Inunsupervisedtechniques,
dataisnotlabeled.Inthesetechniques,itisassumedthatoutliers
arefarfromotherdata.Thesupervisedtechniquesarelesspracti-
calforoutlierdetectionasitisdifficulttocollectalabeleddataset
whichcoversthefulloutlierbehavior.
Considering the dimensions of data, outlier detection algo-
rithmsaredividedintotwocategories:full-spaceandsubspace.
Full-space unsupervised outlier detection techniques can be
roughlycategorizedintothefollowingmaingroups:clustering-
based,statistical-based,andthenearestneighbor-basedmethods,
dependingontheassumptionsconsideredtomodeloutliers[2,8].
Deeplearningisarecentframeworkwiththeabilityoffeature
representation in the abstract level [3]. Also, deep neural net-
workshavebeenstudiedintheoutlierdetectionproblem[8,9].In
clustering-basedtechniques,datathatdonotbelongtoanyclus-
ter,orbelongtoaverysmallcluster,areconsideredasoutliers.
Instatistical-basedtechniques[10],itisassumedthatthedata
fitastatisticalmodel,thenatestisperformedtodeterminethe
datapointswhichdonotfitintheassumedmodel.Inthenearest
neighbor-basedmethods,eachdatapointisanalyzedbasedon
itslocalneighborhood.Thenearestneighbormethodsareeither
distance-based or density-based depending on which criterion
is used to identify the nearest neighbors and outliers [11]. In
the distance-based methods, a data point that is far from its
nearestneighborsisregardedasanoutlier.Theperformanceof
thesemethodswouldbepoorwhendifferentdataregionshave
varyingdensities.Thedensity-basedmethodscalculatenotonly
the local density of each data point but also the local density
ofitsneighboringpoints.Ifthedensityofadatapointismuch
lowerthanitsneighboringpoints,itisconsideredanoutlier[12].
Outlierdetectiontechniquescouldalsobecategorizedintolocal
and global based on their reference set size. The well-known
LocalOutlierFactorscoringalgorithm[13]isalocaldensity-based
outlierdetectionmethodwhichassignsalocaloutlierscoreto
eachdatapoint.TheLOFscoreisdescribedforeverydatapoint
bytheratiobetweentheaveragedensityofitsneighborsandits
ownlocaldensity.
Traditionaloutlierdetectiontechniquesusefull-dimensional
space, and therefore, fail to effectively detect outliers in high
dimensional data, because of the curse of dimensionality. The
presenceofmanyirrelevantfeaturesinhighdimensionaldata
concealsrelevantinformation,andtherefore,theoutliercaneas-
ily be masked [5]. The subspace-based techniques search out-
liersinlowerdimensionsubspacestoalleviatetheeffectofthe
‘‘curse of dimensionality’’. In these methods, finding a lower-
dimensional subspace that can distinguish outliers from other
dataischallengingduetodifficultiesinmeasuringtherelevance
ofafeature tooutliersandalso,finding asetoffeaturesthat
are related to all outliers. Furthermore, these methods have a
highcomputationalcomplexitybecauseoftheneedforsearching
subspacesinhighdimensionaldataspaces.
Subspacemethodsweredevelopedintwocategoriesofsparse
methods [14–16] and relevant subspace methods [6,17–19].
Sparsesubspacetechniquessearchoutliersinlower-dimensional
subspaces. In these methods, all data points in high dimen-
sional datasets are mapped to one or more sparse and lower-
dimensionalsubspace.Then,datapointsinsparsesubspacewith
a density lower than the mean are recognized as outliers. In
the subspace outlier detection method, Aggarwal [14] used a
gridrepresentationtocalculatethesparsitycoefficientsofdiffer-
entsubspaces,thenimprovedsearchingforoutliersbyutilizing
thegeneticalgorithmtosearchforsparsesubspacesefficiently.
However, the efficiency of the genetic algorithm depends on
various parameters such as initial population, fitness function,
andsuch[20].Therefore,thegeneticalgorithmcannotguarantee
thecompletenessofthesearchresults.In[15],authorsensurethe
completenessofsearchresultsbyutilizingtheconceptlatticeas
atoolforsubspacerepresentationandintroducingthedensity
coefficient to measure outliers in low dimensional subspaces.
However, constructing a concept lattice of subspaces is com-
plex and leads to low efficiency [21]. In contrast, researchers
in[4,14,15]searchedforsparsesubspacesconsideringtheentire
datapointsinthedataset.Zhao[16]hasproposedalocaloutlier
detectionalgorithm(LOMA)basedonfeaturerelevanceanalysis
tooutliers.LOMAusesfeaturerelevanceanalysiswithasparsity
factorthresholdtoprunesirrelevantdimensionsanddatapoints
in the dataset. This method uses particle swarm optimization
onthereduceddatasettosearchforthesparsesubspace.LOMA
2

--- Page 3 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
prunesirrelevantdatapointsandreducesfeatures.Consequently,
itisefficientonthehighdimensionaldataset,butitsaccuracy
islimited.Asstatedinthework[22],thebestperformanceof
LOMAisachievedwhenthesparsethresholdfactorislow.In[23],
the authors developed a parallel LOMA computing framework
thatleveragesMapreduceprogrammingmodeltohandlerapidly
increasingsizeofdata.
Relevantsubspaceoutlierdetectiontechniquescreateoneor
more subspace including some meaningful dimensions which
highlightoutliers.Infact,outliersareoftenrepresentedbytheir
unusuallocalbehaviorsinthelower-dimensionalsubspaces[20].
IntheSubspaceOutlierDetectionmethod(SOD)[17]areference
setisdeterminedusingthesharednearestneighborforeachdata
point.Therelevantsubspaceisspecifiedusingdimensionswhere
datapointsinthereferencesethavealowvariance.Subspace
outlierdegreeisdefinedasthedistancebetweenthedatapoint
and its relevant subspace hyperplane. In many cases, this ap-
proachfacesproblemsasitignorestheinteractionsamongthe
dimensions[24],andalsoSODsuffersfrompoorscalability[2].In
similarresearchtoSOD,CorrelationOutlierProbability(COP)[25]
usesprincipalcomponentanalysisinlocaldatatolookforthe
arbitrarilyorientedsubspacesoflowestvarianceanddetermines
outliersbasedonthedeviationfromthelocaldatadistribution.
In COP, the number of local data should be large enough to
revealthedeviation,andalsothisapproachcanonlyhandlesitu-
ationswhencorrelationbehaviorislinearinthelocaldataset.In
theLocalProjection-basedOutlierDetection(LPOD)method[26]
for determining the outliers, the nuclear norm of the neigh-
borhood is used as local projection score(LPS) to measure the
divergencedegreeoftheneighborhood.TheLPSisestimatedby
projectingtheneighborhooddatapointsintoalow-dimensional
subspace,whichisobtainedbythetechniqueoflow-rankma-
trix approximation. The larger LPS indicates the neighborhood
of the data point is sparser and has a higher probability of
being an outlier. It is difficult to define a suitable LPS thresh-
old to identify outliers thus data points with high scores are
considered as outliers. OUTRES [18] searches a set of relevant
subspaces which are non-uniformly distributed using bottom-
up searching. The Kolmogorov–Smirnov statistical test is used
toevaluatetheuniformityofdistributionsubspacesandassigns
non-uniform distribution subspaces to a set of relevant sub-
spaces.Thisapproachprovidesanadaptivedensitymeasurewith
comparableoutliernessvaluesoverarbitrarysubspaces.OUTRES
requiresmanylocaldatasetstocomputeoutlierness.Additionally,
itspoorscalabilityonlargehighdimensionaldatasetduetoexpo-
nentialcomplexitytothenumberofdimensionsisaproblemof
thismethod.In[27],theauthorsextractfeaturegroupsfromhigh
dimensionsthroughmeasuringthecorrelationsamongfeatures.
Thedatapointswithhighoutlierscoreswithrespecttoafeature
groupareconsideredasoutliers.
The computational complexity of OUTRES algorithm is ex-
ponential to the number of dimensions. In the HiCS [6] and
CumulativeMutualInformation(CMI)[28]studies,assumingthe
dimensions’independenceinthesubspace,thesubspacecontrast
ismeasuredbyquantifyingthecorrelationdegreeofsubspace
dimensions and search high contrast subspaces. In HiCS [6],
the subspace contrast criterion is measured using mutual in-
formation via Monte Carlo estimation. Then, the LOF outlier
scoring approach is applied to the data points in high con-
trastsubspacestodeterminetheoutliernessofthedatapoints.
Unlike the decoupling of subspace search and outlier ranking
inHiCS[6],SparseModeling-basedSequentialEnsembleLearn-
ing)SEMSE) [29] uses a sequential ensemble-based framework
to mutually refine feature selection and outlier detection via
performingiterativesparsemodeling,inwhichtheoutlierscores
areconsideredasthetargetfeature,whiletheoriginalfeatures
arethepredictors.
ThesubspacecontrastcriterioninHiCSmaybeconsideredas
mutualinformationMonteCarloestimationwhichiscalculated
asthedifferencebetweenconditionalandmarginaldistribution
inarandomdimensionoftheconsideredsubspace.Thisrandom
selectionofthedimensionmayleadtothelossofrelevantsub-
spaces[28].Tosolvethisproblem,CMI[28]usedanewconceptof
mutualinformationcalledCumulativeMutualInformationwhich
isbasedonthecumulativedistributionofsubspaces.Insearchof
relevantsubspaces,theauthorsin[30]introducedadimension-
based measure of subspace quality in addition to taking into
account the relationship among subspaces, allowing for a dif-
ferentiatedviewonasubspace.Theindependenceassumption
in these works [6,28,30] may not be valid, because some fea-
turesmaybestronglyrelatedtooutliersbutdonothaveany
dependencyonotherfeatures.Theapproachesin[31,32]used
mutual information to measure dependency between features
andoutliers.Itshouldbementionedthatthesefeatureselection
algorithmsforoutlierandanomalydetectionaresupervised.In
CAOS[19],arelevantsubspace-basedcontextualoutlierdetec-
tionusinglocalsparsenessofdimensionsisproposedforhigh
dimensionalandmassivedatasetswhichtherelevantsubspace
isconstitutedbydimensionswithlocalsparsenesslargerthana
threshold.Also,aformulaforcomputingprobabilityLOFinthe
relevantsubspaceisdefinedtomeasuretheoutliernessofdata
pointsthatdonotfollowthedistributionofthelocaldataset.
Severalefficientalgorithmshavealreadybeenproposedfor
highdimensionaloutlierdetection.Incontrasttothosemethods,
wedeviseanunsupervisedalgorithmtoefficientlyselectrele-
vantsubspaceforoutlierdetectionwithoutanypre-assumptions
aboutfeatures,anddatadistribution,whileprovidinglowcom-
putationalcomplexity.Toachievethisgoal,wepresenttwonew
unsupervisedcriteria,basedonthenotionofmutualinformation,
toquantifytherelevancedegreeofafeature.Withintroducing
anewdensity-basedrepresentation,featureselectionbecomes
possible without requiring labeled data. Mutual information is
computedusingalldimensionsofthecandidatesubspaceandnot
bytherandomselectionofsomedimensionsfromthatsubspace.
Ouralgorithmutilizesanincrementalsearchtofindacompact
subsetofrelevantfeatures.
3. Mutual information
Mutualinformation(MI)isadependencymeasurewhichis
widely used in pattern recognition, feature selection, and fea-
turerankingproblems[7,33,34].Itmaybeusedtomeasurethe
relevanceofeachfeatureandtheredundancyamongfeatures.
MIhastwopropertiesthatdistinguishitfromotherdependency
measures: first, it can measure any kind of relations between
variables. Second, it is invariant under space transformations.
It can analyze any kind of dependency between two random
variables.
Thegoalofmutualinformationistoquantifytheamountof
informationthattwovariablesshare.Whentwovariables Aand
B share the same information, their mutual information value
becomeslarge,theyarehighlycorrelated,andasaresult,one
variablecanbereplacedbytheotherone.Iftwovariables Aand B
areindependent,then Adoesnotcontainanyinformationabout
Bandviceversa,andasaresult,theirmutualinformationvalue
iszero.
Definition 1. Let X and Y be a pair of random variables with
discretevalues,themutualinformation I(A, B)between Aand B
isdefinedas
I(A; B) =
∑
a∈A
∑
b∈B
pA,B(a, b)log pA,B(a, b)
pA(a)pB(b)
(1)
3

--- Page 4 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
pA(a) =
∑
b∈B
pA,B(a, b) (2)
pB(b) =
∑
a∈A
pA,B(a, b) (3)
where pA,B(a, b)isthejointprobabilityfunctionof Aand B, pA(a)
and pB(b) are the marginal probability functions ofA and B,
respectively.
This measure is non-negative (I(A; B) ≥ 0) and symmetric
(I(A; B) = I(B; A)).
MutualinformationcanbeexpressedintermsofKullback–
Leiblerdivergencebetweenthejointdistributionoftworandom
variablesandtheproductoftheirmarginaldistributionsthatis,
I(A; B) = DKL(pA,B(a, b) ∥ pA(a)pB(b)).
Mutual information also can be denoted as the expected
Kullback–Leiblerdivergencebetweentheconditionaldistribution
pA|B(a)andunivariatedistribution pA(a),thehigherdifferencein
thedistributions pA|B(a)and pA(a),thelargerinformationgain.In
HiCS[6],highcontrastsubspacesareidentifiedusingtheMonte
CarloestimationofEq.(4).
I(A; B) = EB[DKL(pA|B(a) ∥ pA(a))] (4)
4. The proposed method
Inthissection,wepresentanovelunsuperviseddensity-based
subspace outlier detection, which takes advantage of unsuper-
visedfeatureselectioninhighdimensionaldataforoutlierde-
tection.Tochoosearelevantsubspacethatincludesrelevantfea-
tures,newalgorithmsbasedonMaximum-Relevance-to-Density
andminimum-Redundancy-Maximum-Relevance-to-Densitycri-
teriaofrelevantareproposed.Then,outliersaredetectedinthe
correspondingsubspaceprojection.
Todescribeouralgorithm,wefirstintroducesomesymbolsas
listedinTable1.Letmatrix DN×Mbetheinputdataset,where N
isthenumberofdatapointsand Misthenumberoffeatures.The
ithrowinthematrix DN×Mcorrespondsto ithdatapoint Xiwhich
isarowvectorinfull M-dimensionalspacecontainingMfeatures
F = {f1, f2, . . . ,fM }.Thus,thedatapoint Xicanberepresentedas
Xi = (Xi1, Xi2, . . . ,XiM).Let fj ∈ RN denotethe jthdatafeature,
correspondingtothe jthcolumninD.
Thepurposeofoursubspaceselectionistochoosearelevant
subspace which is referred to asFs. The selected subspaceFs
consists ofm features, Fs = {fs1, fs2, . . . ,fsm} ⊂ F such that
m < M.Thesubspace Fsshouldbeselectedsuchthatitimproves
outlierdetectionperformancecomparedtotheperformanceon
thefullfeaturespace F.Somefrequentlyusedsymbolsinthis
studyarelistedinTable1.
Fig.1summarizesthemainstepsofourmethod.Datanor-
malization(orfeaturescaling)isanessentialpre-processingstep
inoutlierdetectionbecausefeatureswithlargervaluesdominate
otherswhencalculatingdistancesbetweendatapoints,oridenti-
fyingthenearestneighbors.Themin–maxnormalizationmethod,
which normalizes each feature to the interval [0, 1] is used
routinelyinoutlierdetection[35].Themin–maxnormalization
performsthefollowingtransformationonfeaturevalues f:
f ∗ = f −min(f)
max(f) −min(f)
(5)
wheremin( f)andmax( f)aretheminimumandmaximumvalues
offeature f,respectively.
Whenallfeatures(eachcolumnofdatamatrix)arenormal-
ized,thenthedatamatrix DN×Mistransformedto D∗
N×M.Inthis
study,similartoHiCS[6],therelevantsubspaceselectionstep
andoutlierscoringareinvestigatedseparatelytoaccomplisha
detailedanalysisofeachaspectofthestudy.Here,wefocuson
therelevantsubspaceselectionproblem.Thecoreoftheproposed
outlierdetectionalgorithmconsistsoftwostepsnamelydensity-
basedrepresentationandMRD/mRMRD-basedrelevantsubspace
selection(seeFig.1).Thefollowingsub-sectionsexplaineachstep
indetail.
4.1. New density-based representation
Thisproposedrepresentationisagoodwaytopresentstatisti-
calcharacteristicsoffeatureswhichusesagrid-basedpartitioning
method to estimate probability density function for different
features. To generate the grid, each feature is divided intop
equal width segments. According to the minimum and maxi-
mumvaluesofthefeature f ∗
j thatare0and1respectively,the
widthofeachsegmentfor jthfeatureinthedatamatrix D∗
N×Mis
determinedasfollows:
widthj =1
p
(6)
Here,equalwidthsegmentsareusedfordividingeachfeature
sothatthedensityvaluesindifferentsegmentstobecomparable.
By dividing allM features intop segments, pM M-dimensional
cubesaregenerated.
Definition 2.Eachcube ccanberepresentedasan M-dimensional
orderedlist idc =(g1, g2, . . . ,gM)where1 ≤ gj ≤ pindicatesin
whichsegmentnumber(from1to p)cube con jthfeaturelies.
Everydatapointinthenormalizeddatasetliesinoneandonly
oneofthese pMcubes.Todetermineinwhichcubedatapoint X ∗
i
islocated,thesegmentnumberinwhich X ∗
i liesalongthefeature
jshouldbedeterminedforeachfeature jregarding widthjand X ∗
ij
values.Thus, M-dimensionaldatapoint X ∗
i inoriginalspaceis
mappedto M-dimensionaldiscretedatapointthatcorresponds
tocube idliesin( RM → Z +M).
After discretization and partitioning, we will compute the
datadistribution.Thedatapointsineachcubearegroupedand
summarizedbydensitytodescribedatadistribution.Thismethod
can use any density measure, the point of applying a simple
countingdatapointineverycubeistospeedupcomputation
andgetdensityasadiscretetargetvariable.Forcomputingcubes
density,everydatapoint X ∗
i ismappedtothecube idthatliesin
i.e. X ∗
i → idc(datapoint X ∗
i liesinthecube c).
Forcountingthenumberofdatapointsinthecube c,thedata
pointswiththesame idcaremergedanddensityiscomputedas
follows:
dc = Numberofdatapointswithsameid c (7)
Definition 3. Thenewdataset DG isobtainedbymergingdata
pointswiththesame idc:
DG = {(idc1 , dc1),(idc2 , dc2), . . .(idcNE , dcNE)}
where(∀idci , idcj)idci ̸= idcj and NE
= The number of non − empty cubes
(8)
whereeachdatapointin DGisrepresentedas( idci , dci)that idci
is ithnon-emptycube(containsatleastonedatapoint)and dciis
thedensityofthatcube( dci ∈= {1,2, . . . ,N}).Accordingly,the
dataset Dinfulldimensionalspace Fistransformedintoanew
dataset DGinthespace G.
Algorithm1describestheprocedureoftheproposeddensity-
basedrepresentation.
4

--- Page 5 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
Table 1
Descriptionoffrequentlyusedsymbolsinthisstudy.
Symbol Description Symbol Description
DN×M Inputdatasetasdatamatrix D widthj Widthofeachsegmentof jthfeature
N Numberofdatapointsinthedataset idc Cubeid c
M Numberoffeatures G Newfeaturespace
F FulldimensionalspacecontainingMfeatures gj jthfeatureinspaceG
fj jthfeatureinspaceF( jthcolumninmatrix D) dc Densityofcube c
Xi ithdatapointinthedatamatrix D D G InputdatasetinfeaturespaceG
Fs Relevantsubspace NE Numberofnon-emptycubes
fsj jthselectedfeature gsj jthselectedfeatureinfeaturespace G
m Numberofdimensioninrelevantsubspace Gs Selectedsubspacefromfeaturespace G
f ∗ Normalizedfeature f I Mutualinformation
D∗
N×M Normalizedmatrix DN×M gl lthfeatureinspace G
p Numberofsegmentsforeachfeature □ij (i, j)entryinmatrix □
f ∗
j Normalizedfeature fj □_val Valuesofavariable(e.g. dc_val)
Algorithm1AnovelalgorithmforDensity-basedData
RepresentationDDR(D ∗,p)
Input:Thedatamatrix D∗includes Nsamples(rows)with M
dimensions,numberofsegments pforeachfeature.
Output:TheDataset DG.
(1)TransformeachdatapointX ∗
i =(x∗
i1, x∗
i2, . . . ,x∗
iM)where
X ∗
i ∈ D∗to idc =(g1, g2, . . . ,gM)
gj =
⌈ x∗
ij−min(f ∗
j )
widthj
⌉
=
⌈ x∗
ij
widthj
⌉
where widthj = 1
p
(2)Generateanewdataset DGasfollow:
• Mergedatapointswiththesame idc:
dc = count of data points with id c
• DG = {(idc1 , dc1),(idc2 , dc2), . . .(idcNE , dcNE)}
where NE=The number of non −empty cubesand( ∀idci , idcj ∈
DG)( idci ̸= idcj)
(3) ReturnDatasetDG.
Theprimaryadvantagesofthisrepresentationarelistedbe-
low:
Compressed representation of the data: Giventhatinreal-
world datasets, the features have different distributions, some
featuresmayhavelargegaps(segmentswithnodatapoints)and
afewsegmentsmaycontaindatapoints.Inthisrepresentation,
dataarerepresentedonlyusingcubescontainingatleastonedata
point.Therefore,thenumberofinstancesinthisrepresentation
equals the number of non-empty cubes and therefore, a data
reduction is performed before applying relevant subspace se-
lection.Whereasgrid-basedoutlierdetectionmethods[4,14,16]
to measure the effectiveness of a multi-dimensional subspace,
count and use the number of data points in all cubes. Thus,
thecomputationalcomplexityofthesemethodsdependsonthe
totalnumberofcubes(exponentialcomplexityinthenumberof
features).However,ourdensity-basedrepresentationconsiders
onlynon-emptycubesthatreducethenumberofdatapointsin
newspace Gaswellasreducesthecomputationalcomplexityof
therelevantsubspacealgorithm.
Feature discretization: In most cases, computational com-
plexityis importantin machinelearning anddata mining. For
computingmutualinformationbetweentwodiscretevariables,
theestimationofthejointprobabilitiesbetweendiscretevari-
ablesisstraightforward,justsimplecountingofthefrequency
ofallpossiblecombinationsoftwovariablesisrequired.While
estimatingmutualinformationisnotalwayseasy.Onrealvalue
datasets, this estimation is more complex because most real
numberswillnotbefoundinadatasetofanysizes[36].Inthis
representation, features with real values in original space are
transformedtodiscretevaluesincluding idanddensityofcubes.
Hence, this method improves the time performance, accuracy,
andcomprehensionoftheanalysismethods.
Fig. 1. Theproposedprocessofdensity-basedsubspaceoutlierdetection.
Calculating the density target variable: Supervisedfeature
selectionmethod[7]measuresredundancyamongfeaturesusing
mutualinformation,whilerelevanceismeasuredbythemutual
informationbetweenfeaturesandclasslabels.Thetruenatureof
outlierdetectionisunsupervisedsincedatalabelsarenotavail-
able.Asmentionedintherelatedworkssection,variousmeasures
such as density, distribution, sparsity, etc. have been used to
measuretherelevancebetweenfeaturesandoutliers[16,18,19].
Inthisstudy,tomeasuretherelevancebetweenafeatureand
outliersweaimedtousedensitythroughthatfeature.Therefore,
5

--- Page 6 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
in this representation, it is suggested that the density of data
in each cube is computed by partitioning and this density is
used as the target variable to select the relevant subspace for
outlier detection. Thus, we present a novel representation in
datadensityspacemakesitpossiblethatthemRMRsupervised
criterion [7] can be used in unsupervised outlier detection for
highdimensionaldata.
4.2. Mutual information-based subspace selection
Giventhedataset DGandfeatureset G = {g1, g2, . . . ,gM },the
mutualinformation-basedsubspace selectionalgorithmaimto
selectasubsetoffeatures Gs = {gs1 , gs2 , . . . ,gsm } ⊂Gthenthe
relevantsubspacecanbeobtainedaccordingtotheone-to-one
correspondencebetweentheindexoffeaturesinspace Fandthe
featureindicesinspace G.Inthefollowing,thedensity-basedun-
supervisedsubspaceselectionalgorithmsusingMRDandmRMRD
criteriaaregivenin4-2-1and4-2-2sections,respectively.
4.2.1. MRD-based subspace selection
TheMaximum-Relevance-to-Density-basedsubspacemethod
is intended to select features that have the maximum depen-
dencyonthetargetvariabledensity.Thedependencybetween
feature gjandthetargetvariable dcismeasuredusingthemutual
informationcriterion I(gj, dc).
Definition 4.MRDcriterionbetweenindividualfeature gjandthe
targetvariable dccanbeindicatedasfollows:
max
Gs
D(Gs, dc), D = 1
|Gs|
∑
gj∈Gs
I(gj; dc)
= 1
|Gs|
∑
gj∈Gs
[
∑
dc_val∈dc
∑
gj_val∈gj
pdc ,gj(dc_val, gj_val) ∗log
×
pdc ,gj(dc_val, gj_val)
pdc(dc_val)pgj(gj_val)]
(9)
where |Gs|isthenumberofselectedfeaturesinthesubset Gs.
The basic idea behind MRD relevance criterion is to select
a feature that has more density changes i.e. the data is more
variableinthatfeature.However,ifthevariabilityofdatadensity
issolowthatthedatadistributionfollowsauniformdistribution,
themutualinformationbetweendensityandvaluesofthatfea-
tureinthenewspacewillbezero.Thus,accordingtotheMRD
criterion,therearenotanyrelationsbetweenthatfeatureand
outliers.
Therelevantsubsetfeature Fsisfoundbysortingfeaturesin
Gintermsoftherelevancetothetargetvariabledensityand
selectingthe mhighestrelevancefeaturesaccordingtoMRDcor-
respondstospace F.Inalgorithm2,theprocedureofMRD-based
unsupervisedrelevantsubspaceselectionisgiven.
Algorithm 2MaximalRelevancetoDensity-basedunsupervised
subspaceselectionforhighdimensionaloutlierdetection:
MRDUSS(DG, m, F).
Input:Adataset DGwhereeachdatapointcontaining Mfeatures
G = {g1, g2, . . . ,gM }andatargetvariable dc.
m:thesizeofrelevantsubspaceF Sthatwewanttoselect .
F:Fullfeaturesintheoriginalfeaturespace .
Output:Aselectedsubsetofrelevantfeatures Fs ⊂ F .
(1)Initialization:SetG ← {g1, g2, . . . ,gM }.
(2)Computemutualinformation I(gi, dc)foreachfeatureg i ∈
GasgiveninEq. (1).
(3)SelectG sas mfeatures giwiththelargest I(gi, dc).
(4)ReturnF SaccordingtoG s.
4.2.2. mRMRD-based subspace selection
TheobjectiveofmRMR-basedsupervisedfeatureselection[7]
is to select a feature set which jointly has the largest depen-
dencyonthetargetclassthatinvolvedjointlyprobabilitymul-
tivariate.TheyfoundthatthecombinationofMax-Relevanceand
min-Redundancycriteriaisabettermethodformaximizingde-
pendency.ThemRMR-basedsupervisedfeatureselectionselects
featuresthathavethemaximaldependencyofthetargetclass
while having minimal redundancy among them. This criterion
helpstoselectasetoffeaturesataverylowcost.
TheproposedMax-Relevance-to-Densitymethodtriestose-
lect a feature subspace with maximal relevance to the target
variable dc.But,theMRDcriterionmaynotbeeffectivebecause
itselectsfeaturesthatcouldhavehighredundancyinspace G.
Infact,thedependencyamongdistributionsofthesefeaturesin
theoriginalspace F islarge.Therefore,wewouldliketoselect
asubsetoffeaturesthathaveminimalredundancyamongtheir
distributions.Theredundancyamongfeaturesinspace Giscom-
putedusingmutualinformationandtheminimumRedundancy
(mR)criterionisexpressedasfollows:
min
Gs
R(Gs), R(Gs), = 1
|Gs|2
∑
gj,gl∈Gs
I(gj, gl) (10)
ThemRMRDcriterion,bycombiningmRandMRDcriteriatries
toselectfeaturesthatnotonlyhaveahighcorrelationwiththe
densitytargetvariablebutalsominimizetheredundancyamong
them(theirdistributionsinoriginalspace F).
Definition 5. ThemRMRDcriterionisacombinationofthecri-
teriamRandMRDinEqs.(9)and(10)andisdefinedasfollows:
max Φ(D, R), Φ = D − R = 1
|Gs|
∑
gj∈Gs
I(gj; dc) − 1
|Gs|2
∑
gj,gl∈Gs
I(gj, gl)
(11)
The rationale behind the mRMRDselection criterion is that
inadditiontomaximizingrelevance,considerstherelationship
amongfeatures.Thatis,featureshavingsimilardistributionto
thealreadyselectedfeaturesarelesslikelytobeselected.Notice
thatthepurposeofthemRMRDcriterionisnottoselectindepen-
dentfeaturesbutateachstep,ittriestoselectonefeaturethat
minimizesredundancyandmaximizesrelevance.
The number of candidate subspaces (2M −1) increases ex-
ponentiallywiththeincreaseindimensionality( M).Therefore,
the mRMRD algorithm uses the first-order incremental search
methodtofindnear-optimalfeaturesdefinedby Φwhichadds
onefeatureatonetime.Suppose Gsbeasetoffeaturesthatare
selectedat t −1previoussteps, tthfeatureisselectedaccording
totheEq.(12)fromtheset G − Gs:
ℓt =arg max
gj∈G−Gs
⎛
⎝I(gj, dc) − 1
t −1
∑
gl∈Gs
I(gj, gl)
⎞
⎠ (12)
Inthismethod,thefirstfeatureintherelevantsubspaceis
selectedusingmutualinformationsuchthatithasthehighest
dependencyonthetargetvariable dc.Algorithm3describesthe
mRMRD-basedrelevantsubspaceselectionprocedure.
4.3. Data mapping and outlier scoring
In high dimensional data, some outliers may be lost in the
presenceofalargenumberofirrelevantfeatures.Weproposeda
relevantsubspaceselectionmethodforoutlierdetectionsothat
mostoutlierscanbedetected.Oncetherelevantsubspacehas
6

--- Page 7 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
beenselected,itisnecessarytoevaluatetheefficiencyofthissub-
spaceinoutlierdetection.Forthispurpose,highdimensionaldata
intheoriginalspacearemappedtolower-dimensionalrelevant
subspace.Inthislower-dimensional
Algorithm 3minimalRedundancyMaximalRelevancetoDensity
unsupervisedsubspaceselectionforhighdimensional
outlierdetection: mRMRDUSS(DG, m, F).
Input:Adataset DGwhereeachdatapointcontaining Mfeatures
G = {g1, g2, . . . ,gM }andatargetvariable dc.
m:ThesizeofrelevantsubspaceF Sthatwewanttoselect .
F:Fullfeaturesinoriginalfeaturespace .
Output:Aselectedsubsetofrelevantfeatures Fs ⊂ F .
(1)Initialization:Set G ← {g1, g2, . . . ,gM }andt ←1.
(2)Computemutualinformationwiththedensityvariable:
• foreachfeatureg j ∈ Gcompute I(gj, dc)asgiveninthe
Eq.(1).
(3)Selectthefirstfeature:G s ← argmaxgj∈G I(gj, dc).
(4)GreedySelection:
Repeatuntil |Gs|= m
a.t ←t +1
b. ℓt =argmax gi∈G−Gs
(
I(gi, dc) − 1
t−1
∑
gj∈Gs I(gi, gj)
)
c.Gs ← Gs ∪ {ℓt }.
(5)ReturnF saccordingtoG s.
subspace,wewouldliketoidentifyoutliers.Therefore,ascoring
methodshouldbeappliedtothemappeddataintherelevant
subspace to measure the outlierness of data points. Different
experimentsin[37]showthatdensity-basedoutlierdetectionhas
thebestperformance.Thus,weusedLOFoutlierscoring[13]to
evaluatetheproposedrelevantsubspaceselectionalgorithm.
Intheabovesubsections,thestepsofouralgorithmwithafo-
cusondensity-basedrepresentationandrelevantsubspaceselec-
tionareexplained.Now,inalgorithm4thesestepsareintegrated
and the general procedure of the proposed high dimensional
outlierdetectionmethodisgiven.
Algorithm 4Density-basedSubspaceOutlierDetection:
DSOD(D, m, p, k).
Input:Thedatamatrix Dincludes Nsmples(rows)with M
dimensions(columns),numberofselectedfeatures m,
numberofsegments pforeachfeature , kisnumberofnearest
neighborsinLOFalgorithm .
Outlier:Outliersdatapoints .
(1)Usingmin-maxnormalization ,transformdatamatrix Dto D∗:
•foreachfeature(column) fin D:
f ∗ = f −min(f)
max(f)−min(f)
(2)ApplyingDensity-basedrepresentation(Algorithm1)on
normalizeddatamatrix D∗togetthenewdataset DG:
GDR(D∗, m, p).
(3)Selectarelevantsubspace Fsforoutlierdetectionusingoneof
algorithms2or3( MRDUSS(DG, m, F)or mRMRDUSS(DG, m, F)).
(4)Mapdatamatrix D∗ontherelevantsubspace Fstogenerate
datamatrix D∗
Fs .
(5)ComputeLOFscoreforeachpoint(row) Y ∗
i indatamatrix D∗
Fs:
LOF(Y ∗
i , k)
(6)DetectoutlierdatapointsgivenasLOFscorevaluesinthe
previousstep .
5. Experimental results and analysis
Inthissection,theperformanceoftheproposedmethodis
evaluated through experiments on synthetic and real datasets
fromtheUCIrepository[38],andcomparedwithLOF[13],SOD
[17],andHiCS[6]methods.
Table 2
Descriptionoftherealdatasetsinourexperiments.
Dataset Numberof
instances
Numberofoutlier
datapoints
Numberof
dimensions
Reuters-21578 6414 100 17870
20Newsgroups 1218 50 13876
Musk 5646 65 166
MNIST 7603 700 100
Breast 198 47 33
Ionosphere 351 126 32
Breast(Diagnostic) 569 212 30
Pendigit16 6870 156 16
Diabetes 768 268 8
Glass 214 9 7
Ann-thyroid 3772 93 6
5.1. Experimental setup
TheproposedalgorithmwasimplementedinPythonlanguage
on a system with an Intel
R⃝ CoreTM i7 CPU, 32 GB RAM, and
Ubuntu16.06operatingsystem.
Datasets:Theexperimentswereconductedonbothrealand
syntheticdatasets.Toanalyzealgorithms,weusedrealdatasets
fromtheUCImachinelearningrepository[38]includingMusk,
MNIST,Breast,Ionosphere,BreastCancerWisconsin(Diagnostic),
Pendigits16,Diabetes,Glass,andThyroid(ANNversion)whichare
describedinTable2.Also,weusetwohighdimensionaldatasets
namely20Newsgroups1andReuters-215782thatareusedin[39]
forclusteringhighdimensionaldata.Thesedatasetsarenotorig-
inallydesignedforoutlieranalysis,therefore,wepreparethem
similar to [40] for outlier detection problem. These text input
datasets need to be pre-processed to obtain effective features
foroutlierdetection.Similarto[39],weusemultipleprocesses
involved in lower casing, stop words removal, and stemming.
Once preprocessing is done, the features are extracted using
TF–IDF—termfrequency–inversedocumentfrequency.Somesyn-
thetic datasets are generated similar to the works [17,25,41]
consistingof5000datapointsthathave10,15,20,25,30,35,
40,50,60,80,100,150,and200dimensionsandeachofthese
datasetscontain50outlierdatapoints.Thesesyntheticdatasets
include5relateddimensionsgeneratedusingaGaussianMixture
Modelandexponentialdistributionsandotherdimensionsus-
inguniformdistributionandGaussiandistributionwithdifferent
meanandvarianceonrelevantdimensions.
TheareaundertheROCcurve(ROC)wasusedforevaluating
the performance of outlier detection methods. In the experi-
ments,theproposedmethodwascomparedagainstseveralstate-
of-the-artoutlierdetectionalgorithmsLOF[13],SOD[17],and
HiCS[6]usingAUCandruntimemeasures.
5.2. Performance evaluations
5.2.1. Results on real datasets
TheHiCSmethodparametersweretunedto M = 50, α=
0.1and candidate_cutoff = 100 following its authors’ recom-
mendation [6]. The parameterMinPts which is the number of
neighborsinallthreeHiCS,SOD,andLOFmethodswassetfor
varying values ranging from 2 to 500, then the best result of
thesemethodsoneachofthedatasetsisreportedinTable3.We
implementedthesealgorithmsasdescribedinELKI[42].
Theproposedmethodrequiressettingthreeparameters p, m
and MinPtswhicharethenumberofsegmentsofeachfeature,the
1 http://qwone.com/~jason/20Newsgroups/.
2 http://archive.ics.uci.edu/ml/datasets/Reuters-21578+Text+Categorization+
Collection.
7

--- Page 8 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
Table 3
Comparison of LOF, SOD, HiCS, and the proposed algorithms in terms of %
AUC on the real datasets (the best performing algorithm is emphasized in
boldface).
Dataset LOF SOD HiCS MRD mRMRD
Reuters-21578 36.89 38.81 73.46 96.48 98.51
20Newsgroups 73.13 81.64 82.41 79.54 85.01
Musk 63.81 79.15 89.21 86.57 91.84
MNIST 80.34 67.24 51.74 84.29 88.06
Breast 60.32 52.51 56.85 62.89 65.81
Ionosphere 90.47 91.26 83.26 95.18 92.68
Breast(Diagnostic) 87.41 89.04 90.31 91.51 87.41
Pendigit16 93.25 92.79 73.84 95.21 94.13
Diabetes 72.24 66.40 72.08 71.36 72.24
Glass 86.82 88.56 83.95 92.62 89.21
Ann-thyroid 96.31 95.03 96.13 96.07 96.32
numberofrelevantfeaturesinselectedsubspace,andthenumber
ofthenearestneighborsforLOFscoring,respectively.Thevalue
oftheparameter pintheperformedexperimentsinTable3is
setto2.Thenumberofdimensionsoftheselectedsubspace m
andparametervalueMinPtsisvariedwithin1 ≤ m ≤ M and
2 ≤ MinPts ≤ min(500, N).Then,thebestAUCvaluesofthe
proposedmethodoneachofthedatasetsinTable2arereported
inTable3.
AsshowninTable3,theproposedmethodcouldobtainthe
best results among LOF, SOD, and HiCS on all the datasets in
Table 2. The LOF method searches outliers in full dimensional
spaceandsomeoutliersmaybemaskedandundetectedbecause
ofthe‘‘curseofdimensionality’’.HiCSsearchesforhighcontrast
subspaces with a significant amount of correlation among the
subspacedimensionsundertheassumptionoftheindependence
dimension within a subspace. Generally, the independence as-
sumptionamongdimensionsmaynotbetruei.e.thecorrelated
subspacemaynotreflectthetruenatureoftheoutliersinevery
dataset. Also, HiCS searches relevant subspaces through an A
priori-like algorithm that may be incomplete [6]. In addition,
in HiCS the LOF scores from relevant subspaces with different
dimensionsarecombinedwithoutanynormalizationwhilethose
scoresarenotcomparable.Duetotheabovereasons,ourmethod
usesanincrementalsearchandwithoutconsideringanyassump-
tions on features and data distribution can find near-optimal
featuresdefinedby Φandhassignificantimprovementascom-
paredtoHiCS[6].Ofcourse,itshouldbenotedthattheproposed
density-basedrepresentationmethodhasalsoapositiveeffect
ontheperformanceofrelevantsubspaceselection.SODexam-
inesthefeaturesindividuallyandignorestheinteractionamong
variousdimensions.
ComparingMRDandmRMRDcriteriaintheproposedmethod,
wecansaybothapproacheshaveachievedgoodresultsinhigh
dimensional datasets. From the viewpoint of accuracy, the
mRMRD method could significantly outperform on higher-
dimensional datasets Reuters-21578, 20Newsgroups, MNIST,
Musk,andBreastbecausethismethod,inadditiontobeingableto
selectsubspaceincludingrelevantfeatures,canremovefeatures
thathavehighredundancyinthenewrepresentation(features
withsimilardistribution)aswell.
ItshouldbenotedthataccordingtoTable3,onsomedatasets
suchasIonosphere,Breast(Diagnostic),andPendigits16,theac-
curacyofthemRMRDmethodwasdecreasedcomparedtothe
MRD method i.e. considering redundancy among features may
reducetheaccuracy.Insomecases,thedistributionoffeatures
maybesimilari.e.twofeaturesinthedensity-basedrepresen-
tation have high redundancy but each of them carries unique
informationaboutthedensitytargetvariable.Therefore,choosing
onlyoneofthesetwofeatureswillreducetheaccuracyofoutlier
Table 4
Thevaluesoftheparameterssetupforourproposedmethod.
Dataset (m,MinPts)inMRD (m,MinPts)inmRMRD
Reuters-21578 (208,– a) (205,–)
20Newsgroups (1255,–) (446,–)
Musk (2,52) (2,54)
MNIST (75,318) (51,498)
Breast (31,194) (6,196)
Ionosphere (14,100) (11,88)
Breast(Diagnostic) (15,270) (30,296)
Pendigit16 (9,414) (14,302)
Diabetes (7,274) (8,254)
Glass (4,212) (3,74)
Ann-thyroid (5,94) (6,100)
aIn higher dimensional datasets 20Newsgroups and Reuters-21578, we use a
fixedvaluefortheparameterMinPtsissetto
√
N andconfiguredinCAOS.
Table 5
Comparisons of the average AUC and rank for our methods against the other
outlierdetectionmethodsoverthe11datasetslistedinTable2,basedonthe
testaccuracyandusing5-foldcross-validation.
LOF SOD HiCS MRD mRMRD
AverageAUC(%) 61.21 59.39 64.35 78.69 80.14
Averagerank 3.90 4.18 3.81 1.77 1.31
detection.Asmentionedabove,differentvaluesforparameters m
andMinPtsinbothMRD-basedandmRMRD-basedapproaches
are examined. The parameters that led to the best results are
reportedinTable4andineachdataset,theboldfaceparameters
mean the method is better than others when adjusting these
parameters.Table4showsthatthemRMRDmethodbyselecting
arelevantsubspacethathasasmallernumberoffeaturesthan
MRDrelevantsubspacecouldachievehigheraccuracyonReuters-
21578,20Newsgroups,Musk,MNIST,andBreast.Itcanbeseen
that for almost all datasets the approach that could select a
relevantsubspacewithasmallernumberofdimensions(smaller
m)hasachievedabetterresult.
Statistical analysis:Here,weaimedtodiscussforhighercon-
fidenceonourresults,inadditiontotheaboveevaluationsonreal
datasetsgiveninTable3,wewouldliketoperformastatistical
analysistodeterminewhetherouralgorithmsarecomparableto
orbetterthanseveralstate-of-the-artmethods.
Weusestratified5-foldcross-validationforperformancees-
timationinstatisticalanalysis.Foreachcross-validationfold,the
highestAUCisseparatelycalculatedaccordingtotheparameters
specifiedinSection5.2.1andthen,theaverageoftheAUCon
the 5-folds is computed as cross-validated AUC. The rank of
approachesiscomputedoverallrealdatasetsbasedonAUCvalue
by5-foldcross-validationtocompareouralgorithmstothestate-
of-the-artoutlierdetectionmethodsandstatisticallychoosethe
optimalalgorithm.Therankofeachalgorithmiscalculatedusing
AUC,foreachdataset,therankofthemethodswiththehighest
AUCisfirstwhiletherankofthemethodwiththelowestAUC
isthelastandifsomemethodshavethesameAUCvalue,we
assigntheaveragerankofthesetoeachofthem.Theoverallper-
formanceofeachoutlierdetectionmethodondifferentdatasets
inTable2issummarizedusingtheaverageAUCandtheaverage
rank,areshowninTable5.Table5showsourmRMRD-basedand
MRD-basedalgorithmscouldachievethefirstandsecondhighest
averageAUCandthefirstandsecondaveragerankings.
TheFriedmantest[43]isrecommendedforthecomparison
of more models over multiple datasets [44]. Accordingly, we
applied the Friedman test with a 95% confidence level that is
statistically significant to check the difference in the accuracy
of outlier detection among these approaches. In this case, the
FriedmanandIman–Davenport[45]statisticsare χ2
F = 25.37,
8

--- Page 9 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
Fig. 2. Comparison of our algorithms (MRD, mRMRD) against the others with
theBonferroni–DunntestfortheAUCvalues.
FF = 13.61 according to Table 5 and the critical ofF(4,40)
for α = 0.05is2.61,theIman–Davenporttestrejectsthenull
hypothesis since the critical value is smaller than the statistic
andwecanconcludethatthereisastatisticallysignificantdif-
ferenceamongtheaccuracyoftheseapproaches.Thus,wecan
proceed with Bonferroni–Dunn [46] post-hoc test to find out
the difference between MRD, mRMRD, and other approaches,
accordingtothistest,amethodperformssignificantlydifferent
ifthecorrespondingaverageranksdifferenceisatleastasgreat
asthecriticaldifferenceofCD.Fig.2showstheresultsofthe
Bonferroni–Dunntestwith α =0.05wherethecriticaldifference
in this case isCD = 1.68. This critical value is represented
asablackmarkedinterval,andanyoutlierdetectionmethods
withranksexceedthisintervalaresignificantlydifferentfrom
ourmRMRD-basedalgorithm.Bonferroni–Dunntestisshownin
Fig. 2, we can say that the mRMRD-based algorithm performs
betterthanthoseofLOF,SODandHiCSwith95%ofsignificance
for11realdatasets.UsingtheBonferroni–Dunntest,wecannot
saythatmRMRD-basedalgorithmoutperformssignificantlybet-
terthantheMRD-basedalgorithm.ItisobservableinFig.2that
performance of mRMRD-based algorithm is statistically better
thanallmethodsexceptMRD-basedalgorithm.Also,thiscritical
value( CD = 1.68)isrepresentedasabluemarkedintervalfor
MRD-basedalgorithm.ItisobservableinFig.2thatMRD-based
methodisstatisticallybetterthanLOF,HiCSandSODmethods.
Automatic parameter tuning: In another experiment, the
parametervalue mwastriedtobetunedautomatically.Using
a threshold value on the score value oftth selected feature,
it isdetermined whether this featureis added to the relevant
subspaceortherelevantsubspaceincludesthesame t −1of
thealreadyselectedfeatures.InbothMRDandmRMRDmethods,
thethresholdvalueissetastheaveragerelevancebetweeneach
featureinfullspace Ganddensitytargetvariable:
Th = 1
M
∑
gj∈G
I(gj, dc) (13)
InourMRDandmRMRDmethods,afterselectionof tthfea-
ture (ℓt), the relevance value between this feature and target
variable dc is compared to the threshold valueTh if its rele-
vance value is less than the threshold value (Th) in Eq. (13)
(I(ℓt , dc) ≺ 1
M
∑
gj∈G I(gj, dc))thesamealreadyselectedsubspace
Gt−1ischosenasoutput.
Theparameter madjustedautomaticallybasedonthethresh-
oldvaluementionedinEq.(13)andtheothertwoparameters
pandMinPtstunedsimilartothepreviousvalues p = 2and
2 ≤ MinPts ≤ 500thenthebestAUCvaluesobtainedforthe
MRDandmRMRDmethodsarereportedinTable6.
Using the automatic tuning of the parameterm, both MRD
andmRMRDapproachescouldachievegoodresultsthatwerenot
muchlowerthanthebestresultsgiveninTable3.Comparing
theresultsoftheproposedalgorithminTable6withtheaccu-
racyofLOF,SOD,andHiCSmethodinTable3showsthatour
methodcouldstillobtainthebestdetectionaccuracyonalmost
alldatasetscomparedtootherapproaches.
Table 6
The AUC values of the proposed algorithms by auto-tuning parameterm
obtainedontherealdatasets(thebestperformingalgorithmisemphasizedin
boldface).
Dataset MRD mRMRD
Reuters-21578 95.57 91.34
20Newsgroups 76.14 81.76
Musk 84.25 96.13
MNIST 74.15 82.05
Breast 60.06 53.72
Ionosphere 94.61 92.2
Breast(Diagnostic) 86.39 81.84
Pendigit16 95.36 93.72
Diabetes 70.67 71.36
Glass 88.34 85.9
Ann-thyroid 93.64 93.58
Fig. 3. Comparingtheeffectofincreasingdimensionalityontheperformanceof
LOF,SOD,HiCS,MRD,andmRMRDmethods( p =2, m =5andforallmethods
MinPts =50).
5.2.2. Results on synthetic datasets
Fig.3showstheaccuracyofLOF,SOD,HiCS,MRD,andmRMRD
algorithms on synthetic datasets with different dimensions. In
thisexperiment,theparametersaresetasfollows: p =2, m =
5andMinPts =50.AsitcanbeseeninFig.3,theperformance
fortheMRDandmRMRDmethodsgetssignificantlybetterthan
thatofLOF,SOD,andHiCSforallsyntheticdatasetsbasedon
theAUCperformancemetric.LOFperformancedecreasedasthe
numberofdimensionsofafixed-sizedatasetincreasebecause
LOFsearchesoutliersinfull-dimensionalspace.Whenthenum-
ber of irrelevant dimensions increases the effect of the ‘‘curse
ofdimensionality’’becomesmoreprominent,andconsequently,
moreoutliersbecomehidden.Asthenumberofdimensionsin-
crease,SOD,HiCS,MRD,andmRMRDaccuracychangesovera
smallrangebut,doesnotgenerallydegrade.Theperformanceof
MRDandmRMRDmethodsissignificantlysuperiortothatofSOD
andHiCS.ExaminingtheselectedsubspacesforHiCSrevealsthat
some selected subspaces include irrelevant dimensions which
haveasimilardistributionandhighcorrelation.Thisisnormal
becausetheHiCSalgorithmsearchesoutliersinhighcorrelated
subspaceswhileinthesesyntheticdatasets,irrelevantfeatures
arehighlycorrelated.TheselectedsubspacebySODalsoincludes
severalirrelevantdimensionshavinglowvariance.WhileMRD
andmRMRDsearchsubspacethatishighlyrelevanttodensity
withoutconsideringanyassumptionaboutdatadistribution.Itis
notablethatasthenumberofdimensionsincreases(datasetwith
morethan35dimensions),themRMRDhashigheraccuracythan
MRDindetectionsincemRMRD,inadditiontoconsideringthe
relevancetodensityalsoconsidersredundancyamongfeatures
distribution.
5.3. Analysis of the new density-based representation method
As noted in Section 4.1, the new density-based representa-
tionmethodleadstodatareduction.Inthissection,wewould
liketoevaluatetheeffectivenessofourrepresentationmethod
basedondatareduction.Tothisend,theparametervalue pin
9

--- Page 10 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
Table 7
The data reduction ratio is obtained by the new density-based representation
ontherealdatasets.
Dataset Numberof
datapoints
Numberofdatapoints
innewrepresentation
Datareduction
ratio
Reuters-21578 6414 6369 7.06%
20Newsgroups 1218 1126 8.17%
Musk 5646 4665 17.37%
MNIST 7603 6520 14.24%
Breast 198 150 24.24%
Ionosphere 351 276 21.36%
Breast(Diagnostic) 569 180 68.36%
Pendigit16 6870 754 89.02%
Diabetes 768 46 94.01%
Glass 214 26 87.85%
Ann-thyroid 3772 21 99.44%
the DDR algorithm is set to 2 and then the number of data
points in the original space, the number of data points in the
new density-based space, and the data reduction ratio for all
datasets in Table 2 are reported in Table 7. We can see that
ourrepresentationmethodreducesthenumberofdatainnew
spaceandalsoresultsinthedecreasedcomputationalcomplexity
ofoursubspaceselectionalgorithm.FromTable7itcanbeob-
servedthatthedatareductionratioisdecreasedwithincreasing
dimensionalityofdata.Thisscenariowasexpectedinadvance
becauseasthedimensionalityincreases,thevolumeofthespace
increased and thus becomes sparser. This sparsity leads to an
increase in the number of cubes containing at least one data
point,withrespecttoincreasingthenumberofdatapointsin
newrepresentation(non-emptycubes),thedatareductionratio
isdecreased.
In another experiment, we would like to assess the effect
of the only parameter of the DDR algorithmp(the number of
segmentsoneachfeature)ontheaccuracyoftheproposedoutlier
detectionalgorithmaswellasthedatareductionratio.
Analyzing the effect of parameter p on the accuracy of the
proposed method:Weaimedtoanalyzetheeffectofthenumber
of segments for each feature on the accuracy of the proposed
methodusingexperimentsonthesyntheticdatasetD10.Inthis
experiment,theparameters mandMinPtsaresetto5and50,
respectively, andp ranging from 2 to 10. Fig. 4 presents the
accuracyofMRDandmRMRDmethods.AsitisshowninFig.4,
firstbyincreasing pfrom2to6,theaccuracyoftheproposed
methodincreasesthentheaccuracydropssignificantlywhenthis
parametervalueisover8.Thisprocedureislogicalbecausewhen
thenumberofsegmentspereachfeatureincreases,thedensity
ofgridcubesismeasuredwithamorelocalizedview.First,when
thevalueof pissmallthedensityofcubesismeasuredmoreglob-
ally,andthen,asthenumberofsegmentsincreasestheaccuracy
ofmeasuringthecubesdensityincreaseseither.However,when
thenumberofsegmentsperdimensionexceedsacertainvalue,it
makeseachdimensiontobeviewedtoolocally,andalmostevery
datapointisplacedinaseparatecubeandcannotdistinguish
amongdifferentdimensionsintermsofdatascatteringinvarious
segments. The relevant features to outliers cannot be selected
withhighaccuracyandasaresult,theaccuracyofthemethod
isreducedaccordingtoFig.4.
Analyzing the effect of parameter p on data reduction:Fig.5
demonstrates the numberof data points in the newspace for
differentvaluesoftheparameter pondatasetsD10andD20.In
Fig.5itcanbeobservedthatincreasingthevalueof pincreases
thenumberofdatapointsinnewdensity-basedspaceforboth
datasets D10 and D20. This is logical because as thep value
increases,thenumberofcubesincreasesandleadstodatapoints
lieinseparatecubes.Also,Fig.5showsthatthedecreaseinthe
Fig. 4. Theeffectoftheparameter pontheaccuracyoftheproposedmethod
(m =5andMinPts =50).
Fig. 5. The effect of the parameterp on the data reduction (m = 5 and
MinPts =50).
numberofdimensionsinD20ascomparedtoD10leadstoan
increaseinthenumberofdatapointsinthenewdensity-based
spacesincedataspaceinD20ismuchsparserthanD10.Itis
noteworthythatthedatareductionratioonsyntheticdatasetsis
muchsmallerthanrealdatasetgiveninTable7becausesome
irrelevant features in synthetic datasets are generated using a
uniformdistributionwhichcausesdataspacetobecomesparser
againstotherdistributions,whileirrelevantfeaturesinadataset
donotnecessarilyfollowauniformdistribution.
5.4. Analysis of execution time
Theruntimeofanoutlierdetectionalgorithmisanimportant
measureforassessingthepracticalityofthatmethod.Thealgo-
rithmmayslowdownasthenumberoffeaturesincreases[47].
Thefeatureselectionisappliedbeforeoutlierdetection,which
reducesthetimerequiredforactualmininginadditiontoim-
provingthequalityofdata[3].Fig.6showstheexecutiontime
oftheproposedalgorithmandLOF.Itshouldbenotedthatthe
executiontimereportedfortheproposedmethodincludesallthe
stepsinFig.1.
The execution time of the proposed algorithm is less than
LOFonallsyntheticdatasetsbecauseourmethodusesarelevant
subspace selection with a linear time complexity which maps
datapointsintoa5-dimensionalsubspacethenLOFisapplied
onthe5-dimensionaldata,while,LOFalgorithmisrunonfull
dimensionaldata.Therefore,itcanbeconcludedthatthecostof
theexecutiontimeoftherelevantsubspaceselectionalgorithm
isverysmallcomparedtothenextstepoftheproposedmethod;
namely,LOFoutlierscoring.Whenthedimensionalityincreases,
theexecutiontimeoftheproposedalgorithmgrowslinearly.This
resultconfirmsthescalabilityoftheproposedalgorithminterms
ofdatadimensionality.
Table 8 shows a comparative analysis of the complexity of
executiontimeinsecondsfortheproposedalgorithm,LOF,SOD,
and HiCS on synthetic datasets with different dimensions. We
10

--- Page 11 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
Fig. 6. The effect of increasing dimensionality on the execution time of the
proposedalgorithm( p =2,m =5andMinPts =50).
Table 8
Comparisonofthecomputationaltime(inseconds)forLOF,SOD,HiCS,andthe
proposedalgorithmsonthesyntheticdatasets.
Dataset LOF SOD HiCS MRD mRMRD
D10 0.732 13.298 17.656 0.666888 0.701099
D15 0.606 13.317 17.449 0.544206 0.625326
D20 0.539 13.113 12.38 0.415382 0.511371
D25 0.567 13.166 41.546 0.390707 0.528234
D30 0.623 13.306 143.201 0.422017 0.600408
D35 0.935 13.39 203.553 0.435766 0.579506
D40 0.852 13.45 189.238 0.404402 0.64044
D50 0.801 13.665 245.097 0.415515 0.748188
D60 0.903 13.896 230.959 0.418199 0.813367
D80 1.198 14.468 261.991 0.467465 1.080209
D100 1.57 14.65 250.257 0.757729 1.568473
D150 2.08 15.803 222.545 0.548082 1.919265
D200 2.396 16.911 279.514 0.584678 2.595731
canseethattheproposedMRDandmRMRDalgorithmshavea
shorterexecutiontimeofalldatasetscomparedtocompetitors
becauseourmethoddoesnotwasteintherelevantsubspacese-
lectionversaSODandHiCSalgorithms.Ofcourse,theMRD-based
proposedalgorithmhastheshortestexecutiontimebecausethis
criteriondoesnotneedtocalculatemutualinformationamong
thevariousfeatures;itisonlyrequiredtocalculatethemutual
informationofallthefeatureswiththetargetdensityvariable.In
thisexperiment,theparametersofouralgorithmare p =2, m =
5andMinPts = 50forallmethodsofLOF,SOD,HiCS,andour
algorithms.
To analyzethe effectof datasize onthe executiontime of
thealgorithm,syntheticdatasetD20withadifferentnumberof
data points 5000, 10000, 15000, 20000, and 25000 has been
generatedwhich1%ofthesizeofeachdatasetareoutliers.Fig.7
showstheexecutiontimeoftheproposedMRDandmRMRDand
LOF methods on these datasets with various sizes. In Fig. 7 it
isobviousthatwithincreasingdatasetsize,theexecutiontime
of our algorithm similar to LOF grows polynomially with the
datasetsize( O(N2)).Ofnote,theexecutiontimeoftheproposed
algorithmislessthanthatofLOF,sinceLOFinsideourmethod
isappliedtothedatapointsin5-dimensionalrelevantsubspace
projection.Asdatasetsizeincreases,thedifferenceinexecution
time graphs for MRD and mRMRD algorithms grows because
thecomputationalcostofmutualinformationbetweenthetwo
featuresdependsonthedatasetsize.
5.4.1. Time complexity analysis
Finally,webrieflydiscussthecomputationalcomplexityofthe
proposedmethod.Ourmethodforselectingtherelevantsubspace
inoutlierdetectionincludestwomainstepsofthedensity-based
representationandtheMRD/mRMRD-basedsubspaceselection.
Inthedensity-basedrepresentationalgorithm,eachdatapointin
Fig. 7. The effect of increasing the dataset size on the execution time of our
algorithms( p =2,MinPts =50and m =5).
theoriginalspaceistransformedtoadatapointinthedensity
space, which this algorithm requiresO(N.M) time. The MRD-
basedsubspaceselectionalgorithmneedstocalculatethemu-
tualinformationbetweeneachfeaturewiththetargetvariable
dc(O(NE))andselect mfeatureswiththehighestrelevanceac-
cordingly,thecomplexityoftheMRD-basedrelevantsubspace
selectionalgorithmis O(NE ∗M).ThemRMRD-basedrelevantsub-
spaceselectionalgorithmaimstomaximizethecriteriondefined
in(12)incrementally.Todothis,itcomputesandstoresthemu-
tualinformationbetweentheselectedfeatureatthepreviousstep
andallfeaturesthathavenotalreadybeenselected( O(M.NE))to
comeupwithonefeatureateachstep.Thus,themRMRD-based
relevantsubspaceselectionmethodtakes O(m.M.NE) = O(N.M)
timeatworst( misaconstantvaluewhere m ≪ Mand NE ≤
N) which is linear in terms of the number of data points and
alsothenumberoffeatures,whilethecomplexityofHiCS[6]is
exponentialinthenumberofdimensions.
Aftertheselectionofrelevantsubspace,fordetectingoutliers
itisnecessarytomapthedatapointsinoriginalspacetothisrel-
evantsubspaceandusetheLOFscoringmethod[13]whichcom-
plexityoftheseare O(N)and O(N2)(intheLOFmethodifX-treeis
used,thecomplexitycanbereducedto O(N.log N)),respectively.
Therefore,ourhighdimensionaloutlierdetectionalgorithmhas
timecomplexity O(N.M + N.log N)whichismoreefficientthan
manyhighdimensionaloutlierdetectiontechniques.
6. Discussions
Inthisstudy,thefocusisonfindingarelevantsubspaceoffea-
turestoenhanceoutlierdetectioninhighdimensionaldata.We
proposetwounsupervisedsubspaceselectionalgorithmsnamely
MRD and mRMRD which achieve statistically significant high
accuracy and fast runtime. The proposed density-based repre-
sentation maps original data into density space which further
allowsformeasuringtherelevanceoffeaturestooutliers.The
MRD-based method searches a set of features that has maxi-
mumrelevancetodensity.However,thissubspacemaynotbe
effectivesinceitsfeaturesmightexhibitredundancy.Thepur-
poseofmRMRDis,therefore,tofindacompactsubspacewith
maximum relevance to density while its features have mini-
mum redundancy. It combines both Max-Relevance-to-Density
andminimum-Redundancycriteriausinganincrementalselec-
tionapproachwhichprovidesabettersubspacethanMRD.
Summarizingtheexperimentalresultsontherealandsyn-
theticdatasets,itcanbeconcludedthat:
(1) The proposed subspace outlier detection method based
on MRD and mRMRD criteria has statistically achieved higher
detectionaccuracycomparedtoseveralpublishedrelatedworks
11

--- Page 12 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
both on the real and synthetic datasets. These criteria are ef-
fectiveinminingoutliersbecauseusingthesecriteriacanselect
featuresthathavemoredensitychanges.Subsequently,adensity-
basedoutlierscoringcanactmoreeffectivelyinMRD/mRMRD
subspacetomeasurethecontrastbetweenoutliersfromnormal
datapoints.
(2)ThereisnostatisticallysignificantdifferencebetweenMRD
andmRMRD-basedmethods.Insomedatasets,theMRDcriterion
canachievehigheraccuracythanmRMRDbecauseitispossible
thatarelativelyhighrelevancefeaturedoesnotmeetthemRMRD
criterion due to high redundancy while this feature may have
importantinformationaboutthedensityvariable.However,the
resultsonhighdimensionaldatasetsshowthatthemRMRDcri-
terion–byconsideringredundancyamongthefeatures–canbe
moresuccessfulthantheMRDcriterionintermsofthedetection
accuracybecausemRMRDcanfindasuperiorsubsetoffeatures
byminimizingredundancy.
(3) The proposed algorithm is scalable with increasing size
anddimensionofthedata,confirmedbytheevaluationofthe
algorithmexecutiontimeandcomputationalcomplexity.
(4)Thetimecomplexityanalysisoftheexperimentsdemon-
stratesthatbothproposedalgorithms,MRD/mRMRD-basedsub-
spaceselectionalgorithmsarelinearwithrespecttothenumber
of dimensions and the size of the dataset. This results in the
minimumexecutiontimeforourproposedalgorithmsincom-
parisonwithotherpublishedworks.Theexecutiontimeofour
subspace outlier detection approach is even shorter than LOF
becauseourapproachreducesthedataandthedimensionusing
density-basedrepresentationandMRD/mRMRD-basedsubspace
selection.
7. Conclusions
In this work, we present two relevant subspace selection
methodsforeffectiveoutlierdetectionwhichaddresstheaccu-
racy,scalability,andexecutiontimechallengesinhighdimen-
sional unlabeled data. The method is composed of two main
steps, the density-based representation, and the unsupervised
subspaceselectionwhichappliesinformation-theoreticandsta-
tisticalcriteriaforsubspaceselection.Introducingadensity-based
representation method allows, we propose two new unsuper-
visedmutualinformation-basedMRDandmRMRDformeasuring
thegoodnessoffeaturesinunsupervisedoutlierdetection.MRD-
basedrelevantsubspaceselectionchoosesasubspaceincluding
featureswiththehighestrelevancetodensity.ThemRMRD-based
algorithmusingincrementalsearchselectsacompactsubspace
thatitsfeatureshaveminimumredundancyamongthemselves,
inadditiontohavingthehighestrelevancetodensity.Then,the
goodnessoftheselectedrelevantsubspaceisevaluatedbyLOF
outlierdetectiontocomputethelocaloutlierscoreinsubspace
projection.
OurproposedMRD/mRMRDsubspaceselectionalgorithmse-
lects the relevant features that produce substantial density
changes.Thisdimensionreductionalongwiththedatareduction
in density-based representation results in a reduction in the
executiontimeoftheproposedsubspaceoutlierdetection.Exper-
imentalresultsonbothrealandsyntheticdatasetsdemonstrate
that both MRD and mRMRD-based methods can significantly
improvethedetectionaccuracyandexecutiontime.
Whilebothofourrelevantsubspaceselectionmethodschoose
onlyasinglesubspacetodiscoveroutliers,therearesomesit-
uationsthatasinglesubspacecannotthoroughlyrepresentthe
outlier data points. We plan to combine our algorithm with
ensemblelearningtoovercomethislimitation.Also,duetothe
increasinggrowthofdata,weintendtoextendthedevelopment
ofourproposedalgorithmtodistributedcomputationalenviron-
mentstobeabletorunthealgorithmonhigh-dimensionalBig
Data.
CRediT authorship contribution statement
Mahboobeh Riahi-Madvar: Conceptualization,Methodology,
Software,Validation,Writing-originaldraft. Ahmad Akbari Azi-
rani:Supervision. Babak Nasersharif:Writing-review&editing.
Bijan Raahemi:Review&editing,Projectadministration.
Declaration of competing interest
Theauthorsdeclarethattheyhavenoknowncompetingfinan-
cialinterestsorpersonalrelationshipsthatcouldhaveappeared
toinfluencetheworkreportedinthispaper.
References
[1] C.C. Aggarwal, S.Y. Philip, An effective and efficient algorithm for
high-dimensionaloutlierdetection,VLDBJ.14(2)(2005)211–221.
[2] R. Domingues, et al., A comparative evaluation of outlier detection
algorithms: Experiments and analyses, Pattern Recognit. 74 (2018)
406–421.
[3] K.Lan,etal.,Asurveyofdatamininganddeeplearninginbioinformatics,
J.Med.Syst.42(8)(2018)139.
[4] F. Cheraghchi, A. Iranzad, B. Raahemi, Subspace selection in high-
dimensional big data using genetic algorithm in apache spark, in:
ProceedingsoftheSecondInternationalConferenceonInternetofThings,
DataandCloudComputing,ACM,2017.
[5] A. Zimek, E. Schubert, H.P. Kriegel, A survey on unsupervised outlier
detectioninhigh-dimensionalnumericaldata,Statist.Anal.DataMin.:ASA
DataSci.J.5(5)(2012)363–387.
[6] F. Keller, E. Muller, K. Bohm, HiCS: High contrast subspaces for density-
basedoutlierranking,in:2012IEEE28thInternationalConferenceonData
Engineering,IEEE,2012.
[7] H.Peng,F.Long,C.Ding,Featureselectionbasedonmutualinformation:
criteria of max-dependency, max-relevance, and min-redundancy, IEEE
Trans.PatternAnal.Mach.Intell.(8)(2005)1226–1238.
[8] D. Chakraborty, V. Narayanan, A. Ghosh, Integration of deep feature
extraction and ensemble learning for outlier detection, Pattern Recognit.
89(2019)161–171.
[9] S.M. Erfani, et al., High-dimensional and large-scale anomaly detection
using a linear one-class SVM with deep learning, Pattern Recognit. 58
(2016)121–134.
[10] V.Barnett,Outliersinstatisticaldata,1978.
[11] V. Chandola, A. Banerjee, V. Kumar, Outlier detection: A survey, ACM
Comput.Surv.14(2007)15.
[12] F. Liu, et al., Scalable KDE-based top-n local outlier detection over
large-scaledatastreams,Knowl.-BasedSyst.204(2020)106186.
[13] M.M.Breunig,etal.,LOF:identifyingdensity-basedlocaloutliers,in:ACM
SigmodRecord,ACM,2000.
[14] C.C.Aggarwal,P.S.Yu,Outlierdetectionforhighdimensionaldata,in:ACM
SigmodRecord,ACM,2001.
[15] J. Zhang, et al., A concept lattice based outlier mining method
in low-dimensional subspaces, Pattern Recognit. Lett. 30 (15) (2009)
1434–1439.
[16] X. Zhao, J. Zhang, X. Qin, LOMA: A local outlier mining algorithm based
onattributerelevanceanalysis,ExpertSyst.Appl.84(2017)272–280.
[17] H.-P. Kriegel, et al., Outlier detection in axis-parallel subspaces of high
dimensionaldata,in:Pacific-AsiaConferenceonKnowledgeDiscoveryand
DataMining,Springer,2009.
[18] E. Müller, M. Schiffer, T. Seidl, Statistical selection of relevant subspace
projectionsforoutlierranking,in:2011IEEE27thInternationalConference
onDataEngineering,IEEE,2011.
[19] J. Zhang, et al., A relevant subspace based contextual outlier mining
algorithm,Knowl.-BasedSyst.99(2016)1–9.
[20] X. Xu, et al., A comparison of outlier detection techniques for
high-dimensionaldata,Int.J.Comput.Intell.Syst.11(1)(2018)652–662.
[21] X.Xu,H.Liu,M.Yao,Recentprogressofanomalydetection,Complexity
2019(2019).
[22] A.P. Shenoy, P. Ameer, Anamoly detection in Wireless Sensor Networks,
in:TENCON2019-2019IEEERegion10Conference(TENCON),IEEE,2019.
[23] X.Zhao,etal.,Parallelminingofcontextualoutlierusingsparsesubspace,
ExpertSyst.Appl.126(2019)158–170.
[24] C.C.Aggarwal,High-dimensionaloutlierdetection:Thesubspacemethod,
in:OutlierAnalysis,Springer,2017,pp.149–184.
[25] H.-P.Kriegel,etal.,Outlierdetectioninarbitrarilyorientedsubspaces,in:
2012IEEE12thInternationalConferenceonDataMining,IEEE,2012.
[26] H. Liu, et al., Efficient outlier detection for high-dimensional data, IEEE
Trans.Syst.ManCybern.:Syst.48(12)(2017)2451–2461.
12

--- Page 13 ---
M. Riahi-Madvar, A. Akbari Azirani, B. Nasersharif et al. Knowledge-Based Systems 216 (2021) 106733
[27] J.Li,etal.,Weightedoutlierdetectionofhigh-dimensionalcategoricaldata
usingfeaturegrouping,IEEETrans.Syst.ManCybern.:Syst.(2018).
[28] H.V. Nguyen, et al., CMI: An information-theoretic contrast measure for
enhancing subspace cluster and outlier detection, in: Proceedings of the
2013SIAMInternationalConferenceonDataMining,SIAM,2013.
[29] G. Pang, et al., Sparse modeling-based sequential ensemble learning for
effective outlier detection in High-Dimensional Numeric Data, in: AAAI,
2018.
[30] H. Trittenbach, K. Böhm, Dimension-based subspace search for outlier
detection,Int.J.DataSci.Anal.7(2)(2019)87–101.
[31] Z.Chen,etal.,CombiningMICfeatureselectionandfeature-basedMSPCA
for network traffic anomaly detection, in: 2016 Third International Con-
ference on Digital Information Processing, Data Mining, and Wireless
Communications(DIPDMWC),IEEE,2016.
[32] M.H. Bhuyan, D. Bhattacharyya, J.K. Kalita, A multi-step outlier-based
anomaly detection approach to network-wide traffic, Inform. Sci. 348
(2016)243–271.
[33] E. Hancer, B. Xue, M. Zhang, Differential evolution for filter feature
selectionbasedoninformationtheoryandfeatureranking,Knowl.-Based
Syst.140(2018)103–119.
[34] X. Yan, M. Jia, Intelligent fault diagnosis of rotating machinery using
improved multiscale dispersion entropy and mRMR feature selection,
Knowl.-BasedSyst.163(2019)450–471.
[35] S. Kandanaarachchi, et al., On normalization and algorithm selection for
unsupervisedoutlierdetection,DataMin.Knowl.Discov.(2019)1–46.
[36] B.C.Ross,Mutualinformationbetweendiscreteandcontinuousdatasets,
PLoSOne9(2)(2014)e87357.
[37] A. Lazarevic, et al., A comparative study of anomaly detection schemes
in network intrusion detection, in: Proceedings of the 2003 SIAM
InternationalConferenceonDataMining,SIAM,2003.
[38] A.Frank,A.Asuncion,UCImachinelearningrepository,2010,p.[Online].
Available:http://archive.ics.uci.edu/ml.
[39] C.Vidyadhari,N.Sandhya,P.Premchand,AutomaticIncrementalClustering
usingBat-GreyWolfOptimizer-basedMapReduceFrameworkforeffective
Management of High-Dimensional Data, Int. J. Ambient Comput. Intell.
(IJACI)11(4)(2020)72–92.
[40] R. Kannan, et al., Outlier detection for text data, in: Proceedings of the
2017SiamInternationalConferenceonDataMining,SIAM,2017.
[41] J. Zhang, et al., Scalable mining of contextual outliers using relevant
subspace,IEEETrans.Syst.ManCybern.:Syst.(2017).
[42] E.Achtert,H.-P.Kriegel,A.Zimek,ELKI:asoftwaresystemforevaluationof
subspaceclusteringalgorithms,in:InternationalConferenceonScientific
andStatisticalDatabaseManagement,Springer,2008.
[43] M. Friedman, A comparison of alternative tests of significance for the
problemofmrankings,Ann.Math.Stat.11(1)(1940)86–92.
[44] J.Demšar,Statisticalcomparisonsofclassifiersovermultipledatasets,J.
Mach.Learn.Res.7(Jan)(2006)1–30.
[45] R.L. Iman, J.M. Davenport, Approximations of the critical region of the
fbietkanstatistic,Comm.Statist.TheoryMethods9(6)(1980)571–595.
[46] O.J.Dunn,Multiplecomparisonsamongmeans,J.Amer.Statist.Assoc.56
(293)(1961)52–64.
[47] N.Dey,etal.,AppliedMachineLearningforSmartDataAnalysis,CRCPress,
2019.
13
