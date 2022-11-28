/**
 * This is trigered when user click submit button
 * adds all the user input into localstorage
 * TODO: need to set gender, bodyType, goal
 */
function submitDispatcher() {
    const bodyTypeSelected = [].filter.call(bodyType, function (el) {
        return el.checked;
    });

    let userData = {
        name: `${firstName.value} ${lastName.value}`,
        age: age.value,
        gender: gender.value,
        height: height.value,
        weight: weight.value,
        bodyType: bodyTypeSelected[0].value,
        goal: workoutGoal.value,
    };

    calculateBMI(userData);
    calculateAMR(userData);

    calorieRecomendationUI(userData);
}

// function calculate BMR for daily caleries count based on if you are a man or woman

function calculateAMR(userData) {
    // Step 1: Calculate Your BMR
    let BMR;
    if (userData.gender === "Female") {
        //BMR For women, BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)

        BMR =
            655.1 +
            9.563 * userData.weight +
            1.85 * userData.height -
            4.677 * userData.age;
    } else if (userData.gender === "Male") {
        //BMR For men, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
        BMR =
            66.47 +
            13.75 * userData.weight +
            5.003 * userData.height -
            6.755 * userData.age;
    }

    //Step 2: Calculate Your AMR
    let AMR;

    if (userData.bodyType === "Sedentary") {
        // Sedentary (little or no exercise): AMR = BMR x 1.2
        AMR = BMR * 1.2;
    } else if (userData.bodyType === "Light Activity") {
        // Lightly active (exercise 1–3 days/week): AMR = BMR x 1.375
        AMR = BMR * 1.375;
    } else if (userData.bodyType === "Moderate Activity") {
        // Moderately active (exercise 3–5 days/week): AMR = BMR x 1.55
        AMR = BMR * 1.55;
    } else if (userData.bodyType === "Very Active") {
        // Very active (hard exercise 6–7 days/week): AMR = BMR x 1.9
        AMR = BMR * 1.9;
    }

    // Display AMR calories ----------------------------------------------
    $(".calories").text(AMR.toFixed());
    // Add AMR for calories to userData OBJ
    userData.calories = AMR.toFixed();
    // save to local storage AMR
    setUserDetails(userData);
    //---------------------------------------------------------------------
}
