/* vigta.app/test · testskemaerne (spor H, 14.10.26; testbruger-sporet via projektlederen).
 *
 * Én statisk side for de 12-14 testere i den eksterne beta. Linket bærer `#s=<skema>&t=<token>`; siden spørger
 * test-skema-funktionen (spor A, kontrakten i CC-prompt-spor-h-testskemaer-2026-10-14.md afsnit 3) og viser skemaet.
 *
 * Med vilje:
 *   - INGEN cookies, localStorage eller sessionStorage. Al tilstand ligger i hukommelsen (`st`); genindlæses siden,
 *     hentes de gemte svar igen fra serveren. fetch kører med credentials: 'omit'.
 *   - Intet indsættes som HTML: alt fra serveren og fra testeren går ind som tekst (textContent / value).
 *   - Ingen tidsgrænse, ingen automatisk viderestilling, intet kræver lyd.
 *   - Tokenet læses fra adressens # og sendes KUN i kroppen af et POST (kontrakten 14.10, spor A).
 *   - Adressen til funktionen står ét sted: <meta name="vigta-test-api"> (byg.mjs læser hjemmeside/kilde/opsaetning.json).
 */
(function () {
  'use strict';
  var API = (document.querySelector('meta[name="vigta-test-api"]') || {}).content || '';
  var MAKS = 1000, TAELLER_FRA = 800;
  var SKEMAER = ['mini', 'foerste', 'slut'];
  var T = window.VIGTA_TEST_TEKSTER.da;   // sprog: en engelsk udgave vælges senere ud fra `sprog` fra GET
  var rod = document.getElementById('skema');

  var st = {
    t: '', s: '', data: null, svar: { mini: {}, foerste: {}, slut: {} },
    miniSide: 1, slutDel: 1, visSamtykke: false, fejl: {}, besked: null, gemmer: false,
    lukket: false, slettet: false, bekraeftTraek: false, kvittering: null,
  };

  /* ---------- små hjælpere ---------- */
  function fmt(s, v) { return String(s).replace(/\{(\w+)\}/g, function (h, k) { return v && k in v ? String(v[k]) : h; }); }
  function h(tag, attr) {
    var el = document.createElement(tag);
    if (attr) for (var k in attr) {
      var v = attr[k];
      if (v == null || v === false) continue;
      if (k === 'tekst') el.textContent = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    }
    for (var i = 2; i < arguments.length; i++) {
      var b = arguments[i];
      if (b == null || b === false) continue;
      if (Array.isArray(b)) b.forEach(function (x) { if (x) el.appendChild(typeof x === 'string' ? document.createTextNode(x) : x); });
      else el.appendChild(typeof b === 'string' ? document.createTextNode(b) : b);
    }
    return el;
  }
  function link(skema) { return '#' + (skema ? 's=' + skema + '&' : '') + 't=' + encodeURIComponent(st.t); }
  function dato(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
    return m ? (+m[3]) + '. ' + T.maaneder[+m[2] - 1] : '';
  }
  function tom(v) { return v == null || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0); }
  function harGemt(skema) { return !!(st.data && st.data.udfyldt && st.data.udfyldt[skema]); }
  function erPar() { return !!(st.data && st.data.gruppe === 'par'); }

  /* ---------- adresse og hentning ---------- */
  function laesAdresse() {
    var p = new URLSearchParams((location.hash || '').replace(/^#/, ''));
    st.t = p.get('t') || '';
    st.s = SKEMAER.indexOf(p.get('s')) >= 0 ? p.get('s') : '';
  }

  function hent() {
    st.data = null; st.besked = null; st.fejl = {}; st.kvittering = null; st.bekraeftTraek = false;
    if (!st.t || !API) { st.besked = { slags: 'link' }; return tegn(); }
    tegn();
    /* Kontrakten 14.10 (spor A): tokenet sendes i KROPPEN af et POST - aldrig i adressen, for gatewayens log gemmer hele
       adressen (målt på testgrenen: 9 af 15 linjer bar ?t=). `?t=` giver 400 token-i-adresse. */
    post({ t: st.t, handling: 'hent' })
      .then(function (r) {
        if (r.status === 404 || r.status === 400 || r.status === 401) { st.besked = { slags: 'link' }; return null; }
        if (r.status === 410) { st.lukket = true; return r.krop || {}; }
        if (r.status < 200 || r.status >= 300) { st.besked = { slags: 'hent' }; return null; }
        return r.krop;
      })
      .then(function (d) {
        if (d) {
          st.data = d;
          ['mini', 'foerste', 'slut'].forEach(function (k) { st.svar[k] = kopi((d.svar && d.svar[k]) || {}); });
          st.miniSide = d.samtykke ? 2 : 1;
        }
        tegn();
      })
      .catch(function () { st.besked = { slags: 'hent' }; tegn(); });
  }
  function kopi(o) { return JSON.parse(JSON.stringify(o)); }

  /* ---------- tegning ---------- */
  function tegn() {
    rod.textContent = '';
    rod.setAttribute('aria-busy', st.data || st.besked || st.slettet ? 'false' : 'true');
    if (st.slettet) return rod.appendChild(kort(h('p', { class: 'stor', role: 'status', tekst: T.slettet }), h('p', { class: 'meta', tekst: T.kontakt })));
    if (st.besked && st.besked.slags === 'link') return rod.appendChild(kort(h('p', { class: 'stor', role: 'alert', tekst: T.linketVirkerIkke })));
    if (st.besked && st.besked.slags === 'hent') {
      return rod.appendChild(kort(h('p', { role: 'alert', tekst: T.hentFejl }), h('button', { type: 'button', class: 'knap knap-fyldt', onclick: hent, tekst: T.proevIgen })));
    }
    if (!st.data) return rod.appendChild(h('p', { class: 'meta', role: 'status', tekst: T.laeser }));

    rod.appendChild(h('h1', { class: 'hej', tekst: fmt(T.hej, { fornavn: st.data.fornavn || '' }) }));
    if (!st.s) return tegnListe();
    rod.appendChild(h('p', { class: 'tilbage' }, h('a', { href: link(''), tekst: T.tilListen })));
    if (st.kvittering) rod.appendChild(kvittering());
    if (st.lukket) rod.appendChild(kort(h('p', { role: 'status', tekst: T.lukket })));
    if (st.s === 'mini') tegnMini();
    else if (st.s === 'foerste') tegnFoerste();
    else tegnSlut();
    tegnTraek();
  }

  function kort() { var k = h('div', { class: 'kort' }); for (var i = 0; i < arguments.length; i++) if (arguments[i]) k.appendChild(arguments[i]); return k; }

  function tegnListe() {
    rod.appendChild(h('p', { class: 'ingress', tekst: T.intro }));
    var ul = h('ul', { class: 'skemaliste', 'aria-label': T.listeTitel });
    SKEMAER.forEach(function (k) {
      var udf = harGemt(k);
      ul.appendChild(h('li', null, h('a', { href: link(k), class: 'skemalink' },
        h('span', { class: 'skemanavn', tekst: T[k].titel }),
        h('span', { class: 'skemastatus' + (udf ? ' udfyldt' : ''), tekst: (udf ? T.udfyldt : T.ikkeUdfyldt) + ' · ' + T[k].varighed }))));
    });
    rod.appendChild(h('h2', { class: 'visuelt-skjult', tekst: T.listeTitel }));
    rod.appendChild(ul);
    tegnTraek();
  }

  function kvittering() {
    var k = kort(h('h2', { id: 'kvittering', tabindex: '-1', class: 'kvit', tekst: fmt(T.tak, { dato: dato(st.data.aaben_til) }) }),
      h('p', { class: 'meta', tekst: T.takLuk }), h('p', null, h('a', { href: link(''), tekst: T.tilListen })));
    k.setAttribute('role', 'status');
    k.className += ' kort-kvit';
    return k;
  }

  /* ---------- felter ---------- */
  function fejlFor(noegle) { return st.fejl[noegle] ? h('p', { class: 'feltfejl', id: 'e-' + noegle, tekst: st.fejl[noegle] }) : null; }
  function beskriv(noegle, ekstra) { return [st.fejl[noegle] ? 'e-' + noegle : '', ekstra || ''].join(' ').trim() || null; }

  function tekstfelt(skema, noegle, etiket, o) {
    o = o || {};
    var v = st.svar[skema][noegle] || '';
    var id = 'f-' + noegle;
    var taeller = h('p', { class: 'taeller', id: 't-' + noegle, 'aria-live': 'polite', hidden: v.length < TAELLER_FRA, tekst: fmt(T.taeller, { n: v.length }) });
    var afsk = h('p', { class: 'afskaaret', id: 'a-' + noegle, role: 'status', hidden: true, tekst: T.afskaaret });
    var felt = h(o.linje ? 'input' : 'textarea', {
      id: id, name: noegle, maxlength: String(MAKS), rows: o.linje ? null : '3', type: o.linje ? 'text' : null,
      'aria-invalid': st.fejl[noegle] ? 'true' : null, 'aria-describedby': beskriv(noegle, 't-' + noegle),
      'aria-required': o.valgfri ? null : 'true', disabled: st.lukket,
      oninput: function (e) {
        st.svar[skema][noegle] = e.target.value;
        taeller.hidden = e.target.value.length < TAELLER_FRA;
        taeller.textContent = fmt(T.taeller, { n: e.target.value.length });
      },
      onpaste: function (e) {
        var ind = (e.clipboardData && e.clipboardData.getData('text')) || '';
        var rest = e.target.value.length - (e.target.selectionEnd - e.target.selectionStart);
        afsk.hidden = rest + ind.length <= MAKS;
      },
    });
    felt.value = v;
    var lbl = h('label', { for: id }, etiket, o.valgfri ? h('span', { class: 'valgfri', tekst: ' ' + (o.valgfriTekst || T.valgfrit) }) : null);
    return h('div', { class: 'felt' + (o.klasse ? ' ' + o.klasse : ''), id: 'b-' + noegle }, lbl, fejlFor(noegle), felt, taeller, afsk);
  }

  function valggruppe(skema, noegle, legend, valg, o) {
    o = o || {};
    var flere = !!o.flere;
    var nu = st.svar[skema][noegle];
    var fs = h('fieldset', { class: 'valg' + (flere ? ' flere' : ''), id: 'f-' + noegle, 'aria-describedby': beskriv(noegle, o.hjaelpId), 'aria-invalid': st.fejl[noegle] ? 'true' : null, disabled: st.lukket },
      h('legend', null, legend, o.hjaelp ? h('span', { class: 'hjaelp', id: o.hjaelpId, tekst: o.hjaelp }) : null));
    var fejl = fejlFor(noegle); if (fejl) fs.appendChild(fejl);
    var liste = h('div', { class: 'valgliste' });
    valg.forEach(function (par) {
      var vid = 'f-' + noegle + '-' + par[0];
      var valgt = flere ? Array.isArray(nu) && nu.indexOf(par[0]) >= 0 : nu === par[0];
      var inp = h('input', { type: flere ? 'checkbox' : 'radio', id: vid, name: noegle, value: par[0], checked: valgt,
        onchange: function (e) {
          if (flere) {
            var l = Array.isArray(st.svar[skema][noegle]) ? st.svar[skema][noegle].slice() : [];
            if (e.target.checked) { if (l.indexOf(par[0]) < 0) l.push(par[0]); } else l = l.filter(function (x) { return x !== par[0]; });
            st.svar[skema][noegle] = l;
          } else st.svar[skema][noegle] = par[0];
          if (o.efter) o.efter();
        } });
      liste.appendChild(h('label', { class: 'valgknap', for: vid }, inp, h('span', { tekst: par[1] })));
    });
    fs.appendChild(liste);
    return fs;
  }

  function knapGem(skema, ekstra) {
    if (st.lukket) return null;
    var tekst = st.gemmer ? T.gemmer : (harGemt(skema) ? T.gemAendringer : T.gem);
    return h('div', { class: 'handling' }, ekstra || null,
      h('button', { type: 'submit', class: 'knap knap-fyldt', disabled: st.gemmer || (ekstra && ekstra.dataset && ekstra.dataset.spaer === '1'), tekst: tekst }));
  }

  function oversigt() {
    var noegler = Object.keys(st.fejl);
    if (!noegler.length && !(st.besked && st.besked.slags)) return null;
    if (st.besked && st.besked.slags === 'gem') {
      return h('div', { class: 'oversigt', id: 'oversigt', tabindex: '-1', role: 'alert' },
        h('p', { tekst: T.ikkeGemt }), h('button', { type: 'submit', class: 'knap knap-kant', tekst: T.proevIgen }));
    }
    if (st.besked && st.besked.slags === 'samtykke') {
      return h('div', { class: 'oversigt', id: 'oversigt', tabindex: '-1', role: 'alert' },
        h('p', { tekst: T.manglerSamtykke }), h('p', null, h('a', { href: link('mini'), tekst: T.tilMini })));
    }
    if (!noegler.length) return null;
    var ul = h('ul');
    noegler.forEach(function (k) { ul.appendChild(h('li', null, h('a', { href: '#f-' + k, onclick: function (e) { e.preventDefault(); var f = document.getElementById('f-' + k); if (f) { f.scrollIntoView({ block: 'center' }); var i = f.matches('input,textarea') ? f : f.querySelector('input,textarea'); if (i) i.focus(); } }, tekst: etiketFor(k) }))); });
    return h('div', { class: 'oversigt', id: 'oversigt', tabindex: '-1', role: 'alert' }, h('p', { tekst: T.oversigtTitel }), ul);
  }
  function etiketFor(k) {
    var kilder = [T.mini.sporgsmaal, T.foerste.sporgsmaal, T.slut.sporgsmaal];
    for (var i = 0; i < kilder.length; i++) if (kilder[i][k]) return kilder[i][k];
    if (k === 'sus') return T.slut.susHjaelp;
    if (k === 'samtykke') return T.samtykke.kryds;
    return k;
  }

  function form(skema, indhold) {
    var f = h('form', { novalidate: true, onsubmit: function (e) { e.preventDefault(); gem(skema); } });
    var o = oversigt(); if (o) f.appendChild(o);
    indhold.forEach(function (x) { if (x) f.appendChild(x); });
    return f;
  }

  /* ---------- samtykketeksten ---------- */
  function samtykketekst() {
    var s = T.samtykke;
    var d = h('section', { class: 'samtykke', 'aria-labelledby': 'samtykke-titel' }, h('h2', { id: 'samtykke-titel', tekst: s.titel }), h('p', { tekst: s.indledning }));
    s.afsnit.forEach(function (a) { var ul = h('ul'); a.punkter.forEach(function (p) { ul.appendChild(h('li', { tekst: p })); }); d.appendChild(h('h3', { tekst: a.titel })); d.appendChild(ul); });
    d.appendChild(h('h3', { tekst: s.rettighederTitel }));
    d.appendChild(h('p', { tekst: s.rettigheder }));
    return d;
  }

  /* ---------- mini ---------- */
  function tegnMini() {
    var M = T.mini, q = M.sporgsmaal;
    rod.appendChild(h('h2', { class: 'skematitel', tekst: M.titel }));
    if (st.miniSide === 1 && !(st.data.samtykke)) {
      var videre = h('button', { type: 'button', class: 'knap knap-fyldt', disabled: !st.svar.mini.__kryds, 'aria-describedby': 'videre-hjaelp', tekst: T.videre,
        onclick: function () { if (!st.svar.mini.__kryds) return; st.miniSide = 2; tegn(); var h2 = rod.querySelector('.skematitel'); if (h2) { h2.setAttribute('tabindex', '-1'); h2.focus(); } } });
      var kryds = h('input', { type: 'checkbox', id: 'f-samtykke', checked: !!st.svar.mini.__kryds,
        onchange: function (e) { st.svar.mini.__kryds = e.target.checked; videre.disabled = !e.target.checked; hj.hidden = e.target.checked; } });
      var hj = h('p', { class: 'hjaelp', id: 'videre-hjaelp', hidden: !!st.svar.mini.__kryds, tekst: T.videreHjaelp });
      rod.appendChild(kort(samtykketekst(), h('div', { class: 'kryds' }, h('label', { class: 'valgknap', for: 'f-samtykke' }, kryds, h('span', { tekst: T.samtykke.kryds })))));
      rod.appendChild(h('div', { class: 'handling' }, hj, videre));
      return;
    }
    if (st.data.samtykke) {
      rod.appendChild(h('p', null, h('button', { type: 'button', class: 'linkknap', 'aria-expanded': st.visSamtykke ? 'true' : 'false', 'aria-controls': 'samtykke-vis',
        onclick: function () { st.visSamtykke = !st.visSamtykke; tegn(); }, tekst: st.visSamtykke ? T.skjulSamtykke : T.laesSamtykke })));
      if (st.visSamtykke) { var sv = samtykketekst(); sv.id = 'samtykke-vis'; rod.appendChild(kort(sv)); }
    }
    var andet = tekstfelt('mini', 'vaerktoej_andet', q.vaerktoej_andet, { linje: true, valgfri: true });
    var visAndet = function () { andet.hidden = !(Array.isArray(st.svar.mini.vaerktoejer) && st.svar.mini.vaerktoejer.indexOf('andet') >= 0); };
    visAndet();
    var v3 = valggruppe('mini', 'vaerktoejer', q.vaerktoejer, M.valg.vaerktoejer, { flere: true, hjaelp: q.vaerktoejerHjaelp, hjaelpId: 'h-vaerktoejer', efter: visAndet });
    rod.appendChild(form('mini', [
      kort(tekstfelt('mini', 'daglig', q.daglig, { linje: true })),
      kort(valggruppe('mini', 'ansvar', q.ansvar, M.valg.ansvar)),
      kort(v3, andet),
      kort(tekstfelt('mini', 'beslutter', q.beslutter)),
      kort(valggruppe('mini', 'antal', q.antal, M.valg.antal)),
      kort(valggruppe('mini', 'deler', q.deler, M.valg.deler)),
      knapGem('mini'),
    ]));
  }

  /* ---------- første indtryk ---------- */
  function tegnFoerste() {
    var F = T.foerste, q = F.sporgsmaal;
    rod.appendChild(h('h2', { class: 'skematitel', tekst: F.titel }));
    if (!st.data.samtykke) {
      rod.appendChild(kort(h('p', { tekst: T.manglerSamtykke }), h('p', null, h('a', { href: link('mini'), tekst: T.tilMini }))));
      return;
    }
    rod.appendChild(form('foerste', [
      kort(tekstfelt('foerste', 'formaal', q.formaal)),
      kort(tekstfelt('foerste', 'uklart', q.uklart, { valgfri: true, valgfriTekst: T.maaVaereTomt })),
      knapGem('foerste'),
    ]));
  }

  /* ---------- slutskema ---------- */
  function susSvar() { var s = st.svar.slut.sus; return Array.isArray(s) ? s : []; }
  function susBesvaret() { var s = susSvar(), n = 0; for (var i = 0; i < 10; i++) if (s[i] >= 1 && s[i] <= 5) n++; return n; }
  function susMangler() { var s = susSvar(), m = []; for (var i = 0; i < 10; i++) if (!(s[i] >= 1 && s[i] <= 5)) m.push(i + 1); return m; }

  function tegnSlut() {
    var S = T.slut, q = S.sporgsmaal;
    rod.appendChild(h('h2', { class: 'skematitel', tekst: S.titel }));
    if (!st.data.samtykke) {
      rod.appendChild(kort(h('p', { tekst: T.manglerSamtykke }), h('p', null, h('a', { href: link('mini'), tekst: T.tilMini }))));
      return;
    }
    if (st.slutDel === 1) {
      var tael = h('p', { class: 'fremdrift', 'aria-live': 'polite', id: 'sus-fremdrift', tekst: T.del1 + ' · ' + fmt(T.besvaret, { n: susBesvaret() }) });
      rod.appendChild(tael);
      rod.appendChild(h('p', { class: 'meta', id: 'sus-hjaelp', tekst: S.susHjaelp }));
      var f = h('div', { class: 'susliste' });
      S.sus.forEach(function (udsagn, i) {
        var noegle = 'sus-' + (i + 1);
        var fs = h('fieldset', { class: 'kort sus', id: 'f-' + noegle, 'aria-describedby': 'sus-hjaelp', disabled: st.lukket },
          h('legend', null, h('span', { class: 'nr', tekst: (i + 1) + '. ' }), udsagn));
        var raekke = h('div', { class: 'skala' });
        for (var v = 1; v <= 5; v++) {
          (function (v) {
            var vid = 'f-' + noegle + '-' + v;
            var inp = h('input', { type: 'radio', id: vid, name: noegle, value: String(v), checked: susSvar()[i] === v,
              onchange: function () {
                var s = susSvar().slice(); while (s.length < 10) s.push(null); s[i] = v; st.svar.slut.sus = s;
                tael.textContent = T.del1 + ' · ' + fmt(T.besvaret, { n: susBesvaret() });
              } });
            raekke.appendChild(h('label', { class: 'skalaknap', for: vid }, inp,
              h('span', { class: 'tal', 'aria-hidden': 'true', tekst: String(v) }),
              h('span', { class: 'visuelt-skjult', tekst: v === 1 ? '1, ' + S.helt_uenig : v === 5 ? '5, ' + S.helt_enig : String(v) })));
          })(v);
        }
        fs.appendChild(raekke);
        fs.appendChild(h('div', { class: 'ender', 'aria-hidden': 'true' }, h('span', { tekst: S.helt_uenig }), h('span', { tekst: S.helt_enig })));
        f.appendChild(fs);
      });
      rod.appendChild(f);
      rod.appendChild(h('div', { class: 'handling' }, h('button', { type: 'button', class: 'knap knap-fyldt', tekst: T.videreDel2,
        onclick: function () { st.slutDel = 2; st.fejl = {}; tegn(); fokusTitel(); } })));
      return;
    }
    var mangler = susMangler();
    var spaer = h('p', { class: 'hjaelp', id: 'sus-mangler', 'data-spaer': mangler.length && !st.lukket ? '1' : '0', hidden: !mangler.length || st.lukket,
      tekst: fmt(T.manglerSus, { liste: mangler.join(', ') }) });
    var hv = function (n) { return tekstfelt('slut', n, q.hvorfor, { valgfri: true, klasse: 'hvorfor' }); };
    rod.appendChild(h('p', { class: 'fremdrift', tekst: T.del2 }));
    rod.appendChild(h('p', { class: 'tilbage' }, h('button', { type: 'button', class: 'linkknap', tekst: T.tilbageDel1, onclick: function () { st.slutDel = 1; st.fejl = {}; tegn(); fokusTitel(); } })));
    rod.appendChild(form('slut', [
      kort(valggruppe('slut', 'enig', q.enig, S.valg.enig), hv('enig_hvorfor')),
      kort(tekstfelt('slut', 'gik_i_staa', q.gik_i_staa)),
      kort(tekstfelt('slut', 'ord', q.ord)),
      erPar() ? kort(tekstfelt('slut', 'sammen', q.sammen)) : null,
      kort(valggruppe('slut', 'stadig', q.stadig, S.valg.stadig), hv('stadig_hvorfor')),
      kort(valggruppe('slut', 'betale', q.betale, S.valg.betale), hv('betale_hvorfor')),
      kort(tekstfelt('slut', 'interview_tid', q.interview_tid, { linje: true })),
      knapGem('slut', spaer),
    ]));
  }
  function fokusTitel() { var t = rod.querySelector('.fremdrift') || rod.querySelector('.skematitel'); if (t) { t.setAttribute('tabindex', '-1'); t.focus(); } }

  /* ---------- træk samtykket tilbage ---------- */
  function tegnTraek() {
    if (!st.data || st.slettet) return;
    var boks = h('div', { class: 'traek' });
    if (!st.bekraeftTraek) {
      boks.appendChild(h('button', { type: 'button', class: 'linkknap', id: 'traek-aabn', onclick: function () { st.bekraeftTraek = true; tegn(); var b = document.getElementById('traek-titel'); if (b) b.focus(); }, tekst: T.traekTilbage }));
    } else {
      boks.appendChild(h('div', { class: 'kort bekraeft', role: 'group', 'aria-labelledby': 'traek-titel' },
        h('p', { id: 'traek-titel', tabindex: '-1', class: 'stor', tekst: T.traekTekst }),
        st.besked && st.besked.slags === 'traek' ? h('p', { role: 'alert', class: 'feltfejl', tekst: T.ikkeGemt }) : null,
        h('div', { class: 'knapper' },
          h('button', { type: 'button', class: 'knap knap-fare', onclick: traekTilbage, tekst: T.sletSvar }),
          h('button', { type: 'button', class: 'knap knap-kant', onclick: function () { st.bekraeftTraek = false; if (st.besked && st.besked.slags === 'traek') st.besked = null; tegn(); var b = document.getElementById('traek-aabn'); if (b) b.focus(); }, tekst: T.fortryd }))));
    }
    boks.appendChild(h('p', { class: 'meta', tekst: T.kontakt }));
    rod.appendChild(boks);
  }

  function traekTilbage() {
    post({ t: st.t, handling: 'traek-tilbage' }).then(function (r) {
      if (r.status === 200) { st.slettet = true; st.data = null; st.svar = { mini: {}, foerste: {}, slut: {} }; tegn(); fokusRod(); return; }
      if (r.status === 404) { st.besked = { slags: 'link' }; return tegn(); }
      st.besked = { slags: 'traek' }; tegn();
    });
  }
  function fokusRod() { var p = rod.querySelector('.stor'); if (p) { p.setAttribute('tabindex', '-1'); p.focus(); } }

  /* ---------- gem ---------- */
  function valider(skema) {
    var s = st.svar[skema], f = {};
    function kraev(k, besked) { if (tom(s[k])) f[k] = besked || T.feltMangler; }
    if (skema === 'mini') {
      kraev('daglig'); kraev('ansvar', T.valgMangler); kraev('vaerktoejer', T.mindstEt); kraev('beslutter'); kraev('antal', T.valgMangler); kraev('deler', T.valgMangler);
    } else if (skema === 'foerste') {
      kraev('formaal');
    } else {
      kraev('enig', T.valgMangler); kraev('gik_i_staa'); kraev('ord');
      if (erPar()) kraev('sammen');
      kraev('stadig', T.valgMangler); kraev('betale', T.valgMangler); kraev('interview_tid');
    }
    return f;
  }

  var NOEGLER = {
    mini: ['daglig', 'ansvar', 'vaerktoejer', 'vaerktoej_andet', 'beslutter', 'antal', 'deler'],
    foerste: ['formaal', 'uklart'],
    slut: ['sus', 'enig', 'enig_hvorfor', 'gik_i_staa', 'ord', 'sammen', 'stadig', 'stadig_hvorfor', 'betale', 'betale_hvorfor', 'interview_tid'],
  };
  function nyttelast(skema) {
    var s = st.svar[skema], ud = {};
    NOEGLER[skema].forEach(function (k) {
      if (k === 'sammen' && !erPar()) return;
      if (k === 'vaerktoej_andet' && !(Array.isArray(s.vaerktoejer) && s.vaerktoejer.indexOf('andet') >= 0)) return;
      var v = s[k];
      if (typeof v === 'string') v = v.trim().slice(0, MAKS);
      if (k === 'sus') v = susSvar().slice(0, 10);
      if (v !== undefined && v !== null && !(typeof v === 'string' && v === '' && k !== 'uklart')) ud[k] = v;
      if (k === 'uklart' && ud[k] === undefined) ud[k] = '';
    });
    return ud;
  }

  function post(krop) {
    return fetch(API, { method: 'POST', credentials: 'omit', cache: 'no-store', headers: { 'content-type': 'application/json' }, body: JSON.stringify(krop) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, krop: j }; }); })
      .catch(function () { return { status: 0, krop: {} }; });
  }

  function gem(skema) {
    if (st.gemmer || st.lukket) return;
    if (skema === 'slut' && susMangler().length) return;
    st.besked = null; st.kvittering = null;
    st.fejl = valider(skema);
    if (Object.keys(st.fejl).length) { tegn(); return fokusOversigt(); }
    st.gemmer = true; tegn();
    post({ t: st.t, skema: skema, svar: nyttelast(skema), samtykke: true }).then(function (r) {
      st.gemmer = false;
      var fejl = r.krop && r.krop.fejl;
      if (r.status === 200) {
        st.data.udfyldt = st.data.udfyldt || {}; st.data.udfyldt[skema] = true;
        if (skema === 'mini') st.data.samtykke = true;
        st.kvittering = { skema: skema, tid: r.krop.opdateret || null };
        tegn();
        var k = document.getElementById('kvittering'); if (k) k.focus();
        return;
      }
      if (r.status === 404) { st.besked = { slags: 'link' }; st.data = null; return tegn(); }
      if (r.status === 409 || fejl === 'samtykke') { st.besked = { slags: 'samtykke' }; tegn(); return fokusOversigt(); }
      if (r.status === 410 || fejl === 'lukket') { st.lukket = true; tegn(); return; }
      if (r.status === 422 && r.krop && r.krop.felt) { st.fejl = {}; st.fejl[String(r.krop.felt).replace(/^sus.*/, 'sus')] = T.feltAfvist; tegn(); return fokusOversigt(); }
      st.besked = { slags: 'gem' }; tegn(); fokusOversigt();   // intet net, 5xx, 429
    });
  }
  function fokusOversigt() { var o = document.getElementById('oversigt'); if (o) o.focus(); }

  /* ---------- start ---------- */
  window.addEventListener('hashchange', function () {
    var foerT = st.t; laesAdresse();
    st.kvittering = null; st.fejl = {}; st.bekraeftTraek = false; st.slutDel = 1;
    if (st.besked && st.besked.slags !== 'link' && st.besked.slags !== 'hent') st.besked = null;
    if (st.t !== foerT || !st.data) hent(); else { if (st.data) st.miniSide = st.data.samtykke ? 2 : 1; tegn(); window.scrollTo(0, 0); }
  });
  laesAdresse();
  hent();
})();
