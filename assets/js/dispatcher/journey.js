/**
 * This is trigered when user click submit button
 * adds all the user input into localstorage
 * TODO: need to set gender, bodyType, goal
 */
function submitDispatcher() {
    const bodyTypeSelected = [].filter.call(bodyType, function (el) {
        return el.checked;
    });

    setUserDetails({
        name: `${firstName.value}  ${lastName.value}`,
        age: age.value,
        gender: gender.value,
        height: height.value,
        weight: weight.value,
        bodyType: bodyTypeSelected[0].value,
        goal: workoutGoal.value,
    });

    init();
}

function init() {
    // localStorage.setItem("userData", JSON.stringify(userData));

    const userData = JSON.parse(localStorage.getItem("userData"));

    calculateBMI(userData);
    calculateAMR(userData);

    // Display recommendation-section
    $(".recommendation-section").css("display", "block");
    $(".gender").text(userData.gender);
    $(".height").text(`${userData.height} cm`);
    $(".weight").text(`${userData.height} kg`);
    $(".age").text(userData.age);
}

// function calculate BMR for daily caleries count based on if you are a man or woman

function calculateAMR(userData) {
    // Step 1: Calculate Your BMR
    let BMR;
    if (userData.gender === "Female") {
        //BMR For women, BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)

        BMR =
            655.1 +
            9.563 * (userData.weight / 2.205) +
            1.85 * userData.height -
            4.677 * userData.age;
    } else if (userData.gender === "Male") {
        //BMR For men, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
        BMR =
            66.47 +
            13.75 * (userData.weight / 2.205) +
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
    } else if (userData.bodyType === "Moderately Activity") {
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
    localStorage.setItem("userData", JSON.stringify(userData));
    //---------------------------------------------------------------------
}

// function to calculate BMI
// BMI = Weight / height * height
function calculateBMI(userData) {
    console.log(userData.weight);
    let recommendation;
    // bmi in pounds and inches
    let BMI = (
        (Number(userData.weight) / Number(userData.height) ** 2) *
        10000
    ).toFixed(1);

    $(".bmi-score").text(`BMI score ${BMI}`);

    console.log(BMI);
    if (BMI < 18.5) {
        recommendation = `
        To ensure a healthy lifestyle, Fitness LIND recommends increasing your intake of more nutrient-rich foods like meat, fish breads, pastas, fruits, vegetables and dairy products.  Based on your BMI of  (${BMI}).  If your BMI is less than 18.5, it falls within the underweight range. Fitness LIND recommends you support a healthy lifestyle by`;
        $(".rec-list-1").text(`
    Eat more frequently. When you're underweight, you may feel full faster. Eat five to six smaller meals during the day rather than two or three large meals.`);

        $(".rec-list-2").text(
            ` Choose nutrient-rich foods. As part of an overall healthy diet, choose whole-grain breads, pastas and cereals; fruits and vegetables; dairy products; lean protein sources; and nuts and seeds. `
        );
        $(".rec-List-3").text(
            `Maintain body weight between the recommended limits (a BMI of 18.5–25)`
        );
        $(".recommendation").text(recommendation);
        // exercise plan
        $(".exercise-plan").text(
            "Exercise, especially strength training, can help you gain weight by building up your muscles. Exercise may also stimulate your appetite."
        );
    } else if (BMI > 18.5 && BMI < 24.9) {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends setting goals to maintain a healthy diet and exercise routine. Based on your BMI of  (${BMI})
        If your BMI is 18.5 to 24.9, it falls within the normal or Healthy Weight range. Fitness LIND recommends you support a healthy lifestyle by`;
        $(".rec-list-1").text(" Eating plenty of fruits and vegetables.");
        $(".rec-list-2").text(
            "Pick whole grains and lean sources of protein and dairy products."
        );
        $(".rec-list-3").text(
            "Maintain body weight between the recommended limits (a BMI of 18.5–25) "
        );
        $(".recommendation").text(recommendation);
        // exercise plan
        $(".exercise-plan").text(
            "Moderate to vigorous endurance, strength balance and flexibility."
        );
    } else if (BMI > 25 && BMI < 29.9) {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends changing your diet.  Based on your BMI of (${BMI}).  
        If your BMI is 25.0 to 29.9, it falls within the overweight range. Fitness LIND recommends you support a healthy lifestyle by 
        Healthy eating
        1.	Reduce calories by 200 calories per day to lose about a one pound a week 
        2.	Select foods that are higher in fiber. High-fiber foods take longer to digest, making you feel full longer and have fewer calories.  
        3.	Maintain body weight between the recommended limits (a BMI of 18.5–25) 
        `;
        $(".recommendation").text(recommendation);
    } else {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends changing your diet.  Based on your BMI of (${BMI})  
        If your BMI is 30.0 or higher, it falls within the obese range. Fitness LIND recommends you support a healthy lifestyle by `;
        $(".rec-list-1").text(
            "Reduce calories by 500 calories per day to lose about a one pound a week "
        );
        $(".rec-list-2").text(
            "	Select foods that are higher in fiber. High-fiber foods take longer to digest, making you feel full longer and have fewer calories."
        );

        $(".rec-list-1").text(
            "Maintain body weight between the recommended limits (a BMI of 18.5–25)"
        );
        $(".recommendation").text(recommendation);

        // exercise plan
        $(".exercise-plan").text(
            "Walking, water exercise and low-impact cardio options that are easy on the joints. Start with a few minutes, a few days a week and you will quickly build endurance for longer workouts."
        );
    }
}
