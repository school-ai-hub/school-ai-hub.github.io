(() => {
  'use strict';
  const glossary = [["文法", "英語で言葉を並べたり、形を変えたりするときのルール。伝えたいことが相手に分かる文を作るために使います。", "I like soccer. は「だれが → どうする → 何を」の順です。"], ["肯定文", "「〜です」「〜します」など、あることをそのまま伝える文。", "I play tennis.（私はテニスをします。）"], ["否定文", "「〜ではありません」「〜しません」など、そうではないことを伝える文。", "I do not play tennis.（私はテニスをしません。）"], ["疑問文", "相手にたずねる文。英語では、文の最後に ? を付けます。", "Do you play tennis?（あなたはテニスをしますか。）"], ["主語", "文の中で「だれが」「何が」に当たる言葉。", "She likes cats. の She（彼女は）が主語です。"], ["動詞", "「すること」や「状態」を表す言葉。", "play（する）、eat（食べる）、be（〜である）など。"], ["be動詞", "「〜です」「〜にいます」などを表す動詞。主語や、いつのことかによって形が変わります。", "I am happy. / She is happy. / They are happy.（うれしいです。）"], ["一般動詞", "be動詞以外の動詞。「すること」や「状態」などを表します。", "play（する）、like（好きである）、know（知っている）など。"], ["三人称単数", "「私」と「あなた」以外の、1人・1つを表す主語のこと。現在形の肯定文では、一般動詞に s などを付けます。", "He plays tennis.（彼はテニスをします。）否定文では He does not play tennis. と、play に戻します。"], ["三単現", "「三人称・単数・現在」の略。「私」「あなた」以外の1人・1つが主語で、現在形の肯定文では一般動詞に s などを付けます。", "She likes cats.（彼女はネコが好きです。）"], ["原形不定詞", "to を付けずに使う、動詞の基本の形。前に来る動詞などによって、この形を使います。", "Let me try.（私にやらせて。）の try が原形不定詞です。"], ["原形", "動詞の基本の形。s や ed などを付ける前の形です。", "plays → play、went → go。Do you play …? の play は原形です。"], ["命令文", "「〜して」「〜しないで」と相手に伝える文。動詞の原形から始める形などがあります。", "Open the door.（ドアを開けて。）/ Don’t run.（走らないで。）"], ["感嘆文", "驚きや強い気持ちを伝える文。", "What a cute cat!（なんてかわいいネコなんだ！）"], ["名詞", "人・物・場所・考えなどの名前を表す言葉。", "teacher（先生）、book（本）、school（学校）など。"], ["代名詞", "人や物の名前の代わりに使う言葉。", "Ken → he、a book → it など。"], ["人称代名詞", "話している人・相手・それ以外の人や物を表す代名詞。文での役割によって形が変わります。", "I（私は）/ my（私の）/ me（私を・私に）など。"], ["形容詞", "人や物がどんな様子かを表す言葉。", "a big dog（大きな犬）の big、I am happy. の happy など。"], ["副詞", "動きや様子について、「どのように」「いつ」「どのくらい」などを詳しく伝える言葉。", "She runs fast.（彼女は速く走ります。）の fast。"], ["単数", "人や物が1人・1つであること。", "a book（1冊の本）"], ["複数形", "人や物が2人・2つ以上であることを表す名詞などの形。", "book → books。child → children のように形が大きく変わるものもあります。"], ["目的語", "動詞などの後ろで、「何を」「だれを」などに当たる言葉。", "I like music.（私は音楽が好きです。）の music。"], ["補語", "主語や目的語が「何・どんな様子」なのかを説明する言葉。", "She is happy. の happy は、彼女の様子を説明しています。"], ["語順", "言葉を並べる順番。", "I like cats. は I → like → cats の順です。"], ["現在形", "ふだんすることや、今の状態、いつも成り立つことなどを表す形。今この瞬間の動作は、現在進行形で表すことが多いです。", "I play tennis every Sunday.（毎週日曜日にテニスをします。）"], ["過去形", "前に起きたことや、前の状態を表す形。", "I played tennis yesterday.（昨日テニスをしました。）"], ["現在進行形", "今している途中のことなどを表す形。be動詞と「動詞＋ing」を組み合わせます。", "I am reading a book.（私は本を読んでいます。）"], ["過去進行形", "過去のあるときに、している途中だったことを表す形。", "I was reading at eight.（8時に本を読んでいました。）"], ["未来表現", "これからすることや、起こりそうなことを伝える表現。will や be going to などを使います。", "I will call you tomorrow.（明日あなたに電話します。）"], ["現在完了進行形", "過去に始めた動作が、今まで続いていることなどを表す形。have / has been と「動詞＋ing」を使います。", "I have been studying for an hour.（1時間ずっと勉強しています。）"], ["現在完了形", "過去のことと今をつなげて伝える形。経験・続いている状態・終わったことなどを表します。have / has と過去分詞を使います。", "I have visited Kyoto.（京都に行ったことがあります。）"], ["過去分詞", "完了形や受け身などで使う、動詞の形の1つ。", "play → played、write → written、go → gone。"], ["分詞", "動詞からできた形で、名詞を説明したり、進行形・完了形・受け身を作ったりします。現在分詞（〜ing）と過去分詞があります。", "a sleeping cat（眠っているネコ）の sleeping。"], ["助動詞", "動詞と組み合わせて「できる」「〜すべき」などの意味を加える言葉。", "I can swim.（私は泳げます。）の can。"], ["前置詞", "名詞などの前に置いて、場所・時・方向などの関係を表す言葉。", "in the box（箱の中に）/ on Monday（月曜日に）"], ["疑問詞", "「何」「どこ」「いつ」など、知りたいことを表す質問の言葉。", "what（何）、where（どこ）、when（いつ）、who（だれ）、how（どのように）"], ["選択疑問文", "いくつかのものを示して、どれかを選んでもらう質問。", "Do you like tea or coffee?（紅茶とコーヒー、どちらが好きですか。）"], ["接続詞", "言葉や文をつなぐ言葉。", "and（そして）、but（でも）、because（なぜなら）など。"], ["that節", "that で始まる、主語と動詞のある言葉のまとまり。思っていることなどの内容を伝えます。", "I think that he is kind.（彼は親切だと思います。）"], ["比較級", "2つを比べて「もっと〜」と伝える形。", "This bag is bigger than that one.（このバッグはあれより大きいです。）"], ["最上級", "ある範囲で「いちばん〜」と伝える形。", "She is the tallest in our class.（彼女はクラスでいちばん背が高いです。）"], ["不定詞", "to と動詞の原形を組み合わせる形。「〜すること」「〜するために」などを表します。", "I want to swim.（私は泳ぎたいです。）の to swim。"], ["動名詞", "「動詞＋ing」で、「〜すること」を表す形。", "I like swimming.（私は泳ぐことが好きです。）の swimming。"], ["修飾", "ある言葉に、詳しい説明を付け加えること。", "a red bag（赤いバッグ）では、red が bag を詳しく説明しています。"], ["関係代名詞", "人や物について、主語と動詞を使って詳しく説明するときに使う言葉。", "This is a book that I like.（これは私が好きな本です。）"], ["受け身", "主語が「〜される」と伝える形。be動詞と過去分詞を組み合わせます。", "This book is read by many people.（この本は多くの人に読まれています。）"], ["仮定法", "「もし〜だったら」と、現実とは違うことなどを想像して伝える形。", "If I were a bird, I could fly.（もし鳥だったら、飛べるのに。）"], ["文型", "主語・動詞・目的語・補語が、どの順に並ぶかで分けた文の型。", "I like music. は、主語 → 動詞 → 目的語の型です。"], ["第4文型", "主語 → 動詞 → 人など → 物など、の順で伝える文の型。", "I gave her a book.（私は彼女に本をあげました。）"], ["第5文型", "主語 → 動詞 → 目的語 → 補語、の順で伝える文の型。補語は目的語が何・どんな様子かを説明します。", "We call him Ken.（私たちは彼をケンと呼びます。）"], ["間接疑問", "質問したい内容を、別の文の中に入れる形。疑問詞の後ろは、ふつう「主語 → 動詞」の順です。", "I know where he lives.（彼がどこに住んでいるか知っています。）"], ["短縮形", "2つの言葉などを短くまとめた形。省いた部分に ’ を使います。", "I am → I’m、do not → don’t。"], ["フレーズ", "会話などで使う、いくつかの言葉がまとまった表現。", "Thank you.（ありがとう。）/ How are you?（元気ですか。）"], ["アクセント", "単語の中で、特に強く言う部分。", "banana では、真ん中の na を強く言います。"], ["抑揚", "声の高さを上げたり下げたりすること。気持ちや、質問などを伝える助けになります。", "本当に？と驚いて聞くときなどに、声の高さを変えます。"], ["イントネーション", "文やフレーズを話すときの、声の高さの上がり下がり。", "驚いたときや質問するときなど、声の高さで気持ちも伝えられます。"], ["発音", "言葉を声に出すときの音や、その出し方。", "口や舌の位置に気を付けながら、お手本の音をまねします。"], ["即興", "前もって答えを全部決めず、その場で考えて話したりすること。", "相手の「好きな食べ物は？」に、その場で答えてみます。"], ["相づち", "相手の話を聞いていることや、気持ちを短く伝える言葉。", "I see.（なるほど。）/ Really?（本当？）"], ["相槌", "相手の話を聞いていることや、気持ちを短く伝える言葉。", "I see.（なるほど。）/ Really?（本当？）"], ["テンポ", "会話や動作を進める速さや調子。", "相手の話を聞いて、ひとことずつ返す練習をします。"], ["音声認識", "マイクで聞いた声を、文字として読み取る機能。周りの音や話し方によって、違う文字になることがあります。", "話した英語が画面に文字で出ます。"], ["音声入力", "キーボードの代わりに、声を使って言葉を入力すること。", "マイクのボタンを押して、英語を話します。"], ["一致率", "お手本の文字と、読み取られた文字がどれくらい同じかを表す割合。このサイトでは、発音そのものの正確さとは別の目安です。", "100%でも発音のすべてが正しいと決まるわけではありません。"], ["ブラウザー", "ウェブサイトを見るためのアプリ。", "Safari、Chrome、Edge など。"], ["端末", "サイトを見るために使っている機器。", "スマートフォン、タブレット、パソコンなど。"], ["同期", "別々の場所の情報を、同じ内容にそろえること。", "English StepとEnglish Stepで、同じ学習IDを使えるようにします。"], ["タイピング", "キーボードなどで文字を入力すること。", "英語のフレーズを、文字で打って練習します。"], ["コンボ", "ゲームで、成功が続くこと。", "続けて正解すると、連続成功として数えます。"], ["ターン", "会話やゲームで、自分や相手が話したり動いたりする順番。", "相手の話を聞いたら、次は自分が答える番です。"], ["モード", "練習の進め方や種類。", "聞く練習、話す練習、ゲームなどから選べます。"], ["ヒント", "答えを考えるときの手がかり。", "迷ったら、言葉の並べ方や使う表現を確認できます。"]];
  const byTerm = new Map(glossary.map(entry => [entry[0], entry]));
  const terms = [...byTerm.keys()].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(terms.join('|'), 'g');
  const teacherMode = () => location.pathname.replace(/\/$/, '') === '/english-step/teacher' || /^(teacher(?:$|[-/])|lesson-preview$|lesson-planner$|materials$|teach\/|worksheet\/|alt-admin)/.test(location.hash.slice(1));
  const app = document.getElementById('app');
  if (!app) return;
  const launcher = document.createElement('button');
  launcher.type = 'button'; launcher.className = 'word-help-launcher';
  launcher.textContent = '？ ことばの説明'; launcher.setAttribute('aria-haspopup', 'dialog');
  const dialog = document.createElement('dialog');
  dialog.className = 'word-help-dialog';
  dialog.setAttribute('aria-labelledby', 'word-help-title');
  dialog.innerHTML = '<div class="word-help-head"><h2 id="word-help-title">ことばの説明</h2><button type="button" class="word-help-close" aria-label="説明を閉じる">閉じる ×</button></div><div class="word-help-content"></div>';
  const sidebar = document.querySelector('body > aside');
  if (sidebar) sidebar.append(launcher);
  document.body.append(dialog);
  const content = dialog.querySelector('.word-help-content');
  let returnFocus = null;
  const make = (tag, text, className) => { const el = document.createElement(tag); el.textContent = text; if (className) el.className = className; return el; };
  function show(term, origin) {
    if (teacherMode()) return;
    returnFocus = origin || document.activeElement;
    content.replaceChildren();
    if (term && byTerm.has(term)) {
      const entry = byTerm.get(term);
      dialog.querySelector('h2').textContent = entry[0];
      content.append(make('p', entry[1], 'word-help-meaning'), make('h3', 'たとえば'), make('p', entry[2], 'word-help-example'));
      const all = make('button', 'ほかのことばも見る', 'word-help-all'); all.type = 'button';
      all.onclick = () => { show(null, returnFocus); content.querySelector('input').focus(); };
      content.append(all);
    } else {
      dialog.querySelector('h2').textContent = 'ことばの説明';
      content.append(make('p', '点線のある言葉をタップすると、やさしい説明が出ます。ここからも言葉を探せます。'));
      const input = make('input', ''); input.type = 'search'; input.placeholder = 'ことばを探す（例：否定文）'; input.setAttribute('aria-label', '説明することばを検索');
      const list = make('div', '', 'word-help-list'); list.setAttribute('aria-live', 'polite');
      function listWords() { list.replaceChildren(); const found = glossary.filter(e => e[0].includes(input.value.trim())); found.forEach(e => { const button = make('button', e[0]); button.type = 'button'; button.onclick = () => show(e[0], returnFocus); list.append(button); }); if (!found.length) list.append(make('p', 'この言葉の説明はまだありません。別の言葉で探してみてください。')); }
      input.oninput = listWords; content.append(input, list); listWords();
    }
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }
  launcher.onclick = () => show(null, launcher);
  dialog.querySelector('.word-help-close').onclick = () => dialog.close();
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('keydown', e => e.stopPropagation());
  dialog.addEventListener('close', () => { if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true}); });
  function annotate() {
    const teacher = teacherMode();
    launcher.hidden = teacher;
    if (teacher) { launcher.style.setProperty('display', 'none', 'important'); if (dialog.open) dialog.close(); return; }
    launcher.style.removeProperty('display');
    const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT, {acceptNode(node) {
      if (!node.nodeValue.trim() || node.parentElement.closest('a,button,input,textarea,select,option,summary,script,style,code,pre,[contenteditable],.word-help-term,[data-no-word-help]')) return NodeFilter.FILTER_REJECT;
      pattern.lastIndex = 0;
      return pattern.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }});
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    observer.disconnect();
    for (const node of nodes) {
      const fragment = document.createDocumentFragment(); let start = 0; pattern.lastIndex = 0;
      for (const match of node.nodeValue.matchAll(pattern)) {
        fragment.append(document.createTextNode(node.nodeValue.slice(start, match.index)));
        const button = make('button', match[0], 'word-help-term'); button.type = 'button'; button.dataset.wordHelp = match[0];
        button.setAttribute('aria-label', match[0] + 'の意味を読む'); button.setAttribute('aria-haspopup', 'dialog');
        fragment.append(button); start = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(node.nodeValue.slice(start))); node.replaceWith(fragment);
    }
    observer.observe(app, {childList:true, subtree:true, characterData:true});
  }
  app.addEventListener('click', e => { const term = e.target.closest('[data-word-help]'); if (term) { e.preventDefault(); e.stopImmediatePropagation(); show(term.dataset.wordHelp, term); } }, true);
  let queued = false;
  const observer = new MutationObserver(() => { if (!queued) { queued = true; queueMicrotask(() => { queued = false; annotate(); }); } });
  window.addEventListener('hashchange', annotate);
  annotate();
})();
