document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Réinitialiser les messages d'erreur
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('message').textContent = '';

    // Désactiver le bouton et afficher le loader
    const submitBtn = document.getElementById('submitBtn');
    const buttonText = document.getElementById('buttonText');
    const loader = document.getElementById('loader');
    submitBtn.disabled = true;
    buttonText.style.display = 'none';
    loader.style.display = 'block';

    // Récupérer les valeurs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Validation
    let isValid = true;

    if (!email) {
      document.getElementById('emailError').textContent = 'L\'email est requis';
      document.getElementById('email').classList.add('invalid');
      isValid = false;
    } else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      document.getElementById('emailError').textContent = 'Email invalide';
      document.getElementById('email').classList.add('invalid');
      isValid = false;
    } else {
      document.getElementById('email').classList.remove('invalid');
    }

    if (!password) {
      document.getElementById('passwordError').textContent = 'Le mot de passe est requis';
      document.getElementById('password').classList.add('invalid');
      isValid = false;
    } else {
      document.getElementById('password').classList.remove('invalid');
    }

    if (isValid) {
      try {
        const userData = {
          email,
          password,
        };

        // Envoyer une requête POST à l'API de connexion
        const response = await axios.post('https://rest-api-express-livid.vercel.app/login', userData);

        // Stocker le token JWT et les données utilisateur dans localStorage
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', JSON.stringify({
            fullName: response.data.user.fullName,
            email: response.data.user.email,
          }));
          console.log('Utilisateur connecté:', response.data.user.fullName);
        }

        // Rediriger vers la page de profil
        window.location.href = 'profil.html';

      } catch (error) {
        console.error('Erreur API:', error);
        if (error.response && error.response.data.message) {
          document.getElementById('message').textContent = 'Erreur : ' + error.response.data.message;
        } else {
          document.getElementById('message').textContent = 'Erreur dans le API. Veuillez réessayer.';
        }
      }
    }

    // Réactiver le bouton et cacher le loader
    submitBtn.disabled = false;
    buttonText.style.display = 'block';
    loader.style.display = 'none';
  });