const { repeatConnect, requestPixel, getPixel, Color } = pixelsWebConnect;

// Handling the abilities
window.abilities = [];

const addAbility = (ability, modifier) => {
    window.abilities.push({
        ability,
        modifier,
    });
}

const renderAbilities = () => {
    const abilitiesList = window.document.getElementById('abilities');
    abilitiesList.innerHTML = '';

    for (const { ability, modifier } of window.abilities) {
        const abilityElement = window.document.createElement('li');
        abilityElement.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');

        const radioId = `radio-${ability}`.replaceAll(/\s+/g,'_');
        const radio = window.document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'abilitiesListRadio');
        radio.setAttribute('value', '');
        radio.setAttribute('id', radioId);
        radio.setAttribute('class', 'form-check-input me-1');
        abilityElement.appendChild(radio);

        const label = window.document.createElement('label');
        label.setAttribute('for', radioId);
        label.setAttribute('class', 'form-check-label w-100 p-1');
        label.textContent = ability;
        abilityElement.appendChild(label);

        const modifierBadge = window.document.createElement('span');
        modifierBadge.setAttribute('class', 'badge text-bg-primary rounded-pill');
        if (modifier >= 0) {
            modifierBadge.textContent = `+${modifier}`;
        } else {
            modifierBadge.textContent = modifier;
        }
        abilityElement.appendChild(modifierBadge);

        abilitiesList.appendChild(abilityElement);
    }
}

// Handling the dice
window.dice = [];

const getAndConnectDie = async () => {
    const die = await requestPixel();

    connectToDie(die);
}

const connectToDie = async (die) => {
    await repeatConnect(die);

    die.blink(Color.dimGreen);

    die.addEventListener("roll", (face) => {
        console.log(`Rolled a ${face}`);
    });

    window.dice.push(die);
}

// Startup
(() => {
    addAbility('Acrobatics', 3);
    addAbility('Athletics', 2);
    addAbility('Arcana', -1);
    addAbility('Perception', 1);
    addAbility('Sleight of Hand', 5);
    renderAbilities();
    
})();