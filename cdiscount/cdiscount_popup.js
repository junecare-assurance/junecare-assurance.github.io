if (!window.location.href.match(/#.*$/)) {
    (function () {
        'use strict';
        let tot = 0;
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
                popup.style.width = '550px';
                popup.style.top = '15%';
                popup.style.left = '50%';
                popup.style.transform = 'translate(-50%, -10%)';
                popup.style.padding = '1.5rem';
                popup.style.backgroundColor = '#FFFFFF';
                popup.style.borderRadius = '4px';
                popup.style.zIndex = '10000';
                popup.style.maxHeight = '90%'; // Limite la hauteur de la popup
                popup.style.overflowY = 'auto';
                popup.style.boxShadow = '0 1px 1px rgba(0, 0, 0, .05), 0 0 4px rgba(0, 0, 0, .03)';
                document.body.appendChild(popup);

                popup.innerHTML = `
                <h2 style="color: black; display: flex; align-items: center; justify-content: space-between;font-size:20px; margin-bottom:16px;">
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"
            class="svg-inline--fa fa-shield-check fa-fw" viewBox="0 0 512 512"
            style="width: 24px; height: 24px; margin-right: 8px;">
            <path fill="currentColor"
                d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z">
            </path>
        </svg>
        Offrez-vous une tranquillité d’esprit totale !
    </span>
    <button id="closePopup" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
</h2>
<div id="coverageDetails" style="margin-bottom:8px;">
    <h4 style="font-size:14px; font-weight:600">Avec notre abonnement, protégez tous vos appareils d’un même univers, sans limite :</h4>
    <ul class="june-care-benefits">
        <li><svg style="width: auto; height: 1em;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g id="check_x5F_alt">
                            <path style="fill:currentColor;"
                                d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M13.52,23.383 L6.158,16.02l2.828-2.828l4.533,4.535l9.617-9.617l2.828,2.828L13.52,23.383z">
                            </path>
                        </g>
                    </g>
                </g>
            </svg><span>Réparation gratuite en cas de panne</span></li>
        <li><svg style="width: auto; height: 1em;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g id="check_x5F_alt">
                            <path style="fill:currentColor;"
                                d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M13.52,23.383 L6.158,16.02l2.828-2.828l4.533,4.535l9.617-9.617l2.828,2.828L13.52,23.383z">
                            </path>
                        </g>
                    </g>
                </g>
            </svg><span>Bon d’achat offert si l’appareil est irréparable</span></li>
        <li><svg style="width: auto; height: 1em;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g id="check_x5F_alt">
                            <path style="fill:currentColor;"
                                d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M13.52,23.383 L6.158,16.02l2.828-2.828l4.533,4.535l9.617-9.617l2.828,2.828L13.52,23.383z">
                            </path>
                        </g>
                    </g>
                </g>
            </svg><span>Prise en charge rapide, sous 48h</span></li>
        <li><svg style="width: auto; height: 1em;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g id="check_x5F_alt">
                            <path style="fill:currentColor;"
                                d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M13.52,23.383 L6.158,16.02l2.828-2.828l4.533,4.535l9.617-9.617l2.828,2.828L13.52,23.383z">
                            </path>
                        </g>
                    </g>
                </g>
            </svg><span>Livraison offerte sur tous vos achats</span></li>
    </ul>
</div>
<div id="eventDetails" style="display: none; margin-bottom: 12px;">
    <p class="june-care-input-container"><strong>Prénom</strong> <input type="text" id="firstNameInput"
            value="" class="june-care-input"></p>
    <p class="june-care-input-container"><strong>Nom de famille</strong> <input type="text" id="lastNameInput"
            value="" class="june-care-input"></p>
            <p class="june-care-input-container"><strong>Email</strong> <input type="text" id="emailInput"
            value="" class="june-care-input"></p>
            <p class="june-care-input-container"><strong>Adresse</strong> <input type="text" id="lastNameInput"
            value="" class="june-care-input"></p>
    <p>
        <input type="checkbox" id="assurance" name="assurance" style="margin: 16px 10px 0px 0px;">
        En sélectionnant cette assurance, je confirme être résident de l’Union Européenne et déclare avoir pris
        connaissance, puis accepter le
        <a
            style="color: blue; text-decoration: underline;" target="_blank">conditions générales</a>
        et le
        <a
            style="color: blue; text-decoration: underline;" target="_blank" style="margin-left:23px;">document d'information</a>.
    </p>
</div>
<style>
    .june-care-input-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .june-care-input-container strong {
        flex: 0 0 150px;
    }

    .june-care-input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .june-care-readonly {
        background-color: #f0f0f0;
        color: #888;
    }

    .june-care-benefits {
        list-style-type: none;
        padding-inline-start: 0px;
    }

    .june-care-benefits>li {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 4px 0px ;
        color: black;
    }

    .june-care-benefits>li>span {
        margin-left: 8px;
    }

    .june-care-benefits>li>svg {
        flex-shrink: 0;
        color: #16B4F2;
    }
</style>
                    <div id="junecare-plan">
    <div id="junecare-items">
        <div id="junecare-item1" class="junecare-item">
            <span>Électroménager</span>
            <input type="checkbox" checked>
        </div>
        <div id="junecare-item2" class="junecare-item">
            <span>Multimédia</span>
            <input type="checkbox">
        </div>
        <div id="junecare-item3" class="junecare-item">
            <span>Image & son</span>
            <input type="checkbox">
        </div>
    </div>
    <div style="display:flex; justify-content: center;">
        <button id="junecare-button">M'assurer pour 9,99€</button>
    </div>
</div>
<style>
    #junecare-plan {
        padding: 0px;
    }
    #junecare-title {
        font-size: 1.5em;
        margin: 0 0 10px;
        color: #333;
    }
    #junecare-price {
        font-size: 1.2em;
        color: #e74c3c;
        margin: 0 0 20px;
    }
    #junecare-price span {
        font-size: 1em;
        text-decoration: line-through;
        color: #aaa;
    }
    .junecare-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    .junecare-items {
        margin-bottom:12px;
    }
    .junecare-item:last-child {
        border-bottom: none;
    }
    .junecare-item input {
        width: 20px;
        height: 20px;
        margin-right:0px;
        accent-color: #1696e7;
    }
    .junecare-selected {
        background-color: #ffebcc;
    }
    #junecare-button {
        background-color: #16B4F2;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 24px;
        cursor: pointer;
        text-align: center;
        width: 293px;
    }
</style>

                `;

               // Ajouter l'écouteur d'événements après l'ajout de la popup au DOM
                function updatePlan() {
                    console.log("update");
                    const priceEl = document.getElementById('junecare-button');
                    const checkboxes = document.querySelectorAll('.junecare-item input[type="checkbox"]');

                    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
                    let price;


                    switch (checkedCount) {
                        case 1:
                            price = '9,99€/mois';
                            tot = 9.99 * 100 / 8;
                            break;
                        case 2:
                            price = '14,99€/mois';
                            tot = 14.99 * 100 / 8;
                            break;
                        case 3:
                            price = '19,99€/mois';
                            tot = 19.99 * 100 / 8;
                            break;
                        default:
                            price = '0,00€/mois';
                    }
                    console.log(price);
                    priceEl.textContent = "M'assurer pour " + price;
                    if (price == '0,00€/mois')
                    {
                        priceEl.style.display = 'none';
                    }
                    else
                    {
                        priceEl.style.display = 'block';
                    }
                }

                const checkboxes = document.querySelectorAll('.junecare-item input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', updatePlan);
                });

                // Initial update
                updatePlan();


const pricebut = document.getElementById('junecare-button');




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
                        pricebut.addEventListener('click', (event) => {
                            const coverageDetails = document.getElementById('coverageDetails');
                            const eventDetails = document.getElementById('eventDetails');
                            const jcplan = document.getElementById('junecare-items');
                            //Si premier click masque les avantages et montre les input
                            if (isFirstClick) {
                                coverageDetails.style.display = 'none';
                                jcplan.style.display = 'none';
                                eventDetails.style.display = 'block';
                                pricebut.textContent = 'Continuer';
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
                                        prix: tot,
                                        name: "CDiscount",
                                        email: "test@test.fr",//document.getElementById('emailInput').value.trim(),
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