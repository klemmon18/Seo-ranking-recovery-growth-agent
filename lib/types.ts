export type IntentBucket =
  | "local"
  | "commercial"
  | "decision"
  | "informational"
  | "unknown";

export type SemrushKeywordRow = {
  keyword: string;
  position: number | null;
  previousPosition?: number | null;
  volume?: number | null;
  url: string;
  intentBucket?: IntentBucket;
};

export type CannibalizationCase = {
  keyword: string;
  urls: string[];
  recommendedPrimaryUrl: string;
  reason: string;
};

export type QuickWin = {
  keyword: string;
  position: number;
  url: string;
  volume?: number | null;
  intentBucket: IntentBucket;
  reason: string;
};

export type SnapshotResponse = {
  clientDomain: string;
  summary: {
    totalKeywordsAnalyzed: number;
    cannibalizationCount: number;
    quickWinCount: number;
    topDropsCount: number;
  };
  topDrops: SemrushKeywordRow[];
  quickWins: QuickWin[];
  cannibalizationCases: CannibalizationCase[];
  rawSample?: SemrushKeywordRow[];
};
