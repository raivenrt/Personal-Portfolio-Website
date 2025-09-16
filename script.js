// Age Counter Function
function calculateAge() {
  const birthDate = new Date("2003-04-20");
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// Update age counter
function updateAge() {
  const age = calculateAge();
  ageYear.textContent = age.years + "Y/2003";
  ageMonths.textContent = age.months + "M/04";
  ageDays.textContent = age.days + "D/20";
}

// Update age every day
updateAge();
window.setInterval(updateAge, 5000); // Update every 24 hours

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Project card click handler
function openProject(url) {
  window.open(url, "_blank");
}

// Download CV function
function downloadCV() {
  // For demo purposes, show an alert
  alert(
    "CV download would start here. Please add your actual CV file path to the downloadCV() function."
  );
  return true;
}

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

//  Enhanced scroll animations for all sections
document
  .querySelectorAll(".project-card, .service-card, .about-text, .about-image")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

// Add parallax effect to floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelectorAll(".floating-element");
  const speed = 0.5;

  parallax.forEach((element, index) => {
    const yPos = -(scrolled * speed * (index + 1) * 0.3);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.textContent;
  setTimeout(() => {
    typeWriter(heroTitle, originalText, 150);
  }, 500);
});

//  Add stagger animation for contact links
window.addEventListener("load", () => {
  const contactLinks = document.querySelectorAll(".contact-link");
  contactLinks.forEach((link, index) => {
    link.style.opacity = "0";
    link.style.transform = "translateY(20px)";
    setTimeout(() => {
      link.style.transition = "all 0.5s ease";
      link.style.opacity = "1";
      link.style.transform = "translateY(0)";
    }, index * 100);
  });
});
