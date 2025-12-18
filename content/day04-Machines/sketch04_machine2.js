// Piston Movement and Color Cycling Animation

// State variables for the animation
let pistonLength = 0;
const pistonSpeed = 3;
const pistonHeight = 80;

// 1: Orange Background, Purple Pistons
// 2: Purple Background, Orange Pistons
let stage = 1; 

// Define colors
const COLOR_ORANGE = '#FF9933';
const COLOR_PURPLE = '#6A0DAD';

function setup() {
  // Create a canvas that fills a good portion of the window
  createCanvas(windowWidth, windowHeight);
  // Set the rectangle drawing mode to CORNER (default)
  rectMode(CORNER);
  // Ensure we start with no stroke on the shapes
  noStroke();
}

function draw() {
  // --- 1. SET ENVIRONMENT BASED ON STAGE ---
  if (stage === 1) {
    // Stage 1: Orange background, Purple pistons
    background(COLOR_ORANGE);
    fill(COLOR_PURPLE);
  } else {
    // Stage 2: Purple background, Orange pistons
    background(COLOR_PURPLE);
    fill(COLOR_ORANGE);
  }

  // --- 2. DRAW PISTONS ---
  
  // Center the pistons vertically
  const yPos = height / 2 - pistonHeight / 2;

  // Piston 1 (Left Piston)
  // Starts at x=0 and grows right
  rect(0, yPos, pistonLength, pistonHeight);

  // Piston 2 (Right Piston)
  // Starts at width - pistonLength and grows left
  rect(width - pistonLength, yPos, pistonLength, pistonHeight);
  
  // --- 3. UPDATE LENGTH AND CHECK COLLISION ---
  
  // The length of the pistons grows constantly
  pistonLength += pistonSpeed;

  // Collision Check: The two pistons touch when their combined length 
  // (pistonLength * 2) is greater than or equal to the screen width.
  if (pistonLength * 2 >= width) {
    // Collision detected! Time to reset and switch the stage.
    
    // Reset the length to 0 to make the new pistons start growing from the edges
    pistonLength = 0;
    
    // Toggle the stage (1 becomes 2, 2 becomes 1)
    if (stage === 1) {
      stage = 2;
    } else {
      stage = 1;
    }
    
    // Optional: Slow down the frame rate briefly to emphasize the "reset" moment
    // frameRate(10); 
    // frameRate(60); // Resume normal speed after a short delay, though a simple stage switch works well too
  }
}