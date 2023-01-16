import data from '../data.js';

let recordSequence = [];
let recordSession = [];

let container = document.querySelector(".app__container");
let startApp = document.querySelector(".app__start");

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement == null) {
    container.style.width = "0";
    container.style.height = "0";
    container.innerHTML = '';
  } else {
    container.style.width = "auto";
    container.style.height = "auto";
  }
});

startApp.addEventListener('click', () => {
  openFullscreen();
  createDrumPad(data);
  createPlayer();
});

function openFullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  }
}

function createDrumPad(data) {
  let templatePad = `<div class="app__pad">`;
	data.forEach((data) => {
		templatePad += `<div class="app__pad__button ${data.type}" data-name="${data.name}" data-type="${data.type}"></div>`;
	});
  templatePad += `</div>`;
  container.innerHTML += templatePad;
}

function createPlayer() {
  let templatePlayer = `<div class="app__pad__player"><button class="play">Play</button></div>`;
  container.innerHTML += templatePlayer;
}

function removePressClass() {
  document.querySelectorAll('[data-name]').forEach((button) => {
    button.classList.remove('pressed');
  })
}

container.addEventListener('click', (e) => {
  if(e.target.classList.contains('app__pad__button')) {
    let audioFileName = e.target.dataset.name;
    let audioSample = new Audio('./sounds/' + audioFileName + '.webm');
    audioSample.play(); 
    recordSequence.push(audioFileName);
  } else if (e.target.classList.contains('play')) {
    let speed = 0;
    recordSequence.forEach((audioFileName, index, array) => {
      setTimeout(() => {
        removePressClass();
        document.querySelector('[data-name="'+ audioFileName +'"]').classList.add('pressed');
        let audioSample = new Audio('./sounds/' + audioFileName + '.webm');
        audioSample.play();
      }, speed);
      speed += 500;
      if (index === array.length - 1){ 
        removePressClass();
      }
    })
  }
});

container.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('app__pad__button')) {
    e.target.classList.add('pressed')
  }
})

container.addEventListener('mouseup', (e) => {
  if(e.target.classList.contains('app__pad__button')) {
    e.target.classList.remove('pressed')
  }
})