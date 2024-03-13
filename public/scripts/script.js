

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('nav ul a');

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            anime({
                targets: 'html, body',
                scrollTop: targetElement.offsetTop - document.querySelector('nav').offsetHeight,
                duration: 800,
                easing: 'easeInOutQuad'
            });
        }
    }

    
});

document.addEventListener('DOMContentLoaded', function () {
    const messageMeBtn = document.getElementById('messageMeBtn');
    

    messageMeBtn.addEventListener('click', function () {
        // Prompt the user's email service
        window.location.href = 'mailto:yannietchi@gmail.com';

        
    });

    // Function to fade in an element
    function fadeIn(element, duration) {
        element.style.opacity = 0;
        let startTime;
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            element.style.opacity = progress / duration;
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const options = {
        root: null,
        threshold: 0.2
    };

    const callback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id !== 'landing') {
                animateSection(entry.target); // Animate the section
                animateContent(entry.target); // Animate the content within the section
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    function animateSection(section) {
        anime({
            targets: section,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
            easing: 'easeOutQuad'
        });
    }

    function animateContent(section) {
        anime({
            targets: section.querySelectorAll('.content > *'),
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
            easing: 'easeOutQuad',
            delay: anime.stagger(100) // Add delay between animations
        });
    }
});
