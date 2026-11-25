/* Menu bawah DirmuFX untuk semua halaman */
(function(){
  var I={home:'<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
    sig:'<circle cx="12" cy="12" r="2"/><path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8"/>',
    cal:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'};
  var L=[["index.html#top","home","Beranda"],["index.html#analisa","sig","Signal"],["index.html#kalender","cal","Kalender"],["index.html#fundamental","globe","Fundamental"],["index.html#akun","user","Akun"]];
  var css='.dfxnav{position:fixed;left:0;right:0;bottom:0;z-index:60;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;padding:8px 10px calc(8px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.96);border-top:1px solid #dae6e0;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);font-family:Inter,system-ui,sans-serif}'+
  '.dfxnav a{display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 2px;border-radius:16px;text-decoration:none;font-size:11.5px;font-weight:500;color:#6b7772}'+
  '.dfxnav a:active{background:#dff1e8;color:#17604a}'+
  '.dfxnav svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'+
  'body{padding-bottom:calc(84px + env(safe-area-inset-bottom,0px))!important}';
  function go(){if(document.querySelector(".dfxnav"))return;
    var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
    var n=document.createElement("nav");n.className="dfxnav";n.setAttribute("aria-label","Menu bawah");
    n.innerHTML=L.map(function(x){return '<a href="'+x[0]+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+I[x[1]]+'</svg>'+x[2]+'</a>'}).join("");
    document.body.appendChild(n);
    // geser tombol mengambang (mis. "Catat trade") supaya tidak tertutup menu
    document.querySelectorAll("body *").forEach(function(e){var st=getComputedStyle(e);if(st.position==="fixed"&&e!==n&&!n.contains(e)){var b=parseFloat(st.bottom);if(!isNaN(b)&&b<84&&e.offsetHeight<200&&st.top==="auto")e.style.bottom="calc("+(b+76)+"px + env(safe-area-inset-bottom,0px))"}});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
})();
