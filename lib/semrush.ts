import { SemrushKeywordRow } from "./types";

function parseNumber(value: string | undefined): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Starter implementation.
 * Adjust Semrush report type / export columns later as you refine the workflow.
 */
export async function fetchSemrushKeywordRows(
  domain: string,
  database: string = "us",
  limit: number = 100
): Promise<SemrushKeywordRow[]> {
  const apiKey = process.env.SEMRUSH_API_KEY;

  if (!apiKey) {
    throw new Error("Missing SEMRUSH_API_KEY");
  }

  const params = new URLSearchParams({
    key: apiKey,
    type: "domain_organic",
    display_limit: String(limit),
    export_columns: "Ph,Po,Nq,Ur",
    domain,
    database
  });

  const url = `https://api.semrush.com/?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Semrush request failed: ${response.status}`);
  }

  const text = await response.text();
  const lines = text.trim().split("\n");

  if (lines.length <= 1) return [];

  const rows = lines.slice(1).map((line) => {
    const [keyword, position, volume, url] = line.split(";");

    return {
      keyword: keyword?.trim() || "",
      position: parseNumber(position),
      volume: parseNumber(volume),
      url: url?.trim() || ""
    } satisfies SemrushKeywordRow;
  });

  return rows.filter((row) => row.keyword && row.url);
}
