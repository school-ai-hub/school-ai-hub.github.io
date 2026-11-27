const EXTRA_GAMES=['invaders','maze','quest'];
BANK.invaders=BANK.fighter.map(q=>({...q,id:'i-'+q.id}));
// Maze routes: every destination has a verified path through the same tile map.
const MAZE_W=9,MAZE_H=7,MAZE_WALLS=new Set(['3,0','3,1','3,3','3,4','3,5','6,1','6,2','6,3','6,5','6,6']);
function mazePath(from,to){const queue=[{p:from,route:[]}],seen=new Set([from.join(',')]);for(let i=0;i<queue.length;i++){const {p,route}=queue[i];if(p[0]===to[0]&&p[1]===to[1])return route;for(const [dx,dy,d] of [[1,0,'right'],[0,1,'down'],[-1,0,'left'],[0,-1,'up']]){const n=[p[0]+dx,p[1]+dy],key=n.join(',');if(n[0]>=0&&n[0]<MAZE_W&&n[1]>=0&&n[1]<MAZE_H&&!MAZE_WALLS.has(key)&&!seen.has(key)){seen.add(key);queue.push({p:n,route:[...route,d]});}}}return null;}
const NUMBERS=['zero','one','two','three','four','five','six','seven','eight','nine'];
const JA_DIR={right:'右',left:'左',up:'上',down:'下'};
BANK.maze=[];
const mazeCells=[];for(let y=0;y<MAZE_H;y++)for(let x=0;x<MAZE_W;x++)if(!MAZE_WALLS.has(`${x},${y}`))mazeCells.push([x,y]);
for(let level=1;level<=4;level++)for(let i=0;i<55;i++){
 const start=mazeCells[(i*7+level*3+Math.floor(i/mazeCells.length))%mazeCells.length],target=mazeCells[(i*13+level*5+1)%mazeCells.length];
 // Copy positions before storing; avoid changing shared cells.
 let end=[...target];if(start.join()===end.join())end=[...mazeCells[(mazeCells.findIndex(c=>c.join()===start.join())+1)%mazeCells.length]];
 const route=mazePath(start,end),runs=[];route.forEach(d=>{if(runs.length&&runs.at(-1)[0]===d)runs.at(-1)[1]++;else runs.push([d,1]);});
 const en=runs.map(([d,n],j)=>level===1?`Go ${d} ${NUMBERS[n]} ${n===1?'step':'steps'}.`:level===2?`Move ${NUMBERS[n]} ${n===1?'step':'steps'} ${d==='left'||d==='right'?'to the '+d:d}.`:level===3?`${j?'Then':'First'}, move ${NUMBERS[n]} ${n===1?'step':'steps'} ${d}.`:`${j?'After that':'To reach the treasure'}, go ${d} for ${NUMBERS[n]} ${n===1?'step':'steps'}.`).join(' ');
 const ja=runs.map(([d,n])=>`${JA_DIR[d]}へ${n}マス`).join(' → ');
 BANK.maze.push({id:`m-${level}-${i}`,level,topic:level<=2?'方向・数の聞き取り':'順序・指示の聞き取り',start:[...start],target:end,route,en,ja,hints:['right＝右、left＝左、up＝上、down＝下。数字は進むマスの数です。',`最初は${JA_DIR[route[0]]}へ進もう。`,`文字の指示：${ja}`],explain:`指示の順番は ${ja}。聞き直して、数と方向を確かめよう。`});
}
// 8 everyday scenes × 7 exchanges × 4 levels = 224 dialogue challenges.
const QUEST_SCENES=[
['カフェ','CAFE','ドリンク券',[
['Hello! How can I help you?','こんにちは！ご注文は？','ジュースを注文する',['Juice, please.','I would like some juice.','Could I have some juice, please?','I would like some juice without ice, please.'],'I live near the station.','ジュースの注文を伝えよう。'],
['Small or large?','小さいサイズですか、大きいサイズですか？','大きいサイズを選ぶ',['Large, please.','A large one, please.','I would like a large one, please.','Could you make that a large one, please?'],'I am twelve years old.','サイズを選ぶ返事です。'],
['Anything to eat?','食べ物もいかがですか？','サンドイッチも注文する',['A sandwich, please.','A sandwich, too, please.','Could I also have a sandwich?','I would also like a sandwich, if you have one.'],'It is next to the park.','食べたいものを追加しよう。'],
['For here or to go?','店内ですか、お持ち帰りですか？','店内で食べる',['For here, please.','I will eat here.','I would like to eat here, please.','We would like to eat here if a table is available.'],'I go to school by bus.','for here は「店内で」です。'],
['Here is your juice.','こちらがジュースです。','受け取ってお礼を言う',['Thank you.','Thank you very much.','Thanks. It looks good.','Thank you for bringing it to me.'],'Turn left at the corner.','受け取ったらお礼を伝えよう。'],
['Would you like anything else?','ほかに何かいりますか？','追加はいらないと伝える',['No, thanks.','No, thank you.','No, thank you. That is all.','No, thank you. I have everything I need.'],'I like playing tennis.','丁寧に断る返事です。'],
['How was everything?','いかがでしたか？','おいしかったと伝える',['It was good!','It was delicious.','The sandwich was delicious.','Everything was delicious, especially the sandwich.'],'I cannot find my ticket.','食べたものの感想を伝えよう。']]],
['お店','SHOP','買い物バッグ',[
['Can I help you?','何かお探しですか？','Tシャツを探す',['A T-shirt, please.','I am looking for a T-shirt.','I would like to buy a T-shirt.','I am looking for a T-shirt that I can wear in summer.'],'The train leaves at nine.','探している品物を伝えよう。'],
['What color would you like?','何色がいいですか？','青を選ぶ',['Blue, please.','I would like a blue one.','Could I see the blue one, please?','I would prefer a blue one if you have it.'],'It tastes sweet.','色を答える場面です。'],
['What size do you need?','サイズはいくつですか？','Mサイズを選ぶ',['Medium, please.','I need a medium.','I would like a medium, please.','A medium should fit me. Could I try it on?'],'I study English every day.','medium はMサイズです。'],
['Would you like to try it on?','試着しますか？','試着すると答える',['Yes, please.','Yes, I would.','Yes, I would like to try it on.','Yes, please. I would like to see if it fits.'],'It is sunny today.','try it on は「試着する」です。'],
['How does it fit?','サイズはいかがですか？','ちょうどよいと伝える',['It fits!','It fits well.','It fits me very well.','It fits perfectly, and I like the color.'],'I got up at seven.','着たサイズの感想です。'],
['Would you like to buy it?','お買いになりますか？','買うと伝える',['Yes, please.','Yes. I will take it.','Yes, I would like to buy it.','Yes, I will take it because it fits so well.'],'It is on the second floor.','買う意思を伝えよう。'],
['Do you need a bag?','袋は必要ですか？','自分の袋があると伝える',['No, thanks.','No, I have a bag.','No, thank you. I have my own bag.','No, thank you. I brought a bag with me.'],'The museum closes at five.','自分の袋があるので断ります。']]],
['図書館','LIBRARY','図書カード',[
['What are you looking for?','何をお探しですか？','動物の本を探す',['Animal books, please.','I am looking for a book about animals.','Could you help me find a book about animals?','I am looking for a book that explains how animals live.'],'I would like some orange juice.','本の内容を伝えよう。'],
['Which animals do you like?','どんな動物が好きですか？','犬が好きと答える',['Dogs.','I like dogs.','I am interested in dogs.','I like dogs because they are friendly.'],'I go there by train.','好きな動物を答えます。'],
['Here is a book about dogs.','犬の本はこちらです。','お礼を言う',['Thank you.','Thanks for your help.','Thank you for finding it.','Thank you. This is just what I was looking for.'],'A large one, please.','本を見つけてくれた人にお礼です。'],
['Would you like to borrow it?','借りますか？','借りたいと伝える',['Yes, please.','Yes, I would.','Yes, I would like to borrow it.','Yes, I would like to borrow it so I can read it at home.'],'It was very delicious.','borrow は「借りる」です。'],
['Do you have your library card?','図書カードはありますか？','カードを渡す',['Yes. Here it is.','Yes, I have it here.','Yes. Here is my library card.','Yes, I brought it with me. Here you are.'],'The train is late.','持っているカードを示します。'],
['Please return it by Friday.','金曜日までに返してください。','金曜日までに返すと約束する',['OK.','I will. Thank you.','I will return it by Friday.','I will make sure I return it by Friday.'],'I am looking for a T-shirt.','return は「返す」、by Friday は「金曜日までに」です。'],
['Do you need anything else?','ほかに何か必要ですか？','ほかはいらないと伝える',['No, thanks.','No, thank you.','No, thank you. That is all.','No, thank you. You have been very helpful.'],'I have a headache.','用事が終わったと丁寧に伝えます。']]],
['駅','STATION','乗車券',[
['Where would you like to go?','どこへ行きたいですか？','博多へ行くと伝える',['Hakata, please.','I want to go to Hakata.','I would like to go to Hakata.','I would like to take a train to Hakata.'],'A blue T-shirt, please.','行き先を答えます。'],
['One ticket or two?','切符は1枚ですか、2枚ですか？','2枚買う',['Two, please.','Two tickets, please.','I would like two tickets, please.','Could I have two tickets to Hakata, please?'],'I like reading books.','必要な枚数を伝えます。'],
['One-way or round-trip?','片道ですか、往復ですか？','往復を選ぶ',['Round-trip, please.','Round-trip tickets, please.','We would like round-trip tickets.','We would like round-trip tickets because we are coming back today.'],'I drink milk every morning.','round-trip は「往復」です。'],
['The next train leaves at ten.','次の電車は10時発です。','10時と確認する',['At ten?','At ten, right?','It leaves at ten, right?','Just to check, the next train leaves at ten, correct?'],'For here, please.','時刻を聞き返して確認します。'],
['Please use platform three.','3番ホームを使ってください。','3番ホームと確認する',['Platform three?','Platform three, right?','I should go to platform three, right?','So we need to go to platform three, is that right?'],'I want a sandwich.','platform は「駅のホーム」です。'],
['Do you know where it is?','場所はわかりますか？','わからないので教えてもらう',['No. Please help me.','No. Where is it?','No. Could you tell me where it is?','No. Could you show me how to get to platform three?'],'It fits perfectly.','場所がわからないときに頼みます。'],
['Go upstairs and turn right.','上の階へ行き、右に曲がってください。','お礼を言う',['Thank you.','Thank you for your help.','Thanks. I will go that way.','Thank you for explaining the way to me.'],'I have a library card.','道を教えてくれた人にお礼です。']]],
['公園','PARK','友達バッジ',[
['Hi! What is your name?','やあ！名前は？','自分の名前をケンと伝える',['Ken.','My name is Ken.','Hi. I am Ken. Nice to meet you.','My name is Ken. It is nice to meet you.'],'Two tickets, please.','自分の名前を伝える返事です。'],
['Do you like soccer?','サッカーは好きですか？','好きだと答える',['Yes!','Yes, I do.','Yes, I like playing soccer.','Yes, I do. I have played soccer for three years.'],'I need a medium.','好きかどうかを答えます。'],
['Would you like to play with us?','一緒にやりませんか？','参加すると伝える',['Yes, please!','Yes, I would love to.','Sure. That sounds fun.','I would love to join you if that is OK.'],'I will return it by Friday.','誘いに応じる表現です。'],
['Which team would you like to join?','どのチームに入りたいですか？','青チームを選ぶ',['The blue team.','The blue team, please.','I would like to join the blue team.','I would like to join the blue team if there is room.'],'At ten, right?','チームを選びます。'],
['Are you ready?','準備はいいですか？','準備できたと答える',['Yes!','Yes, I am.','Yes. I am ready to play.','Yes, I am ready. Let us get started.'],'I am looking for a book.','ready は「準備ができた」です。'],
['That was a great goal!','すごいゴールだったね！','ほめられてお礼を言う',['Thanks!','Thank you!','Thanks. I am really happy.','Thank you. I could not have done it without your help.'],'I have a headache.','ほめられたらお礼を伝えます。'],
['See you next week!','来週また会おう！','また来週と返す',['See you!','See you next week!','I am looking forward to it.','See you next week. I am looking forward to playing again.'],'A sandwich, please.','別れのあいさつです。']]],
['保健室','HEALTH','お助けバッジ',[
['How do you feel?','具合はどうですか？','頭が痛いと伝える',['My head hurts.','I have a headache.','I have a headache and feel tired.','I have had a headache since this morning.'],'Round-trip, please.','headache は「頭痛」です。'],
['When did it start?','いつ始まりましたか？','今朝からと伝える',['This morning.','It started this morning.','It started after breakfast this morning.','It started this morning, just after I had breakfast.'],'Blue, please.','始まった時を答えます。'],
['Did you eat breakfast?','朝食は食べましたか？','食べたと答える',['Yes.','Yes, I did.','Yes, I ate breakfast.','Yes, I had some bread and milk for breakfast.'],'Platform three, right?','過去の質問なので did で答えられます。'],
['Would you like some water?','水はいりますか？','水をもらう',['Yes, please.','Yes, thank you.','Yes, I would like some water.','Yes, please. I have not had much water today.'],'I like dogs.','差し出された水を受け取ります。'],
['Can you rest here for a while?','しばらくここで休めますか？','休むと答える',['Yes.','Yes, I can.','Yes, I will rest here.','Yes, I will rest here until I feel better.'],'I am looking for a T-shirt.','rest は「休む」です。'],
['Do you feel better now?','今はよくなりましたか？','よくなったと伝える',['Yes.','Yes, I feel better.','Yes, I feel much better now.','Yes, I feel much better than I did earlier.'],'I want two tickets.','better は「よりよい」です。'],
['Please tell me if you need help.','助けが必要なら言ってください。','お礼を言う',['Thank you.','Thank you for your help.','Thank you. I will let you know.','Thank you for helping me. I will tell you if I need anything.'],'For here, please.','助けてくれた人に感謝します。']]],
['ホテル','HOTEL','ルームキー',[
['Welcome. How can I help you?','ようこそ。ご用件は？','チェックインしたいと伝える',['Check-in, please.','I would like to check in.','I have a reservation and would like to check in.','I would like to check in. I have a reservation for tonight.'],'I like soccer.','check in は宿泊の受付をすることです。'],
['What is your name?','お名前は？','ケン・タナカと名乗る',['Ken Tanaka.','My name is Ken Tanaka.','The reservation is under Ken Tanaka.','I made the reservation under the name Ken Tanaka.'],'Juice, please.','予約した名前を伝えます。'],
['How many nights are you staying?','何泊ですか？','2泊と伝える',['Two nights.','I am staying for two nights.','I would like to stay for two nights.','I will be staying for two nights, including tonight.'],'It fits well.','nights は泊まる夜の数です。'],
['Would you like breakfast?','朝食は付けますか？','朝食を付けたいと答える',['Yes, please.','Yes, I would.','Yes, I would like breakfast.','Yes, please. I would like breakfast both mornings.'],'I have a headache.','朝食を希望します。'],
['Your room is on the third floor.','お部屋は3階です。','3階と確認する',['The third floor?','The third floor, right?','My room is on the third floor, right?','Just to check, my room is on the third floor, correct?'],'The blue team, please.','third は「3番目」です。'],
['Do you need help with your bag?','荷物を運ぶお手伝いは必要ですか？','手伝ってほしいと伝える',['Yes, please.','Yes, thank you.','Yes. Could you help me with it?','Yes, please. The bag is heavier than I expected.'],'I go to school by bus.','手助けを丁寧に頼みます。'],
['Enjoy your stay!','ごゆっくりお過ごしください！','お礼を言う',['Thank you.','Thank you very much.','Thank you. I am happy to be here.','Thank you for your help. I am looking forward to my stay.'],'I want a book about dogs.','受付の人にお礼です。']]],
['学校','SCHOOL','探究メダル',[
['What subject do you like?','好きな教科は？','英語が好きと伝える',['English.','I like English.','English is my favorite subject.','I like English because I enjoy talking with people.'],'A large one, please.','好きな教科を答えます。'],
['What do you do after school?','放課後は何をしますか？','本を読むと答える',['I read books.','I usually read books.','I enjoy reading books after school.','I usually read books after I have finished my homework.'],'The third floor, right?','放課後の活動を伝えます。'],
['Would you like to join our club?','私たちのクラブに入りませんか？','入ると伝える',['Yes!','Yes, I would like to.','Yes, I would love to join.','I would love to join because I want to learn more.'],'I have my own bag.','誘いに応じます。'],
['Can you come on Wednesday?','水曜日に来られますか？','来られると答える',['Yes.','Yes, I can.','Yes, I can come on Wednesday.','Yes, I will be able to come on Wednesday.'],'It was delicious.','予定を確認する返事です。'],
['Please bring a notebook.','ノートを持ってきてください。','持ってくると約束する',['OK.','I will bring one.','OK. I will bring my notebook.','I will make sure I bring a notebook with me.'],'I am staying for two nights.','bring は「持ってくる」です。'],
['What would you like to learn?','何を学びたいですか？','ロボットについて学びたいと伝える',['About robots.','I want to learn about robots.','I would like to learn how robots work.','I would like to learn how to make a robot that helps people.'],'Platform three, please.','学びたい内容を伝えます。'],
['Let us work together!','一緒に取り組もう！','賛成すると答える',['Yes!','That sounds good!','Great. I am looking forward to it.','That sounds great. I am looking forward to working with you.'],'I need a medium.','一緒に活動することへの賛成です。']]]
];
BANK.quest=[];QUEST_SCENES.forEach(([scene,label,item,lines],sceneIndex)=>lines.forEach(([npc,npcJa,mission,answers,wrong,tip],step)=>answers.forEach((en,l)=>BANK.quest.push({id:`q-${sceneIndex}-${step}-${l}`,scene,sceneIndex,label,item,step,level:l+1,topic:`会話・${scene}`,npc,npcJa,ja:mission,en,choices:[en,wrong,step%2?'Could you tell me the time?':'I am looking for my umbrella.'],hints:[tip,`相手：「${npcJa}」／目的：${mission}`,`使える表現：「${en}」`],explain:`${en}：${mission}ための表現です。${tip}`}))));
