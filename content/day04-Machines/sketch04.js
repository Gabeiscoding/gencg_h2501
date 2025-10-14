let angle = 0;            // rotation angle
let centerY;              // gear vertical center
let amplitude;            // how far it moves up and down
let frequency = 0.01;     // speed of vertical movement
let gearRadius = 60;      // base circle size
let numTeeth = 5;         // number of triangles

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  centerY = height / 2; // 
  amplitude = height / 3; // how high it moves up and down
}

function draw() {
  background(0);

  // Y position oscillates like a wave
  let y = centerY + sin(frameCount * frequency * 360) * amplitude;

  // Map y position to color from red (top) to orange (bottom)
  let t = map(y, 0, height, 0, 1);
  let gearColor = lerpColor(color(255, 0, 0), color(255, 165, 0), t);

  push();
  translate(width / 2, y);
  rotate(angle);

  // Draw gear base circle
  noStroke();
  fill(gearColor);
  circle(0, 0, gearRadius * 2);

  // Draw teeth (triangles)
  let outerRadius = gearRadius + 30;     // how far the teeth stick out
  let toothSpread = 30;                  // degrees between outer points of tooth

  for (let i = 0; i < numTeeth; i++) {
  let theta = i * (360 / numTeeth);
  
  // Inner point (on the circle)
  let x1 = gearRadius * cos(theta);
  let y1 = gearRadius * sin(theta);

  // Outer left and right points
  let x2 = outerRadius * cos(theta - toothSpread / 2);
  let y2 = outerRadius * sin(theta - toothSpread / 2);

  let x3 = outerRadius * cos(theta + toothSpread / 2);
  let y3 = outerRadius * sin(theta + toothSpread / 2);

  triangle(x1, y1, x2, y2, x3, y3);
  
  }

  pop();

  // Slowly increase rotation angle
  angle += 0.5;
}
