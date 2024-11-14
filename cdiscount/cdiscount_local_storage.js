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
    
        // Récupérer le nombre d'articles en tenant compte des quantités
        const articleElements = document.querySelectorAll('table[data-testid="productSummary"] tbody tr td[data-testid]');
        let numberOfArticles = 0;

        articleElements.forEach(element => {
            const quantitySpan = element.querySelector('span');
            if (quantitySpan) {
                const quantityText = quantitySpan.textContent.trim();
                const quantityMatch = quantityText.match(/X(\d+)/);
                if (quantityMatch) {
                    const quantity = parseInt(quantityMatch[1], 10);
                    numberOfArticles += isNaN(quantity) ? 1 : quantity;
                } else {
                    numberOfArticles += 1;
                }
            } else {
                numberOfArticles += 1;
            }
        });
    
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