document.addEventListener("DOMContentLoaded", () => {
    // Progress Bars: Set width from data-percentage
    document.querySelectorAll(".progress-bar").forEach(bar => {
      const percent = bar.getAttribute("data-percentage");
      if (percent) {
        bar.style.width = percent + "%";
      }
    });
  
    // Smooth scroll for anchor links
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
  
    // Flip effect for interest circles
    document.querySelectorAll(".about-interests li").forEach(circle => {
      circle.addEventListener("click", () => {
        circle.classList.toggle("flipped");
      });
    });
  
    // Active nav link based on current path
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navigation-list__item").forEach(link => {
      const linkPath = link.getAttribute("href").split("/").pop();
      if (linkPath === currentPath) {
        link.classList.add("navigation-list__item--active");
      } else {
        link.classList.remove("navigation-list__item--active");
      }
    });
  });
 
    $(document).ready(function() {
      const techStacks = {
        'Pokédex': ['JavaScript', 'HTML', 'CSS'],
        'MyFlix': ['React', 'Node.js', 'MongoDB', 'Express'],
        'Meet App': ['React', 'PWA', 'Google Calendar API']
      };

      $('.project-card').each(function() {
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

    // Animate rainbow bands on logo hover
    document.addEventListener("DOMContentLoaded", () => {
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
          bands.forEach((band) => {
            band.style.transition = "transform 0.3s ease";
            band.style.transform = "scale(1)";
          });
        });
      }
    
      // Animate skill progress circles
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".circle").forEach(circle => {
          const progress = circle.querySelector(".progress");
          const number = circle.querySelector(".number span");
          const percent = parseInt(number.textContent);
      
          const circumference = 2 * Math.PI * 45;
      
          progress.style.strokeDasharray = circumference;
          progress.style.strokeDashoffset = circumference;
      
          const offset = circumference - (percent / 100) * circumference;
          progress.style.strokeDashoffset = offset;
        });
      });      
    });
    