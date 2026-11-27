/* Pages edition: no backend, no credentials, no remote record writes. */
(function(){
window.ENGLISH_STEP_PAGES=true;
try{for(const key of ['english-step-session','english-talk-learner-token-v1','english-talk-learner-code-v1'])sessionStorage.removeItem(key)}catch{}
const nativeFetch=window.fetch.bind(window);
window.fetch=function(input,options){const url=new URL(typeof input==='string'?input:input.url,location.href);if(url.origin===location.origin&&/^\/english-step\/api(?:\/|$)/.test(url.pathname))return Promise.resolve(new Response(JSON.stringify({error:'GitHub Pages版では、先生用ログイン・記録共有・オンライン対戦は利用できません。端末内の個人練習をご利用ください。'}),{status:503,headers:{'Content-Type':'application/json'}}));return nativeFetch(input,options)};
})();
