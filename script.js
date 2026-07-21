document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#FFFFFF';
        navLinks.style.padding = '1.5rem';
        navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      }
    });
  }

  // Modal Functionality
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const closeModalBtn = document.getElementById('closeModal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (bookingModal) {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Modal Booking Form Submit Listener
  const modalBookingForm = document.getElementById('modalBookingForm');
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Fetch values from form fields
      const patientName = modalBookingForm.querySelector('#modalPName').value;
      const mobileNumber = modalBookingForm.querySelector('#modalPMobile').value;
      const bookingDate = modalBookingForm.querySelector('#modalPDate').value;
      const doctorChosen = modalBookingForm.querySelector('#modalPDoctor').value;
      const requiredService = modalBookingForm.querySelector('#modalPService').value;

      // 2. Construct dynamic WhatsApp message string
      const messageText = 
        `Hello, I would like to book a prior appointment at Cure My Teeth Centre. Here are my details:\n` +
        `- Patient Name: ${patientName}\n` +
        `- Mobile Number: ${mobileNumber}\n` +
        `- Booking Date: ${bookingDate}\n` +
        `- Doctor Chosen: ${doctorChosen}\n` +
        `- Required Service: ${requiredService}`;

      // 3. Safe URL encoding & redirect to clinic number (+91 90685 32622)
      const whatsappUrl = `https://wa.me/919068532622?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');

      // Reset form & close modal
      modalBookingForm.reset();
      if (bookingModal) {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ScrollSpy / Active Nav Link Handler
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const headerElement = document.querySelector('header');

  const updateActiveNavLink = () => {
    const headerOffset = headerElement ? headerElement.offsetHeight + 40 : 120;
    const scrollPos = window.scrollY + headerOffset;

    let currentSectionId = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Handle scroll to absolute bottom of page
    if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.body.offsetHeight - 20) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        currentSectionId = lastSection.getAttribute('id');
      }
    }

    if (currentSectionId) {
      navAnchorLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();
});
