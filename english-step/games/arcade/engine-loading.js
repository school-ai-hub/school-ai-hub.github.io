'use strict';
// Keep game state paused and old/new renderers covered until the first ready frame.
const EngineLoading=(()=>{
function asset(file){return 'assets/'+file+((/\.png$/.test(file)||/^adventure-(town|forest|cave)-v2\.webp$/.test(file))?'?rev=world4':'?rev=20261015-expedition3');}
function begin(owner,options){let pending=true;const wasPaused=!!options.getPaused();const nodes=(options.controls||[]).filter(Boolean).map(n=>({node:n,inert:!!n.inert,disabled:'disabled' in n?n.disabled:null}));const panel=document.createElement('div');panel.className='engine-loading-panel';panel.setAttribute('role','status');panel.setAttribute('aria-live','polite');const title=document.createElement('b');title.textContent='ゲームの準備中…';const caption=document.createElement('span');caption.textContent='画像を読み込んでいます';const progress=document.createElement('progress');progress.max=1;progress.value=0;progress.setAttribute('aria-label','画像の読み込み');panel.append(title,caption,progress);owner.append(panel);owner.classList.add('engine-is-loading');options.release?.();options.setPaused(true);nodes.forEach(({node})=>{node.inert=true;if('disabled' in node)node.disabled=true;});
function finish(resume){if(!pending)return;pending=false;owner.classList.remove('engine-is-loading');panel.remove();nodes.forEach(({node,inert,disabled})=>{node.inert=inert;if(disabled!==null)node.disabled=disabled;});options.release?.();options.setPaused(resume&&options.canResume?.()!==false?wasPaused:true);if(resume)options.ready?.();}
return {get pending(){return pending},progress(value){if(!pending)return;const p=Math.max(0,Math.min(1,value||0));progress.value=p;caption.textContent=Math.round(p*100)+'% 読み込み';},done(){finish(true)},cancel(){finish(false)}};}
function afterFrame(sc,gate){if(!gate?.pending)return;const events=sc.game?.events;if(events?.once)events.once('postrender',()=>gate.done());else gate.done();}
return {asset,begin,afterFrame};
})();
