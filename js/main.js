/**
 * Personal Portfolio - Kavya Sudha Kondaveeti
 * Interactive behaviors, navigation, modals, accessibility & validations
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy();
  initScrollReveal();
  initModals();
  initContactForm();
  initBackToTop();
  initDynamicYear();
  initInteractiveAIArt();
});

/* ==========================================================================
   1. Navigation & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('open')) {
        mobileToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   2. ScrollSpy: Active Section Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   3. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  // If reduced motion is requested, do nothing
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. Modals (Project Details, Resume, Certifications)
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalFooter = document.getElementById('modal-footer');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay) return;

  function openModal(title, bodyHTML, footerHTML = '') {
    modalTitle.innerHTML = title;
    modalBody.innerHTML = bodyHTML;
    modalFooter.innerHTML = footerHTML;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
  });

  // Attach to View Project Details
  const viewProjectBtn = document.getElementById('btn-view-project');
  if (viewProjectBtn) {
    viewProjectBtn.addEventListener('click', () => {
      openModal(
        'Fake Job Posting Detection',
        `
        <div class="modal-info-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Project Overview
          </h4>
          <p>
            This introductory machine learning project focuses on identifying potentially fraudulent job advertisements by analyzing linguistic features and textual data from job titles, company profiles, requirements, and job descriptions.
          </p>
        </div>

        <div class="modal-info-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>
            Pipeline & Technical Architecture
          </h4>
          <table class="modal-pipeline-table">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Tools & Methods</th>
                <th>Objective</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Preprocessing</strong></td>
                <td>Python, Pandas, Regex</td>
                <td>Data cleaning, missing value handling, stopword removal & tokenization.</td>
              </tr>
              <tr>
                <td><strong>2. EDA</strong></td>
                <td>Pandas, Matplotlib/Seaborn</td>
                <td>Distribution analysis between fraudulent and legitimate job postings.</td>
              </tr>
              <tr>
                <td><strong>3. Vectorization</strong></td>
                <td>Scikit-learn TF-IDF</td>
                <td>Transform textual descriptions into numerical feature vectors.</td>
              </tr>
              <tr>
                <td><strong>4. Classification</strong></td>
                <td>Logistic Regression & Naive Bayes</td>
                <td>Supervised classification comparing linear and probabilistic models.</td>
              </tr>
              <tr>
                <td><strong>5. Evaluation</strong></td>
                <td>Accuracy, Precision, Recall, F1</td>
                <td>Evaluating model sensitivity on imbalanced scam detection data.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal-info-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Key Highlights
          </h4>
          <p>
            Demonstrates hands-on mastery of fundamental NLP pipelines, binary classification, and handling textual data for real-world trust and safety applications.
          </p>
        </div>
        `,
        `
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-overlay').classList.remove('open'); document.body.style.overflow='';">Close</button>
        <button class="btn btn-primary btn-sm" id="modal-code-link" onclick="window.showToast('Repository link will be updated upon publication to GitHub.')">
          View Source Code
        </button>
        `
      );
    });
  }

  // Attach to View Source Code
  const viewCodeBtn = document.getElementById('btn-view-code');
  if (viewCodeBtn) {
    viewCodeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Source Code: GitHub repository placeholder (ready for your URL)');
    });
  }

  // Attach to Resume Buttons
  const resumeButtons = document.querySelectorAll('.btn-resume-trigger');
  resumeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'Resume – Kavya Sudha Kondaveeti',
        `
        <div class="modal-info-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            Profile Summary
          </h4>
          <p><strong>Name:</strong> Kavya Sudha Kondaveeti</p>
          <p><strong>Title:</strong> AI & Machine Learning Student (2nd-Year B.Tech)</p>
          <p><strong>Institution:</strong> Tirumala Engineering College, Jonnalagadda (2025–2029)</p>
          <p><strong>Email:</strong> kavya.kondaveeti2008@gmail.com | <strong>Phone:</strong> +91 8074591850</p>
        </div>

        <div class="modal-info-block">
          <h4>Core Foundation</h4>
          <p>• <strong>Programming:</strong> C Programming (Basics)</p>
          <p>• <strong>Tools:</strong> Microsoft Word, Microsoft PowerPoint</p>
          <p>• <strong>Core Skills:</strong> Problem Solving, Logical Thinking, Analytical Thinking, Teamwork, Communication</p>
          <p>• <strong>Interests:</strong> Artificial Intelligence, Machine Learning, Data Science, Intelligent Applications</p>
          <p>• <strong>Academic Background:</strong> Intermediate: 80% (Sri Chaitanya) | SSC: 86.5% (Sri Chaitanya Techno School)</p>
        </div>

        <div style="background: var(--bg-blush-soft); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; font-size: 0.9rem; color: var(--text-secondary);">
          <strong style="color: var(--primary-rose);">Note for Downloading PDF:</strong><br>
          To activate direct 1-click PDF download for recruiters, place your compiled <code>resume.pdf</code> file into this portfolio directory.
        </div>
        `,
        `
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-overlay').classList.remove('open'); document.body.style.overflow='';">Close</button>
        <a href="#contact" class="btn btn-primary btn-sm" onclick="document.getElementById('modal-overlay').classList.remove('open'); document.body.style.overflow='';">Get In Touch</a>
        `
      );
    });
  });

  // Attach to Certificate Details
  const certDetailBtns = document.querySelectorAll('.btn-cert-details');
  certDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const certType = btn.getAttribute('data-cert');
      if (certType === 'kho-kho') {
        openModal(
          'Kho-Kho Participation Certificate',
          `
          <div class="modal-info-block">
            <h4>Achievement Highlights</h4>
            <p>
              Participation in Kho-Kho sports events reflecting dedication, physical discipline, strategic on-field quick decision making, and seamless collaborative teamwork.
            </p>
          </div>
          <div style="background: var(--bg-blush-soft); border: 1px dashed var(--border-strong); border-radius: var(--radius-md); padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-rose)" stroke-width="1.5" style="margin: 0 auto 0.5rem auto;"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            <p><strong>Verified Certificate Record:</strong></p>
            <p>Document image/PDF can be linked directly here upon digitization.</p>
          </div>
          `,
          `<button class="btn btn-primary btn-sm" onclick="document.getElementById('modal-overlay').classList.remove('open'); document.body.style.overflow='';">Close</button>`
        );
      } else if (certType === 'partnerships') {
        openModal(
          'Strategic Partnerships & Collaborations Certificate',
          `
          <div class="modal-info-block">
            <h4>Course & Certification Overview</h4>
            <p>
              Course certification focusing on understanding professional collaboration models, mutual value creation, effective team partnerships, and organizational alignment.
            </p>
          </div>
          <div style="background: var(--bg-blush-soft); border: 1px dashed var(--border-strong); border-radius: var(--radius-md); padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-rose)" stroke-width="1.5" style="margin: 0 auto 0.5rem auto;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <p><strong>Verified Certificate Record:</strong></p>
            <p>Document image/PDF can be linked directly here upon digitization.</p>
          </div>
          `,
          `<button class="btn btn-primary btn-sm" onclick="document.getElementById('modal-overlay').classList.remove('open'); document.body.style.overflow='';">Close</button>`
        );
      }
    });
  });
}

/* ==========================================================================
   5. Contact Form Validation & Direct Client Mailto Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Validation
    if (!name) {
      showToast('Please provide your name.');
      nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast('Please provide a valid email address.');
      emailInput.focus();
      return;
    }

    if (!message) {
      showToast('Please provide a message.');
      messageInput.focus();
      return;
    }

    // Construct Mailto URI directly to Kavya
    const mailSubject = encodeURIComponent(subject ? `[Portfolio Inquiry] ${subject}` : `[Portfolio Inquiry] Connecting with Kavya`);
    const mailBody = encodeURIComponent(`Hello Kavya,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Portfolio Website`);
    const mailtoUrl = `mailto:kavya.kondaveeti2008@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    showToast('Opening your email app to send your message directly to Kavya...');
    
    // Trigger user's mail client
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  });
}

/* ==========================================================================
   6. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. Dynamic Year in Footer
   ========================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   8. Abstract Interactive AI Art Hover Micro-Interaction
   ========================================================================== */
function initInteractiveAIArt() {
  const frame = document.querySelector('.hero-visual-frame');
  const svg = document.querySelector('.hero-svg-art');
  if (!frame || !svg) return;

  // Gentle 3D tilt on mouse hover for desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;

      frame.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      frame.style.transition = 'transform 0.5s ease-out';
    });

    frame.addEventListener('mouseenter', () => {
      frame.style.transition = 'none';
    });
  }
}

/* ==========================================================================
   9. Toast Notification System & Clipboard Utility
   ========================================================================== */
function showToast(message, duration = 3600) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FDEEF2" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, duration);
}

// Global copy utility
window.copyToClipboard = function(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label || 'Text'} copied to clipboard!`);
    }).catch(() => {
      showToast(`Copy failed. Value: ${text}`);
    });
  } else {
    // Fallback
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(`${label || 'Text'} copied to clipboard!`);
  }
};

window.showToast = showToast;
