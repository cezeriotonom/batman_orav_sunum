document.addEventListener('DOMContentLoaded', () => {
    // Particle Animation Logic
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    const mouse = {
        x: null,
        y: null,
        radius: (canvas.height/120) * (canvas.width/120)
    }

    window.addEventListener('mousemove', 
        function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        }
    );

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(192, 192, 192, 0.2)'; // Fainter particles
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - 0.2;
            let directionY = (Math.random() * .4) - 0.2;
            let color = '#c0c0c0';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle='rgba(192,192,192,' + (opacityValue * 0.15) + ')'; // Fainter lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0,0,innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
        }
        connect();
    }

    window.addEventListener('resize', 
        function(){
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            mouse.radius = ((canvas.height/80) * (canvas.height/80));
            init();
        }
    );

    init();
    animate();

    // Existing Presentation Logic
    const slides = document.querySelectorAll('section');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event Listeners
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            goToNextSlide();
        } else if (event.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    nextArrow.addEventListener('click', goToNextSlide);
    prevArrow.addEventListener('click', goToPrevSlide);

    // Show the initial slide
    showSlide(currentSlide);
});
