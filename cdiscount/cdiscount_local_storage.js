// @ts-nocheck

(function() {
    'use strict';

    console.log('Tampermonkey script loaded');

    function saveCartInfo() {
        // Récupérer le prix total
        const totalPriceElement = document.querySelector('strong[data-testid="summaryTotal"] .text-price');
        let totalPrice = totalPriceElement ? totalPriceElement.textContent.trim() : 'non trouve';
        let bin;
        [totalPrice, bin] = totalPrice.split('€');
        totalPrice = totalPrice.replace(',', '.');
        totalPrice = parseFloat(totalPrice.replace(/[\s\u202F\u00A0]/g, ''));
    
        // Récupérer le nombre d'articles
        const articleElements = document.querySelectorAll('table.table-summary tbody tr');
        const numberOfArticles = articleElements.length;
    
        const localStorageData = {
            name: "Nouveau Nom du Site",
            startDate: "non trouve", // Plus besoin de la date
            endDate: "non trouve", // Plus besoin de la date
            place: "Nouveau Lieu",
            numberOfTickets: numberOfArticles,
            finalPrice: totalPrice,
            email: ""
        };
    
        localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
        console.log('Cart info saved:', localStorageData);
    }
    
    
    saveCartInfo();
    
    
    
})();