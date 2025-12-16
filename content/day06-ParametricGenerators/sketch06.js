let params = {
  faceRadius: 200,
  eyeDistance: 80,
  eyeSize: 40,
  mouthWidth: 100,
  mouthHeight: 20,
  numEyes: 2,       // discrete
  hasPiercing: true // discrete
};

function setup() {
  createCanvas(600, 600);
  noStroke();
  ellipseMode(CENTER);
}

function draw() {
  background(10);
  
  // Time-driven blinking parameter
  let t = millis() * 0.002;
  let blink = abs(sin(t)); // 0–1 cycle
  let eyeOpen = map(blink, 0, 1, 0.1, 1); // control openness
  
  translate(width / 2, height / 2);
  
  // Draw face light
  fill(50, 30, 10, 80);
  ellipse(0, 0, params.faceRadius * 2);
  
  // Eye color brightness modulated by blink
  let eyeBrightness = map(eyeOpen, 0, 1, 20, 255);
  fill(0, 150, 255, eyeBrightness);
  
  if (params.numEyes === 1) {
    drawEye(0, -params.faceRadius / 4, params.eyeSize, eyeOpen);
  } else if (params.numEyes === 2) {
    drawEye(-params.eyeDistance / 2, -params.faceRadius / 4, params.eyeSize, eyeOpen);
    drawEye(params.eyeDistance / 2, -params.faceRadius / 4, params.eyeSize, eyeOpen);
  } else if (params.numEyes === 3) {
    drawEye(-params.eyeDistance, -params.faceRadius / 4, params.eyeSize, eyeOpen);
    drawEye(0, -params.faceRadius / 4, params.eyeSize, eyeOpen);
    drawEye(params.eyeDistance, -params.faceRadius / 4, params.eyeSize, eyeOpen);
  }
  
  // Mouth light
  fill(255, 80, 80, 180);
  ellipse(0, params.faceRadius / 4, params.mouthWidth, params.mouthHeight * eyeOpen);
  
  // Optional piercing
  /* if (params.hasPiercing) {
    fill(255, 255, 100, 200);
    ellipse(-params.faceRadius / 4, -params.faceRadius / 2.2, 10);
  } */
}

function drawEye(x, y, r, openFactor) {
  push();
  translate(x, y);
  // simulate blinking: height scales by openFactor
  ellipse(0, 0, r, r * openFactor);
  pop();
}
