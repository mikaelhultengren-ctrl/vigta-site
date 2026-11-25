# vigta-site · status

Opdateret 25.11.2026 af arbejdssessionen. Grundlag for overhalingen før lanceringen 15.12.2026.
Grenen `pl` holder `docs/` og flettes aldrig til `main`.

## Log

- 25.11.2026 · Første opgave: Pages-indstilling, de to skjulte mapper og oversigt over sitet. Ingen ændringer på sitet.
- 25.11.2026 · Mikael gav direkte i chatten sessionen lov til at bruge GitHub-login til `gh` og push.

- 25.11.2026 · Statussiden, ordre `2026-11-25-overhaling-1.md` del A: mappen `jkvmyomogbzimrw43iu9/` og dens Disallow-linje i `robots.txt` er fjernet på `statusside-af` (PR 5, flettes af vagten). `p7k2x9m4q8w3r5/` er ikke rørt. Afsnit 2, 3 nedenfor beskriver sitet før fjernelsen.

- 25.11.2026 · Overhaling bølge 1 (del B) på `overhaling-1`: punkt 2-8 lavet, punkt 1 (skrift) mangler skriftfilerne. Se afsnittet nedenfor. Afsnit 3 længere nede beskriver sitet før overhalingen.

## Overhaling bølge 1 (25.11.2026)

### Mangler før den kan gå live

- **Skriftfilerne.** Læg `Figtree-Regular.ttf`, `-Medium.ttf`, `-SemiBold.ttf`, `-Bold.ttf`, `-ExtraBold.ttf` og `OFL.txt` fra vigta-repoets `src/fonts/` i sitets `fonts/`. Sessionens tilladelser afviste kopieringen. `stil.css` er klar til filerne; indtil da bruges Schibsted Grotesk som reserve, og browseren får 404 på de fem filer. Japansk er uændret.

### Lanceringsudgaven: det der mangler (udfyldes ét sted, `lancering.js`)

- `appStore`: App Store-adressen (https).
- `googlePlay`: Google Play-adressen (https).
- `webLogin`: adressen til web-appens login (https). Siden `web/` linker til login; der er ingen loginformular på selve siden.
- Når bare én butiksadresse er udfyldt, vises butiksknapperne, og "Kommer til iPhone og Android" skjules. Udfyld derfor begge samtidig.
- Knapperne er tekstknapper. Apples og Googles officielle mærker er ikke lagt ind.

### Skærmbilleder: det PL skal skaffe

- Fem skærme: opgavelisten med kategorier, vurderingen med de tre skydere, kalenderen, Ugeplan og noter.
- Lys og mørk, dansk og engelsk (de otte øvrige sprog viser de engelske), 20 filer i alt.
- PNG, 780 × 1688 px (390 × 844 punkter i 2x), kun opdigtede data uden rigtige navne.
- Navne: `skaerme/<da|en>/<opgaver|vurdering|kalender|ugeplan|noter>-<lys|moerk>.png`. Sæt derefter `skaermbilleder: true` i `lancering.js`.

### Vilkår og privatliv: steder der ikke længere passer (ingen tekst er ændret)

| Hvor (dansk udgave) | Teksten siger | Appen |
|---|---|---|
| Privatliv, indledningen | Sorterer efter værdi og indsats | Tre skydere: Betydning, Indsats, Konsekvens |
| Privatliv 4.2, 4.4, 5.3 og tabellen i 9 | "stjerner" | Vurdering sker med skydere. Tjek, hvad der faktisk gemmes |
| Privatliv 4.7 | Kun læseadgang til Google og Outlook; Vigta ændrer aldrig noget i kalenderen | Appens tekster viser, at aftaler kan opdateres i og sendes til Outlook. Skal afklares |
| Vilkår 8 | Plus omfatter bl.a. ubegrænset Indtal og vurderingsskabeloner | Appens Plus-oversigt nævner På tværs, deling med flere end to og 2 GB |

Gennemgangen bygger på appens tekster, ikke på en afprøvning i appen.

### Links i privatlivspolitikken

Optalt: da 27, en 27, sv 28, ja 26, de, es, fi, fr, it og nb 29. Ordren regnede engelsk blandt dem med 29.

- Afsnit 10, adressen til slet konto: klikbar i de, es, fi, fr, it, nb, ja. Ren tekst i da, en, sv.
- Sidst i politikken, adressen til politikken selv: klikbar i de, es, fi, fr, it, nb, sv, ja. Ren tekst i da, en.
- Japansk: de to mailadresser i afsnit 1's sidste stykke og support-adressen i afsnit 10 er ren tekst.

### Til efterretning

- Hjælpesiderne er skrevet efter appens tekster og FACIT, ikke afprøvet i build 591. De ni oversættelser er sessionens egne sætninger med appens ord for skydere, kategorier og faner. Japansk er ikke indfødt korrekturlæst.
- Kategorinavnene på forsiden følger nu appen (bl.a. "Senere" i stedet for "Parkér").
- Forsidens overskrift for På tværs afviger fra appens ord på tysk og svensk (hjælpesiden bruger appens).
- Fyldte knapper bruger fortsat `#0A6E56` og ikke `#0D9373`, så hvid tekst har nok kontrast. Den mørkeblå top er beholdt.
- Linket til kalenderdata i den mørke top er gjort læsbart.
- I appens sprogfiler (ikke sitet): visningen "Liste" er uoversat i flere sprog, og noten om venstrehåndsskydere står på dansk i alle ti.

## Statussiden og repoets historik

- Indholdet af den fjernede statusside findes stadig i repoets historik, fordi repoet er offentligt. Historikken er ikke ryddet.
- Vurdering (kun den nuværende udgave; ældre udgaver er ikke gennemgået): ingen adgangsnøgler eller mailadresser set, men siden indeholder hashen af adgangskoden (kan gættes offline, så koden bør ikke bruges andre steder), et fornavn på en anden person og interne noter om byg og drift.

## 1. GitHub Pages

Aflæst med `gh api repos/mikaelhultengren-ctrl/vigta-site/pages` 25.11.2026.

| Punkt | Værdi |
|---|---|
| Repo | `mikaelhultengren-ctrl/vigta-site`, offentligt, standardgren `main` |
| Kilde-gren og mappe | `main`, `/` |
| Byggetype | `legacy` (fra gren, ingen workflows; `.nojekyll` i roden), status `built` |
| Domæne | `vigta.app` (`CNAME`) |
| HTTPS | gennemtvunget, certifikat godkendt, udløber 28.12.2026 |

Repoet ligger ikke lokalt i `~/Udvikling/vigta-site`. Sessionen arbejder på en midlertidig klon.

## 2. De to skjulte mapper (ikke rørt)

| Mappe | Hvad | Sidst ændret | Andet |
|---|---|---|---|
| `jkvmyomogbzimrw43iu9/` | Statusside "Vigta · status" (byggestatus, kodefelt, mørk side) | 05.11.2026 | `noindex`, står i `robots.txt` som Disallow. Ikke opdateret i 20 dage. |
| `p7k2x9m4q8w3r5/` | Klikbar prototype "hold på FAB, billede og forslag" som hjemmeskærms-webapp (manifest, ikon), ca. 1,1 MB i én HTML-fil | 23.11.2026 | `noindex`, står ikke i `robots.txt`. Åben PR 1 (gren `claude/cc-prompt-fab-mockup-xo81av`) hører efter titlen til samme prototype. |

Ingen sider på sitet linker til mapperne.

## 3. Oversigt over sitet

### Størrelse

- Hele repoet: 13 MB på disk, heraf `.git` 5,3 MB. 376 commits.
- Største mapper: `web-test/` 5,5 MB (testbygning af web-appen), `p7k2x9m4q8w3r5/` 1,1 MB.
- Sprogmapperne: 76-88 KB hver.

### Sider pr. sprog (10 sprog × 6 sider = 60 sider)

Sprog: da, en, de, sv, nb, fi, fr, es, it, ja.

| Side | Dansk sti | Øvrige sprog | Sidst ændret |
|---|---|---|---|
| Forside | `/da/` | `/<sprog>/` | 25.10.2026 |
| Hjælp | `/da/support/` | `/<sprog>/support/` | 13.10.2026 (ja 15.10) |
| Vigta på nettet | `/da/web/` | `/<sprog>/web/` | 13.10.2026 |
| Privatliv | `/da/privatliv/` | `/<sprog>/privacy/` | 30.10.2026, version 1.5, gældende fra 07.10.2026 |
| Vilkår | `/da/vilkaar/` | `/<sprog>/terms/` | 13.10.2026, version 1.0, gældende fra 07.10.2026 |
| Slet konto | `/da/slet-konto/` | `/<sprog>/delete-account/` | 13.10.2026 |

Rodsider (kontrakter): `privacy/`, `terms/`, `delete-account/` (engelsk kopi), `privatliv/`, `vilkaar/`, `slet-konto/`, `support/`, `web/` (dansk kopi), `kalender-retur/` og `import-retur/` (sender videre til appen, 18.11.2026), `.well-known/` (app-links iOS/Android), `test/`.
Øvrigt: `index.html` vælger sprog ud fra browseren (standard en), `404.html` (dansk), `sitemap.xml` (61 adresser, uden lastmod), `robots.txt`, `stil.css` (én fil, lys/mørk), `fonts/`, ikoner. Ikke-kontrakt: `web-test/` (titel "FokusFilter — web", 01.11.2026).

### Ens i alle ti sprog

- Samme seks sider, samme antal overskrifter og links pr. side, samme sprogvælger, hreflang og canonical.
- Samme stilfil, logo og footer ("Vigta udvikles af Exekio · CVR").
- Samme versionsnummer og dato i privatliv og vilkår.

### Forskelle mellem sprogene

- Japansk har egen skriftstak og er sidst ændret 15.10 på hjælp og vilkår (øvrige 13.10).
- Privatliv: dansk har 27 links, de fleste andre 29, ja 26, sv 28. Skal tjekkes linje for linje.
- Kun slug-forskel: dansk bruger danske stier, de ni andre engelske.

### Mangler eller forældet set mod 15.12.2026

1. **"Kommer til iPhone og Android"** på forsiden og **"Web-appen er ikke åben endnu"** på web-siden. Skal skiftes til butikslinks og login ved lancering. Ingen App Store- eller Google Play-links findes på sitet.
2. **Skrift:** sitet bruger Schibsted Grotesk og kalder den "appens egen". FACIT siger Figtree.
3. **Farve:** Planlæg-prikken er blå `#5B7CFA`. FACIT (30.10.2026) siger guld `#B07812` / mørk `#F5C451`.
4. **Vurdering:** forsiden og hjælp beskriver "stjerner for værdi og indsats". Appen bruger siden 20.10.2026 tre skydere (Betydning, Indsats, Konsekvens). Kategorinavnene skal afstemmes med appen.
5. **Hjælp** er ikke ændret siden 13.10 og dækker ikke funktioner fra senere builds (kalender, noter, Dagens tre m.m.).
6. **Billeder:** ingen skærmbilleder af appen på sitet, kun ikonet.
7. **Rodsiden** (uden JavaScript) har en anden tagline ("Vital to-dos") end sprogsiderne.
8. **Vilkår 1.0 / privatliv 1.5** er fra 07.10. Skal gennemses mod appen ved lancering (kun med Mikaels godkendte tekst).
9. **sitemap.xml** mangler lastmod. `404.html` findes kun på dansk.
10. **Statussiden** er ikke opdateret siden 05.11, og `web-test/` (5,5 MB) bærer det gamle navn FokusFilter.
