import { NextResponse } from "next/server";
import { getCorpusStatus, getEmbeddedCorpus } from "@/lib/corpus-store";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST() {
  try {
    const start = Date.now();
    const embedded = await getEmbeddedCorpus();
    const elapsed = Date.now() - start;

    return NextResponse.json({
      success: true,
      count: embedded.length,
      elapsedMs: elapsed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(getCorpusStatus());
}
