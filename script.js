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
const navbarCollapse = document.getElementById('navbarNav');

// Auto-close mobile navbar when a link is clicked
if (navbarCollapse) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });
}

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
let aosRefreshTimeout;
function filterProjects(category, btnElement) {
    const projectCards = document.querySelectorAll('.project-item');
    const filterButtons = document.querySelectorAll('.project-filter-btn');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
        btnElement.classList.add('active');
    }

    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (card._hideTimeout) {
            clearTimeout(card._hideTimeout);
            card._hideTimeout = null;
        }

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card._hideTimeout = setTimeout(() => {
                card.style.display = 'none';
                card._hideTimeout = null;
            }, 300);
        }
    });

    // Refresh AOS positions immediately for expansion and after 350ms for collapse
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }

    if (aosRefreshTimeout) clearTimeout(aosRefreshTimeout);
    aosRefreshTimeout = setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            if (typeof AOS.refreshHard === 'function') {
                AOS.refreshHard();
            } else {
                AOS.refresh();
            }
        }
        window.dispatchEvent(new Event('scroll'));
    }, 350);
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

// ==========================================
// Project Detailed Summary Modal Handler
// Loads data dynamically from summary.json
// ==========================================
let projectSummariesCache = null;

async function loadProjectSummaries() {
    if (projectSummariesCache) {
        return projectSummariesCache;
    }
    try {
        const response = await fetch('summary.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        projectSummariesCache = await response.json();
        return projectSummariesCache;
    } catch (err) {
        console.warn('Could not fetch summary.json dynamically:', err);
        return projectSummariesCache || null;
    }
}

// Preload summary.json early
loadProjectSummaries();

async function openProjectModal(projectId) {
    const modal = document.getElementById('projectModalOverlay');
    if (!modal) return;

    let summaries = await loadProjectSummaries();

    if (!summaries) {
        try {
            const resp = await fetch('summary.json');
            summaries = await resp.json();
            projectSummariesCache = summaries;
        } catch (e) {
            console.error('Failed to load project summaries:', e);
        }
    }

    const data = summaries ? summaries[projectId] : null;

    if (!data) {
        console.warn('Summary not found for project:', projectId);
        alert('Could not load detailed summary. If you opened this file directly, please run a local server (e.g., node server.js or VS Code Live Server) to view complete project details.');
        return;
    }

    const titleEl = document.getElementById('modalProjectTitle');
    const categoryEl = document.getElementById('modalProjectCategory');
    const statusEl = document.getElementById('modalProjectStatus');
    const deploymentEl = document.getElementById('modalProjectDeployment');
    const imageEl = document.getElementById('modalProjectImage');
    const summaryEl = document.getElementById('modalProjectSummary');
    const highlightsListEl = document.getElementById('modalProjectHighlights');
    const highlightsContainer = document.getElementById('modalHighlightsContainer');
    const featuresListEl = document.getElementById('modalProjectFeatures');
    const featuresContainer = document.getElementById('modalFeaturesContainer');
    const techEl = document.getElementById('modalProjectTech');
    const techContainer = document.getElementById('modalTechContainer');
    const skillsEl = document.getElementById('modalProjectSkills');
    const skillsContainer = document.getElementById('modalSkillsContainer');
    const relatedReposEl = document.getElementById('modalRelatedReposList');
    const relatedReposContainer = document.getElementById('modalRelatedReposContainer');
    const codeBtn = document.getElementById('modalCodeLink');
    const liveBtn = document.getElementById('modalLiveLink');

    if (titleEl) titleEl.innerText = data.title || 'Project Overview';
    if (categoryEl) categoryEl.innerText = data.category || 'Featured';

    if (statusEl) {
        if (data.status) {
            statusEl.innerText = data.status;
            statusEl.style.display = 'inline-block';
        } else {
            statusEl.style.display = 'none';
        }
    }

    if (deploymentEl) {
        if (data.deployment) {
            deploymentEl.innerText = data.deployment;
            deploymentEl.style.display = 'inline-block';
        } else {
            deploymentEl.style.display = 'none';
        }
    }

    if (imageEl) {
        if (data.image) {
            imageEl.src = data.image;
            imageEl.alt = data.title || 'Project Image';
            imageEl.parentElement.style.display = 'block';
        } else {
            imageEl.parentElement.style.display = 'none';
        }
    }

    if (summaryEl) {
        summaryEl.innerText = data.fullSummary || data.shortSummary || '';
    }

    // Architectural & Engineering Highlights
    if (highlightsListEl && highlightsContainer) {
        highlightsListEl.innerHTML = '';
        if (Array.isArray(data.highlights) && data.highlights.length > 0) {
            data.highlights.forEach(hl => {
                const li = document.createElement('li');
                li.innerText = hl;
                highlightsListEl.appendChild(li);
            });
            highlightsContainer.style.display = 'block';
        } else {
            highlightsContainer.style.display = 'none';
        }
    }

    // Key Features List
    if (featuresListEl && featuresContainer) {
        featuresListEl.innerHTML = '';
        if (Array.isArray(data.keyFeatures) && data.keyFeatures.length > 0) {
            data.keyFeatures.forEach(feat => {
                const li = document.createElement('li');
                li.innerText = feat;
                featuresListEl.appendChild(li);
            });
            featuresContainer.style.display = 'block';
        } else {
            featuresContainer.style.display = 'none';
        }
    }

    // Tech Stack Badges
    if (techEl && techContainer) {
        techEl.innerHTML = '';
        if (Array.isArray(data.techStack) && data.techStack.length > 0) {
            data.techStack.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'badge bg-light text-dark border';
                badge.innerText = tech;
                techEl.appendChild(badge);
            });
            techContainer.style.display = 'block';
        } else {
            techContainer.style.display = 'none';
        }
    }

    // Skills Demonstrated
    if (skillsEl && skillsContainer) {
        skillsEl.innerHTML = '';
        if (Array.isArray(data.skillsDemonstrated) && data.skillsDemonstrated.length > 0) {
            data.skillsDemonstrated.forEach(skill => {
                const pill = document.createElement('span');
                pill.className = 'skill-pill';
                pill.innerText = skill;
                skillsEl.appendChild(pill);
            });
            skillsContainer.style.display = 'block';
        } else {
            skillsContainer.style.display = 'none';
        }
    }

    // Related Repositories
    if (relatedReposEl && relatedReposContainer) {
        relatedReposEl.innerHTML = '';
        if (Array.isArray(data.relatedRepositories) && data.relatedRepositories.length > 0) {
            data.relatedRepositories.forEach(repo => {
                const repoLink = document.createElement('a');
                repoLink.className = 'related-repo-item';
                repoLink.href = repo.githubUrl || '#';
                repoLink.target = '_blank';
                repoLink.rel = 'noopener noreferrer';
                repoLink.innerHTML = `
                    <div>
                        <div class="related-repo-name"><i class="bi bi-github me-2 text-dark"></i>${repo.name}</div>
                        ${repo.description ? `<div class="related-repo-desc">${repo.description}</div>` : ''}
                    </div>
                    <i class="bi bi-box-arrow-up-right text-muted ms-2"></i>
                `;
                relatedReposEl.appendChild(repoLink);
            });
            relatedReposContainer.style.display = 'block';
        } else {
            relatedReposContainer.style.display = 'none';
        }
    }

    // Links
    if (codeBtn) {
        if (data.githubUrl) {
            codeBtn.href = data.githubUrl;
            codeBtn.style.display = 'inline-flex';
        } else {
            codeBtn.style.display = 'none';
        }
    }

    if (liveBtn) {
        if (data.liveUrl) {
            liveBtn.href = data.liveUrl;
            liveBtn.style.display = 'inline-flex';
        } else {
            liveBtn.style.display = 'none';
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModalOverlay');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleProjectModalBackdrop(event) {
    if (event.target && event.target.id === 'projectModalOverlay') {
        closeProjectModal();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

