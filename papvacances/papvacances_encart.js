(function() {
    'use strict';
    function ajouterEncartAssurance() {
        const parentDiv = document.getElementById('details-tarifs-et-disponibilites');
        if (parentDiv) {
            const encartAssurance = document.createElement('div');
            encartAssurance.id = 'encart-assurance';
            encartAssurance.innerHTML = `
                <h3>Assurance</h3>
                <p>Ajoutez une assurance pour une meilleure couverture.</p>
            `;
            parentDiv.appendChild(encartAssurance);
        } else {
            console.error('Div avec id "details-tarifs-et-disponibilites" non trouvée.');
        }
    }
    ajouterEncartAssurance();    
})();
