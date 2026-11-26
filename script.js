document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // CONFIGURATION DE L'ÉVÉNEMENT
    // ==========================================
    const EVENT_NAME = "THE HOUSE - COMEBACK";
    const EVENT_DESCRIPTION = "Team THE HOUSE ap retounen sou beton an... Ou pare ?";
    const EVENT_LOGO_URL = "assets/logo.png"; 
    const EVENT_LOCATION = "En ligne";
    
    // Date de l'événement : 1er Décembre 2026 à 00:00:00 (Fuseau horaire d'Haïti : UTC-5)
    const targetDateObj = new Date("2026-12-01T00:00:00-05:00");
    const targetDate = targetDateObj.getTime();

    // ==========================================
    // MODE TEST
    // ==========================================
    // Mettre sur true pour simuler la fin du compte à rebours
    // Mettre sur false pour le mode normal
    const TEST_MODE = false; 

    // ==========================================
    // 1. LOGIQUE DU COMPTE À REBOURS & BOUTONS
    // ==========================================
    const timerElement = document.getElementById('timer');
    const addToCalendarBtn = document.getElementById('addToCalendarBtn');
    const joinUsBtn = document.getElementById('joinUsBtn');

    // Déclaration de "interval" AVANT la fonction pour éviter les bugs
    let interval;

    const updateCountdown = () => {
        const now = new Date().getTime();
        
        // Si le MODE TEST est activé, on force la distance à être négative
        const distance = TEST_MODE ? -1 : (targetDate - now);

        // --- FIN DU TIMER ---
        if (distance < 0) {
            clearInterval(interval);
            
            // 1. On remplace le texte par "C'EST OUVERT!!"
            timerElement.innerHTML = "C'EST OUVERT!!";
            
            // 2. On remplace le bouton Calendrier par le bouton Nous Rejoindre
            addToCalendarBtn.classList.add('hidden');
            joinUsBtn.classList.remove('hidden');
            
            return;
        }

        // --- CALCUL DU TEMPS RESTANT ---
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // --- LOGIQUE D'AFFICHAGE COMPACTE ET SANS ZÉRO INUTILE ---
        let displayString = "";

        if (days > 0) {
            displayString += `${days}J `; 
        }
        
        if (days > 0 || hours > 0) {
            displayString += `${hours}H `;
        }
        
        if (days > 0 || hours > 0 || minutes > 0) {
            displayString += `${minutes}M `;
        }
        
        displayString += `${seconds}S`;

        timerElement.innerHTML = displayString;
    };

    // Lancer la fonction immédiatement
    updateCountdown();
    
    // On ne lance l'intervalle que si on n'est pas en mode test
    if (!TEST_MODE) {
        interval = setInterval(updateCountdown, 1000);
    }


    // ==========================================
    // 2. GÉNÉRATION DU FICHIER CALENDRIER (.ics)
    // ==========================================
    addToCalendarBtn.addEventListener('click', () => {
        const formatICalDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const startDate = formatICalDate(targetDateObj);
        const endDateObj = new Date(targetDateObj.getTime() + (2 * 60 * 60 * 1000)); 
        const endDate = formatICalDate(endDateObj);
        
        const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//WellnessApp//Event//FR
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${EVENT_NAME}
DESCRIPTION:${EVENT_DESCRIPTION}
DTSTART:${startDate}
DTEND:${endDate}
LOCATION:${EVENT_LOCATION}
ATTACH;FMTTYPE=image/jpeg:${EVENT_LOGO_URL}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'invitation_evenement.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });


    // ==========================================
    // 3. REDIRECTION BOUTON "NOUS REJOINDRE"
    // ==========================================
    joinUsBtn.addEventListener('click', () => {
        window.location.href = 'rejwenn.html';
    });


    // ==========================================
    // 4. REDIRECTION BOUTON "EN SAVOIR PLUS"
    // ==========================================
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    learnMoreBtn.addEventListener('click', () => {
        window.location.href = 'thehouse.html';
    });

});