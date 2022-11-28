const storageKey = "userData";

/**
 * set the localstorage with above key `userData`
 * @param Object userData
 */
function setUserDetails(userData) {
    localStorage.setItem(storageKey, JSON.stringify(userData));
}

/**
 * returns the localstorage with `userData` key
 * @returns userData
 */
function getUserDetails() {
    return JSON.parse(localStorage.getItem(storageKey));
}

function returnPreferences() {
    let checked = [];
    $("input[type='checkbox']:checked").each(function () {
        checked.push($(this).val());
    });
    return checked;
}
