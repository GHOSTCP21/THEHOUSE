document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. GESTION DES MODALES (Ouverture / Fermeture)
    // ==========================================
    const btnGaming = document.getElementById('btnGaming');
    const btnCommunity = document.getElementById('btnCommunity');
    
    const gamingModal = document.getElementById('gamingModal');
    const communityModal = document.getElementById('communityModal');
    
    const closeGaming = document.getElementById('closeGaming');
    const closeCommunity = document.getElementById('closeCommunity');

    // Ouvrir Gaming
    btnGaming.addEventListener('click', () => {
        gamingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloque le scroll en arrière-plan
    });

    // Ouvrir Community
    btnCommunity.addEventListener('click', () => {
        communityModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Fermer les modales
    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Réactive le scroll
    };

    closeGaming.addEventListener('click', () => closeModal(gamingModal));
    closeCommunity.addEventListener('click', () => closeModal(communityModal));

    // Fermer en cliquant à l'extérieur de la modale
    window.addEventListener('click', (e) => {
        if (e.target === gamingModal) closeModal(gamingModal);
        if (e.target === communityModal) closeModal(communityModal);
    });


    // ==========================================
    // 2. LOGIQUE DU SLIDER (Menu Gaming)
    // ==========================================
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    const updateSlider = () => {
        // On déplace la piste vers la gauche en fonction de l'index (100% par slide)
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Retour au début (boucle)
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Va à la fin
        }
        updateSlider();
    });

});