import { NextResponse } from "next/server";

export const runtime = "nodejs";

function includesAny(text: string, words: string[]) { return words.some(w => text.includes(w)); }

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const job = typeof body.job === "string" ? body.job.trim() : "";
    const role = typeof body.role === "string" ? body.role : "IT services / custom software";
    const tone = typeof body.tone === "string" ? body.tone : "Direct and consultative";
    if (job.length < 40) return NextResponse.json({ error: "Please provide a fuller job description (at least 40 characters)." }, { status: 400 });
    if (job.length > 18000) return NextResponse.json({ error: "For this demo, keep the brief under 18,000 characters." }, { status: 413 });

    const t = job.toLowerCase();
    const requirements: string[] = [];
    const risks: string[] = [];
    const questions: string[] = [];
    const add = (condition: boolean, item: string) => { if (condition) requirements.push(item); };
    add(includesAny(t, ["mobile", "responsive", "phone", "ios", "android"]), "Mobile-first or responsive user experience.");
    add(includesAny(t, ["admin", "dashboard", "manage", "back office"]), "Administrative workflows and permissions.");
    add(includesAny(t, ["payment", "stripe", "checkout", "billing"]), "Payment or billing integration.");
    add(includesAny(t, ["booking", "appointment", "calendar", "availability", "schedule"]), "Scheduling, availability, and booking lifecycle.");
    add(includesAny(t, ["ai", "llm", "chatbot", "automation", "rag"]), "AI or automation functionality.");
    add(includesAny(t, ["api", "integrat", "webhook", "third-party"]), "Third-party API or integration requirements.");
    add(includesAny(t, ["report", "analytics", "metric"]), "Reporting or analytics requirements.");
    add(includesAny(t, ["migration", "legacy", "existing system", "current platform"]), "Existing-system compatibility or migration.");
    if (requirements.length === 0) requirements.push("Clarify the primary user journey, core deliverables, and acceptance criteria.", "Identify required platform, integrations, and operational workflows.");

    const deadline = job.match(/\b(?:in|within|over)\s+(\d+\s*(?:days?|weeks?|months?))\b/i)?.[1];
    if (deadline) risks.push("A delivery window is stated (" + deadline + "); confirm scope, dependencies, and client-side response times before committing.");
    if (includesAny(t, ["ai", "llm", "chatbot"])) risks.push("AI quality, evaluation criteria, data handling, and fallback behavior are not fully specified.");
    if (includesAny(t, ["payment", "stripe", "billing"])) risks.push("Payment edge cases, refunds, tax handling, and webhook reliability may expand scope.");
    if (includesAny(t, ["integrat", "api", "webhook"])) risks.push("External API access, sandbox credentials, rate limits, and vendor dependencies need confirmation.");
    if (includesAny(t, ["secure", "security", "hipaa", "gdpr", "compliance"])) risks.push("Security and compliance obligations require explicit scope and validation; do not treat them as implied.");
    risks.push("The brief may omit acceptance criteria, ownership of content/data, and post-launch support expectations.");
    questions.push("What is the single most important outcome this release must achieve?");
    questions.push("Which user roles, workflows, and edge cases are required for the first release?");
    questions.push("Which existing systems, APIs, credentials, or data sources will be available?");
    questions.push("How will acceptance be measured, and who signs off on delivery?");
    questions.push("What is the budget range and what support is expected after launch?");

    const strategy = [
      "Lead with the business outcome and one relevant implementation approach, not a generic introduction.",
      "Separate confirmed requirements from assumptions; propose a small, testable first release.",
      "Address the highest delivery risk directly and explain how it will be validated early.",
      "Use only portfolio examples and capabilities that can be independently verified."
    ];
    const summary = `This brief appears to describe a ${role.toLowerCase()} opportunity. The strongest response should connect the stated deliverables to the buyer’s intended outcome, then clarify scope and dependencies before making a firm commitment. Treat inferred needs as hypotheses, not facts.`;
    const proposal = [
      "Hi,",
      "",
      "The key to this project is getting the core user journey and delivery boundaries clear before implementation begins.",
      "",
      "I would start by mapping the required workflows, confirming integrations and acceptance criteria, and separating first-release essentials from later enhancements. That gives both sides a concrete scope to validate before timeline and budget are locked.",
      "",
      "For this " + role.toLowerCase() + " engagement, I would prioritize: " + requirements.slice(0,3).join("; ").toLowerCase() + ".",
      "",
      "Before confirming an estimate, I would clarify the existing systems involved, the acceptance criteria, and who will provide access and feedback during delivery.",
      "",
      "If useful, the next step is a short discovery discussion to confirm those points and define a realistic first release.",
      "",
      "Best,",
      "[Your name]",
      "",
      "Tone requested: " + tone + ". Review and personalize before sending."
    ].join("\n");

    return NextResponse.json({ summary, requirements, risks: risks.slice(0,6), strategy, questions, proposal, mode: "DETERMINISTIC DEMO" });
  } catch {
    return NextResponse.json({ error: "Invalid request. Please retry with a plain-text job description." }, { status: 400 });
  }
}