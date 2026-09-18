import { NextRequest, NextResponse } from "next/server";
import { buildReport, relationshipCode } from "@/lib/godcode";
import { validateText, DISCLOSURE, ANTI_OCCULT_NOTE } from "@/lib/guardrails";
import { DISCLOSURE as D2, ANTI_OCCULT_NOTE as A2 } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, dob, seasonWord, partnerDob } = body ?? {};

    if (!name || !dob) {
      return NextResponse.json({ error: "name and dob (MM/DD/YYYY) are required" }, { status: 400 });
    }

    const report = buildReport({ name, dob, seasonWord });
    if ("error" in report) {
      return NextResponse.json({ error: report.error }, { status: 400 });
    }

    // GUARDRAIL: scan every generated text field before serving.
    const texts = [report.prayer, report.nameReflection, ...Object.values(report.personality)];
    for (const t of texts) {
      const v = validateText(t);
      if (!v.ok) {
        return NextResponse.json(
          { error: "Guardrail violation in generated text", hits: v.hits },
          { status: 500 }
        );
      }
    }

    report.disclosure = D2;
    report.antiOccultNote = A2;

    const payload: any = { report };
    if (partnerDob) payload.relationship = relationshipCode(dob, partnerDob);
    return NextResponse.json(payload);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "server error" }, { status: 500 });
  }
}
