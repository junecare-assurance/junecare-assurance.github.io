// @ts-nocheck

if (!window.location.href.match(/#.*$/)) {
    (function () {
        'use strict';

        // Inclure le script Stripe
        const stripeScript = document.createElement('script');
        stripeScript.src = 'https://js.stripe.com/v3/';
        document.head.appendChild(stripeScript);

        stripeScript.onload = function () {

            function showPopup(eventInfo) {


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
                        document.getElementById('nameInput').value = eventInfo.name || 'Non trouvé';
                        document.getElementById('dateInput').value = eventInfo.date || 'Non trouvé';
                        document.getElementById('placeInput').value = eventInfo.place || 'Non trouvé';
                        document.getElementById('ticketsInput').value = eventInfo.numberOfTickets || 'Non trouvé';
                        document.getElementById('priceInput').value = ((eventInfo.finalPrice * 8 / 100).toFixed(2) || 'Non trouvé') + ' €';
                        document.getElementById('emailInput').value = eventInfo.email || '';
                        document.getElementById('firstNameInput').value = eventInfo.firstName || '';
                        document.getElementById('lastNameInput').value = eventInfo.lastName || '';

                        // Créer et ajouter le bouton payNow après le chargement du contenu
                        const buttonContainer = document.createElement('div');
                        buttonContainer.style.display = 'flex';
                        buttonContainer.style.justifyContent = 'space-between';
                        buttonContainer.style.alignItems = 'center';
                        buttonContainer.style.marginTop = '20px';

                        const payButton = document.createElement('button');
                        payButton.id = 'payNow';
                        payButton.style.padding = '15px 30px';
                        payButton.style.backgroundColor = '#0079CA';
                        payButton.style.color = 'white';
                        payButton.style.border = 'none';
                        payButton.style.borderRadius = '25px';
                        payButton.style.fontSize = '18px';
                        payButton.style.fontWeight = 'bold';
                        payButton.style.margin = 'auto';
                        payButton.style.cursor = 'pointer';
                        payButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        payButton.style.transition = 'background-color 0.3s, transform 0.3s';
                        payButton.textContent = 'M\'assurer pour ' + ((eventInfo.finalPrice * 8 / 100).toFixed(2) || 'Non trouvé') + '€';
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
                                eventInfo.email = updatedEmail;
                                eventInfo.firstName = updatedFirstName;
                                eventInfo.lastName = updatedLastName;
                                localStorage.setItem('eventInfo', JSON.stringify(eventInfo));
                                //envoie des infos au bubbleapps
                                fetch('https://pg-ai.bubbleapps.io/version-test/api/1.1/wf/checkout', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        prix: eventInfo.finalPrice,
                                        name: eventInfo.name,
                                        email: eventInfo.email,
                                        date: eventInfo.date,
                                        lieu: eventInfo.place,
                                        nbrplace: eventInfo.numberOfTickets,
                                        firstname: eventInfo.firstName,
                                        lastname: eventInfo.lastName,
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

            //button pour show popup
            function addButton() {
                const intervalId = setInterval(() => {
                    const existingButton = document.querySelector('.form-submit');
                    if (existingButton) {
                        existingButton.addEventListener('click', loadEventInfo);
                        //clearInterval(intervalId);
                    }
                }, 1000);
            }
            //ajoute button on load
            window.addEventListener('load', () => {
                console.log('Page loaded');
                addButton();
            });
        };


    })()
};