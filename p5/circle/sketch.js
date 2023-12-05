let ball;
let target;
let gravity = 0.2; // Gravity force
let score = 0;
let isDragging = false; // Flag to track if the ball is being dragged
let slingStart; // Starting position of the sling
let isLaunched = false; // Flag to track if the ball has been launched

function setup() {
  createCanvas(1200, 800); 
  ball = new Ball(width / 2, height / 2); 
  target = createVector(random(width), random(height));
}

function draw() {
  background(220);

  // Display the target
  fill(255, 0, 0); // Red color for the target
  ellipse(target.x, target.y, 20, 20);

  // Update and display the ball
  ball.update();
  ball.display();

  if (isLaunched) {
    // Check if the ball is close to the target using the dist function
    let d = dist(ball.x, ball.y, target.x, target.y);
    if (d < 15) {
      // Increase the score and reset the ball
      score++;
      ball.reset();
      target = createVector(random(width), random(height));
    }
  }

  // Display the score
  fill(0);
  textSize(24);
  text('Score: ' + score, 20, 30);

  // Draw the slingshot
  if (isDragging) {
    stroke(0);
    strokeWeight(4);
    line(slingStart.x, slingStart.y, ball.x, ball.y);
  }
}

function mousePressed() {
  if (!isLaunched) {
    // Check if the mouse is over the ball and start dragging
    let d = dist(mouseX, mouseY, ball.x, ball.y);
    if (d < ball.size / 2) {
      isDragging = true;
      slingStart = createVector(ball.x, ball.y); // Initialize slingStart
    }
  }
}

function mouseDragged() {
  // Update the ball's position while dragging
  if (isDragging && !isLaunched) {
    ball.x = mouseX;
    ball.y = mouseY;
  }
}

function mouseReleased() {
  if (!isLaunched && slingStart) {
    // Launch the ball when the mouse is released
    let launchDirection = createVector(slingStart.x - ball.x, slingStart.y - ball.y);
    launchDirection.mult(0.05); // Adjust the launch force as needed
    ball.launch(launchDirection);
    isDragging = false;
    isLaunched = true; // Mark the ball as launched
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.vx = 0; // x-velocity
    this.vy = 0; // y-velocity
    this.gravity = gravity;
    this.startX = x; // Store the starting x position
    this.startY = y; // Store the starting y position
    this.slingStart = createVector(x, y); // Initialize slingStart
  }

  update() {
    // Apply gravity only after the ball is launched
    if (isLaunched) {
      this.vy += this.gravity;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Check for collisions with the bottom of the canvas
    if (this.y > height) {
      this.reset();
    }
  }

  display() {
    fill(0); // Black color for the ball
    ellipse(this.x, this.y, this.size, this.size);
  }

  launch(direction) {
    // Launch the ball based on the given direction vector
    this.vx = direction.x;
    this.vy = direction.y;
  }

  reset() {
    // Reset the ball to its starting position
    this.x = this.startX;
    this.y = this.startY;
    this.vx = 0;
    this.vy = 0;
    isLaunched = false; // Reset the launch state
  }
}
