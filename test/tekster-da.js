/* vigta.app/test · testskemaernes tekster på dansk (spor H, 14.10.26).
 *
 * KILDE: claude/vigta-testskemaer-tekster-2026-10-14.md (Mikaels testermateriale). Samtykket og spørgsmålene står
 * ORDRET - ret dem ikke her, ret kilden og kopiér igen (prøven tests/hjemmeside/testskemaer.test.ts holder dem op mod
 * kilden). Tekster markeret EGEN er skrevet af spor H, fordi kilden ikke har dem (knapper, fejl, status); de står i
 * meldingen.
 *
 * Kun dansk nu (lukket side for 14 kendte personer, undtaget reglen om ti sprog). En engelsk udgave bliver en fil
 * `tekster-en.js` med samme nøgler; siden vælger efter `sprog` fra GET. */
window.VIGTA_TEST_TEKSTER = window.VIGTA_TEST_TEKSTER || {};
window.VIGTA_TEST_TEKSTER.da = {
  samtykke: {
    titel: 'Samtykke til at deltage i testen af Vigta',
    indledning: 'Testen køres af Exekio (CVR 46387376) ved Mikael Hultengren. Formålet er at forbedre Vigta før lanceringen 8. december 2026.',
    afsnit: [
      { titel: 'Det indsamler vi', punkter: [
        'Dit navn og din e-mail, så vi kan sende dig appen og skemaerne',
        'Dine svar i skemaerne',
        'Noter fra en eventuel samtale. Den optages kun, hvis du siger ja til det først',
        'Det, du selv lægger i Vigta, efter Vigtas privatlivspolitik på vigta.app/privacy. Dine data ligger i EU',
        'Fejlrapporter og skærmbilleder, du selv sender via TestFlight eller Google Play',
      ] },
      { titel: 'Sådan bruger vi det', punkter: [
        'Kun til at forbedre Vigta. Svar gengives uden navn, og citater kan ikke føres tilbage til dig',
        'Intet deles med andre eller bruges til markedsføring',
        'Skemasvar og noter slettes senest 1. marts 2027',
      ] },
    ],
    rettighederTitel: 'Dine rettigheder',
    rettigheder: 'Du kan trække dit samtykke tilbage og bede om at få dine svar slettet når som helst, uden begrundelse, ved at skrive til privacy@vigta.app. Du kan også slette din Vigta-konto i appen under Indstillinger › Konto. Du kan klage til Datatilsynet.',
    kryds: 'Jeg har læst teksten og vil gerne deltage i testen',
  },

  mini: {
    titel: 'Mini-skema',                                                     // EGEN (kilden: "Mini-skema (2 min)")
    varighed: '2 min',
    sporgsmaal: {
      daglig: 'Hvad laver du til daglig?',
      ansvar: 'Har du ansvar for at prioritere andres arbejde?',
      vaerktoejer: 'Hvordan holder du styr på dine opgaver i dag?',
      vaerktoejerHjaelp: 'Vælg alle, der passer',
      vaerktoej_andet: 'Andet, nemlig',                                     // EGEN (feltet bag "Andet")
      beslutter: 'Hvordan beslutter du, hvad du tager først?',
      antal: 'Hvor mange opgaver har du typisk gående?',
      deler: 'Hvor tit deler du opgaver med andre?',
    },
    valg: {
      ansvar: [['ja', 'Ja'], ['nej', 'Nej'], ['delvist', 'Delvist']],
      vaerktoejer: [['papir', 'Papir'], ['kalender', 'Kalender'], ['mail', 'Mail'], ['apple-paamindelser', 'Apple Påmindelser'],
        ['microsoft-todo', 'Microsoft To Do'], ['google-tasks', 'Google Tasks'], ['todoist', 'Todoist'], ['ticktick', 'TickTick'],
        ['anydo', 'Any.do'], ['andet', 'Andet']],
      antal: [['under-10', 'Under 10'], ['10-30', '10-30'], ['30-100', '30-100'], ['over-100', 'Over 100']],
      deler: [['aldrig', 'Aldrig'], ['maanedligt', 'Månedligt'], ['ugentligt', 'Ugentligt'], ['dagligt', 'Dagligt']],
    },
  },

  foerste: {
    titel: 'Første indtryk',
    varighed: '1 min',
    sporgsmaal: {
      formaal: 'Hvad tror du, Vigta er til? Skriv det med dine egne ord.',
      uklart: 'Var der noget i starten, du ikke forstod?',
    },
  },

  slut: {
    titel: 'Slutskema',                                                      // kilden: "Slutskema (dag 7, 5 min)"
    varighed: '5 min',
    sus: [
      'Jeg tror, at jeg gerne vil bruge Vigta ofte',
      'Jeg synes, Vigta er unødvendigt indviklet',
      'Jeg synes, Vigta er let at bruge',
      'Jeg tror, jeg skal have hjælp af en teknisk person for at kunne bruge Vigta',
      'Jeg synes, funktionerne i Vigta hænger godt sammen',
      'Jeg synes, der er for mange uoverensstemmelser i Vigta',
      'Jeg tror, de fleste hurtigt vil lære at bruge Vigta',
      'Jeg synes, Vigta er besværlig at bruge',
      'Jeg følte mig sikker, da jeg brugte Vigta',
      'Jeg skulle lære meget, før jeg kunne komme i gang med Vigta',
    ],
    susHjaelp: 'Svar fra 1 (helt uenig) til 5 (helt enig).',
    helt_uenig: 'Helt uenig',
    helt_enig: 'Helt enig',
    sporgsmaal: {
      enig: 'Var du enig i det, Vigta satte øverst i Vigtigst i dag?',
      gik_i_staa: 'Hvor gik du i stå eller var i tvivl?',
      ord: 'Hvilke ord forstod du ikke, eller ville du have kaldt noget andet? Fx Konsekvens, Delt, På tværs, Parkér',
      sammen: 'Kun par: Hvad fik I ud af at vurdere sammen, som I ikke fik før?',
      stadig: 'Bruger du stadig Vigta om en uge?',
      betale: 'Plus koster 39 kr. om måneden eller 349 kr. om året og giver På tværs, deling med flere end 2 og 2 GB til fotos. Ville du betale for det?',
      interview_tid: 'Hvornår passer det dig, at vi taler i 20 minutter?',
      hvorfor: 'Hvorfor?',
    },
    valg: {
      enig: [['som-regel', 'Som regel'], ['nogle-gange', 'Nogle gange'], ['sjaeldent', 'Sjældent']],
      stadig: [['ja', 'Ja'], ['maaske', 'Måske'], ['nej', 'Nej']],
      betale: [['ja', 'Ja'], ['maaske', 'Måske'], ['nej', 'Nej']],
    },
  },

  /* ---- EGNE tekster (spor H) ---- */
  hej: 'Hej {fornavn}',
  intro: 'Her er dine skemaer til testen af Vigta.',
  listeTitel: 'Dine skemaer',
  udfyldt: 'Udfyldt',
  ikkeUdfyldt: 'Ikke udfyldt',
  aabn: 'Åbn',
  tilListen: 'Alle skemaer',
  laeser: 'Henter dit skema …',
  videre: 'Videre',
  videreHjaelp: 'Sæt kryds for at gå videre.',
  laesSamtykke: 'Læs teksten om samtykke igen',
  skjulSamtykke: 'Skjul teksten om samtykke',
  maaVaereTomt: '(må være tomt)',
  valgfrit: '(valgfrit)',
  gem: 'Gem',
  gemAendringer: 'Gem ændringer',
  gemmer: 'Gemmer …',
  del1: 'Del 1 af 2',
  del2: 'Del 2 af 2',
  besvaret: '{n} af 10 besvaret',
  videreDel2: 'Videre til del 2',
  tilbageDel1: 'Tilbage til del 1',
  manglerSus: 'Mangler svar på udsagn {liste}.',
  tak: 'Tak, dit svar er gemt. Du kan rette det indtil {dato}.',
  takLuk: 'Du kan lukke siden nu.',
  traekTilbage: 'Træk mit samtykke tilbage',
  traekTekst: 'Dine svar bliver slettet med det samme.',
  sletSvar: 'Slet mine svar',
  fortryd: 'Fortryd',
  slettet: 'Dine svar er slettet. Tak, fordi du ville være med.',
  kontakt: 'Spørgsmål om dine data: privacy@vigta.app',
  manglerSamtykke: 'Udfyld først det korte skema med samtykket.',
  tilMini: 'Gå til det korte skema',
  /* fejl (2.4 i prompten - ordret, undtagen "hentFejl" og felt-teksterne) */
  linketVirkerIkke: 'Linket virker ikke. Skriv til Mikael, så får du et nyt.',
  ikkeGemt: 'Svaret blev ikke gemt. Prøv igen om lidt.',
  hentFejl: 'Skemaet kunne ikke hentes. Prøv igen om lidt.',             // EGEN: GET fejler på net eller server
  lukket: 'Skemaet er lukket. Tak for din hjælp.',
  proevIgen: 'Prøv igen',
  oversigtTitel: 'Der mangler noget, før svaret kan gemmes:',
  feltMangler: 'Skriv et svar.',
  valgMangler: 'Vælg et svar.',
  mindstEt: 'Vælg mindst én.',
  feltAfvist: 'Svaret blev ikke godtaget. Ret feltet, og prøv igen.',
  /* tegn */
  taeller: '{n} af 1000 tegn',
  afskaaret: 'Teksten var for lang og er skåret ved 1000 tegn.',
  maaneder: ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'],
};
