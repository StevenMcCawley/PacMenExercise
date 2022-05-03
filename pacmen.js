var pos = 0;
const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];
var direction = 0; //0 -> moving right, 1 -> moving left
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(window.innerWidth);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newImg = document.createElement("img");
  newImg.style.position = "absolute";
  newImg.src = pacArray[direction][0];
  newImg.width = 100;
  //
  // set position here
  //
  newImg.style.left = position.x;
  newImg.style.top = position.y;

  let waka = true;

  // add new Child image to game
  game.appendChild(newImg);

  // return details in an object
  return { position, velocity, direction, waka, newImg };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newImg.style.left = item.position.x;
    item.newImg.style.top = item.position.y;

    //update image src

    if (item.newImg.src === pacArray[item.direction][0])
      item.newImg.src = pacArray[item.direction][1];
    else item.newImg.src = pacArray[item.direction][0];

    if (item.waka) item.newImg.src = pacArray[item.direction][0];
    else item.newImg.src = pacArray[item.direction][1];

    item.waka = !item.waka;
  });
  setTimeout(update, 100);
}

function setDisable() {
  var button = document.getElementById("playBtn");
  button.disabled = true;
}

function checkCollisions(item) {
  //
  // detect collision with all walls and make pacman bounce
  //
  if (
    item.position.x + item.velocity.x + item.newImg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x *= -1;

    if (item.direction == 0) item.direction = 1;
    else item.direction = 0;
  }

  if (
    item.position.y + item.velocity.y + item.newImg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y *= -1;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
