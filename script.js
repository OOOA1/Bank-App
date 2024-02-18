'use strict';

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const moveToSlide = function (slide) {
    slides.forEach((s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`));
};
moveToSlide(0);

/* <button class="dots__dot" data-slide=""></button> */

const createDots = function () {
    slides.forEach(function(_, index) {
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`);
    });
}
createDots();

const activateCurrentDot = function (index) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${index}"]`).classList.add('dots__dot--active');
};
activateCurrentDot(0);

const slidesNumber = slides.length;
let currentSlide = 0;

const nextSlide = function() {
    if (currentSlide === slidesNumber - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    moveToSlide(currentSlide);
    activateCurrentDot(currentSlide);
}

const previousSlide = function() {
    if (currentSlide === 0) {
        currentSlide = slidesNumber - 1;
    } else {
        currentSlide--;
    };
    moveToSlide(currentSlide);
    activateCurrentDot(currentSlide);
};

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowRight') {
        nextSlide()
    };
    if (e.key === 'ArrowLeft') {
        previousSlide()
    };
});

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

const operationContainer = document.querySelector('.operations__tab-container');
const operationsTab = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');

operationContainer.addEventListener('click', function(e) {
    const clickedButton = e.target.closest('.operations__tab');
    if(!clickedButton) return;

    operationsTab.forEach(tab => (
        tab.classList.remove('operations__tab--active')
    ));
    clickedButton.classList.add('operations__tab--active');

    operationsContent.forEach(content => (
        content.classList.remove('operations__content--active')
    ));
    document.querySelector(`.operations__content--${clickedButton.dataset.tab}`).classList.add('operations__content--active');
});

const btnShowModalWindow = document.querySelector('.btn--show-modal-window');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');


const showModalWondow = function() {
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
    modalWindow.classList.add('hidden')
    overlay.classList.add('hidden')
};


btnShowModalWindow.addEventListener('click', showModalWondow);
btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);
document.addEventListener('keydown', function (e) {
    if(e.key === 'Escape') {
        closeModalWindow();
    };
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
    const section1Coords = section1.getBoundingClientRect();
    window.scrollTo({
        top: section1Coords.top + window.pageYOffset + 100,
        behavior: 'smooth'
    });
});

const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const observerCallback = function(thashhold) {
    const entry = thashhold[0];
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
};

const observerOptions = {
    root: null,
    thashhold: 1
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(header);

const servicesImg = document.querySelectorAll('img[data-src]');

const servicesCallback = function(thasshold) {
    const entry = thasshold[0];
    const target = entry.target;
    if (!entry.isIntersecting) return;
    target.src = target.dataset.src;
    target.addEventListener('load', function() {
        target.classList.remove('lazy-img');
    });
};

const servicesObserver = new IntersectionObserver(servicesCallback, {
    root: null,
    thasshold: 1
});

servicesImg.forEach(img => servicesObserver.observe(img));

const navHoverAnimation = function(e) {
    const target = e.target;
    if (target.classList.contains('nav__link')) {
        const links = target.closest('.nav__links').querySelectorAll('.nav__link');
        links.forEach(link => {
            if (link !== target) {
                link.style.opacity = this;
            }
        })
    };
};

nav.addEventListener('mouseover', navHoverAnimation.bind(0.4));
nav.addEventListener('mouseout', navHoverAnimation.bind(1));

const linkScroll = function(e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const href = e.target.getAttribute('href');
        document.querySelector(href).scrollIntoView( {
            behavior: 'smooth'
        });
    }
};
navLinks.addEventListener('click', linkScroll)

const sections = document.querySelectorAll('.section');

sections.forEach(section => section.classList.add('section--hidden'));
const sectionsCallback = function(thasshold, observer) {
    const entry = thasshold[0];
    const target = entry.target;
    if (!entry.isIntersecting) return;
    target.classList.remove('section--hidden');
    observer.unobserve(target);
}

const sectionsObserver = new IntersectionObserver (sectionsCallback, {
    root: null,
    thasshold: 0.1
});

sections.forEach(section => {
    sectionsObserver.observe(section);
});
