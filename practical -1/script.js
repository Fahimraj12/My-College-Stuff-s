document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
  }

  // Scroll Spy: Highlight navigation based on current viewport
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    let scrollPos = window.scrollY || document.documentElement.scrollTop;
    
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop - 120 &&
        scrollPos < section.offsetTop + section.offsetHeight - 120
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Skills animation trigger on scroll
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const rect = skillsSection.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      if (rect.top <= viewHeight - 100) {
        document.querySelectorAll('.skill-progress').forEach(bar => {
          if (!bar.style.width) {
            bar.style.width = bar.getAttribute('data-width');
          }
        });
      }
    }
  };

  window.addEventListener('scroll', onScroll);
  // Initial check in case user lands directly on a section
  onScroll();

  // Contact Form Submission (Mock Handler)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      
      submitBtn.disabled = true;
      submitBtn.innerText = 'Sending Message...';
      
      // Simulate API Call latency
      setTimeout(() => {
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        submitBtn.innerText = 'Message Sent Successfully!';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.innerText = originalText;
        }, 3000);
      }, 1500);
    });
  }
});
