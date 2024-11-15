// @ts-nocheck
if (!window.location.href.match(/#.*$/)) {
    (function () {
        'use strict';

        // Inclure le script Stripe
        const stripeScript = document.createElement('script');
        stripeScript.src = 'https://js.stripe.com/v3/';
        document.head.appendChild(stripeScript);

        stripeScript.onload = function () {

            function showPopup(localStorageData) {

                //Overlay qui noircit le fond
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                overlay.style.zIndex = '999';
                document.body.appendChild(overlay);

                //POPUP
                const popup = document.createElement('div');
                popup.classList.add('june-care-popup');
                popup.style.position = 'fixed';
                popup.style.top = '15%';
                popup.style.left = '50%';
                popup.style.transform = 'translate(-50%, -10%)';
                popup.style.padding = '1.5rem';
                popup.style.backgroundColor = '#FFFFFF';
                popup.style.borderRadius = '0.5rem';
                popup.style.zIndex = '10000';
                popup.style.maxHeight = '90%'; // Limite la hauteur de la popup
                popup.style.overflowY = 'auto';
                popup.style.boxShadow = '0 1px 1px rgba(0, 0, 0, .05), 0 0 4px rgba(0, 0, 0, .03)';
                document.body.appendChild(popup);

                //Recuperation du fichier html
                fetch('https://junecare-assurance.github.io/cdiscount/cdiscount_popup.html?v=' + new Date().getTime())
                    .then(response => response.text())
                    .then(data => {
                        console.log('Popup content loaded:', data);
                        popup.innerHTML = data;
                        console.log('Popup content loaded:', data);

                    })
                    .catch(error => console.error('Erreur lors de la récupération du fichier:', error));

                function validateForm() {
                    const checkbox = document.getElementById('assurance').checked;
                    const email = document.getElementById('emailInput').value.trim();
                    const firstName = document.getElementById('firstNameInput').value.trim();
                    const lastName = document.getElementById('lastNameInput').value.trim();

                    return checkbox && email && firstName && lastName;
                }
            }
            //recup eventInfo = info du user + billet
            function loadEventInfo() {
                const localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
                if (localStorageData) {
                    showPopup(localStorageData);
                } else {
                    showPopup(localStorageData);
                    console.log('Aucune information d\'événement trouvée dans le local storage');
                }
            }

            // Création et injection du CSS
            function injectStyles() {
                const styles = `
        .payment-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
        }

        .confirmation-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            min-width: 300px;
        }

        .loader {
            border: 5px solid #f3f3f3;
            border-radius: 50%;
            border-top: 5px solid #3498db;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .checkmark {
            display: none;
            color: #2ecc71;
            font-size: 50px;
            margin: 20px 0;
        }
    `;

                const styleSheet = document.createElement("style");
                styleSheet.textContent = styles;
                document.head.appendChild(styleSheet);
            }

            // Variable globale pour stocker les éléments
            let paymentElements = null;

            // Création des éléments de l'overlay
            function createOverlay() {
                const overlay = document.createElement('div');
                overlay.className = 'payment-overlay';

                const confirmationBox = document.createElement('div');
                confirmationBox.className = 'confirmation-box';

                const title = document.createElement('h2');
                title.textContent = 'Traitement du paiement';

                const loader = document.createElement('div');
                loader.className = 'loader';

                const checkmark = document.createElement('div');
                checkmark.className = 'checkmark';
                checkmark.textContent = '✓';

                const statusText = document.createElement('p');
                statusText.className = 'status-text';
                statusText.textContent = 'Veuillez patienter...';

                confirmationBox.appendChild(title);
                confirmationBox.appendChild(loader);
                confirmationBox.appendChild(checkmark);
                confirmationBox.appendChild(statusText);
                overlay.appendChild(confirmationBox);

                document.body.appendChild(overlay);

                return {
                    overlay,
                    loader,
                    checkmark,
                    statusText
                };
            }

            // Fonction principale pour gérer l'affichage de la confirmation
            function showPaymentConfirmation() {
                if (!paymentElements) {
                    injectStyles();
                    paymentElements = createOverlay();
                }

                const { overlay, loader, checkmark, statusText } = paymentElements;

                // Afficher l'overlay
                overlay.style.display = 'block';

                // Après 2 secondes, montrer la confirmation
                setTimeout(() => {
                    loader.style.display = 'none';
                    checkmark.style.display = 'block';
                    statusText.textContent = 'Paiement confirmé !';

                    // Après 1 seconde supplémentaire, lancer loadEventInfo
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        loader.style.display = 'block';
                        checkmark.style.display = 'none';
                        statusText.textContent = 'Veuillez patienter...';
                        loadEventInfo(); // Votre fonction existante
                    }, 1000);
                }, 2000);
            }

            // Fonction pour ajouter l'écouteur d'événement au bouton
            function addButton() {
                const intervalId = setInterval(() => {
                    const existingButton = document.querySelector('button[data-testid="paymentChoiceValidationButtonDefault"]');
                    if (existingButton) {
                        existingButton.addEventListener('click', showPaymentConfirmation);
                        clearInterval(intervalId);
                    }
                }, 1000);
            }

            // Initialisation au chargement de la page
            window.addEventListener('load', () => {
                console.log('Page loaded');
                addButton();
            });
        };

    })()
};
