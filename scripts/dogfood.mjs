#!/usr/bin/env node
/**
 * Dogfood test suite for Repertoire.
 * Usage: node scripts/dogfood.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? "http://localhost:3000";

const QUERIES = [
  {
    name: "late Schubert melancholic grade 6",
    query: "melancholic, slow, something like late Schubert but simpler, under grade 6",
    expectTopComposer: /Schubert|Satie|Schumann|Grieg/i,
    expectGradeMax: 6,
    expectMood: /melancholic|wistful|gentle|dreamy|nostalgic/i,
  },
  {
    name: "Liszt virtuoso octaves short",
    query: "fast, virtuosic, romantic, lots of octaves, like Liszt but shorter",
    expectTopComposer: /Liszt|Chopin|Scarlatti|Prokofiev/i,
  },
  {
    name: "20th century bach-like counterpoint",
    query: "contrapuntal, intellectual, bach-like but from the 20th century",
    expectTopComposer: /Bach|Bart|Shostakovich|Prokofiev|Kapustin/i,
  },
  {
    name: "gentle sight-reading dreamy",
    query: "gentle, dreamy, good for sight-reading, not too many accidentals",
    expectGradeMax: 5,
    expectMood: /gentle|dreamy|simple|light|calm|tender/i,
  },
  {
    name: "dark dramatic minor grade 7-8",
    query: "dark, dramatic, minor key, big chords, grade 7-8",
    expectGradeMin: 6,
    expectMood: /dark|dramatic|tragic|stormy|brooding|heroic/i,
  },
  {
    name: "dinner party classical happy",
    query: "something happy and classical to play at a dinner party, not too hard",
    expectTopComposer: /Mozart|Haydn|Beethoven|Clementi|Mendelssohn|Grieg|Burgm/i,
    expectGradeMax: 6,
  },
  {
    name: "gymnopedie-like obscure",
    query: "something like Gymnopédies but less well-known",
    expectTopComposer: /Satie|Debussy|Ravel|Schumann/i,
  },
  {
    name: "baroque finger independence",
    query: "energetic baroque counterpoint, good for developing finger independence",
    expectTopComposer: /Bach|Scarlatti|Handel/i,
  },
];

async function warmCorpus() {
  const res = await fetch(`${BASE}/api/embed-corpus`, { method: "POST" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Corpus warm failed");
  return data;
}

async function search(query) {
  const res = await fetch(`${BASE}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, mode: "both" }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Search failed");
  return data;
}

async function checkImslp(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "RepertoireDogfood/1.0" },
  });
  const text = await res.text();
  const empty = text.includes("There is currently no text in this page");
  const hasScores = /Sheet Music|Scores \(|General Information|Movements/i.test(text);
  const isSearch = url.includes("Special:Search");
  return { status: res.status, empty, hasScores, isSearch, finalUrl: res.url };
}

const results = { passed: 0, failed: 0, warnings: 0, issues: [] };
const pass = (m) => { results.passed++; console.log(`  ✓ ${m}`); };
const fail = (m) => { results.failed++; results.issues.push(m); console.log(`  ✗ ${m}`); };
const warn = (m) => { results.warnings++; console.log(`  ⚠ ${m}`); };

console.log(`=== REPERTOIRE DOGFOOD (${BASE}) ===\n`);

console.log("1. Corpus");
const corpus = await warmCorpus();
pass(`Indexed ${corpus.count} pieces in ${corpus.elapsedMs}ms`);

console.log("\n2. Edge cases");
const emptyRes = await fetch(`${BASE}/api/search`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "" }),
});
emptyRes.status === 400 ? pass("Empty query → 400") : fail(`Empty query → ${emptyRes.status}`);

console.log("\n3. Search quality");
const imslpUrls = new Set();

for (const test of QUERIES) {
  console.log(`\n  [${test.name}]`);
  const data = await search(test.query);
  const top = data.rerankResults?.[0];
  if (!top) { fail("No results"); continue; }

  pass(`${top.title} — ${top.composer} (${top.difficulty}, ${Math.round(top.score * 100)}%)`);

  if (test.expectTopComposer && !test.expectTopComposer.test(top.composer))
    warn(`Composer: ${top.composer}`);
  else if (test.expectTopComposer) pass(`Composer ok`);

  if (test.expectGradeMax && top.grade > test.expectGradeMax)
    warn(`Grade ${top.grade} > max ${test.expectGradeMax}`);
  else if (test.expectGradeMax) pass(`Grade ok`);

  if (test.expectMood) {
    const hit = data.rerankResults.slice(0, 3).some((p) => test.expectMood.test(p.mood.join(" ")));
    hit ? pass("Mood in top 3") : warn("Mood miss in top 3");
  }

  pass(`Latency ${data.timings.totalMs}ms`);
  data.rerankResults.slice(0, 5).forEach((p) => imslpUrls.add(p.imslpUrl));
}

console.log("\n4. IMSLP links");
for (const url of imslpUrls) {
  const c = await checkImslp(url);
  const label = decodeURIComponent(url.replace("https://imslp.org/wiki/", "")).slice(0, 55);
  if (c.empty || c.status >= 400) fail(`404: ${label}`);
  else if (c.isSearch) pass(`Search fallback: ${label}`);
  else if (c.hasScores) pass(`Scores: ${label}`);
  else warn(`No scores detected: ${label}`);
  await new Promise((r) => setTimeout(r, 250));
}

console.log(`\n=== ${results.passed} passed, ${results.warnings} warnings, ${results.failed} failed ===`);
if (results.issues.length) results.issues.forEach((i) => console.log(`  - ${i}`));
process.exit(results.failed > 0 ? 1 : 0);
