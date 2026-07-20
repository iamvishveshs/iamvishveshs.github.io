// Mobile Hamburger Menu Control
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont');
const smallMenu = document.querySelector('.header__sm-menu');
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu');
const headerHamMenuCloseBtn = document.querySelector('.header__main-ham-menu-close');
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link a');

if (hamMenuBtn && smallMenu) {
  hamMenuBtn.addEventListener('click', () => {
    if (smallMenu.classList.contains('header__sm-menu--active')) {
      smallMenu.classList.remove('header__sm-menu--active');
      headerHamMenuBtn.classList.remove('d-none');
      headerHamMenuCloseBtn.classList.add('d-none');
    } else {
      smallMenu.classList.add('header__sm-menu--active');
      headerHamMenuBtn.classList.add('d-none');
      headerHamMenuCloseBtn.classList.remove('d-none');
    }
  });

  headerSmallMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      smallMenu.classList.remove('header__sm-menu--active');
      headerHamMenuBtn.classList.remove('d-none');
      headerHamMenuCloseBtn.classList.add('d-none');
    });
  });
}

// Logo Click Navigation
const headerLogoContainer = document.querySelector('.header__logo-container');
if (headerLogoContainer) {
  headerLogoContainer.addEventListener('click', () => {
    location.href = 'index.html';
  });
}

// Copyright Year Auto-Updater
const copyrightYearSpan = document.getElementById("copyrightYear");
if (copyrightYearSpan) {
  copyrightYearSpan.textContent = new Date().getFullYear();
}

// Sticky Header Blur/Shrink Effect
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('header--shrink');
    } else {
      header.classList.remove('header--shrink');
    }
  });
}

// Reusable Scroll Reveal Animation Observer
let revealObserver;
function observeRevealElements() {
  const revealElements = document.querySelectorAll('.reveal:not(.revealed)');
  if (revealElements.length > 0) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });
    }
    revealElements.forEach(el => revealObserver.observe(el));
  }
}

// Background mouse tracking for spotlight
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  document.documentElement.style.setProperty('--mouse-x', `${x}px`);
  document.documentElement.style.setProperty('--mouse-y', `${y}px`);
});

// Terminal Typing Effect
const typingStatus = document.getElementById('typing-status');
if (typingStatus) {
  const statuses = [
    'Always learning',
    'Building web apps',
    'Writing clean backend',
    'B.Tech CSE (AIML)',
    'Solving complex bugs'
  ];
  let statusIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 120;

  function typeEffect() {
    const currentStatus = statuses[statusIndex];
    if (isDeleting) {
      typingStatus.textContent = currentStatus.substring(0, charIndex - 1);
      charIndex--;
      delay = 60;
    } else {
      typingStatus.textContent = currentStatus.substring(0, charIndex + 1);
      charIndex++;
      delay = 120;
    }

    if (!isDeleting && charIndex === currentStatus.length) {
      isDeleting = true;
      delay = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      statusIndex = (statusIndex + 1) % statuses.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }
  typeEffect();
}

// Local time display updater
const localTimeSpan = document.getElementById('local-time');
if (localTimeSpan) {
  function updateLocalTime() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    localTimeSpan.textContent = new Date().toLocaleTimeString('en-US', options);
  }
  updateLocalTime();
  setInterval(updateLocalTime, 1000);
}

// Active Nav Link Tracker on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header__link');

if (sections.length > 0 && navLinks.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    if (window.scrollY < 100) {
      current = 'home';
    }

    navLinks.forEach(link => {
      link.classList.remove('header__link--active');
      const href = link.getAttribute('href');
      
      if (current === 'home' && (href === './' || href === 'index.html' || href === './index.html' || href === './index.html#home')) {
        link.classList.add('header__link--active');
      } else if (href.includes(`#${current}`) && current !== 'home') {
        link.classList.add('header__link--active');
      }
    });
  });
}

// Trigger initial observers on page load
document.addEventListener('DOMContentLoaded', () => {
  observeRevealElements();
});