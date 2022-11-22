/**
 * This is trigered when user click submit button
 * adds all the user input into localstorage 
 * TODO: need to set gender, bodyType, goal
 */
function submitDispatcher(){

    const bodyTypeSelected = [].filter.call( bodyType, function( el ) {
        return el.checked;
     });
    setUserDetails({
        name: `${firstName.value}  ${lastName.value}`,
        age: age.value,
        gender: gender.value,
        height: height.value,
        weight: weight.value,
        bodyType: bodyTypeSelected[0].value,
        goal: workoutGoal.value
    })
}
