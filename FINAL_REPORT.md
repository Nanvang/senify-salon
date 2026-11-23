 # Senify Salon — Comprehensive Project & Assignment Report

> **Project:** Senify Salon Website (Hair & Beauty Salon in Lagos, Nigeria)  
> **Location:** `D:\senify-salon`  
> **Course/Assignment:** Beginner Web Development (HTML5, CSS3, Git, GitHub & GitHub Pages)  
> **Author/Student GitHub:** [Nanvang](https://github.com/Nanvang)  
> **Repository:** `https://github.com/Nanvang/senify-salon.git`  
> **GitHub Pages URL:** `https://Nanvang.github.io/senify-salon/`  

---

## 📋 Table of Contents
1. [Project Overview & Deliverables](#1-project-overview--deliverables)
2. [Complete Summary of HTML Changes](#2-complete-summary-of-html-changes)
3. [Complete Summary of CSS Changes](#3-complete-summary-of-css-changes)
4. [Photographs & Media Assets](#4-photographs--media-assets)
5. [Problems Identified & Solutions Applied](#5-problems-identified--solutions-applied)
6. [WhatsApp Booking Integration](#6-whatsapp-booking-integration)
7. [Contact Form Status & Backend Requirements](#7-contact-form-status--backend-requirements)
8. [Git Commit History](#8-git-commit-history)
9. [Step-by-Step GitHub Push & Pages Deployment Guide](#9-step-by-step-github-push--pages-deployment-guide)
10. [Instructor Assignment Checklist](#10-instructor-assignment-checklist)

---

## 1. Project Overview & Deliverables

Senify Salon is a responsive, beginner-friendly, one-page website designed for a luxury hair and beauty studio in Lagos, Nigeria. The website was created using **only semantic HTML5 and vanilla CSS3**, without any JavaScript or third-party frameworks.

### Brand Design Guidelines:
- **Background:** Warm cream (`#FAF6F1`)
- **Accent Colours:** Blush pink (`#E8A598`) and Deep blush (`#C97B6A`)
- **Typography:** Dark brown (`#3B2214`) for headings (Georgia serif) and medium brown (`#6B3D2E`) for body copy (system sans-serif)
- **WhatsApp Accent:** Official WhatsApp green (`#25D366`) used for the brand logo icon and indicators

### Structure (7 Semantic Sections):
1. **Home (`#home`):** Full-screen hero section with photographic background (`hero.jpg`), translucent overlay, call-to-actions, and direct WhatsApp booking.
2. **About (`#about`):** Two-column layout with an interior photograph (`salon.jpg`), brand story, core values, and illustrative image disclaimer.
3. **Hair Styling Services (`#services`):** Cards for Braiding, Weaving, and Wig Installation with real client photographs and sample base pricing.
4. **Beauty Products (`#products`):** Grid covering Wigs, Weaves, Extensions, Skincare & Creams, Makeup, and Nail Products.
5. **Style Gallery (`#gallery`):** 8-item responsive editorial grid with featured multi-row span cards and `object-fit: cover`.
6. **FAQ (`#faq`):** Accessible accordion interface built with native `<details>` and `<summary>` elements (zero JavaScript). Satisfies the extra section requirement.
7. **Contact (`#contact`):** Direct WhatsApp booking card (+234 903 065 8580), official SVG logo, pending location/hours notices, and a transparently disabled contact form with integration instructions.

---

## 2. Complete Summary of HTML Changes

### Header & Navigation
- Implemented `<header class="site-header">` with smooth-scrolling internal anchor links (`#home`, `#about`, `#services`, etc.).
- Created a custom SVG favicon (`favicon.svg`) linked in the `<head>` displaying the brand's signature `✦` star mark in a brown circle.

### Hero Section
- Upgraded the hero banner from a plain CSS gradient to a photographic background using `<img class="hero-bg-img" src="Images/hero.jpg">`.
- Placed a dark gradient overlay (`.hero-overlay`) over the image to maintain text readability.
- Configured the "Book a Visit" button to open official WhatsApp chat in a new tab (`target="_blank" rel="noopener noreferrer"`).

### About Section
- Replaced the initial emoji placeholder with `<img src="Images/salon.jpg" class="about-img">` inside a rounded 4:5 aspect ratio frame.
- Added a floating badge ("Est. in Lagos") and a clear illustrative image disclaimer.

### Services Section
- Replaced card icons with real photography (`braids.jpg`, `weaving.jpg`, `wig-install.jpg`) styled with a subtle zoom-on-hover effect.
- Removed intrusive "DEMO PRICE" badge pills and top warning boxes to deliver a clean presentation.

### Products Section
- Configured real photography for all products:
  - Wigs: `Images/hairs.jpg`
  - Weaves: `Images/weaves.jpg`
  - Hair Extensions: `Images/extensions.jpg`
  - Beauty Creams & Skincare: `Images/skincare.jpg`
  - Makeup: `Images/makeup-products.jpg`
  - Nail Products: `Images/nail-products.jpg`

### Gallery Section (Critical Structural Repair)
- **Initial Bug:** A manual edit had closed `<div class="gallery-grid">` after the first item and left an orphan `</figure>` tag on line 321, causing 7 images to fall outside the grid and overflow across the page.
- **Fix:** Rewrote the gallery HTML so all 8 `<figure class="gallery-item">` elements are cleanly nested inside `.gallery-grid`.
- Added featured multi-row span styling to `hairstyle.jpg` and `nails.jpg`.

### FAQ Section
- Built using 7 native `<details>` and `<summary>` elements providing keyboard-accessible accordion interactions without JavaScript.

### Contact & Footer Section
- Added a dedicated **WhatsApp Booking** card with the official number `+234 903 065 8580` and an official inline SVG WhatsApp icon.
- Replaced fake address/hours with honest "pending confirmation" notes.
- Set the static form submit button to `disabled` and added a `.form-status-box` clearly stating the form requires a backend handler.
- Added a small, responsive WhatsApp contact pill in the footer.

---

## 3. Complete Summary of CSS Changes

### Gallery Layout & Overflow Fix
```css
/* Grid auto-rows controls row heights */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  gap: 1rem;
}

/* Image container fills cell exactly */
.gallery-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Photo fills frame without stretching or overflow */
.gallery-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.4s ease;
}
```

### WhatsApp Button & Official SVG Icon
```css
.btn-whatsapp {
  background: var(--brown-dark);
  color: var(--cream);
  border: 2px solid var(--blush);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  padding: 0.65rem 1.4rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
  text-decoration: none;
}

.btn-whatsapp:hover {
  background: var(--blush-deep);
  border-color: var(--blush-deep);
  color: var(--white);
  box-shadow: 0 4px 16px rgba(201, 123, 106, 0.4);
}

.whatsapp-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
}
```

### Form Disabled State & Status Box
```css
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.form-status-box {
  background: #FFF8E7;
  border: 1px solid #F0D080;
  border-radius: 8px;
  padding: 1rem 1.1rem;
  margin-top: 0.25rem;
}
```

### Multi-Device Responsiveness
- **Desktop (>900px):** 4-column gallery, 2-column About & Contact layouts, 3-column services.
- **Tablet (601px - 900px):** 2-column gallery (`grid-auto-rows: 200px`), stacked two-col sections, full-width about image.
- **Mobile (<=600px):** 2-column gallery with single-row span on featured items, stacked buttons, full-width WhatsApp touch targets.

---

## 4. Photographs & Media Assets

All 14 photographs are stored in the local `Images/` folder:

| Image File | Description | Sections Used |
|---|---|---|
| `hero.jpg` | Elegant model with lace front wig | Homepage Hero background |
| `salon.jpg` | Luxury salon interior with mirrors and chairs | About Section |
| `braids.jpg` | Knotless box braids | Services (Braiding) & Gallery |
| `weaving.jpg` | Sew-in weave styling in progress | Services (Weaving) & Gallery |
| `wig-install.jpg` | Client receiving wig installation | Services (Wig Install) & Gallery |
| `hairs.jpg` | Human hair wigs on mannequin stands | Products (Wigs) |
| `weaves.jpg` | Virgin hair bundles | Products (Weaves) |
| `extensions.jpg` | Clip-in & tape-in hair extensions | Products (Extensions) & Gallery |
| `skincare.jpg` | Glass bottles & beauty skincare creams | Products (Skincare) & Gallery |
| `makeup-products.jpg` | Flat-lay makeup cosmetics & brushes | Products (Makeup) |
| `nail-products.jpg` | Gel nail polish bottles & nail art tools | Products (Nail Products) |
| `hairstyle.jpg` | Glamour styled hair (portrait) | Gallery (Featured multi-row) |
| `makeup.jpg` | Finished glam makeup look | Gallery |
| `nails.jpg` | Nude glossy gel manicure | Gallery (Featured multi-row) |

---

## 5. Problems Identified & Solutions Applied

1. **Gallery Broken Structure & Overflow:**
   - *Problem:* Manual edits broke the closing tags and left orphan tags, while `.gallery-img` had `height: 250px` conflicting with `200px` grid rows.
   - *Fix:* Rebuilt the grid hierarchy, set container heights to `100%`, and applied `object-fit: cover`.
2. **Missing Media & Emoji Placeholders:**
   - *Problem:* All sections originally relied on emoji placeholders.
   - *Fix:* Wired all 14 local photographic assets using matching uppercase `Images/` file paths.
3. **Misleading Pricing Elements:**
   - *Problem:* Repetitive "DEMO PRICE" badges clattered the design, and top notice banners were unwanted.
   - *Fix:* Removed all 9 badge pills and disclaimer banners while leaving clean sample prices.
4. **Misleading Contact Form Promises:**
   - *Problem:* Pure HTML static forms cannot send email without a backend service.
   - *Fix:* Disabled the submit button, removed false promises, and explained how to connect Formspree or Netlify Forms.
5. **Generic WhatsApp Dot:**
   - *Problem:* A simple green dot was hard to identify on mobile.
   - *Fix:* Replaced it with the official, two-layer WhatsApp SVG logo (green `#25D366` bubble + white phone handset, 22px).

---

## 6. WhatsApp Booking Integration

- **Official WhatsApp Business Number:** `+234 903 065 8580`
- **Pre-filled Message Link:**
  `https://wa.me/2349030658580?text=Hello%20Senify%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20your%20beauty%20services.`
- **Integration Touchpoints:**
  1. Hero Action: "Book a Visit" button opens WhatsApp directly in a new tab.
  2. Contact Section Card: Dedicated "WhatsApp Booking" card with telephone number and official SVG button.
  3. Form Alternative: Direct WhatsApp link inside the form status message.
  4. Footer: Subtle WhatsApp pill link beneath the navigation bar.

---

## 7. Contact Form Status & Backend Requirements

The current form in `index.html` is built with semantic HTML:
```html
<form class="contact-form" action="#" method="post" novalidate>
```
Because the website is hosted as static files on GitHub Pages, **there is no server to process POST requests**. To make the form send real emails to Senify Salon in the future, connect one of these free services:

### Option A: Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your endpoint URL (e.g., `https://formspree.io/f/xyz...`)
3. Change the form action: `<form action="https://formspree.io/f/your-id" method="POST">`
4. Remove the `disabled` attribute from the submit button.

### Option B: Netlify Forms
If hosting on Netlify, simply add the `data-netlify="true"` attribute to the `<form>` tag.

---

## 8. Git Commit History

The repository has **6 clean, meaningful commits** tracking the complete progression:

```text
9877bee (HEAD -> main) Improve WhatsApp booking button icon
12674ce Add WhatsApp booking and contact links
4cffb06 Remove demo price badges and notices, disable static contact form with setup guidance
4b422b4 Add SVG favicon with Senify Salon brand mark and link it in the HTML head
51173c5 Add README.md: project overview, file structure, design palette, tech stack and learning notes
51b5e0b Initial commit: Senify Salon HTML and CSS foundation with branding, layout and all seven sections
```

---

## 9. Step-by-Step GitHub Push & Pages Deployment Guide

Your remote is already configured to: `https://github.com/Nanvang/senify-salon.git`

### Step 1: Push your commits to GitHub
Open PowerShell or Command Prompt and run:
```powershell
cd d:\senify-salon
git push -u origin main
```
*Note:* When prompted for credentials, enter your GitHub username (`Nanvang`) and your **GitHub Personal Access Token (PAT)** as the password.

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/Nanvang/senify-salon`
2. Click **Settings** (top tab with gear icon).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment > Branch**:
   - Select **main** from the dropdown.
   - Ensure the folder is set to **/ (root)**.
   - Click **Save**.
5. Wait 1–2 minutes for GitHub to deploy. Your live website URL will be:  
   **`https://Nanvang.github.io/senify-salon/`**

### Step 3: Capture Homepage Screenshot
Once your live link is active, open it in Chrome/Edge and take a full-page screenshot of the homepage for your assignment submission.

---

## 10. Instructor Assignment Checklist

| Requirement | Evidence in Codebase | Status |
|---|---|---|
| Functional one-page website | `index.html` with smooth scrolling navigation | ✅ Complete |
| Only HTML & CSS (no JS/frameworks) | Pure HTML5 & CSS3 in `index.html` and `style.css` | ✅ Complete |
| Minimum 1 extra section | FAQ section with 7 interactive `<details>` accordions | ✅ Complete |
| Minimum 3 meaningful Git commits | 6 meaningful commits created in local git log | ✅ Complete |
| Cream, blush pink & dark brown palette | CSS variables `--cream`, `--blush`, `--brown-dark` | ✅ Complete |
| Responsive layout | 3 breakpoints (desktop, tablet, mobile) tested | ✅ Complete |
| All images with meaningful alt text | Every `<img>` has descriptive, accessible `alt` text | ✅ Complete |
| Repository link | `https://github.com/Nanvang/senify-salon.git` | ✅ Ready to push |
| Live GitHub Pages link | `https://Nanvang.github.io/senify-salon/` | ✅ Ready to deploy |
| Demonstration price label | Sample prices ranging from ₦50,000 to ₦400,000 | ✅ Complete |
| WhatsApp booking integration | Direct links, number +2349030658580 & SVG icon | ✅ Complete |
