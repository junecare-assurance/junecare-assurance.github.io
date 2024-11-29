(function() {
    'use strict';

    console.log('Tampermonkey script loaded');

    function getCartInfoFromDataLayer() {
        // Assurez-vous que le dataLayer est défini
        if (typeof dataLayer !== 'undefined' && Array.isArray(dataLayer)) {
            let cartAmount = null;
            let itemNumbersOnCart = null;

            // Parcourir le dataLayer pour trouver les informations nécessaires
            dataLayer.forEach(layer => {
                if (layer.customVariables) {
                    if (layer.customVariables.cartAmount) {
                        cartAmount = layer.customVariables.cartAmount.value;
                    }
                    if (layer.customVariables.itemNumbersOnCart) {
                        itemNumbersOnCart = layer.customVariables.itemNumbersOnCart.value;
                    }
                }
            });

            // Afficher les informations dans la console
            if (cartAmount !== null && itemNumbersOnCart !== null) {
                console.log(`Cart Amount: ${cartAmount}`);
                console.log(`Number of Items on Cart: ${itemNumbersOnCart}`);
            } else {
                console.log('Cart information not found in dataLayer.');
            }
            const localStorageData = {
                name: "Opisto.fr",
                startDate: "non trouve", // Plus besoin de la date
                endDate: "non trouve", // Plus besoin de la date
                place: "Nouveau Lieu",
                numberOfTickets: itemNumbersOnCart,
                finalPrice: cartAmount.replace(',', '.'),
                email: ""
            };

            localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
            console.log('Cart info saved:', localStorageData);
        } else {
            getCartInfoFromDataLayer();
        }
    }

    // Appeler la fonction pour tester
    getCartInfoFromDataLayer();

})();