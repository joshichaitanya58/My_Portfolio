// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Navbar background change & active link indicator on scroll
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Navbar styling change
    if (window.pageYOffset > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    }

    // Scroll active link highlight
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project Filtering
function filterProjects(category, btnElement) {
    const projectCards = document.querySelectorAll('.project-item');
    const filterButtons = document.querySelectorAll('.project-filter-btn');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
        btnElement.classList.add('active');
    }

    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Counter animation for Hero Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 30; // speed factor

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count) + '+';
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCount();
    });
}

// Trigger counter animation when home section is visible
let counted = false;
window.addEventListener('scroll', () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const sectionPos = homeSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !counted) {
            animateCounters();
            counted = true;
        }
    }
});

