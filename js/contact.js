document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();
    
    // Validate form
    let isValid = true;
    
    // Name validation
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      showError('nameError', 'Please enter your name');
      isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email');
    if (!email.value.trim()) {
      showError('emailError', 'Please enter your email');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError('emailError', 'Please enter a valid email');
      isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError('messageError', 'Please enter your message');
      isValid = false;
    } else if (message.value.trim().length < 20) {
      showError('messageError', 'Message should be at least 20 characters');
      isValid = false;
    }
    
    if (isValid) {
      // Form submission logic would go here
      // For demo, we'll show a success message
      showMessage('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
      contactForm.reset();
      
      // In a real implementation, you would:
      // 1. Send data to server
      // 2. Show loading state
      // 3. Handle response
      // 4. Show success/error message
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
  
  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.opacity = '0';
      setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.style.opacity = '1';
      }, 300);
    }, 5000);
  }
});