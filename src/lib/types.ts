export interface PianoPiece {
  id: string;
  title: string;
  composer: string;
  era: string;
  year: number;
  difficulty: string;
  grade: number;
  tempo: string;
  mood: string[];
  texture: string;
  description: string;
  imslpUrl: string;
  tags: string[];
}

export interface ScoredPiece extends PianoPiece {
  score: number;
  rank: number;
}

export interface SearchResult {
  query: string;
  embedResults: ScoredPiece[];
  rerankResults: ScoredPiece[];
  timings: {
    embedMs: number;
    cosineMs: number;
    rerankMs: number;
    totalMs: number;
  };
  corpusSize: number;
}

export interface EmbeddedPiece extends PianoPiece {
  embedding: number[];
  embedText: string;
}
