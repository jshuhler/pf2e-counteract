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
            counteractEffectRank = Math.ceil(parseInt(document.getElementById('effect-level').value)/2);
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
            counteractTargetRank = Math.ceil(parseInt(document.getElementById('target-level').value)/2);
        };
        
        return counteractTargetRank;
    };

    // setting counteract target dc
    const counteractTargetDCSet = () => {
        const counteractTargetDC = parseInt(document.getElementById('target-dc').value);
        return counteractTargetDC;
    };

    // ------- COUNTERACT CALCULATIONS -------

    // finding degree of success for the effect roll vs the target DC
    const counteractRollOutcomeSet = (counteractEffectRoll, counteractTargetDC) => {
        let counteractBaseOutcome;
        let counteractRollOutcome;
        let degreeOfSuccess = ['critical failure', 'failure', 'success', 'critical success'];
        if (counteractEffectRoll.rollValue >= counteractTargetDC + 10) {
            counteractBaseOutcome = degreeOfSuccess[3];
        } else if ((counteractEffectRoll.rollValue >= counteractTargetDC) && (counteractEffectRoll.rollValue < counteractTargetDC + 10)) {
            counteractBaseOutcome = degreeOfSuccess[2];
        } else if ((counteractEffectRoll.rollValue < counteractTargetDC) && (counteractEffectRoll.rollValue + 10 > counteractTargetDC)) {
            counteractBaseOutcome = degreeOfSuccess[1];
        } else if (counteractEffectRoll.rollValue + 10 < counteractTargetDC) {
            counteractBaseOutcome = degreeOfSuccess[0];
        };
        if ((counteractEffectRoll.naturalOne === true) && (counteractBaseOutcome !== degreeOfSuccess[0])) {
            counteractRollOutcome = degreeOfSuccess[degreeOfSuccess.indexOf(counteractBaseOutcome) - 1];
        } else if ((counteractEffectRoll.naturalTwenty === true) && (counteractBaseOutcome !== degreeOfSuccess[3])) {
            counteractRollOutcome = degreeOfSuccess[degreeOfSuccess.indexOf(counteractBaseOutcome) + 1];
        } else {
            counteractRollOutcome = counteractBaseOutcome;
        };
        return counteractRollOutcome;
    };

    const counteractComparison = () => {
        let counteractOutcome = {
            outcome:"",
            message:"",
        };
        const calculateButton = document.getElementById('calculate');
        calculateButton.addEventListener('click', () => {
            let counteractEffectRank = counteractEffectRankSet();
            let counteractEffectRoll = counteractEffectRollSet();
            let counteractTargetRank = counteractTargetRankSet();
            let counteractTargetDC = counteractTargetDCSet();
            let counteractRollOutcome = counteractRollOutcomeSet(counteractEffectRoll, counteractTargetDC);
            console.log(`Roll Degree of Success: ${counteractRollOutcome}`)
            console.log(`Target Rank: ${counteractTargetRank}`);
            console.log(`Effect Rank: ${counteractEffectRank}`);
            console.log(`----------`);
            if (counteractTargetRank > counteractEffectRank + 3) {
                counteractOutcome.outcome = 'failure';
                counteractOutcome.message = 'The target is more than 3 levels higher than the counteract effect - this is an impossible task';
            } else if ((counteractRollOutcome === 'critical success') && (counteractTargetRank > counteractEffectRank + 1)) {
                counteractOutcome.outcome = 'success';
                counteractOutcome.message = 'The counteract check has succeeded';
            } else if (counteractRollOutcome === 'critical success') {
                counteractOutcome.outcome = 'success';
                counteractOutcome.message = 'The counteract check has critically succeeded';
            } else if ((counteractRollOutcome === 'success') && (counteractTargetRank <= counteractEffectRank + 1)) {
                counteractOutcome.outcome = 'success';
                counteractOutcome.message = 'The counteract check has succeeded';
            } else if ((counteractRollOutcome === 'success') && (counteractTargetRank > counteractEffectRank + 1)) {
                counteractOutcome.outcome = 'failure';
                counteractOutcome.message = 'The counteract check has failed';
            } else if ((counteractRollOutcome === 'failure') && (counteractTargetRank < counteractEffectRank)) {
                counteractOutcome.outcome = 'success';
                counteractOutcome.message = 'The counteract check has succeeded';
            } else if ((counteractRollOutcome === 'failure') && (counteractTargetRank > counteractEffectRank)) {
                counteractOutcome.outcome = 'failure';
                counteractOutcome.message = 'The counteract check has failed';
            } else if (counteractRollOutcome === 'critical failure') {
                counteractOutcome.outcome = 'failure';
                counteractOutcome.message = 'The counteract check has critically failed';
            };
            displayController(counteractOutcome);
        });
    };

    counteractComparison();

    // display controller to update the DOM and dark/light modes
    const displayController = (counteractOutcome) => {
        const resultText = document.getElementById('result-text');
        resultText.className = "";
        if (counteractOutcome.outcome === 'success') {
            resultText.className = 'result-success';
            resultText.textContent = counteractOutcome.message;
        } else if (counteractOutcome.outcome === 'failure') {
            resultText.className = 'result-failure';
            resultText.textContent = counteractOutcome.message;
        } else {
            resultText.className = 'result-placeholder';
            resultText.textContent = "Fill out the fields above and click Calculate";
        };
    };

    // dark/light mode
    const setTheme = () => {
        const body = document.body;
        const newTheme = body.className === "light-mode" ? "" : "light-mode";
        body.className = newTheme;
    };

    document.querySelector(".mode-toggle").addEventListener('click', setTheme);

})();