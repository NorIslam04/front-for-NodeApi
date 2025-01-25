const userdata = JSON.parse(localStorage.getItem('userData'));
        // Simuler les données utilisateur
        const userData = {
            fullName: userdata.fullName,
            email: userdata.email,
            phone: '+33 6 12 34 56 78',
            birthDate: '1990-01-01',
            address: '123 Rue Example, 75001 Paris',
            bio: 'Passionné par la technologie et l\'innovation.'
        };

        // Remplir le formulaire avec les données
        function loadUserData() {
            document.getElementById('fullName').value = userData.fullName;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;
            document.getElementById('birthDate').value = userData.birthDate;
            document.getElementById('address').value = userData.address;
            document.getElementById('bio').value = userData.bio;
            
            // Mettre à jour l'en-tête
            document.getElementById('userName').textContent = userData.fullName;
            document.getElementById('userEmail').textContent = userData.email;
        }

        // Activer/désactiver le mode édition
        function toggleEditMode() {
            const inputs = document.querySelectorAll('#profileForm input, #profileForm textarea');
            const buttons = document.getElementById('formButtons');
            inputs.forEach(input => {
                input.disabled = !input.disabled;
            });
            buttons.style.display = buttons.style.display === 'none' ? 'block' : 'none';
        }

        // Annuler les modifications
        function cancelEdit() {
            loadUserData();
            toggleEditMode();
        }

        // Gérer la soumission du formulaire
        document.getElementById('profileForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const updatedData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                birthDate: document.getElementById('birthDate').value,
                address: document.getElementById('address').value,
                bio: document.getElementById('bio').value
            };

            try {
                // Simuler une requête API
                // const response = await axios.put('http://localhost:3000/updateProfile', updatedData);
                console.log('Profil mis à jour:', updatedData);
                
                // Mettre à jour les données locales
                Object.assign(userData, updatedData);
                
                // Mettre à jour l'affichage
                document.getElementById('userName').textContent = updatedData.fullName;
                document.getElementById('userEmail').textContent = updatedData.email;
                
                // Désactiver le mode édition
                toggleEditMode();
                
                alert('Profil mis à jour avec succès !');
            } catch (error) {
                console.error('Erreur lors de la mise à jour:', error);
                alert('Erreur lors de la mise à jour du profil');
            }
        });

        // Charger les données au chargement de la page
        loadUserData();