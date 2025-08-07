document.addEventListener('DOMContentLoaded', function() {
  // Add copy functionality to code blocks
  document.querySelectorAll('.code-block').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '<i class="far fa-copy"></i> Copy';
    block.prepend(button);
    
    button.addEventListener('click', function() {
      const code = block.querySelector('code').innerText;
      navigator.clipboard.writeText(code);
      
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        button.innerHTML = '<i class="far fa-copy"></i> Copy';
      }, 2000);
    });
  });
  
  // Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const href = this.getAttribute('href');
    if (href === '#' || href.trim() === '') return; // Skip if href is just #

    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

});