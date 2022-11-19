const NINJA_API_KEY = 'KaNfrVr0gq1fjjoGzcLafA==1Ub7ns3B5ds3USXd'
const SERPAPI_API_KEY =
    'e07bb932c905c658e1aff956da90a6b978f4cdc63e67bb6ba6164912414d05d9'
$(document).ready(function () {
    $('.sidebar-toggle').click(function () {
        $('.excercise').fadeToggle()
        $('.sidebar').animate({
            opacity: 'toggle',
            width: 'toggle',
        })
    })

    const userData = JSON.parse(localStorage.getItem(userData))
    // type of excersises for each type of person
    let equipment
    if (userData.place === 'home') {
        equipment = ['body_only', 'none']
    } else {
        equipment = 'any'
    }
    const excercisesData = {
        equipment: equipment,
        excercise1: 'cardio',
        excercise2: 'plyometrics',
        excercise3: `${userData.goal === 'gain' ? 'strength' : 'cardio'}`,
    }

    const excersisesList = []
    for (i = 1; i <= 3; i++) {
        fetch(`https://api.api-ninjas.com/v1/exercises?type=`, {
            method: 'GET',
            headers: {
                'X-Api-Key': 0,
            },
        })
    }
})
