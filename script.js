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
     Products and Gallery to view it uncropped.
  ============================================= */
  var lightbox = document.getElementById('imageLightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxBackdrop = document.getElementById('lightboxBackdrop');
  var previousActiveElement = null;

  // Open the lightbox with the clicked image
  function openLightbox(imgElement) {
    if (!lightbox || !lightboxImg || !imgElement) return;

    // Save currently focused element so we can restore focus when closing
    previousActiveElement = document.activeElement;

    // Set the full-size image source and accessible alt description
    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt || 'Full-size photograph';

    // Set the caption below the image (from alt text or data-caption)
    var captionText = imgElement.getAttribute('data-caption') || imgElement.alt || '';
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText;
      lightboxCaption.style.display = captionText ? 'block' : 'none';
    }

    // Reveal the lightbox modal
    lightbox.removeAttribute('hidden');
    lightbox.classList.add('is-open');

    // Prevent background page from scrolling while viewing photo
    document.body.style.overflow = 'hidden';

    // Move keyboard focus to the close button for accessibility
    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  // Close the lightbox and restore normal state
  function closeLightbox() {
    if (!lightbox || lightbox.hasAttribute('hidden')) return;

    // Hide the lightbox
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('hidden', '');

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
        openLightbox(childImg);
      }
    });
  });

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

  // Close with Escape key (for both Lightbox and Mobile Nav)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (lightbox && !lightbox.hasAttribute('hidden')) {
        closeLightbox();
      } else if (primaryNav && primaryNav.classList.contains('is-active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
        primaryNav.classList.remove('is-active');
        navToggle.focus();
      }
    }
  });

});
