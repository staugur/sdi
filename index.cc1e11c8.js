fetch("https://open.saintic.com/api/configcenter/sdi.json").then(t=>t.json()).then(t=>{if(console.debug(t),"[object Object]"===Object.prototype.toString.call(t)&&!0===t.success){let e=t.data,n=e.title,o=e.about_url,c=e.beian_text;""!=n&&(document.title=n),""!=o&&(document.getElementById("about_button").href=o),""!=c&&(document.getElementById("beian_link").text=c)}});
//# sourceMappingURL=index.cc1e11c8.js.map
