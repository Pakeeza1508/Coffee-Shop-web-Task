'use strict';

/**
 * UTILITY FUNCTIONS
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * NAVBAR FUNCTIONALITY
 */
const [navbar, navToggler, navbarLinks] = [
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]")
];

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
  document.body.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElements(navbarLinks, "click", closeNavbar);

/**
 * HEADER ACTIVE ON SCROLL
 */
const header = document.querySelector("[data-header]");

const activeElemOnScroll = function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElemOnScroll);

/**
 * SCROLL REVEAL EFFECT
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealOnScroll = function () {
  for (let i = 0; i < revealElements.length; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1) {
      revealElements[i].classList.add("revealed");

      if (revealElements[i].classList.contains("btn")) {
        setTimeout(function () {
          revealElements[i].style.transition = "0.25s ease";
        }, 1000);
      }
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Initial check

/**
 * COUNTER ANIMATION
 */
const counters = document.querySelectorAll(".counter");

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const updateCounter = () => {
      const increment = target / 120;
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target >= 1000 ? (target / 1000) + "K+" : target + "+";
      }
    };
    updateCounter();
  });
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  });
});

if (document.querySelector(".counter-section")) {
  counterObserver.observe(document.querySelector(".counter-section"));
}

/**
 * VIDEO PLAYER
 */
const video = document.querySelector('.video-content');
const playBtn = document.querySelector('.play-btn');

if (playBtn && video) {
  playBtn.addEventListener('click', () => {
    video.play();
    playBtn.style.display = 'none';
  });

  video.addEventListener('ended', () => {
    playBtn.style.display = 'grid';
  });
}

/**
 * MENU DATA & MODAL LOGIC
 */
const coffeeDetails = {
  "Classic Americano": {
    ingredients: "2 shots of Arabica Espresso, 150ml Purified Hot Water.",
    notes: ["Low acidity", "Hints of dark chocolate", "Best served without sugar"]
  },
  "Espresso Macchiato": {
    ingredients: "Fine ground Ethiopian beans, 30ml high-pressure steam, touch of foam.",
    notes: ["Intense aroma", "Thick golden crema", "High caffeine concentration"]
  },
  "Spanish Latte": {
    ingredients: "Espresso, Condensed milk, Steamed whole milk.",
    notes: ["Sweet and creamy", "Velvety texture", "Popular choice"]
  },
  "Iced Pistachio Latte": {
    ingredients: "Espresso, Pistachio syrup, Cold Whole Milk, Crushed roasted nuts.",
    notes: ["Creamy texture", "Slightly salty-sweet profile", "Perfect for summer"]
  },
  "Artisan Flat White": {
    ingredients: "Double ristretto shot, Micro-foamed milk.",
    notes: ["Smooth finish", "Bold coffee flavor", "Velvety mouthfeel"]
  },
  "18hr Cold Brew": {
    ingredients: "Coarse ground beans, Cold filtered water, 18-hour steep.",
    notes: ["Low acidity", "Naturally sweet", "High caffeine"]
  },
  "Butter Croissant": {
    ingredients: "Organic Flour, Grass-fed French Butter, Yeast, Sea Salt.",
    notes: ["Hand-rolled daily", "Contains Gluten", "Best served warm"]
  },
  "Berry Cheesecake": {
    ingredients: "Cream Cheese, Graham Cracker Crust, Fresh Raspberry Glaze.",
    notes: ["Vegetarian friendly", "Contains Dairy", "Rich texture"]
  },
  "Avocado Sourdough": {
    ingredients: "Stone-ground Sourdough, Smashed Hass Avocado, Chili Flakes, Lime.",
    notes: ["Vegan friendly", "Healthy fats", "High fiber"]
  },
  "Dark Chocolate Tart": {
    ingredients: "70% Cocoa Ganache, Butter Shortcrust, Gold Leaf garnish.",
    notes: ["Intense flavor", "Contains Nuts", "Premium dessert"]
  },
  "Hibiscus Berry Iced Tea": {
    ingredients: "Dried Hibiscus Petals, Fresh Raspberries, Mint, Honey.",
    notes: ["Caffeine-free", "Rich in Vitamin C", "Refreshing"]
  },
  "Velvet Hot Cocoa": {
    ingredients: "70% Dark Chocolate, Whole Milk, Vanilla Bean, Marshmallows.",
    notes: ["Rich and heavy", "Contains dairy", "Winter favorite"]
  }
};

const modal = document.getElementById("coffeeModal");
const closeBtn = document.querySelector(".close-modal");

// Global click listener for Menu Card Images (Event Delegation)
document.addEventListener('click', function (e) {
  if (e.target.tagName === 'IMG' && e.target.closest('.menu-card')) {
    const img = e.target;
    const card = img.closest('.menu-card');
    const title = card.querySelector('.card-title').innerText.trim();
    const desc = card.querySelector('.card-text').innerText;

    document.getElementById("modalImg").src = img.src;
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDesc").innerText = desc;

    const details = coffeeDetails[title] || { ingredients: "Premium Roast", notes: ["Master Roaster Blend"] };
    document.getElementById("modalIngredients").innerText = details.ingredients;

    const notesList = document.getElementById("modalNotes");
    notesList.innerHTML = details.notes.map(n => `<li>• ${n}</li>`).join('');

    modal.style.display = "block";
  }
});

if (closeBtn) {
  closeBtn.onclick = () => modal.style.display = "none";
}
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

/**
 * MENU TAB SWITCHING
 */
const btnAll = document.getElementById('btn-all');
const btnSnacks = document.getElementById('btn-snacks');
const btnDrinks = document.getElementById('btn-drinks');

const coffeeGrid = document.querySelector('.menu .grid-list'); 
const snackSection = document.getElementById('snack-section');
const drinksSection = document.getElementById('drinks-section');

function switchTab(showSection, activeBtn) {
  // Hide all sections
  if (coffeeGrid) coffeeGrid.style.display = 'none';
  if (snackSection) snackSection.style.display = 'none';
  if (drinksSection) drinksSection.style.display = 'none';
  
  // Show selected section
  if(showSection === 'coffee' && coffeeGrid) coffeeGrid.style.display = 'grid';
  else if(showSection === 'snacks' && snackSection) snackSection.style.display = 'block';
  else if(showSection === 'drinks' && drinksSection) drinksSection.style.display = 'block';

  // Reset & Update Button Styles
  [btnAll, btnSnacks, btnDrinks].forEach(btn => {
    if (btn) {
      btn.classList.remove('active');
      btn.style.borderColor = '#333';
      btn.style.color = '#aaa';
    }
  });

  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.style.borderColor = 'var(--gold)';
    activeBtn.style.color = 'var(--gold)';
  }
}

const musicBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const audio = document.getElementById('cafeMusic');

musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    musicIcon.setAttribute('name', 'pause-outline');
    musicBtn.style.boxShadow = "0 0 15px var(--gold)"; // Adds a "glowing" effect when playing
  } else {
    audio.pause();
    musicIcon.setAttribute('name', 'musical-notes-outline');
    musicBtn.style.boxShadow = "none";
  }
});

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 500) {
    backTopBtn.classList.add("active");
  } else {
    backTopBtn.classList.remove("active");
  }
});

backTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

if (btnAll) btnAll.addEventListener('click', () => switchTab('coffee', btnAll));
if (btnSnacks) btnSnacks.addEventListener('click', () => switchTab('snacks', btnSnacks));
if (btnDrinks) btnDrinks.addEventListener('click', () => switchTab('drinks', btnDrinks));