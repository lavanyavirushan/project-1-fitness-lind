// sample user profile according to our list
const userData = {
  gender: "male",
  // unsure if age is needed because very hard to set excercise list according to age and to body type
  age: "35",
  bodyType: "endomorph", // ectomorph, endomorph, mesomorph (to avoid rude namings)
  weight: "70", // in kg
  height: "175", // in cm
  goal: "gain", // lose, gain
  place: "home", // home or gym for picking equipment for excercises
};
localStorage.setItem("userData", JSON.stringify(userData));

// function to calculate BMI
// BMI = Weight / height * height
function calculateBMI(userData) {
  const BMI = userData.weight / userData.height ** 2;
  if (BMI < 18.5) {
    console.log(
      `Your are underweight base on BMI standards ideal weight should be`
    );
  } else if (BMI > 18.5 && BMI < 24.9) {
    console.log(`Your are of normal healthy weight base on BMI standards`);
  } else if (BMI > 25 && BMI < 29.9) {
    console.log(
      `Your are overweight base on BMI standards your normal weight shoud be`
    );
  } else {
    console.log("Your obese base on BMI standards");
  }
}

// call calculateBMI
calculateBMI(userData);
