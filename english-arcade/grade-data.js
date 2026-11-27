// Site-authored grade steps. MEXT goals are stage-based; these per-grade routes
// are practical estimates and are not official grade-by-grade allocations.
const GRADE_LEVELS=[
 {grade:3,elementary:'小学3年',compulsory:'義務教育学校 第3学年',goal:'身近な単語や音、あいさつ、簡単な受け答えを、絵や音声を使って練習する。'},
 {grade:4,elementary:'小学4年',compulsory:'義務教育学校 第4学年',goal:'身近な話題のあいさつ、簡単な依頼や好みのやりとりに慣れる。'},
 {grade:5,elementary:'小学5年',compulsory:'義務教育学校 第5学年',goal:'聞く・話す活動を広げ、慣れ親しんだ単語や短い表現を読む・書く活動につなげる。'},
 {grade:6,elementary:'小学6年',compulsory:'義務教育学校 第6学年',goal:'短い会話や文章から情報をつかみ、身近なことを短い文や発表で伝える。'},
 {grade:7,elementary:'中学1年',compulsory:'義務教育学校 第7学年',goal:'日常的な話題で4技能を組み合わせ、短い文で自分や身近なことを伝える。'},
 {grade:8,elementary:'中学2年',compulsory:'義務教育学校 第8学年',goal:'情報量を増やした会話や文章を扱い、複数の文で説明し、質問と応答を続ける。'},
 {grade:9,elementary:'中学3年',compulsory:'義務教育学校 第9学年',goal:'身近・社会的な話題の要点をつかみ、考えと理由を会話・発表・短文で伝える。'}
];
const SITE_GRADE_NOTE='各学年の細かな学習順序は、このサイト独自の目安です。学校や教科書によって学ぶ順序は異なります。';
const MEXT_STAGE_NOTE='文部科学省の資料は小3・4、小5・6、中学校という学校段階で目標を示しています。学年ごとの文法項目や単語数を必修として指定するものではありません。';
function questionGrades(game,q){
 const l=q.level;
 if(game==='fighter'||game==='invaders')return ({1:[5,6],2:[6,7],3:[7,8],4:[9]})[l]||[5];
 if(game==='blocks'||game==='jump')return ({1:[7],2:[7,8],3:[8,9],4:[9]})[l]||[7];
 if(game==='maze')return ({1:[3],2:[4,5],3:[5,6],4:[6,7,8,9]})[l]||[3];
 if(game==='quest')return ({1:[4],2:[5,6],3:[6,7],4:[8,9]})[l]||[4];
 return [7];
}
const GAME_SKILL={fighter:'書く',blocks:'読む・書く',jump:'読む・書く',invaders:'読む・書く',maze:'聞く',quest:'話す'};
const GAME_METHOD={fighter:'英単語を入力する',blocks:'単語ブロックを並べる',jump:'英文の空欄を選ぶ',invaders:'文字を選んでつづりを完成する',maze:'音声の指示を聞いて移動する',quest:'会話の場面に合う返答を選ぶ'};
for(const [game,questions] of Object.entries(BANK))for(const q of questions){
 q.grades=questionGrades(game,q);q.grade=q.grades[0];q.skill=GAME_SKILL[game]||'読む';q.problem=q.ja||q.prompt||q.en;q.answerMethod=GAME_METHOD[game]||'選んで答える';q.correctAnswer=q.answer||q.en;q.hint=q.hints?.[0]||'';q.shortExplanation=q.explain||'';
}
function questionComplexity(game,q){if(game==='maze')return q.route.length*2+new Set(q.route).size+(q.en.match(/Then|First|After that|To reach/g)||[]).length*2;if(game==='quest')return q.en.length+(q.level-1)*5;if(game==='fighter'||game==='invaders')return q.en.length;if(game==='blocks'||game==='jump')return (q.tokens?.length||q.en.split(' ').length)*2+(q.level-1)*5;return q.en.length;}
const DIFFICULTIES=['やさしい','ふつう','チャレンジ'];
for(const [game,questions] of Object.entries(BANK))for(const grade of GRADE_LEVELS.map(x=>x.grade)){const pool=questions.filter(q=>q.grades.includes(grade)).sort((a,b)=>questionComplexity(game,a)-questionComplexity(game,b)||a.id.localeCompare(b.id));pool.forEach((q,i)=>{const tier=Math.min(2,Math.floor(i*3/pool.length));(q.difficultyByGrade??={})[grade]=DIFFICULTIES[tier];});}
for(const [game,questions] of Object.entries(BANK))for(const q of questions)q.difficulty=q.difficultyByGrade[q.grade];
function gamesForGrade(g){return Object.keys(titles).filter(k=>BANK[k].some(q=>q.grades.includes(g)));}
function questionsFor(game,g,difficulty,topic=null,review=false){return BANK[game].filter(q=>q.grades.includes(g)&&q.difficultyByGrade[g]===difficulty&&(!topic||q.topic===topic)&&(!review||record.weak[q.id]>0)).map(q=>({...q,grade:g,difficulty}));}
function selectedGradeLabel(g){const row=GRADE_LEVELS.find(x=>x.grade===g)||GRADE_LEVELS[0];return `${row.grade}年生（${row.grade<=6?`小学${row.grade}年`:`中学${row.grade-6}年`}）`;}

// Display labels only; saved difficulty values and question routing stay stable.
function difficultyStars(d){const n=Math.max(1,DIFFICULTIES.indexOf(d)+1);return '★'.repeat(n)+'☆'.repeat(3-n);}
function difficultyLabel(d){return difficultyStars(d)+' '+d;}
