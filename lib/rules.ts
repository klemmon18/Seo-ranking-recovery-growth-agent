import { CannibalizationCase, IntentBucket, QuickWin, SemrushKeywordRow } from "./types";

function classifyIntent(keyword: string): IntentBucket {
  const k = keyword.toLowerCase();

  if (
    k.includes("near me") ||
    k.includes("fort collins") ||
    k.includes("loveland") ||
    k.includes("greeley") ||
    k.includes("denver")
  ) {
    return "local";
  }

  if (
    k.includes("cost") ||
    k.includes("vs") ||
    k.includes("do i need") ||
    k.includes("when should") ||
    k.includes("how much")
  ) {
    return "decision";
  }

  if (
    k.includes("cpa") ||
    k.includes("accounting services") ||
    k.includes("bookkeeping services") ||
    k.includes("tax services")
  ) {
    return "commercial";
  }

  return "informational";
}

function choosePrimaryUrl(urls: string[]): string {
  const preferred = urls.find((u) => !u.includes("/blog/"));
  return preferred || urls[0];
}

export function enrichRows(rows: SemrushKeywordRow[]): SemrushKeywordRow[] {
  return rows.map((row) => ({
    ...row,
    intentBucket: classifyIntent(row.keyword)
  }));
}

export function detectCannibalization(rows: SemrushKeywordRow[]): CannibalizationCase[] {
  const grouped = new Map<string, Set<string>>();

  for (const row of rows) {
    const key = row.keyword.toLowerCase().trim();
    if (!grouped.has(key)) grouped.set(key, new Set());
    grouped.get(key)!.add(row.url);
  }

  const cases: CannibalizationCase[] = [];

  for (const [keyword, urlSet] of grouped.entries()) {
    const urls = Array.from(urlSet);

    if (urls.length > 1) {
      cases.push({
        keyword,
        urls,
        recommendedPrimaryUrl: choosePrimaryUrl(urls),
        reason:
          "Multiple URLs appear to compete for the same keyword. Choose one primary page and reposition the others to support it."
      });
    }
  }

  return cases;
}

export function detectQuickWins(rows: SemrushKeywordRow[]): QuickWin[] {
  return rows
    .filter((row) => row.position !== null && row.position >= 8 && row.position <= 30)
    .filter(
      (row) =>
        row.intentBucket === "local" ||
        row.intentBucket === "commercial" ||
        row.intentBucket === "decision"
    )
    .map((row) => ({
      keyword: row.keyword,
      position: row.position!,
      url: row.url,
      volume: row.volume ?? null,
      intentBucket: row.intentBucket || "unknown",
      reason:
        "This keyword is ranking within striking distance and has stronger business value because of local, commercial, or decision-stage intent."
    }))
    .sort((a, b) => a.position - b.position)
    .slice(0, 15);
}

export function detectTopDrops(rows: SemrushKeywordRow[]): SemrushKeywordRow[] {
  return rows
    .filter((row) => row.position !== null)
    .sort((a, b) => a.position! - b.position!)
    .slice(0, 10);
}
