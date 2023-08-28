const TWENTY_FIVE_MINUTES = 1000 * 60 * 25;
const FIFTEEN_MINUTES = 1000 * 60 * 15;
const TEN_MINUTES = 1000 * 60 * 10;
/* const TWENTY_FIVE_MINUTES = 100 * 25;
const FIFTEEN_MINUTES = 100 * 15;
const TEN_MINUTES = 100 * 10; */
const PERIOD = 4;
const audio = new Audio("sound.mp3");

let play = false;
let timeout1 = 0;
let timeout2 = 0;
let timeout3 = 0;

function alertSound(time, timeoutId) {
  return new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      audio.play();
      resolve();
    }, time);
  });
}

async function timer(times) {
  if (!play) {
    return;
  }
  await alertSound(TWENTY_FIVE_MINUTES, timeout1);
  if (times === PERIOD) {
    await alertSound(TEN_MINUTES, timeout2);
  } else {
    await alertSound(FIFTEEN_MINUTES, timeout3);
  }
  timer(times + 1);
}

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("btn-pomodoro-start");
  const text = document.getElementById("text");
  startButton.addEventListener("click", () => {
    if (!play) {
      play = true;
      text.innerHTML = "Started!!!";
      timer(1);
    }
  });

  const stopButton = document.getElementById("btn-pomodoro-stop");
  stopButton.addEventListener("click", () => {
    play = false;
    text.innerHTML = "Stopped!!!";
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);
  });
});
