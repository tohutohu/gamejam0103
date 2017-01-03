var screen;
var titleImg;
var space = false;
var right=false;
var left=false;
var ctx;
var time;
var ji;
var n;
var question;

var jiList = [
'しじみ',
'さうじあらびあ',
'いじわる',
'とうじき',
'かじば',
'さじ',
'じしょ',
'すじ',
'もじ',
'ふじ',
'こうじ',
'はじ',
'くじ',
'やじ',
'ぺーじ',
'そうじ',
'てじな',
'まじっく',
'そらじろう',
'はいじ',
'うじまっちゃ',
'ばじる'
]

var nList = [
'みかん',
'ぷりん',
'うん',
'かんごふ',
'しんたい',
'ぱんや',
'てんすう',
'こんらん',
'うどん',
'はんにん',
'ぽーらんど',
'さんすう',
'こんどう',
'さんどう',
'てんどん',
'ほんとう',
'あんにゅい',
'せんこう',
'しんぱん',
'めんどう',
'ぽんぽんぺいん',
'こんてんぽらりー',

]

var jinList = [
'おじさん',
'まーじゃん',
'さんじのおやつ',
'じこけんじよく',
'あんじんづか',
'さんじはん',
'ぱんじー',
'けんじゅう',
'じかんわり',
'じかん',
'にほんじん',
'たんじょうび',
'もんだいじ',
'てんじんがわ',
]

var ok,ng;
window.onload = function(){
  screen = document.getElementById('screen');
  screen.width = 1280;
  screen.height = 720;

  ctx = screen.getContext('2d');

  window.addEventListener('keydown', keyDown, true);
  window.addEventListener('keyup', keyUp, true);

  titleImg = new Image();
  titleImg.src='moujikannai.jpg'
  ji = new Image();
  ji.src = 'ji.png';
  n = new Image();
  n.src='n.png'
  ok = new Image();
  ok.src='ok.png'
  ng = new Image();
  ng.src='ng.png'
  startTitle();
}

function startTitle(){
  ctx.clearRect(0, 0, screen.width, screen.height);

  ctx.drawImage(titleImg, 0, 0, screen.width, screen.height);
  ctx.font = "normal 50pt 'メイリオ'";
  ctx.fillText('じかんがないんです！！', 600, 90);
  ctx.fillText('Press Space', 700, 550);

  if(space){
    ctx.font = "normal 18pt 'メイリオ'";
    time = Date.now();
    setQuestion();
    startGame();
    return;
  }

  setTimeout(startTitle, 16);
}

var maru = false;
var batsu = false;
var point=0;
var poiji;

function startGame(){
  ctx.clearRect(0, 0, screen.width, screen.height);

  //disp time
  ctx.font = "normal 18pt 'メイリオ'";
  ctx.textAlign ='left';
  ctx.fillText(TimeGetTimeString(Date.now()-time), 0, 25);
  ctx.font = "normal 50pt 'メイリオ'";
  ctx.textAlign ='center';
  ctx.fillText(question, screen.width/2, screen.height/2);
  ctx.drawImage(ji,150,300);
  ctx.drawImage(n,1050,300);
  if(maru){
    ctx.drawImage(ok, 100 ,100);
  }else if(batsu){
    ctx.drawImage(ng, 100 ,100);
  }
  if(point === 10 && !maru && !batsu){
    gameEnd(TimeGetTimeString(Date.now()-time));
    return;
  }
  setTimeout(startGame,16);
}

function gameEnd(result){
  ctx.clearRect(0, 0, screen.width, screen.height);
  ctx.font = "normal 18pt 'メイリオ'";
  ctx.textAlign ='left';
  ctx.fillText(result, 0, 25);
  ctx.textAlign ='center';
  ctx.fillText('Tweet:Press Space!', screen.width/2, screen.height/2);
  var text = 'ゲームを' + result + 'でクリア！！！';
  if(space){
    window.open('http://twitter.com/?status='+ text, '_blank');
    return;
  }

  setTimeout(gameEnd,16, result);
  
}

function resetKey(){
  maru =false;
  batsu = false;
  left = false;
  right = false;
  space = false;
}

function keyDown(e){
  console.log(e);
  switch(e.keyCode){
    case 37:
      left = true;
      break;
    case 39:
      right = true;
      break; 
    case 32:
      space = true;
      break;
  }
  if(left || right)checkAns();
}

function checkAns(){
  if(maru || batsu)return;

  if(poiji){
    if(left){
      maru = true;
      point++;
      setTimeout(setQuestion, 500);
    }else{
      batsu = true;
      setTimeout(setQuestion, 3000);
    }
  }else{
    if(right){
      maru = true;
      point++;
      setTimeout(setQuestion, 500);
    }else{
      batsu = true;
      setTimeout(setQuestion, 3000);
    }
  }
}

function setQuestion(){
  resetKey();
  if(Math.random() < 0.5){
    question = jiList[Math.floor(Math.random() * jiList.length)];
    poiji = true;
  }else{
    question = nList[Math.floor(Math.random() * nList.length)];
    poiji = false;
  }
  question = question.replace(/ん/g, '●');
  question = question.replace(/じ/g, '●');
  console.log(question);
}

function keyUp(e){
  switch(e.keyCode){
    case 37:
      left = false;
      break;
    case 39:
      right = false;
      break; 
    case 32:
      space = false;
      break;
  }
}

function TimeGetTimeString(time){

  var milli_sec = time % 1000;
  time = (time - milli_sec) / 1000;
  var sec = time % 60;
  time = (time - sec) / 60;
  var min = time % 60;
  var hou = (time - min) / 60;

  // 文字列として連結
  return hou  + ":" +
    ((min < 10) ? "0" : "") + min + ":" +
    ((sec < 10) ? "0" : "") + sec + "." +
    ((milli_sec < 100) ? "0" : "") + ((milli_sec < 10) ? "0" : "") + milli_sec;
}

