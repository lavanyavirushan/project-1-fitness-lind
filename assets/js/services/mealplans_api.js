// https://developer.edamam.com/edamam-docs-recipe-api
// sample request url: https://api.edamam.com/api/recipes/v2?type=public&app_id=df0d49c4&app_key=9571bca2f3520f672c7afcdda913fbf7&diet=high-protein&health=fish-free&health=gluten-free&health=low-sugar
const EDAMAM_API_APP_ID = "df0d49c4";
const EDAMAM_API_APP_KEY = "9571bca2f3520f672c7afcdda913fbf7";

//for now I will create a sample mealplanUserData, later it should be recieved frow landing

// Callories division is: 18% for breakfast, 30% for lunch, 30% for dinner, 11% for snack 1, 11% for snack 2.
// Range for each meal would be 10% of the callories per meal. For example we have 2000 cals per day, so its 600 cals for lunch and the range would be 540-660 cals for lunch

const mealplanUserData = {
    caloriesPerDay: "2000",
    preferences: ["pork-free", "fish-free"],
    goal: "gain",
};

// mealplan will be updated daily
const date = new Date();
const currentDateString =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

if (
    localStorage.getItem("meals") &&
    JSON.parse(localStorage.getItem("meals"))
) {
    let meals = JSON.parse(localStorage.getItem("meals"));
    console.log(meals);
} else {
    let meals = {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
        sunday: {
            // breakfast: "",
            // snack1: "",
            // lunch: "",
            // snack2: "",
            // dinner: "",
        },
    };
    addRecipesToObject(mealplanUserData);
}

function generateFetchURLs(mealplanUserData) {
    const cals = mealplanUserData.caloriesPerDay;
    const prefs = [...mealplanUserData.preferences];
    const breakfastCalsRange = [cals * 0.162, cals * 0.198];
    const snackCalsRange = [cals * 0.099, cals * 0.121];
    const lunchDinnerCalsRange = [cals * 0.27, cals * 0.33];
    const diet =
        mealplanUserData.goal === "gain" ? "high-protein" : "high-fiber";
    const URLBody = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${EDAMAM_API_APP_ID}&app_key=${EDAMAM_API_APP_KEY}&random=true&health=alcohol-free&${prefs
        .map((pref) => `health=${pref}`)
        .join("&")}`;

    const URLs = {
        breakfast: `${URLBody}&mealType=Breakfast&calories=${breakfastCalsRange[0]}-${breakfastCalsRange[1]}`,
        snack1: `${URLBody}&mealType=Snack&calories=${snackCalsRange[0]}-${snackCalsRange[1]}&diet=${diet}`,
        lunch: `${URLBody}&mealType=Lunch&calories=${lunchDinnerCalsRange[0]}-${lunchDinnerCalsRange[1]}&diet=${diet}`,
        snack2: `${URLBody}&mealType=Snack&calories=${snackCalsRange[0]}-${snackCalsRange[1]}&diet=${diet}`,
        dinner: `${URLBody}&mealType=Dinner&calories=${lunchDinnerCalsRange[0]}-${lunchDinnerCalsRange[1]}&diet=${diet}`,
    };
    return URLs;
}

async function fetchURLs(URLs) {
    const mealsJSON = {};
    for (const meal in URLs) {
        try {
            let p1 = await fetch(URLs[meal]);
            let p2 = await p1.json();
            mealsJSON[meal] = p2;
        } catch (error) {
            console.log(error.message);
            mealsJSON[meal] = "fetch error";
        }
    }
    return mealsJSON;
}
// console.log("CALLING FETCHURLS");
// console.log(fetchURLs(generateFetchURLs(mealplanUserData)));
// function test() {
//     fetchURLs(generateFetchURLs(mealplanUserData)).then((a) => console.log(a));
// }
// test();

function addRecipesToObject(mealplanUserData) {
    fetchURLs(generateFetchURLs(mealplanUserData)).then((mealsResponse) => {
        let counter = 0;
        mealsCopy = { ...meals };
        for (const mealType in mealsResponse) {
            for (const day in mealsCopy) {
                mealsCopy[day][mealType] =
                    mealsResponse[mealType].hits[counter].recipe;
            }
            counter++;
        }
        meals = mealsCopy;
        meals.currentDate = date;
        console.log(meals);
        localStorage.setItem("meals", JSON.stringify(meals));
    });
}
