/* Lanceringen: det ENE sted, der skal udfyldes. Tomme felter viser intet nyt, og "Kommer til ..." bliver stående.
   appStore, googlePlay: butikkernes https-adresser. Knapperne vises, når mindst én er udfyldt.
   webLogin: https-adressen til web-appens login. Web-siden viser login, når den er udfyldt.
   skaermbilleder: sæt til true, når billederne ligger i /skaerme/. */
(function () {
  var LANCERING = {
    appStore: '',
    googlePlay: '',
    webLogin: '',
    skaermbilleder: false
  };

  function gyldig(adresse) { return /^https:\/\//.test(adresse); }
  function alle(vaelger, goer) { Array.prototype.forEach.call(document.querySelectorAll(vaelger), goer); }

  alle('[data-lancering]', function (link) {
    var adresse = LANCERING[link.getAttribute('data-lancering')];
    if (gyldig(adresse)) { link.href = adresse; link.hidden = false; }
  });

  var aaben = {
    butik: gyldig(LANCERING.appStore) || gyldig(LANCERING.googlePlay),
    web: gyldig(LANCERING.webLogin),
    skaerme: LANCERING.skaermbilleder === true
  };
  /* data-foer vises kun før, data-efter kun efter. Værdien er butik, web eller skaerme. */
  alle('[data-foer]', function (el) { el.hidden = aaben[el.getAttribute('data-foer')]; });
  alle('[data-efter]', function (el) { el.hidden = !aaben[el.getAttribute('data-efter')]; });
})();
