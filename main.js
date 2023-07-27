let myLibrary = [];

function Book(title, author, numOfPages, isRead) {
  this.title = title;
  this.author = title;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  // do stuff here
}

let isMousedown = false;
let body = document.querySelector("body");
let wrapper = document.querySelector(".wrapper");
let timesPerSecond = 60; // how many times to fire the event per second
let wait = false;

function callback(e) {
  if (isMousedown) {
    let center = { x: wrapper.offsetLeft + 250, y: wrapper.offsetTop + 250 };
    let xVector;
    let yVector;
    if (e.x > center.x) {
      xVector = Math.abs(e.x - center.x);
    } else {
      xVector = -Math.abs(e.x - center.x);
    }

    if (e.y > center.y) {
      yVector = Math.abs(e.y - center.y);
    } else {
      yVector = -Math.abs(e.y - center.y);
    }

    wrapper.style.transform = `translate(${xVector}px, ${yVector}px) scale(0.2)`;
    wrapper.style.background = "#2c0505";
    wrapper.style.borderRadius = "50%";
    wrapper.style.boxShadow = "0px 10px 35px 55px #300c0c";
    wrapper.style.border = "2px solid #9a3f3f";
    wrapper.style.fontSize = "3rem";
  }
}

body.addEventListener("mouseup", (e) => {
  isMousedown = false;
  wrapper.style.background = "#181818";
  wrapper.style.transform = "scale(1)";
  wrapper.style.borderRadius = "20px";
  wrapper.style.boxShadow = "0px 10px 15px 5px #413131";
  wrapper.style.border = "none";
  wrapper.style.fontSize = "1rem";
});

body.addEventListener("mousemove", (e) => {
  // don't handle events when one has just occurred
  if (!wait) {
    // fire the event
    callback(e);
    // stop any further events
    wait = true;
    // after a fraction of a second, allow events again
    setTimeout(function () {
      wait = false;
    }, 1000 / timesPerSecond);
  }
});

body.addEventListener("mousedown", (e) => {
  isMousedown = true;
  callback(e);
});
