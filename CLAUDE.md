# vigta-site - arbejdsregler for Claude Code

Læs denne fil før enhver opgave i dette repo.

## Hvad det er
Statisk site for vigta.app på GitHub Pages. Grenen `main` er det offentlige site: en fletning til main er et deploy. Repoet er offentligt, så der skrives aldrig hemmeligheder, persondata eller interne vurderinger i det.

## To sessioner arbejder i dette repo
Den synlige session, som Mikael skriver til, og ordre-vagtens session uden vindue, som udfører PL's ordrer. De må ikke ramme de samme filer.

- Hent først: start altid med `git fetch`, og arbejd fra nyeste `origin/main`.
- Synlig session: egen gren pr. opgave (`mikael-<emne>`) og PR mod main. Er der en åben PR fra vagten, eller en ordre uden kvittering i `docs/ordrer/kvittering.md` på grenen `pl`, så rør ikke de filer, den dækker.
- Vagtens session arbejder kun på det, ordren nævner, og kun én ordre ad gangen.
- En opgave, Mikael giver direkte, får én linje i `docs/status.md` på grenen `pl`.
- `docs/` ligger kun på grenen `pl` og flettes aldrig til main.

## Faste regler
- Ti sprog: da, de, en, es, fi, fr, it, ja, nb, sv. En tekstændring laves i alle ti med dansk som kladde.
- Kontraktstier ændres kun efter en PL-ordre: `.well-known/`, `kalender-retur/`, `import-retur/`, `privacy/`, `privatliv/`, `terms/`, `vilkaar/`, `delete-account/`, `slet-konto/`, `support/`, `web/`, `<sprog>/web/` og `test/`.
- En offentlig adresse slettes aldrig uden en PL-ordre. Juridiske tekster ændres kun, når Mikael har godkendt den konkrete tekst.
- Farver, fonte og logo følger Vigtas FACIT (`docs/facit/FACIT.md` i repoet vigta).
- Aldrig em dash. Brug bindestreg som tankestreg.
- Mikael får aldrig en terminalkommando eller et manuelt trin.
- Sessioner kører på Sonnet.
