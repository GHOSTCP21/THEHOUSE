document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // GESTION DE LA MODALE "KISA DISCORD YE?"
    // ==========================================
    const openBtn = document.getElementById('openDiscordInfo');
    const closeBtn = document.getElementById('closeDiscordInfo');
    const modal = document.getElementById('discordModal');

    // Ouvrir la modale
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
    });

    // Fermer la modale via le bouton X
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Fermer la modale en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ==========================================
    // (Optionnel) Animation d'entrée des liens
    // ==========================================
    // On peut ajouter une petite animation fluide quand la page charge
    const links = document.querySelectorAll('.link-btn');
    
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 * index); // Décalage progressif
    });
});