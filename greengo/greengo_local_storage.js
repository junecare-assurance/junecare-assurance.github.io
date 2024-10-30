// @ts-nocheck
(function() {
    'use strict';
    console.log('Tampermonkey script loaded');

    function saveCartInfo() {
        const textElements = document.querySelectorAll('.text-neutral-700');
        let name, dateStart, dateEnd, numberOfTickets, finalPrice;
        let bin;

        if (textElements.length > 0) {
            name = textElements[0].textContent.trim();
            for (let i = 0; i < textElements.length; i++) {
                const text = textElements[i].textContent.trim();
                console.log(text);

                if (text.includes('Dates')) {
                    [dateStart, dateEnd] = textElements[i + 1].textContent.trim().split(' - ');
                } else if (text.includes('Total')) {
                    [finalPrice, bin] = textElements[i + 1].textContent.trim().split('€');
                    finalPrice = finalPrice.replace(',', '.');
                    finalPrice = parseFloat(finalPrice.replace(/[\s\u202F\u00A0]/g, ''));
                } else if (text.includes('voyageurs')) {
                    numberOfTickets = parseInt(text.split(' ')[0]);
                } else {
                    //name = text;
                }
            }


            const localStorageData = {
                name: name,
                dateStart: dateStart,
                dateEnd: dateEnd,
                place: "Lido2Paris",
                numberOfTickets: numberOfTickets,
                finalPrice: finalPrice,
                email: ""  // Placeholder, as no email is provided
            };

            localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
            console.log('Cart info saved:', localStorageData);
        } else {
            console.log('No text elements found. Trying again in 1 second...');
            setTimeout(saveCartInfo, 1000);
        }
    }

    window.addEventListener('load', () => {
        saveCartInfo();
    });
})();