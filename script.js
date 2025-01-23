// Gestionnaire d'état simplifié
const state = {
    currentUserType: null,
    modalOpen: false
};

// Sélecteurs DOM mis en cache
const selectors = {
    modal: document.getElementById('signupModal'),
    signupForm: document.getElementById('signupForm'),
    userCards: document.querySelectorAll('.user-card'),
    closeButtons: document.querySelectorAll('.modal-close')
};

// Gestionnaire de modal
const modalHandler = {
    open(modalElement) {
        modalElement.classList.add('active');
        state.modalOpen = true;
        document.body.style.overflow = 'hidden';
    },
    close(modalElement) {
        modalElement.classList.remove('active');
        state.modalOpen = false;
        document.body.style.overflow = '';
    }
};

// Gestionnaire d'événements
function setupEventListeners() {
    // Gestion des cartes utilisateur
    selectors.userCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const button = e.target.closest('[data-action="signup"]');
            if (button) {
                state.currentUserType = card.dataset.type;
                modalHandler.open(selectors.modal);
            }
        });
    });

    // Gestion de la fermeture des modales
    selectors.closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modalHandler.close(modal);
        });
    });

    // Fermeture en cliquant en dehors
    selectors.modal.addEventListener('click', (e) => {
        if (e.target === selectors.modal) {
            modalHandler.close(selectors.modal);
        }
    });

    // Gestion du formulaire
    selectors.signupForm.addEventListener('submit', handleSignup);
}

// Gestionnaire d'inscription
function handleSignup(e) {
    e.preventDefault();
    
    const formData = {
        userType: state.currentUserType,
        age: document.getElementById('userAge').value,
        bloodType: document.getElementById('bloodType').value,
        allergies: document.getElementById('allergies').value
    };

    // Vérification de l'âge pour les patients
    if (state.currentUserType === 'patient') {
        const isChild = parseInt(formData.age) <= 5;
        formData.isChild = isChild;
    }

    console.log('Données d\'inscription:', formData);
    // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur

    // Fermer la modale après soumission
    modalHandler.close(selectors.modal);
}

// Initialisation
document.addEventListener('DOMContentLoaded', setupEventListeners);

// Optimisation des performances
document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
});