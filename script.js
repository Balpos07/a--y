// ========== INITIALIZE ON DOM READY ==========
function initializeApp() {
  initThemeToggle();
  initHamburgerMenu();
  initNavbarScroll();
  initContactForm();
  initScrollAnimations();
  initModal();
  initLazyLoading();
  initParallax();
  initButtonRipples();
  initShowMore();
}

// ========== DARK MODE TOGGLE ==========
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("ion-icon");
    if (icon) {
      icon.setAttribute(
        "name",
        theme === "dark" ? "sunny-outline" : "moon-outline",
      );
    }
  }

  function updateThemePressed(theme) {
    themeToggle.setAttribute(
      "aria-pressed",
      theme === "dark" ? "true" : "false",
    );
  }

  updateThemeIcon(savedTheme);
  updateThemePressed(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
    updateThemeIcon(current);
    updateThemePressed(current);
  });
}

// ========== HAMBURGER MENU ==========
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".nav-container") &&
      navMenu.classList.contains("active")
    ) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");
      if (hamburger && navMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
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
  textElement.style.opacity = "0";
  setTimeout(() => {
    textElement.textContent = words[currentIndex];
    textElement.style.opacity = "1";
    currentIndex = (currentIndex + 1) % words.length;
  }, 400);
}
setInterval(changeText, 2000);

// ========== TYPEWRITER EFFECT ==========
const typewriter = document.getElementById("typewriter");
const typewriterWords = [
  "Front-End Developer",
  "React Enthusiast",
  "UI/UX Explorer",
  "Web Creator",
];
let twIndex = 0,
  charIndex = 0,
  isDeleting = false;
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
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (!contactForm || !formMessage) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formMessage.textContent = "Thank you! Your message has been sent.";
    formMessage.style.color = "var(--primary-color)";
    contactForm.reset();
    setTimeout(() => {
      formMessage.textContent = "";
    }, 4000);
  });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate="true"]').forEach((section) => {
    const title = section.querySelector(".section-title");
    if (title) {
      title.classList.add("fade-in-up");
      observer.observe(title);
    }

    const cards = section.querySelectorAll(
      ".project-card, .testimonial-card, .skill-category",
    );
    cards.forEach((card, index) => {
      card.classList.add("fade-in-up");
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
  });
}

// ========== SHOW MORE PROJECTS ==========
function initShowMore() {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hiddenProjects = document.querySelectorAll(".project-card.hidden");
  if (!showMoreBtn) return;

  const projectsGrid = document.querySelector(".projects-grid");
  let isExpanded = false;
  let appendedClones = [];

  showMoreBtn.addEventListener("click", function () {
    isExpanded = !isExpanded;
    if (isExpanded) {
      // reveal any hidden projects
      hiddenProjects.forEach((project) => {
        project.classList.remove("hidden");
        project.classList.add("show");
      });

      // create two distinct project cards (so you can edit them later)
      if (projectsGrid) {
        const newProjectsData = [
          {
            key: "blogging",
            title: "Blogging Platform",
            description:
              "A modern blogging platform with rich text editing, user authentication, and SEO-friendly features.",
            liveLink: "#",
            githubLink: "#",
            tech: ["Next.js", "GraphQL", "Prisma", "PostgreSQL"],
            bgStyle: "linear-gradient(135deg, #0ea5e9, #7dd3fc)",
          },
          {
            key: "travel",
            title: "Travel Planner",
            description:
              "Interactive travel planning app that helps users discover destinations and create itineraries.",
            liveLink: "#",
            githubLink: "#",
            tech: ["Vue.js", "Firebase", "Google Maps API", "Tailwind CSS"],
            bgStyle: "linear-gradient(135deg, #ec4899, #f9a8d4)",
          },
        ];

        newProjectsData.forEach((data) => {
          const card = document.createElement("div");
          card.className = "project-card";
          card.setAttribute("data-case-study", data.key);
          card.style.cursor = "pointer";
          card.innerHTML = `
            <div class="project-image">
              <div style="background: ${data.bgStyle}; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                <i class="fas fa-blog"></i>
              </div>
              <div class="project-overlay">
                <div class="project-links">
                  <a href="${data.liveLink}" class="project-link">Live Demo</a>
                  <a href="${data.githubLink}" class="project-link">Source Code</a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">${data.title}</h3>
              <p class="project-description">${data.description}</p>
              <div class="project-tech">
                ${data.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
              </div>
            </div>`;

          projectsGrid.appendChild(card);
          appendedClones.push(card);
        });
      }

      showMoreBtn.innerHTML =
        '<span>Show Less</span> <i class="fas fa-chevron-up"></i>';
      showMoreBtn.classList.add("active");
      showMoreBtn.setAttribute("aria-expanded", "true");
    } else {
      // hide projects again
      hiddenProjects.forEach((project) => {
        project.classList.remove("show");
        project.classList.add("hidden");
      });

      // remove appended clones
      appendedClones.forEach((c) => c.remove());
      appendedClones = [];

      showMoreBtn.innerHTML =
        '<span>Show More Projects</span> <i class="fas fa-chevron-down"></i>';
      showMoreBtn.classList.remove("active");
      showMoreBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ========== MODAL FUNCTIONALITY ==========
function initModal() {
  const caseStudyModal = document.getElementById("caseStudyModal");
  const modalClose = document.querySelector(".modal-close");
  const projectCards = document.querySelectorAll(
    ".project-card[data-case-study]",
  );
  if (!caseStudyModal || !modalClose) return;

  const caseStudies = {
    weatherapp: {
      title: "Weather App",
      description: `<h3>Challenge</h3>
        <p>Develop an intuitive weather application that provides real-time weather data with a clean UI.</p>
        <h3>Solution</h3>
        <p>Built a React-based weather application using OpenWeatherMap API with dynamic backgrounds and smooth animations. Features include current weather display, forecast, and search functionality.</p>
        <h3>Impact</h3>
        <p>Created a responsive interface that works seamlessly across all devices. Users can quickly find weather information for any location.</p>
        <h3>Technologies</h3>
        <p>React, Node.js, API Integration</p>`,
      liveLink: "https://mapbytes.vercel.app/",
      githubLink: "https://github.com/Balpos07/map",
    },
    taskmanager: {
      title: "Task Management App",
      description: `<h3>Challenge</h3>
        <p>Create a task management solution with drag-and-drop functionality and persistent storage.</p>
        <h3>Solution</h3>
        <p>Developed a Vue.js application with drag-and-drop capabilities. Features include task categorization, priority levels, and local storage persistence.</p>
        <h3>Impact</h3>
        <p>Users can efficiently organize tasks with priority management and visual status updates.</p>
        <h3>Technologies</h3>
        <p>Vue.js, Express, Socket.io, MongoDB</p>`,
      liveLink: "http://task-manager-ay.vercel.app/",
      githubLink: "https://github.com/Balpos07/task-manager",
    },
    calculator: {
      title: "CalcSite Dashboard",
      description: `<h3>Challenge</h3>
        <p>Build a responsive calculator with advanced features and a modern dashboard interface.</p>
        <h3>Solution</h3>
        <p>Created a TypeScript-based calculator with support for all basic operations, percentage calculations, and sign toggling. Integrated Chart.js for analytics visualization.</p>
        <h3>Impact</h3>
        <p>Responsive interface that works on all screen sizes with intuitive controls.</p>
        <h3>Technologies</h3>
        <p>TypeScript, Chart.js, OpenWeather API, Tailwind CSS</p>`,
      liveLink: "https://posibytes-calculator.vercel.app/",
      githubLink: "https://github.com/Balpos07/posiBytes-Calculator",
    },
    ecommerce: {
      title: "Greenland Farm",
      description: `<h3>Challenge</h3>
        <p>Develop a full-featured e-commerce platform with product management and secure payments.</p>
        <h3>Solution</h3>
        <p>Built a React and Redux-based platform with comprehensive product listings, cart functionality, and Stripe payment integration. Includes admin dashboard for inventory management.</p>
        <h3>Impact</h3>
        <p>Streamlined shopping experience with real-time inventory updates and secure transactions.</p>
        <h3>Technologies</h3>
        <p>React, Redux, Node.js, MongoDB, Stripe</p>`,
      liveLink: "https://greenlandfarms.vercel.app/",
      githubLink: "https://github.com/Balpos07/green-bush",
    },
    blogging: {
      title: "Blogging Platform",
      description: `<h3>Challenge</h3>
        <p>Create a modern blogging platform with rich text editing and user auth.</p>
        <h3>Solution</h3>
        <p>Built a platform supporting posts, comments, and SEO optimizations with an intuitive editor.</p>
        <h3>Technologies</h3>
        <p>Next.js, GraphQL, Prisma, PostgreSQL</p>`,
      liveLink: "#",
      githubLink: "#",
    },
    travel: {
      title: "Travel Planner",
      description: `<h3>Challenge</h3>
        <p>Help users discover destinations and create itineraries easily.</p>
        <h3>Solution</h3>
        <p>Interactive planner with maps, saving itineraries, and sharing features.</p>
        <h3>Technologies</h3>
        <p>Vue.js, Firebase, Google Maps API, Tailwind CSS</p>`,
      liveLink: "#",
      githubLink: "#",
    },
  };

  let lastFocusedEl = null;
  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't open modal if user clicked a link inside the card
      if (e.target.closest(".project-link")) return;
      const key = card.getAttribute("data-case-study");
      const study = caseStudies[key];
      if (study) {
        document.getElementById("modalTitle").textContent = study.title;
        document.getElementById("modalBody").innerHTML = study.description;
        document.getElementById("modalLiveLink").href = study.liveLink;
        document.getElementById("modalGithubLink").href = study.githubLink;
        lastFocusedEl = document.activeElement;
        caseStudyModal.style.display = "block";
        caseStudyModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (modalClose) modalClose.focus();
      }
    });
  });

  function closeModal() {
    caseStudyModal.style.display = "none";
    document.body.style.overflow = "";
    caseStudyModal.setAttribute("aria-hidden", "true");
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function")
      lastFocusedEl.focus();
  }

  modalClose.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === caseStudyModal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ========== LAZY LOADING ==========
function initLazyLoading() {
  if (!("IntersectionObserver" in window)) return;
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });
  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// ========== PARALLAX (lightweight, respects reduced-motion) ==========
function initParallax() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const layers = document.querySelectorAll("[data-parallax]");
  if (!layers.length) return;
  let ticking = false;
  function update() {
    const center = window.innerHeight / 2;
    layers.forEach((el) => {
      const depth = parseFloat(el.getAttribute("data-depth")) || 0.08;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - center) * -depth;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}

// ========== BUTTON RIPPLE MICROINTERACTIONS ==========
function initButtonRipples() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const size = Math.max(rect.width, rect.height) * 1.2;
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });
}

// ========== FOOTER YEAR ==========
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========== BOOT ==========
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
