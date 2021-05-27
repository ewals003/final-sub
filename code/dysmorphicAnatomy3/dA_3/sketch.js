//image set up
let img;
let img2;
let img3;

//audio set up
let audio

// values to manipulate the images
let posX, posY;
let cnv;
let c;
let cut;
let slice;

//offset
let x = 0;

let organs = [];

function preload() {
  //image preload
  //multiple versions of the same image add movement and lead to a flickering effect
  img = loadImage('assets/body.png');
  img2 = loadImage('assets/body2.png');
  img3 = loadImage('assets/body3.png');

  //cut into the body
  slice = loadImage('assets/slice.png');

  //images of the organs to fall from the slice
  organs[0] = loadImage('assets/maybe/brain.png');
  organs[1] = loadImage('assets/maybe/eye.png');
  organs[2] = loadImage('assets/maybe/heart.png');
  organs[3] = loadImage('assets/maybe/reproductiveS.png');
  organs[4] = loadImage('assets/maybe/stomach.png');
  organs[5] = loadImage('assets/maybe/tongue.png');

  //audio
  audio = loadSound('assets/Third.mp3');
}

function setup() {

  createCanvas(img.width, img.height);

  //font setup
  textFont('Georgia');
  audio.play();

}

function draw() {


  background(200);

  //the y axis of the slice will expand with the framecount to animate it
  cut = 87 + frameCount;

  //stops the expansion of the cut at 601
  if (cut >= 600) {
    cut = 601;
  }
  x += 0.2

  //creates the flickering of the body images
  if (random(3) >= 2) {
    image(img2, 0, 0)
  } else {
    image(img3, 0, 0);
  }

  //after the framecount has gone on for 900 counts the dysmorphia class with be called
  if (frameCount >= 900) {
    dysmorphia();
  }

  //call the slice
  image(slice, 391, 87, 50, cut)

  //call the gutting class
  if (frameCount >= 750) {
    gutting();
  }

  //the piece title will apear in order to create an end to the piece
  if (frameCount >= 910) {
    push();
    textSize(40);
    fill(0);
    text('D Y S M O R P H I C  A N A T O M Y', 70, height / 2);

    pop();
  }




}

function dysmorphia() {

  //dysmorphia class will warp the image of the body by turning it into curves ade through the pixel colours 

  //small value to reduce lag
  let value = random(5);

  //new value to control the curves
  let newValue = map(value, 0, 255, 10, 100);

  for (let gridX = 0; gridX < img.width; gridX += newValue) {
    for (let gridY = 0; gridY < img.height; gridY += newValue) {

      push();

      //get the area of image
      let tileX = width / img.width;
      let tileY = height / img.height;
      posX = tileX * gridX;
      posY = tileY * gridY;

      //get color
      c = img.get(posX, posY);
      stroke(color(c));
      //changes the position and direction of the curve 
      translate(posX, posY);
      rotate(radians(random(360)))
      noFill();
      //variation in stroke weight
      strokeWeight(map(sin(posX), 0, 1, 1.2, 5));

      //curve is related to previous values that create the effect
      curve(random(80), cos(posY) * random(150), sin(posX) * 50, cos(posY) * sin(posX) * 40, 0, 0, cos(posY) * sin(posX) * 40, cos(posY) * sin(posX) * 50)

      pop();


    }
  }
}

function gutting() {
  //gutting class cause the organs from dA_1 to fall from the slice
  for (let i = 0; i < organs.length; i++) {
    //organs are stored in an array
    let fall = i + 1;
    let fall2 = x += 1;
    //delayed fall 
    image(organs[i], random(380, 385), fall2 * fall, 100, 100);
  }
}
