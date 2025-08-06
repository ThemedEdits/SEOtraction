document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Inputs
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const company = document.getElementById('company');
    const website = document.getElementById('website');
    const service = document.getElementById('service');
    const message = document.getElementById('message');

    // Name validation
    if (!name.value.trim()) {
      showError('nameError', 'Please enter your name');
      isValid = false;
    }

    // Email validation
    if (!email.value.trim()) {
      showError('emailError', 'Please enter your email');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError('emailError', 'Please enter a valid email');
      isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
      showError('messageError', 'Please enter your message');
      isValid = false;
    } else if (message.value.trim().length < 20) {
      showError('messageError', 'Message should be at least 20 characters');
      isValid = false;
    }

    if (isValid) {
      // ✅ Submit to server using fetch
      fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, website, service, message })
      })

        .then(res => res.json())
        .then(data => {
          if (data.success) {
            showMessage('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
          } else {
            showMessage(data.error || 'Something went wrong. Please try again.', 'error');
          }
        })
        .catch(err => {
          console.error(err);
          showMessage('Server error. Please try again later.', 'error');
        });
    } else {
      showMessage('Please fix the errors in the form', 'error');
    }
  });

  function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.previousElementSibling.style.borderColor = '#dc2626';
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
      el.previousElementSibling.style.borderColor = '#e2e8f0';
    });
  }

  function showMessage(message, type = 'success') {
    const popup = document.getElementById('popupMessage');
    const popupText = document.getElementById('popupText');
    const popupClose = document.getElementById('popupClose');

    popupText.textContent = message;

    popup.classList.remove('success', 'error');
    popup.classList.add('show', type);

    // Close on click
    popupClose.onclick = () => {
      popup.classList.remove('show');
    };

    // Auto close after 5s
    setTimeout(() => {
      popup.classList.remove('show');
    }, 5000);
  }

});
