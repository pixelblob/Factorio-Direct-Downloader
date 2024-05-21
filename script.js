// ==UserScript==
// @name         Factorio Direct Downloader
// @namespace    http://tampermonkey.net/
// @version      2024-01-10
// @description  try to take over the world!
// @author       Pixelblob
// @match        https://mods.factorio.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=factorio.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var mods = Array.from(document.querySelectorAll("a")).filter(a=>a.href).filter(a=>new URL(a.href).searchParams.get("next")?.startsWith?.("/mod/"))

    mods.forEach(async mod=>{
        if (!mod.href) return
        var modName = new URL(mod.href).searchParams.get("next").split("/").at(-1)
        mod.removeAttribute("href")
        //let data = await (await fetch("https://mods.factorio.com/api/mods/"+modName)).json()
        //var version = data.releases.at(-1).version
        //var downloadLink = `https://mods-storage.re146.dev/${modName}/${version}.zip`
        //console.log(downloadLink)
        //mod.href=downloadLink

        mod.onclick=function() {
            getModDownloadLink(modName).then(downloadLink=>{
                mod.onclick=null
                mod.href=downloadLink
                window.open(downloadLink, '_blank')
                //mod.click()
            })
            return false
        }

    })

    async function getModDownloadLink(modName) {
        let data = await (await fetch("https://mods.factorio.com/api/mods/"+modName)).json()
        var version = data.releases.at(-1).version
        var downloadLink = `https://mods-storage.re146.dev/${modName}/${version}.zip`
        return downloadLink
    }
    // Your code here...
})();
