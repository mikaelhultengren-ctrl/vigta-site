# Prompt til CD · FAB-placering som mockup på telefonen (23.10.26)

Læs CLAUDE.md afsnit ALTID før du rører kode.

## Opgaven

Lav et klikbart mockup af FAB-placeringen i Vigta, som Mikael kan åbne på sin iPhone og dømme i fuld skærm. Fire varianter, én pr. side, så hver variant fylder hele skærmen uden telefonramme.

Udgangspunkt: artefaktet "Vigta FAB-placering" (https://claude.ai/artifact/UNSXMXEc2YK8eQoYTnGGyx). Behold dets fire varianter og tal, men løft det fra skitse til Vigtas rigtige udtryk (FACIT).

## De fire varianter

| | Fanelinje | FAB | Mål |
|---|---|---|---|
| A · i dag | Glaskapsel venstre-højre 16, højde 62, 21 fra bunden, højre kant 92 fra skærmkant | Glas 64, teal stjerne, til højre, 16 fra kant, 20 fra bund | Målt fra skærmbillede af nuværende build |
| B · samme linje (anbefalet) | Flad glasbjælke 49 + 34 hjem-zone, kolonner 78 · 78 · midte · 78 · 78 | Teal fyldt 56 i midten, i bjælkens linje | Dækker 89 |
| C · linjen over | Flad glasbjælke, fire lige kolonner | Teal fyldt 56 i midten, svæver 12 over bjælken | Dækker 151 |
| D · midten, originale mål | Kapsel som A, men med en 72-midte | Glas 64 i midten, 20 fra bund | Som A |

Fanerne er Opgaver, Noter, Kalender, Progression. A og D bruger appens nuværende udfyldte ikoner og grå pille på valgt fane; B og C bruger stregikoner og teal tekst på valgt fane.

## Adfærd, der skal kunne mærkes

- Tryk på FAB = "Ny opgave" (kort toast). Hold 0,5 s = "Indtal" (ring løber rundt om FAB'en, toast bliver stående til slip).
- Fanerne kan skiftes, og overskriften følger.
- Listen kan rulles, så man ser, hvad fanelinje og FAB dækker. Brug 18 realistiske opgaver med dato og stjerne.
- Skift mellem A, B, C og D med en lille kontrol øverst, der ikke dækker indhold. Plus Lys/Mørk og en "Mål"-knap, der lægger målestreger på (FAB-størrelse, afstand til bund, hvor meget der dækkes).

## Vigtas regler, der gælder (FACIT og CLAUDE.md)

- Teal som blæk/flade `#0D9373` (lys) / `#3FD2AB` (mørk). Teal som tekst under 20 pt: `#0A6E56` (lys) / `#3FD2AB` (mørk). `#8E8E93` må ikke bruges til tekst.
- Glas: ét materiale i hele appen (`--ff-glass-*`). Ingen anden gradient eller dekoration end baggrunden.
- Baggrund: lys = rent hvidt ark; mørk = `#000`. Ingen CSS-gradient i stedet for baggrundsbilledet.
- Ikoner måles på blækket: 16,5 ± 0,5 pt i en 20 pt-ramme for faneikonerne.
- Skrift: systemfonten (-apple-system / SF Pro), ikke Manrope eller Figtree.
- Respekter safe area (notch og hjem-indikator) via `env(safe-area-inset-*)`, og `viewport-fit=cover`.

## Leverance

- Én selvstændig HTML-fil (ingen eksterne afhængigheder), der virker i Safari på iPhone 17 Pro (402 × 874 pt) og kan lægges som "Føj til hjemmeskærm".
- Variant kan vælges med `?v=A|B|C|D` i adressen, så Mikael kan få et direkte link til hver.
- Filnavn: `fab-mockup.html`. CC lægger den på `vigta.app/mockup/fab/` (med `noindex`), så den kan åbnes på telefonen.
- Skriv i én linje pr. variant, hvad der er ændret i forhold til skitsen, og hvor du afveg fra FACIT, hvis du gjorde.
