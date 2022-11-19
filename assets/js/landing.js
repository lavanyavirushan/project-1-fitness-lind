// sample user profile according to our list
const userData = {
    gender: 'male',
    // unsure if age is needed because very hard to set excercise list according to age and body type
    age: '35',
    bodyType: 'endomorph', // ectomorph, endomorph, mesomorph (to avoid rude namings)
    weight: '70', // in kg
    height: '175', // in cm
    goal: 'gain', // lose, gain
    place: 'home', // home or gym for picking equipment for excercises
}
localStorage.setItem(userData, JSON.stringify(userData))
