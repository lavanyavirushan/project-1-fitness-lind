// https://developer.edamam.com/edamam-docs-recipe-api
// sample request url: https://api.edamam.com/api/recipes/v2?type=public&app_id=df0d49c4&app_key=9571bca2f3520f672c7afcdda913fbf7&diet=high-protein&health=fish-free&health=gluten-free&health=low-sugar
const EDAMAM_API_APP_ID = "df0d49c4";
const EDAMAM_API_APP_KEY = "9571bca2f3520f672c7afcdda913fbf7";

//for now I will create a sample mealplanUserData, later it should be recieved frow landing

// Callories division is: 18% for breakfast, 30% for lunch, 30% for dinner, 11% for snack 1, 11% for snack 2.
// Range for each meal would be 10% of the callories per meal. For example we have 2000 cals per day, so its 600 cals for lunch and the range would be 540-660 cals for lunch
const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
const mealplanUserData = {
    caloriesPerDay: "2000",
    preferences: ["pork-free", "fish-free"],
    goal: "gain",
};

// mealplan will be updated daily
const date = new Date();
let meals = {};
const currentDateString =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

// check if there is stored data in localStorage and if data is less than 7 days old
let isDataOutdated;
if (localStorage.getItem("meals")) {
    isDataOutdated =
        (date.getTime() -
            JSON.parse(localStorage.getItem("meals")).currentDate) /
            86400000 >
        7;
}
if (localStorage.getItem("meals") && !isDataOutdated) {
    console.log("meal plan data is up to date");
    meals = JSON.parse(localStorage.getItem("meals"));
    console.log(meals);
    addRecipesToDiv(date.getDay());
} else {
    meals = {
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
    console.log(meals);
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
    fetchURLs(generateFetchURLs(mealplanUserData))
        .then((mealsResponse) => {
            let counter = 0;
            for (const mealType in mealsResponse) {
                for (const day in meals) {
                    meals[day][mealType] =
                        mealsResponse[mealType].hits[counter].recipe;
                }
                counter++;
            }
            console.log(meals);
            meals.currentDate = date.getTime();
            console.log(meals);
            localStorage.setItem("meals", JSON.stringify(meals));
        })
        .then(() => {
            addRecipesToDiv(date.getDay());
        });
}
function addRecipesToDiv(day) {
    console.log("started adding divs");
    const { breakfast, lunch, snack1, snack2, dinner } =
        meals[`${weekdays[day]}`];
    console.log(breakfast);
    $(".breakfast > img").attr("src", `${breakfast.images.THUMBNAIL.url}`);
    $(".breakfast-recipe-name").text(`${breakfast.label}`);
    $(".breakfast-recipe-name").text(`${breakfast.label}`);
}
