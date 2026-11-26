document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // ANIMATION DES CHAPITRES AU DÉFILEMENT
    // ==========================================
    // On utilise l'Intersection Observer pour ajouter la classe "visible" 
    // quand un chapitre entre dans l'écran (effet d'apparition fluide).
    
    const chapters = document.querySelectorAll('.chapter');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Se déclenche quand 15% de l'élément est visible
    };

    const chapterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // On peut arrêter d'observer une fois que l'animation est jouée
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    chapters.forEach(chapter => {
        chapterObserver.observe(chapter);
    });


    // ==========================================
    // NAVIGATION FLUIDE (SOMMAIRE)
    // ==========================================
    // Bien que le CSS gère déjà "scroll-behavior: smooth", 
    // ce script permet de gérer un éventuel décalage dû à l'en-tête fixe.
    
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le saut brusque par défaut
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcul de la position avec un offset pour le menu fixe
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});