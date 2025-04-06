// Function to open CV/Resume in a new tab
function openTab(element) {
  window.open(element.getAttribute("href"), '_blank');
}

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');
  
  // Resume card hide functionality
  const resumeBtn = document.querySelector('button[href="Data/AlokRanjanNew.pdf"]');
  const heroContent = document.querySelector('.hero-content');
  
  // Hide resume card when clicking outside
  document.addEventListener('click', function(event) {
    const isResumeBtn = resumeBtn.contains(event.target);
    const isHeroContent = heroContent.contains(event.target) && !isResumeBtn;
    
    if (!isResumeBtn && !isHeroContent) {
      // If clicked outside of hero content and not on resume button, hide the hero content
      heroContent.classList.add('d-none');
    } else if (isResumeBtn) {
      // If clicked on resume button, make sure hero content is visible
      heroContent.classList.remove('d-none');
    }
  });
  
  // Show hero content by default
  heroContent.classList.remove('d-none');
  
  // Rest of back to top functionality
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) { // Show button after 300px of scrolling
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Project filtering functionality
  const filterButtons = document.querySelectorAll('.project-filter .btn');
  const projectSections = document.querySelectorAll('.project-section');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Show/hide project sections based on filter
      if (filter === 'all') {
        projectSections.forEach(section => {
          section.style.display = 'block';
        });
      } else {
        projectSections.forEach(section => {
          if (section.id === filter + '-section') {
            section.style.display = 'block';
            
            // Scroll to the section
            section.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          } else {
            section.style.display = 'none';
          }
        });
      }
    });
  });
  
  // Smooth scrolling for project filter navigation
  const projectFilterLinks = document.querySelectorAll('.project-filter .btn');
  
  projectFilterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetFilter = this.getAttribute('data-filter');
      if (targetFilter !== 'all') {
        const targetSection = document.getElementById(targetFilter + '-section');
        if (targetSection) {
          // Scroll to section with offset for navbar
          const yOffset = -100; 
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Navbar active state on scroll
  const sections = document.querySelectorAll('main div[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Add animation delay to skill progress bars
  const skillBars = document.querySelectorAll('.progress-bar');
  skillBars.forEach((bar, index) => {
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = bar.getAttribute('aria-valuenow') + '%';
    }, 500 + (index * 100));
  });
});

// Form validation and email submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const submitBtn = document.getElementById('submitBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.spinner-border');
      const formStatus = document.getElementById('form-status');
      
      // Display loading state
      btnText.textContent = 'Sending...';
      btnSpinner.classList.remove('d-none');
      submitBtn.disabled = true;
      
      // Get form data
      const templateParams = {
        from_name: document.getElementById('fullname').value,
        reply_to: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Send email using EmailJS
      emailjs.send('service_id', 'template_id', templateParams)
        .then(function(response) {
          // Handle success
          formStatus.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent successfully.</div>';
          contactForm.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
            btnText.textContent = 'Send Message';
            btnSpinner.classList.add('d-none');
            submitBtn.disabled = false;
          }, 3000);
        }, function(error) {
          // Handle error
          formStatus.innerHTML = '<div class="alert alert-danger">Oops! Something went wrong. Please try again later.</div>';
          console.error('Email sending failed:', error);
          
          // Reset button
          btnText.textContent = 'Send Message';
          btnSpinner.classList.add('d-none');
          submitBtn.disabled = false;
        });
    });
  }
});

// Email validation helper function
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

