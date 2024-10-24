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
                fetch('https://junecare-assurance.github.io/lido2paris/lido2paris_popup.html?v=' + new Date().getTime())
                    .then(response => response.text())
                    .then(data => {
                        popup.innerHTML = data;

                        //mise a jour des valeurs des input avec les eventInfo
                        document.getElementById('nameInput').value = localStorageData.name || 'Non trouvé';
                        document.getElementById('dateInput').value = localStorageData.date || 'Non trouvé';
                        document.getElementById('placeInput').value = localStorageData.place || 'Non trouvé';
                        document.getElementById('ticketsInput').value = localStorageData.numberOfTickets || 'Non trouvé';
                        document.getElementById('priceInput').value = ((localStorageData.finalPrice * 8 / 100).toFixed(2) || 'Non trouvé') + ' €';
                        document.getElementById('emailInput').value = localStorageData.email || '';
                        document.getElementById('firstNameInput').value = localStorageData.firstName || '';
                        document.getElementById('lastNameInput').value = localStorageData.lastName || '';

                        // Créer et ajouter le bouton payNow après le chargement du contenu
                        const buttonContainer = document.createElement('div');
                        buttonContainer.style.display = 'flex';
                        buttonContainer.style.justifyContent = 'space-between';
                        buttonContainer.style.alignItems = 'center';
                        buttonContainer.style.marginTop = '20px';

                        const payButton = document.createElement('button');
                        payButton.id = 'payNow';
                        payButton.style.padding = '15px 30px';
                        payButton.style.backgroundColor = '#E20100';
                        payButton.style.color = 'white';
                        payButton.style.border = 'none';
                        payButton.style.borderRadius = '10px';
                        payButton.style.fontSize = '18px';
                        payButton.style.fontWeight = 'bold';
                        payButton.style.margin = 'auto';
                        payButton.style.cursor = 'pointer';
                        payButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        payButton.style.transition = 'background-color 0.3s, transform 0.3s';
                        payButton.textContent = 'M\'assurer pour ' + ((localStorageData.finalPrice * 8 / 100).toFixed(2) || 'Non trouvé') + '€';
                        buttonContainer.appendChild(payButton);
                        popup.appendChild(buttonContainer);

                        // Variable d'état pour suivre le nombre de clics
                        let isFirstClick = true;

                        // Attacher les événements après avoir inséré le contenu et créé le bouton
                        const closePopupButton = document.getElementById('closePopup');
                        if (closePopupButton) {
                            closePopupButton.addEventListener('click', () => {
                                document.body.removeChild(popup);
                                document.body.removeChild(overlay);
                            });
                        } else {
                            console.error('closePopup button not found');
                        }

                        //Quand le bouton est presse
                        payButton.addEventListener('click', (event) => {
                            const coverageDetails = document.getElementById('coverageDetails');
                            const eventDetails = document.getElementById('eventDetails');
                            //Si premier click masque les avantages et montre les input
                            if (isFirstClick) {
                                coverageDetails.style.display = 'none';
                                eventDetails.style.display = 'block';
                                payButton.textContent = 'Continuer';
                                isFirstClick = false;
                            }
                            //Si 2eme click fait la verif des champs et passe et payement
                            else {
                                if (!validateForm()) {
                                    alert('Veuillez remplir tous les champs et accepter les conditions générales et le document d\'information.');
                                    return;
                                }
                                //Save les nouvelles infos
                                const updatedEmail = document.getElementById('emailInput').value;
                                const updatedFirstName = document.getElementById('firstNameInput').value;
                                const updatedLastName = document.getElementById('lastNameInput').value;
                                localStorageData.email = updatedEmail;
                                localStorageData.firstName = updatedFirstName;
                                localStorageData.lastName = updatedLastName;
                                localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
                                //envoie des infos au bubbleapps
                                let num = localStorageData.numberOfTickets;
                                let text = num.toString();
                                fetch('https://pg-ai.bubbleapps.io/version-test/api/1.1/wf/checkout', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        prix: localStorageData.finalPrice,
                                        name: localStorageData.name,
                                        email: localStorageData.email,
                                        date: localStorageData.date,
                                        lieu: localStorageData.place,
                                        nbrplace: text,
                                        firstname: localStorageData.firstName,
                                        lastname: localStorageData.lastName,
                                        link: window.location.href
                                    })
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        //vas au bubbleapps
                                        console.log(data.response);
                                        window.location.href = data.response.link + "test/" + data.response.id;
                                    });
                            }
                        });

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
                    const existingButton = document.querySelector('.form-submit');
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