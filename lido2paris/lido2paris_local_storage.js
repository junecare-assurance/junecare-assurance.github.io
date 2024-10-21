// @ts-nocheck

(function() {
    'use strict';

    console.log('Tampermonkey script loaded');
    function displayPaymentInfo() {
        const paymentInfo = window.dataLayer[2];
        
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

    function saveCartInfo() {
        const cartInfo = window.dataLayer[2];
        const dateElement = document.querySelector('.product-date');
        const date = dateElement ? dateElement.textContent.trim() : 'non trouve';
    
        const location = {
            country: "FR",
            latitude: 48.8567,
            longitude: 2.3508
        };
    
        const localStorageData = {
            name: cartInfo.ecommerce.items.length > 0 ? cartInfo.ecommerce.items[0].item_name : "non trouve",
            date: date,
            place: "Lido2Paris",
            numberOfTickets: cartInfo.ecommerce.items.reduce((total, item) => total + item.quantity, 0),
            finalPrice: cartInfo.ecommerce.value,
            email: "non trouve",  // Placeholder, as no email is provided
            location
        };
    
        localStorage.setItem('cartInfo', JSON.stringify(localStorageData));
        console.log('Cart info saved:', localStorageData);
    }
    
    saveCartInfo();
    
    
})();