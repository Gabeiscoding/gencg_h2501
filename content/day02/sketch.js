const COLS = 10;
const ROWS = 10;
const CELL_SIZE = 40;
const TOTAL_CELLS = COLS * ROWS;
const ANIMATION_SPEED = 10; // How many frames each ROW stays lit

// Circle properties
const MAX_DIAMETER = CELL_SIZE * 0.8; // Max circle is 80% of the cell size
const MIN_DIAMETER = CELL_SIZE * 0.2; // Min circle is 20% of the cell size

function setup() {
  // 1. Center the canvas on the webpage
  let canvas = createCanvas(COLS * CELL_SIZE, ROWS * CELL_SIZE);
  canvas.center();
  
  // Set color mode to HSB for easier, continuous color cycling
  colorMode(HSB, 360, 100, 100); 
  stroke(0); // Black outlines for grid
  strokeWeight(1);
}

function draw() {
  background(220); 

  // --- Animation Logic ---

  // Calculate which ROW is currently "active" (0 to 9)
  let activeRow = floor((frameCount / ANIMATION_SPEED) % ROWS);

  // Calculate the constantly changing color (Hue cycles 0-360)
  let hue = (frameCount * 2) % 360; 
  let saturation = 90;
  let brightness = 90;
  
  // Calculate the scaling factor based on the active row index.
  // The 'map' function takes a value (activeRow, which goes 0 to ROWS-1) 
  // and converts it to a new range (MAX_DIAMETER down to MIN_DIAMETER).
  let currentDiameter = map(activeRow, 
                            0, ROWS - 1,   // Input range (Row Index)
                            MAX_DIAMETER, MIN_DIAMETER // Output range (Circle Size)
                           );

  // --- Grid Drawing ---
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let x = j * CELL_SIZE;
      let y = i * CELL_SIZE;
      
      // Draw the rectangle outline for every cell
      noFill(); 
      rect(x, y, CELL_SIZE, CELL_SIZE);
      
      // 2. Check if the current row (i) is the active row
      if (i === activeRow) {
        
        // --- Draw the Circle ---
        
        // Set the color for the active row of circles
        noStroke(); 
        fill(hue, saturation, brightness); 
        
        // Calculate the center point for the circle in the current cell
        let centerX = x + CELL_SIZE / 2;
        let centerY = y + CELL_SIZE / 2;
        
        // Draw the circle using the calculated diameter for the active row
        ellipse(centerX, centerY, currentDiameter, currentDiameter);
      }
    }
  }
}