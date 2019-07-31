/*
initialize variables
*/

let lights = [];
let userLights = [];
let flash;
let counter;
let good;
let compTurn;
let intervalId;
let sound = true;
let on = false;
let win;

/*
call HTML divs
*/
const turnCounter = document.querySelector("#counter");
const c = document.querySelector("#c");
const o = document.querySelector("#o");
const d = document.querySelector("#d");
const e = document.querySelector("#e");

const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");


/*
Power button
*/


onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "Press Start";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  lights = [];
  userLights = [];
  flash = 0;
  intervalId = 0;
  counter = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    lights.push(Math.floor(Math.random() * 4) + 1);
  }
  
  console.log(lights);
  compTurn = true;

  intervalId = setInterval(gameTurn, 700);
}

function gameTurn() {
  on = false;

  if (flash == counter) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (lights[flash] == 1) one();
      if (lights[flash] == 2) two();
      if (lights[flash] == 3) three();
      if (lights[flash] == 4) four();
      flash++;
    }, 300);
  }
}

function one() {
  if (sound) {
    let audio = document.getElementById("audio1");
    audio.play();
  }
  sound = true;
  c.style.backgroundColor = "#f2a257";
}

function two() {
  if (sound) {
    let audio = document.getElementById("audio1");
    audio.play();
  }
  sound = true;
  o.style.backgroundColor = "#f2a257";
}

function three() {
  if (sound) {
    let audio = document.getElementById("audio1");
    audio.play();
  }
  sound = true;
  d.style.backgroundColor = "#f2a257";
}

function four() {
  if (sound) {
    let audio = document.getElementById("audio1");
    audio.play();
  }
  sound = true;
  e.style.backgroundColor = "#f2a257";
}

function clearColor() {
  c.style.backgroundColor = "#ff6200";
  o.style.backgroundColor = "#ff6200";
  d.style.backgroundColor = "#ff6200";
  e.style.backgroundColor = "#ff6200";
}

function flashColor() {
  c.style.backgroundColor = "#f2a257";
  o.style.backgroundColor = "#f2a257";
  d.style.backgroundColor = "#f2a257";
  e.style.backgroundColor = "#f2a257";
}

c.addEventListener('click', (event) => {
  if (on) {
    userLights.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 700);
    }
  }
})

o.addEventListener('click', (event) => {
  if (on) {
    userLights.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 700);
    }
  }
})

d.addEventListener('click', (event) => {
  if (on) {
    userLights.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 700);
    }
  }
})

e.addEventListener('click', (event) => {
  if (on) {
    userLights.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 700);
    }
  }
})

function check() {
  if (userLights[userLights.length - 1] !== lights[userLights.length - 1])
    good = false;

  if (userLights.length == 15 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "Wrong!";
    var audio = new Audio('audio/audio2.mp3');
    audio.play();
    setTimeout(() => {
      turnCounter.innerHTML = counter;
      clearColor();

      if (good) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        userLights = [];
        good = true;
        intervalId = setInterval(gameTurn, 700);
      }
    }, 700);

    sound = false;
  }

  if (counter == userLights.length && good && !win) {
    counter++;
    userLights = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = counter;
    intervalId = setInterval(gameTurn, 700);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "Congrats!";
  on = false;
  win = true;
  alert('CONGRATS!').ok;
}





