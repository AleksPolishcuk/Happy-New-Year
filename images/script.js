const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const colors = ["#ff5733", "#33ff57", "#5733ff", "#ff33a8", "#33f0ff"];

function Firework(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = Math.random() * 3 + 1;
  this.alpha = 1;
}

Firework.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.globalAlpha = this.alpha;
  ctx.fill();
};

Firework.prototype.update = function () {
  this.y -= Math.random() * 2;
  this.x += Math.random() * 4 - 2;
  this.alpha -= 0.01;
};

function createFirework(x, y) {
  for (let i = 0; i < 50; i++) {
    fireworks.push(
      new Firework(x, y, colors[Math.floor(Math.random() * colors.length)])
    );
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].draw();
    fireworks[i].update();
    if (fireworks[i].alpha <= 0) {
      fireworks.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateFireworks);
}

function launchCelebration() {
  document.querySelector(".message").style.display = "block";
  setInterval(() => {
    createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
  }, 200);
}

animateFireworks();
