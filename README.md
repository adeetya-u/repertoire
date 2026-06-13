# Repertoire

**Semantic piano score discovery** — describe what you want to play in natural language, and find it in a curated IMSLP corpus using Cohere's Embed + Rerank pipeline.

> "melancholic, slow, something like late Schubert but simpler, under grade 6"

Keyword search can't match musical mood. Semantic search can.

## Why Embed + Rerank?

| Stage | API | Role |
|-------|-----|------|
| **Recall** | Cohere Embed v4.0 | Vectorize 440+ piece descriptions; find top-30 by cosine similarity |
| **Precision** | Cohere Rerank v4.0-pro | Re-score shortlist against your exact query |

Embed captures broad semantic similarity ("nocturne-like, introspective, Romantic"). Rerank distinguishes nuance ("slow **and** melancholic" vs "slow but triumphant").

## Quick start

```bash
npm install
cp .env.example .env.local
# Add your Cohere API key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app indexes the corpus on first load (~30–60s), then searches are fast.

## Environment

```
COHERE_API_KEY=your_key_here
```

Get a key at [cohere.com](https://cohere.com).

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Cohere Embed v4.0** — `search_document` for corpus, `search_query` for queries
- **Cohere Rerank v4.0-pro** — precision scoring on top-30 recall
- In-memory vector store (no external DB)

## Corpus

440 piano pieces spanning Baroque through 20th century, with rich semantic descriptions:

- Mood tags (melancholic, virtuoso, dreamy, …)
- ABRSM-style difficulty grades (1–8+)
- Tempo, texture, era, composer notes
- Direct IMSLP links

## Demo queries

1. `melancholic, slow, something like late Schubert but simpler, under grade 6`
2. `fast, virtuosic, romantic, lots of octaves, like Liszt but shorter`
3. `contrapuntal, intellectual, bach-like but from the 20th century`
4. `gentle, dreamy, good for sight-reading, not too many accidentals`
5. `dark, dramatic, minor key, big chords, grade 7-8`

## API routes

- `POST /api/embed-corpus` — embed all pieces (runs on app load)
- `POST /api/search` — full pipeline: embed query → cosine top-30 → rerank top-10

## License

MIT
