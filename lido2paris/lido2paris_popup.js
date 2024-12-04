// @ts-nocheck
if (!window.location.href.match(/#.*$/)) {
    (function () {
        'use strict';

        // Inclure le script Stripe
        const stripeScript = document.createElement('script');
        stripeScript.src = 'https://js.stripe.com/v3/';
        document.head.appendChild(stripeScript);

        stripeScript.onload = function () {

            /**
             * Function to show the popup with event information.
             * @param {Object} localStorageData - The data to be displayed in the popup.
             */
            function showPopup(localStorageData) {
                // Create overlay to darken the background
                const overlay = document.createElement('div');
                overlay.classList.add('june-care-overlay');
                document.body.appendChild(overlay);

                // Create popup
                const popup = document.createElement('div');
                popup.classList.add('june-care-popup');
                document.body.appendChild(popup);

                // Fetch the HTML content for the popup
                fetch('https://junecare-assurance.github.io/lido2paris/lido2paris_popup.html?v=' + new Date().getTime())
                    .then(response => response.text())
                    .then(data => {
                        popup.innerHTML = data;

                        // Update input values with eventInfo
                        document.getElementById('june-care-nameInput').value = localStorageData.name || 'Non trouvé';
                        document.getElementById('june-care-dateInput').value = localStorageData.date || 'Non trouvé';
                        document.getElementById('june-care-placeInput').value = localStorageData.place || 'Non trouvé';
                        document.getElementById('june-care-ticketsInput').value = localStorageData.numberOfTickets || 'Non trouvé';
                        document.getElementById('june-care-priceInput').value = ((localStorageData.finalPrice * 8 / 100).toFixed(2) || 'Non trouvé') + ' €';
                        document.getElementById('june-care-emailInput').value = localStorageData.email || '';
                        document.getElementById('june-care-firstNameInput').value = localStorageData.firstName || '';
                        document.getElementById('june-care-lastNameInput').value = localStorageData.lastName || '';

                        // Create and add the payNow button after content is loaded
                        const buttonContainer = document.createElement('div');
                        buttonContainer.classList.add('june-care-button-container');

                        const payButton = document.createElement('button');
                        payButton.id = 'june-care-payNow';
                        payButton.textContent = 'M\'assurer pour ' + ((localStorageData.finalPrice * 8 / 100).toFixed(2) || 'Non trouvé') + '€';
                        buttonContainer.appendChild(payButton);
                        popup.appendChild(buttonContainer);

                        // State variable to track the number of clicks
                        let isFirstClick = true;

                        // Attach events after inserting content and creating the button
                        const closePopupButton = document.getElementById('june-care-closePopup');
                        if (closePopupButton) {
                            closePopupButton.addEventListener('click', () => {
                                document.body.removeChild(popup);
                                document.body.removeChild(overlay);
                            });
                        } else {
                            console.error('closePopup button not found');
                        }

                        // When the payNow button is pressed
                        payButton.addEventListener('click', (event) => {
                            const coverageDetails = document.getElementById('june-care-coverageDetails');
                            const eventDetails = document.getElementById('june-care-eventDetails');
                            // If first click, hide benefits and show input fields
                            if (isFirstClick) {
                                coverageDetails.style.display = 'none';
                                eventDetails.style.display = 'block';
                                payButton.textContent = 'Continuer';
                                isFirstClick = false;
                            }
                            // If second click, validate fields and proceed to payment
                            else {
                                if (!validateForm()) {
                                    alert('Veuillez remplir tous les champs et accepter les conditions générales et le document d\'information.');
                                    return;
                                }
                                // Save updated information
                                const updatedEmail = document.getElementById('june-care-emailInput').value;
                                const updatedFirstName = document.getElementById('june-care-firstNameInput').value;
                                const updatedLastName = document.getElementById('june-care-lastNameInput').value;
                                localStorageData.email = updatedEmail;
                                localStorageData.firstName = updatedFirstName;
                                localStorageData.lastName = updatedLastName;
                                localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
                                // Send information to bubbleapps
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
                                        // Go to bubbleapps
                                        console.log(data.response);
                                        window.location.href = data.response.link + "test/" + data.response.id;
                                    });
                            }
                        });

                    })
                    .catch(error => console.error('Erreur lors de la récupération du fichier:', error));

                /**
                 * Function to validate the form.
                 * @returns {boolean} - Returns true if all fields are valid, otherwise false.
                 */
                function validateForm() {
                    const checkbox = document.getElementById('june-care-assurance').checked;
                    const email = document.getElementById('june-care-emailInput').value.trim();
                    const firstName = document.getElementById('june-care-firstNameInput').value.trim();
                    const lastName = document.getElementById('june-care-lastNameInput').value.trim();

                    return checkbox && email && firstName && lastName;
                }
            }

            /**
             * Function to load event information from local storage.
             */
            function loadEventInfo() {
                const localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
                if (localStorageData) {
                    showPopup(localStorageData);
                } else {
                    showPopup(localStorageData);
                    console.log('Aucune information d\'événement trouvée dans le local storage');
                }
            }

            /**
             * Function to inject CSS styles.
             */
            function injectStyles() {
                const styles = `
                    .june-care-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.8);
                        z-index: 999;
                    }

                    .june-care-popup {
                        position: fixed;
                        top: 15%;
                        left: 50%;
                        transform: translate(-50%, -10%);
                        padding: 1.5rem;
                        background-color: #FFFFFF;
                        border-radius: 0.5rem;
                        z-index: 10000;
                        max-height: 90%;
                        overflow-y: auto;
                        box-shadow: 0 1px 1px rgba(0, 0, 0, .05), 0 0 4px rgba(0, 0, 0, .03);
                    }

                    .june-care-button-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 20px;
                    }

                    #june-care-payNow {
                        padding: 15px 30px;
                        background-color: #E20100;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 18px;
                        font-weight: bold;
                        margin: auto;
                        cursor: pointer;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        transition: background-color 0.3s, transform 0.3s;
                    }

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

            // Global variable to store the elements
            let paymentElements = null;

            /**
             * Function to create the overlay elements.
             * @returns {Object} - Returns the created overlay elements.
             */
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

            /**
             * Function to handle the display of payment confirmation.
             */
            function showPaymentConfirmation() {
                if (!paymentElements) {
                    injectStyles();
                    paymentElements = createOverlay();
                }

                const { overlay, loader, checkmark, statusText } = paymentElements;

                // Display the overlay
                overlay.style.display = 'block';

                // After 2 seconds, show the confirmation
                setTimeout(() => {
                    loader.style.display = 'none';
                    checkmark.style.display = 'block';
                    statusText.textContent = 'Paiement confirmé !';

                    // After 1 additional second, call loadEventInfo
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        loader.style.display = 'block';
                        checkmark.style.display = 'none';
                        statusText.textContent = 'Veuillez patienter...';
                        loadEventInfo(); // Your existing function
                    }, 1000);
                }, 2000);
            }

            /**
             * Function to add an event listener to the button.
             */
            function addButton() {
                const intervalId = setInterval(() => {
                    const existingButton = document.querySelector('.form-submit');
                    if (existingButton) {
                        existingButton.addEventListener('click', showPaymentConfirmation);
                        clearInterval(intervalId);
                    }
                }, 1000);
            }

            // Initialization on page load
            window.addEventListener('load', () => {
                console.log('Page loaded');
                addButton();
            });
        };

    })();
}
