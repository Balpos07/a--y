// ========== DARK MODE TOGGLE ==========
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme
  body.setAttribute('data-theme', savedTheme);

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('ion-icon');
    if (icon) {
      // Wait for ionicons to be ready
      if (window.ionicons && window.ionicons.addIcons) {
        if (theme === 'dark') {
          icon.setAttribute('name', 'sunny-outline');
        } else {
          icon.setAttribute('name', 'moon-outline');
        }
      } else {
        // If ionicons not ready yet, try again
        setTimeout(() => updateThemeIcon(theme), 100);
      }
    }
  }

  // Wait for ionicons library and DOM to fully load
  window.addEventListener('ioniconsReady', () => {
    updateThemeIcon(savedTheme);
  });
  
  // Fallback: Try updating after a short delay
  setTimeout(() => {
    updateThemeIcon(savedTheme);
  }, 500);

  // Add click listener
  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    updateThemeIcon(current);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close hamburger menu if open
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  });
});

// Animated Hero Text
const words = ["Ayomiposi", "a Developer", "a Writer", "a Creator"];
let currentIndex = 0;
function changeText() {
  const textElement = document.getElementById("changing-text");
  textElement.style.opacity = '0';
  setTimeout(() => {
    textElement.textContent = words[currentIndex];
    textElement.style.opacity = '1';
    currentIndex = (currentIndex + 1) % words.length;
  }, 400);
}
setInterval(changeText, 2000);

// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const typewriterWords = ["Front-End Developer", "React Enthusiast", "UI/UX Explorer", "Web Creator"];
let twIndex = 0, charIndex = 0, isDeleting = false;
function type() {
  let current = typewriterWords[twIndex];
  if (isDeleting) {
    typewriter.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      twIndex = (twIndex + 1) % typewriterWords.length;
      setTimeout(type, 500);
    } else setTimeout(type, 40);
  } else {
    typewriter.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1200);
    } else setTimeout(type, 80);
  }
}
type();

// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact Form (Demo)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.textContent = "Thank you! Your message has been sent.";
  contactForm.reset();
  setTimeout(() => { formMessage.textContent = ""; }, 4000);
});

// ========== SCROLL ANIMATIONS ==========
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

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate="true"]').forEach(section => {
  // Add fade-in-up to section title
  const title = section.querySelector('.section-title');
  if (title) {
    title.classList.add('fade-in-up');
    observer.observe(title);
  }

  // Add animations to content elements
  const cards = section.querySelectorAll('.project-card, .testimonial-card, .skill-category');
  cards.forEach((card, index) => {
    card.classList.add('fade-in-up');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});

// ========== MODAL FUNCTIONALITY ==========
const caseStudyModal = document.getElementById('caseStudyModal');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card[data-case-study]');

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
      <p>React, Node.js, PostgreSQL, Stripe, API Integration</p>`,
    liveLink: 'https://mapbytes.vercel.app/',
    githubLink: 'https://github.com/Balpos07/map'
  },
  taskmanager: {
    title: 'Task Management App',
    description: `<h3>Challenge</h3>
      <p>Create a task management solution with drag-and-drop functionality and persistent storage.</p>
      <h3>Solution</h3>
      <p>Developed a Vue.js application with drag-and-drop capabilities using Vue draggable. Features include task categorization, priority levels, and local storage persistence.</p>
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
    liveLink: 'https://calcsite.vercel.app/',
    githubLink: 'https://github.com/Balpos07/posiBytes-Calculator'
  },
  ecommerce: {
    title: 'E-commerce Platform',
    description: `<h3>Challenge</h3>
      <p>Develop a full-featured e-commerce platform with product management and secure payments.</p>
      <h3>Solution</h3>
      <p>Built a React and Redux-based platform with comprehensive product listings, cart functionality, and secure Stripe payment integration. Includes admin dashboard for inventory management.</p>
      <h3>Impact</h3>
      <p>Streamlined shopping experience with real-time inventory updates and secure transactions.</p>
      <h3>Technologies</h3>
      <p>React, Redux, Node.js, MongoDB, Stripe</p>`,
    liveLink: 'https://greenlandfarms.vercel.app/',
    githubLink: 'https://github.com/Balpos07/green-bush'
  }
};

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const caseStudyKey = card.getAttribute('data-case-study');
    const caseStudy = caseStudies[caseStudyKey];
    
    if (caseStudy) {
      document.getElementById('modalTitle').textContent = caseStudy.title;
      document.getElementById('modalBody').innerHTML = caseStudy.description;
      document.getElementById('modalLiveLink').href = caseStudy.liveLink;
      document.getElementById('modalGithubLink').href = caseStudy.githubLink;
      caseStudyModal.style.display = 'block';
    }
  });
});

modalClose.addEventListener('click', () => {
  caseStudyModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === caseStudyModal) {
    caseStudyModal.style.display = 'none';
  }
});

// ========== LAZY LOADING ==========
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}