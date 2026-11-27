(function(){
const base='/english-step/',isTalk=location.pathname.includes('/talk/');
const about=()=>'<p class="eyebrow">GITHUB PAGES EDITION</p><h1>この端末で、英語を学ぶ。</h1><section class="card pages-about"><h2>使える機能</h2><p>教科書別の教材選択、文法・単語・英会話の個人練習、Reading・Project、Listening BINGO、English Arcade。</p><h2>保存について</h2><p>個人練習の記録は、この端末・ブラウザーだけに保存します。ブラウザーのデータを削除すると記録も消えます。Sites版の生徒IDや保存済みの授業・記録は引き継がれません。</p><h2>この版に含まれない機能</h2><p>先生用ログイン・生徒ID発行・学級の授業進行の同期・先生への回答送信・ALT共有・オンライン対戦。成績や氏名などの個人情報を入力しないでください。</p><p>音声認識は、ブラウザーの提供元へ音声が送信される場合があります。許可する前に学校の方針を確認してください。</p><a class="btn" href="'+base+'#classroom">教材を選ぶ</a> <a class="btn" href="'+base+'#records">この端末の記録</a></section>';
const app=()=>document.getElementById('app');
const restricted=/^(teacher(?:$|[-/])|textbook-teacher|lesson-planner|lesson-ready(?:$|\/)|live(?:$|\/)|teach(?:$|\/)|worksheet(?:$|\/)|alt(?:$|[-/])|class-record(?:$|\/)|teacher-class-record(?:$|\/)|lesson-records$|today$|student-lessons$|link$|pages-about$)/;
if(!isTalk){const previous=window.renderUnifiedRoute;window.renderUnifiedRoute=function(hash){
if(restricted.test(hash)){previous?.('__pages_cleanup');document.body.classList.remove('integrated-game-mode','lp-mode','lp-presenting');app().innerHTML=about();return true}
return previous?.(hash)};
}
function polish(){
 document.querySelectorAll('a[href]').forEach(a=>{const h=a.getAttribute('href');if(h===base+'teacher'||h==='/teacher')a.setAttribute('href',base+'#pages-about');if(h?.includes('#alt-records'))a.remove()});
 document.querySelectorAll('.records-legacy-link').forEach(a=>a.remove());
 if(isTalk){const panel=document.getElementById('learner-panel');if(panel)panel.remove();if((location.hash.startsWith('#teacher')||location.hash==='#pages-about')&&!app().querySelector('.pages-about'))app().innerHTML=about()}
}
const observer=new MutationObserver(polish);observer.observe(app(),{childList:true,subtree:true});
window.addEventListener('hashchange',polish);polish();if(!isTalk&&typeof route==='function')route();
})();
