// background.js

// Default voice and speed options
let voice = "Matthew";
let speed = "medium";
let audioUrl =
  "https://mimid-polly-bucket.s3.us-west-2.amazonaws.com/mimidIntro.mp3";

// When first installing this extension set some varibles in storage to be
// accessable at the user level
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    { voice: voice, speed: speed, audioUrl: audioUrl },
    () => {
      console.log(`Default voice set to ${voice}`);
      console.log(`Default speed set to ${speed}`);
    }
  );
});
