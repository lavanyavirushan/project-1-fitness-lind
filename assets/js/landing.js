// sample user profile according to our list
const userData = {
    gender: 'male',
    age: '35',
    bodyType: 'endomorph', // ectomorph, endomorph, mesomorph (to avoid rude namings)
    weight: '70', // in kg
    height: '175', // in cm
    goal: 'gain', // lose, gain, mantain
}
localStorage.setItem(userData, JSON.stringify(userData))
