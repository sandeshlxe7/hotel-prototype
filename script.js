// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  // Active link
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksEl.classList.remove('open')));

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 400));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== BOOKING FORM =====
const bookingForm = document.getElementById('bookingForm');
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkIn').min = today;
document.getElementById('checkOut').min = today;
document.getElementById('checkIn').addEventListener('change', e => {
  document.getElementById('checkOut').min = e.target.value;
});
bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  const ci = document.getElementById('checkIn').value;
  const co = document.getElementById('checkOut').value;
  if (ci && co && ci >= co) { showToast('⚠ Check-out must be after check-in.'); return; }
  showToast('✦ Availability checked! Please call us to confirm your booking.');
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('✦ Message sent! We\'ll get back to you shortly.');
  e.target.reset();
});

// ===== NEWSLETTER =====
document.getElementById('newsletterBtn').addEventListener('click', () => {
  const val = document.getElementById('newsletterEmail').value.trim();
  if (!val || !val.includes('@')) { showToast('Please enter a valid email.'); return; }
  showToast('✦ Thank you for subscribing!');
  document.getElementById('newsletterEmail').value = '';
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.room-card, .amenity-card, .testimonial-card, .gallery-item, .about-grid, .contact-grid');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  io.observe(el);
});

// ===== STATS COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 25);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-number');
      const data = [['150', '+'], ['5', '★'], ['20', '+'], ['10k', '+']];
      nums.forEach((n, i) => {
        if (i < 2 || i === 3) { n.textContent = data[i][0] + data[i][1]; }
        else {
          let v = parseInt(data[i][0]);
          animateCounter(n, v, data[i][1]);
        }
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== GALLERY LIGHTBOX =====
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-overlay span').textContent;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;cursor:pointer;';
    const pic = document.createElement('img');
    pic.src = img.src;
    pic.style.cssText = 'max-width:90vw;max-height:80vh;object-fit:contain;border:1px solid rgba(201,168,76,0.3);';
    const cap = document.createElement('p');
    cap.textContent = label;
    cap.style.cssText = 'color:#C9A84C;font-family:Cormorant Garamond,serif;font-size:1.2rem;font-style:italic;';
    const close = document.createElement('button');
    close.textContent = '✕ Close';
    close.style.cssText = 'padding:10px 24px;background:transparent;border:1px solid rgba(201,168,76,0.5);color:#C9A84C;font-size:0.75rem;letter-spacing:2px;cursor:pointer;';
    overlay.appendChild(pic);
    overlay.appendChild(cap);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => document.body.removeChild(overlay));
  });
});
