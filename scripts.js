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

  // 🎯 Animate rainbow bands on logo hover
  const logo = document.querySelector(".animated-logo");
  if (logo) {
    const bands = logo.querySelectorAll(".band");
    logo.addEventListener("mouseenter", () => {
      bands.forEach((band, i) => {
        band.style.transition = `transform 0.3s ease ${i * 0.05}s`;
        band.style.transform = "scale(1.3) rotate(5deg)";
      });
    });
    logo.addEventListener("mouseleave", () => {
      bands.forEach(band => {
        band.style.transition = "transform 0.3s ease";
        band.style.transform = "scale(1) rotate(0)";
      });
    });
  }

  // 🎯 Animate skill progress circles
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach(card => {
    const percent = parseInt(card.getAttribute("data-percent"));
    const progress = card.querySelector(".progress");
    if (!progress) return;

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    progress.style.strokeDasharray = `${circumference}`;
    progress.style.strokeDashoffset = `${circumference}`;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            progress.style.transition = "stroke-dashoffset 1.5s ease-out";
            progress.style.strokeDashoffset = offset;
            setTimeout(() => {
              progress.style.transition = "none";
              progress.style.strokeDashoffset = offset;
            }, 1600);
          });
          observer.unobserve(entry.target);
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

  // 🎯 Project cards slide-in animation
  const projectCards = document.querySelectorAll(".project-card");
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        if (index % 2 === 0) {
          entry.target.classList.add("slide-left");
        } else {
          entry.target.classList.add("slide-right");
        }
        projectObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  projectCards.forEach(card => projectObserver.observe(card));

  // 🎯 Animate home title and name
  const homeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('animate-pop');
        if (el.classList.contains('home-name')) {
          el.classList.add('animate-type');
        }
      } else {
        el.classList.remove('animate-pop', 'animate-type');
      }
    });
  }, {
    threshold: 0.6
  });

  document.querySelectorAll('.home-title, .home-name').forEach(el => {
    homeObserver.observe(el);
  });
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