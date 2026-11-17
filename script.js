/**
 * Ganesh Waghmare | Premium Data Analyst Portfolio Script
 * Pure Vanilla JavaScript — High Performance, Zero External Dependencies
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen ? "✕" : "☰";
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰";
      });
    });
  }

  // 2. Sticky Navbar Glass Effect
  const siteHeader = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", updateActiveNavLink);

  // 4. Animated Typewriter Effect in Hero
  const typewriterElement = document.getElementById("typewriterText");
  if (typewriterElement) {
    const words = [
      "Data Analyst",
      "Python Developer",
      "Data Science Enthusiast",
      "BI & Insights Specialist"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400; // Pause before new word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // 5. Featured Projects Filtering
  const projectFilters = document.querySelectorAll(".project-filters .filter-btn");
  const projectCards = document.querySelectorAll(".projects-grid .project-card");

  projectFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      projectFilters.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category.includes(filter)) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.4s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 6. Certifications Filtering
  const certFilters = document.querySelectorAll(".cert-filters .filter-btn");
  const certCards = document.querySelectorAll(".certs-grid .cert-card");

  certFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      certFilters.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      certCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 7. Certificate Lightbox Modal
  const certModal = document.getElementById("certModal");
  const certModalClose = document.getElementById("certModalClose");
  const certModalImg = document.getElementById("certModalImg");
  const certModalTitle = document.getElementById("certModalTitle");
  const certModalIssuer = document.getElementById("certModalIssuer");
  const certModalDate = document.getElementById("certModalDate");
  const certModalId = document.getElementById("certModalId");
  const certModalPdfLink = document.getElementById("certModalPdfLink");

  document.querySelectorAll(".cert-card, .btn-view-cert").forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const card = elem.closest(".cert-card");
      if (!card) return;

      const title = card.getAttribute("data-title");
      const issuer = card.getAttribute("data-issuer");
      const date = card.getAttribute("data-date");
      const certId = card.getAttribute("data-id") || "";
      const img = card.getAttribute("data-img");
      const pdf = card.getAttribute("data-pdf");

      if (certModalImg) certModalImg.src = img;
      if (certModalTitle) certModalTitle.textContent = title;
      if (certModalIssuer) certModalIssuer.textContent = issuer;
      if (certModalDate) certModalDate.textContent = `Issued: ${date}`;
      if (certModalId) {
        if (certId) {
          certModalId.textContent = `Credential ID: ${certId}`;
          certModalId.style.display = "inline-block";
        } else {
          certModalId.style.display = "none";
        }
      }

      if (certModalPdfLink) {
        if (pdf) {
          certModalPdfLink.href = pdf;
          certModalPdfLink.style.display = "inline-flex";
        } else {
          certModalPdfLink.style.display = "none";
        }
      }

      if (certModal) certModal.classList.add("active");
    });
  });

  function closeCertModal() {
    if (certModal) certModal.classList.remove("active");
  }

  if (certModalClose) certModalClose.addEventListener("click", closeCertModal);
  if (certModal) {
    certModal.addEventListener("click", (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
      closeCertModal();
    }
  });

  // 8. Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const subject = document.getElementById("contactSubject").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      if (!name || !email || !subject || !message) {
        if (formFeedback) {
          formFeedback.className = "form-feedback error";
          formFeedback.textContent = "Please fill in all required fields.";
          formFeedback.style.display = "block";
        }
        return;
      }

      // Display success message
      if (formFeedback) {
        formFeedback.className = "form-feedback success";
        formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Preparing your email client to reach <code>ganeshwaghmare0810@gmail.com</code>...`;
        formFeedback.style.display = "block";
      }

      // Format mailto link to ensure message reaches Ganesh
      const mailtoUrl = `mailto:ganeshwaghmare0810@gmail.com?subject=${encodeURIComponent(
        `Portfolio Inquiry: ${subject}`
      )}&body=${encodeURIComponent(
        `Hi Ganesh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Ganesh Waghmare Portfolio Website`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();
    });
  }

  // 9. Floating Back-to-Top Button
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 10. Dynamic Current Year
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
