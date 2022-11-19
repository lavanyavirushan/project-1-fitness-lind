$(document).ready(function () {
    $('.sidebar-toggle').click(function () {
        $('.excercise').fadeToggle()
        $('.sidebar').animate({
            opacity: 'toggle',
            width: 'toggle',
        })
    })
})
