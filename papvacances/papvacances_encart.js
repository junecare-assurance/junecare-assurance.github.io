(function() {
    'use strict';
    function ajouterEncartAssurance() {
        const parentDiv = document.getElementById('details-tarifs-et-disponibilites');
        if (parentDiv) {
            const hrElement = document.createElement('hr');
            hrElement.className = 'hr-big hr-yellow no-margin-bottom';
            
            const encartAssurance = document.createElement('div');
            encartAssurance.id = 'encart-assurance';
            encartAssurance.className = 'bg-grey-1 padding-30 margin-bottom-30';
    
            encartAssurance.innerHTML = `
                <h3>Assurance</h3>
                <p>Ajoutez une assurance pour une meilleure couverture.</p>
            `;
            parentDiv.insertAdjacentElement('afterend', encartAssurance);
            parentDiv.insertAdjacentElement('afterend', hrElement);
        } else {
            console.error('Div avec id "details-tarifs-et-disponibilites" non trouvée.');
        }
    }
    ajouterEncartAssurance();      
})();
