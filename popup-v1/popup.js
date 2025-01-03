(function () {
    'use strict';

    const configuration = {
        display: true,
        probability_display: 0.1,
        partner: "CoucooCabanes",
        url_filters: {
            data_collection: "https://reservation.cabanesdesgrandscepages.com/paiement-reservation.php",
            display_offer: "https://reservation.cabanesdesgrandscepages.com/paiement-reservation.php#success"
        },
        value_getters: [
            {
                start_date: {
                    js_path: "#blocRecap > div.recap-price > div.date-recap > div:nth-child(1)",
                    post_processor: {
                        type: "regex",
                        value: "^Arrivée le (.*)"
                    }
                }
            },
            {
                end_date: {
                    js_path: "#blocRecap > div.recap-price > div.date-recap > div:nth-child(3)",
                    post_processor: {
                        type: "regex",
                        value: "^Départ le (.*)"
                    }
                }
            },
            {
                price: {
                    js_path: "#bloc-total-recap",
                    post_processor: {
                        type: "regex",
                        value: "(\\d+)"
                    }
                }
            },
            {
                place: {
                    js_path: "#blocRecap > div.recap-bc > div > div.recap-bc-name",
                    post_processor: {
                        type: "regex",
                        value: "^(.*)"
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
            description: "Réserves l’esprit tranquille:  annules à tout moment et bénéficies d’un remboursement total jusqu’au jour de votre réservation",
            conditions: [
                "Maladie, accident corporel grave ou décès",
                "Grève",
                "Naissance ou complication de grossesse",
                "Contrainte professionnelle ou examen",
                "Toute autre circonstance indépendante de votre volonté vous empêchant de participer à l'évènement"
            ],
            call_to_action: "S'assurer pour [prix]"
        },
        step2_values: {
            title: "Assurance annulation",
            description: "Réserves l’esprit tranquille:  annules à tout moment et bénéficies d’un remboursement total jusqu’au jour de votre réservation",
            call_to_action: "C'est Parti"
        }
    };

    function extractAndStoreValues(value_getters) {
        const values = {};
        value_getters.forEach(getter => {
            for (const [key, config] of Object.entries(getter)) {
                const element = document.querySelector(config.js_path);
                if (element) {
                    let value = element.textContent || element.value;

                    if (config.post_processor && config.post_processor.type === "regex") {
                        const regex = new RegExp(config.post_processor.value);
                        const match = value.match(regex);
                        if (match) {
                            value = match[1];
                        }
                        console.log(match);
                        console.log(regex);
                    }

                    values[key] = value;
                }
            }
        });
        localStorage.setItem('june-care-values', JSON.stringify(values));
    }

    function retrieveStoredValues() {
        const values = localStorage.getItem('june-care-values');
        if (!values) {
            console.error('No values found in localStorage.');
            return null;
        }

        try {
            return JSON.parse(values);
        } catch (error) {
            console.error('Error parsing stored values:', error);
            return null;
        }
    }

    function buildPopup(configuration, values) {
        const popup = document.createElement('div');
        popup.classList.add('june-care-popup');

        const headerDiv = createHeader(configuration.step1_offer.title);
        const description = document.createElement('p');
        description.textContent = configuration.step1_offer.description;
        const coverage = createCoverageDetails(configuration.step1_offer.conditions);
        const eventDetailsDiv = createEventDetails(values);

        popup.appendChild(headerDiv);
        popup.appendChild(description);
        popup.appendChild(coverage);
        popup.appendChild(eventDetailsDiv);

        document.body.appendChild(popup);
        addPopupEventListeners(values, configuration.partner);
    }

    function createHeader(title) {
        const headerHTML = `
            <span class="june-care-popup_title">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"
                    class="june-care-icon" viewBox="0 0 512 512">
                    <path fill="currentColor"
                        d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z">
                    </path>
                </svg>
                <h2>${title}</h2>
            </span>
            <button id="june-care-close-popup" class="june-care-close-button">&times;</button>
        `;

        const headerDiv = document.createElement('div');
        headerDiv.innerHTML = headerHTML;
        headerDiv.classList.add("june-care-header");

        return headerDiv;
    }

    function createCoverageDetails(conditions) {
        const coverage = document.createElement('div');
        coverage.classList.add("june-care-coverage-details");

        const cover = document.createElement('h4');
        cover.textContent = "Ce qui est couvert";

        const ulElement = document.createElement('ul');
        ulElement.className = 'june-care-benefits';

        const svgContent = `
        <svg class="june-care-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
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
        `;

        conditions.forEach(condition => {
            const liElement = document.createElement('li');
            liElement.innerHTML = svgContent;

            const spanElement = document.createElement('span');
            spanElement.textContent = ` ${condition}`;

            liElement.appendChild(spanElement);
            ulElement.appendChild(liElement);
        });

        coverage.appendChild(cover);
        coverage.appendChild(ulElement);

        return coverage;
    }

    function createEventDetails(values) {
        const eventDetailsDiv = document.createElement('div');
        eventDetailsDiv.id = "june-care-event-details";
        eventDetailsDiv.style.display = "none";

        const eventDetails = [
            { label: "Evenement", id: "june-care-nameInput", value:configuration.partner },
            { label: "Date", id: "june-care-dateInput", value: values.start_date },
            { label: "Lieu", id: "june-care-placeInput", value: values.place },
            { label: "Nombre de billets", id: "june-care-ticketsInput", value: 1 },
            { label: "Prix final", id: "june-care-priceInput", value: values.price },
            { label: "Email", id: "june-care-emailInput", value: "" },
            { label: "Prénom", id: "june-care-firstNameInput", value: "" },
            { label: "Nom de famille", id: "june-care-lastNameInput", value: "" }
        ];

        eventDetails.forEach(detail => {
            const inputContainer = document.createElement('p');
            inputContainer.classList.add("june-care-input-container");

            const strongElement = document.createElement('strong');
            strongElement.textContent = detail.label;

            const inputElement = document.createElement('input');
            inputElement.type = "text";
            inputElement.id = detail.id;
            inputElement.value = detail.value;
            inputElement.classList.add("june-care-input");
            if (detail.value) {
                inputElement.classList.add("june-care-readonly");
                inputElement.readOnly = true;
            }

            inputContainer.appendChild(strongElement);
            inputContainer.appendChild(inputElement);
            eventDetailsDiv.appendChild(inputContainer);
        });

        const checkboxContainer = document.createElement('p');
        const checkboxInput = document.createElement('input');
        checkboxInput.type = "checkbox";
        checkboxInput.id = "june-care-assurance";
        checkboxInput.name = "assurance";

        const checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = "En sélectionnant cette assurance, je confirme être résident de l’Union Européenne et déclare avoir pris connaissance, puis accepter le ";

        const conditionsLink = document.createElement('a');
        conditionsLink.href = "https://junecare-assurance.github.io/conditions-generales.pdf";
        conditionsLink.classList.add("june-care-link");
        conditionsLink.target = "_blank";
        conditionsLink.textContent = "conditions générales";

        const infoLink = document.createElement('a');
        infoLink.href = "https://junecare-assurance.io/document-informations.pdf";
        infoLink.classList.add("june-care-link");
        infoLink.target = "_blank";
        infoLink.textContent = "document d'information";

        checkboxLabel.appendChild(conditionsLink);
        checkboxLabel.appendChild(document.createTextNode(" et le "));
        checkboxLabel.appendChild(infoLink);
        checkboxLabel.appendChild(document.createTextNode("."));

        checkboxContainer.appendChild(checkboxInput);
        checkboxContainer.appendChild(checkboxLabel);
        eventDetailsDiv.appendChild(checkboxContainer);

        return eventDetailsDiv;
    }

    function subscribe(values, partner) {
        const accepted_terms_and_conditions = document.getElementById('june-care-assurance').checked;
        const email = document.getElementById('june-care-emailInput').value.trim();
        const firstName = document.getElementById('june-care-firstNameInput').value.trim();
        const lastName = document.getElementById('june-care-lastNameInput').value.trim();
        if (!(accepted_terms_and_conditions && email && firstName && lastName)) {
            alert('Veuillez remplir tous les champs et accepter les conditions générales et le document d\'information.');
            return;
        }

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
            window.location.href = data.response.payment_url;
        });
    }

    function closePopupAndOverlay(popup, overlay) {
        if (popup) {
            document.body.removeChild(popup);
        }
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }

    function updatePopupFields(localStorageData) {
        if (localStorageData) {
            updateInputField('june-care-nameInput', localStorageData.name, 'Non trouvé');
            updateInputField('june-care-dateInput', localStorageData.start_date, 'Non trouvé');
            updateInputField('june-care-placeInput', localStorageData.place, 'Non trouvé');
            updateInputField('june-care-ticketsInput', localStorageData.numberOfTickets, 'Non trouvé');
            updateInputField('june-care-priceInput', (localStorageData.price * 8 / 100).toFixed(2) + ' €', 'Non trouvé');
            updateInputField('june-care-emailInput', localStorageData.email, '');
            updateInputField('june-care-firstNameInput', localStorageData.firstName, '');
            updateInputField('june-care-lastNameInput', localStorageData.lastName, '');
        }
    }

    function updateInputField(id, value, defaultValue) {
        const input = document.getElementById(id);
        if (input) {
            input.value = value ? value : defaultValue;
        }
    }

    function addPopupEventListeners(values, partner) {
        const closePopupButton = document.getElementById('june-care-close-popup');
        if (closePopupButton) {
            closePopupButton.addEventListener('click', closePopup);
        } else {
            console.error('Bouton de fermeture de la popup non trouvé');
        }

        const payButton = createPayButton(values);
        payButton.addEventListener('click', () => handlePayButtonClick(values, partner));
    }

    function createPayButton(values) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('june-care-button-container');

        const payButton = document.createElement('button');
        payButton.id = 'june-care-payNow';
        
        // Extraire la valeur de values.price
        const price = values.price;
        console.log(price);
        // Calculer le prix de l'assurance
        const insurancePrice = (configuration.insurance_price.value / 100) * price;
        console.log(insurancePrice);
        // Remplacer [prix] dans le call_to_action par la valeur calculée
        const callToAction = configuration.step1_offer.call_to_action.replace('[prix]', insurancePrice.toFixed(2));
        console.log(callToAction);
        payButton.textContent = callToAction;

        buttonContainer.appendChild(payButton);
        document.querySelector('.june-care-popup').appendChild(buttonContainer);

        return payButton;
    }

    function handlePayButtonClick(values, partner) {
        const coverageDetails = document.querySelector('.june-care-coverage-details');
        const eventDetails = document.getElementById('june-care-event-details');
        const payButton = document.getElementById('june-care-payNow');

        if (isFirstClick) {
            coverageDetails.style.display = 'none';
            eventDetails.style.display = 'block';
            payButton.textContent = configuration.step2_values.call_to_action;
            isFirstClick = false;
        } else {
            subscribe(values, partner);
        }
    }

    function closePopup() {
        document.body.removeChild(document.querySelector('.june-care-popup'));
        document.body.removeChild(document.querySelector('.june-care-overlay'));
    }

    function injectStyles() {
        const styles = `
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
                color: ${configuration.main_color};
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
                background-color: ${configuration.main_color};
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

            .june-care-popup_title{
                display: flex;
                align-items: center;
                font-size: 30px;
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }


    function initialize(configuration) {
        const currentUrl = window.location.href;

        if (currentUrl.includes(configuration.url_filters.data_collection)) {
            extractAndStoreValues(configuration.value_getters);
        }
        if (currentUrl.includes(configuration.url_filters.display_offer)) {
            const values = retrieveStoredValues();
            if (values) {
                injectStyles();
                buildPopup(configuration, values);
            }
        }
    }

    let isFirstClick = true;

    initialize(configuration);

})();
