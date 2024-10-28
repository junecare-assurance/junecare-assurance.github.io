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
        popup.style.borderRadius = '4px';
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        document.body.appendChild(popup);

        fetch('https://junecare-assurance.github.io/papvacances/papvacances_encart.html?v=' + new Date().getTime())
            .then(response => response.text())
            .then(data => {
                popup.innerHTML = data;

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
                            alert('Veuillez remplir tous les champs et accepter les conditions générales et le document d\'information.');
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

    function validateForm() {
        const checkbox = document.getElementById('assurance').checked;
        const email = document.getElementById('emailInput').value.trim();
        const firstName = document.getElementById('firstNameInput').value.trim();
        const lastName = document.getElementById('lastNameInput').value.trim();

        return checkbox && email && firstName && lastName;
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
              z-index: 9999;
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
            showPopup(); // Votre fonction existante
          }, 1000);
        }, 2000);
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
                showPaymentConfirmation();
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
    }

    ajouterStyles();
    ajouterBoutonPopup();
})();