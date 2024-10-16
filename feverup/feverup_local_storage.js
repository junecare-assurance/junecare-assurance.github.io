// @ts-nocheck

(function() {
    'use strict';

    console.log('Tampermonkey script loaded');

    function saveToLocalStorage(eventInfo) {
        console.log('Saving event info to local storage:', eventInfo);
        localStorage.setItem('eventInfo', JSON.stringify(eventInfo));
    }

    function getEventInfo() {
        console.log('Extracting event info');
        const nameElement = document.querySelector('.purchase-plan-resume__title');
        const dateElement = document.querySelector('[data-testid="purchase-plan-date"] .plan-resume-list__info div');
        const placeElement = document.querySelector('[data-testid="purchase-plan-place"] .plan-resume-list__info div');

        const name = nameElement ? nameElement.innerText : 'Non trouvé';
        const date = dateElement ? dateElement.innerText : 'Non trouvé';
        const place = placeElement ? placeElement.innerText : 'Non trouvé';
        const priceElements = document.querySelectorAll('[data-testid="purchase-plan-session"] .plan-resume-list__info div');

        let numberOfTicketsint = 0;

        priceElements.forEach(priceElement => {
            const priceText = priceElement.innerText;
            const priceMatch = priceText.match(/x (\d+)/);
            const Tickets = priceMatch ? parseInt(priceMatch[1], 10) : 0;
            numberOfTicketsint += Tickets;
        });

        // Extraction du nombre de billets et du prix final
        const finalPriceElements = document.querySelectorAll('span');
        let finalPrice = 'Non trouvé';

        finalPriceElements.forEach(element => {
            const priceText = element.innerText.trim().replace(',', '.').replace('\u00A0€', '');
            if (!isNaN(parseFloat(priceText))) {
                finalPrice = priceText;
            }
        });

        console.log(finalPrice);

        let numberOfTickets = numberOfTicketsint.toString()
        return { name, date, place, numberOfTickets, finalPrice };
    }


    function getEmailAfterClick() {
        const triggerElement = document.querySelector('.fv-login__avatar');
        if (triggerElement) {
            const interval = setInterval(() => {
                const emailElement = document.querySelector('[data-testid="user-email-profile"]');
                if (emailElement) {
                    const email = emailElement.innerText || emailElement.textContent;
                    console.log('ICI');
                    const eventInfo = getEventInfo();
                    eventInfo.email = email;
                    saveToLocalStorage(eventInfo);
                    clearInterval(interval);
                }
            }, 100);
        } else {
            console.log('Avatar not found, retrying...');
            setTimeout(getEmailAfterClick, 1000);
        }
    }

    window.addEventListener('load', () => {
        console.log('Page loaded');
        getEmailAfterClick();
    });
})();