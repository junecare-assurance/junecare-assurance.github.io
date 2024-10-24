(function() {
    'use strict';
    function ajouterBoutonPopup() {
        const style = document.createElement('style');
        style.innerHTML = `
            .force-margin-top {
                margin-top: -5.5px !important;
            }
            .sticky-active.force-margin-top {
                margin-top: 375px !important;
            }
            .btn-full-width {
                display: block;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                text-align: center;
            }
        `;
        document.head.appendChild(style);
    
        const sidebarDiv = document.querySelector('.sidebar');
        if (sidebarDiv) {
            const encart = document.createElement('div');
            encart.className = 'bg-grey-1 padding-20 margin-top-30 margin-bottom-40 sticky force-margin-top';
            encart.style.width = '300px';
    
            const lienPopup = document.createElement('a');
            lienPopup.className = 'btn btn-teal btn-full-width';
            lienPopup.textContent = 'Ouvrir la Popup';
            lienPopup.href = '#';
            lienPopup.onclick = function(event) {
                event.preventDefault();
                alert('Voici la popup!');
            };
    
            encart.appendChild(lienPopup);
            sidebarDiv.appendChild(encart);
    
            // MutationObserver pour surveiller les changements de classe
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (encart.classList.contains('sticky-active')) {
                            const currentMarginTop = parseFloat(encart.style.marginTop || 0); // Prend la valeur de element.style
                            encart.style.setProperty('margin-top', `${currentMarginTop - 39}px`, 'important');
                        }
                    }
                }
            });
    
            observer.observe(encart, {
                attributes: true
            });
        } else {
            console.error('Div avec class "sidebar" non trouvée.');
        }
    }
    ajouterBoutonPopup();
        
})();
