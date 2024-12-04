// @ts-nocheck

(function () {
    'use strict';

    function saveCartInfo() {
        let cartInfo = null;

        for (const data of window.dataLayer) {
            if (data && data.ecommerce && data.ecommerce.items) {
                cartInfo = data;
                break;
            }
        }

        const dateElement = document.querySelector('.product-date');
        const date = dateElement ? dateElement.textContent.trim() : 'non trouve';

        const localStorageData = {
            name: cartInfo.ecommerce.items.length > 0 ? cartInfo.ecommerce.items[0].item_name : "non trouve",
            date: date,
            place: "Lido2Paris",
            numberOfTickets: cartInfo.ecommerce.items.reduce((total, item) => total + item.quantity, 0),
            finalPrice: cartInfo.ecommerce.value,
            email: ""
        };

        localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
    }
    saveCartInfo();
})();