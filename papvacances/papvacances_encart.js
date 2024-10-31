// @ts-nocheck

(function () {
    'use strict';

    function getEventDetails() {
        const titleElement = document.querySelector('.item-title');
        if (titleElement) {
            // Extraction du titre (sans le prix)
            const fullTitle = titleElement.childNodes[0].textContent.trim();

            // Extraction des informations
            const location = fullTitle.replace('Location', '').replace('Maison', '').trim();

            // Extraction du prix
            const priceElement = titleElement.querySelector('strong');
            const price = priceElement ? priceElement.textContent.trim()
                .replace('dès', '')
                .replace('€ par semaine', '')
                .trim() : '';

            return {
                location,
                price
            };
        }
        return null;
    }

    function ajouterStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .force-margin-top {
                margin-top: -5.5px !important;
            }
            .sticky-active.force-margin-top {
                margin-top: 375px !important;
            }
            .btn-full-width {
                display: block;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                text-align: center;
            }
            #eventDetails {
                display: none;
            }
            .popup-close {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 24px;
                cursor: pointer;
                background: none;
                border: none;
                color: #333;
                z-index: 10001;
            }
            .button-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
            }
            #payNow {
                padding: 15px 30px;
                background-color: #33ab9f;
                color: white;
                border: none;
                font-size: 18px;
                font-weight: bold;
                margin: auto;
                cursor: pointer;
                border-radius: 4px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s, transform 0.3s;
            }
        `;
        document.head.appendChild(style);
    }

    function showPopup() {
        const eventDetails = getEventDetails();

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.zIndex = '9999';
        document.body.appendChild(overlay);

        const popup = document.createElement('div');
        popup.classList.add('june-care-popup');
        popup.style.position = 'fixed';
        popup.style.top = '15%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -10%)';
        popup.style.padding = '20px';
        popup.style.backgroundColor = '#FFFFFF';
        popup.style.zIndex = '10000';
        popup.style.maxHeight = '90%';
        popup.style.overflowY = 'auto';
        popup.style.borderRadius = '0px';
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        document.body.appendChild(popup);

        fetch('https://junecare-assurance.github.io/papvacances/papvacances_encart.html?v=' + new Date().getTime())
            .then(response => response.text())
            .then(data => {
                popup.innerHTML = data;
                // Récupère l'élément <h1> avec la classe 'item-title' et itemprop 'name'
                const titleElement = document.querySelector('h1.item-title[itemprop="name"]');

                // Vérifie si l'élément est trouvé avant de continuer
                if (titleElement) {
                    // Récupère le texte à l'intérieur de l'élément <h1>
                    let titleText = titleElement.textContent || titleElement.innerText;
                    titleText = titleText.trimStart();

                    // Stocke ce texte dans l'élément avec l'ID 'nameInput'
                    const nameInput = document.getElementById('nameInput');
                    if (nameInput) {
                        nameInput.value = titleText;
                    } else {
                        console.error("Élément avec l'ID 'nameInput' non trouvé.");
                    }
                } else {
                    console.error("Élément <h1> avec la classe 'item-title' et itemprop 'name' non trouvé.");
                }

                console.log('Immatriculation trouvée:', nameInput.value);
                // Ajout des informations de l'événement dans des champs cachés
                if (eventDetails) {
                    const hiddenFields = document.createElement('div');
                    hiddenFields.style.display = 'none';
                    hiddenFields.innerHTML = `
                            <input type="hidden" id="eventLocation" value="${eventDetails.location}">
                            <input type="hidden" id="eventPrice" value="${eventDetails.price}">
                        `;
                    popup.appendChild(hiddenFields);
                }

                // Initialisation des écouteurs d'événements pour les radios
                initializeRadioListeners();

                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex';
                buttonContainer.style.justifyContent = 'space-between';
                buttonContainer.style.alignItems = 'center';
                buttonContainer.style.marginTop = '20px';

                const payButton = document.createElement('button');
                payButton.id = 'payNow';
                payButton.textContent = 'M\'assurer';
                buttonContainer.appendChild(payButton);
                popup.appendChild(buttonContainer);

                let isFirstClick = true;

                const closePopupButton = document.getElementById('closePopup');
                if (closePopupButton) {
                    closePopupButton.addEventListener('click', () => {
                        document.body.removeChild(popup);
                        document.body.removeChild(overlay);
                    });
                }

                payButton.addEventListener('click', (event) => {
                    const coverageDetails = document.getElementById('coverageDetails');
                    const eventDetails = document.getElementById('eventDetails');

                    if (isFirstClick) {
                        coverageDetails.style.display = 'none';
                        eventDetails.style.display = 'block';
                        payButton.textContent = 'Continuer';
                        isFirstClick = false;
                    } else {
                        if (!validateForm()) {
                            //alert('Veuillez remplir tous les champs et accepter les conditions générales et le document d\'information.');
                            return;
                        }

                        const email = document.getElementById('emailInput').value;
                        const firstName = document.getElementById('firstNameInput').value;
                        const lastName = document.getElementById('lastNameInput').value;
                        const location = document.getElementById('eventLocation').value;
                        const price = document.getElementById('eventPrice').value;

                        fetch('https://pg-ai.bubbleapps.io/version-test/api/1.1/wf/checkout', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email,
                                firstname: firstName,
                                lastname: lastName,
                                location,
                                price,
                                link: window.location.href
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                window.location.href = data.response.link + "test/" + data.response.id;
                            })
                            .catch(error => {
                                console.error('Erreur lors de l\'envoi des données:', error);
                                alert('Une erreur est survenue lors de la transmission des données.');
                            });
                    }
                });
            })
            .catch(error => console.error('Erreur lors de la récupération du fichier:', error));
    }

    // Gestionnaire principal pour le formulaire d'assurance
    const InsuranceFormHandler = {
        // Éléments du DOM
        elements: {
            popup: null,
            overlay: null,
            modal: null,
            form: null,
            additionalDetails: null,
            decisionHelp: null
        },

        // Initialisation
        init() {
            this.initializeElements();
            this.initializeRadioListeners();
            this.createConfirmationModal();
            this.initializeSidebarButton();
        },

        // Initialiser les références aux éléments du DOM
        initializeElements() {
            this.elements.popup = document.querySelector('.june-care-popup');
            this.elements.overlay = document.querySelector('[style*="background-color: rgba(0, 0, 0, 0.8)"]');
            this.elements.form = document.getElementById('insuranceForm');
            this.elements.additionalDetails = document.getElementById('additionalDetails');
            this.elements.decisionHelp = document.getElementById('decisionHelp');
        },

        initializeRadioListeners() {
            const radios = document.getElementsByName('decision');
            if (!radios.length) return;

            radios.forEach(radio => {
                radio.addEventListener('change', () => {
                    console.log('Radio changed:', radio.value);
                    console.log('Additional details element:', additionalDetails);
                    console.log('Decision help element:', this.elements.decisionHelp);
                    const isUnsure = radio.value === 'unsure';
                    if (!isUnsure) {
                        if (additionalDetails) additionalDetails.style.display = 'block';
                    }
                    if (isUnsure) {
                        if (additionalDetails) additionalDetails.style.display = 'none';
                    }
                });
            });
        },

        // Créer le modal de confirmation
        createConfirmationModal() {
            let modal = document.getElementById('confirmationModal');
            if (modal) {
                this.elements.modal = modal;
                return;
            }

            modal = document.createElement('div');
            modal.id = 'confirmationModal';
            modal.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 10001;
            min-width: 300px;
            max-width: 80%;
        `;

            modal.innerHTML = `
            <h3 style="margin-bottom: 15px;"></h3>
            <p style="margin-bottom: 20px;"></p>
            <button id="closeConfirmationBtn" style="
                padding: 8px 16px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 15px;
                width: 100%;
            ">Fermer</button>
        `;

            document.body.appendChild(modal);
            this.elements.modal = modal;

            document.getElementById('closeConfirmationBtn').addEventListener('click', () => {
                this.closeAll();
            });
        },

        // Validation du formulaire
        validateForm() {
            const formData = {
                checkbox: document.getElementById('assurance')?.checked,
                email: document.getElementById('emailInput')?.value?.trim(),
                firstName: document.getElementById('firstNameInput')?.value?.trim(),
                lastName: document.getElementById('lastNameInput')?.value?.trim(),
                decision: document.querySelector('input[name="decision"]:checked')?.value
            };

            // Validation des champs de base
            if (!formData.checkbox || !formData.email || !formData.firstName ||
                !formData.lastName || !formData.decision) {
                alert('Veuillez remplir tous les champs et accepter les conditions.');
                return false;
            }

            // Validation des champs supplémentaires
            if (formData.decision !== 'unsure') {
                const additionalData = {
                    startDate: document.getElementById('startDate')?.value,
                    endDate: document.getElementById('endDate')?.value,
                    totalCost: document.getElementById('totalCost')?.value,
                    participantsCount: document.getElementById('participantsCount')?.value
                };

                if (!this.validateAdditionalData(additionalData)) {
                    return false;
                }
            }

            this.showConfirmationMessage(formData.decision !== 'unsure');
            return false;
        },

        // Valider les données additionnelles
        validateAdditionalData(data) {
            if (!data.startDate || !data.endDate || !data.totalCost || !data.participantsCount) {
                alert('Veuillez remplir tous les champs additionnels.');
                return false;
            }

            else if (new Date(data.endDate) <= new Date(data.startDate)) {
                alert('La date de fin doit être après la date de début.');
                return false;
            }

            return true;
        },

        // Afficher le message de confirmation
        showConfirmationMessage(isSure) {
    this.elements.popup = document.querySelector('.june-care-popup');
    this.elements.overlay = document.querySelector('[style*="background-color: rgba(0, 0, 0, 0.8)"]');
    document.body.removeChild(this.elements.popup);
    document.body.removeChild(this.elements.overlay);

    // Création de l'overlay
    const overlay_mail = document.createElement('div');
    overlay_mail.style.position = 'fixed';
    overlay_mail.style.top = '0';
    overlay_mail.style.left = '0';
    overlay_mail.style.width = '100%';
    overlay_mail.style.height = '100%';
    overlay_mail.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay_mail.style.zIndex = '9999';
    overlay_mail.style.display = 'flex';
    overlay_mail.style.justifyContent = 'center';
    overlay_mail.style.alignItems = 'center';
    document.body.appendChild(overlay_mail);

    // Création de la popup
    const popup_mail = document.createElement('div');
    popup_mail.classList.add('june-care-popup');
    popup_mail.style.position = 'relative';
    popup_mail.style.width = '90%';
    popup_mail.style.maxWidth = '450px';
    popup_mail.style.padding = '30px';
    popup_mail.style.backgroundColor = '#FFFFFF';
    popup_mail.style.zIndex = '10000';
    popup_mail.style.borderRadius = '12px';
    popup_mail.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    popup_mail.style.animation = 'slideIn 0.3s ease-out';

    // Ajout des styles d'animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Création du contenu de la popup
    const messageContent = document.createElement('div');
    messageContent.style.textAlign = 'center';

    // Icône de succès
    const successIcon = document.createElement('div');
    successIcon.innerHTML = '✓';
    successIcon.style.width = '60px';
    successIcon.style.height = '60px';
    successIcon.style.borderRadius = '50%';
    successIcon.style.backgroundColor = '#4CAF50';
    successIcon.style.color = 'white';
    successIcon.style.fontSize = '35px';
    successIcon.style.display = 'flex';
    successIcon.style.justifyContent = 'center';
    successIcon.style.alignItems = 'center';
    successIcon.style.margin = '0 auto 20px';

    // Titre
    const title = document.createElement('h2');
    title.style.color = '#333';
    title.style.marginBottom = '15px';
    title.style.fontSize = '24px';
    title.textContent = 'Merci !';

    // Message
    const message = document.createElement('p');
    message.style.color = '#666';
    message.style.fontSize = '16px';
    message.style.lineHeight = '1.5';
    message.style.marginBottom = '25px';

    if (isSure) {
        message.textContent = "Merci de votre intérêt. Vous recevrez un e-mail pour finaliser l'enregistrement.";
    } else {
        message.textContent = "Merci de l'intérêt que vous nous portez. Nous vous enverrons un e-mail avec plus d'informations et un accès pour faire un devis personnalisé.";
    }

    // Bouton de fermeture
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fermer';
    closeButton.style.padding = '12px 30px';
    closeButton.style.backgroundColor = '#4CAF50';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '6px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '16px';
    closeButton.style.transition = 'background-color 0.2s';

    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = '#45a049';
    });

    closeButton.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = '#4CAF50';
    });

    closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay_mail);
    });

    // Assemblage des éléments
    messageContent.appendChild(successIcon);
    messageContent.appendChild(title);
    messageContent.appendChild(message);
    messageContent.appendChild(closeButton);
    popup_mail.appendChild(messageContent);
    overlay_mail.appendChild(popup_mail);
},

        // Fermer toutes les fenêtres modales
        closeAll() {
            if (this.elements.modal) this.elements.modal.style.display = 'none';
            if (this.elements.popup) this.elements.popup.style.display = 'none';
            if (this.elements.overlay) this.elements.overlay.style.display = 'none';
        },

        // Initialiser le bouton dans la sidebar
        initializeSidebarButton() {
            const sidebarDiv = document.querySelector('.sidebar');
            if (!sidebarDiv) return;

            const encart = document.createElement('div');
            encart.className = 'bg-grey-1 padding-20 margin-top-30 margin-bottom-40 sticky force-margin-top';
            encart.style.width = '300px';

            const titre = document.createElement('p');
            titre.className = 'h4';
            titre.textContent = 'Parter en toute tranquilité';

            encart.appendChild(titre);

            const text = document.createElement('p');
            text.className = 'margin-bottom-10';
            text.textContent = 'Souscriver à une assurance annulation';

            encart.appendChild(text);

            const lienPopup = document.createElement('a');
            lienPopup.className = 'btn btn-teal btn-full-width';
            lienPopup.textContent = 'Demander un devis';
            lienPopup.href = '#';
            lienPopup.onclick = (event) => {
                event.preventDefault();
                this.showPopup();
            };

            encart.appendChild(lienPopup);

            encart.appendChild(text);


            sidebarDiv.appendChild(encart);

            this.observeStickyState(encart);
        },

        // Observer l'état sticky de l'encart
        observeStickyState(encart) {
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (encart.classList.contains('sticky-active')) {
                            const currentMarginTop = parseFloat(encart.style.marginTop || 0);
                            encart.style.setProperty('margin-top', `${currentMarginTop - 39}px`, 'important');
                        }
                    }
                }
            });

            observer.observe(encart, {
                attributes: true
            });
        }
    };

    // Initialisation au chargement de la page
    document.addEventListener('DOMContentLoaded', () => {
        InsuranceFormHandler.init();
    });

    // Fonctions globales pour la compatibilité avec le code existant
    function initializeRadioListeners() {
        InsuranceFormHandler.initializeRadioListeners();
    }

    function validateForm() {
        return InsuranceFormHandler.validateForm();
    }

    function showConfirmationMessage(isSure) {
        InsuranceFormHandler.showConfirmation(isSure);
    }

    function closeConfirmationModal() {
        InsuranceFormHandler.closeAll();
    }

    function ajouterBoutonPopup() {
        const sidebarDiv = document.querySelector('.sidebar');
            if (!sidebarDiv) return;

            const encart = document.createElement('div');
            encart.className = 'bg-grey-1 padding-20 margin-top-30 margin-bottom-40 sticky force-margin-top';
            encart.style.width = '300px';

            const titre = document.createElement('p');
            titre.className = 'h4';
            titre.textContent = 'Parter en toute tranquilité';

            encart.appendChild(titre);

            const text = document.createElement('p');
            text.className = 'margin-bottom-10';
            text.textContent = 'Souscriver à une assurance annulation';

            encart.appendChild(text);

            const lienPopup = document.createElement('a');
            lienPopup.className = 'btn btn-teal btn-full-width';
            lienPopup.textContent = 'Demander un devis';
            lienPopup.href = '#';
            lienPopup.onclick = (event) => {
                event.preventDefault();
                showPopup();
            };

            encart.appendChild(lienPopup);

            sidebarDiv.appendChild(encart);
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (encart.classList.contains('sticky-active')) {
                            const currentMarginTop = parseFloat(encart.style.marginTop || 0);
                            encart.style.setProperty('margin-top', `${currentMarginTop - 39}px`, 'important');
                        }
                    }
                }
            });

            observer.observe(encart, {
                attributes: true
            });

    }

    ajouterStyles();
    ajouterBoutonPopup();
})();