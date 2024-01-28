

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

    // Animation for the "About" section
    anime({
        targets: '.about-section',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: anime.stagger(200, { start: 300 })
    });

    // Animation for the "Projects" section
    anime({
        targets: project,
        translateY: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 1000,
        delay: index * 200 // A
    });

    // Animation for the "Contact" section
    anime({
        targets: '.contact-form',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: anime.stagger(200, { start: 900 })
    });
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

