let circles = [];

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let diameter = random(10, 30);
    let growthSpeed = random(0.5, 2); // Renamed from 'speed' to 'growthSpeed'
    let fillColor = color(random(255), random(255), random(255), 150);
    circles.push(new ColorCircle(x, y, diameter, growthSpeed, fillColor));
  }
}

function draw() {
  background(0);

  for (let circle of circles) {
    circle.update();
    circle.display();
  }
}

class ColorCircle {
  constructor(x, y, diameter, growthSpeed, fillColor) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.growthSpeed = growthSpeed; // Renamed from 'speed' to 'growthSpeed'
    this.fillColor = fillColor;
    this.growing = true;
  }

  update() {
    if (this.growing) {
      this.diameter += this.growthSpeed;
      if (this.diameter > 30) {
        this.growing = false;
      }
    } else {
      this.diameter -= this.growthSpeed;
      if (this.diameter < 10) {
        this.growing = true;
      }
    }
  }

  display() {
    fill(this.fillColor);
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}