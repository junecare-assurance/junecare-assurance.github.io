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
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s, transform 0.3s;
            }
        `;
        document.head.appendChild(style);
    }

    function showPopup() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.zIndex = '9999';

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
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

        // Ajout du bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '&times;';
        popup.appendChild(closeButton);


        // Création de l'iframe
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.border = 'none';
        iframe.src = 'https://junecare-assurance.github.io/papvacances/papvacances_encart.html?v=' + new Date().getTime();
        popup.appendChild(iframe);

        // Création du bouton de paiement
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const payButton = document.createElement('button');
        payButton.id = 'payNow';
        payButton.textContent = 'M\'assurer';
        buttonContainer.appendChild(payButton);
        popup.appendChild(buttonContainer);

        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
            document.body.removeChild(overlay);
        });
        // Gestionnaire du bouton de paiement

        payButton.addEventListener('click', function () {
            window.open('https://junecare.fr', '_blank');
        });

        document.body.appendChild(overlay);
        document.body.appendChild(popup);

        // Mise à jour des champs une fois l'iframe chargée

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
