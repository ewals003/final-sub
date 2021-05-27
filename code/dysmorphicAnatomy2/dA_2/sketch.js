//set up the array that will hold all the objects
let mindBreak = [];
//set up varriables
let ang = 0;
let brain;
let eye;
let audio

function preload() {
    //load images
    brain = loadImage("assets/brain.png");
    eye = loadImage("assets/eyeball.png");
    audio = loadSound("assets/Second.mp3");
}

function setup() {
    createCanvas(1000, 1000, WEBGL);
    background(255);
    angleMode(DEGREES);
    frameRate(40);

    //the plane that will become the brain done in set up so as to not refresh
    push();
    rotateZ(180)
    texture(brain);
    noStroke();
    plane(400, -350);
    pop();

    audio.play();
}

function draw() {
    //push the lines into the mindbreak array
    let q = map(sin(ang), -1, 0, 1, 50);

    push();
    for (let i = 0; i < mindBreak.length; i += 4) {
        mindBreak[i].update();
    }
    //call insane class
    insane();
    pop();

    push();
    //rotate so iris facess front and texture seam is hidden
    rotateY(178);
    noStroke();
    texture(eye);
    //translate eye to position
    translate(100, 100);
    rotateX(-q);
    sphere(50);
    pop();
    push();
    //rotate so iris facess front and texture seam is hidden
    rotateY(178);

    noStroke();
    texture(eye);
    //translate eye to position
    translate(-100, 100);
    rotateX(-q);
    sphere(50);
    pop();
}

function insane() {
    ang++;
    //control the length of the lines
    let l = random(1, 20);
    let m = random(1, 10);

    //push these values to mindbreak array
    let pq = new spread(0, 0, l, m);
    mindBreak.push(pq);

}


//the spread class controls the speed, size, and movement of the black lines
class spread {
    constructor(val, l, m, speedx, speedy) {
        this.x = val;
        this.y = val;
        this.l = l;
        this.m = m;
    }
    update() {

        //control the spread of the lines
        strokeWeight(3);
        stroke(0, ang / 2);
        ellipse(this.x, this.y, this.l, this.m);
        this.x = this.x + random(-10, 10);
        this.y = this.y + random(-10, 10);
    }
}
