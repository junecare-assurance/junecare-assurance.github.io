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
        const nameElement = document.querySelector('.park-card__title');
        const dateElements = document.querySelectorAll('.park-offer-summary__dates .date');
        const placeElement = document.querySelector('.park-card__address');
        const priceElement = document.querySelector('.amount__price.amount__price--right span');

        const name = nameElement ? nameElement.innerText : 'Non trouvé';
        const date = dateElements.length > 0 ? dateElements[0].innerHTML.replace('<br>', ' ') : 'Non trouvé';
        const date_end = dateElements.length > 1 ? dateElements[1].innerHTML.replace('<br>', ' ') : 'Non trouvé';
        const place = placeElement ? placeElement.innerHTML.replace('<br>', ', ').replace(',,', ',') : 'Non trouvé';
        let price = priceElement ? priceElement.innerText.replace('\u00A0€', '').replace(',', '.') : 'Non trouvé';
        
        const licensePlateElement = document.querySelector('#licensePlateField');
        let imat = '';
        if (licensePlateElement) {
            imat = licensePlateElement.value;
        } else {
            const pElements = document.querySelectorAll('p .sublabel');
            pElements.forEach(spanElement => {
                if (spanElement.textContent.includes("Numéro d'immatriculation")) {
                    const parentP = spanElement.closest('p');
                    const potentialImat = parentP.textContent.split(':')[1]?.trim();
                    if (potentialImat && /[A-Za-z0-9]/.test(potentialImat)) {
                        imat = potentialImat;
                    }
                }
            });
        }
        console.log('Immatriculation trouvée:', imat);

        if (Number(price) < 6.25)
        {
            price = "6.25";
        }
        return { name, date, date_end, place, numberOfTickets: '1', finalPrice: price, imat };
    }

    function getEmailAndName() {
        const emailElement = document.querySelector('.purchase-summary__email');
        const nameElement = document.querySelector('.purchase-summary__info-element');

        const email = emailElement ? emailElement.innerText : 'Non trouvé';
        const name = nameElement ? nameElement.innerText : 'Non trouvé';

        const eventInfo = getEventInfo();
        eventInfo.email = email;
        eventInfo.lastname = name;

        saveToLocalStorage(eventInfo);
    }

    function observeLicensePlate() {
        const licensePlateElement = document.querySelector('#licensePlateField');
        if (licensePlateElement) {
            const observer = new MutationObserver(() => {
                console.log('License plate changed');
                const eventInfo = getEventInfo();
                saveToLocalStorage(eventInfo);
            });

            observer.observe(licensePlateElement, { attributes: true, attributeFilter: ['value'] });

            licensePlateElement.addEventListener('input', () => {
                console.log('License plate input event');
                const eventInfo = getEventInfo();
                saveToLocalStorage(eventInfo);
            });
        }
    }

    window.addEventListener('load', () => {
        console.log('Page loaded');
        getEmailAndName();
        observeLicensePlate();
    });
})();