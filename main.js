document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // SMOOTH SCROLLING
    // ===============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================================
    // NAVBAR SCROLL EFFECT
    // ===============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Background change on scroll
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 14, 26, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(45, 55, 72, 0.8)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 14, 26, 0.8)';
            navbar.style.borderBottom = '1px solid rgba(45, 55, 72, 0.5)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ===============================================
    // INTERSECTION OBSERVER - FADE IN ANIMATIONS
    // ===============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Observe project cards with stagger effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });

    // ===============================================
    // EMAIL FUNCTIONALITY
    // ===============================================
    const user = 'publicmailgithubpages';
    const domain = 'gmail.com';
    const emailLink = document.getElementById('email-link');
    const feedback = document.getElementById('email-feedback');

    if (emailLink && feedback) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const fullEmail = `${user}@${domain}`;
            
            // Copy to clipboard
            navigator.clipboard.writeText(fullEmail).then(() => {
                // Show feedback
                feedback.classList.add('show');
                
                // Hide feedback after 3 seconds
                setTimeout(() => {
                    feedback.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Error copying email:', err);
            });

            // Optional: Open email client
            setTimeout(() => {
                window.location.href = `mailto:${fullEmail}`;
            }, 500);
        });
    }

    // ===============================================
    // PARALLAX EFFECT ON HERO WITH FADE OUT
    // ===============================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            // Calculate opacity based on scroll position
            // Starts fading after 200px, fully transparent at 600px
            const fadeStart = 200;
            const fadeEnd = 400;
            let opacity = 1;
            
            if (scrolled > fadeStart) {
                opacity = 1 - ((scrolled - fadeStart) / (fadeEnd - fadeStart));
                opacity = Math.max(0, Math.min(1, opacity)); // Clamp between 0 and 1
            }
            
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            hero.style.opacity = opacity;
        });
    }

    // ===============================================
    // CURSOR GLOW EFFECT (Optional - Advanced)
    // ===============================================
    const createCursorGlow = () => {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor-glow');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.display = 'block';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });
    };

    // Uncomment to enable cursor glow
    // createCursorGlow();

    // ===============================================
    // TYPING EFFECT FOR HERO SUBTITLE (Optional)
    // ===============================================
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // Uncomment to enable typing effect
    // const subtitle = document.querySelector('.hero h2');
    // if (subtitle) {
    //     const originalText = subtitle.textContent;
    //     setTimeout(() => typeWriter(subtitle, originalText, 80), 500);
    // }

    // ===============================================
    // PROJECT CARD TILT EFFECT
    // ===============================================
    const projectCardsForTilt = document.querySelectorAll('.project-card');
    
    projectCardsForTilt.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===============================================
    // SCROLL PROGRESS INDICATOR
    // ===============================================
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #3b82f6 100%);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    createScrollProgress();

    // ===============================================
    // ACTIVE SECTION HIGHLIGHTING IN NAV
    // ===============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // ===============================================
    // CONSOLE MESSAGE
    // ===============================================
    console.log('%c Ramón Terraza Portfolio', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%c Check', 'color: #60a5fa; font-size: 14px;');
    console.log('%c https://github.com/jramonrt', 'color: #10b981; font-size: 12px;');
});