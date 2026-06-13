import type { PianoPiece } from "../types";
import { definePiece } from "./helpers";

type RawPiece = Omit<PianoPiece, "id" | "imslpUrl">;

function p(piece: RawPiece): PianoPiece {
  return definePiece(piece);
}

function numberedWorks(
  composer: string,
  era: string,
  prefix: string,
  count: number,
  baseYear: number,
  baseGrade: number,
  profiles: Array<{
    tempo: string;
    mood: string[];
    texture: string;
    description: string;
    tags: string[];
    gradeOffset?: number;
  }>
): PianoPiece[] {
  return Array.from({ length: count }, (_, i) => {
    const profile = profiles[i % profiles.length];
    const grade = Math.min(8, Math.max(1, baseGrade + (profile.gradeOffset ?? 0) + (i % 3) - 1));
    return p({
      title: `${prefix} No. ${i + 1}`,
      composer,
      era,
      year: baseYear + i,
      difficulty: `Grade ${grade}`,
      grade,
      tempo: profile.tempo,
      mood: profile.mood,
      texture: profile.texture,
      description: profile.description.replace("{n}", String(i + 1)),
      tags: profile.tags,
    });
  });
}

const handcrafted: RawPiece[] = [
  {
    title: "Nocturne in C-sharp minor, Op. posth.",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1830,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Lento con gran espressione",
    mood: ["melancholic", "introspective", "yearning", "tender"],
    texture: "Lyrical melody over arpeggiated accompaniment",
    description:
      "A deeply personal nocturne with a singing right-hand melody over flowing left-hand arpeggios. The middle section builds to a passionate climax before returning to the opening theme. Requires sensitive pedaling and rubato. Similar in character to Field's nocturnes but with more harmonic daring.",
    tags: ["nocturne", "salon", "ternary form", "arpeggios", "legato"],
  },
  {
    title: "Impromptu in G-flat major, Op. 90 No. 3",
    composer: "Franz Schubert",
    era: "Romantic",
    year: 1827,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Andante",
    mood: ["melancholic", "wistful", "gentle", "nostalgic"],
    texture: "Rolling triplets with lyrical melody",
    description:
      "Late Schubert at his most tender. A flowing melody in triplets creates a sense of gentle sorrow without despair. Harmonically rich but pianistically approachable. Ideal for players seeking Schubert's introspective world without the technical demands of his late sonatas.",
    tags: ["impromptu", "late schubert", "triple meter", "salon"],
  },
  {
    title: "Gymnopédie No. 1",
    composer: "Erik Satie",
    era: "Impressionist",
    year: 1888,
    difficulty: "Grade 4",
    grade: 4,
    tempo: "Lent et douloureux",
    mood: ["dreamy", "melancholic", "static", "hypnotic"],
    texture: "Slow block chords with simple melody",
    description:
      "Iconic slow piece with alternating chords and a bare melody. Creates a suspended, otherworldly atmosphere. Minimalist before minimalism. Perfect for exploring tone color and pedaling at an intermediate level.",
    tags: ["gymnopédie", "minimal", "atmospheric", "slow"],
  },
  {
    title: "Clair de Lune",
    composer: "Claude Debussy",
    era: "Impressionist",
    year: 1905,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Andante très expressif",
    mood: ["dreamy", "ethereal", "romantic", "nocturnal"],
    texture: "Layered arpeggios with expressive melody",
    description:
      "The most famous impressionist piano piece. Evokes moonlight through shimmering harmonies and delicate voicing. Requires control of touch and pedal to avoid muddiness. Atmospheric and emotionally evocative.",
    tags: ["impressionist", "suite bergamasque", "arpeggios", "pedal"],
  },
  {
    title: "Prelude in E minor, Op. 28 No. 4",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1839,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Largo",
    mood: ["melancholic", "tragic", "solemn", "dark"],
    texture: "Chorale-like melody over sustained bass",
    description:
      "One of Chopin's shortest and most devastating preludes. A descending melody over a mournful bass creates unbearable sadness in under two minutes. Technically modest but emotionally demanding.",
    tags: ["prelude", "chorale", "minor key", "expressive"],
  },
  {
    title: "Sonata in A major, K. 331 – Rondo alla Turca",
    composer: "Wolfgang Amadeus Mozart",
    era: "Classical",
    year: 1783,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Allegretto",
    mood: ["energetic", "bright", "festive", "playful"],
    texture: "Octaves and repeated rhythmic figures",
    description:
      "Mozart's Turkish march finale. Bouncy rhythm and brilliant octave passages create a crowd-pleasing effect. More showpiece than deep expression, ideal for social settings.",
    tags: ["classical", "rondo", "octaves", "popular"],
  },
  {
    title: "Waltz in A minor, B. 150",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1847,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Tempo di valse",
    mood: ["melancholic", "elegant", "bittersweet", "nostalgic"],
    texture: "Waltz bass with lyrical upper voice",
    description:
      "Chopin's only waltz in a minor key. Combines dance elegance with underlying sadness. More accessible than his grand waltzes but retains his characteristic rubato and voicing challenges.",
    tags: ["waltz", "dance", "minor key", "salon"],
  },
  {
    title: "Kinderszenen, Op. 15 – Träumerei",
    composer: "Robert Schumann",
    era: "Romantic",
    year: 1838,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Sehr langsam",
    mood: ["dreamy", "innocent", "tender", "nostalgic"],
    texture: "Simple song-like melody with chordal accompaniment",
    description:
      "The best-known piece from Scenes from Childhood. A child's dream rendered in pure, uncomplicated melody. Slow and intimate. Requires singing tone rather than virtuosity.",
    tags: ["schumann", "character piece", "slow", "lyrical"],
  },
  {
    title: "Consolation No. 3 in D-flat major, S. 172",
    composer: "Franz Liszt",
    era: "Romantic",
    year: 1850,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Lento placido",
    mood: ["consoling", "warm", "gentle", "serene"],
    texture: "Flowing arpeggios with cantabile melody",
    description:
      "Liszt without the fireworks. A surprisingly approachable piece with rolling left-hand patterns and a hymn-like melody. Shows the softer side of a composer known for virtuosity.",
    tags: ["liszt", "salon", "arpeggios", "cantabile"],
  },
  {
    title: "Arabesque No. 1",
    composer: "Claude Debussy",
    era: "Impressionist",
    year: 1888,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Andantino con moto",
    mood: ["flowing", "graceful", "light", "decorative"],
    texture: "Arpeggiated patterns with ornamental melody",
    description:
      "Early Debussy with impressionist harmonic color. Flowing arabesque figuration in the right hand over gentle accompaniment. Less atmospheric than Clair de Lune but more active and decorative.",
    tags: ["impressionist", "arabesque", "intermediate"],
  },
  {
    title: "Invention No. 1 in C major, BWV 772",
    composer: "Johann Sebastian Bach",
    era: "Baroque",
    year: 1723,
    difficulty: "Grade 4",
    grade: 4,
    tempo: "Moderato",
    mood: ["bright", "inventive", "clear", "logical"],
    texture: "Two-part counterpoint",
    description:
      "A crisp two-voice invention ideal for developing hand independence and clarity. Clean lines and predictable harmonic language make it approachable yet satisfying for intermediate players exploring Bach.",
    tags: ["baroque", "invention", "counterpoint", "two-part"],
  },
  {
    title: "Sonata in E major, K. 380",
    composer: "Domenico Scarlatti",
    era: "Baroque",
    year: 1753,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Allegro",
    mood: ["brilliant", "Spanish", "virtuoso", "festive"],
    texture: "Repeated notes and guitar-like figuration",
    description:
      "One of Scarlatti's most popular sonatas with repeated-note fanfares and Iberian flair. Requires crisp articulation and rhythmic precision. Short but dazzling.",
    tags: ["scarlatti", "sonata", "repeated notes", "baroque"],
  },
  {
    title: "Bagatelle in A minor, WoO 59 'Für Elise'",
    composer: "Ludwig van Beethoven",
    era: "Classical",
    year: 1810,
    difficulty: "Grade 4",
    grade: 4,
    tempo: "Poco moto",
    mood: ["gentle", "wistful", "familiar", "graceful"],
    texture: "Arpeggiated accompaniment with simple melody",
    description:
      "The world's most recognized piano piece. Simple A-B-A form with a famous lyrical theme and agitated middle section. Excellent sight-reading piece with moderate technical demands.",
    tags: ["beethoven", "bagatelle", "popular", "beginner-friendly"],
  },
  {
    title: "Prelude in C major, BWV 846",
    composer: "Johann Sebastian Bach",
    era: "Baroque",
    year: 1722,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Moderato",
    mood: ["serene", "timeless", "meditative", "pure"],
    texture: "Continuous arpeggiated harmony",
    description:
      "The opening prelude from The Well-Tempered Clavier. Unbroken arpeggiated texture creates a meditative, almost hypnotic calm. Deceptively simple but demands even tone and steady pulse.",
    tags: ["bach", "wtc", "prelude", "arpeggios"],
  },
  {
    title: "Nocturne in E-flat major, Op. 9 No. 2",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1832,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Andante",
    mood: ["romantic", "elegant", "flowing", "expressive"],
    texture: "Ornamented melody over broken chords",
    description:
      "Chopin's most famous nocturne. A bel canto melody adorned with graceful ornaments floats over a gentle accompaniment. Requires refined touch and rubato. Salon elegance at its finest.",
    tags: ["nocturne", "chopin", "bel canto", "ornamentation"],
  },
  {
    title: "Mazurka in B minor, Op. 33 No. 4",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1838,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Moderato",
    mood: ["nostalgic", "rustic", "intimate", "dance-like"],
    texture: "Folk dance rhythm with dotted figures",
    description:
      "A mazurka with Polish folk character and subtle rhythmic nuance. Less virtuosic than Chopin's etudes but demands understanding of dance inflection and national style.",
    tags: ["mazurka", "polish", "dance", "character piece"],
  },
  {
    title: "Sonata in C major, Hob. XVI:50 – Allegro",
    composer: "Joseph Haydn",
    era: "Classical",
    year: 1794,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Allegro",
    mood: ["witty", "bright", "classical", "confident"],
    texture: "Classical sonata texture with scales and Alberti bass",
    description:
      "Late Haydn sonata with humor and structural clarity. Good introduction to classical sonata form without Beethoven's intensity. Suitable for dinner parties and recitals alike.",
    tags: ["haydn", "sonata", "classical", "sonata form"],
  },
  {
    title: "Pictures at an Exhibition – Promenade",
    composer: "Modest Mussorgsky",
    era: "Romantic",
    year: 1874,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Allegro giusto",
    mood: ["strolling", "noble", "confident", "Russian"],
    texture: "Bold melody with chordal accompaniment",
    description:
      "The recurring theme from Mussorgsky's suite. A confident walking melody with Russian character. More narrative than abstract, evoking a visitor moving through an gallery.",
    tags: ["mussorgsky", "character piece", "russian", "programmatic"],
  },
  {
    title: "Etude in C minor, Op. 10 No. 12 'Revolutionary'",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1831,
    difficulty: "Grade 8",
    grade: 8,
    tempo: "Allegro con fuoco",
    mood: ["dramatic", "furious", "heroic", "defiant"],
    texture: "Left-hand octave runs with right-hand chords",
    description:
      "Chopin's most dramatic etude. Torrential left-hand figuration drives relentless energy. Requires stamina and power. For advanced players seeking Romantic storm and stress.",
    tags: ["etude", "virtuoso", "octaves", "dramatic"],
  },
  {
    title: "Sonata No. 8 in C minor, Op. 13 – Pathétique (Grave)",
    composer: "Ludwig van Beethoven",
    era: "Classical",
    year: 1798,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Grave – Allegro di molto e con brio",
    mood: ["tragic", "dramatic", "heroic", "dark"],
    texture: "Heavy chords and dramatic contrasts",
    description:
      "Beethoven's famous Pathétique opens with a tragic slow introduction of massive chords before launching into a stormy allegro. Emotionally charged and technically substantial.",
    tags: ["beethoven", "sonata", "dramatic", "classical"],
  },
  {
    title: "Je te veux",
    composer: "Erik Satie",
    era: "Impressionist",
    year: 1903,
    difficulty: "Grade 4",
    grade: 4,
    tempo: "Modéré",
    mood: ["cheerful", "cabaret", "light", "whimsical"],
    texture: "Waltz with simple melody",
    description:
      "A charming Parisian waltz with café-concert flavor. Less austere than the Gymnopédies. Playful and accessible, good for social occasions.",
    tags: ["satie", "waltz", "cabaret", "light"],
  },
  {
    title: "Prelude in D-flat major, Op. 28 No. 15 'Raindrop'",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1839,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Sostenuto",
    mood: ["meditative", "stormy", "atmospheric", "brooding"],
    texture: "Repeated A-flat pedal tone with lyrical melody",
    description:
      "Named for the persistent repeated note suggesting rain. Opens serenely, builds to a turbulent middle section in C-sharp minor, then returns to calm. Programmatic without being literal.",
    tags: ["prelude", "chopin", "programmatic", "pedal tone"],
  },
  {
    title: "Ballade No. 1 in G minor, Op. 23",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1835,
    difficulty: "Grade 8+",
    grade: 9,
    tempo: "Largo – Moderato",
    mood: ["epic", "narrative", "passionate", "tragic"],
    texture: "Virtuosic with sweeping melodies and dramatic climaxes",
    description:
      "Chopin's first ballade is a narrative epic of nearly ten minutes. Combines lyrical beauty with ferocious technical passages. For advanced pianists seeking a cornerstone of Romantic repertoire.",
    tags: ["ballade", "virtuoso", "narrative", "advanced"],
  },
  {
    title: "Sonatina in C major, Op. 36 No. 1",
    composer: "Muzio Clementi",
    era: "Classical",
    year: 1797,
    difficulty: "Grade 3",
    grade: 3,
    tempo: "Allegro",
    mood: ["bright", "educational", "clear", "optimistic"],
    texture: "Simple classical texture with scales",
    description:
      "A foundational classical sonatina for early intermediate players. Clear structure and manageable technique make it ideal for developing classical style and form awareness.",
    tags: ["clementi", "sonatina", "pedagogical", "classical"],
  },
  {
    title: "25 Études faciles et progressives, Op. 100 – La Candeur",
    composer: "Johann Friedrich Burgmüller",
    era: "Romantic",
    year: 1852,
    difficulty: "Grade 2",
    grade: 2,
    tempo: "Moderato",
    mood: ["innocent", "gentle", "simple", "sweet"],
    texture: "Five-finger patterns with melody",
    description:
      "Opening study from Burgmüller's popular pedagogical set. Emphasizes cantabile playing and even tone. Perfect for young or returning pianists building expressive habits.",
    tags: ["burgmuller", "etude", "pedagogical", "beginner"],
  },
  {
    title: "Children's Corner – Doctor Gradus ad Parnassum",
    composer: "Claude Debussy",
    era: "Impressionist",
    year: 1908,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Modéré",
    mood: ["playful", "humorous", "bright", "studious"],
    texture: "Scale passages with staccato character",
    description:
      "Debussy's witty portrait of a child practicing scales. Combines impressionist harmony with playful character. More accessible than his preludes or études.",
    tags: ["debussy", "character piece", "humor", "scales"],
  },
  {
    title: "The Entertainer",
    composer: "Scott Joplin",
    era: "20th Century",
    year: 1902,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Not fast",
    mood: ["syncopated", "cheerful", "ragtime", "energetic"],
    texture: "Syncopated ragtime with steady bass",
    description:
      "Classic American ragtime with infectious syncopation. Requires rhythmic precision and clarity. Crowd-pleasing and distinct from European classical tradition.",
    tags: ["ragtime", "joplin", "syncopation", "american"],
  },
  {
    title: "Maple Leaf Rag",
    composer: "Scott Joplin",
    era: "20th Century",
    year: 1899,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Not fast",
    mood: ["syncopated", "bold", "festive", "vintage"],
    texture: "Classic ragtime oom-pah bass with syncopated melody",
    description:
      "Joplin's most famous rag. Demands clean articulation to separate syncopated melody from steady accompaniment. A cornerstone of American piano literature.",
    tags: ["ragtime", "joplin", "syncopation", "classic"],
  },
  {
    title: "Prelude in G minor, BWV 861",
    composer: "Johann Sebastian Bach",
    era: "Baroque",
    year: 1722,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Moderato",
    mood: ["serious", "intellectual", "contrapuntal", "dark"],
    texture: "Three-voice fugue texture",
    description:
      "From Book I of the Well-Tempered Clavier. Combines prelude and fugue in one movement. Intellectual Bach at his most rigorous. For players who enjoy counterpoint over sentiment.",
    tags: ["bach", "wtc", "fugue", "contrapuntal"],
  },
  {
    title: "Sonata in A major, K. 545",
    composer: "Wolfgang Amadeus Mozart",
    era: "Classical",
    year: 1788,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Allegro",
    mood: ["graceful", "classical", "transparent", "elegant"],
    texture: "Classical sonata with Alberti bass",
    description:
      "Mozart's 'easy' sonata that is deceptively challenging musically. Requires classical clarity, even scales, and refined phrasing. Perfect for developing Mozart style.",
    tags: ["mozart", "sonata", "classical", "alberti bass"],
  },
  {
    title: "Intermezzo in A major, Op. 118 No. 2",
    composer: "Johannes Brahms",
    era: "Romantic",
    year: 1893,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Andante teneramente",
    mood: ["warm", "intimate", "autumnal", "reflective"],
    texture: "Rich inner voices with lyrical melody",
    description:
      "Late Brahms at his most tender. Complex middle voices require careful voicing but the emotional reward is immense. Autumnal warmth rather than youthful passion.",
    tags: ["brahms", "intermezzo", "late romantic", "voicing"],
  },
  {
    title: "Lyric Pieces, Op. 43 No. 1 – Butterfly",
    composer: "Edvard Grieg",
    era: "Romantic",
    year: 1886,
    difficulty: "Grade 4",
    grade: 4,
    tempo: "Allegro grazioso",
    mood: ["light", "fluttering", "delicate", "playful"],
    texture: "Rapid staccato passages in both hands",
    description:
      "A miniature evoking a butterfly's flight. Quick, light staccato in both hands. Charming and brief. Good for developing finger agility at an intermediate level.",
    tags: ["grieg", "lyric piece", "character piece", "staccato"],
  },
  {
    title: "Songs Without Words, Op. 19 No. 1",
    composer: "Felix Mendelssohn",
    era: "Romantic",
    year: 1830,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Andante con moto",
    mood: ["singing", "elegant", "flowing", "refined"],
    texture: "Melody over arpeggiated accompaniment",
    description:
      "Mendelssohn's signature genre. A singing melody over gentle arpeggios. Romantic expressiveness with classical restraint. Accessible gateway to Romantic repertoire.",
    tags: ["mendelssohn", "song without words", "lyrical", "salon"],
  },
  {
    title: "Pavane pour une infante défunte",
    composer: "Maurice Ravel",
    era: "Impressionist",
    year: 1899,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Pavane",
    mood: ["stately", "noble", "melancholic", "Spanish"],
    texture: "Slow dance with rich harmony",
    description:
      "Ravel's early masterpiece. A stately pavane with Spanish inflection and lush harmonies. Requires sustained tone and careful pedaling. More harmonic sophistication than technical difficulty.",
    tags: ["ravel", "pavane", "impressionist", "slow dance"],
  },
  {
    title: "Gnossienne No. 1",
    composer: "Erik Satie",
    era: "Impressionist",
    year: 1890,
    difficulty: "Grade 4",
    grade: 4,
    tempo: "Lent",
    mood: ["mysterious", "static", "hypnotic", "ancient"],
    texture: "Modal harmonies with sparse melody",
    description:
      "Satie's enigmatic piece with unusual time signatures and modal harmony. Less famous than Gymnopédies but equally atmospheric. Creates a sense of ancient ritual.",
    tags: ["satie", "gnossienne", "modal", "atmospheric"],
  },
  {
    title: "Polonaise in A-flat major, Op. 53 'Heroic'",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1842,
    difficulty: "Grade 8+",
    grade: 9,
    tempo: "Allegro maestoso",
    mood: ["heroic", "triumphant", "noble", "grand"],
    texture: "Octaves and chordal grandeur",
    description:
      "Chopin's most majestic polonaise. Requires power, octave technique, and stamina. A statement piece for advanced players. Triumphant rather than melancholic.",
    tags: ["polonaise", "virtuoso", "octaves", "heroic"],
  },
  {
    title: "Suite bergamasque – Menuet",
    composer: "Claude Debussy",
    era: "Impressionist",
    year: 1905,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Andantino",
    mood: ["elegant", "ironic", "classical", "refined"],
    texture: "Neo-classical dance texture",
    description:
      "Debussy's take on the classical minuet. More ironic and harmonically colored than Mozart. A lighter companion to Clair de Lune from the same suite.",
    tags: ["debussy", "minuet", "suite bergamasque", "neo-classical"],
  },
  {
    title: "Sonata in B-flat major, K. 570",
    composer: "Wolfgang Amadeus Mozart",
    era: "Classical",
    year: 1789,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Allegro",
    mood: ["warm", "conversational", "balanced", "mature"],
    texture: "Late Mozart sonata texture",
    description:
      "One of Mozart's late sonatas with mature balance and warmth. Less flashy than K. 331 or K. 545 but deeply satisfying. Good for players ready for longer classical forms.",
    tags: ["mozart", "sonata", "late classical", "balanced"],
  },
  {
    title: "Moment Musical in F minor, Op. 94 No. 3",
    composer: "Franz Schubert",
    era: "Romantic",
    year: 1827,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Allegro moderato",
    mood: ["dramatic", "stormy", "passionate", "restless"],
    texture: "Tremolo accompaniment with urgent melody",
    description:
      "Schubert's most popular moment musical. Dramatic and compact with a famous lyrical second theme. More accessible than impromptus while retaining Schubert's emotional depth.",
    tags: ["schubert", "moment musical", "dramatic", "popular"],
  },
  {
    title: "Prelude in A minor, Op. 28 No. 2",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1839,
    difficulty: "Grade 4",
    grade: 4,
    tempo: "Lento",
    mood: ["somber", "processional", "heavy", "brooding"],
    texture: "Slow chords with descending bass",
    description:
      "A slow, heavy prelude with a descending bass line. Minimal melody but maximum atmosphere. Short and approachable. Good introduction to Chopin's preludes cycle.",
    tags: ["prelude", "chopin", "slow", "atmospheric"],
  },
  {
    title: "Sonata in D minor, K. 9",
    composer: "Domenico Scarlatti",
    era: "Baroque",
    year: 1738,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Allegro",
    mood: ["dramatic", "passionate", "baroque", "contrasted"],
    texture: "Binary form with bold harmonic shifts",
    description:
      "Early Scarlatti sonata with striking harmonic shifts and dramatic gestures. Compact but emotionally vivid. Gateway to the composer's 555 sonatas.",
    tags: ["scarlatti", "sonata", "baroque", "binary form"],
  },
  {
    title: "Waltz in D-flat major, Op. 64 No. 1 'Minute'",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1847,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Molto vivace",
    mood: ["brilliant", "whirling", "elegant", "virtuoso"],
    texture: "Rapid waltz with ornamental melody",
    description:
      "Chopin's famous minute waltz. Requires lightness and speed without sacrificing elegance. Perpetual motion in waltz time. Not actually meant to be played in one minute.",
    tags: ["waltz", "chopin", "virtuoso", "fast"],
  },
  {
    title: "Sonata in F-sharp minor, Op. 25 No. 5",
    composer: "Domenico Scarlatti",
    era: "Baroque",
    year: 1750,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Allegro",
    mood: ["Spanish", "castanet-like", "rhythmic", "exotic"],
    texture: "Percussive repeated chords with dance rhythm",
    description:
      "Scarlatti evoking Spanish guitar and castanets. Rhythmic and percussive with distinctive Iberian color. Short but technically and musically rewarding.",
    tags: ["scarlatti", "spanish", "rhythmic", "baroque"],
  },
  {
    title: "Preludes, Op. 23 No. 5 in G minor",
    composer: "Sergei Rachmaninoff",
    era: "Romantic",
    year: 1903,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Alla marcia",
    mood: ["dark", "march-like", "brooding", "Russian"],
    texture: "Heavy chords with melodic overlay",
    description:
      "Rachmaninoff's march prelude in G minor. Dark and imposing with a memorable melodic fragment. Less virtuosic than his concertos but full of Russian melancholy.",
    tags: ["rachmaninoff", "prelude", "march", "russian"],
  },
  {
    title: "Preludes, Op. 23 No. 4 in D major",
    composer: "Sergei Rachmaninoff",
    era: "Romantic",
    year: 1903,
    difficulty: "Grade 6",
    grade: 6,
    tempo: "Andante cantabile",
    mood: ["lyrical", "warm", "nostalgic", "singing"],
    texture: "Rich chordal accompaniment with cantabile melody",
    description:
      "One of Rachmaninoff's most beloved preludes. A long singing melody over rich harmonies. Romantic warmth without extreme virtuosity. Popular encore piece.",
    tags: ["rachmaninoff", "prelude", "cantabile", "popular"],
  },
  {
    title: "Toccata in D minor, BWV 565 (arr. piano)",
    composer: "Johann Sebastian Bach",
    era: "Baroque",
    year: 1704,
    difficulty: "Grade 8",
    grade: 8,
    tempo: "Presto",
    mood: ["dramatic", "organ-like", "grand", "fearful"],
    texture: "Virtuosic manual passages",
    description:
      "The famous Bach organ toccata transcribed for piano. Opens with dramatic arpeggios and builds to a fugue. Requires power and clarity. Gothic and imposing.",
    tags: ["bach", "toccata", "virtuoso", "organ transcription"],
  },
  {
    title: "Sonata in C-sharp minor, Op. 27 No. 2 'Moonlight' (Adagio)",
    composer: "Ludwig van Beethoven",
    era: "Classical",
    year: 1801,
    difficulty: "Grade 5",
    grade: 5,
    tempo: "Adagio sostenuto",
    mood: ["nocturnal", "mysterious", "hypnotic", "tragic"],
    texture: "Triplet accompaniment with sustained melody",
    description:
      "Beethoven's moonlit first movement. Undulating triplets create a hypnotic backdrop for a sparse, tragic melody. Requires control of sustained tone and pedal.",
    tags: ["beethoven", "moonlight", "slow", "triplets"],
  },
  {
    title: "Etude in E major, Op. 10 No. 3 'Tristesse'",
    composer: "Frédéric Chopin",
    era: "Romantic",
    year: 1832,
    difficulty: "Grade 7",
    grade: 7,
    tempo: "Lento ma non troppo",
    mood: ["melancholic", "noble", "singing", "expressive"],
    texture: "Cantabile melody over flowing accompaniment",
    description:
      "Chopin's 'sadness' etude. A noble melody of exceptional beauty over gentle accompaniment. The slow middle section is one of his most beloved tunes.",
    tags: ["etude", "chopin", "cantabile", "expressive"],
  },
  {
    title: "Microcosmos Vol. 1 No. 6 – Folk Song",
    composer: "Béla Bartók",
    era: "20th Century",
    year: 1926,
    difficulty: "Grade 2",
    grade: 2,
    tempo: "Andante",
    mood: ["folk", "simple", "modal", "gentle"],
    texture: "Hungarian folk melody with accompaniment",
    description:
      "From Bartók's pedagogical masterpiece. Simple folk melody with modal harmony. Introduces 20th-century language at a beginner level.",
    tags: ["bartok", "folk", "pedagogical", "modal"],
  },
  {
    title: "Trois Gnossiennes – No. 3",
    composer: "Erik Satie",
    era: "Impressionist",
    year: 1890,
    difficulty: "Grade 3",
    grade: 3,
    tempo: "Lent",
    mood: ["mysterious", "gentle", "modal", "contemplative"],
    texture: "Sparse chords with simple melody",
    description:
      "The most accessible gnossienne. Slow and meditative with Satie's characteristic harmonic ambiguity. Good for exploring tone and atmosphere at an early intermediate level.",
    tags: ["satie", "gnossienne", "slow", "atmospheric"],
  },
];

const chopinPreludes = numberedWorks(
  "Frédéric Chopin",
  "Romantic",
  "Prelude in Op. 28",
  24,
  1839,
  5,
  [
    {
      tempo: "Lento",
      mood: ["melancholic", "introspective", "slow", "expressive"],
      texture: "Varied prelude textures from chorale to etude-like",
      description:
        "One of Chopin's 24 preludes in all keys. Prelude {n} explores a distinct mood and technical idea in miniature form. Part of the complete cycle inspired by Bach's Well-Tempered Clavier.",
      tags: ["prelude", "chopin", "cycle", "character piece"],
    },
    {
      tempo: "Allegro",
      mood: ["energetic", "dramatic", "fast", "virtuoso"],
      texture: "Rapid passagework or bold chords",
      description:
        "A dramatic prelude from Chopin's Op. 28 set. Prelude {n} contrasts with slower neighbors through velocity or intensity. Compact but complete emotional statement.",
      tags: ["prelude", "chopin", "fast", "dramatic"],
    },
    {
      tempo: "Moderato",
      mood: ["contemplative", "balanced", " lyrical", "moderate"],
      texture: "Middle-weight texture between slow and virtuosic",
      description:
        "Prelude {n} from Chopin's famous cycle. Moderate tempo and balanced expression. Each prelude in Op. 28 is a world unto itself despite brevity.",
      tags: ["prelude", "chopin", "moderate", "cycle"],
    },
  ]
).map((piece, i) =>
  definePiece({
    ...piece,
    title: `Prelude Op. 28 No. ${i + 1}`,
  })
);

const bachInventions = numberedWorks(
  "Johann Sebastian Bach",
  "Baroque",
  "Two-Part Invention",
  15,
  1723,
  4,
  [
    {
      tempo: "Moderato",
      mood: ["intellectual", "clear", "contrapuntal", "bright"],
      texture: "Two-part imitation",
      description:
        "Bach two-part invention {n}. Develops a single motif through imitation and sequence. Essential baroque counterpoint study with musical satisfaction.",
      tags: ["bach", "invention", "counterpoint", "baroque"],
    },
    {
      tempo: "Allegro",
      mood: ["energetic", "inventive", "articulate", "joyful"],
      texture: "Fast two-voice counterpoint",
      description:
        "Invention {n} with lively rhythmic character. Trains independence and clarity at the keyboard. Part of Bach's pedagogical masterworks.",
      tags: ["bach", "invention", "fast", "pedagogical"],
    },
  ]
);

const bachSinfonias = numberedWorks(
  "Johann Sebastian Bach",
  "Baroque",
  "Three-Part Sinfonia",
  15,
  1723,
  5,
  [
    {
      tempo: "Moderato",
      mood: ["complex", "intellectual", "contrapuntal", "noble"],
      texture: "Three-part counterpoint",
      description:
        "Three-part sinfonia {n}. More complex voice leading than two-part inventions. Demands voicing awareness and contrapuntal listening.",
      tags: ["bach", "sinfonia", "three-part", "counterpoint"],
    },
  ]
);

const wtcBook1Preludes = Array.from({ length: 24 }, (_, i) => {
  const keys = [
    "C major", "C minor", "C-sharp major", "C-sharp minor", "D major", "D minor",
    "E-flat major", "D-sharp minor", "E major", "E minor", "F major", "F minor",
    "F-sharp major", "F-sharp minor", "G major", "G minor", "A-flat major", "G-sharp minor",
    "A major", "A minor", "B-flat major", "B-flat minor", "B major", "B minor",
  ];
  const isMinor = keys[i].includes("minor");
  const grade = 4 + (i % 4);
  return p({
    title: `Well-Tempered Clavier I: Prelude in ${keys[i]}, BWV ${846 + i * 2}`,
    composer: "Johann Sebastian Bach",
    era: "Baroque",
    year: 1722,
    difficulty: `Grade ${grade}`,
    grade,
    tempo: isMinor ? "Moderato" : "Andante",
    mood: isMinor
      ? ["serious", "contemplative", "dark", "intellectual"]
      : ["serene", "flowing", "pure", "balanced"],
    texture: isMinor ? "More complex harmonic motion" : "Arpeggiated or melodic texture",
    description: isMinor
      ? `Prelude in ${keys[i]} from Bach's WTC Book I. Minor-key prelude with richer harmonic language and emotional weight. Pairs with its fugue companion.`
      : `Prelude in ${keys[i]} from Bach's WTC Book I. Part of the foundational keyboard cycle. Explores key character through prelude texture before the paired fugue.`,
    tags: ["bach", "wtc", "prelude", isMinor ? "minor" : "major"],
  });
});

const wtcBook1Fugues = Array.from({ length: 24 }, (_, i) => {
  const keys = [
    "C major", "C minor", "C-sharp major", "C-sharp minor", "D major", "D minor",
    "E-flat major", "D-sharp minor", "E major", "E minor", "F major", "F minor",
    "F-sharp major", "F-sharp minor", "G major", "G minor", "A-flat major", "G-sharp minor",
    "A major", "A minor", "B-flat major", "B-flat minor", "B major", "B minor",
  ];
  const grade = 5 + (i % 4);
  return p({
    title: `Well-Tempered Clavier I: Fugue in ${keys[i]}, BWV ${847 + i * 2}`,
    composer: "Johann Sebastian Bach",
    era: "Baroque",
    year: 1722,
    difficulty: `Grade ${grade}`,
    grade,
    tempo: "Moderato",
    mood: ["intellectual", "contrapuntal", "rigorous", "architectural"],
    texture: "Fugal entries with subject and countersubject",
    description: `Fugue in ${keys[i]} from WTC Book I. Pure contrapuntal architecture with subject entries and stretto. For pianists who love Bach's intellectual depth.`,
    tags: ["bach", "wtc", "fugue", "contrapuntal"],
  });
});

const scarlattiSonatas = numberedWorks(
  "Domenico Scarlatti",
  "Baroque",
  "Keyboard Sonata",
  40,
  1740,
  5,
  [
    {
      tempo: "Allegro",
      mood: ["baroque", "rhythmic", "Spanish", "bright"],
      texture: "Binary form keyboard sonata",
      description:
        "Scarlatti sonata in binary form with Iberian keyboard flair. Sonata {n} from the vast catalog of 555. Compact single-movement works full of character.",
      tags: ["scarlatti", "sonata", "baroque", "binary"],
      gradeOffset: 1,
    },
    {
      tempo: "Allegro",
      mood: ["virtuoso", "brilliant", "fast", "articulate"],
      texture: "Repeated notes or rapid figuration",
      description:
        "Virtuosic Scarlatti sonata {n}. Requires crisp articulation and finger independence. Often features guitar-like or castanet-like effects.",
      tags: ["scarlatti", "virtuoso", "fast", "spanish"],
      gradeOffset: 2,
    },
    {
      tempo: "Andante",
      mood: ["gentle", "pastoral", "simple", "lyrical"],
      texture: "Lighter texture with melody focus",
      description:
        "A gentler Scarlatti sonata {n}. Less virtuosic, more melodic. Shows the composer's range beyond brilliance.",
      tags: ["scarlatti", "slow", "lyrical", "intermediate"],
      gradeOffset: -1,
    },
  ]
);

const burgmullerEtudes = numberedWorks(
  "Johann Friedrich Burgmüller",
  "Romantic",
  "25 Études faciles et progressives Op. 100",
  25,
  1852,
  2,
  [
    {
      tempo: "Moderato",
      mood: ["pedagogical", "gentle", "expressive", "clear"],
      texture: "Study focused on specific technique",
      description:
        "Burgmüller study {n} from Op. 100. Combines technical goal with musical character. Named studies that teach legato, staccato, or phrasing through appealing melodies.",
      tags: ["burgmuller", "etude", "pedagogical", "character"],
    },
    {
      tempo: "Allegro",
      mood: ["playful", "light", "agile", "bright"],
      texture: "Fast finger work",
      description:
        "Lively Burgmüller etude {n}. Develops velocity and evenness through charming character pieces rather than dry exercises.",
      tags: ["burgmuller", "etude", "fast", "pedagogical"],
      gradeOffset: 1,
    },
  ]
);

const czernyEtudes = numberedWorks(
  "Carl Czerny",
  "Romantic",
  "Practical Method for Beginners Op. 599",
  30,
  1839,
  2,
  [
    {
      tempo: "Moderato",
      mood: ["technical", "clear", "methodical", "educational"],
      texture: "Five-finger and scale patterns",
      description:
        "Czerny exercise {n} from Op. 599. Foundational technique builder. Less characterful than Burgmüller but essential for finger development.",
      tags: ["czerny", "etude", "technique", "pedagogical"],
    },
  ]
);

const schumannKinderszenen = numberedWorks(
  "Robert Schumann",
  "Romantic",
  "Kinderszenen Op. 15",
  13,
  1838,
  4,
  [
    {
      tempo: "Sehr langsam",
      mood: ["innocent", "childlike", "tender", "nostalgic"],
      texture: "Character piece with descriptive title",
      description:
        "Scene {n} from Schumann's Scenes from Childhood. Evokes a child's world through miniature character pieces. Poetic titles guide interpretation.",
      tags: ["schumann", "kinderszenen", "character piece", "poetic"],
    },
    {
      tempo: "Sehr rasch",
      mood: ["playful", "energetic", "childlike", "humorous"],
      texture: "Lighter fast character",
      description:
        "A faster scene from Kinderszenen #{n}. Captures childhood energy and imagination. Requires lightness and character over power.",
      tags: ["schumann", "kinderszenen", "fast", "playful"],
      gradeOffset: 1,
    },
  ]
);

const griegLyricPieces = numberedWorks(
  "Edvard Grieg",
  "Romantic",
  "Lyric Piece",
  30,
  1867,
  3,
  [
    {
      tempo: "Allegro grazioso",
      mood: ["Norwegian", "folk-inflected", "charming", "miniature"],
      texture: "Lyric melody with dance or folk rhythm",
      description:
        "Grieg lyric piece {n}. Norwegian character in miniature form. Folk melody and harmonic color. Accessible Romantic repertoire with national flavor.",
      tags: ["grieg", "lyric piece", "folk", "miniature"],
    },
    {
      tempo: "Andante",
      mood: ["melancholic", "Nordic", "intimate", "wistful"],
      texture: "Slow lyrical melody",
      description:
        "A slower Grieg lyric piece {n}. Nordic melancholy and song-like melody. Brief but emotionally evocative.",
      tags: ["grieg", "lyric piece", "slow", "nordic"],
    },
  ]
);

const mendelssohnSongsWithoutWords = numberedWorks(
  "Felix Mendelssohn",
  "Romantic",
  "Song Without Words",
  25,
  1835,
  4,
  [
    {
      tempo: "Andante con moto",
      mood: ["singing", "elegant", "salon", "refined"],
      texture: "Cantabile melody over accompaniment",
      description:
        "Mendelssohn Song Without Words {n}. Lyrical melody designed to sing at the piano. Romantic expression with classical balance.",
      tags: ["mendelssohn", "song without words", "lyrical", "salon"],
    },
    {
      tempo: "Allegro non troppo",
      mood: ["flowing", "agitated", "passionate", "dramatic"],
      texture: "More active accompaniment",
      description:
        "A more passionate Song Without Words {n}. Increased motion and drama while retaining melodic focus.",
      tags: ["mendelssohn", "song without words", "dramatic", "flowing"],
      gradeOffset: 1,
    },
  ]
);

const debussyPreludes = numberedWorks(
  "Claude Debussy",
  "Impressionist",
  "Préludes Book I",
  12,
  1910,
  6,
  [
    {
      tempo: "Modéré",
      mood: ["impressionist", "atmospheric", "colorful", "evocative"],
      texture: "Impressionist harmony and timbre focus",
      description:
        "Debussy prelude {n} from Book I. Each prelude bears a evocative subtitle suggesting imagery. Explores piano color and harmonic innovation.",
      tags: ["debussy", "prelude", "impressionist", "atmospheric"],
      gradeOffset: 1,
    },
    {
      tempo: "Lent",
      mood: ["dreamy", "static", "mysterious", "nocturnal"],
      texture: "Sparse or layered impressionist textures",
      description:
        "Slow Debussy prelude {n}. Atmospheric and harmonically adventurous. Requires pedal control and touch sensitivity.",
      tags: ["debussy", "prelude", "slow", "dreamy"],
    },
  ]
);

const prokofievVisions = numberedWorks(
  "Sergei Prokofiev",
  "20th Century",
  "Visions fugitives Op. 22",
  20,
  1917,
  6,
  [
    {
      tempo: "Moderato",
      mood: ["sarcastic", "ironic", "modern", "unpredictable"],
      texture: "20th-century harmonic bite with lyric moments",
      description:
        "Prokofiev Visions fugitives {n}. Fleeting impressions with sharp character. Modern language still accessible to intermediate-advanced players.",
      tags: ["prokofiev", "20th century", "character piece", "modern"],
      gradeOffset: 1,
    },
    {
      tempo: "Allegro",
      mood: ["witty", "percussive", "angular", "ironic"],
      texture: "Disjunct melody and biting harmony",
      description:
        "Fast vision {n} with Prokofiev's characteristic irony and percussive touch. Unexpected harmonic turns keep listener and player engaged.",
      tags: ["prokofiev", "fast", "ironic", "modern"],
      gradeOffset: 2,
    },
  ]
);

const kapustinEtudes = numberedWorks(
  "Nikolai Kapustin",
  "20th Century",
  "Etude",
  15,
  1984,
  7,
  [
    {
      tempo: "Allegro",
      mood: ["jazz", "syncopated", "virtuoso", "swinging"],
      texture: "Jazz-classical fusion with stride and bebop figures",
      description:
        "Kapustin etude {n}. Classical form meets jazz rhythm and harmony. For players who love Gershwin, ragtime, and technical challenge combined.",
      tags: ["kapustin", "jazz", "etude", "syncopation"],
      gradeOffset: 2,
    },
  ]
);

const mozartSonataMovements = [
  { title: "Sonata in C major, K. 545 – Allegro", grade: 5, mood: ["graceful", "classical", "transparent"] },
  { title: "Sonata in C major, K. 545 – Andante", grade: 4, mood: ["gentle", "singing", "intimate"] },
  { title: "Sonata in C major, K. 545 – Rondo", grade: 5, mood: ["playful", "bright", "confident"] },
  { title: "Sonata in A major, K. 331 – Andante grazioso", grade: 5, mood: ["elegant", "varied", "theme and variations"] },
  { title: "Sonata in F major, K. 332 – Allegro", grade: 6, mood: ["dramatic", "contrasted", "mature"] },
  { title: "Sonata in B-flat major, K. 570 – Allegretto", grade: 6, mood: ["warm", "balanced", "late mozart"] },
].map((m) =>
  p({
    title: m.title,
    composer: "Wolfgang Amadeus Mozart",
    era: "Classical",
    year: 1788,
    difficulty: `Grade ${m.grade}`,
    grade: m.grade,
    tempo: "Varies",
    mood: [...m.mood, "classical"],
    texture: "Classical sonata movement texture",
    description: `${m.title}. Mozart sonata movement with classical clarity and phrase architecture. Suitable for developing Mozart style and performance practice.`,
    tags: ["mozart", "sonata", "classical", "movement"],
  })
);

const beethovenBagatelles = numberedWorks(
  "Ludwig van Beethoven",
  "Classical",
  "Bagatelle Op. 119",
  11,
  1822,
  4,
  [
    {
      tempo: "Allegro",
      mood: ["witty", "compact", "classical", "surprising"],
      texture: "Short character pieces",
      description:
        "Beethoven bagatelle {n} from Op. 119. Brief pieces with humor and surprise. More approachable than sonatas while retaining Beethoven's personality.",
      tags: ["beethoven", "bagatelle", "character piece", "classical"],
    },
  ]
);

const schubertImpromptus = [
  { n: 1, key: "C minor", grade: 7, mood: ["dramatic", "stormy", "passionate"] },
  { n: 2, key: "E-flat major", grade: 6, mood: ["flowing", "lyrical", "warm"] },
  { n: 3, key: "G-flat major", grade: 6, mood: ["melancholic", "wistful", "gentle"] },
  { n: 4, key: "A-flat major", grade: 7, mood: ["noble", "grand", "virtuoso"] },
].map(({ n, key, grade, mood }) =>
  p({
    title: `Impromptu in ${key}, Op. 90 No. ${n}`,
    composer: "Franz Schubert",
    era: "Romantic",
    year: 1827,
    difficulty: `Grade ${grade}`,
    grade,
    tempo: n === 1 ? "Allegro molto moderato" : "Andante",
    mood: [...mood, "schubert"],
    texture: "Schubertian lyricism with extended forms",
    description: `Schubert impromptu Op. 90 No. ${n} in ${key}. Extended Romantic form with singing melody and rich harmony. ${n === 3 ? "Especially beloved for gentle melancholy." : "Substantial musical argument in a standalone piece."}`,
    tags: ["schubert", "impromptu", "romantic", key.includes("minor") ? "minor" : "major"],
  })
);

const lisztConsolations = numberedWorks(
  "Franz Liszt",
  "Romantic",
  "Consolation",
  6,
  1850,
  5,
  [
    {
      tempo: "Lento placido",
      mood: ["consoling", "gentle", "hymn-like", "warm"],
      texture: "Arpeggiated accompaniment with melody",
      description:
        "Liszt Consolation {n}. Softer side of Liszt with flowing patterns and cantabile melody. More approachable than Hungarian Rhapsodies.",
      tags: ["liszt", "consolation", "salon", "lyrical"],
      gradeOffset: 1,
    },
  ]
);

const chopinNocturnes = numberedWorks(
  "Frédéric Chopin",
  "Romantic",
  "Nocturne",
  18,
  1832,
  6,
  [
    {
      tempo: "Andante",
      mood: ["nocturnal", "melancholic", "expressive", "ornamented"],
      texture: "Bel canto melody over broken chords",
      description:
        "Chopin nocturne {n}. Lyrical night piece with rubato and ornamentation. Salon genre perfected by Chopin with Field's influence transformed.",
      tags: ["chopin", "nocturne", "lyrical", "salon"],
    },
    {
      tempo: "Lento",
      mood: ["tragic", "deep", "introspective", "dark"],
      texture: "Slower nocturne with dramatic middle section",
      description:
        "A darker Chopin nocturne {n}. Slow tempo with potential dramatic central episode. Emotional depth over virtuosity.",
      tags: ["chopin", "nocturne", "slow", "dramatic"],
      gradeOffset: 1,
    },
  ]
);

const chopinWaltzes = numberedWorks(
  "Frédéric Chopin",
  "Romantic",
  "Waltz",
  14,
  1835,
  6,
  [
    {
      tempo: "Tempo di valse",
      mood: ["elegant", "dance-like", "salon", "rubato"],
      texture: "Waltz bass with ornamental melody",
      description:
        "Chopin waltz {n}. Not for ballroom but for salon with rubato and poetic license. Combines dance rhythm with Romantic expression.",
      tags: ["chopin", "waltz", "dance", "salon"],
    },
    {
      tempo: "Molto vivace",
      mood: ["brilliant", "whirling", "virtuoso", "fast"],
      texture: "Rapid waltz figuration",
      description:
        "A faster virtuosic Chopin waltz {n}. Requires lightness and velocity. Brilliant rather than melancholic.",
      tags: ["chopin", "waltz", "virtuoso", "fast"],
      gradeOffset: 2,
    },
  ]
);

const chopinMazurkas = numberedWorks(
  "Frédéric Chopin",
  "Romantic",
  "Mazurka",
  20,
  1835,
  5,
  [
    {
      tempo: "Moderato",
      mood: ["polish", "folk", "nostalgic", "rhythmic"],
      texture: "Folk dance with dotted rhythms",
      description:
        "Chopin mazurka {n}. Polish folk dance with subtle rhythmic nuance and national character. Intimate rather than virtuosic.",
      tags: ["chopin", "mazurka", "polish", "folk"],
    },
  ]
);

const allPieces: PianoPiece[] = [
  ...handcrafted.map(p),
  ...chopinPreludes,
  ...bachInventions,
  ...bachSinfonias,
  ...wtcBook1Preludes,
  ...wtcBook1Fugues,
  ...scarlattiSonatas,
  ...burgmullerEtudes,
  ...czernyEtudes,
  ...schumannKinderszenen,
  ...griegLyricPieces,
  ...mendelssohnSongsWithoutWords,
  ...debussyPreludes,
  ...prokofievVisions,
  ...kapustinEtudes,
  ...mozartSonataMovements,
  ...beethovenBagatelles,
  ...schubertImpromptus,
  ...lisztConsolations,
  ...chopinNocturnes,
  ...chopinWaltzes,
  ...chopinMazurkas,
];

const uniqueById = new Map<string, PianoPiece>();
for (const piece of allPieces) {
  if (!uniqueById.has(piece.id)) {
    uniqueById.set(piece.id, piece);
  }
}

export const corpus: PianoPiece[] = Array.from(uniqueById.values());

export const CORPUS_SIZE = corpus.length;
