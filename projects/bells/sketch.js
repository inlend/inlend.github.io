var img;
let n6_2;

function preload() {
  n6_2 = loadImage("img/6-2.gif");
}

function setup() {
  createCanvas(500, 500);
  background(0);
}

function draw() {
  
  // img.position(50, 350);
  image(n6_2, 0, 0, 500, 500);
}


