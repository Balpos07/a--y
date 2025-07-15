// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
}
themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('active');
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