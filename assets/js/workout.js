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
})
