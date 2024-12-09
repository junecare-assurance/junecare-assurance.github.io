(function () {
    'use strict';

    const url_filters = {
        data_collection: "https://www.greengo.voyage/checkout/",
        display_offer: "https://www.greengo.voyage/checkout/success"
    };

    const configuration = {
        display: true,
        probability_display: 0.1,
        url_filters: {
            data_collection: "https://www.greengo.voyage/checkout/",
            display_offer: "https://www.greengo.voyage/checkout/success"
        },
        value_getters: [
            {
                start_date: {
                    js_path: "form > div > div.w-full > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(2)",
                    post_processor: {
                        type: "regex",
                        value: "^(.*) -"
                    }
                }
            },
            {
                end_date: {
                    js_path: "form > div > div.w-full > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(2)",
                    post_processor: {
                        type: "regex",
                        value: "- (.*)$"
                    }
                }
            }
        ],
        insurance_price: {
            "type": "percentage",
            "value": 10,
        },
        main_color: "#f00",
        step1_offer: {
            title: "Assurance annulation",
            description: "...",
            conditions: [
                "Greve",
                "Maladie"
            ],    
            call_to_action: "S'assurer pour [prix]"
        },
        step2_values: {
            title: "Assurance annulation",
            description: "...",
            call_to_action: "C'est Parti"
        }
    };

    function extractAndStoreValues(value_getters) {
        const values = {};
        // Implement function here to get values
        localStorage.setItem('june-care-values', JSON.stringify(values));
    }

    function retrieveStoredValues() {
        const values = localStorage.getItem('june-care-values');
        if (!values) {
            // Error, notify
            return null;
        }
        return JSON.parse(values);
    }

    function buildPopup(configuration, values) {
        const popup = document.createElement('div');
        popup.classList.add('june-care-popup');
        // Implement function to build popup
        return popup;
    }

    function subscribe(values, partner) {
        const accepted_terms_and_conditions = document.getElementById('june-care-terms-and-conditions').checked;
        const email = document.getElementById('june-care-emailInput').value.trim();
        const firstName = document.getElementById('june-care-firstNameInput').value.trim();
        const lastName = document.getElementById('june-care-lastNameInput').value.trim();
        if (!(accpeted_terms_and_conditions && email && firstName && lastName)) { return; };

        fetch('https://pg-ai.bubbleapps.io/version-test/api/1.1/wf/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: values.price,
                partner: partner,
                email: email,
                firstname: firstName,
                lastname: lastName,
                redirect_url: window.location.href
            })
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = data.payment_url;
        });
    }


    // Fonction pour afficher la popup avec les informations de l'événement
    function showPopup(localStorageData) {
        console.log("Affichage de la popup");

        const overlay = createOverlay();
        document.body.appendChild(overlay);

        const popup = createPopup();
        document.body.appendChild(popup);

        fetchPopupContent(popup, localStorageData, overlay);
    }

    // Fonction pour créer l'overlay
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('june-care-overlay');
        return overlay;
    }

    // Fonction pour créer la popup
    function createPopup() {
        const popup = document.createElement('div');
        popup.classList.add('june-care-popup');
        return popup;
    }

    // Fonction pour récupérer le contenu HTML pour la popup et mettre à jour les champs avec les données localStorage
    function fetchPopupContent(popup, localStorageData, overlay) {
        popup.innerHTML = `<!-- Header section with icon and close button -->
<h2 class="june-care-header">
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"
            class="june-care-icon svg-inline--fa fa-shield-check fa-fw" viewBox="0 0 512 512">
            <path fill="currentColor"
                d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z">
            </path>
        </svg>
        Assurance annulation
    </span>
    <button id="june-care-closePopup" class="june-care-close-button">&times;</button>
</h2>

<!-- Description paragraph -->
<p>Réservez l’esprit tranquille : annulez à tout moment et bénéficiez d’un remboursement total jusqu’au jour de votre réservation</p>

<!-- Coverage details section -->
<div id="june-care-coverageDetails">
    <h4>Ce qui est couvert</h4>
    <ul class="june-care-benefits">
        <li>
            <svg class="june-care-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
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
            </svg>
            <span> Maladie ,  accident corporel grave ou Décès</span>
        </li>
        <li>
            <svg class="june-care-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
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
            </svg>
            <span> Grève</span>
        </li>
        <li>
            <svg class="june-care-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
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
            </svg>
            <span> Naissance ou complication de grossesse</span>
        </li>
        <li>
            <svg class="june-care-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
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
            </svg>
            <span> Contrainte professionnel ou Examen</span>
        </li>
        <li>
            <svg class="june-care-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
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
            </svg>
            <span> Toute autre circonstance indépendante de votre volonté vous empêchant de participer à l\'évènement</span>
        </li>
    </ul>
</div>

<!-- Event details section -->
<div id="june-care-eventDetails" style="display: none;">
    <p class="june-care-input-container"><strong>Evenement</strong> <input type="text" id="june-care-nameInput"
            value="Séjour" class="june-care-input june-care-readonly" readonly></p>
    <p class="june-care-input-container"><strong>Date</strong> <input type="text" id="june-care-dateInput"
            value="05/12/2024" class="june-care-input june-care-readonly" readonly></p>
    <p class="june-care-input-container"><strong>Lieu</strong> <input type="text" id="june-care-placeInput"
            value="Paris" class="june-care-input june-care-readonly" readonly></p>
    <p class="june-care-input-container"><strong>Nombre de billets</strong> <input type="text" id="june-care-ticketsInput"
            value="1" class="june-care-input june-care-readonly" readonly>
    </p>
    <p class="june-care-input-container"><strong>Prix final</strong> <input type="text" id="june-care-priceInput"
            value="125 €" class="june-care-input june-care-readonly"
            readonly></p>
    <p class="june-care-input-container"><strong>Email</strong> <input type="text" id="june-care-emailInput"
            value="" class="june-care-input"></p>
    <p class="june-care-input-container"><strong>Prénom</strong> <input type="text" id="june-care-firstNameInput"
            value="" class="june-care-input"></p>
    <p class="june-care-input-container"><strong>Nom de famille</strong> <input type="text" id="june-care-lastNameInput"
            value="" class="june-care-input"></p>
    <p>
        <input type="checkbox" id="june-care-assurance" name="assurance">
        En sélectionnant cette assurance, je confirme être résident de l’Union Européenne et déclare avoir pris
        connaissance, puis accepter le
        <a href="https://junecare-assurance.github.io/conditions-generales.pdf"
            class="june-care-link" target="_blank">conditions générales</a>
        et le
        <a href="https://junecare-assurance.io/document-informations.pdf"
            class="june-care-link" target="_blank">document d\'information</a>.
    </p>
</div>

<style>
    /* Style for the header */
    .june-care-header {
        color: black;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* Style for the SVG icon */
    .june-care-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }

    /* Style for the close button */
    .june-care-close-button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }

    /* Style for the input container */
    .june-care-input-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    /* Style for the strong tag inside the input container */
    .june-care-input-container strong {
        flex: 0 0 150px;
    }

    /* Style for the input fields */
    .june-care-input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    /* Style for the readonly input fields */
    .june-care-readonly {
        background-color: #f0f0f0;
        color: #888;
    }

    /* Style for the benefits list */
    .june-care-benefits {
        list-style-type: none;
        padding-inline-start: 0px;
    }

    /* Style for the list items */
    .june-care-benefits > li {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 4px;
        color: black;
    }

    /* Style for the span inside the list items */
    .june-care-benefits > li > span {
        margin-left: 8px;
    }

    /* Style for the SVG icons inside the list items */
    .june-care-benefits > li > svg {
        flex-shrink: 0;
        color: #E20100;
    }

    /* Style for the popup */
    .june-care-popup {
        font-size: 0.9rem;
        width: 540px;
    }

    /* Responsive style for the popup */
    @media (max-width: 495px) {
        .june-care-popup {
            width: 90vw;
        }
    }

    /* Style for the links */
    .june-care-link {
        color: blue;
        text-decoration: underline;
    }

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

</style>
`

        updatePopupFields(localStorageData);
        addPopupEventListeners(localStorageData);
    }

    // Fonction pour fermer la popup et l'overlay
    function closePopupAndOverlay(popup, overlay) {
        if (popup) {
            document.body.removeChild(popup);
        }
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }

    // Fonction pour mettre à jour les champs de la popup avec les données localStorage
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

    // Fonction pour mettre à jour un champ d'entrée avec une valeur donnée
    function updateInputField(id, value, defaultValue) {
        const input = document.getElementById(id);
        if (input) {
            input.value = value ? value : defaultValue;
        }
    }

    // Fonction pour ajouter les écouteurs d'événements à la popup
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

    // Fonction pour créer et retourner le bouton de paiement
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

    // Fonction pour gérer le clic sur le bouton de paiement
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

    // Fonction pour valider le formulaire
    function validateForm() {
        const checkbox = document.getElementById('june-care-assurance').checked;
        const email = document.getElementById('june-care-emailInput').value.trim();
        const firstName = document.getElementById('june-care-firstNameInput').value.trim();
        const lastName = document.getElementById('june-care-lastNameInput').value.trim();

        return checkbox && email && firstName && lastName;
    }

    // Fonction pour traiter le paiement
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

    // Fonction pour fermer la popup
    function closePopup() {
        document.body.removeChild(document.querySelector('.june-care-popup'));
        document.body.removeChild(document.querySelector('.june-care-overlay'));
    }

    // Fonction pour charger les informations de l'événement depuis le localStorage
    function loadEventInfo() {
        const localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
        showPopup(localStorageData);
    }

    // Fonction pour ajouter un écouteur d'événements à tous les boutons de la page ou à des boutons spécifiques en fonction de la requête
    function addButtonEventListeners() {
        const intervalId = setInterval(() => {
            const buttons = document.querySelectorAll('button');

            if (buttons.length > 0) {
                buttons.forEach(button => {
                    console.log("Ajout d'un écouteur d'événements au bouton");
                    button.addEventListener('click', loadEventInfo);
                });

                clearInterval(intervalId);
            }
        }, 1000);
    }

    // Initialisation au chargement de la page
    function initialize() {
        const currentUrl = window.location.href;

        value_getters.forEach(config => {
            if (currentUrl.includes(config.data.url_filter)) {
                if (config.data.function === 'saveCartInfo') {
                    saveCartInfo();
                } else if (config.data.function === 'addButtonEventListeners') {
                    addButtonEventListeners();
                }
            }
        });
    }

    // Variables globales
    let isFirstClick = true;

    // Appel direct de la fonction d'initialisation
    initialize();

})();
