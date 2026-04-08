// ======= IIFE MAIN FUNCTION =======
const pfCounteract = (() => {

    // ------ INITIAL DOM UPDATE ON LOAD -------

    const effectLevelContainer = document.getElementById('effect-level-container');
    const targetLevelContainer = document.getElementById('target-level-container');
    effectLevelContainer.classList.add("hidden");
    targetLevelContainer.classList.add("hidden");

    // ------- EFFECT FUNCTIONS -------

    // updating the visible dropdown depending on effect source
    const effectSource = document.getElementById('effect-source');
    const effectRankContainer = document.getElementById('effect-rank-container');
    effectSource.addEventListener('change', () => {
        if (effectSource.value === 'spell') {
            effectLevelContainer.classList.add("hidden");
            effectRankContainer.classList.remove("hidden");
        } else if (effectSource.value === 'other') {
            effectRankContainer.classList.add("hidden");
            effectLevelContainer.classList.remove("hidden");
        };
    });

    // setting the level of the counteract effect
    const counteractEffectRankSet = () => {
        let counteractEffectRank;
        if (effectSource.value === 'spell') {
            counteractEffectRank = document.getElementById('effect-rank').value;
        } else if (effectSource.value === 'other') {
            counteractEffectRank = document.getElementById('effect-level').value;
        };
        return counteractEffectRank;
    };

    // taking in the effect roll total from Foundry
    const counteractEffectRollSet = () => {
        const counteractEffectRoll = {
            rollValue: document.getElementById('effect-roll').value,
            noAdjustment: document.getElementById('roll-none').checked,
            naturalOne: document.getElementById('roll-nat-one').checked,
            naturalTwenty: document.getElementById('roll-nat-twenty').checked,
        };
        return counteractEffectRoll;
    };

    // ------- TARGET FUNCTIONS -------

    // updating the visible dropdown depending on target source
    const targetSource = document.getElementById('target-source');
    const targetRankContainer = document.getElementById('target-rank-container');
    targetSource.addEventListener('change', () => {
        if (targetSource.value === 'spell') {
            targetLevelContainer.classList.add("hidden");
            targetRankContainer.classList.remove("hidden");
        } else if (targetSource.value === 'other') {
            targetRankContainer.classList.add("hidden");
            targetLevelContainer.classList.remove("hidden");
        };
    });

    // setting the level of the counteract target
    const counteractTargetRankSet = () => {
        let counteractTargetRank;
        if (targetSource.value === 'spell') {
            counteractTargetRank = document.getElementById('target-rank').value;
        } else if (targetSource.value === 'other') {
            counteractTargetRank = document.getElementById('target-level').value;
        };
        return counteractTargetRank;
    };

    // setting counteract target dc
    const counteractTargetDCSet = () => {
        const counteractTargetDC = document.getElementById('target-dc');
        return counteractTargetDC;
    };

    // ------- COUNTERACT CALCULATIONS -------

    // finding degree of success
    const counteractRollOutcomeSet = (counteractEffectRoll, counteractTargetDC, naturalOne, naturalTwenty) => {

    }



})();