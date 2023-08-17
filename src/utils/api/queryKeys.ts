const queryKeys = {
  getDashboardOverview: 'getDashboardOverview',
  getDemographicData: 'getDemographicData',
  getPlotData: 'getPlotData',
  getActiveCandidates: ['candidates', { profileMode: 'Active' }],
  getInactiveCandidates: ['candidates', { profileMode: 'Inactive' }],
  getAllJobs: 'getAllJobs',
  getSingleJob: 'getSingleJob',
  getQualifiedJob: 'getQualifiedJob',
  deleteAJob: ' deleteAJob',
  changeJobStatus: 'changeJobStatus',
};

export default queryKeys;
