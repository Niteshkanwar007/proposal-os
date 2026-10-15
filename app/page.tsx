"use client";

import { useState } from "react";

type Analysis = {
  summary: string;
  requirements: string[];
  risks: string[];
  strategy: string[];
  questions: string[];
  proposal: string;
  mode: string;
};

const sample = `We are a growing wellness company looking for a developer to build a customer booking portal. Customers should be able to browse services, select a provider, book appointments, and receive confirmations. Admins need to manage availability and cancellations. We want a clean mobile-first experience and a launch in 8 weeks. Please explain your approach, relevant experience, timeline, and budget.`;

export default function Home() {
  const [job, setJob] = useState("");
  const [role, setRole] = useState("IT services / custom software");
  const [tone, setTone] = useState("Direct and consultative");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (job.trim().length < 40) {
      setError("Paste a job description with at least 40 characters so the demo has enough context.");
      return;
    }
    setLoading(true); setError(""); setAnalysis(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job, role, tone })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed.");
      setAnalysis(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally { setLoading(false); }
  }

  return <main className="shell">
    <nav className="nav"><div className="brandmark">P<span>OS</span></div><div className="navcopy">PROPOSAL INTELLIGENCE <span className="live"><i/> DEMO MODE</span></div></nav>
    <section className="hero">
      <div className="eyebrow"><span/> OBSERVE BEFORE YOU WRITE</div>
      <h1>Understand the opportunity.<br/><em>Then write the proposal.</em></h1>
      <p className="lede">Turn a job brief into a structured view of the buyer’s needs, hidden risks, technical scope, and a proposal starting point.</p>
    </section>
    <section className="workspace">
      <div className="inputpanel">
        <div className="sectionhead"><div><div className="step">01 / INPUT</div><h2>Opportunity brief</h2></div><button className="quiet" onClick={() => {setJob(sample);setError("");}}>Load sample ↗</button></div>
        <label htmlFor="job">JOB DESCRIPTION</label>
        <textarea id="job" value={job} onChange={e=>setJob(e.target.value)} placeholder="Paste the complete job post here…" rows={11}/>
        <div className="controls">
          <div><label htmlFor="role">SOLUTION CONTEXT</label><select id="role" value={role} onChange={e=>setRole(e.target.value)}><option>IT services / custom software</option><option>AI / SaaS product</option><option>Shopify / e-commerce</option><option>Mobile application</option><option>Website / CMS</option></select></div>
          <div><label htmlFor="tone">PROPOSAL TONE</label><select id="tone" value={tone} onChange={e=>setTone(e.target.value)}><option>Direct and consultative</option><option>Warm and relationship-led</option><option>Technical and precise</option><option>Concise and commercial</option></select></div>
        </div>
        <button className="primary" onClick={run} disabled={loading}>{loading ? "Reading the opportunity…" : "Run opportunity analysis"} <span>→</span></button>
        {error && <p className="error">{error}</p>}
        <p className="fineprint">Demo uses a deterministic analysis pipeline. No API key required. Validate inferences before using them with a real client.</p>
      </div>
      <aside className="pipeline">
        <div className="step">02 / REASONING PIPELINE</div><h2>Observe first.</h2><p className="muted">The demo organizes the brief into a sequence of reviewable steps.</p>
        {["Brief parsing","Business context","Requirement mapping","Risk & uncertainty","Proposal strategy","Draft & review"].map((s,i)=><div className="pipelineitem" key={s}><span className="node">{String(i+1).padStart(2,"0")}</span><div><strong>{s}</strong><small>{["Extract what the buyer explicitly said","Identify the likely business outcome","Separate core features from assumptions","Surface delivery and scope risks","Choose an evidence-led response angle","Create a draft that can be reviewed"][i]}</small></div></div>)}
      </aside>
    </section>
    {analysis && <section className="results">
      <div className="resulthead"><div><div className="step">03 / OUTPUT</div><h2>Opportunity intelligence</h2></div><span className="pill">{analysis.mode}</span></div>
      <div className="summary">{analysis.summary}</div>
      <div className="resultgrid">
        <Result title="Requirements detected" items={analysis.requirements} number="A"/>
        <Result title="Risks & unknowns" items={analysis.risks} number="B"/>
        <Result title="Recommended strategy" items={analysis.strategy} number="C"/>
        <Result title="Discovery questions" items={analysis.questions} number="D"/>
      </div>
      <div className="draft"><div className="drafthead"><div><div className="step">DRAFT OUTPUT</div><h3>Proposal starting point</h3></div><button className="quiet" onClick={()=>navigator.clipboard.writeText(analysis.proposal)}>Copy draft ↗</button></div><pre>{analysis.proposal}</pre><p className="fineprint">This is a starting draft, not a verified claim set. Replace placeholders and confirm portfolio evidence, scope, budget, and timeline before sending.</p></div>
    </section>}
    <footer><span>PROPOSALOS</span><span>Structured reasoning · Human review · Evidence first</span></footer>
  </main>;
}

function Result({title,items,number}:{title:string;items:string[];number:string}) {
  return <article className="resultcard"><div className="cardtop"><span>{number}</span><h3>{title}</h3></div><ul>{items.map((item,i)=><li key={i}>{item}</li>)}</ul></article>;
}