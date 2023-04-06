function toggleTooltip() {
const tooltipContent = document.getElementById('tooltip-content');
tooltipContent.hidden = !tooltipContent.hidden;
}

const roomTypeWeights = {
large: 1.5,
medium: 1,
small: 0.75
};

document.getElementById('num-nomads').addEventListener('input', function() {
    const numNomads = parseInt(this.value);
    const nomadsDiv = document.getElementById('nomads');
    nomadsDiv.innerHTML = '';

    for (let i = 1; i <= numNomads; i++) {
        const nomadDiv = document.createElement('div');
        nomadDiv.className = 'nomad';
        nomadDiv.innerHTML = `
            <h2>Nomad ${i}</h2>
            <label for="nomad${i}-name">Name:</label><br>
            <input type="text" id="nomad${i}-name" name="nomad${i}-name" required=""><br><br>
            <label for="nomad${i}-stay-duration">Duration of Stay (days):</label><br>
            <input type="number" id="nomad${i}-stay-duration" name="nomad${i}-stay-duration" required="" min="1"><br><br>
            <label for="nomad${i}-room-type">Room Type:</label><br>
            <select id="nomad${i}-room-type" name="nomad${i}-room-type" required="">
                <option value="">--Select Room Type--</option>
                <option value="large">Large Room</option>
                <option value="medium">Medium Room</option>
                <option value="small">Small Room</option>
            </select><br><br>
        `;
        nomadsDiv.appendChild(nomadDiv);
    }
});

function calculateCost() {
const numNomads = parseInt(document.getElementById('num-nomads').value);
const totalCost = parseFloat(document.getElementById('total-cost').value);
const additionalCosts = parseFloat(document.getElementById('shared-costs').value);
const costSummary = document.getElementById('cost-summary');
costSummary.innerHTML = '';

let totalWeightedDays = 0;

for (let i = 1; i <= numNomads; i++) {
    const stayDuration = parseInt(document.getElementById(`nomad${i}-stay-duration`).value);
    const roomType = document.getElementById(`nomad${i}-room-type`).value;
    const weight = roomTypeWeights[roomType];
    totalWeightedDays += stayDuration * weight;
}

const costPerWeightedDay = (totalCost + additionalCosts) / totalWeightedDays;

for (let i = 1; i <= numNomads; i++) {
    const stayDuration = parseInt(document.getElementById(`nomad${i}-stay-duration`).value);
    const roomType = document.getElementById(`nomad${i}-room-type`).value;
    const weight = roomTypeWeights[roomType];
    const nomadName = document.getElementById(`nomad${i}-name`).value;
    const nomadCost = costPerWeightedDay * stayDuration * weight;

    const nomadCostSummary = document.createElement('p');
    nomadCostSummary.innerText = `${nomadName}: €${nomadCost.toFixed(2)}`;
    costSummary.appendChild(nomadCostSummary);
}
}

document.querySelector('form').addEventListener('submit', function(event) {
event.preventDefault();
calculateCost();
});
document.getElementById('toggle-instructions').addEventListener('click', function () {
const instructionsContainer = document.querySelector('.instructions-container');
if (instructionsContainer.style.display === 'none') {
instructionsContainer.style.display = 'block';
this.textContent = 'Hide Instructions';
} else {
instructionsContainer.style.display = 'none';
this.textContent = 'Show Instructions';
}
});
