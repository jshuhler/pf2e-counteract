// ======= IIFE MAIN FUNCTION =======
const pfCounteract = (() => {

    // updating the DOM on first IIFE run to hide the level dropdown
    const effectLevel = document.getElementById('effect-level-container');
    const targetLevel = document.getElementById('target-level-container');
    effectLevel.classList.add("hidden");
    targetLevel.classList.add("hidden");

    // updating the visible dropdown depending on effect source
    const effectSelect = document.getElementById('effect-source');
    const effectRank = document.getElementById('effect-rank-container');
    effectSelect.addEventListener('change', () => {
        if (effectSelect.value === 'spell') {
            effectLevel.classList.add("hidden");
            effectRank.classList.remove("hidden");
        } else if (effectSelect.value === 'other') {
            effectRank.classList.add("hidden");
            effectLevel.classList.remove("hidden");
        };
    });

    // updating the visible dropdown depending on target source
    const targetSelect = document.getElementById('target-source');
    const targetRank = document.getElementById('target-rank-container');
    targetSelect.addEventListener('change', () => {
        if (targetSelect.value === 'spell') {
            targetLevel.classList.add("hidden");
            targetRank.classList.remove("hidden");
        } else if (targetSelect.value === 'other') {
            targetRank.classList.add("hidden");
            targetLevel.classList.remove("hidden");
        };
    });
    
    // setting the level of the counteract effect
    const counteractEffectRankSet = () => {
        const effectSource = document.getElementById('effect-source');
        if (effectSource === 'spell') {

        } else if (effectSource === 'other') {

        };
    };

    // taking in the roll total from Foundry
    const counteractEffectRollSet = () => {
        const counteractEffectRoll = {
            rollValue: document.getElementById('effect-roll').value,
            noAdjustment: document.getElementById('roll-none').checked,
            naturalOne: document.getElementById('roll-nat-one').checked,
            naturalTwenty: document.getElementById('roll-nat-twenty').checked,
        };
        return counteractEffectRoll;
    };

    // setting the level of the counteract target


    // setting counteract target dc
    const counteractTargetDCSet = () => {
        const counteractTargetDC = document.getElementById('target-dc');
        return counteractTargetDC;
    };

    // finding degree of success
    const counteractRollOutcomeSet = (counteractEffectRoll, counteractTargetDC, naturalOne, naturalTwenty) => {

    }



})();