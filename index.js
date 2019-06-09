var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var score = 0;
var isGameStarted = false;
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')


$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')

}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return
  }

  if (event.target.dataset.box) {
    score++
    renderBox();
    
  }
}

function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', 'true')
  
  isGameStarted = true;
  $game.style.backgroundColor = '#fff';
  hide($start);

  

  var interval = setInterval(() => {
    var time = parseFloat($time.textContent);

    if (time <= 0) {
      // end game
      clearInterval(interval)
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
    
  }, 100);

  renderBox();
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  var time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);

}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute('disabled');
  show($start);
  $game.innerHTML ='';
  $game.style.backgroundColor = '#ccc';
  hide($timeHeader);
  show($resultHeader);

}

function renderBox() {
  $game.innerHTML = '';
  var box = document.createElement('div');
  var boxSize = getRandom(30, 100); // меняет рандомно размер квадрата
  var gameSize = $game.getBoundingClientRect();
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;
  var boxStyle = box.style;


  boxStyle.height = box.style.width = boxSize + 'px'; // размер квадрата
  boxStyle.position = 'absolute'; // расположение квадрата
  boxStyle.backgroundColor = generateColor(); // цвет квадрата
  boxStyle.top = getRandom(0, maxTop) + 'px'; // координаты
  boxStyle.left = getRandom(0, maxLeft) + 'px' // координаты
  boxStyle.cursor = 'pointer' // курсор
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box) // добавляет элемент в DOM-дерево
};

// рандомный число в диапозоне min max
function getRandom(min, max) {
  return Math.floor(Math.random() * (max-min) + min);
};

function generateColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16)
  
}

