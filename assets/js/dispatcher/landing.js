/**
 * This is trigered when user click submit button
 * adds all the user input into localstorage 
 * TODO: need to set gender, bodyType, goal
 */
function submitDispatcher(){
    setUserDetails({
        name: `${firstName.value}  ${lastName.value}`,
        age: age.value,
        gender: "male",
        height: height.value,
        weight: weight.value,
        bodyType: "endomorph",
        goal: "gain"
    })
}
