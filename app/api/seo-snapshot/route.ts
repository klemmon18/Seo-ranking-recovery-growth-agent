import { NextRequest, NextResponse } from "next/server";
import { fetchSemrushKeywordRows } from "@/lib/semrush";
import { detectCannibalization, detectQuickWins, detectTopDrops, enrichRows } from "@/lib/rules";
import { SnapshotResponse } from "@/lib/types";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  try {
    const requestApiKey = req.headers.get("x-api-key");
    const appApiKey = process.env.APP_API_KEY;

    if (!appApiKey || requestApiKey !== appApiKey) {
      return unauthorized();
    }

    const body = await req.json();
    const domain = body?.domain;
    const database = body?.database || process.env.SEMRUSH_DATABASE || "us";
    const topN = Number(body?.topN || 100);

    if (!domain) {
      return NextResponse.json(
        { error: "Missing required field: domain" },
        { status: 400 }
      );
    }

    const rawRows = await fetchSemrushKeywordRows(domain, database, topN);
    const rows = enrichRows(rawRows);

    const cannibalizationCases = detectCannibalization(rows);
    const quickWins = detectQuickWins(rows);
    const topDrops = detectTopDrops(rows);

    const payload: SnapshotResponse = {
      clientDomain: domain,
      summary: {
        totalKeywordsAnalyzed: rows.length,
        cannibalizationCount: cannibalizationCases.length,
        quickWinCount: quickWins.length,
        topDropsCount: topDrops.length
      },
      topDrops,
      quickWins,
      cannibalizationCases,
      rawSample: rows.slice(0, 20)
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("seo-snapshot error", error);

    return NextResponse.json(
      {
        error: "Failed to build SEO snapshot",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
