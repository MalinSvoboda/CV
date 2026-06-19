/* DE/EN language toggle — swaps every [data-de][data-en] node,
   updates <html lang>, the toggle label, and persists the choice. */
(function () {
  "use strict";

  var KEY = "cv-lang";

  function setLang(lang) {
    if (lang !== "de" && lang !== "en") lang = "de";

    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll("[data-de][data-en]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = nodes[i].dataset[lang];
    }

    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.textContent = lang === "de" ? "EN" : "DE";
      btn.setAttribute(
        "aria-label",
        lang === "de" ? "Switch to English" : "Auf Deutsch umschalten"
      );
    }

    try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
  }

  function init() {
    var saved;
    try { saved = localStorage.getItem(KEY); } catch (e) { saved = null; }
    setLang(saved || "de");

    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        setLang(document.documentElement.lang === "de" ? "en" : "de");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* Email obfuscation — the address is assembled at runtime from fragments,
   so no harvestable "user@domain" string exists in the HTML or this file.
   No-JS visitors see the readable "(at)/(dot)" fallback in the markup. */
(function () {
  "use strict";

  function reveal() {
    var user = "malin" + "." + "svoboda";
    var domain = "gmail" + "." + "com";
    var addr = user + "@" + domain;
    var links = document.querySelectorAll("a.js-email");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", "mailto:" + addr);
      links[i].setAttribute("aria-label", "E-Mail an " + addr);
      links[i].textContent = addr;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", reveal);
  } else {
    reveal();
  }
})();
