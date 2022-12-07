const number = 3;
const min = 5;
const max = 10;
const goalScore = 100
let scores = [];
let current = '';
let startTime = 0;

function update() {
  const num2= document.querySelector("#num2");
  startTime = new Date().getTime()

  while(current === num2.innerText) {
    num2.innerText = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  current = num2.innerText;
}

function start() {
  const startButton = document.getElementById('start');
  const main = document.querySelector('.main');
  const numbers = document.querySelector('.numbers');

  const okBtn = document.querySelector("#ok");
  const text = document.querySelector('.question');
  const answer = document.querySelector('#product');
  const num1 = document.querySelector("#num1");

  num1.innerText = number;
  update();

  main.style.display = 'flex';
  numbers.style.display = 'flex';

  okBtn.style.display = 'inline';
  text.style.display = 'inline';
  answer.style.display = 'inline';

  startButton.style.display = 'none';

  for (let i = min; i <= max; i++) {
    scores.push(0);
  }
}

function numberBtn(num) {
  document.querySelector('#product').value = document.querySelector('#product').value * 10 + num;
  const validation = document.querySelector('#validation');
  validation.innerText = '';
}

function checkAnswer() {
  const num2 = parseInt(document.querySelector('#num2').innerText);
  const answer = parseInt(document.querySelector('#product').value);
  const validation = document.querySelector('#validation');

  let index = num2 - min;
  let currentTime = new Date().getTime();
  let time = Math.floor((currentTime - startTime) / 1000)
  
  if (time === 0) {
    time++;
  }

  if (answer === number * num2) {
    
    if (scores[index] < goalScore) {
      scores[index] += 60 / time
    } else {
      scores[index] += 20 / time
    }

    validation.innerText = 'Rätt';
  } else {
    
    if (scores[index] > 0) {
      scores[index] -= 20
    } else {
      scores[index] -= 5;
    }
    validation.innerText = 'Fel';
  }

  // alert(scores)

  let test = true;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] < goalScore) {
      test = false;
      break;
    }
  }

  if (test === true) {
    alert('Bravo! Du har nu klarat av dagens uppgift. Belöningen ligger den nya klockan.');
  } else {
    document.querySelector('#product').value = '';
    update();
  }
}

function App() {
  return (
    <div className='container'>
      <div className='main'>
        <div className='row'>
          <div className='start'>
          <button id='start' onClick={start}>Starta</button>
          </div>
          <p className='question'><span id='num1'>0</span>&times;<span id='num2'></span>=</p>
          <input type='number' min='0' id='product' />
          <button id='ok' onClick={checkAnswer}>OK</button>
        </div>
        <div className='row'>
          <p id='validation' className='validation'></p>
        </div>
      </div>
      <div className='numbers'>
        <div className='row'>
          <button className='number' onClick={() => numberBtn(7)} id='7'>7</button>
          <button className='number' onClick={() => numberBtn(8)} id='8'>8</button>
          <button className='number' onClick={() => numberBtn(9)} id='9'>9</button>
        </div>
        
        <div className='row'>
          <button className='number' onClick={() => numberBtn(4)} id='4'>4</button>
          <button className='number' onClick={() => numberBtn(5)} id='5'>5</button>
          <button className='number' onClick={() => numberBtn(6)} id='6'>6</button>
        </div>
        
        <div className='row'>
          <button className='number' onClick={() => numberBtn(1)} id='1'>1</button>
          <button className='number' onClick={() => numberBtn(2)} id='2'>2</button>
          <button className='number' onClick={() => numberBtn(3)} id='3'>3</button>
        </div>
        
        <div className='row'>
          <button className='number' onClick={() => numberBtn(0)} id='0'>0</button>
          <button className='clear' onClick={() => document.querySelector('#product').value = ''} id='0'>RENSA</button>
        </div>

      </div>

    </div>
  );
}

export default App;
