/* Bounded teacher caller. Only existing word IDs/text are used. */
(()=>{
let generation=0,active=null;
function stop(){generation++;const previous=active;active=null;if(previous)previous(false);try{window.speechSynthesis?.cancel()}catch{}}
function parts(word,mode){if(mode==='example'&&word.example)return [{text:word.example,lang:'en-US'}];if(mode==='english')return [{text:word.en,lang:'en-US'}];return [{text:word.en,lang:'en-US'},...(word.ja?[{text:word.ja,lang:'ja-JP'}]:[]),{text:word.en,lang:'en-US'}]}
async function speak(word,mode,rate,onError){
 stop();const own=generation;
 if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){onError?.('音声を再生できません。端末の読み上げ設定を確認してください。');return false}
 for(const part of parts(word,mode)){
  if(own!==generation)return false;
  const ok=await new Promise(resolve=>{let settled=false;const end=value=>{if(settled)return;settled=true;if(active===end)active=null;resolve(value)};active=end;
   try{const u=new window.SpeechSynthesisUtterance(part.text);u.lang=part.lang;u.rate=rate||0.9;const voices=window.speechSynthesis.getVoices?.()||[],voice=voices.find(v=>v.lang?.startsWith(part.lang.slice(0,2)));if(voice)u.voice=voice;u.onend=()=>end(true);u.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))onError?.('音声を再生できませんでした。音量・英語音声設定を確認し、同じ語から再開してください。');end(false)};window.speechSynthesis.speak(u)}catch{onError?.('音声を開始できません。端末の音声設定を確認してください。');end(false)}
  });if(!ok||own!==generation)return false;
 }return true;
}
window.BingoAudio={MAX_CALLS:20,stop,parts,speak,queue:ids=>window.ActivityCore.mix([...new Set(ids)]).slice(0,20)};
})();
