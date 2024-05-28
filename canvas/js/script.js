 // підключаємо канвас
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;

// масив для додавання кіл
let circles = [];

// прописані стилі кола
let circleStyle = {
    bgColor: 'black',
    circleColor: 'white',
    circleRadius: 5,
    circleCount: 370,
    circleSpeed: 0.8,
};

// считування розмірів сторінки, адаптивність малюнка
canvas.width = w;
canvas.height = h;

document.querySelector('body').appendChild(canvas);

// створюємо клас для додавання кіл
class ShowCircle {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
    }
     // рух кіл
    position() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
        }
    }
    // малювання кіл
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = circleStyle.circleColor;
        ctx.fill();
    }
}

// додавання кіл
function addCircle() {
    for (let i = 0; i < circleStyle.circleCount; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = Math.random() * circleStyle.circleRadius;
        let speed = Math.random() * circleStyle.circleSpeed + 1;
        circles.push(new ShowCircle(x, y, radius, speed));
    }
}

// оновлення та додавання кожного окремого кола
function showUnique() {
    // додавання анімації
    requestAnimationFrame(showUnique);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(function (circle) {
        circle.position()
        circle.draw()
    })
}

addCircle();
showUnique();
