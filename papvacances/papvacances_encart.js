(function() {
    'use strict';
    function ajouterEncartAssurance() {
        const parentDiv = document.getElementById('details-tarifs-et-disponibilites');
        if (parentDiv) {
            const encartAssurance = document.createElement('div');
            encartAssurance.id = 'encart-assurance';
    
            encartAssurance.innerHTML = `
                <hr class="hr-big hr-yellow no-margin-bottom">
                <h3>Assurance</h3>
                <p>Ajoutez une assurance pour une meilleure couverture.</p>
            `;
            parentDiv.insertAdjacentElement('afterend', encartAssurance);
        } else {
            console.error('Div avec id "details-tarifs-et-disponibilites" non trouvée.');
        }
    }
    ajouterEncartAssurance();    
})();
