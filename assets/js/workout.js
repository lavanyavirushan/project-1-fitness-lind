const NINJA_API_KEY = 'KaNfrVr0gq1fjjoGzcLafA==1Ub7ns3B5ds3USXd'
const SERPAPI_API_KEY =
    'e07bb932c905c658e1aff956da90a6b978f4cdc63e67bb6ba6164912414d05d9'
$(document).ready(function () {
    console.log('ready')
    $('.sidebar-toggle').click(function () {
        $('.excercise').fadeToggle()
        $('.sidebar').animate({
            opacity: 'toggle',
            width: 'toggle',
        })
    })

    const userData = JSON.parse(localStorage.getItem('userData'))
    // type of excercises for each type of person
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

    const excercises = {}
    const fetches = []
    for (let i = 1; i <= 3; i++) {
        fetches.push(
            fetch(
                `https://api.api-ninjas.com/v1/exercises?type=${
                    excercisesData[`excercise${i}`]
                }`,
                {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': NINJA_API_KEY,
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    if (equipment === 'any') {
                        let randomExcerciseNumber = Math.round(
                            Math.random() * data.length
                        )
                        excercises[`excercise${i}`] = {
                            excerciseName: data[randomExcerciseNumber].name,
                            excerciseDescription:
                                data[randomExcerciseNumber].instructions,
                        }
                    } else {
                        for (const excercise of data) {
                            if (
                                excercise.equipment === equipment[0] ||
                                excercise.equipment === equipment[1]
                            ) {
                                excercises[`excercise${i}`] = {
                                    excerciseName: excercise.name,
                                    excerciseDescription:
                                        excercise.instructions,
                                }
                            }
                        }
                    }
                })
        )
    }
    Promise.all(fetches).then(function () {
        $('.excercise1').text(`${excercises.excercise1.excerciseName}`)
        $('.excercise2').text(`${excercises.excercise2.excerciseName}`)
        $('.excercise3').text(`${excercises.excercise3.excerciseName}`)
    })
    $('.excercise1').click(() => {
        $('.mainExcercise').text(`${excercises.excercise1.excerciseName}`)
        $('.mainExcerciseDescription').text(
            `${excercises.excercise1.excerciseDescription}`
        )
    })
    $('.excercise2').click(() => {
        $('.mainExcercise').text(`${excercises.excercise2.excerciseName}`)
        $('.mainExcerciseDescription').text(
            `${excercises.excercise2.excerciseDescription}`
        )
    })
    $('.excercise3').click(() => {
        $('.mainExcercise').text(`${excercises.excercise3.excerciseName}`)
        $('.mainExcerciseDescription').text(
            `${excercises.excercise3.excerciseDescription}`
        )
    })
})
