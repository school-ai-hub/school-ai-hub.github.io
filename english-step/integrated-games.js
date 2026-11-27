(function(){
const previous=window.renderUnifiedRoute;
window.renderUnifiedRoute=function(hash){
 document.body.classList.remove('integrated-game-mode');
 if(!['arcade','link'].includes(hash))return previous?.(hash);
 previous?.('__platform_cleanup');
 document.body.classList.add('integrated-game-mode');
 document.querySelectorAll('aside nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+hash));
 const name=hash==='arcade'?'English Arcade':'English Link';
 document.getElementById('app').innerHTML='<section class="integrated-game"><iframe title="'+name+'" src="/english-step/games/'+hash+(hash==='arcade'?'/index.html':'')+'" allow="microphone; autoplay; fullscreen" allowfullscreen></iframe></section>';
 return true;
};
const style=document.createElement('style');style.textContent=`
body.integrated-game-mode>.shell{height:100dvh;min-height:0;padding:0!important;overflow:hidden}
body.integrated-game-mode>.shell>main#app{display:flex;max-width:none!important;width:100%;height:100%;min-height:0!important;padding:0!important;margin:0;box-sizing:border-box;overflow:hidden}
.integrated-game{display:flex;flex:1;min-width:0;min-height:0;height:100%;margin:0;padding:0}
body.integrated-game-mode .integrated-game iframe{display:block;flex:1;width:100%;height:100%!important;min-height:0;border:0;border-radius:0;background:white}
@media(max-width:760px){body.integrated-game-mode>.shell{height:max(320px,calc(100dvh - var(--step-mobile-sidebar-height,220px)))}}
`;document.head.appendChild(style);
const sidebar=document.querySelector('body>aside');
if(sidebar&&typeof ResizeObserver!=='undefined')new ResizeObserver(()=>document.documentElement.style.setProperty('--step-mobile-sidebar-height',sidebar.getBoundingClientRect().height+'px')).observe(sidebar);
})();
