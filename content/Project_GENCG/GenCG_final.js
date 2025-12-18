// Define the size of the "pixels" for the effect
const PIXEL_SIZE = 12;

// Define the start and end colors for the gradient
const C1 = [158, 43, 204]; // Center Color (Purple)
const C2 = [0, 0, 0];       // Outer Color (Black)

// Layers and Objects
let bgLayer;
let stars = [];
let comets = []; // Array to hold comets

// --- NEW FEATURE ARRAYS ---
let explosions = []; // Array to hold SupernovaExplosion objects
let cursorTrail = []; // Array to hold cursor trail segments

// --- SUPERNOVA CLASS (NEW) ---
class SupernovaExplosion {
    constructor(x, y) {
        // Center of the explosion
        this.x = x;
        this.y = y;
        // The effect starts as a small point
        this.currentRadius = 0;
        // The maximum radius the ripple will reach before disappearing
        this.maxRadius = max(width, height) * 0.4; // 40% of the screen diagonal
        // How fast the ripple expands
        this.speed = 4;
        // Initial opacity (will fade out)
        this.alpha = 255;
    }

    update() {
        if (this.alpha <= 0) return; // Stop updating if faded out

        // 1. Expand the ripple
        this.currentRadius += this.speed;

        // 2. Fade the opacity based on radius
        // Use a non-linear fade for a better effect: faster fade at the end
        let normDist = map(this.currentRadius, 0, this.maxRadius, 0, 1);
        this.alpha = map(normDist, 0, 1, 255, 0);

        // Ensure alpha doesn't drop below zero
        this.alpha = constrain(this.alpha, 0, 255);
    }

    display() {
        if (this.alpha <= 0) return;

        noFill();
        strokeWeight(PIXEL_SIZE / 2); // Make the line the size of half a pixel block
        // Color: Yellow/Orange with fading alpha
        stroke(255, 165, 0, this.alpha);

        // Draw the ring/ripple
        ellipse(this.x, this.y, this.currentRadius * 2, this.currentRadius * 2);

        // Also draw the central burst (a bright square that fades quickly)
        fill(255, 200, 100, this.alpha);
        rect(this.x - PIXEL_SIZE/2, this.y - PIXEL_SIZE/2, PIXEL_SIZE, PIXEL_SIZE);
    }

    isFinished() {
        return this.alpha <= 0;
    }
}


// --- SETUP & MAIN FUNCTIONS ---

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Animation settings
    noStroke();
    colorMode(RGB);

    // --- 1. PREPARE THE BACKGROUND LAYER ---
    bgLayer = createGraphics(windowWidth, windowHeight);
    bgLayer.noStroke();

    // Draw Gradient once
    const cx = width / 2;
    const cy = height / 2;
    const maxDistance = dist(cx, cy, 0, 0);

    for (let x = 0; x < width; x += PIXEL_SIZE) {
        for (let y = 0; y < height; y += PIXEL_SIZE) {

            const blockX = x + PIXEL_SIZE / 2;
            const blockY = y + PIXEL_SIZE / 2;
            const d = dist(blockX, blockY, cx, cy);
            const normDist = constrain(d / maxDistance, 0, 1);

            const r = lerp(C1[0], C2[0], normDist);
            const g = lerp(C1[1], C2[1], normDist);
            const b = lerp(C1[2], C2[2], normDist);

            bgLayer.fill(r, g, b);
            bgLayer.rect(x, y, PIXEL_SIZE, PIXEL_SIZE);
        }
    }

    // --- 2. INITIALIZE OBJECTS ---
    stars = [];
    comets = [];

    const totalBlocks = (width / PIXEL_SIZE) * (height / PIXEL_SIZE);
    let numStars = floor(totalBlocks / 100);

    for(let i = 0; i < numStars; i++) {
        stars.push(createStar());
    }

    let numComets = floor((width * height) / 200000);
    numComets = constrain(numComets, 1, 3);

    for(let i = 0; i < numComets; i++) {
        comets.push(new Comet());
    }

    // Reset interaction objects on setup/resize
    explosions = [];
    cursorTrail = [];

    describe('Flashing stars and comets on a pixellated, radially-graded night sky. User clicks trigger a supernova ripple effect, and the cursor leaves a light blue trail.');
}

function draw() {
    // 1. Draw Background
    image(bgLayer, 0, 0);

    // 2. Draw Stars
    for (let star of stars) {
        updateAndDrawStar(star);
    }

    // 3. Draw Comets
    for (let comet of comets) {
        comet.update();
        comet.display();
    }

    // --- NEW FEATURE DRAWING ---

    // 4. Update and Draw Explosions
    for (let i = explosions.length - 1; i >= 0; i--) {
        explosions[i].update();
        explosions[i].display();
        if (explosions[i].isFinished()) {
            explosions.splice(i, 1); // Remove finished explosion
        }
    }

    // 5. Update and Draw Cursor Trail
    updateAndDrawCursorTrail();
}


// --- INTERACTION FUNCTIONS (NEW) ---

function mouseClicked() {
    // 1. Determine the center of the pixel block that was clicked
    let blockX = floor(mouseX / PIXEL_SIZE) * PIXEL_SIZE + PIXEL_SIZE / 2;
    let blockY = floor(mouseY / PIXEL_SIZE) * PIXEL_SIZE + PIXEL_SIZE / 2;

    // 2. Create a new explosion at that location
    explosions.push(new SupernovaExplosion(blockX, blockY));
}

function updateAndDrawCursorTrail() {
    // 1. Add current mouse position to the trail history
    // We only want to track movement within the pixel grid for a pixellated look
    let trailX = floor(mouseX / PIXEL_SIZE) * PIXEL_SIZE;
    let trailY = floor(mouseY / PIXEL_SIZE) * PIXEL_SIZE;

    // Only add a new segment if the mouse has moved to a new 'pixel block'
    if (cursorTrail.length === 0 || 
        cursorTrail[cursorTrail.length - 1].x !== trailX || 
        cursorTrail[cursorTrail.length - 1].y !== trailY) {
            
        cursorTrail.push({ x: trailX, y: trailY, alpha: 150 }); // Start with alpha 150
    }


    // 2. Fade and Draw the trail
    for (let i = cursorTrail.length - 1; i >= 0; i--) {
        let segment = cursorTrail[i];

        // Fade out
        segment.alpha -= 8; // Adjust this value for faster/slower fade

        if (segment.alpha <= 0) {
            cursorTrail.splice(i, 1); // Remove if fully faded
        } else {
            // Draw segment
            noStroke();
            // Very light blue with fading alpha
            fill(173, 216, 230, segment.alpha); 
            rect(segment.x, segment.y, PIXEL_SIZE, PIXEL_SIZE);
        }
    }

    // 3. Limit total trail length (optional, for performance/look)
    if (cursorTrail.length > 30) { 
        cursorTrail.shift(); // Remove the oldest segment
    }
}


// --- STAR FUNCTIONS (UNCHANGED) ---
function createStar() {
    let col = floor(random(width / PIXEL_SIZE));
    let row = floor(random(height / PIXEL_SIZE));
    return {
        x: col * PIXEL_SIZE,
        y: row * PIXEL_SIZE,
        timer: random(0, 100),
        speed: random(0.02, 0.08),
        maxSizeMultiplier: random(0.4, 1.0)
    };
}

function updateAndDrawStar(star) {
    star.timer += star.speed;
    let val = sin(star.timer);
    let currentScale = map(val, -1, 1, 0, star.maxSizeMultiplier);
    if (currentScale < 0) currentScale = 0;

    let size = PIXEL_SIZE * currentScale;
    let offset = (PIXEL_SIZE - size) / 2;

    fill(255);
    rect(star.x + offset, star.y + offset, size, size);
}

// --- COMET CLASS (UNCHANGED) ---
class Comet {
    constructor() {
        this.reset();
        this.delayTimer = random(0, 200);
    }

    reset() {
        if (random() > 0.5) {
            this.x = random(width / 2, width);
            this.y = -50;
        } else {
            this.x = width + 50;
            this.y = random(0, height / 2);
        }

        this.speed = random(6, 12);
        this.history = [];
        this.active = true;
    }

    update() {
        if (this.delayTimer > 0) {
            this.delayTimer--;
            return;
        }

        this.x -= this.speed;
        this.y += this.speed;

        this.history.push({x: this.x, y: this.y});

        if (this.history.length > 15) {
            this.history.shift();
        }

        if (this.x < -100 || this.y > height + 100) {
            this.reset();
            this.delayTimer = random(100, 300);
            this.history = [];
        }
    }

    display() {
        if (this.delayTimer > 0) return;

        // 1. Draw Tail (Blue)
        noStroke();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            let tailSize = map(i, 0, this.history.length, 2, PIXEL_SIZE);
            fill(100, 100, 255);
            rect(pos.x, pos.y, tailSize, tailSize);
        }

        // 2. Draw Head (White)
        fill(255);
        rect(this.x, this.y, PIXEL_SIZE, PIXEL_SIZE);
    }
}


// --- WINDOW RESIZED (UNCHANGED) ---

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setup();
}