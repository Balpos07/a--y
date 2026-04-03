// ========== INITIALIZE ON DOM READY ==========
function initializeApp() {
  initThemeToggle();
  initHamburgerMenu();
  initNavbarScroll();
  initContactForm();
  initScrollAnimations();
  initModal();
  initLazyLoading();
  initShowMore();
}

// ========== DARK MODE TOGGLE ==========
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('ion-icon');
    if (icon) {
      icon.setAttribute('name', theme === 'dark' ? 'sunny-outline' : 'moon-outline');
    }
  }

  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    updateThemeIcon(current);
  });
}

// ========== HAMBURGER MENU ==========
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  });
});

// ========== ANIMATED HERO TEXT ==========
const words = ["Ayomiposi", "a Developer", "a Designer", "a Creator"];
let currentIndex = 0;
function changeText() {
  const textElement = document.getElementById("changing-text");
  if (!textElement) return;
  textElement.style.opacity = '0';
  setTimeout(() => {
    textElement.textContent = words[currentIndex];
    textElement.style.opacity = '1';
    currentIndex = (currentIndex + 1) % words.length;
  }, 400);
}
setInterval(changeText, 2000);

// ========== TYPEWRITER EFFECT ==========
const typewriter = document.getElementById('typewriter');
const typewriterWords = ["Front-End Developer", "React Enthusiast", "UI/UX Explorer", "Web Creator"];
let twIndex = 0, charIndex = 0, isDeleting = false;
function type() {
  if (!typewriter) return;
  const current = typewriterWords[twIndex];
  if (isDeleting) {
    typewriter.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      twIndex = (twIndex + 1) % typewriterWords.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, 40);
    }
  } else {
    typewriter.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1200);
    } else {
      setTimeout(type, 80);
    }
  }
}
if (typewriter) type();

// ========== CONTACT FORM ==========
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (!contactForm || !formMessage) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formMessage.textContent = "Thank you! Your message has been sent.";
    formMessage.style.color = 'var(--primary-color)';
    contactForm.reset();
    setTimeout(() => { formMessage.textContent = ""; }, 4000);
  });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate="true"]').forEach(section => {
    const title = section.querySelector('.section-title');
    if (title) {
      title.classList.add('fade-in-up');
      observer.observe(title);
    }

    const cards = section.querySelectorAll('.project-card, .testimonial-card, .skill-category');
    cards.forEach((card, index) => {
      card.classList.add('fade-in-up');
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
  });
}

// ========== SHOW MORE PROJECTS ==========
function initShowMore() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenProjects = document.querySelectorAll('.project-card.hidden');
  if (!showMoreBtn) return;

  let isExpanded = false;
  showMoreBtn.addEventListener('click', function () {
    isExpanded = !isExpanded;
    if (isExpanded) {
      hiddenProjects.forEach(project => {
        project.classList.remove('hidden');
        project.classList.add('show');
      });
      showMoreBtn.innerHTML = '<span>Show Less</span> <i class="fas fa-chevron-up"></i>';
      showMoreBtn.classList.add('active');
    } else {
      hiddenProjects.forEach(project => {
        project.classList.remove('show');
        project.classList.add('hidden');
      });
      showMoreBtn.innerHTML = '<span>Show More Projects</span> <i class="fas fa-chevron-down"></i>';
      showMoreBtn.classList.remove('active');
    }
  });
}

// ========== MODAL FUNCTIONALITY ==========
function initModal() {
  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalClose = document.querySelector('.modal-close');
  const projectCards = document.querySelectorAll('.project-card[data-case-study]');
  if (!caseStudyModal || !modalClose) return;

  const caseStudies = {
    weatherapp: {
      title: 'Weather App',
      description: `<h3>Challenge</h3>
        <p>Develop an intuitive weather application that provides real-time weather data with a clean UI.</p>
        <h3>Solution</h3>
        <p>Built a React-based weather application using OpenWeatherMap API with dynamic backgrounds and smooth animations. Features include current weather display, forecast, and search functionality.</p>
        <h3>Impact</h3>
        <p>Created a responsive interface that works seamlessly across all devices. Users can quickly find weather information for any location.</p>
        <h3>Technologies</h3>
        <p>React, Node.js, API Integration</p>`,
      liveLink: 'https://mapbytes.vercel.app/',
      githubLink: 'https://github.com/Balpos07/map'
    },
    taskmanager: {
      title: 'Task Management App',
      description: `<h3>Challenge</h3>
        <p>Create a task management solution with drag-and-drop functionality and persistent storage.</p>
        <h3>Solution</h3>
        <p>Developed a Vue.js application with drag-and-drop capabilities. Features include task categorization, priority levels, and local storage persistence.</p>
        <h3>Impact</h3>
        <p>Users can efficiently organize tasks with priority management and visual status updates.</p>
        <h3>Technologies</h3>
        <p>Vue.js, Express, Socket.io, MongoDB</p>`,
      liveLink: 'http://task-manager-ay.vercel.app/',
      githubLink: 'https://github.com/Balpos07/task-manager'
    },
    calculator: {
      title: 'CalcSite Dashboard',
      description: `<h3>Challenge</h3>
        <p>Build a responsive calculator with advanced features and a modern dashboard interface.</p>
        <h3>Solution</h3>
        <p>Created a TypeScript-based calculator with support for all basic operations, percentage calculations, and sign toggling. Integrated Chart.js for analytics visualization.</p>
        <h3>Impact</h3>
        <p>Responsive interface that works on all screen sizes with intuitive controls.</p>
        <h3>Technologies</h3>
        <p>TypeScript, Chart.js, OpenWeather API, Tailwind CSS</p>`,
      liveLink: 'https://posibytes-calculator.vercel.app/',
      githubLink: 'https://github.com/Balpos07/posiBytes-Calculator'
    },
    ecommerce: {
      title: 'E-commerce Platform',
      description: `<h3>Challenge</h3>
        <p>Develop a full-featured e-commerce platform with product management and secure payments.</p>
        <h3>Solution</h3>
        <p>Built a React and Redux-based platform with comprehensive product listings, cart functionality, and Stripe payment integration. Includes admin dashboard for inventory management.</p>
        <h3>Impact</h3>
        <p>Streamlined shopping experience with real-time inventory updates and secure transactions.</p>
        <h3>Technologies</h3>
        <p>React, Redux, Node.js, MongoDB, Stripe</p>`,
      liveLink: 'https://greenlandfarms.vercel.app/',
      githubLink: 'https://github.com/Balpos07/green-bush'
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if user clicked a link inside the card
      if (e.target.closest('.project-link')) return;
      const key = card.getAttribute('data-case-study');
      const study = caseStudies[key];
      if (study) {
        document.getElementById('modalTitle').textContent = study.title;
        document.getElementById('modalBody').innerHTML = study.description;
        document.getElementById('modalLiveLink').href = study.liveLink;
        document.getElementById('modalGithubLink').href = study.githubLink;
        caseStudyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    caseStudyModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === caseStudyModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ========== LAZY LOADING ==========
function initLazyLoading() {
  if (!('IntersectionObserver' in window)) return;
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== FOOTER YEAR ==========
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========== BOOT ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}