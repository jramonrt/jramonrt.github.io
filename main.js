document.addEventListener('DOMContentLoaded', function() {
    // 1. Smooth Scrolling para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottom = '1px solid #30363d';
            navbar.style.backgroundColor = 'rgba(13, 17, 23, 0.95)';
        } else {
            navbar.style.borderBottom = '1px solid transparent';
            navbar.style.backgroundColor = 'rgba(13, 17, 23, 0.85)';
        }
    });

    // 3. Fade-in animation on scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });




    // Ofuscación de Email
    const user = 'publicmailgithubpages'; // Parte antes de la @
    const domain = 'gmail.com';   // Parte después de la @
    const emailLink = document.getElementById('email-link');
    const feedback = document.getElementById('email-feedback');

    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const fullEmail = `${user}@${domain}`;
            
            // 1. Copiar al portapapeles
            navigator.clipboard.writeText(fullEmail).then(() => {
                // Feedback visual
                feedback.style.opacity = '1';
                setTimeout(() => {
                    feedback.style.opacity = '0';
                }, 2000);
            });

            // 2. Abrir cliente de correo (opcional, si prefieres solo copiar, borra esta línea)
            window.location.href = `mailto:${fullEmail}`;
        });
    }

    
});