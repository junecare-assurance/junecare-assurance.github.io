(function () {
    'use strict';

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
                background-color: #0CB3E4;
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
        // Overlay qui noircit le fond
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.zIndex = '9999';
        document.body.appendChild(overlay);

        // POPUP
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
        popup.style.borderRadius = '4px';
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        document.body.appendChild(popup);

        // Récupération du fichier html
        fetch('https://junecare-assurance.github.io/papvacances/papvacances_encart.html?v=' + new Date().getTime())
            .then(response => response.text())
            .then(data => {
                popup.innerHTML = data;

                // Création du bouton de paiement
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

                // Variable d'état pour suivre le nombre de clics
                let isFirstClick = true;

                // Gestion de la fermeture
                const closePopupButton = document.getElementById('closePopup');
                if (closePopupButton) {
                    closePopupButton.addEventListener('click', () => {
                        document.body.removeChild(popup);
                        document.body.removeChild(overlay);
                    });
                }

                // Gestion du bouton de paiement
                payButton.addEventListener('click', (event) => {
                    const coverageDetails = document.getElementById('coverageDetails');
                    const eventDetails = document.getElementById('eventDetails');

                    // Si premier click masque les avantages et montre les input
                    if (isFirstClick) {
                        coverageDetails.style.display = 'none';
                        eventDetails.style.display = 'block';
                        payButton.textContent = 'Continuer';
                        isFirstClick = false;
                    }
                    // Si 2eme click fait la verif des champs et passe au paiement
                    else {
                        if (!validateForm()) {
                            alert('Veuillez remplir tous les champs et accepter les conditions générales et le document d\'information.');
                            return;
                        }

                        // Récupération des données du formulaire
                        const email = document.getElementById('emailInput').value;
                        const firstName = document.getElementById('firstNameInput').value;
                        const lastName = document.getElementById('lastNameInput').value;

                        // Envoi des infos au bubbleapps
                        fetch('https://pg-ai.bubbleapps.io/version-test/api/1.1/wf/checkout', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: email,
                                firstname: firstName,
                                lastname: lastName,
                                link: window.location.href
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            // Redirection vers bubbleapps
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

    function validateForm() {
        const checkbox = document.getElementById('assurance').checked;
        const email = document.getElementById('emailInput').value.trim();
        const firstName = document.getElementById('firstNameInput').value.trim();
        const lastName = document.getElementById('lastNameInput').value.trim();

        return checkbox && email && firstName && lastName;
    }

    function ajouterBoutonPopup() {
        const sidebarDiv = document.querySelector('.sidebar');
        if (sidebarDiv) {
            const encart = document.createElement('div');
            encart.className = 'bg-grey-1 padding-20 margin-top-30 margin-bottom-40 sticky force-margin-top';
            encart.style.width = '300px';

            const lienPopup = document.createElement('a');
            lienPopup.className = 'btn btn-teal btn-full-width';
            lienPopup.textContent = 'Souscrire à l\'assurance';
            lienPopup.href = '#';

            lienPopup.onclick = function (event) {
                event.preventDefault();
                showPopup();
            };

            encart.appendChild(lienPopup);
            sidebarDiv.appendChild(encart);

            // MutationObserver pour le sticky
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
    }

    // Initialisation
    ajouterStyles();
    ajouterBoutonPopup();
})();