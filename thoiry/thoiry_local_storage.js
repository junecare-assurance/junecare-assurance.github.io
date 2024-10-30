// @ts-nocheck

(function() {
    'use strict';
    console.log('Tampermonkey script loaded');

    function saveCartInfo() {

        const dateElement = document.querySelector('.valable');
        const date = dateElement ? dateElement.textContent.trim().match(/du (.+?) au (.+?)$/) : null;
        const startDate = date ? date[1] : 'non trouve';
        const endDate = date ? date[2] : 'non trouve';

        const totalPriceElement = document.querySelector('.recap_total.colPrix');
        const totalPrice = totalPriceElement ? totalPriceElement.textContent.trim() : 'non trouve';

        const ticketElements = document.querySelectorAll('.colQte.ligneSeule');
        const numberOfTickets = Array.from(ticketElements).reduce((total, element) => {
            const quantity = parseInt(element.textContent.trim().replace('x ', ''), 10);
            return total + (isNaN(quantity) ? 0 : quantity);
        }, 0);

        const localStorageData = {
            //name: cartInfo.ecommerce.items.length > 0 ? cartInfo.ecommerce.items[0].item_name : "non trouve",
            startDate: startDate,
            endDate: endDate,
            place: "Wow Safari Thoiry",
            numberOfTickets: numberOfTickets,
            finalPrice: totalPrice,
            email: ""
        };

        localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
        console.log('Cart info saved:', localStorageData);
    }

    saveCartInfo();
})();
