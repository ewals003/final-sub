//array set upp
const flow = [];
const race = [];

//object set up
let path;
let Wave;
let angle = 100;
let angle2 = 200;
let panic = false;
let seconds;

//image set up
let brainImg;
let eyeImg;
let eyelidImg
let tongueImg;
let heartImg;
let stomachImg;
let reproductiveSImg;
let writing;

//sound set up
let audio


function preload() {
	//organ image set up
	brainImg = loadImage('assets/brain.png');
	eyeImg = loadImage('assets/eye.png');
	eyelidImg = loadImage('assets/eyelid.png');
	tongueImg = loadImage('assets/tongue.png');
	heartImg = loadImage('assets/heart.png');
	stomachImg = loadImage('assets/stomach.png');
	reproductiveSImg = loadImage('assets/reproductiveS.png');
	//text image
	writing = loadImage('assets/text.png');

	//audio 
	audio = loadSound('assets/First.mp3');
}

function setup() {
	createCanvas(2000, 3000);
	frameRate(60); // just to prevent the sketch from any lag

	//start point aprox the area of the brain
	let startX = width / 2;
	let startY = height / 8;

	path = new bloodFlow(); //call path in which the cells will flow

	//call the main cells
	for (let i = 0; i < 100; i++) {
		flow[i] = new brainWave(random(300, 700), random(50, 450));
	}
	//call anxiety
	for (let j = 0; j < 600; j++) {
		race[j] = new brainWave(random(200, 800), random(0, 650));
	}
	//points will follow a path through and around the organs 
	//path start
	path.addPoint(545, 259);
	path.addPoint(749, 425);
	path.addPoint(700, 580);
	path.addPoint(957, 1206);
	path.addPoint(496, 1573);
	path.addPoint(700, 2500);
	// path end
	//audio.resume();
	audio.play();
}

function draw() {

	rectMode(CENTER);
	background(255); //simiple white background


	//objects/organs
	brain(); // draw brain
	eyes(500); //draw eye 1
	eyes(800); // draw eye 2
	tongue(); //draw tongue
	heart(); //draw heart
	reproductive_S(); //draw reproductive system
	stomach(); //draw stomach


	//flow function
	path.display();

	//call the functions of the brainwave class
	for (let i = 0; i < 100; i++) {
		flow[i].flowing(path);
		flow[i].update();
		flow[i].show();
	}
	if (frameCount >= 1000) {
		for (let j = 0; j < 100; j++) {
			race[j].flowing(path);
			race[j].update();
			race[j].show();
		}

		if (frameCount >= 1500) {
			for (let j = 0; j < 500; j++) {
				race[j].flowing(path);
				race[j].update();
				race[j].show();
			}
		}
	}


	//text image drawn last
	image(writing, 0, 0, width, height);

	// use to find the points for the path
	/*
	push();
	fill(255);
	text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
	stroke(0);
	pop();
	*/

}

//below give every organ a seperate function to make draw and set up easier to navigate
function brain() {
	//previously used simple shapes to feel out the area for the organs
	//	noStroke();
	//	fill(0, 0, 0);
	image(brainImg, 500, 75);

}


function eyes(eyePos_x) {


	//use if statement in order to create blinking eyes
	if (random(70) < 68) {
		//		noStroke();
		//		fill(0);
		image(eyeImg, eyePos_x, 600);
	} else {

		//		noStroke();
		//		fill(0);
		image(eyelidImg, eyePos_x, 600);
	}
}

function tongue() {

	//tongue
	//make tongue convulse as if gagging
	let a = 5
	if (random(70) < 68 && frameCount > 400) {
		a = 50
	}
	let t = randomGaussian(300, a);
	image(tongueImg, 650, 850, 230, t);
}

function heart() {

	//make the heart beat
	let x = map(sin(angle), -1, 1, 3, 100);
	let y = map(cos(angle), -1, 2, 0, 100);

	image(heartImg, 750, 1150, 300 + x, 500 + y);

	//increase heart rate as sketch continues
	angle += 0.2;
	if (frameCount >= 700) {
		angle += 0.35;
	}
	if (frameCount >= 1400) {
		angle += 0.5
	}

}


function stomach() {

	//map function will allow for looping numbers but using tan will create dramatic drop off points that with make the image dramatically stetch 
	let y = map(tan(angle2), -1, 1, 0, 10);
	let x = map(cos(angle2), -1, 2, 3, 20);
	image(stomachImg, 400, 1700, 500 - x, 600 - y);

	//control speed of movement
	angle2 -= 0.01;

	//increase the speed
	if (frameCount >= 1600) {
		angle2 -= 0.5
	}
}

function reproductive_S() {
	//base numbers
	let a = 2000,
		b = 1000,
		c = 300;
	//loop and calculations to create repeating images 
	if (frameCount >= 700) {
		for (i = 0; i < c;) {

			image(reproductiveSImg, c % (b * 2 - i++), 2250, (b % -i), b / i);

		}
		//starts with a normal image
	} else {
		image(reproductiveSImg, 250, 2200)
	}

}
