'use strict';

{  
  const mask = document.getElementById('mask');
  const modal = document.getElementById('modal');
  const playbtn = document.getElementById('playbtn');

  playbtn.addEventListener('click', () => {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
  });
  
  const question = document.getElementById('question'); 
  const choices = document.getElementById('choices'); 
  const btn = document.getElementById('btn'); 
  const result = document.getElementById('result');
  const scoreLabel = document.getElementById('lastScore');
  const commentLabel = document.getElementById('scoreComment');
  const scoreview = document.getElementById('scoreview');
  const correctAns = document.getElementById('correctAns');
  const comment = document.getElementById('comment');
  const text = document.getElementById('text');

  const quizSet = shuffle([
    {q: 'X線を発見した人物は？', c: ['レントゲン', 'ポール・ヴィラール', 'アンリベクレル'], n: 1},
    {q: '面積が一番小さい都道府県は？', c: ['香川県', '鳥取県', '大阪府'],n: 2},
    {q: 'ドライアイスは何が固まったもの？', c: ['二酸化炭素', '水蒸気', '二酸化窒素'],n: 3},
    {q: '日本の最西端は？', c: ['与那国島', '沖ノ鳥島', '宗谷岬'],n: 4},
    {q: '日本の国鳥は？', c: ['キジ', 'トキ', '鵜'],n: 5},
    {q: '世界で一番深い湖は？', c: ['バイカル湖', 'スペリオル湖', 'カスピ海'],n: 6},
    {q: 'リンスの元の意味は？', c: ['ゆすぐ', '滑らかな', 'きれいな'],n: 7},
    {q: '.comのcomは何の略？', c: ['コマーシャル', 'コミュニティー', 'コマンド'],n: 8},
    {q: 'オーストラリアの首都は？', c: ['キャンベラ', 'シドニー', 'メルボルン'],n: 9},
    {q: '日本で二番目に高い山は？', c: ['北岳', '槍ヶ岳', '御嶽山'],n: 10},
  ]);

  const commentSet = [
    'ポール・ヴィラールはガンマ線の発見者で,アンリベクレルは放射線の発見者です。',
    '面積が小さい都道府県の1位は香川県,2位は大阪府,3位は東京都です。',
    'ドライアイスは常圧環境下では液体とならずに気体になる性質があります。',
    '日本の最東端はに南鳥島(東京都),最西端は与那国島(沖縄県),最南端は沖ノ鳥島(東京都),最北端は択捉島(北海道)です。',
    'アメリカの国鳥はハクトウワシ,イギリスではヨーロッパコマドリ,グアテマラではケツァールです。',
    'バイカル湖の水深は最大1,741メートルあり、2番目に深い湖はタンガニー湖,3番目はカスピ海です。',
    '昔のシャンプーは石鹸に近いアルカリ性であり、これを中和するために酸性の水溶液で髪をすすいだことに由来しています。',
    '「.com」はドメイン利用者の居住場所にかかわらず取得できるドメインgTLDの代表的なものです。',
    'シドニーとメルボルンの間での首都をめぐる争いが起きたことで、その2つの都市の間に位置したキャンベラが首都になりました。',
    '日本で一番高い山は富士山(3,776m),二番目は北岳(3,193m),三番目は奥穂高岳(3,190m)です。'
  ];

  let currentNum = 0;
  let isAnswered;
  let score = 0;
 
  function shuffle(arr) {
   let i = arr.lengrh - 1;
   for(i = arr.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered){
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
      correctAns.classList.add('correct');
      correctAns.textContent = `正解です`;
      comment.textContent = commentSet[quizSet[currentNum].n - 1];
    }
    else {
      li.classList.add('wrong');
      correctAns.classList.remove('correct');
      correctAns.textContent = `正解は${quizSet[currentNum].c[0]}です`;
      comment.textContent = commentSet[quizSet[currentNum].n - 1];
    }
    text.classList.remove('hidden');
    scoreview.textContent = `正答率 ${score}問 / ${currentNum + 1}問中`;
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = `Q${currentNum + 1}: ${quizSet[currentNum].q}`;

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }
    
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if(currentNum === quizSet.length - 1){
      btn.textContent = '結果を見る';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')){
      return;
    }
    text.classList.add('hidden');
    btn.classList.add('disabled');
    correctAns.textContent = '';
    comment.textContent = '';
    
    if(currentNum === quizSet.length - 1){
      if(score <= 4){
        commentLabel.textContent = '努力あるのみ!';
      }
      else if(5 <= score <= 8){
        commentLabel.textContent = 'あと一歩!';
      }
      else {
        commentLabel.textContent = 'ナイススコア!';
      }
      scoreLabel.textContent = `スコア: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    }
    else {
      currentNum++;
      setQuiz();
    }
  });
}