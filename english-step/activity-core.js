/* Shared warm-up primitives. Words and learner memory remain owned by English Step. */
(()=>{
const normalize=s=>String(s??'').trim().toLowerCase();
const unique=words=>{const ids=new Set(),texts=new Set();return words.filter(w=>w?.id&&w.en&&!ids.has(w.id)&&!texts.has(normalize(w.en))&&(ids.add(w.id),texts.add(normalize(w.en)),true))};
const mix=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const hint=(text,n)=>{let count=0;const letters=[...text].filter(c=>!/\s/.test(c)).length;return [...text].map(c=>/\s/.test(c)?c:(++count<=Math.min(n,letters-1)?c:'_')).join(' ')};
const lines=[...Array.from({length:5},(_,r)=>Array.from({length:5},(_,c)=>r*5+c)),...Array.from({length:5},(_,c)=>Array.from({length:5},(_,r)=>r*5+c)),[0,6,12,18,24],[4,8,12,16,20]];
window.StartActivities=[{id:'listening-bingo',name:'リスニングBINGO',description:'聞こえた英単語を見つけて、BINGOを目指そう。',duration:'10〜13分',skills:['意味','つづり','発音','リスニング'],icon:'grid',enabled:true,route:'#activity/listening-bingo',minimumWords:24,recommendedWords:30}];
window.ActivityCore={uuid:()=>typeof crypto.randomUUID==='function'?crypto.randomUUID():'10000000-1000-4000-8000-100000000000'.replace(/[018]/g,c=>(Number(c)^crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(c)/4).toString(16)),normalize,unique,mix,hint,lines,lineIds:opened=>lines.map((l,i)=>l.every(x=>opened.includes(x))?i:-1).filter(x=>x>=0),words:()=>window.ENGLISH_VOCABULARY.categories.flatMap(c=>c.words.map(w=>({...w,category:c.id}))),weak:m=>!!(m.incorrectCount||m.hintCount||m.slowCount||m.audioReplayCount>=3||m.skipCount)};
})();
