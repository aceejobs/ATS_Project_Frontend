export interface IOverviewData {
  _id: string;
  total: number;
  hired: number;
  available: number;
  interview: number;
}

export interface IDemographicData {
  candidates: {
    numberOfCandidates: number;
    candidatePercent: number;
  };
  hires: {
    numberOfHires: number;
    hirePercent: number;
  };
  totalJobSeekers: number;
  totalHired: number;
}
export interface PlotDataPoint {
  _id: string;
  count: number;
}

export interface IPlotData {
  candidatePlot: PlotDataPoint[];
  hirePlot: PlotDataPoint[];
}
