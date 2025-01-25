document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token'); // Récupérer le token JWT

    if (!token) {
        console.error('Token non trouvé');
        // Rediriger vers la page de connexion ou d'inscription si le token n'existe pas
        window.location.href = 'sign_up.html';
        return;
    }

    // Vérifier la validité du token avec l'API
    fetch('https://rest-api-express-livid.vercel.app/verifyToken', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Envoyer le token dans l'en-tête
        }
    })
        .then(response => {
            // Vérifier si le token est valide
            if (!response.ok) {
                throw new Error('Token invalide ou expiré');
            }
            return response.json();
        })
        .then(data => {
            // Si le token est valide, charger les données du profil
            const userData = JSON.parse(localStorage.getItem('userData'));
            loadUserData(userData);
        })
        .catch(error => {
            console.error('Erreur:', error);
            localStorage.removeItem('token'); // Supprimer le token invalide
            localStorage.removeItem('userData'); // Supprimer les données utilisateur
            window.location.href = 'login.html'; // Rediriger vers la page de connexion
        });

    // Fonction pour charger les données du profil
    function loadUserData(userData) {
        document.getElementById('fullName').value = userData.fullName;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone || '+33 6 12 34 56 78'; // Valeur par défaut
        document.getElementById('birthDate').value = userData.birthDate || '1990-01-01'; // Valeur par défaut
        document.getElementById('address').value = userData.address || '123 Rue Example, 75001 Paris'; // Valeur par défaut
        document.getElementById('bio').value = userData.bio || 'Passionné par la technologie et l\'innovation.'; // Valeur par défaut

        // Mettre à jour l'en-tête
        document.getElementById('userName').textContent = userData.fullName;
        document.getElementById('userEmail').textContent = userData.email;
    }

    // Gérer la déconnexion
    document.getElementById('logoutBtn').addEventListener('click', function () {
        // Supprimer le token et les données utilisateur du localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userData');

        // Rediriger vers la page de connexion
        window.location.href = 'login.html';
    });
});