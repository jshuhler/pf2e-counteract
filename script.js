// ======= IIFE MAIN FUNCTION =======
const pfCounteract = (() => {

    // ------ INITIAL DOM CONFIGURATION ON LOAD -------
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
            counteractEffectRank = parseInt(document.getElementById('effect-rank').value);
        } else if (effectSource.value === 'other') {
            counteractEffectRank = parseInt(document.getElementById('effect-level').value);
        };
        return counteractEffectRank;
    };

    // taking in the effect roll total from Foundry
    const counteractEffectRollSet = () => {
        const counteractEffectRoll = {
            rollValue: parseInt(document.getElementById('effect-roll').value),
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
            counteractTargetRank = parseInt(document.getElementById('target-rank').value);
        } else if (targetSource.value === 'other') {
            counteractTargetRank = parseInt(document.getElementById('target-level').value); //JEFF YOU NEED TO MAKE THIS DIVIDE BY TWO AND ROUND UP, DUM DUM
        };
        
        return counteractTargetRank;
    };

    // setting counteract target dc
    const counteractTargetDCSet = () => {
        const counteractTargetDC = document.getElementById('target-dc');
        return counteractTargetDC;
    };

    // ------- COUNTERACT CALCULATIONS -------

    // finding degree of success for the roll 
    const counteractRollOutcomeSet = (counteractEffectRoll, counteractTargetDC) => {
        let counteractBaseOutcome;
        let counteractRollOutcome;
        let degreeOfSuccess = ['critical failure', 'failure', 'success', 'critical success'];
        if (counteractEffectRollSet.rollValue >= counteractTargetDC + 10) {
            counteractBaseOutcome = degreeOfSuccess[3];
        } else if ((counteractEffectRollSet.rollValue > counteractTargetDC) && (counteractEffectRollSet.rollValue < counteractTargetDC + 10)) {
            counteractBaseOutcome = degreeOfSuccess[2];
        } else if ((counteractEffectRollSet.rollValue < counteractTargetDC) && (counteractEffectRollSet.rollValue + 10 > counteractTargetDC)) {
            counteractBaseOutcome = degreeOfSuccess[1];
        } else if (counteractEffectRollSet.rollValue + 10 < counteractTargetDC) {
            counteractBaseOutcome = degreeOfSuccess[0];
        };
        if ((counteractEffectRollSet.naturalOne === true) && (counteractBaseOutcome !== degreeOfSuccess[0])) {
            counteractRollOutcome = degreeOfSuccess[degreeOfSuccess.indexOf(counteractBaseOutcome) - 1];
        } else if ((counteractEffectRollSet.naturalTwenty === true) && (counteractBaseOutcome !== degreeOfSuccess[3])) {
            counteractRollOutcome = degreeOfSuccess[degreeOfSuccess.indexOf(counteractBaseOutcome) + 1];
        } else {
            counteractRollOutcome = counteractBaseOutcome;
        };
        return counteractRollOutcome;
    };

    // collecting above variables counteractEffectRoll
    // const counteractVariables = () => {
    //     counteractEffectRankSet();
    //     counteractEffectRollSet();
    //     counteractTargetRankSet();
    //     counteractTargetDCSet();
    //     counteractRollOutcomeSet();
    // };

    const counteractComparison = () => {
        let counteractOutcome = {
            outcome:"",
            message:"",
        };
        const calculateButton = document.getElementById('calculate');
        calculateButton.addEventListener('click', () => {
            console.log('Button click!');
            console.log(counteractOutcome);
            // counteractVariables();
            let counteractEffectRank = counteractEffectRankSet();
            counteractEffectRollSet();
            counteractTargetRankSet();
            counteractTargetDCSet();
            counteractRollOutcomeSet();
            if (counteractTargetRankSet.counteractTargetRank > counteractEffectRank + 3) {
                counteractOutcome.outcome = 'failure';
                counteractOutcome.message = 'The counteract target is more than 3 levels above the counteract effect. This is an impossible task.';
            } else if (counteractRollOutcomeSet = 'critical success') {
                counteractOutcome.outcome = 'success';
                counteractOutcome.message = 'The counteract check has critically succeeded';
            } else if ((counteractRollOutcomeSet = 'success') && (counteractTargetRank <= counteractEffectRank + 1)) {
                counteractOutcome.outcome = 'success';
                counteractOutcome.message = 'The counteract check has succeeded';
            } else if ((counteractRollOutcomeSet = 'success') && (counteractTargetRank > counteractEffectRank + 1)) {
                counteractOutcome.outcome = 'failure';
                counteractOutcome.message = 'The counteract check has failed';
            } else if ((counteractRollOutcomeSet = 'failure') && (counteractTargetRank < counteractEffectRank)) {
                counteractOutcome.outcome = 'success';
                counteractOutcome.message = 'The counteract check has succeeded';
            } else if ((counteractRollOutcomeSet = 'failure') && (counteractTargetRank > counteractEffectRank)) {
                counteractOutcome.outcome = 'failure';
                counteractOutcome.message = 'The counteract check has failed';
            } else if (counteractRollOutcomeSet === 'critical failure') {
                counteractOutcome.outcome = 'failure';
                counteractOutcome.message = 'The counteract check has critially failed';
            };
        });
        return counteractOutcome;
    };
    counteractComparison();

    // display controller to update the DOM based on the object from counteractComparison() above

    const displayController = () => {

    };
})();