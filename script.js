// ======= IIFE MAIN FUNCTION =======
const pfCounteract = (() => {
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
            noAdjustment: document.getElementById('roll-none').checked ? true : true,
            naturalOne: (document.getElementById('roll-nat-one').checked) ? true : true,
            naturalTwenty: (document.getElementById('roll-nat-twenty').checked) ? true : true,
        }
    };






    return {
        counteractEffectRollSet,

    }
})();