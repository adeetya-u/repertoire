const IMSLP = "https://imslp.org/wiki";

/** Verified IMSLP work/collection pages */
export const IMSLP_COLLECTIONS = {
  schubertImpromptusOp90:
    `${IMSLP}/4_Impromptus,_D.899_(Schubert,_Franz)`,
  schubertImpromptusOp142:
    `${IMSLP}/4_Impromptus,_D.935_(Schubert,_Franz)`,
  satieGymnopedies: `${IMSLP}/3_Gymnop%C3%A9dies_(Satie,_Erik)`,
  satieGnossiennes: `${IMSLP}/Gnossiennes_(Satie,_Erik)`,
  chopinPreludesOp28:
    `${IMSLP}/Preludes,_Op.28_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  chopinNocturnes: `${IMSLP}/Nocturnes_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  chopinWaltzes: `${IMSLP}/Waltzes_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  chopinMazurkas: `${IMSLP}/Mazurkas_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  chopinEtudesOp10:
    `${IMSLP}/%C3%89tudes,_Op.10_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  chopinBallades: `${IMSLP}/Ballades_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  chopinPolonaises:
    `${IMSLP}/Polonaises_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  bachWtc1: `${IMSLP}/Das_wohltemperierte_Klavier_I,_BWV_846-869_(Bach,_Johann_Sebastian)`,
  bachInventions:
    `${IMSLP}/Inventions_and_Sinfonias,_BWV_772-801_(Bach,_Johann_Sebastian)`,
  debussySuiteBergamasque:
    `${IMSLP}/Suite_bergamasque_(Debussy,_Claude)`,
  debussyArabesques:
    `${IMSLP}/2_Arabesques_(Debussy,_Claude)`,
  debussyPreludesBook1:
    `${IMSLP}/Special:Search?search=${encodeURIComponent("Debussy Préludes Livre 1")}&fulltext=Search`,
  debussyChildrensCorner:
    `${IMSLP}/Children%27s_Corner_(Debussy,_Claude)`,
  schumannKinderszenen:
    `${IMSLP}/Kinderszenen,_Op.15_(Schumann,_Robert)`,
  schumannMomentsMusicaux:
    `${IMSLP}/Special:Search?search=${encodeURIComponent("Schumann Moments musicaux Op 94")}&fulltext=Search`,
  lisztConsolations:
    `${IMSLP}/Consolations,_S.172_(Liszt,_Franz)`,
  griegLyricPieces:
    `${IMSLP}/Lyric_Pieces,_Op.43_(Grieg,_Edvard)`,
  mendelssohnSongsWithoutWords:
    `${IMSLP}/Lieder_ohne_Worte_(Mendelssohn,_Felix)`,
  burgmullerOp100:
    `${IMSLP}/25_%C3%89tudes_faciles_et_progressives,_Op.100_(Burgm%C3%BCller,_Friedrich)`,
  czernyOp599:
    `${IMSLP}/Practical_Exercises_for_Beginners,_Op.599_(Czerny,_Carl)`,
  prokofievVisionsFugitives:
    `${IMSLP}/Visions_fugitives,_Op.22_(Prokofiev,_Sergey)`,
  rachmaninoffPreludesOp23:
    `${IMSLP}/10_Preludes,_Op.23_(Rachmaninoff,_Sergei)`,
  beethovenMoonlight:
    `${IMSLP}/Piano_Sonata_No.14,_Op.27_No.2_(Beethoven,_Ludwig_van)`,
  beethovenPathetique:
    `${IMSLP}/Piano_Sonata_No.8,_Op.13_(Beethoven,_Ludwig_van)`,
  beethovenFurElise:
    `${IMSLP}/F%C3%BCr_Elise,_WoO_59_(Beethoven,_Ludwig_van)`,
  beethovenBagatellesOp119:
    `${IMSLP}/11_Bagatelles,_Op.119_(Beethoven,_Ludwig_van)`,
  mozartK545:
    `${IMSLP}/Piano_Sonata_No.16_in_C_major,_K.545_(Mozart,_Wolfgang_Amadeus)`,
  mozartK331:
    `${IMSLP}/Piano_Sonata_No.11_in_A_major,_K.331/300i_(Mozart,_Wolfgang_Amadeus)`,
  mozartK332:
    `${IMSLP}/Piano_Sonata_No.12_in_F_major,_K.332/300k_(Mozart,_Wolfgang_Amadeus)`,
  mozartK570:
    `${IMSLP}/Piano_Sonata_No.17_in_B-flat_major,_K.570_(Mozart,_Wolfgang_Amadeus)`,
  brahmsIntermezziOp118:
    `${IMSLP}/6_Klavierst%C3%BCcke,_Op.118_(Brahms,_Johannes)`,
  ravelPavane:
    `${IMSLP}/Pavane_pour_une_infante_d%C3%A9funte_(Ravel,_Maurice)`,
  mussorgskyPictures:
    `${IMSLP}/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)`,
  joplinEntertainer:
    `${IMSLP}/The_Entertainer_(Joplin,_Scott)`,
  joplinMapleLeaf: `${IMSLP}/Maple_Leaf_Rag_(Joplin,_Scott)`,
  bartokMicrocosmos:
    `${IMSLP}/Mikrokosmos,_Sz.107_(Bart%C3%B3k,_B%C3%A9la)`,
  clementiSonatinaOp36:
    `${IMSLP}/6_Sonatinas,_Op.36_(Clementi,_Muzio)`,
  haydnSonataHobXVI50:
    `${IMSLP}/Keyboard_Sonata_in_C_major,_Hob.XVI:50_(Haydn,_Joseph)`,
  scarlattiSonatas:
    `${IMSLP}/Keyboard_Sonatas_(Scarlatti,_Domenico)`,
  bachToccataBWV565:
    `${IMSLP}/Toccata_and_Fugue_in_D_minor,_BWV_565_(Bach,_Johann_Sebastian)`,
  satieJeTeVeux: `${IMSLP}/Je_te_veux_(Satie,_Erik)`,
} as const;

type UrlRule = {
  composer: RegExp;
  title: RegExp;
  url: string;
};

const URL_RULES: UrlRule[] = [
  {
    composer: /Schubert/i,
    title: /Impromptu.*Op\.?\s*90/i,
    url: IMSLP_COLLECTIONS.schubertImpromptusOp90,
  },
  {
    composer: /Satie/i,
    title: /Gymnop/i,
    url: IMSLP_COLLECTIONS.satieGymnopedies,
  },
  {
    composer: /Satie/i,
    title: /Gnossienne/i,
    url: IMSLP_COLLECTIONS.satieGnossiennes,
  },
  {
    composer: /Satie/i,
    title: /Je te veux/i,
    url: IMSLP_COLLECTIONS.satieJeTeVeux,
  },
  {
    composer: /Chopin/i,
    title: /Prelude.*Op\.?\s*28|Prelude Op\.?\s*28/i,
    url: IMSLP_COLLECTIONS.chopinPreludesOp28,
  },
  {
    composer: /Chopin/i,
    title: /^Nocturne(?!.*Op\.?\s*28)/i,
    url: IMSLP_COLLECTIONS.chopinNocturnes,
  },
  {
    composer: /Chopin/i,
    title: /Waltz/i,
    url: IMSLP_COLLECTIONS.chopinWaltzes,
  },
  {
    composer: /Chopin/i,
    title: /Mazurka/i,
    url: IMSLP_COLLECTIONS.chopinMazurkas,
  },
  {
    composer: /Chopin/i,
    title: /Etude|Étude/i,
    url: IMSLP_COLLECTIONS.chopinEtudesOp10,
  },
  {
    composer: /Chopin/i,
    title: /Ballade/i,
    url: IMSLP_COLLECTIONS.chopinBallades,
  },
  {
    composer: /Chopin/i,
    title: /Polonaise/i,
    url: IMSLP_COLLECTIONS.chopinPolonaises,
  },
  {
    composer: /Bach/i,
    title: /Well-Tempered|WTC|BWV\s*8[34]\d/i,
    url: IMSLP_COLLECTIONS.bachWtc1,
  },
  {
    composer: /Bach/i,
    title: /Invention|Sinfonia|BWV\s*77/i,
    url: IMSLP_COLLECTIONS.bachInventions,
  },
  {
    composer: /Bach/i,
    title: /Toccata.*BWV\s*565/i,
    url: IMSLP_COLLECTIONS.bachToccataBWV565,
  },
  {
    composer: /Debussy/i,
    title: /Clair de [Ll]une|Suite bergamasque|Menuet/i,
    url: IMSLP_COLLECTIONS.debussySuiteBergamasque,
  },
  {
    composer: /Debussy/i,
    title: /Arabesque/i,
    url: IMSLP_COLLECTIONS.debussyArabesques,
  },
  {
    composer: /Debussy/i,
    title: /Pr[ée]ludes Book|Préludes Book/i,
    url: IMSLP_COLLECTIONS.debussyPreludesBook1,
  },
  {
    composer: /Debussy/i,
    title: /Children|Gradus|Doctor Gradus/i,
    url: IMSLP_COLLECTIONS.debussyChildrensCorner,
  },
  {
    composer: /Schumann/i,
    title: /Kinderszenen|Träumerei/i,
    url: IMSLP_COLLECTIONS.schumannKinderszenen,
  },
  {
    composer: /Schumann/i,
    title: /Moment [Mm]usical/i,
    url: IMSLP_COLLECTIONS.schumannMomentsMusicaux,
  },
  {
    composer: /Liszt/i,
    title: /Consolation/i,
    url: IMSLP_COLLECTIONS.lisztConsolations,
  },
  {
    composer: /Grieg/i,
    title: /Lyric Piece|Butterfly/i,
    url: IMSLP_COLLECTIONS.griegLyricPieces,
  },
  {
    composer: /Mendelssohn/i,
    title: /Song Without Words/i,
    url: IMSLP_COLLECTIONS.mendelssohnSongsWithoutWords,
  },
  {
    composer: /Burgm/i,
    title: /Op\.?\s*100|Études faciles|La Candeur/i,
    url: IMSLP_COLLECTIONS.burgmullerOp100,
  },
  {
    composer: /Czerny/i,
    title: /Op\.?\s*599/i,
    url: IMSLP_COLLECTIONS.czernyOp599,
  },
  {
    composer: /Prokofiev/i,
    title: /Visions fugitives/i,
    url: IMSLP_COLLECTIONS.prokofievVisionsFugitives,
  },
  {
    composer: /Rachmaninoff/i,
    title: /Preludes.*Op\.?\s*23|Op\.?\s*23 No/i,
    url: IMSLP_COLLECTIONS.rachmaninoffPreludesOp23,
  },
  {
    composer: /Beethoven/i,
    title: /Moonlight|Op\.?\s*27 No\.?\s*2/i,
    url: IMSLP_COLLECTIONS.beethovenMoonlight,
  },
  {
    composer: /Beethoven/i,
    title: /Pathétique|Op\.?\s*13/i,
    url: IMSLP_COLLECTIONS.beethovenPathetique,
  },
  {
    composer: /Beethoven/i,
    title: /Für Elise|Fur Elise|WoO\s*59/i,
    url: IMSLP_COLLECTIONS.beethovenFurElise,
  },
  {
    composer: /Beethoven/i,
    title: /Bagatelle.*Op\.?\s*119/i,
    url: IMSLP_COLLECTIONS.beethovenBagatellesOp119,
  },
  {
    composer: /Mozart/i,
    title: /K\.?\s*545/i,
    url: IMSLP_COLLECTIONS.mozartK545,
  },
  {
    composer: /Mozart/i,
    title: /K\.?\s*331|Turca/i,
    url: IMSLP_COLLECTIONS.mozartK331,
  },
  {
    composer: /Mozart/i,
    title: /K\.?\s*332/i,
    url: IMSLP_COLLECTIONS.mozartK332,
  },
  {
    composer: /Mozart/i,
    title: /K\.?\s*570/i,
    url: IMSLP_COLLECTIONS.mozartK570,
  },
  {
    composer: /Brahms/i,
    title: /Intermezzo.*Op\.?\s*118/i,
    url: IMSLP_COLLECTIONS.brahmsIntermezziOp118,
  },
  {
    composer: /Ravel/i,
    title: /Pavane/i,
    url: IMSLP_COLLECTIONS.ravelPavane,
  },
  {
    composer: /Mussorgsky/i,
    title: /Promenade|Pictures at/i,
    url: IMSLP_COLLECTIONS.mussorgskyPictures,
  },
  {
    composer: /Joplin/i,
    title: /Entertainer/i,
    url: IMSLP_COLLECTIONS.joplinEntertainer,
  },
  {
    composer: /Joplin/i,
    title: /Maple Leaf/i,
    url: IMSLP_COLLECTIONS.joplinMapleLeaf,
  },
  {
    composer: /Bart/i,
    title: /Microcosmos|Mikrokosmos|Folk Song/i,
    url: IMSLP_COLLECTIONS.bartokMicrocosmos,
  },
  {
    composer: /Clementi/i,
    title: /Sonatina.*Op\.?\s*36/i,
    url: IMSLP_COLLECTIONS.clementiSonatinaOp36,
  },
  {
    composer: /Haydn/i,
    title: /Hob\.?\s*XVI:?\s*50/i,
    url: IMSLP_COLLECTIONS.haydnSonataHobXVI50,
  },
  {
    composer: /Scarlatti/i,
    title: /Sonata|K\.?\s*\d+/i,
    url: IMSLP_COLLECTIONS.scarlattiSonatas,
  },
];

/** Exact title overrides for pieces with dedicated IMSLP pages */
const EXACT_OVERRIDES: Record<string, string> = {
  [`Frédéric Chopin|Nocturne in C-sharp minor, Op. posth.`]:
    `${IMSLP}/Nocturne_in_C-sharp_minor,_B.49_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  [`Frédéric Chopin|Nocturne in E-flat major, Op. 9 No. 2`]:
    `${IMSLP}/Nocturne_in_E-flat_major,_Op.9_No.2_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  [`Frédéric Chopin|Prelude in E minor, Op. 28 No. 4`]:
    `${IMSLP}/Prelude_in_E_minor,_Op.28_No.4_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  [`Frédéric Chopin|Prelude in A minor, Op. 28 No. 2`]:
    `${IMSLP}/Prelude_in_A_minor,_Op.28_No.2_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  [`Frédéric Chopin|Prelude in D-flat major, Op. 28 No. 15 'Raindrop'`]:
    `${IMSLP}/Prelude_in_D-flat_major,_Op.28_No.15_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  [`Frédéric Chopin|Waltz in A minor, B. 150`]:
    `${IMSLP}/Waltz_in_A_minor,_B.150_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  [`Frédéric Chopin|Waltz in D-flat major, Op. 64 No. 1 'Minute'`]:
    `${IMSLP}/Waltz_in_D-flat_major,_Op.64_No.1_(Chopin,_Fr%C3%A9d%C3%A9ric)`,
  [`Johann Sebastian Bach|Prelude in C major, BWV 846`]:
    `${IMSLP}/Prelude_and_Fugue_in_C_major,_BWV_846_(Bach,_Johann_Sebastian)`,
  [`Johann Sebastian Bach|Invention No. 1 in C major, BWV 772`]:
    `${IMSLP}/Invention_in_C_major,_BWV_772_(Bach,_Johann_Sebastian)`,
  [`Domenico Scarlatti|Sonata in E major, K. 380`]:
    `${IMSLP}/Keyboard_Sonata_in_E_major,_K.380_(Scarlatti,_Domenico)`,
  [`Domenico Scarlatti|Sonata in D minor, K. 9`]:
    `${IMSLP}/Keyboard_Sonata_in_D_minor,_K.9_(Scarlatti,_Domenico)`,
  [`Franz Schubert|Impromptu in G-flat major, Op. 90 No. 3`]:
    IMSLP_COLLECTIONS.schubertImpromptusOp90,
  [`Robert Schumann|Kinderszenen, Op. 15 – Träumerei`]:
    `${IMSLP}/Kinderszenen,_Op.15_(Schumann,_Robert)`,
  [`Edvard Grieg|Lyric Pieces, Op. 43 No. 1 – Butterfly`]:
    `${IMSLP}/Lyric_Pieces,_Op.43_(Grieg,_Edvard)`,
};

function imslpSearchUrl(title: string, composer: string): string {
  const query = encodeURIComponent(`${title} ${composer}`.replace(/\s+/g, " ").trim());
  return `${IMSLP}/Special:Search?search=${query}&fulltext=Search`;
}

export function resolveImslpUrl(title: string, composer: string): string {
  const exactKey = `${composer}|${title}`;
  if (EXACT_OVERRIDES[exactKey]) {
    return EXACT_OVERRIDES[exactKey];
  }

  for (const rule of URL_RULES) {
    if (rule.composer.test(composer) && rule.title.test(title)) {
      return rule.url;
    }
  }

  return imslpSearchUrl(title, composer);
}
