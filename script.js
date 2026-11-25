/* =============================================
   SENIFY SALON — script.js
   Beginner-friendly vanilla JavaScript for:
   1. Responsive Mobile Navigation (Hamburger Menu)
   2. Accessible Full-Screen Photograph Lightbox
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* =============================================
     1. MOBILE NAVIGATION (HAMBURGER MENU)
  ============================================= */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    function toggleNav() {
      var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('is-active', !isExpanded);
      primaryNav.classList.toggle('is-active', !isExpanded);
    }

    function closeNav() {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('is-active');
      primaryNav.classList.remove('is-active');
    }

    // Toggle dropdown when clicking the hamburger button
    navToggle.addEventListener('click', toggleNav);

    // Close menu when any navigation link is clicked
    var navLinks = primaryNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close menu when clicking anywhere outside of it
    document.addEventListener('click', function (e) {
      if (
        primaryNav.classList.contains('is-active') &&
        !primaryNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeNav();
      }
    });
  }


  /* =============================================
     2. FULL-SCREEN PHOTOGRAPH LIGHTBOX
     Allows clicking any photograph in Services,
     Products and Gallery to view it uncropped, with
     Next/Previous navigation and counter for Gallery.
  ============================================= */
  var lightbox = document.getElementById('imageLightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxCounter = document.getElementById('lightboxCounter');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxBackdrop = document.getElementById('lightboxBackdrop');
  var galleryImages = Array.prototype.slice.call(
    document.querySelectorAll('#gallery .lightbox-trigger img')
  );
  var currentGalleryIndex = -1;
  var previousActiveElement = null;

  // Populate lightbox image, caption, and optional gallery counter
  function renderLightboxImage(imgElement, galleryIndex) {
    if (!lightboxImg || !imgElement) return;

    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt || 'Full-size photograph';

    var captionText = imgElement.getAttribute('data-caption') || imgElement.alt || '';
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText;
      lightboxCaption.style.display = captionText ? 'block' : 'none';
    }

    var isGalleryMode = galleryIndex >= 0 && galleryImages.length > 1;
    currentGalleryIndex = isGalleryMode ? galleryIndex : -1;

    if (lightboxCounter) {
      if (isGalleryMode) {
        lightboxCounter.textContent = (galleryIndex + 1) + ' of ' + galleryImages.length;
        lightboxCounter.removeAttribute('hidden');
      } else {
        lightboxCounter.textContent = '';
        lightboxCounter.setAttribute('hidden', '');
      }
    }

    if (lightboxPrev) {
      if (isGalleryMode) lightboxPrev.removeAttribute('hidden');
      else lightboxPrev.setAttribute('hidden', '');
    }

    if (lightboxNext) {
      if (isGalleryMode) lightboxNext.removeAttribute('hidden');
      else lightboxNext.setAttribute('hidden', '');
    }
  }

  // Open the lightbox with the clicked image
  function openLightbox(imgElement, triggerElement) {
    if (!lightbox || !lightboxImg || !imgElement) return;

    // Save the trigger element so we can restore focus when closing
    previousActiveElement = triggerElement || document.activeElement;

    var galleryIndex = galleryImages.indexOf(imgElement);
    renderLightboxImage(imgElement, galleryIndex);

    // Reveal the lightbox modal
    lightbox.removeAttribute('hidden');
    lightbox.classList.add('is-open');

    // Prevent background page from scrolling while viewing photo
    document.body.style.overflow = 'hidden';

    // Move keyboard focus into the open dialog
    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  // Move to previous or next gallery image (wraps around cleanly)
  function stepGallery(delta) {
    if (currentGalleryIndex < 0 || galleryImages.length === 0) return;
    var nextIndex = (currentGalleryIndex + delta + galleryImages.length) % galleryImages.length;
    renderLightboxImage(galleryImages[nextIndex], nextIndex);
  }

  // Close the lightbox and restore normal state
  function closeLightbox() {
    if (!lightbox || lightbox.hasAttribute('hidden')) return;

    // Hide the lightbox
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('hidden', '');
    currentGalleryIndex = -1;

    // Clear image source to stop memory retention
    if (lightboxImg) {
      lightboxImg.src = '';
      lightboxImg.alt = '';
    }

    // Restore background page scrolling
    document.body.style.overflow = '';

    // Restore focus to the button that originally opened the image
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  // Attach click events to all photograph trigger buttons
  var triggers = document.querySelectorAll('.lightbox-trigger');
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var childImg = trigger.querySelector('img');
      if (childImg) {
        openLightbox(childImg, trigger);
      }
    });
  });

  // Gallery Previous / Next button clicks
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      stepGallery(-1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', function (e) {
      e.stopPropagation();
      stepGallery(1);
    });
  }

  // Close lightbox when clicking the prominent close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // Close lightbox when clicking the dark backdrop
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // Keyboard navigation inside lightbox (Escape, ArrowLeft, ArrowRight, Tab trap)
  document.addEventListener('keydown', function (e) {
    var lightboxOpen = lightbox && !lightbox.hasAttribute('hidden');

    if (e.key === 'Escape' || e.key === 'Esc') {
      if (lightboxOpen) {
        closeLightbox();
      } else if (primaryNav && primaryNav.classList.contains('is-active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
        primaryNav.classList.remove('is-active');
        navToggle.focus();
      }
      return;
    }

    if (!lightboxOpen) return;

    if (e.key === 'ArrowRight' && currentGalleryIndex >= 0) {
      e.preventDefault();
      stepGallery(1);
    } else if (e.key === 'ArrowLeft' && currentGalleryIndex >= 0) {
      e.preventDefault();
      stepGallery(-1);
    } else if (e.key === 'Tab') {
      var focusables = [lightboxClose, lightboxPrev, lightboxNext].filter(function (el) {
        return el && !el.hasAttribute('hidden');
      });
      if (focusables.length === 0) return;

      var firstEl = focusables[0];
      var lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });


  /* =============================================
     3. EXPANDABLE CARD DETAILS (SERVICES & PRODUCTS)
     Toggles full descriptions and options
     between "View Details" and "Show Less".
  ============================================= */
  var cardToggleButtons = document.querySelectorAll('.btn-service-toggle, .btn-product-toggle');
  cardToggleButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var detailsId = button.getAttribute('aria-controls');
      var detailsPanel = detailsId ? document.getElementById(detailsId) : null;
      var card = button.closest('.service-card, .product-card');
      if (!detailsPanel) return;

      var isExpanded = button.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        detailsPanel.setAttribute('hidden', '');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'View Details';
        if (card) card.classList.remove('is-expanded');
      } else {
        detailsPanel.removeAttribute('hidden');
        button.setAttribute('aria-expanded', 'true');
        button.textContent = 'Show Less';
        if (card) card.classList.add('is-expanded');
      }
    });
  });


  /* =============================================
     4. COLLAPSIBLE ENQUIRY FORM & MAILTO PREPARATION
     Keeps the contact form hidden until clicked and
     prepares a mailto: email in the visitor's email app.
  ============================================= */
  var enquiryToggleBtn = document.getElementById('enquiryToggleBtn');
  var enquiryCloseBtn = document.getElementById('enquiryCloseBtn');
  var enquiryFormWrap = document.getElementById('enquiryFormWrap');
  var contactEnquiryForm = document.getElementById('contactEnquiryForm');
  var enquiryStatusBox = document.getElementById('enquiryStatusBox');
  var enquiryStatusHeading = document.getElementById('enquiryStatusHeading');
  var enquiryStatusBody = document.getElementById('enquiryStatusBody');
  var enquiryStatusLinkWrap = document.getElementById('enquiryStatusLinkWrap');
  var enquiryMailtoFallback = document.getElementById('enquiryMailtoFallback');

  function setEnquiryFormOpen(shouldOpen) {
    if (!enquiryFormWrap || !enquiryToggleBtn) return;

    if (shouldOpen) {
      enquiryFormWrap.removeAttribute('hidden');
      enquiryToggleBtn.setAttribute('aria-expanded', 'true');
      enquiryToggleBtn.textContent = 'Close Enquiry Form';
      var nameInput = document.getElementById('name');
      if (nameInput) nameInput.focus();
    } else {
      enquiryFormWrap.setAttribute('hidden', '');
      enquiryToggleBtn.setAttribute('aria-expanded', 'false');
      enquiryToggleBtn.textContent = 'Send an Enquiry';
      enquiryToggleBtn.focus();
    }
  }

  if (enquiryToggleBtn && enquiryFormWrap) {
    enquiryToggleBtn.addEventListener('click', function () {
      var isHidden = enquiryFormWrap.hasAttribute('hidden');
      setEnquiryFormOpen(isHidden);
    });
  }

  if (enquiryCloseBtn && enquiryFormWrap) {
    enquiryCloseBtn.addEventListener('click', function () {
      setEnquiryFormOpen(false);
    });
  }

  if (contactEnquiryForm) {
    contactEnquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl = document.getElementById('name');
      var emailEl = document.getElementById('email');
      var serviceEl = document.getElementById('service');
      var messageEl = document.getElementById('message');

      var nameVal = nameEl ? nameEl.value.trim() : '';
      var emailVal = emailEl ? emailEl.value.trim() : '';
      var serviceVal = serviceEl ? serviceEl.value.trim() : '';
      var messageVal = messageEl ? messageEl.value.trim() : '';

      if (!nameVal || !emailVal || !messageVal) {
        if (enquiryStatusBox && enquiryStatusHeading && enquiryStatusBody) {
          enquiryStatusHeading.textContent = 'Please complete the required fields';
          enquiryStatusBody.textContent =
            'Enter your name, email address, and message before preparing your email.';
          if (enquiryStatusLinkWrap) enquiryStatusLinkWrap.setAttribute('hidden', '');
          enquiryStatusBox.removeAttribute('hidden');
        }
        if (!nameVal && nameEl) nameEl.focus();
        else if (!emailVal && emailEl) emailEl.focus();
        else if (!messageVal && messageEl) messageEl.focus();
        return;
      }

      if (emailEl && !emailEl.checkValidity()) {
        if (enquiryStatusBox && enquiryStatusHeading && enquiryStatusBody) {
          enquiryStatusHeading.textContent = 'Please enter a valid email address';
          enquiryStatusBody.textContent =
            'Enter a valid reply email address (for example, name@example.com) before preparing your email.';
          if (enquiryStatusLinkWrap) enquiryStatusLinkWrap.setAttribute('hidden', '');
          enquiryStatusBox.removeAttribute('hidden');
        }
        emailEl.focus();
        return;
      }

      var subject = 'Senify Salon Enquiry' + (serviceVal ? ' — ' + serviceVal : '');
      var bodyLines = [
        'Hello Senify Salon,',
        '',
        'Name: ' + nameVal,
        'Reply Email: ' + emailVal,
        'Service / Interest: ' + (serviceVal || 'Not specified'),
        '',
        'Message:',
        messageVal
      ];

      var mailtoUrl =
        'mailto:senansamuel14@gmail.com?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(bodyLines.join('\n'));

      if (enquiryMailtoFallback) {
        enquiryMailtoFallback.setAttribute('href', mailtoUrl);
      }
      if (enquiryStatusLinkWrap) {
        enquiryStatusLinkWrap.removeAttribute('hidden');
      }
      if (enquiryStatusBox && enquiryStatusHeading && enquiryStatusBody) {
        enquiryStatusHeading.textContent = 'Email prepared for your email app';
        enquiryStatusBody.textContent =
          'Your message has not been sent yet. Please review the prepared draft in your email application and click Send to email senansamuel14@gmail.com.';
        enquiryStatusBox.removeAttribute('hidden');
      }

      window.location.href = mailtoUrl;
    });
  }

});
