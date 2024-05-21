// ==UserScript==
// @name         Factorio Direct Downloader
// @namespace    http://tampermonkey.net/
// @version      2024-01-10
// @description  try to take over the world!
// @author       Pixelblob
// @match        https://mods.factorio.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=re146.dev/factorio/mods
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const buttons = document.getElementsByClassName('button-green');
    for (const button of buttons) {
        if (button.innerText.trim() !== 'Download') {
            continue;
        }
        var modName = new URL(button.href).searchParams.get("next").split("/")[2]
        console.log(button)
        //if (!button.getAttribute('href').startsWith('/login?next=')) {
        //    continue;
        //}
        if (button.parentElement.tagName === 'DIV') {
            //button.innerText = 'Download from re146.dev';
            button.setAttribute('target', '_blank');
            button.setAttribute('href', `https://pixelboop.net/factorio/${modName}`);
        } else if (button.parentElement.tagName === 'TD') {
            //button.innerText = 'Download from re146.dev';
            button.setAttribute('target', '_blank');
            const version = button.parentElement.parentElement.children[0].innerText;
            button.setAttribute('href', `https://mods-storage.re146.dev/${modName}/${version}.zip`);
        }
    }
})();
