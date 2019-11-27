var w, h;
var tg1_bumper, tg1_new, tg1_svg;
var play = 0, playB;
var myFrames = 0;

function preload() {
  tg1_bumper = loadSound('assets/TG1_bumper.mp3');
  tg1_new = loadSound('assets/TG1_new.mp3');
  tg1_svg = loadImage('assets/TG1.svg'); //#013068
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playB = createButton('Play');
  playB.mousePressed(playF);

  tg1_bumper.onended(endF);
  reverb = new p5.Reverb();
  reverb.process(tg1_bumper, 2, 4);
  fft = new p5.FFT();
  amp = new p5.Amplitude();
}

function draw() {
  w = width;
  h = height;
  background('#0000ff');
  noFill();
  noStroke();

  //WAVEFORM
  noFill();
  stroke(255);
  strokeWeight(w*.0025);
  var waveform = fft.waveform();
  beginShape();
  for (var i = 0; i < waveform.length; i += 5) {
    let x = map(i, 0, waveform.length, -w, w);
    let y = map(waveform[i], -6, 6, 0, h);
    curveVertex(x, y);
  }
  endShape();

  //ELLIPSES
  var level = amp.getLevel();
  var size = map(level, 0, 1, 0, w/50);
  ellipseMode(CENTER);
  fill(255, 120);
  noStroke();
  for (var i = 0; i < w; i += w/33) {
    for (var j = 0; j < h; j += w/33) {
      ellipse(i, j-8, w/400 + random(1,7)*size);
    }
  }

  //MAIN
  if (play==0) {
    myFrames = 0;
    playB.show();
  }
  if (play==1) {
    myFrames += .001;
    playB.hide();
    imageMode(CENTER);
    logo = image(tg1_svg, w/2, h/2, 747*(w/1000)*myFrames, 529*(w/1000)*myFrames);
  }

  //FRAME
  noFill();
  rectMode(CENTER);
  stroke(60);
  strokeWeight(100);
  rect(w/2, h/2, w, h, 80);
  stroke(40);
  strokeWeight(80);
  rect(w/2, h/2, w, h, 80);
}

function playF() {
  play = 1;
  tg1_bumper.play();
}

function endF() {
  play = 0;
  select('button').html('More');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
