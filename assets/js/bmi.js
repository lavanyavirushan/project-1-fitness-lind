const age = document.getElementById("age");
const weight = document.getElementById("weight");
const radioButtons = document.querySelectorAll("input[name ='gender");
const radioButtonsActive = document.querySelectorAll("input[name ='excercise'");
// used to store user name
let userName;

const userData = {};
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
    for (const gender of radioButtons) {
        if (gender.checked) {
            userData.gender = gender.value;
            break;
        }
    }

    for (const activeLevel of radioButtonsActive) {
        if (activeLevel.checked) {
            userData.activeLeve = activeLevel.value;
            break;
        }
    }

    let x = document.getElementById("height").selectedIndex;
    let y = document.getElementById("height").options;
    let w = document.getElementById("inches").selectedIndex;
    let z = document.getElementById("inches").options;

    const foot = Number(y[x].value) * 12;
    const inch = Number(z[w].value);
    const heights = foot + inch;
    userData.height = heights;
    userData.weight = Number(weight.value);

    userData.age = Number(age.value);
    console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    userData = JSON.parse(localStorage.getItem("userData"));
    // Calls to calculate BMI and AMR
    calculateBMI(userData);
    calculateAMR(userData);
});

function init() {
    // localStorage.setItem("userData", JSON.stringify(userData));

    const userData = JSON.parse(localStorage.getItem("userData"));
    $("h2").text(userData.name);
    $("#age").val(userData.age);
    $(`input[value ="${userData.gender}"]`).attr("checked", true);
    $(`input[value ="${userData.bodyType}"]`).attr("checked", true);
    $("#weight").val(userData.weight);
    userName = userData.name;
    userName = userData.name;
    calculateBMI(userData);
    calculateAMR(userData);
}
// call calculateBMI

init();

// function calculate BMR for daily calores count based on if you are a man or woman

function calculateAMR(userData) {
    console.log(userData.gender);
    console.log(userData.activeLeve);

    // Step 1: Calculate Your BMR
    let BMR;
    if (userData.gender === "female") {
        //BMR For women, BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)

        BMR =
            655.1 +
            9.563 * (userData.weight / 2.205) +
            1.85 * userData.height -
            4.677 * userData.age;
    } else if (userData.gender) {
        //BMR For men, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
        BMR =
            66.47 +
            13.75 * (userData.weight / 2.205) +
            5.003 * userData.height -
            6.755 * userData.age;
    }

    //Step 2: Calculate Your AMR
    let AMR;

    if (userData.activeLeve === "Sedentary") {
        // Sedentary (little or no exercise): AMR = BMR x 1.2
        AMR = BMR * 1.2;
    } else if (userData.activeLeve === "Light Activity") {
        // Lightly active (exercise 1–3 days/week): AMR = BMR x 1.375
        AMR = BMR * 1.375;
    } else if (userData.activeLeve === "Moderately Activity") {
        // Moderately active (exercise 3–5 days/week): AMR = BMR x 1.55
        AMR = BMR * 1.55;
    } else if (userData.activeLeve === "Very Active") {
        // Very active (hard exercise 6–7 days/week): AMR = BMR x 1.9
        AMR = BMR * 1.9;
    }
    console.log(`ARM: ${AMR}`);

    // return AMR;
}

// function to calculate BMI
// BMI = Weight / height * height
function calculateBMI(userData) {
    // save user name to usersData obj
    userData.name = userName;
    console.log(userData.name);
    let recommendation;
    // bmi in pounds and inches
    let BMI = ((userData.weight / userData.height ** 2) * 703).toFixed(1);

    console.log(BMI);
    if (BMI < 18.5) {
        recommendation = ` 
        To ensure a healthy lifestyle, Fitness LIND recommends increasing your intake of more nutrient-rich foods like meat, fish breads, pastas, fruits, vegetables and dairy products.  Based on your BMI of  (${BMI}) 
        You are considered (underweight) Fitness LIND recommends you support a healthy lifestyle by 
        `;
        $(".recommendation").text(recommendation);
    } else if (BMI > 18.5 && BMI < 24.9) {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends setting goals to maintain a healthy diet and exercise routine. Based on your BMI of  (${BMI})
            You are considered (normal or Healthy) Fitness LIND recommends you support a healthy lifestyle by 
             Healthy eating
            1.	Eating plenty of fruits and vegetables.
            2.	Choosing foods that are low in sugars, saturated fats, and sodium.
            3.	Pick whole grains and lean sources of protein and dairy products.
            4.	Maintain body weight between the recommended limits (a BMI of 18.5–25) 
            `;
        $(".recommendation").text(recommendation);
    } else if (BMI > 25 && BMI < 29.9) {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends changing your diet.  Based on your BMI of (${BMI})  
        You are considered ________ Fitness LIND recommends you support a healthy lifestyle by 
        Healthy eating
        1.	Reduce calories by 500 calories per day to lose about a one pound a week 
        2.	Select foods that are higher in fiber. High-fiber foods take longer to digest, making you feel full longer and have fewer calories.  
        3.	Maintain body weight between the recommended limits (a BMI of 18.5–25) 
        `;
        $(".recommendation").text(recommendation);
    } else {
        recommendation = `To ensure a healthy lifestyle, Fitness LIND recommends changing your diet.  Based on your BMI of (${BMI})  
        You are considered ________ Fitness LIND recommends you support a healthy lifestyle by 
        Healthy eating
        1.	Reduce calories by 500 calories per day to lose about a one pound a week 
        2.	Select foods that are higher in fiber. High-fiber foods take longer to digest, making you feel full longer and have fewer calories.  
        3.	Maintain body weight between the recommended limits (a BMI of 18.5–25) 
        `;
        $(".recommendation").text(recommendation);
    }
}
