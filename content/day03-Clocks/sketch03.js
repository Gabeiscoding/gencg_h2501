

let centerY;
let centerX;
let angle=0
let colours= ['#FF0000', '#0000FF','#FFFF00','#008000']
let rotationSpeed;
let rotations = 0;
let isBlackColoured = true;
let circleRadius = 40;
let currentColourIndex = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background('black');
  angleMode(DEGREES);
  
  describe('A canvas with a black background. There is a white line that as it moves in a circular motion colours the area in a circle. Once the full circle is completed the line keeps moving but this time it starts colouring the area a new colour');
  
  centerY = height/2;
  centerX = width/2
  
   rotationSpeed = 360 / (60 * 60); // full rotation per minute
}

function draw(){

  translate(centerX, centerY);
  
  // Draw the colored sector as the line sweeps
  noStroke();
  fill(colours[currentColourIndex]);
  arc(0, 0, circleRadius * 2, circleRadius * 2, angle, angle + rotationSpeed);

  // Draw the rotating line
  strokeWeight(2);
  stroke(isBlackColoured ? 'white' : 'black');
  stroke(angle)
  let x = circleRadius * cos(angle);
  let y = circleRadius * sin(angle);
  line(0, 0, x, y);

  // Update the angle
  angle += rotationSpeed;

  // After completing a full circle
  if (angle >= 360) {
    angle = 0;
    rotations++;
  
   // Toggle background
    isBlackColoured = !isBlackColoured;
    background(isBlackColoured ? 'black' : 'white');
  
     // Update circle radius and fill color
    circleRadius += 10;
    currentColourIndex = (currentColourIndex + 1) % colours.length;

    // Reset circle size every 60 rotations (1 hour)
    if (rotations >= 60) {
      rotations = 0;
      circleRadius = 40;
    }
} 
  
  
  // Display the number of rotations (minutes)
  resetMatrix(); // return to screen coordinates
  fill(isBlackColoured ? 'white' : 'black');
  noStroke();
  textAlign(CENTER);
  textSize(24);
  text(`Minutes: ${rotations}`, width / 2, height - 40);
}