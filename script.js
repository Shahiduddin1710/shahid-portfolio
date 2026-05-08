document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarNav = document.querySelector(".navbar-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const typingElement = document.getElementById("typing-animation");

  let isMenuOpen = false;
  let ticking = false;

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener("click", () => {
      navbarNav.classList.toggle("active");
      navbarToggle.classList.toggle("active");
      isMenuOpen = !isMenuOpen;
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    },
    { passive: true },
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offset = navbar.offsetHeight || 80;

        window.scrollTo({
          top: targetSection.offsetTop - offset,
          behavior: "smooth",
        });
      }

      if (isMenuOpen) {
        navbarNav.classList.remove("active");
        navbarToggle.classList.remove("active");
        isMenuOpen = false;
      }
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          let current = "";
          const sections = document.querySelectorAll("section[id]");

          sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (
              window.scrollY >= sectionTop &&
              window.scrollY < sectionTop + sectionHeight
            ) {
              current = section.id;
            }
          });

          navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
              link.classList.add("active");
            }
          });

          ticking = false;
        });

        ticking = true;
      }
    },
    { passive: true },
  );

  const typingTexts = [
    "Building Real-World Applications",
    "Learning Data Structures & Algorithms",
    "Developing Full Stack Solutions",
    "Exploring Scalable Backend Systems"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeWriter() {
    const currentText = typingTexts[textIndex];

    if (deleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = deleting ? 80 : 150;

    if (!deleting && charIndex === currentText.length) {
      setTimeout(() => {
        deleting = true;
      }, 1500);

      speed = 50;
      setTimeout(typeWriter, speed);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      speed = 500;
    }

    setTimeout(typeWriter, speed);
  }

  if (typingElement) typeWriter();

  const progressBars = document.querySelectorAll(".progress");

  function animateBars() {
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();

      if (
        rect.top < window.innerHeight - 100 &&
        !bar.classList.contains("done")
      ) {
        const width = bar.style.width;
        bar.style.width = width;
        bar.classList.add("done");
      }
    });
  }

  window.addEventListener("scroll", animateBars, { passive: true });
  animateBars();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          entry.target.classList.add("animated");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  document
    .querySelectorAll(
      ".education-card, .project-card, .certificate-card, .contact-card, .ftco-animate, .github-section, .contact-section .section-header",
    )
    .forEach((el) => {
      observer.observe(el);
    });
});