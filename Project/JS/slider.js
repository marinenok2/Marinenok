'use script'
class Slider {
    constructor() {
        this.sliderBlocks = document.querySelectorAll('.slider-block');
        this.sliderLine = document.querySelector('.slider-line');
        this.btnNext = document.querySelector('.btn-next');
        this.btnPrev = document.querySelector('.btn-prev');
        this.sliderDots = document.querySelectorAll('.slider-dot');

        this.sliderCount = 0;
        this.sliderWidth = 0;

        this.showSlider();
        this.setupEventListeners();
    }

    showSlider() {
        this.sliderWidth = document.querySelector('.slider-wok').offsetWidth;
        this.sliderLine.style.width = `${this.sliderWidth * this.sliderBlocks.length}px`;

        this.sliderBlocks.forEach(item => {
            item.style.width = `${this.sliderWidth}px`;
            item.style.backgroundImage = 'url(image/784.png)';
            item.style.backgroundSize = 'cover';
            item.style.backgroundRepeat = 'no-repeat';
        });

        this.roliSlider();
        this.dotSlide(this.sliderCount);
    }

    roliSlider() {
        this.sliderLine.style.transform = `translateX(${-this.sliderCount * this.sliderWidth}px)`;
    }

    dotSlide(index) {
        this.sliderDots.forEach(dot => dot.classList.remove('active'));
        this.sliderDots[index].classList.add('active');
    }

    nextSlide() {
        this.sliderCount++;
        if (this.sliderCount >= this.sliderBlocks.length) this.sliderCount = 0;
        this.roliSlider();
        this.dotSlide(this.sliderCount);
    }

    prevSlide() {
        this.sliderCount--;
        if (this.sliderCount < 0) this.sliderCount = this.sliderBlocks.length - 1;
        this.roliSlider();
        this.dotSlide(this.sliderCount);
    }

    setupEventListeners() {
        this.btnNext.addEventListener('click', this.nextSlide.bind(this));
        this.btnPrev.addEventListener('click', this.prevSlide.bind(this));

        this.sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.sliderCount = index;
                this.roliSlider();
                this.dotSlide(this.sliderCount);
            });
        });

        window.addEventListener('resize', () => {
            this.showSlider();
        });
    }
}

const slider = new Slider();
