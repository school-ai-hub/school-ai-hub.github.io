/* Preserve each activity's real controls and draft nodes while fitting pages to the screen. */
(()=>{'use strict';
const app=document.getElementById('app');if(!app)return;
let state=null,queued=false,dirty=false,observer;
const expanded=()=>document.body.classList.contains('learning-fullscreen');
function pairs(scroll){
 const parents=new Set([...scroll.querySelectorAll('.dialog')].filter(n=>!n.closest('details,.talk-pair')).map(n=>n.parentElement));
 for(const parent of parents){const lines=[...parent.children].filter(n=>n.classList.contains('dialog'));for(let i=0;i<lines.length;i+=2){const pair=document.createElement('div');pair.className='talk-pair';parent.insertBefore(pair,lines[i]);for(const line of lines.slice(i,i+2))pair.appendChild(line);}}
}
function restore(){if(!state)return;const {source,viewport,original}=state;for(const node of original)source.insertBefore(node,viewport);viewport.remove();const nav=state.box.querySelector('.stage-controls');if(nav){for(const b of nav.querySelectorAll('[data-curr="open"]'))b.disabled=Number(b.dataset.stage)<0||Number(b.dataset.stage)>8;const count=nav.querySelector('span');if(count?.dataset.step)count.textContent=count.dataset.step;}state=null;}
function controls(){if(!state)return;const {box,pages,index}=state,nav=box.querySelector('.stage-controls');if(!nav)return;
 const prev=nav.querySelector('[data-curr="open"]'),next=nav.querySelector('[data-curr="open"]:last-child'),counter=nav.querySelector('span');
 if(prev)prev.disabled=index===0&&Number(prev.dataset.stage)<0;
 if(next)next.disabled=index===pages.length-1&&Number(next.dataset.stage)>8;
 if(counter){if(!counter.dataset.step)counter.dataset.step=counter.textContent;counter.textContent=counter.dataset.step+(pages.length>1?' · '+(index+1)+' / '+pages.length+' ページ':'');}
}
function display(index){if(!state)return;state.index=Math.max(0,Math.min(state.pages.length-1,index));state.pages.forEach((p,i)=>{p.hidden=i!==state.index});state.scroll.scrollTop=0;controls();}
function paginate(box,scroll){
 const source=scroll.querySelector('.stage-content')||scroll.querySelector('.lesson-body')||scroll;
 const original=[...source.childNodes].filter(n=>!(n.nodeType===1&&n.id==='status'));
 if(!original.length)return;
 for(const node of original)node.remove();const viewport=document.createElement('div');viewport.className='talk-page-viewport';const heading=original.find(n=>n.nodeType===1&&n.tagName==='H2');if(heading)source.appendChild(heading);source.appendChild(viewport);
 const pages=[];let page;
 const add=()=>{page=document.createElement('div');page.className='talk-screen-page';viewport.appendChild(page);pages.push(page);};add();
 for(const node of original){if(node===heading||node.nodeType===3&&!node.textContent.trim())continue;if(node.nodeType===1&&node.classList.contains('talk-pair')&&page.querySelector('.talk-pair'))add();page.appendChild(node);if(page.children.length>1&&page.scrollHeight>viewport.clientHeight+2){page.removeChild(node);add();page.appendChild(node);}}
 // A long single question/fieldset remains intact; scale that page alone, never drop text.
 for(const p of pages){const available=viewport.clientHeight;if(available>0&&p.scrollHeight>available+2){const ratio=Math.min(1,available/p.scrollHeight);p.style.transform='scale('+ratio+')';p.style.transformOrigin='top left';}}
 state={box,scroll,source,original,viewport,pages,index:0,width:innerWidth,height:innerHeight};display(0);
}
function layout(){queued=false;observer.disconnect();try{
 const box=document.querySelector('#slidebox.curriculum-stage'),scroll=box?.querySelector('.stage-scroll');let previousPage=state?.scroll===scroll?state.index:0;
 if(state&&(!expanded()||state.scroll!==scroll||state.width!==innerWidth||state.height!==innerHeight||dirty)){restore();}
 if(!scroll)return;pairs(scroll);if(expanded()&&!state){paginate(box,scroll);display(previousPage);}dirty=false;
}finally{observer.observe(app,{childList:true,subtree:true});}}
function queue(){if(!queued){queued=true;requestAnimationFrame(layout);}}
observer=new MutationObserver(()=>{dirty=true;queue();});observer.observe(app,{childList:true,subtree:true});
new MutationObserver(queue).observe(document.body,{attributes:true,attributeFilter:['class']});
document.addEventListener('toggle',()=>{dirty=true;queue();},true);window.addEventListener('resize',queue);window.addEventListener('hashchange',queue);document.addEventListener('fullscreenchange',queue);
document.addEventListener('click',e=>{const b=e.target.closest('.stage-controls [data-curr="open"]');if(!state||!expanded()||!b||b.disabled)return;const direction=Number(b.dataset.stage)>Number(session?.stage??0)?1:-1;if(direction>0&&state.index<state.pages.length-1||direction<0&&state.index>0){e.preventDefault();e.stopImmediatePropagation();display(state.index+direction);}},true);
queue();
})();
