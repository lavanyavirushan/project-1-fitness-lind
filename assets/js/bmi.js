const radioButtonsGenders = document.querySelectorAll(
    "input[name ='excercise'"
);
let selectedGender;
const age = document.getElementById("age");
const height = document.getElementById("height");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");
const radioButtons = document.querySelectorAll("input[name ='gender");
let selectedExcercise;

const btn = document.querySelector("button");
btn.addEventListener("click", function () {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedExcercise = radioButton.value;
            break;
        }
    }

    for (const radioButtonsGender of radioButtonsGenders) {
        if (radioButtonsGender.checked) {
            selectedGender = radioButtonsGender.value;
            break;
        }
    }

    console.log(selectedGender);

    console.log(selectedExcercise);
});

// sample user profile according to our list
const userData = {
    gender: "male",
    // unsure if age is needed because very hard to set excercise list according to age and to body type
    age: "35",

    // used to to calculate AMR for number of calories to consume
    activeLeve: "Active",
    // bodyType: "endomorph", // ectomorph, endomorph, mesomorph (to avoid rude namings)
    weight: 250, // in kg
    height: 74, // in cm
    goal: "gain", // lose, gain
    place: "home", // home or gym for picking equipment for excercises
};
localStorage.setItem("userData", JSON.stringify(userData));

// function calculate BMR for daily calores count based on if you are a man or woman

function calculateAMR(userData) {
    // Step 1: Calculate Your BMR
    let BMR;
    if (userData.gender === "female") {
        //BMR For women, BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)

        BMR =
            655.1 +
            9.563 * userData.weight +
            1.85 * userData.height -
            4.677 * userData.age;
    } else if (userData.gender) {
        //BMR For men, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
        BMR =
            66.47 +
            13.75 * userData.weight +
            5.003 * userData.height -
            6.755 * userData.age;
    }

    //Step 2: Calculate Your AMR
    let AMR;

    if (userData.activeLeve === "Sedentary") {
        // Sedentary (little or no exercise): AMR = BMR x 1.2
        AMR = BMR * 1.2;
    } else if (userData.activeLeve === "Lightly") {
        // Lightly active (exercise 1–3 days/week): AMR = BMR x 1.375
        AMR = BMR * 1.375;
    } else if (userData.activeLeve === "Moderately") {
        // Moderately active (exercise 3–5 days/week): AMR = BMR x 1.55
        AMR = BMR * 1.55;
    } else if (userData.activeLeve === "Active") {
        // Very active (hard exercise 6–7 days/week): AMR = BMR x 1.9
        AMR = BMR * 1.9;
    }

    return AMR;
}

// function to calculate BMI
// BMI = Weight / height * height
function calculateBMI(userData) {
    let recommendation;
    // bmi in pounds and inches
    let BMI = (userData.weight / userData.height ** 2) * 703;
    console.log(BMI);
    if (BMI < 18.5) {
        recommendation = ` 
        To ensure a healthy lifestyle, Fitness LIND recommends increasing your intake of more nutrient-rich foods like meat, fish breads, pastas, fruits, vegetables and dairy products.  Based on your BMI of  ______  
        You are considered ________ Fitness LIND recommends you support a healthy lifestyle by 
        `;
        $(".recommendation").text(recommendation);
    } else if (BMI > 18.5 && BMI < 24.9) {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends setting goals to maintain a healthy diet and exercise routine. Based on your BMI of  ______
            You are considered ________ Fitness LIND recommends you support a healthy lifestyle by 
             Healthy eating
            1.	Eating plenty of fruits and vegetables.
            2.	Choosing foods that are low in sugars, saturated fats, and sodium.
            3.	Pick whole grains and lean sources of protein and dairy products.
            4.	Maintain body weight between the recommended limits (a BMI of 18.5–25) 
            `;
        $(".recommendation").text(recommendation);
    } else if (BMI > 25 && BMI < 29.9) {
        recommendation = ``;
        $(".recommendation").text(recommendation);
    } else {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends changing your diet.  Based on your BMI of  ______  
        You are considered ________ Fitness LIND recommends you support a healthy lifestyle by 
        Healthy eating
        1.	Reduce calories by 500 calories per day to lose about a one pound a week 
        2.	Select foods that are higher in fiber. High-fiber foods take longer to digest, making you feel full longer and have fewer calories.  
        3.	Maintain body weight between the recommended limits (a BMI of 18.5–25) 
        `;
        $(".recommendation").text(recommendation);
    }
}

// call calculateBMI
calculateBMI(userData);
