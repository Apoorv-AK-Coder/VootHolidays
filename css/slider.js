function initializeSlider(sliderSelector, slideSelector, dotSelector, nextBtnSelector, prevBtnSelector, defaultSlidesToShow = 1, gap = 0) {
    const slider = document.querySelector(sliderSelector);
    const slides = document.querySelectorAll(slideSelector);
    const dots = document.querySelectorAll(dotSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    let currentIndex = 0;
    const totalSlides = slides.length;

    const getSlidesToShow = () => window.innerWidth <= 768 ? 1 : defaultSlidesToShow;
    const getSlideWidth = () => slides[0].clientWidth;
    let slidesToShow = getSlidesToShow();

    const updateSliderPosition = () => {
        slidesToShow = getSlidesToShow();
        const offset = -(getSlideWidth() + gap) * currentIndex;
        slider.style.transform = `translateX(${offset}px)`;
        updateDots();
        updateButtons();
    };

    const updateDots = () => {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    };

    const updateButtons = () => {
        prevBtn.classList.toggle('disabled', currentIndex === 0);
        nextBtn.classList.toggle('disabled', currentIndex >= totalSlides - slidesToShow);
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSliderPosition();
    };

    const moveNext = () => {
        if (currentIndex < totalSlides - slidesToShow) {
            goToSlide(currentIndex + 1);
        }
    };

    const movePrev = () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    };

    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex < totalSlides - slidesToShow) ? currentIndex + 1 : 0;
        updateSliderPosition();
    }, 5000);

    const restartAutoSlide = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex < totalSlides - slidesToShow) ? currentIndex + 1 : 0;
            updateSliderPosition();
        }, 5000);
    };

    nextBtn.addEventListener('click', () => { moveNext(); restartAutoSlide(); });
    prevBtn.addEventListener('click', () => { movePrev(); restartAutoSlide(); });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            goToSlide(parseInt(e.target.getAttribute('data-slide')));
            restartAutoSlide();
        });
    });

    let startX = 0;
    slider.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
        restartAutoSlide();
    });

    slider.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].screenX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) diff < 0 ? moveNext() : movePrev();
    });

    slider.addEventListener('wheel', (e) => {
        e.deltaY > 0 ? moveNext() : movePrev();
        restartAutoSlide();
    });

    window.addEventListener('resize', updateSliderPosition);
    updateSliderPosition();
}
initializeSlider('.slider1', '.slide1', '.dot1', '.next-btn1', '.prev-btn1', 3, 15);
initializeSlider('.slider2', '.slide2', '.dot2', '.next-btn2', '.prev-btn2', 4, 15);
initializeSlider('.slider3', '.slide3', '.dot3', '.next-btn3', '.prev-btn3', 4, 15);
