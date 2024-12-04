// @ts-nocheck

(function () {
    'use strict';

    /**
     * Function to save cart information to local storage.
     */
    function saveCartInfo() {
        let cartInfo = null;

        // Iterate through the dataLayer to find the cart information
        for (const data of window.dataLayer) {
            if (data && data.ecommerce && data.ecommerce.items) {
                cartInfo = data;
                break;
            }
        }

        // Get the date element from the DOM
        const dateElement = document.querySelector('.product-date');
        const date = dateElement ? dateElement.textContent.trim() : 'not found';

        // Prepare the data to be saved in local storage
        const localStorageData = {
            name: cartInfo && cartInfo.ecommerce.items.length > 0 ? cartInfo.ecommerce.items[0].item_name : "not found",
            date: date,
            place: "Lido2Paris",
            numberOfTickets: cartInfo ? cartInfo.ecommerce.items.reduce((total, item) => total + item.quantity, 0) : 0,
            finalPrice: cartInfo ? cartInfo.ecommerce.value : 0,
            email: ""
        };

        // Save the data to local storage
        localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
    }

    // Call the function to save cart information
    saveCartInfo();
})();
