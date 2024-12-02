document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress-bar");

    progressBars.forEach(bar => {
        const percentage = bar.getAttribute("data-percentage");
        bar.style.width = `${percentage}%`;
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".navigation-list__item");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        const currentPath = window.location.pathname.split("/").pop() || "index.html";

        if (linkPath === currentPath) {
            link.classList.add("navigation-list__item--active");
        } else {
            link.classList.remove("navigation-list__item--active");
        }
    });
});

document.querySelectorAll('.toggle-details').forEach((button) => {
    button.addEventListener('click', () => {
      const details = button.nextElementSibling;
      const isVisible = details.style.display === 'block';
      details.style.display = isVisible ? 'none' : 'block';
      button.textContent = isVisible ? 'More Details' : 'Hide Details';
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const projectDetails = {
      pokedex: {
        title: 'Pokédex',
        description: 'A small web app built with JavaScript, HTML, and CSS to explore Pokémon data.',
        links: [
          { name: 'Live App', url: 'https://amysikora.github.io/js-app-creation/' },
          { name: 'Repository', url: 'https://github.com/AmySikora/js-app-creation' },
        ],
      },
      myflix: {
        title: 'myFlix',
        description: 'A full-stack movie app using MongoDB, Express, React, and Node.js. Users can view, search, and save movies.',
        links: [
          { name: 'Live App', url: 'https://myflix-app-123.netlify.app/' },
          { name: 'Frontend Repo', url: 'https://github.com/AmySikora/myFlix-client' },
          { name: 'Backend Repo', url: 'https://github.com/AmySikora/movie_api' },
        ],
      },
      meet: {
        title: 'Meet App',
        description: 'Meet is a PWA that allows users to search for events location and event type. It uses React and Google Calendar API.',
        links: [
          { name: 'Live App', url: 'https://amysikora.github.io/meet/' },
          { name: 'Repository', url: 'https://github.com/AmySikora/meet' },
        ],
      },
    };
  
    const modal = document.getElementById('projectModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('#projectDescription');
    const modalLinks = modal.querySelector('#projectLinks');
  
    modal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget; // Button that triggered the modal
      const projectId = button.getAttribute('data-id');
      const project = projectDetails[projectId];
  
      if (project) {
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalLinks.innerHTML = project.links
          .map(
            (link) =>
              `<a href="${link.url}" class="btn btn-secondary me-2" target="_blank">${link.name}</a>`
          )
          .join('');
      }
    });
  });
  
  