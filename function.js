window.onscroll = function () { myFunction() };

function myFunction() {
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('#navbar a');

    sections.forEach(function (section, index) {
        var rect = section.getBoundingClientRect();
        if (rect.top <= 50 && rect.bottom >= 50) {
            navLinks[index].classList.add('active');
        } else {
            navLinks[index].classList.remove('active');
        }
    });
}


document.querySelectorAll('#navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


//Bouncing Balls
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

var balls = [];

for (var i = 0; i < 20; i++) { // Reduced number of balls for smaller area
    var radius = 10; // Smaller radius
    var x = Math.floor(Math.random() * (canvas.width - radius * 2)) + radius;
    var y = Math.floor(Math.random() * (canvas.height - radius * 2)) + radius;
    var vx = (Math.random() - 0.5) * 4;
    var vy = (Math.random() - 0.5) * 4;

    var color = getRandomColor();

    balls.push({ x, y, vx, vy, radius, color });
}

function move() {
    requestAnimationFrame(move);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Use canvas dimensions

    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];

        ctx.beginPath();
        ctx.fillStyle = ball.color;
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
        ctx.fill();

        // Check boundaries using dynamic canvas dimensions
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.vx = -ball.vx;
        }

        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.vy = -ball.vy;
        }

        ball.x += ball.vx;
        ball.y += ball.vy;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

move();