
// ===========================
//  1. MOBILE MENU
// ===========================
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const closeMenu   = document.getElementById('closeMenu');
const overlay     = document.getElementById('overlay');

function openMenu() {
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeMenuFn() {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFn);
overlay.addEventListener('click', closeMenuFn);

// Close menu on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeMenuFn();
});


// ===========================
//  2. CART COUNTER
// ===========================
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');

function addToCart(button) {
  cartCount++;
  cartCountEl.textContent = cartCount;

  // Button feedback
  const original = button.textContent;
  button.textContent = '✔ Added!';
  button.style.background = '#067d62';
  button.style.color = '#fff';
  button.style.borderColor = '#067d62';
  button.disabled = true;

  setTimeout(function () {
    button.textContent = original;
    button.style.background = '';
    button.style.color = '';
    button.style.borderColor = '';
    button.disabled = false;
  }, 1500);

  // Cart icon bounce animation
  cartCountEl.classList.remove('bounce');
  void cartCountEl.offsetWidth; // reflow to restart animation
  cartCountEl.classList.add('bounce');
}


// ===========================
//  3. SEARCH FILTER
// ===========================
const searchInput   = document.getElementById('searchInput');
const productCards  = document.querySelectorAll('.product-card');
const noResults     = document.getElementById('noResults');

searchInput.addEventListener('input', function () {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach(function (card) {
    const name = card.getAttribute('data-name').toLowerCase();
    if (name.includes(query)) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
});


// ===========================
//  4. CART BADGE BOUNCE
//  (CSS animation via JS class)
// ===========================
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.5); }
    60%  { transform: scale(0.9); }
    100% { transform: scale(1); }
  }
  .bounce {
    animation: bounce 0.4s ease;
  }
`;
document.head.appendChild(style);


// ===========================
//  5. HIGHLIGHT ACTIVE NAV
//  Secondary nav active link
// ===========================
const secondaryLinks = document.querySelectorAll('.secondary-nav ul li a');

secondaryLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    secondaryLinks.forEach(function (l) { l.classList.remove('active-nav'); });
    link.classList.add('active-nav');
  });
});

// Inject active nav style
const navStyle = document.createElement('style');
navStyle.textContent = `
  .secondary-nav ul li a.active-nav {
    border-color: #ffffff !important;
    font-weight: 700;
  }
`;
document.head.appendChild(navStyle);


// ===========================
//  6. SMOOTH SCROLL — BACK TO TOP
// ===========================
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ===========================
//  7. NAVBAR SHADOW ON SCROLL
// ===========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


// ===========================
//  8. SEARCH BAR — ENTER KEY
// ===========================
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchInput.blur(); // close keyboard on mobile
  }
});
