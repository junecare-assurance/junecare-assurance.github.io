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
                
                
                popup.innerHTML = `<html lang="fr"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="robots" content="noindex, nofollow">
  <title>Simulateur Boulanger Infinity</title>
  <link rel="stylesheet" href="https://junecare-assurance.github.io/cdiscount/style.css">
</head>

<body>
  <div class="container max-w-[920px] mx-auto p-1 md:p-4 flex flex-col text-greyDark">
    <div class="divNbAppareilsMobile flex justify-start flex-col gap-2 mb-3 order-2 px-6 pt-6 md:pt-0">
      <div class="flex gap-3 items-center h-fit w-full pb-4 md:pb-0">
        <img src="./boulanger/public/img/picto-fleche.svg" alt="" class="w-8 md:hidden">
        <p class="text-smb text-left md:hidden">Renseignez un nombre d'appareils, le prix reste le même.</p>
      </div>
    </div>
    <div class="custom-grid order-3 full" data-dashlane-rid="c9960b3dc734b06b" data-dashlane-classification="other">


      <div class="divElectro md:rounded-tl-lg border-greyLight md:border-l md:border-t flex">
        <div class="relative w-full flex flex-col md:justify-center items-start justify-between h-auto md:border-b border-greyLight mx-6 md:mx-4 py-2 md:gap-1 gap-4 border-x md:border-x-0 border-t md:border-t-0 rounded-t-lg flex-row-reverse px-4 md:px-0">
          <div class="w-full flex justify-between md:pr-4 md:pl-2 h-full flex items-center">
            <div class="leading-5 md:pt-2">
              <p class="font-bold text-xl">Électroménager</p>
              <p class="text-grey text-xs">Lave-linge, réfrigérateur, aspirateur...</p>
              <a class="text-grey text-xs underline produitsEligibles" href="https://www.boulanger.com/services/produits-eligibles-electromenager-infinity" data-univ="electromenager" target="_blank">Produits éligibles</a>
            </div>
            <div class="flex items-center gap-1">
              <span class="lessButton clickButton cursor-pointer" data-categorie="electromenager" data-action="less"></span>
              <input type="number" class="inputNb w-10 h-[30px] border border-greyLight text-center rounded-3 hidden md:block" step="1" min="0" name="electromenager" placeholder="0" value="1" data-dashlane-rid="c8c2e6994b8f4591" data-dashlane-classification="other">
              <input type="number" class="inputNbMobile w-10 h-[30px] border border-greyLight text-center rounded-3 md:hidden" step="1" min="0" name="electromenagerMobile" placeholder="0" value="1">
              <span class="moreButton clickButton cursor-pointer" data-categorie="electromenager" data-action="more"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="divMulti border-greyLight md:border-l flex">
        <div class="relative w-full flex flex-col md:justify-center items-start justify-between h-auto md:border-b border-greyLight mx-6 md:mx-4 py-2 md:gap-0 gap-4 border-x md:border-x-0 flex-row-reverse px-4 md:px-0">
          <div class="w-full flex justify-between md:pr-4 md:pl-2 h-full flex items-center">
            <div class="leading-5">
              <p class="font-bold text-xl">Multimédia</p>
              <p class="text-grey text-xs">Console, PC, imprimante...</p>
              <a class="text-grey text-xs underline produitsEligibles" href="https://www.boulanger.com/services/produits-eligibles-multimedia-infinity" data-univ="multimedia" target="_blank">Produits éligibles</a>
            </div>
            <div class="flex items-center gap-1">
              <span class="lessButton clickButton cursor-pointer" data-categorie="multimedia" data-action="less"></span>
              <input type="number" class="inputNb w-10 h-[30px] border border-greyLight text-center rounded-3 hidden md:block" step="1" min="0" name="multimedia" placeholder="0" data-dashlane-rid="969c5c04cb4088ab" data-dashlane-classification="other">
              <input type="number" class="inputNbMobile w-10 h-[30px] border border-greyLight text-center rounded-3 md:hidden" step="1" min="0" name="multimediaMobile" placeholder="0">
              <span class="moreButton clickButton cursor-pointer" data-categorie="multimedia" data-action="more"></span>
            </div>
          </div>
          
        </div>
      </div>

      <div class="divImageSon md:rounded-bl-lg border-greyLight md:border-l md:border-b flex">
        <div class="w-full flex flex-col md:justify-center items-start justify-between h-auto mx-6 md:mx-4 py-2 md:gap-1 gap-4 border-x md:border-x-0 border-greyLight rounded-b-lg md:rounded-b-none border-b md:border-b-0 flex-row-reverse px-4 md:px-0">
          <div class="w-full flex justify-between md:pr-4 md:pl-2 h-full flex items-center pt-3 md:pt-0">
            <div class="leading-5">
              <p class="font-bold text-xl">Image &amp; son</p>
              <p class="text-grey text-xs">TV, casque, barre de son...</p>
              <a class="text-grey text-xs underline produitsEligibles" href="https://www.boulanger.com/services/produits-eligibles-image-son-infinity" data-univ="image-son" target="_blank">Produits éligibles</a>
            </div>
            <div class="flex items-center gap-1">
              <span class="lessButton clickButton cursor-pointer" data-categorie="imageetson" data-action="less"></span>
              <input type="number" class="inputNb w-10 h-[30px] border border-greyLight text-center rounded-3 hidden md:block" step="1" min="0" name="imageetson" placeholder="0" data-dashlane-rid="43f2a4ba60b588c3" data-dashlane-classification="other">
              <input type="number" class="inputNbMobile w-10 h-[30px] border border-greyLight text-center rounded-3 md:hidden" step="1" min="0" name="imageetsonMobile" placeholder="0">
              <span class="moreButton clickButton cursor-pointer" data-categorie="imageetson" data-action="more"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="divResult overflow-scroll md:overflow-auto snap-mandatory snap-x snap-cente md:pl-0 md:pr-0 no-scrollbar pt-6 md:pt-0">
        <div class="flex gap-3 justify-center md:justify-evenly h-[220px] md:h-full text-white relative min-w-[1420px] md:min-w-[300px] items-center">
          <div class="md:h-full w-[300px] h-[90%] md:w-1/3 text-center z-10 universChoice relative rounded-b-large md:rounded-none min-w-[140px] md:min-w-[100px] snap-center ml-[400px] md:ml-0 md:border md:border-greyLight md:rounded-t-20 transition-all ease-in-out delay-200" data-choice="1" id="choice1">
            <div class="h-1/2 md:h-[130px] w-full mx-auto bg-white entete md:rounded-20 min-h-[138px] h-[calc(100%-43px)]">
              <div class="h-full rounded-t-20 w-full flex flex-col justify-center text-greyDark deco orange border border-customOrange border-b-0 md:border-0">
                <p class="leading-none md:pb-[19px] font-bold text-title">1 univers <br><span class="text-sm font-normal">au choix</span></p>
                <p class="text-xl md:text-xsm"><span class="font-bold text-customOrange text-price md:text-3xl">9,99€</span>/mois</p>
              </div>
            </div>
            <div class="h-1/2 md:h-[100px] w-full flex justify-center items-center relative custom bg-customOrange h-[43px] rounded-b-20 md:rounded-b-none md:bg-white">
              <span class="md:w-8 w-0 md:h-1 h-0 bg-greyLight rounded-full noChoice1" data-category="electromenager"></span>
              <div class="w-full h-full md:hidden flex justify-center items-center">
                <p class="text-smb font-light">Soit <span id="pricePerProduct1Mobile" class="font-bold">X.XX</span><span class="font-bold">€ par produit</span></p>
              </div>
              <span class="w-8 h-8 bg-customOrange rounded-full text-black choice1 flex justify-center items-center hidden" data-category="electromenager"><img src="boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                        <div class="h-[100px] w-full hidden md:flex justify-center items-center relative custom">
              <div class="absolute w-[calc(100%-40px)] top-0 left-[20px] h-[1px] rounded-xl bg-greyLight"></div>
              <span class="w-8 h-1 bg-greyLight rounded-full noChoice1" data-category="multimedia"></span>
              <span class="w-8 h-8 bg-customOrange rounded-full text-black choice1 flex justify-center items-center hidden" data-category="multimedia"><img src="./boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                        <div class="h-[100px] w-full hidden md:flex justify-center items-center relative custom">
              <div class="absolute w-[calc(100%-40px)] top-0 left-[20px] h-[1px] rounded-xl bg-greyLight"></div>
              <span class="w-8 h-1 bg-greyLight rounded-full noChoice1" data-category="imageetson"></span>
              <span class="w-8 h-8 bg-customOrange rounded-full text-black choice1 flex justify-center items-center hidden" data-category="imageetson"><img src="./boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                      </div>

          <div class="md:h-full w-[300px] h-[90%] md:w-1/3 text-center z-10 universChoice relative rounded-b-large md:rounded-none min-w-[140px] md:min-w-[100px] snap-center md:border md:border-greyLight md:rounded-t-20 transition-all ease-in-out delay-200" data-choice="2" id="choice2">
            <div class="h-1/2 md:h-[130px] w-full mx-auto bg-white entete md:rounded-20 min-h-[138px] h-[calc(100%-43px)]">
              <div class="h-full rounded-t-20 w-full flex flex-col justify-center text-greyDark deco blue border border-customBlue border-b-0 md:border-0">
                <p class="leading-none md:pb-[19px] font-bold text-title">2 univers <br><span class="text-sm font-normal">au choix</span></p>
                <p class="text-xl md:text-xsm"><span class="font-bold text-customBlue text-price md:text-3xl">14,99€</span>/mois</p>
              </div>
            </div>
            <div class="h-1/2 md:h-[100px] w-full flex justify-center items-center relative custom blue bg-customBlue h-[43px] rounded-b-20 md:rounded-b-none md:bg-white">
              <span class="md:w-8 w-0 md:h-1 h-0 bg-greyLight rounded-full noChoice2" data-category="electromenager"></span>
              <div class="w-full h-full md:hidden flex justify-center items-center">
                <p class="text-smb font-light">Soit <span id="pricePerProduct2Mobile" class="font-bold">X.XX</span><span class="font-bold">€ par produit</span></p>
              </div>
              <span class="w-8 h-8 bg-customBlue rounded-full text-black choice2 flex justify-center items-center hidden" data-category="electromenager"><img src="./boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                        <div class="h-[100px] w-full hidden md:flex justify-center items-center relative custom blue">
              <div class="absolute w-[calc(100%-40px)] top-0 left-[20px] h-[1px] rounded-xl bg-greyLight"></div>
              <span class="w-8 h-1 bg-greyLight rounded-full noChoice2" data-category="multimedia"></span>
              <span class="w-8 h-8 bg-customBlue rounded-full text-black choice2 flex justify-center items-center hidden" data-category="multimedia"><img src="./boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                        <div class="h-[100px] w-full hidden md:flex justify-center items-center relative custom blue">
              <div class="absolute w-[calc(100%-40px)] top-0 left-[20px] h-[1px] rounded-xl bg-greyLight"></div>
              <span class="w-8 h-1 bg-greyLight rounded-full noChoice2" data-category="imageetson"></span>
              <span class="w-8 h-8 bg-customBlue rounded-full text-black choice2 flex justify-center items-center hidden" data-category="imageetson"><img src="./boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                      </div>

          <div class="md:h-full w-[300px] h-[90%] md:w-1/3 text-center z-10 universChoice relative rounded-b-large md:rounded-none min-w-[140px] md:min-w-[100px] snap-center md:border md:border-greyLight md:rounded-t-20 transition-all ease-in-out delay-200 active" data-choice="3" id="choice3">
            <div class="h-1/2 md:h-[130px] w-full mx-auto bg-white entete md:rounded-20 min-h-[138px] h-[calc(100%-43px)]">
              <div class="h-full rounded-t-20 w-full flex flex-col justify-center text-greyDark deco green border border-customGreen border-b-0 md:border-0 items-center">
                  <p class="leading-none md:pb-[19px] font-bold text-title">3 univers <br><span class="text-sm font-normal">au choix</span></p>
                
                <p class="text-xl md:text-xsm"><span class="font-bold text-customGreen text-price md:text-3xl">19,99€</span>/mois</p>
              </div>
            </div>
            <div class="h-1/2 md:h-[100px] w-full flex justify-center items-center relative custom green bg-customGreen h-[43px] rounded-b-20 md:rounded-b-none md:bg-white">
              <span class="md:w-8 w-0 md:h-1 h-0 bg-greyLight rounded-full noChoice3 hidden" data-category="electromenager"></span>
              <div class="w-full h-full md:hidden flex justify-center items-center">
                <p class="text-smb font-light">Soit <span id="pricePerProduct3Mobile" class="font-bold">X.XX</span><span class="font-bold">€ par produit</span></p>
              </div>
              <span class="w-8 h-8 bg-customGreen rounded-full text-black choice3 flex justify-center items-center" data-category="electromenager"><img src="./boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                        <div class="h-[100px] w-full hidden md:flex justify-center items-center relative custom green">
              <div class="absolute w-[calc(100%-40px)] top-0 left-[20px] h-[1px] rounded-xl bg-greyLight"></div>
              <span class="w-8 h-1 bg-greyLight rounded-full noChoice3 hidden" data-category="multimedia"></span>
              <span class="w-8 h-8 bg-customGreen rounded-full text-black choice3 flex justify-center items-center" data-category="multimedia"><img src="./boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                        <div class="h-[100px] w-full hidden md:flex justify-center items-center relative custom green">
              <div class="absolute w-[calc(100%-40px)] top-0 left-[20px] h-[1px] rounded-xl bg-greyLight"></div>
              <span class="w-8 h-1 bg-greyLight rounded-full noChoice3 hidden" data-category="imageetson"></span>
              <span class="w-8 h-8 bg-customGreen rounded-full text-black choice3 flex justify-center items-center" data-category="imageetson"><img src="./boulanger/public/img/icone-check-white.svg" alt=""></span>
            </div>
                      </div>
        </div>
      </div>
      <div class="divTotal relative hidden md:flex">
        <div class="absolute w-full bottom-0 left-0 rounded-bl-lg border border-0 h-full"></div>
        <div class="w-2/5 h-full flex">
          <div class="w-7/12 h-full flex justify-center border-t-2 mx-2 hidden">
            <p class="font-bold">TOTAL</p>
          </div>
          <p id="nbTotalAppareils" class="font-bold w-5/12 text-center hidden">3</p>
        </div>
        <div class="flex gap-3 justify-between h-full text-white relative w-3/5">
                    <div class="h-full w-1/3 text-center z-10 relative universChoiceBottom max-w-[169px] bg-customOrange rounded-b-20 customOrange md:invisible" id="universChoice1">
            <div class="absolute w-full h-full left-0 bottom-0 opacity-80 rounded-b-lg z-20 masque hidden" data-choice="1"></div>
            <div class="w-[90%] mx-auto h-full flex justify-center items-center">
              <p>
                Soit<br><span id="pricePerProduct1" class="font-bold">3.33</span>€ / produit
              </p>
            </div>
          </div>
                    <div class="h-full w-1/3 text-center z-10 relative universChoiceBottom max-w-[169px] bg-customBlue rounded-b-20 customBlue md:invisible" id="universChoice2">
            <div class="absolute w-full h-full left-0 bottom-0 opacity-80 rounded-b-lg z-20 masque hidden" data-choice="2"></div>
            <div class="w-[90%] mx-auto h-full flex justify-center items-center">
              <p>
                Soit<br><span id="pricePerProduct2" class="font-bold">5.00</span>€ / produit
              </p>
            </div>
          </div>
                    <div class="h-full w-1/3 text-center z-10 relative universChoiceBottom max-w-[169px] bg-customGreen rounded-b-20 customGreen active" id="universChoice3">
            <div class="absolute w-full h-full left-0 bottom-0 opacity-80 rounded-b-lg z-20 masque hidden" data-choice="3"></div>
            <div class="w-[90%] mx-auto h-full flex justify-center items-center">
              <p>
                Soit<br><span id="pricePerProduct3" class="font-bold">6.66</span>€ / produit
              </p>
            </div>
          <a href="https://www.boulanger.com/account/boulanger-infinity/login" target="_blank" id="btnAdhesion" class="flex justify-center items-center my-5 bg-customOrange rounded-full text-white px-7 py-1 mx-auto block order-6 h-10 w-60 md:w-[calc(100%+2px)] font-medium md:absolute top-20 md:-left-[1px] left-0" data-nb="3">Adhérer</a></div>
                  </div>

      </div>
    </div>
    <div class="flex justify-center gap-4 mt-3 order-5 md:hidden" id="dots"><span></span><span></span><span class="active"></span></div>
    
  </div>

  <script src="https://junecare-assurance.github.io/cdiscount/script-min.js" ></script>
  <script src="./boulanger/public/js/iframeSizer.contentWindow.min.js" defer=""></script>


</body></html>`;
  document.body.appendChild(popup);

  // Vérification de l'ajout de la popup
  console.log('Popup element added to DOM:', document.body.contains(popup));

  // Vérification du contenu de la popup
  console.log('Popup element after content set:', popup.outerHTML);

  // Vérification de la visibilité de la popup
  console.log('Popup element visibility:', window.getComputedStyle(popup).display);
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
