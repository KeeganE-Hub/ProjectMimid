// options.js

let voiceOptionsDiv = document.getElementById("voiceOptionsDiv");
let speedOptionsDiv = document.getElementById("speedOptionsDiv");

let selectedClassName = "current";
const voiceOptions = [
  "Matthew",
  "Olivia",
  "Amy",
  "Emma",
  "Brian",
  "Aria",
  "Joanna",
  "Kendra",
  "Kimberly",
  "Salli",
  "Joey",
];
const speedOptions = ["x-slow", "slow", "medium", "fast", "x-fast"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleVoiceButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let voice = event.target.dataset.voice;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ voice: voice });
}

function handleSpeedButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let speed = event.target.dataset.speed;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ speed: speed });
}

// Add a button to the page for each supplied color
function constructVoiceOptions(voiceOptions) {
  chrome.storage.sync.get("voice", (data) => {
    let currentVoice = data.voice;
    // For each color we were provided…
    for (let voice of voiceOptions) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.voice = voice;
      button.innerHTML = voice;

      // …mark the currently selected color…
      if (voice === currentVoice) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleVoiceButtonClick);
      voiceOptionsDiv.appendChild(button);
    }
  });
}

// Add a button for each speedOption
function constructSpeedOptions(speedOptions) {
  chrome.storage.sync.get("speed", (data) => {
    let currentSpeed = data.speed;
    // For each speed of our speed options
    for (let speed of speedOptions) {
      // create a button with that speed
      let button = document.createElement("button");
      button.dataset.speed = speed;
      button.innerHTML = speed;

      if (speed === currentSpeed) {
        button.classList.add(selectedClassName);
      }

      // ...and register a listener for when that button is clicked
      button.addEventListener("click", handleSpeedButtonClick);
      speedOptionsDiv.appendChild(button);
    }
  });
}

// Initialize the page divs by constructing the voice and speed options
constructVoiceOptions(voiceOptions);
constructSpeedOptions(speedOptions);
