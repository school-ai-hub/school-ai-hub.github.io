// Content expansion v2: existing question IDs are unchanged for saved review records.
const EXTRA_WORDS=[
`blackboard:黒板,eraser:消しゴム,ruler:定規,crayon:クレヨン,notebook:ノート,clock:時計,fridge:冷蔵庫,bed:ベッド,table:テーブル,sofa:ソファ,mirror:鏡,towel:タオル,soap:石けん,cup:カップ,plate:皿,spoon:スプーン,fork:フォーク,knife:ナイフ,hat:帽子,cap:つばのある帽子,shirt:シャツ,coat:コート,jacket:ジャケット,sock:靴下,shoe:靴,skirt:スカート,dress:ワンピース,panda:パンダ,monkey:サル,giraffe:キリン,zebra:シマウマ,turtle:カメ,frog:カエル,duck:アヒル,sheep:ヒツジ,goat:ヤギ,mouse:ネズミ,arm:腕,leg:脚,knee:膝,finger:手の指,toe:足の指,tooth:歯,hair:髪の毛,face:顔,chin:あご,brown:茶色の,pink:ピンク色の,purple:紫色の,gray:灰色の,ball:ボール,doll:人形,toy:おもちゃ,kite:たこ（空に揚げるもの）,robot:ロボット`,
`open:開ける,close:閉める,sit:座る,stand:立つ,jump:跳ぶ,sleep:眠る,wake:目を覚ます,wash:洗う,brush:磨く,draw:描く,paint:絵の具で描く,push:押す,smile:ほほ笑む,laugh:笑う,cry:泣く,wait:待つ,meet:会う,ask:尋ねる,answer:答える,call:電話をかける,use:使う,put:置く,take:持っていく,give:与える,make:作る,find:見つける,lose:なくす,keep:保つ,need:必要とする,want:欲しいと思う,try:試す,turn:曲がる,stop:止まる,start:始める,show:見せる,tell:伝える,send:送る,check:確認する,pull:引く,cut:切る,cheap:安い,expensive:値段が高い,strong:強い,weak:弱い,fast:速い,slow:遅い,young:若い,quiet:静かな,noisy:騒がしい,heavy:重い,light:軽い,early:早い,late:遅い,thirsty:のどが渇いた,hungry:空腹の`,
`bridge:橋,tower:塔,castle:城,temple:寺,church:教会,bank:銀行,store:店,shop:店,market:市場,factory:工場,office:事務所,postcard:はがき,envelope:封筒,stamp:切手,ticket:切符,passport:旅券,luggage:手荷物,suitcase:スーツケース,map:地図,guide:案内人,passenger:乗客,driver:運転手,pilot:操縦士,dentist:歯科医,nurse:看護師,engineer:技術者,farmer:農家の人,artist:芸術家,scientist:科学者,neighbor:近所の人,cousin:いとこ,relative:親戚,guest:客,customer:顧客,member:会員,team:チーム,club:クラブ,festival:祭り,concert:コンサート,competition:競技大会,journey:旅,trip:旅行,traffic:交通,entrance:入口,exit:出口,direction:方向,distance:距離,address:住所,schedule:予定表,reservation:予約,appointment:面会の約束,medicine:薬,fever:発熱,headache:頭痛,symptom:症状`,
`knowledge:知識,ability:能力,skill:技能,effort:努力,progress:進歩,achievement:達成,confidence:自信,curiosity:好奇心,creativity:創造性,imagination:想像力,responsibility:責任,respect:尊重,trust:信頼,friendship:友情,relationship:関係,cooperation:協力,discussion:話し合い,conversation:会話,expression:表現,pronunciation:発音,grammar:文法,vocabulary:語彙,meaning:意味,attention:注意,choice:選択,decision:決定,evidence:証拠,advantage:利点,disadvantage:欠点,quality:質,value:価値,benefit:恩恵,resource:資源,climate:気候,disaster:災害,earthquake:地震,population:人口,equality:平等,diversity:多様性,privacy:プライバシー,security:安全性,website:ウェブサイト,password:パスワード,device:機器,network:ネットワーク,software:ソフトウェア,database:データベース,download:ダウンロードする,upload:アップロードする,connect:接続する,solve:解決する,support:支援する,reduce:減らす,reuse:再使用する,prevent:防ぐ`
];
const NEW_WORD_TOPICS=['身の回り・体・生き物','動作・状態・気持ち','旅行・仕事・地域','学習・社会・デジタル'];
EXTRA_WORDS.forEach((list,l)=>{const existing=new Set(BANK.fighter.map(q=>q.en.toLowerCase()));const parsed=list.split(',').map(item=>item.split(':')).filter(([en])=>!existing.has(en.toLowerCase()));if(parsed.length!==55)throw Error('New vocabulary count: level '+(l+1)+' = '+parsed.length);parsed.forEach(([en,ja],i)=>{const answers=[en];if(en==='gray')answers.push('grey');BANK.fighter.push({id:`wv2-${l}-${i}`,level:l+1,topic:NEW_WORD_TOPICS[l],en,ja,answers,hints:[`「${ja}」を表す英単語。${en.length}文字です。`,`最初は ${en[0]}、最後は ${en.at(-1)}。`,en.slice(0,Math.ceil(en.length/2))+'_'.repeat(Math.floor(en.length/2))],explain:`${en} は「${ja}」。${NEW_WORD_TOPICS[l]}の言葉として、意味とつづりを一緒に覚えよう。`});});});
BANK.invaders.push(...BANK.fighter.filter(q=>q.id.startsWith('wv2-')).map(q=>({...q,id:'i-'+q.id})));
// [sentence, translation, topic, target token, distractors, teaching point]
const NEW_SENTENCES=[
[
['{n} is hungry.','{j}はおなかがすいています。','be動詞','is',['are','am'],'1人の名前には is。hungry は「おなかがすいた」です。'],
['{n} is a good singer.','{j}は歌が上手です。','be動詞','a',['an','are'],'good は子音の音で始まるので、その前には a を使います。'],
['{n} is not busy.','{j}は忙しくありません。','否定文','not',['no','none'],'is not の形で「〜ではない」を表します。'],
['Is {n} your brother?','{j}はあなたの兄弟ですか。','疑問文','Is',['Are','Am'],'be動詞を主語の前に出すと質問になります。'],
['{n} can draw a cat.','{j}は猫の絵を描けます。','助動詞','draw',['draws','drew'],'can の後は動詞のもとの形 draw です。'],
['{n} can ride a bike.','{j}は自転車に乗れます。','助動詞','ride',['rides','rode'],'ride a bike は「自転車に乗る」。can の後は ride。'],
['{n} cannot speak French.','{j}はフランス語を話せません。','助動詞','speak',['speaks','spoke'],'cannot は「できない」。その後は speak の形です。'],
['{n} likes strawberries.','{j}はいちごが好きです。','一般動詞','likes',['like','liking'],'1人の名前が主語なので likes。strawberry の複数形は strawberries。'],
['{n} helps a friend.','{j}は友達を手伝います。','一般動詞','helps',['help','helping'],'主語が1人の名前なので help に s を付けます。'],
['{n} uses a computer.','{j}はコンピューターを使います。','一般動詞','uses',['use','using'],'use は「使う」。主語が1人なので uses です。'],
['{n} watches birds.','{j}は鳥を観察します。','一般動詞','watches',['watch','watching'],'watch のように ch で終わる動詞には es を付けます。'],
['{n} washes a cup.','{j}はカップを洗います。','一般動詞','washes',['wash','washing'],'wash のように sh で終わる動詞には es を付けます。'],
['{n} has two sisters.','{j}には姉妹が2人います。','一般動詞','has',['have','having'],'have は1人の名前が主語のとき has になります。'],
['{n} is in the classroom.','{j}は教室の中にいます。','場所','in',['to','from'],'in the classroom で「教室の中に」です。'],
['{n} is under the tree.','{j}はその木の下にいます。','場所','under',['above','behind'],'under は「〜の下に」。above は上、behind は後ろです。'],
['{n} plays basketball after school.','{j}は放課後にバスケットボールをします。','日常表現','after',['before','during'],'after school は「放課後に」。before は前、during は〜の間。']
],
[
['{n} does not eat meat.','{j}は肉を食べません。','否定文','eat',['eats','ate'],'does not の後は動詞のもとの形 eat です。'],
['Does {n} have a bicycle?','{j}は自転車を持っていますか。','疑問文','have',['has','had'],'Does のある質問では have に s を付けません。'],
['{n} is drawing a picture.','{j}は絵を描いているところです。','進行形','drawing',['draw','draws'],'is drawing で「今描いている」を表します。'],
['{n} is making lunch.','{j}は昼食を作っているところです。','進行形','making',['make','makes'],'make は最後の e を取って making にします。'],
['{n} is running in the park.','{j}は公園を走っているところです。','進行形','running',['run','runs'],'run の ing 形は n を重ねて running です。'],
['{n} is not sleeping.','{j}は眠っていません。','進行形','sleeping',['sleep','sleeps'],'is not sleeping で「今眠っていない」です。'],
['{n} visited Osaka last week.','{j}は先週大阪を訪れました。','過去形','visited',['visit','visits'],'last week は「先週」。過去のことなので visited。'],
['{n} ate an apple yesterday.','{j}は昨日りんごを1つ食べました。','過去形','ate',['eat','eats'],'eat の過去形は ate です。'],
['{n} saw a rabbit yesterday.','{j}は昨日ウサギを見ました。','過去形','saw',['see','sees'],'see の過去形は saw です。'],
['{n} took a picture yesterday.','{j}は昨日写真を撮りました。','過去形','took',['take','takes'],'take a picture は「写真を撮る」。過去形は took。'],
['{n} had a cold last week.','{j}は先週風邪をひいていました。','過去形','had',['have','has'],'have a cold は「風邪をひいている」。過去形は had。'],
['{n} was at the station yesterday.','{j}は昨日駅にいました。','過去形','was',['were','is'],'1人の名前を主語にした過去の be動詞は was です。'],
['{n} will call me tomorrow.','{j}は明日私に電話するでしょう。','未来','call',['calls','called'],'will の後は動詞のもとの形 call です。'],
['{n} will not be late.','{j}は遅刻しないでしょう。','未来','be',['is','was'],'will not の後も be の形を使います。'],
['{n} always brushes their teeth.','{j}はいつも自分の歯を磨きます。','日常表現','brushes',['brush','brushing'],'brush には es を付けます。teeth は tooth の複数形。'],
['{n} goes to school by bus.','{j}はバスで学校へ行きます。','日常表現','by',['on','at'],'交通手段は by bus。「そのバスに乗って」は on the bus。']
],
[
['{n} is younger than my sister.','{j}は私の姉妹より年下です。','比較','younger',['young','youngest'],'younger than は「〜より年下」です。'],
['{n} swims faster than I do.','{j}は私より速く泳ぎます。','比較','faster',['fast','fastest'],'2人の泳ぐ速さを比べるので faster than を使います。'],
['{n} is the youngest in the family.','{j}は家族の中で最も年下です。','比較','youngest',['young','younger'],'the youngest で「最も年下」を表します。'],
['{n} is as busy as I am.','{j}は私と同じくらい忙しいです。','比較','busy',['busier','busiest'],'as と as の間は busy のようなもとの形です。'],
['{n} should drink some water.','{j}は水を飲んだほうがよいです。','助動詞','drink',['drinks','drank'],'should の後は動詞のもとの形 drink です。'],
['{n} must not touch this machine.','{j}はこの機械に触れてはいけません。','助動詞','not',['no','none'],'must not は「〜してはいけない」という禁止です。'],
['{n} does not have to hurry.','{j}は急ぐ必要はありません。','助動詞','have',['has','had'],'does not have to は「〜する必要はない」です。'],
['{n} was cooking dinner then.','{j}はそのとき夕食を作っていました。','過去進行形','cooking',['cook','cooks'],'was cooking は過去のある時点で進行中の動作です。'],
['{n} did not bring a notebook.','{j}はノートを持ってきませんでした。','過去形','bring',['brought','brings'],'did not の後は過去形 brought ではなく bring です。'],
['Did {n} write this letter?','{j}はこの手紙を書きましたか。','疑問文','write',['wrote','writes'],'Did のある質問では write のもとの形を使います。'],
['{n} is going to visit a friend.','{j}は友達を訪ねる予定です。','未来','visit',['visits','visited'],'is going to の後は動詞のもとの形 visit です。'],
['{n} smiled because the story was funny.','その話がおもしろかったので{j}はほほ笑みました。','接続詞','because',['before','until'],'because の後に、ほほ笑んだ理由を続けます。'],
['{n} called me when the train arrived.','電車が着いたとき{j}は私に電話しました。','接続詞','when',['because','if'],'when は「〜したとき」。理由や条件との違いに注目。'],
['{n} thinks that this book is useful.','{j}はこの本が役に立つと思っています。','接続詞','that',['what','who'],'that の後に「思っている内容」を文で続けます。'],
['{n} showed me a beautiful picture.','{j}は私にきれいな絵を見せました。','文構造','showed',['show','showing'],'showed は show の過去形。人→ものの順に置けます。'],
['{n} became a doctor last year.','{j}は去年医師になりました。','文構造','became',['become','becomes'],'become は「〜になる」。過去形は became です。']
],
[
['{n} hopes to visit Canada.','{j}はカナダを訪れたいと思っています。','不定詞','to',['for','at'],'hope to と動詞で「〜することを望む」です。'],
['{n} decided to join the team.','{j}はそのチームに入ることを決めました。','不定詞','to',['for','of'],'decide to と動詞で「〜することを決める」です。'],
['{n} has something to drink.','{j}には飲むものがあります。','不定詞','to',['for','with'],'something to drink は「飲むもの」。to drink が something を説明。'],
['{n} went outside to take pictures.','{j}は写真を撮るために外へ出ました。','不定詞','to',['of','at'],'to take pictures は外へ出た目的を表します。'],
['{n} is good at drawing pictures.','{j}は絵を描くのが得意です。','動名詞','drawing',['draw','to draw'],'前置詞 at の後で動作を名詞として表すので drawing。'],
['{n} practices speaking English every day.','{j}は毎日英語を話す練習をします。','動名詞','speaking',['speak','to speak'],'practice の後は speaking のような ing 形です。'],
['{n} stopped talking during the movie.','{j}は映画の間、話すのをやめました。','動名詞','talking',['talk','talks'],'stop talking は「話すのをやめる」です。'],
['{n} was chosen as the captain.','{j}はキャプテンに選ばれました。','受け身','chosen',['choose','chose'],'was と過去分詞 chosen で「選ばれた」です。'],
['{n} was surprised by the news.','{j}はその知らせに驚きました。','受け身','surprised',['surprise','surprising'],'was surprised by は「〜に驚いた」。surprising は驚きを与える側。'],
['{n} has just arrived at the station.','{j}はたった今駅に着いたところです。','現在完了','arrived',['arrive','arriving'],'has just arrived で「たった今着いた」という完了です。'],
['{n} has known my brother for years.','{j}は私の兄弟を何年も前から知っています。','現在完了','known',['know','knew'],'has known と for years で、知っている状態の継続を表します。'],
['{n} has never eaten sushi.','{j}は一度も寿司を食べたことがありません。','現在完了','eaten',['eat','ate'],'eat の過去分詞は eaten。never と合わせて経験がないことを表します。'],
['{n} knows a boy who plays the violin.','{j}はバイオリンを弾く男の子を知っています。','関係代名詞','who',['what','which'],'人を説明する主格の関係代名詞 who。plays 以下が boy を説明。'],
['{n} has a camera that takes clear pictures.','{j}は鮮明な写真が撮れるカメラを持っています。','関係代名詞','takes',['take','taking'],'関係代名詞 that は1台の camera を指すので takes。'],
['{n} is old enough to travel alone.','{j}は1人で旅行できる年齢です。','不定詞','enough',['too','very'],'old enough to は「〜できるほど年齢が高い」です。'],
['{n} told me to wait here.','{j}は私にここで待つよう言いました。','不定詞','to',['for','at'],'tell→人→to→動詞で「人に〜するよう言う」です。']
]];
NEW_SENTENCES.forEach((list,l)=>list.forEach(([base,translation,topic,gap,distractors,explain],t)=>names.forEach(([name,jaName],n)=>{const en=base.replaceAll('{n}',name),ja=translation.replaceAll('{j}',jaName),tokens=en.replace(/[.?]$/,'').split(' '),index=tokens.indexOf(gap);if(index<0)throw Error('Missing gap '+base);const q={id:`sv2-${l}-${t}-${n}`,level:l+1,topic,en,ja,tokens,explain,hints:[explain,'最初は「'+tokens.slice(0,2).join(' ')+'」。','前半は「'+tokens.slice(0,Math.ceil(tokens.length/2)).join(' ')+'」。']};BANK.blocks.push(q);BANK.jump.push({...q,id:`gv2-${l}-${t}-${n}`,answer:gap,choices:[gap,...distractors],prompt:tokens.map((word,i)=>i===index?'_____':word).join(' ')+(en.endsWith('?')?'?':'.')});})));
// Replace malformed legacy distractor forms with usable English words.
const FIXED_DISTRACTORS={likes:['like','liking'],plays:['play','playing'],reads:['read','reading'],eats:['eat','eating'],drinks:['drink','drinking'],walks:['walk','walking'],cooks:['cook','cooking'],gets:['get','getting'],runs:['run','running'],knows:['know','knowing'],looks:['look','looking'],can:['is','has'],will:['is','was'],cannot:['does','is'],must:['is','has'],should:['is','has']};
BANK.jump.forEach(q=>{if(!q.id.startsWith('gv2-')&&FIXED_DISTRACTORS[q.answer])q.choices=[q.answer,...FIXED_DISTRACTORS[q.answer]];});
// New listening routes: unique start/destination pairs with length suitable for each level.
for(let level=1;level<=4;level++){const used=new Set(BANK.maze.filter(q=>q.level===level).map(q=>q.start.join()+':'+q.target.join()));const min=[2,3,5,7][level-1],max=[4,7,10,15][level-1];let added=0;for(let i=0;i<mazeCells.length&&added<55;i++)for(let j=0;j<mazeCells.length&&added<55;j++){const start=mazeCells[(i*17+level*5)%mazeCells.length],target=mazeCells[(j*19+level*3)%mazeCells.length],key=start.join()+':'+target.join();if(used.has(key))continue;const route=mazePath(start,target);if(!route||route.length<min||route.length>max)continue;used.add(key);const runs=[];route.forEach(d=>{if(runs.length&&runs.at(-1)[0]===d)runs.at(-1)[1]++;else runs.push([d,1]);});const en=runs.map(([d,n],index)=>{const count=NUMBERS[n],unit=n===1?'step':'steps';if(level===1)return `Move ${d} ${count} ${unit}.`;if(level===2)return `Go ${count} ${unit} ${d==='left'||d==='right'?'to the '+d:d}.`;if(level===3)return `${index?'Next':'Start by moving'}${index?', move':''} ${d} ${count} ${unit}.`;return `${index?'Continue by moving':'Begin by moving'} ${count} ${unit} ${d}.`;}).join(' ');const ja=runs.map(([d,n])=>`${JA_DIR[d]}へ${n}マス`).join(' → ');BANK.maze.push({id:`m2-${level}-${added++}`,level,topic:level<=2?'方向・数の聞き取り':'順序・指示の聞き取り',en,ja,start:[...start],target:[...target],route,hints:['数字と方向を聞き分けよう。one step は1マス、two steps は2マス。',`最初は${JA_DIR[route[0]]}へ。指示は${route.length}マス分です。`,'文字の指示：'+ja],explain:`${ja} の順に進むと宝箱に着きます。next / continue は次の動きを示します。`});}if(added!==55)throw Error('Insufficient new maze routes');}
// Eight additional scenes, seven connected exchanges, four language levels.
const NEW_QUEST_SCENES=[
['レストラン','RESTAURANT','食事メダル',[
['How many people are in your group?','何名様ですか？','3人と伝える',['Three.','Three people, please.','There are three of us.','There are three of us. Could we have a table, please?'],'人数は there are three of us でも伝えられます。'],
['Would you like a table by the window?','窓際の席はいかがですか？','窓際の席を希望する',['Yes, please.','Yes. A window table, please.','Yes, we would like a table by the window.','Yes, please. We would like to sit by the window if possible.'],'by the window は「窓のそばに」です。'],
['Here is the menu.','こちらがメニューです。','受け取ってお礼を言う',['Thank you.','Thank you very much.','Thanks. I will have a look.','Thank you. We will take a look at the menu.'],'have / take a look は「見てみる」です。'],
['Are you ready to order?','ご注文はお決まりですか？','まだ決まっていないと伝える',['Not yet.','Not yet, sorry.','Could we have a little more time?','We have not decided yet. Could we have a few more minutes?'],'not yet は「まだです」。時間をもう少し頼めます。'],
['What would you like to eat?','何を召し上がりますか？','うどんを注文する',['Udon, please.','I would like some udon.','Could I have the udon, please?','I would like the udon, please. Could you bring it with the drinks?'],'食べたいものを I would like ... で注文します。'],
['Would you like something to drink?','お飲み物はいかがですか？','水を希望する',['Water, please.','Some water, please.','Could I have a glass of water?','Could I have a glass of water with my meal, please?'],'a glass of water は「水1杯」です。'],
['Would you like dessert?','デザートはいかがですか？','アイスクリームを注文する',['Ice cream, please.','I would like some ice cream.','Could I have some ice cream for dessert?','Yes, please. I would like some ice cream for dessert.'],'for dessert は「デザートとして」です。']]],
['道案内','DIRECTIONS','道しるべ',[
['Excuse me. Are you looking for something?','すみません。何かお探しですか？','博物館を探していると伝える',['The museum.','I am looking for the museum.','Could you tell me the way to the museum?','I am looking for the museum. Could you tell me how to get there?'],'the way to ... で「〜への道」を聞けます。'],
['Go straight along this street.','この通りをまっすぐ進んでください。','まっすぐ進むと確認する',['Straight?','Go straight, right?','I should go straight along this street, right?','Just to check, I should go straight along this street, correct?'],'go straight は「まっすぐ進む」です。'],
['Turn left at the next corner.','次の角で左に曲がってください。','左に曲がると確認する',['Left?','Turn left, right?','I turn left at the next corner, right?','So I should turn left at the next corner, is that right?'],'turn left は左に曲がることです。'],
['Then cross the bridge.','それから橋を渡ってください。','橋を渡ると確認する',['The bridge?','Cross the bridge, right?','I should cross the bridge next, right?','After turning left, I should cross the bridge, correct?'],'cross は「渡る」。then は次の順番を示します。'],
['The museum is next to the bank.','博物館は銀行の隣にあります。','銀行の隣と確認する',['Next to the bank?','It is next to the bank, right?','The museum is next to the bank, right?','So the museum is next to the bank after I cross the bridge, correct?'],'next to は「〜の隣」です。'],
['It takes about ten minutes on foot.','歩いて約10分かかります。','歩いて10分と確認する',['Ten minutes?','Ten minutes on foot, right?','It takes about ten minutes to walk there, right?','Just to check, it is about a ten-minute walk from here, correct?'],'on foot は「歩いて」。about は「約」です。'],
['Do you understand the way now?','これで行き方はわかりましたか？','わかったと答えてお礼を言う',['Yes, thanks!','Yes. Thank you for your help.','Yes, I understand. Thanks for explaining it.','Yes, I understand now. Thank you for taking the time to help me.'],'道を教えてくれた人に感謝を伝えます。']]],
['空港','AIRPORT','空のチケット',[
['Where are you flying today?','今日はどちらまでご搭乗ですか？','ソウルへ行くと伝える',['Seoul.','I am flying to Seoul.','I would like to check in for my flight to Seoul.','I am flying to Seoul today and would like to check in.'],'fly to ... は「飛行機で〜へ行く」です。'],
['May I see your passport?','旅券を見せていただけますか？','旅券を渡す',['Here you are.','Yes. Here is my passport.','Of course. Here is my passport.','Certainly. Here is my passport. Please let me know if you need anything else.'],'物を渡すときは Here you are. を使えます。'],
['Do you have any bags to check in?','預ける荷物はありますか？','荷物を1つ預けると伝える',['One bag.','Yes, one bag.','Yes. I would like to check in one bag.','Yes, I have one suitcase that I would like to check in.'],'check in a bag は「荷物を預ける」です。'],
['Would you prefer a window or an aisle seat?','窓側と通路側のどちらがよいですか？','窓側を希望する',['Window, please.','A window seat, please.','I would prefer a window seat.','I would prefer a window seat if one is still available.'],'window seat は窓側、aisle seat は通路側です。'],
['Boarding starts at two thirty.','搭乗開始は2時30分です。','2時30分と確認する',['Two thirty?','At two thirty, right?','Boarding starts at two thirty, right?','Just to check, boarding begins at two thirty, is that correct?'],'boarding は「搭乗」。thirty は30です。'],
['Please go to gate twelve.','12番ゲートへ行ってください。','12番ゲートと確認する',['Gate twelve?','Gate twelve, right?','I should go to gate twelve, right?','So I need to be at gate twelve before boarding starts, correct?'],'gate twelve は12番の搭乗口です。'],
['Have a nice flight!','よい空の旅を！','お礼を言う',['Thank you!','Thank you very much.','Thank you for your help.','Thank you for your help. I am looking forward to the flight.'],'旅を楽しみにしている気持ちも伝えられます。']]],
['水族館','AQUARIUM','海の図鑑',[
['What animal would you like to see?','どんな動物を見たいですか？','ペンギンを見たいと答える',['Penguins.','I want to see the penguins.','I would like to see the penguins.','I would like to see the penguins because they are my favorite animals.'],'penguins はペンギンの複数形です。'],
['Do you have a ticket?','チケットはありますか？','チケットを持っていると伝える',['Yes.','Yes, I do.','Yes. Here is my ticket.','Yes, I bought a ticket earlier. Here it is.'],'持っているものを Here it is. で示せます。'],
['The penguins are upstairs.','ペンギンは上の階にいます。','上の階と確認する',['Upstairs?','They are upstairs, right?','I should go upstairs to see them, right?','So the penguins are on the floor above us, is that right?'],'upstairs は「上の階に」です。'],
['Would you like a map?','館内マップはいかがですか？','マップをもらう',['Yes, please.','Yes, thank you.','Yes, I would like a map, please.','Yes, please. A map would help me find my way around.'],'find my way around は「館内などで行き方がわかる」です。'],
['Which animal do you like best?','どの動物が一番好きですか？','イルカが一番好きと答える',['Dolphins.','I like dolphins best.','Dolphins are my favorite animals.','I like dolphins best because I enjoy watching them swim.'],'like ... best は「〜が一番好き」です。'],
['Would you like to read more about dolphins?','イルカについてもっと読みたいですか？','もっと知りたいと答える',['Yes!','Yes, I would.','Yes. I would like to learn more about them.','Yes, I would like to find out more about how dolphins live.'],'learn more about ... は「〜についてもっと知る」です。'],
['The animal guide is in the gift shop.','動物のガイドブックは売店にあります。','売店の場所を尋ねる',['Where is it?','Where is the gift shop?','Could you tell me where the gift shop is?','Could you show me how to get to the gift shop from here?'],'Could you tell me where ... is? で場所を丁寧に聞けます。']]],
['家','HOME','お手伝いバッジ',[
['Can you help me with dinner?','夕食の準備を手伝ってくれる？','手伝えると答える',['Sure!','Yes, I can.','Sure. I would be happy to help.','Of course. What would you like me to do first?'],'Sure. は「もちろん、いいよ」という返事です。'],
['Please put the plates on the table.','皿をテーブルに置いてください。','皿を置くと答える',['OK.','OK. I will.','I will put them on the table.','Sure. I will put the plates on the table now.'],'put A on B は「AをBの上に置く」です。'],
['How many cups do we need?','カップはいくつ必要？','4つ必要と答える',['Four.','We need four cups.','We need four cups for dinner.','We need four cups because there are four of us.'],'how many では数を答えます。'],
['Could you get some water?','水を持ってきてくれる？','水を持ってくると答える',['Sure.','I will get some water.','Of course. I will get some water.','Sure. I will bring some water to the table.'],'get / bring some water で水を用意することを伝えます。'],
['Would you like rice or bread?','ご飯とパンのどちらがいい？','ご飯を選ぶ',['Rice, please.','I would like rice.','I would like some rice, please.','I would prefer rice with dinner tonight, please.'],'rice はこの意味では a を付けません。'],
['Please wash your hands before dinner.','夕食の前に手を洗ってください。','手を洗うと答える',['OK.','I will.','OK. I will wash my hands.','I will wash my hands before I sit down to eat.'],'wash my hands は「自分の手を洗う」です。'],
['Thanks for helping me.','手伝ってくれてありがとう。','どういたしましてと返す',['You are welcome.','You are welcome!','You are welcome. I was happy to help.','You are welcome. Let me know if you need help again.'],'You are welcome. はお礼への返事です。']]],
['電話','PHONE','連絡メダル',[
['Hello. Who is speaking?','もしもし。どちら様ですか？','ケンだと名乗る',['This is Ken.','Hello. This is Ken.','Hi. This is Ken speaking.','Hello. My name is Ken. May I speak to Alex, please?'],'電話で名乗るときは This is ... speaking. が使えます。'],
['Alex is not here right now.','アレックスは今いません。','あとで電話すると伝える',['I will call later.','OK. I will call again later.','That is OK. I will call back later.','Thanks for letting me know. I will call back later.'],'call back は「折り返す、もう一度電話する」です。'],
['Would you like to leave a message?','伝言を残しますか？','伝言を残したいと答える',['Yes, please.','Yes. I have a message.','Yes, I would like to leave a message.','Yes, please. Could you pass a message on to Alex?'],'leave a message は「伝言を残す」です。'],
['What would you like me to tell Alex?','アレックスに何と伝えますか？','明日図書館で会おうと伝言する',['The library tomorrow.','Let us meet at the library tomorrow.','Please tell Alex to meet me at the library tomorrow.','Could you tell Alex that I would like to meet at the library tomorrow?'],'Please tell ... で伝言を頼めます。'],
['What time would you like to meet?','何時に会いたいですか？','午後3時と伝える',['At three.','At three in the afternoon.','I would like to meet at three in the afternoon.','Three in the afternoon would be a good time for me.'],'in the afternoon は「午後に」です。'],
['Could you say that again?','もう一度言っていただけますか？','午後3時と繰り返す',['Three.','Three in the afternoon.','I said three in the afternoon.','Of course. I would like to meet at three in the afternoon.'],'聞き返されたら、ゆっくり同じ内容を伝えます。'],
['I will give Alex your message.','アレックスに伝言を伝えます。','お礼を言って電話を終える',['Thanks. Bye!','Thank you. Goodbye.','Thanks for your help. Goodbye.','Thank you for passing on my message. Have a nice day.'],'電話を終える前にもお礼を言えます。']]],
['天気・予定','WEATHER','お出かけマップ',[
['How is the weather today?','今日の天気はどう？','晴れていると答える',['Sunny.','It is sunny.','It is sunny and warm today.','It is sunny and warm, so it looks like a good day to go out.'],'天気を伝える文は It is ... で始めます。'],
['Would you like to go to the park?','公園へ行かない？','行きたいと答える',['Yes!','Yes, I would love to.','That sounds great. Let us go.','I would love to go to the park while the weather is nice.'],'誘いに I would love to. で前向きに応じられます。'],
['When shall we meet?','いつ会おうか？','明日の朝と提案する',['Tomorrow morning.','Let us meet tomorrow morning.','How about meeting tomorrow morning?','Would tomorrow morning be a good time to meet?'],'How about ...? で提案できます。'],
['Where shall we meet?','どこで会おうか？','駅で会うと提案する',['At the station.','Let us meet at the station.','How about meeting at the station?','Could we meet at the station before going to the park?'],'場所を提案するときも How about ...? が使えます。'],
['What should we bring?','何を持っていこう？','水を持っていくと提案する',['Water.','Let us bring some water.','We should bring some water.','We should bring some water because we will be walking outside.'],'should は「〜したほうがよい」です。'],
['What if it rains tomorrow?','明日雨だったらどうする？','雨なら家にいると答える',['Stay home.','We can stay home.','If it rains, we can stay home.','If it rains tomorrow, we could stay home and play a game instead.'],'If it rains, ... は「雨が降ったら…」です。'],
['Do you want to check the weather again later?','あとで天気をもう一度確認する？','確認すると答える',['Yes.','Yes, let us check it later.','Yes. We should check it again later.','Yes. Let us check the forecast again before we decide what to do.'],'forecast は「予報」。check は「確認する」です。']]],
['スポーツ施設','SPORTS','チャレンジメダル',[
['Which sport would you like to try?','どのスポーツをやってみたいですか？','水泳を選ぶ',['Swimming.','I would like to try swimming.','I am interested in trying swimming.','I would like to try swimming because I want to learn a new skill.'],'try swimming は「水泳をやってみる」です。'],
['Have you been here before?','ここに来たことはありますか？','初めてだと答える',['No.','No. It is my first time.','No, I have never been here before.','No, this is my first visit. Could you tell me where to go?'],'first time は「初めて」。never は経験がないことを示します。'],
['Would you like a lesson?','レッスンを受けますか？','レッスンを希望する',['Yes, please.','Yes, I would.','Yes, I would like a swimming lesson.','Yes, please. I would like a lesson for beginners.'],'for beginners は「初心者向け」です。'],
['When would you like to start?','いつ始めたいですか？','土曜日と伝える',['Saturday.','On Saturday, please.','I would like to start on Saturday.','If there is a lesson on Saturday, I would like to join it.'],'曜日の前には on を使います。'],
['Do you have a swimsuit?','水着は持っていますか？','持っていると答える',['Yes.','Yes, I do.','Yes, I brought my swimsuit.','Yes, I have brought a swimsuit with me.'],'swimsuit は「水着」です。'],
['The changing room is over there.','更衣室はあちらです。','あちらと確認する',['Over there?','Over there, right?','The changing room is over there, right?','Just to check, that is the changing room over there, correct?'],'over there は「あちら、向こうに」です。'],
['Enjoy your lesson!','レッスンを楽しんでください！','お礼を言う',['Thank you!','Thank you very much.','Thanks. I am looking forward to it.','Thank you for your help. I am looking forward to learning something new.'],'look forward to ... は「〜を楽しみにする」です。']]]
];
NEW_QUEST_SCENES.forEach(([scene,label,item,lines],index)=>{const sceneIndex=QUEST_SCENES.length;const wrong=['I need a new pencil.','The elephant is very big.'];const stored=lines.map(([npc,npcJa,goal,answers,tip])=>[npc,npcJa,goal,answers,wrong[0],tip]);QUEST_SCENES.push([scene,label,item,stored]);lines.forEach(([npc,npcJa,ja,answers,tip],step)=>answers.forEach((en,l)=>BANK.quest.push({id:`q2-${index}-${step}-${l}`,scene,sceneIndex,label,item,step,level:l+1,topic:'会話・'+scene,npc,npcJa,ja,en,choices:[en,...lines.filter((row,i)=>i!==step).map(row=>row[3][l]).filter((v,i,arr)=>v!==en&&arr.indexOf(v)===i).slice(0,2)],hints:[tip,`相手：「${npcJa}」／目的：${ja}`,`使える表現：「${en}」`],explain:`${en} → ${ja}場面で使えます。${tip}`})));});

// Japanese prompts may describe more than one standard English synonym.
const WORD_ALIASES={start:['begin'],begin:['start'],store:['shop'],shop:['store'],luggage:['baggage'],gray:['grey'],fridge:['refrigerator'],reuse:['re-use']};
for(const k of ['fighter','invaders'])for(const q of BANK[k])if(WORD_ALIASES[q.en])q.answers=[...new Set([...q.answers,...WORD_ALIASES[q.en]])];
