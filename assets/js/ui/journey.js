/**
 * List all the UI elements
 * Add all event listeners
 */
const workout = document.querySelector("#personalized-workout");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const age = document.querySelector("#age");
const gender = document.querySelector("#gender");
const workoutGoal = document.querySelector("#weight-goal");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const bodyType = document.querySelectorAll('input[name="body-type"]');

const workoutEvent = workout.addEventListener("click", function (event) {
    event.preventDefault();
    submitDispatcher();
});

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
        To ensure a healthy lifestyle, Fitness LIND recommends increasing your intake of more nutrient-rich foods like meat, fish breads, pastas, fruits, vegetables and dairy products.  Based on your BMI of  (${BMI}).  If your BMI is less than 18.5, it falls within the underweight range. Fitness LIND recommends you support a healthy lifestyle by:`;
        $(".rec-list-1").text(`
    Eating more frequently. When you're underweight, you may feel full faster. Eat five to six smaller meals during the day rather than two or three large meals.`);

        $(".rec-list-2").text(
            ` Choose nutrient-rich foods. As part of an overall healthy diet, choose whole-grain breads, pastas and cereals; fruits and vegetables; dairy products; lean protein sources; and nuts and seeds. `
        );
        $(".rec-List-3").text(
            `Maintain body weight between the recommended limits (a BMI of 18.5–25).`
        );
        $(".recommendation").text(recommendation);
        // exercise plan
        $(".exercise-plan").text(
            "Exercise, especially strength training, can help you gain weight by building up your muscles. Exercise may also stimulate your appetite."
        );
    } else if (BMI > 18.5 && BMI < 24.9) {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends setting goals to maintain a healthy diet and exercise routine. Based on your BMI of  (${BMI}).
        If your BMI is 18.5 to 24.9, it falls within the normal or Healthy Weight range. Fitness LIND recommends you support a healthy lifestyle by:`;
        $(".rec-list-1").text(" Eating plenty of fruits and vegetables.");
        $(".rec-list-2").text(
            "Pick whole grains and lean sources of protein and dairy products."
        );
        $(".rec-list-3").text(
            "Maintain body weight between the recommended limits (a BMI of 18.5–25) ."
        );
        $(".recommendation").text(recommendation);
        // exercise plan
        $(".exercise-plan").text(
            "Moderate to vigorous endurance, strength balance and flexibility."
        );
    } else if (BMI > 25 && BMI < 29.9) {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends changing your diet.  Based on your BMI of (${BMI}).  
        If your BMI is 25.0 to 29.9, it falls within the overweight range. Fitness LIND recommends you support a healthy lifestyle by: `;
        $(".rec-list-1").text(
            "Reducing calories by 200 calories per day to lose about a one pound a week. "
        );
        $(".rec-list-2").text(
            "Select foods that are higher in fiber. High-fiber foods take longer to digest, making you feel full longer and have fewer calories. "
        );
        $(".rec-list-3").text(
            "Maintain body weight between the recommended limits (a BMI of 18.5–25). "
        );

        $(".recommendation").text(recommendation);
        // exercise plan
        $(".exercise-plan").text(
            "Moderate- to vigorous-intensity aerobic exercises should be encouraged. nothing is more important to keeping weight in check and staying healthy than regular activity."
        );
    } else {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends changing your diet.  Based on your BMI of (${BMI}).  
        If your BMI is 30.0 or higher, it falls within the obese range. Fitness LIND recommends you support a healthy lifestyle by:`;
        $(".rec-list-1").text(
            "Reducing calories by 500 calories per day to lose about a one pound a week ."
        );
        $(".rec-list-2").text(
            "	Selecting foods that are higher in fiber. High-fiber foods take longer to digest, making you feel full longer and have fewer calories."
        );

        $(".rec-list-1").text(
            "Maintain body weight between the recommended limits (a BMI of 18.5–25)."
        );
        $(".recommendation").text(recommendation);

        // exercise plan
        $(".exercise-plan").text(
            "Walking, water exercise and low-impact cardio options that are easy on the joints. Start with a few minutes, a few days a week and you will quickly build endurance for longer workouts."
        );
    }
}

// Display recommendation-section
function calorieRecomendationUI(userData) {
    $(".recommendation-section").css("display", "block");
    $(".gender").text(userData.gender);
    $(".height").text(`${userData.height} cm`);
    $(".weight").text(`${userData.weight} kg`);
    $(".age").text(userData.age);
}
