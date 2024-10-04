// ==UserScript==
// @name         Display Event Info Popup
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Affiche les informations de l'événement stockées dans le local storage dans une pop-up modifiable après avoir cliqué sur un bouton
// @author       Votre Nom
// @match        test/test/test/* 
// @grant        none
// ==/UserScript==
//https://feverup.com/purchase/139634/0af17ad4-5ff8-4e29-b578-38525453d633
(function() {
    'use strict';

    // Ajouter le script distant
    const script = document.createElement('script');
    script.src = 'https://igorpotard.github.io/onepark_display.js?v=' + new Date().getTime(); //JPP c'est juste pour force l'actualisation
    script.type = 'module';
    document.head.appendChild(script);
})();
