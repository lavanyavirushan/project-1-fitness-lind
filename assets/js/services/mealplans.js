// https://developer.edamam.com/edamam-docs-recipe-api

const EDAMAM_API_APP_ID = "df0d49c4";
const EDAMAM_API_APP_KEY = "9571bca2f3520f672c7afcdda913fbf7";

// Callories division is: 18% for breakfast, 30% for lunch, 30% for dinner, 11% for snack 1, 11% for snack 2.
// Range for each meal would be 10% of the callories per meal. For example we have 2000 cals per day, so its 600 cals for lunch and the range would be 540-660 cals for lunch
if (localStorage.getItem("userData")) {
    globalFunction();
} else {
    $("#meals").prepend(
        "<div class='warning bg-red-800 hover:bg-red-700 p-4 sm:p-6 lg:p-4 xl:p-6 space-x-4 items-center sm:space-x-6 lg:space-x-4 xl:space-x-6 flex cursor-pointer hover:bg-emerald-700 hover:rounded-lg rounded-lg m-4 text-white justify-center'> You should complete the questionnaire on home page to get personalized meal plan </div>"
    );
    $(".warning").click(() => (window.location.href = "./journey.html"));
}
function globalFunction() {
    const weekdays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];

    const userData = JSON.parse(localStorage.getItem("userData"));

    const mealplanUserData = {
        //if the goal is to gain weight there will be added 500 cals daily, else removed 500 cals
        caloriesPerDay: `${
            userData.goal === "gain"
                ? Number(userData.calories) + 500
                : Number(userData.calories) - 500
        } `,
        preferences: userData.foodPreferences,
        goal: userData.goal,
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
        meals = JSON.parse(localStorage.getItem("meals"));

        addRecipesToDiv(date.getDay());
        $(".btn-monday").click(() => addRecipesToDiv(1));
        $(".btn-tuesday").click(() => addRecipesToDiv(2));
        $(".btn-wednesday").click(() => addRecipesToDiv(3));
        $(".btn-thursday").click(() => addRecipesToDiv(4));
        $(".btn-friday").click(() => addRecipesToDiv(5));
        $(".btn-saturday").click(() => addRecipesToDiv(6));
        $(".btn-sunday").click(() => addRecipesToDiv(0));
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
        addRecipesToObject(mealplanUserData);
    }
    // generate api request urls according to user data
    function generateFetchURLs(mealplanUserData) {
        const cals = Number(mealplanUserData.caloriesPerDay);
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

    // async function fetches api returns a promise
    async function fetchURLs(URLs) {
        const mealsJSON = {};
        for (const meal in URLs) {
            try {
                let p1;
                try {
                    p1 = await fetch(URLs[meal]);
                } catch {
                    console.log(
                        "Currently we're using free version of api that has limits for calls, please try again in a minute"
                    );
                }

                let p2 = await p1.json();
                mealsJSON[meal] = p2;
            } catch (error) {
                mealsJSON[meal] = "fetch error";
            }
        }
        return mealsJSON;
    }

    // form an object of recepies
    function addRecipesToObject(mealplanUserData) {
        fetchURLs(generateFetchURLs(mealplanUserData))
            .then((mealsResponse) => {
                let counter = 1;
                for (const mealType in mealsResponse) {
                    counter = 1;
                    for (const day in meals) {
                        meals[day][mealType] =
                            mealsResponse[mealType].hits[counter].recipe;
                        counter++;
                    }
                }

                meals.currentDate = date.getTime();

                localStorage.setItem("meals", JSON.stringify(meals));
            })
            .then(() => {
                addRecipesToDiv(date.getDay());
                $(".btn-monday").click(() => addRecipesToDiv(1));
                $(".btn-tuesday").click(() => addRecipesToDiv(2));
                $(".btn-wednesday").click(() => addRecipesToDiv(3));
                $(".btn-thursday").click(() => addRecipesToDiv(4));
                $(".btn-friday").click(() => addRecipesToDiv(5));
                $(".btn-saturday").click(() => addRecipesToDiv(6));
                $(".btn-sunday").click(() => addRecipesToDiv(0));
            });
    }

    // render recipe on page
    function addRecipesToDiv(day) {
        const googleSearchURLbody = "https://www.google.com/search?q=";
        const { breakfast, lunch, snack1, snack2, dinner } =
            meals[`${weekdays[day]}`];
        $(`.breakfast > img`).attr("src", `${breakfast.images.SMALL.url}`);
        $(`.breakfast-recipe-name`).text(`${breakfast.label}`);
        $(".breakfast-ingridients").html(
            `${breakfast.ingredientLines.join("<br>")}`
        );
        $(".breakfast-link").attr(
            "href",
            `${googleSearchURLbody}${breakfast.label.replace(/\s/g, "+")}`
        );

        $(`.snack1 > img`).attr("src", `${snack1.images.SMALL.url}`);
        $(`.snack1-recipe-name`).text(`${snack1.label}`);
        $(".snack1-ingridients").html(`${snack1.ingredientLines.join("<br>")}`);
        $(".snack1-link").attr(
            "href",
            `${googleSearchURLbody}${snack1.label.replace(/\s/g, "+")}`
        );

        $(`.lunch > img`).attr("src", `${lunch.images.SMALL.url}`);
        $(`.lunch-recipe-name`).text(`${lunch.label}`);
        $(".lunch-ingridients").html(`${lunch.ingredientLines.join("<br>")}`);
        $(".lunch-link").attr(
            "href",
            `${googleSearchURLbody}${lunch.label.replace(/\s/g, "+")}`
        );

        $(`.snack2 > img`).attr("src", `${snack2.images.SMALL.url}`);
        $(`.snack2-recipe-name`).text(`${snack2.label}`);
        $(".snack2-ingridients").html(`${snack2.ingredientLines.join("<br>")}`);
        $(".snack2-link").attr(
            "href",
            `${googleSearchURLbody}${snack2.label.replace(/\s/g, "+")}`
        );

        $(`.dinner > img`).attr("src", `${dinner.images.SMALL.url}`);
        $(`.dinner-recipe-name`).text(`${dinner.label}`);
        $(".dinner-ingridients").html(`${dinner.ingredientLines.join("<br>")}`);
        $(".dinner-link").attr(
            "href",
            `${googleSearchURLbody}${dinner.label.replace(/\s/g, "+")}`
        );
    }
}
