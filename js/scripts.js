(function() {
  let form = document.querySelector('#contact-form');
  let nameInput = document.querySelector('#name');
  let emailInput = document.querySelector('#email');

  function showErrorMessage(input, message) {
      let container = input.parentElement;
      let error = container.querySelector('.error-message');
      if (error) {
          container.removeChild(error);
      }

      if (message) {
          let error = document.createElement('div');
          error.classList.add('error-message');
          error.innerText = message;
          container.appendChild(error);
      }
  }

  function validateEmail() {
      let value = emailInput.value.trim();
      if (!value) {
          showErrorMessage(emailInput, 'Email is a required field.');
          return false;
      }

      if (!/\S+@\S+\.\S+/.test(value)) {
          showErrorMessage(emailInput, 'You must enter a valid email address.');
          return false;
      }

      showErrorMessage(emailInput, null);
      return true;
  }

  function validateName() {
      let value = nameInput.value.trim();
      if (!value) {
          showErrorMessage(nameInput, 'Name is a required field.');
          return false;
      }

      if (value.length < 3) {
          showErrorMessage(nameInput, 'Name must be at least 3 characters.');
          return false;
      }

      showErrorMessage(nameInput, null);
      return true;
  }

  function validateForm() {
      let isValidEmail = validateEmail();
      let isValidName = validateName();
      return isValidEmail && isValidName;
  }

  form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm()) {
          // Simulating form submission
          alert('Form submitted successfully!');
          form.reset(); // Reset the form after successful submission
      }
  });

  emailInput.addEventListener('input', validateEmail);
  nameInput.addEventListener('input', validateName);
})();

document.addEventListener('DOMContentLoaded', function() {
  const htmlProgress = 50; // Example: HTML proficiency is 50%
  const cssProgress = 30; // Example: CSS proficiency is 30%
  const jsProgress = 20; // Example: JavaScript proficiency is 20%

  setProgressBarWidth('html-progress-bar', ProgressBar);
  setProgressBarWidth('css-progress-bar', ProgressBar);
  setProgressBarWidth('js-progress-bar', ProgressBar);

  function setProgressBarWidth(id, percent) {
    console.log('Setting width for:', id, 'to', percent + '%');
    const progressBar = document.getElementById(id);
    console.log('Progress bar element:', progressBar);
    progressBar.style.width = percent + '%';
}
});