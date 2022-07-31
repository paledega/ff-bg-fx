'use strict';

// Page Visibility API
Object.defineProperties(document.wrappedJSObject,
  { 'hidden': {value: false}, 'visibilityState': {value: 'visible'} });

// visibility event
addEventListener(
  'visibilitychange', evt => evt.stopImmediatePropagation(), true);


// resize event
addEventListener(
  'resize', evt => evt.stopImmediatePropagation(), true);

// connection events
addEventListener(
  'offline', evt => evt.stopImmediatePropagation(), true);
addEventListener(
  'online', evt => evt.stopImmediatePropagation(), true);

// cut/copy/paste event
addEventListener(
  'cut', evt => evt.stopImmediatePropagation(), true);
addEventListener(
  'copy', evt => evt.stopImmediatePropagation(), true);
addEventListener(
  'paste', evt => evt.stopImmediatePropagation(), true);

// fullscreen event
addEventListener('fullscreenchange', (event) => {
    window.fullscreen = false;
    event.stopImmediatePropagation();
});

// User activity tracking
loop(pressKey, 60 * 1000, 10 * 1000); // every minute +/- 5 seconds

// Focus event
addEventListener("focus", () => {}); 
window.onfocus = function () {  
    // dummy function
};  

// Blur event
addEventListener("blur", () => {});
window.onblur = function () {  
    // dummy function
};  

function pressKey() {
  const keyCodes = [18];
  let key = keyCodes[getRandomInt(0, keyCodes.length)];
  sendKeyEvent("keydown", key);
  sendKeyEvent("keyup", key);
}

function sendKeyEvent (aEvent, aKey) {
  document.dispatchEvent(new KeyboardEvent(aEvent, {
    bubbles: true,
    cancelable: true,
    keyCode: aKey,
    which: aKey,
  }));
}

function loop(aCallback, aDelay, aJitter) {
  let jitter = getRandomInt(-aJitter/2, aJitter/2);
  let delay = Math.max(aDelay + jitter, 0);

  window.setTimeout(() => {
                      aCallback();
                      loop(aCallback, aDelay, aJitter);
                    }, delay);
}

function getRandomInt(aMin, aMax) {
  let min = Math.ceil(aMin);
  let max = Math.floor(aMax);
  return Math.floor(Math.random() * (max - min)) + min;
}
