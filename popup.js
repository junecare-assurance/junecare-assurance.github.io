(function () {
    'use strict';

    const filename = "popup.html";
    const folder = "lido2paris";
    const buttonQuery = '';

    // Inclure le script Stripe
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/';
    document.head.appendChild(stripeScript);

    stripeScript.onload = function () {
        /**
        * Affiche la popup avec les informations de l'événement.
        * @param {Object} localStorageData - Les données à afficher dans la popup.
        */
        function showPopup(localStorageData) {
            console.log("Affichage de la popup");

            // Créer l'overlay pour assombrir l'arrière-plan
            const overlay = createOverlay();
            document.body.appendChild(overlay);

            // Créer la popup
            const popup = createPopup();
            document.body.appendChild(popup);

            // Récupérer le contenu HTML pour la popup
            fetchPopupContent(popup, localStorageData, overlay);
        }

        /**
        * Crée et retourne l'overlay.
        * @returns {HTMLDivElement} - L'élément overlay créé.
        */
        function createOverlay() {
            const overlay = document.createElement('div');
            overlay.classList.add('june-care-overlay');
            return overlay;
        }

        /**
        * Crée et retourne la popup.
        * @returns {HTMLDivElement} - L'élément popup créé.
        */
        function createPopup() {
            const popup = document.createElement('div');
            popup.classList.add('june-care-popup');
            return popup;
        }

        /**
        * Récupère le contenu HTML pour la popup et met à jour les champs avec les données localStorage.
        * @param {HTMLDivElement} popup - L'élément popup.
        * @param {Object} localStorageData - Les données à afficher dans la popup.
        * @param {HTMLDivElement} overlay - L'élément overlay.
        */
        function fetchPopupContent(popup, localStorageData, overlay) {
            const url = 'https://0muhjqihcb.execute-api.eu-west-3.amazonaws.com/dev/bubbe-test/' + filename;

            fetch(url)
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    popup.innerHTML = data;
                    updatePopupFields(localStorageData);
                    addPopupEventListeners(localStorageData);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération du fichier:', error);
                    closePopupAndOverlay(popup, overlay);
                });
        }

        /**
        * Ferme la popup et l'overlay.
        * @param {HTMLDivElement} popup - L'élément popup.
        * @param {HTMLDivElement} overlay - L'élément overlay.
        */
        function closePopupAndOverlay(popup, overlay) {
            if (popup) {
                document.body.removeChild(popup);
            }
            if (overlay) {
                document.body.removeChild(overlay);
            }
        }

        /**
        * Met à jour les champs de la popup avec les données localStorage.
        * @param {Object} localStorageData - Les données à afficher dans la popup.
        */
        function updatePopupFields(localStorageData) {
            if (localStorageData) {
                updateInputField('june-care-nameInput', localStorageData.name, 'Non trouvé');
                updateInputField('june-care-dateInput', localStorageData.date, 'Non trouvé');
                updateInputField('june-care-placeInput', localStorageData.place, 'Non trouvé');
                updateInputField('june-care-ticketsInput', localStorageData.numberOfTickets, 'Non trouvé');
                updateInputField('june-care-priceInput', (localStorageData.finalPrice * 8 / 100).toFixed(2) + ' €', 'Non trouvé');
                updateInputField('june-care-emailInput', localStorageData.email, '');
                updateInputField('june-care-firstNameInput', localStorageData.firstName, '');
                updateInputField('june-care-lastNameInput', localStorageData.lastName, '');
            }
        }

        /**
        * Met à jour un champ d'entrée avec une valeur donnée.
        * @param {string} id - L'ID du champ d'entrée.
        * @param {string} value - La valeur à définir.
        * @param {string} defaultValue - La valeur par défaut si la valeur n'est pas définie.
        */
        function updateInputField(id, value, defaultValue) {
            const input = document.getElementById(id);
            if (input) {
                input.value = value ? value : defaultValue;
            }
        }

        /**
        * Ajoute les écouteurs d'événements à la popup.
        * @param {Object} localStorageData - Les données à afficher dans la popup.
        */
        function addPopupEventListeners(localStorageData) {
            const closePopupButton = document.getElementById('june-care-closePopup');
            if (closePopupButton) {
                closePopupButton.addEventListener('click', closePopup);
            } else {
                console.error('Bouton de fermeture de la popup non trouvé');
            }

            const payButton = createPayButton(localStorageData);
            payButton.addEventListener('click', handlePayButtonClick);
        }

        /**
        * Crée et retourne le bouton de paiement.
        * @param {Object} localStorageData - Les données à afficher dans la popup.
        * @returns {HTMLButtonElement} - Le bouton de paiement créé.
        */
        function createPayButton(localStorageData) {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('june-care-button-container');

            const payButton = document.createElement('button');
            payButton.id = 'june-care-payNow';
            payButton.textContent = localStorageData ? 'M\'assurer pour ' + ((localStorageData.finalPrice * 8 / 100).toFixed(2) || 'Non trouvé') + '€' : 'M\'assurer pour 10€';
            buttonContainer.appendChild(payButton);
            document.querySelector('.june-care-popup').appendChild(buttonContainer);

            return payButton;
        }

        /**
        * Gère le clic sur le bouton de paiement.
        */
        function handlePayButtonClick() {
            const coverageDetails = document.getElementById('june-care-coverageDetails');
            const eventDetails = document.getElementById('june-care-eventDetails');
            const payButton = document.getElementById('june-care-payNow');

            if (isFirstClick) {
                coverageDetails.style.display = 'none';
                eventDetails.style.display = 'block';
                payButton.textContent = 'Continuer';
                isFirstClick = false;
            } else {
                if (!validateForm()) {
                    alert('Veuillez remplir tous les champs et accepter les conditions générales et le document d\'information.');
                    return;
                }
                processPayment();
            }
        }

        /**
        * Valide le formulaire.
        * @returns {boolean} - Retourne vrai si tous les champs sont valides, sinon faux.
        */
        function validateForm() {
            const checkbox = document.getElementById('june-care-assurance').checked;
            const email = document.getElementById('june-care-emailInput').value.trim();
            const firstName = document.getElementById('june-care-firstNameInput').value.trim();
            const lastName = document.getElementById('june-care-lastNameInput').value.trim();

            return checkbox && email && firstName && lastName;
        }

        /**
        * Traite le paiement.
        */
        function processPayment() {
            fetch('https://pg-ai.bubbleapps.io/version-test/api/1.1/wf/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prix: '125',
                    name: "Cabanes",
                    email: document.getElementById('june-care-emailInput').value,
                    firstname: document.getElementById('june-care-firstNameInput').value,
                    lastname: document.getElementById('june-care-lastNameInput').value,
                    link: window.location.href
                })
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = data.response.link + "test/" + data.response.id;
            });
        }

        /**
        * Ferme la popup.
        */
        function closePopup() {
            document.body.removeChild(document.querySelector('.june-care-popup'));
            document.body.removeChild(document.querySelector('.june-care-overlay'));
        }

        /**
        * Charge les informations de l'événement depuis le localStorage.
        */
        function loadEventInfo() {
            const localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
            showPopup(localStorageData);
        }


        /**
        * Ajoute un écouteur d'événements à tous les boutons de la page ou à des boutons spécifiques en fonction de la requête.
        */
        function addButtonEventListeners() {
            const intervalId = setInterval(() => {
                const buttons = document.querySelectorAll('button');

                // Vérifier si des boutons existent
                if (buttons.length > 0) {
                    // Ajouter un écouteur d'événements à chaque bouton
                    buttons.forEach(button => {
                        console.log("Ajout d'un écouteur d'événements au bouton");
                        button.addEventListener('click', loadEventInfo);
                    });

                    // Effacer l'intervalle une fois les boutons trouvés et les écouteurs d'événements ajoutés
                    clearInterval(intervalId);
                }
            }, 1000);
        }

        // Initialisation au chargement de la page
        window.addEventListener('load', () => {
            injectStyles();
            addButtonEventListeners();
        });

        // Variables globales
        let isFirstClick = true;
    };

})();
