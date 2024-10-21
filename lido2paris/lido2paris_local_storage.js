// @ts-nocheck

(function() {
    'use strict';

    console.log('Tampermonkey script loaded');
    function displayPaymentInfo() {
        const paymentInfo = window.dataLayer[9];
        
        if (paymentInfo && paymentInfo.ecommerce && paymentInfo.ecommerce.items) {
            paymentInfo.ecommerce.items.forEach(item => {
                console.log(`Item Name: ${item.item_name}`);
                console.log(`Brand: ${item.item_brand}`);
                console.log(`Price: ${item.price} ${item.currency}`);
                console.log(`Quantity: ${item.quantity}`);
                console.log(`Total Value: ${paymentInfo.ecommerce.value} ${paymentInfo.ecommerce.currency}`);
            });
        } else {
            console.log("No payment information found.");
        }
    }
    
    displayPaymentInfo();
})();