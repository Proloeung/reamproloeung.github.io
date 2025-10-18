document.addEventListener('DOMContentLoaded', function() {
    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Animate elements on scroll ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => elementObserver.observe(el));
    
    // --- Active nav link on scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href').substring(1);
                    link.classList.toggle('active', linkHref === entry.target.id);
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(section => navObserver.observe(section));

    // --- Portfolio Lightbox & Linking ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) {
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const link = item.dataset.link;
                if (link) {
                    window.open(link, '_blank');
                } else {
                    document.getElementById('lightbox-img').src = item.dataset.imgSrc;
                    document.getElementById('lightbox-title').textContent = item.dataset.title;
                    document.getElementById('lightbox-category').textContent = item.dataset.category;
                    document.getElementById('lightbox-description').textContent = item.dataset.description;
                    lightbox.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
        if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', e => { if (e.key === "Escape") closeLightbox(); });
    }

    // --- Portfolio Filtering ---
    const filterContainer = document.querySelector('.portfolio-filters');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('button');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        const initialFilter = () => {
            const activeFilter = filterContainer.querySelector('.active').dataset.filter;
            portfolioItems.forEach(item => {
                item.classList.toggle('hide', activeFilter !== '*' && !item.classList.contains(activeFilter));
            });
        }
        initialFilter();

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                const filter = e.target.dataset.filter;

                portfolioItems.forEach(item => {
                    item.classList.toggle('hide', filter !== '*' && !item.classList.contains(filter));
                });
            });
        });
    }

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavLinks = document.querySelector('.navbar .nav-links'); // Be more specific
    const allNavLinks = document.querySelectorAll('.nav-link');

    if (navToggle && mainNavLinks) {
        navToggle.addEventListener('click', () => {
            mainNavLinks.classList.toggle('nav-active');
        });
    
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNavLinks.classList.remove('nav-active');
            });
        });
    }
});
