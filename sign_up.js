document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Réinitialiser les messages d'erreur
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Récupérer les valeurs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    let isValid = true;
    
    if (!name) {
        document.getElementById('nameError').textContent = 'Le nom est requis';
        isValid = false;
    }
    
    if (!email) {
        document.getElementById('emailError').textContent = 'L\'email est requis';
        isValid = false;
    } else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
        document.getElementById('emailError').textContent = 'Email invalide';
        isValid = false;
    }
    
    if (!password) {
        document.getElementById('passwordError').textContent = 'Le mot de passe est requis';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Le mot de passe doit contenir au moins 6 caractères';
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Les mots de passe ne correspondent pas';
        isValid = false;
    }
    
    if (isValid) {        
        try {
            const userData = {
                name,
                email,
                password
            };
            
            const response = await axios.post('https://rest-api-express-livid.vercel.app/createUserDB', userData);

            // Stocker le token JWT et les données utilisateur dans localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userData', JSON.stringify({
                    fullName: response.data.user.fullName,
                    email: response.data.user.email,
                    id: response.data.user.id
                }));
            }

            // Rediriger vers la page de profil
            window.location.href = 'profil.html';
            
        } catch (error) {
            console.error('Erreur API:', error);
            if (error.response && error.response.data.message) {
                alert('Erreur : ' + error.response.data.message);
            } else {
                alert('Erreur dans le API. Veuillez réessayer.');
            }
        } 
    }
});