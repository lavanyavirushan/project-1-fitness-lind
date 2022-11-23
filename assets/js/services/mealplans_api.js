// https://developer.edamam.com/edamam-docs-recipe-api
// sample request url: https://api.edamam.com/api/recipes/v2?type=public&app_id=df0d49c4&app_key=9571bca2f3520f672c7afcdda913fbf7&diet=high-protein&health=fish-free&health=gluten-free&health=low-sugar
const EDAMAM_API_APP_ID = "df0d49c4";
const EDAMAM_API_APP_KEY = "9571bca2f3520f672c7afcdda913fbf7";

//for now I will create a sample mealplanUserData, later it should be recieved frow landing

// Callories division is: 18% for breakfast, 30% for lunch, 30% for dinner, 11% for snack 1, 11% for snack 2.
// Range for each meal would be 10% of the callories per meal. For example we have 2000 cals per day, so its 600 cals for lunch and the range would be 540-660 cals for lunch

const mealplanUserData = {
    caloriesPerDay: "2000",
    preferences: ["pork-free", "peanut-free", "fish-free"],
};

// mealplan will be updated daily
const date = new Date();
const currentDateString =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

const meals = {
    monday: {
        breakfast: "",
        snack1: "",
        lunch: "",
        snack2: "",
        dinner: "",
    },
    tuesday: {
        breakfast: "",
        snack1: "",
        lunch: "",
        snack2: "",
        dinner: "",
    },
    wednesday: {
        breakfast: "",
        snack1: "",
        lunch: "",
        snack2: "",
        dinner: "",
    },
    thursday: {
        breakfast: "",
        snack1: "",
        lunch: "",
        snack2: "",
        dinner: "",
    },
    friday: {
        breakfast: "",
        snack1: "",
        lunch: "",
        snack2: "",
        dinner: "",
    },
    saturday: {
        breakfast: "",
        snack1: "",
        lunch: "",
        snack2: "",
        dinner: "",
    },
    sunday: {
        breakfast: "",
        snack1: "",
        lunch: "",
        snack2: "",
        dinner: "",
    },
};
function generateFetchURLs(mealplanUserData) {
    const URLBody = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${EDAMAM_API_APP_ID}&app_key=${EDAMAM_API_APP_KEY}&`;
    const cals = mealplanUserData.caloriesPerDay;
    const prefs = mealplanUserData.preferences;
    const breakfastCalsRange = [cals * 0.162, cals * 0.198];
    const snackCalsRange = [cals * 0.099, cals * 0.121];
    const lunchDinnerCalsRange = [cals * 0.27, cals * 0.33];
    const URLs = {
        breakfast: `${URLBody}`,
    };
}
// fetch("http://example.com/movies.json")
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => {
//         console.error("Error:", error);
//     });
