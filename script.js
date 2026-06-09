const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector(".form-status");
const revealItems = document.querySelectorAll(".reveal");
const cursorDot = document.createElement("span");
const cursorRing = document.createElement("span");

cursorDot.className = "cursor-dot";
cursorRing.className = "cursor-ring";
document.body.append(cursorDot, cursorRing);

document.querySelector("#year").textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

  formStatus.textContent = "Opening your email app...";
  window.location.href = `mailto:srinidhi5706@gmail.com?subject=${subject}&body=${body}`;

  window.setTimeout(() => {
    formStatus.textContent = "If the email app did not open, email me directly at srinidhi5706@gmail.com.";
    contactForm.reset();
  }, 900);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

let cursorX = 0;
let cursorY = 0;
let ringX = 0;
let ringY = 0;
let lastTrail = 0;

const moveCursor = () => {
  ringX += (cursorX - ringX) * 0.18;
  ringY += (cursorY - ringY) * 0.18;
  const angle = Math.atan2(cursorY - ringY, cursorX - ringX) * (180 / Math.PI);

  cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) rotate(${angle}deg)`;

  requestAnimationFrame(moveCursor);
};

window.addEventListener("mousemove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;
  document.body.classList.add("cursor-active");

  const now = performance.now();
  if (now - lastTrail > 36) {
    const trailAngle = Math.atan2(cursorY - ringY, cursorX - ringX) * (180 / Math.PI);
    const trail = document.createElement("span");
    trail.className = "cursor-trail";
    trail.style.left = `${cursorX}px`;
    trail.style.top = `${cursorY}px`;
    trail.style.transform = `translate(-50%, -50%) rotate(${trailAngle}deg)`;
    document.body.appendChild(trail);
    window.setTimeout(() => trail.remove(), 540);
    lastTrail = now;
  }
});

document.querySelectorAll("a, button, input, textarea").forEach((element) => {
  element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

moveCursor();
