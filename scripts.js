document.addEventListener("DOMContentLoaded", () => {
  // 🎯 Progress Bars: Set width from data-percentage
  document.querySelectorAll(".progress-bar").forEach(bar => {
    const percent = bar.getAttribute("data-percentage");
    if (percent) {
      bar.style.width = percent + "%";
    }
  });

  // 🎯 Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // 🎯 Flip effect for interest circles
  document.querySelectorAll(".about-interests li").forEach(circle => {
    circle.addEventListener("click", () => {
      circle.classList.toggle("flipped");
    });
  });

  // 🎯 Active nav link based on current page
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navigation-list__item").forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();
    link.classList.toggle("navigation-list__item--active", linkPath === currentPath);
  });

  // Animate rainbow bands on logo hover
  const logo = document.querySelector(".animated-logo");
  if (logo) {
    const bands = logo.querySelectorAll(".band");
    logo.addEventListener("mouseover", () => {
      bands.forEach((band, i) => {
        band.style.transition = `transform 0.3s ease ${i * 0.05}s`;
        band.style.transform = "scale(1.3)";
      });
    });
    logo.addEventListener("mouseout", () => {
      bands.forEach(band => {
        band.style.transition = "transform 0.3s ease";
        band.style.transform = "scale(1)";
      });
    });
  }

  //  Animate skill progress circles
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach(card => {
  const percent = parseInt(card.getAttribute("data-percent"));
  const progress = card.querySelector(".progress");

  if (!progress) return;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  // Set initial state
  progress.style.strokeDasharray = `${circumference}`;
  progress.style.strokeDashoffset = `${circumference}`;

  // Observer triggers when card enters view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          // Animate to target offset
          progress.style.transition = "stroke-dashoffset 1.5s ease-out";
          progress.style.strokeDashoffset = offset;

          // After animation finishes, lock in the value
          setTimeout(() => {
            progress.style.transition = "none";
            progress.style.strokeDashoffset = offset;
          }, 1600);
        });

        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(card);
});

  // 🎯 Hamburger menu toggle
  const toggleButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (toggleButton && nav) {
    toggleButton.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
});

// jQuery-based tech badges (auto-tagging projects)
$(document).ready(function () {
  const techStacks = {
    'Pokédex': ['JavaScript', 'HTML', 'CSS'],
    'MyFlix': ['React', 'Node.js', 'MongoDB', 'Express'],
    'Meet App': ['React', 'PWA', 'Google Calendar API']
  };

  $('.project-card').each(function () {
    const title = $(this).find('h2').text().trim();
    if (techStacks[title]) {
      const techDiv = $('<div>').addClass('project-buttons tech-list');
      techStacks[title].forEach(tech => {
        $('<span>').addClass('tech-badge').text(tech).appendTo(techDiv);
      });
      $(this).find('p').last().after(techDiv);
    }
  });
});

// Adding animations to home page name and hello
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // Add animation classes when visible
        el.classList.add('animate-pop');

        if (el.classList.contains('home-name')) {
          el.classList.add('animate-type');
        }
      } else {
        // Remove animation classes when out of view to allow replay
        el.classList.remove('animate-pop', 'animate-type');
      }
    });
  }, {
    threshold: 0.6 // Trigger when 60% of the element is visible
  });

  document.querySelectorAll('.home-title, .home-name').forEach(el => {
    observer.observe(el);
  });


