'use strict';

//Eyes blinking
var moveEye = function moveEye(elem, width, height) {
  var delay = arguments.length <= 3 || arguments[3] === undefined ? 1000 : arguments[3];

  Velocity(elem, {
    rx: width,
    ry: height
  }, {
    duration: 0.1,
    delay: delay,
    easing: 'linear'
  });
};

//Fish movement
var moveFish = function moveFish(elem, moveBy, initialPos, btn) {
  var bool = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

  Velocity(elem, {
    translateX: [moveBy, initialPos]
  }, {
    duration: 5000,
    easing: 'linear',
    complete: function complete() {
      if (bool) {
        btn.disabled = false;
      }
    }
  });
};

//Fish turning around
var rotateFish = function rotateFish(elem, moveBy) {
  Velocity(elem, {
    rotateY: moveBy,
    transformOriginX: '50%',
    transformOriginY: '50%'
  }, {
    duration: 500,
    easing: [.26, 1, .49, 0]
  });
};

//Caching elements for animation
var bubbles = document.querySelectorAll('.bubble'),
    fish = document.querySelector('.fish'),
    eyePupil = document.querySelector('.eye-pupil'),
    eye = document.querySelector('.front-eye'),
    btnPlay = document.querySelector('.btn-play');

//Bubbles animation
Velocity(bubbles, {
  cx: '+=30',
  cy: '+=30',
  rx: 3,
  ry: 2,
  opacity: 0
}, {
  loop: true,
  easing: 'linear',
  duration: 2000
});

//Using requestAnimationFrame() for the looping blinking eye animation
var eyeMoveTimer = undefined;

var eyeMove = function eyeMove(timestamp) {
  //close eye
  moveEye(eyePupil, 0, 0, 5000);
  moveEye(eye, 30, 2, 5000);
  //open eye
  moveEye(eyePupil, 15, 15);
  moveEye(eye, 50, 50);

  eyeMoveTimer = requestAnimationFrame(eyeMove);
};

//Set the blinking in motion
eyeMove();

/*fish movement animation */
var play = function play() {
  moveFish(fish, '-1000', 0, btnPlay);
  rotateFish(fish, '180deg');
  moveFish(fish, 0, '-1000', btnPlay, true);
  rotateFish(fish, '0deg');
};

btnPlay.addEventListener('click', function () {
  this.disabled = true;
  play();
});