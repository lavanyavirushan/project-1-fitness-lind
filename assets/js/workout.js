const NINJA_API_KEY = 'KaNfrVr0gq1fjjoGzcLafA==1Ub7ns3B5ds3USXd'
const SERPAPI_API_KEY =
    'e07bb932c905c658e1aff956da90a6b978f4cdc63e67bb6ba6164912414d05d9'
$(document).ready(function () {
    console.log('ready')
    $('.sidebar-toggle').click(function () {
        $('.exercise').fadeToggle()
        $('.sidebar').animate({
            opacity: 'toggle',
            width: 'toggle',
        })
    })

    const userData = JSON.parse(localStorage.getItem('userData'))
    // type of exercises for each type of person
    let equipment
    if (userData.place === 'home') {
        equipment = ['body_only', 'none']
    } else {
        equipment = 'any'
    }
    const exercisesData = {
        equipment: equipment,
        exercise1: 'cardio',
        exercise2: 'plyometrics',
        exercise3: `${userData.goal === 'gain' ? 'strength' : 'cardio'}`,
    }

    const exercises = {}
    const fetches = []
    for (let i = 1; i <= 3; i++) {
        fetches.push(
            fetch(
                `https://api.api-ninjas.com/v1/exercises?type=${
                    exercisesData[`exercise${i}`]
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
                        let randomExerciseNumber = Math.round(
                            Math.random() * data.length
                        )
                        exercises[`exercise${i}`] = {
                            exerciseName: data[randomExerciseNumber].name,
                            exerciseDescription:
                                data[randomExerciseNumber].instructions,
                        }
                    } else {
                        for (const exercise of data) {
                            if (
                                exercise.equipment === equipment[0] ||
                                exercise.equipment === equipment[1]
                            ) {
                                exercises[`exercise${i}`] = {
                                    exerciseName: exercise.name,
                                    exerciseDescription: exercise.instructions,
                                }
                            }
                        }
                    }
                })
        )
    }
    Promise.all(fetches).then(function () {
        $('.exercise1').text(`${exercises.exercise1.exerciseName}`)
        $('.exercise2').text(`${exercises.exercise2.exerciseName}`)
        $('.exercise3').text(`${exercises.exercise3.exerciseName}`)
    })
    $('.exercise1').click(() => {
        $('.mainExercise').text(`${exercises.exercise1.exerciseName}`)
        $('.mainExerciseDescription').text(
            `${exercises.exercise1.exerciseDescription}`
        )
    })
    $('.exercise2').click(() => {
        $('.mainExercise').text(`${exercises.exercise2.exerciseName}`)
        $('.mainExerciseDescription').text(
            `${exercises.exercise2.exerciseDescription}`
        )
    })
    $('.exercise3').click(() => {
        $('.mainExercise').text(`${exercises.exercise3.exerciseName}`)
        $('.mainExerciseDescription').text(
            `${exercises.exercise3.exerciseDescription}`
        )
    })
})
