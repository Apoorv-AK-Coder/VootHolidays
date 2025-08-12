function initializeSlider(sliderSelector, slideSelector, dotSelector, nextBtnSelector, prevBtnSelector, defaultSlidesToShow = 1, gap = 0) {
    const slider = document.querySelector(sliderSelector);
    const slides = document.querySelectorAll(slideSelector);
    const dots = document.querySelectorAll(dotSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    let currentIndex = 0;
    const totalSlides = slides.length;

    function getSlideWidth() {
        return slides[0].clientWidth;
    }

    function getSlidesToShow() {
        return window.innerWidth <= 768 ? 1 : defaultSlidesToShow;
    }

    let slidetoShow = getSlidesToShow();

    nextBtn.addEventListener('click', () => {
        moveToNextSlide();
    });

    prevBtn.addEventListener('click', () => {
        moveToPrevSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideIndex = event.target.getAttribute('data-slide');
            currentIndex = parseInt(slideIndex);
            updateSliderPosition();
            updateDots();
        });
    });

    function moveToNextSlide() {
        if (currentIndex < totalSlides - slidetoShow) {
            currentIndex++;
            updateSliderPosition();
        }
    }

    function moveToPrevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    }

    function updateSliderPosition() {
        slidetoShow = getSlidesToShow(); // Recalculate in case of resize
        const slideWidth = getSlideWidth();
        const newPosition = -(slideWidth + gap) * currentIndex;
        slider.style.transform = `translateX(${newPosition}px)`;
        updateDots();
        updateArrowStates();
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    function updateArrowStates() {
        slidetoShow = getSlidesToShow();
        if (currentIndex === 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        if (currentIndex >= totalSlides - slidetoShow) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    slider.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            moveToNextSlide();
        } else {
            moveToPrevSlide();
        }
    });

    window.addEventListener('resize', () => {
        slidetoShow = getSlidesToShow();
        updateSliderPosition();
    });

    updateSliderPosition();
    updateArrowStates();
}

  
// Initialize the first slider
initializeSlider('.slider1', '.slide1', '.dot1', '.next-btn1', '.prev-btn1', 4, 15);
initializeSlider('.slider2', '.slide2', '.dot2', '.next-btn2', '.prev-btn2', 4, 15);
initializeSlider('.slider3', '.slide3', '.dot3', '.next-btn3', '.prev-btn3', 4, 15);
initializeSlider('.slider4', '.slide4', '.dot4', '.next-btn4', '.prev-btn4', 4, 15);
initializeSlider('.slider5', '.slide5', '.dot5', '.next-btn5', '.prev-btn5', 4, 15);