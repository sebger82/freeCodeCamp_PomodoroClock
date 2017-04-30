$(function () {
    var lekcja = 25;
    var przerwa = 5;
    
        var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}

    
    $('form').on("submit", function (){
        event.preventDefault();
        lekcja = $('#lekcja').val();
        przerwa = $('#przerwa').val();
       startTimer(lekcja * 60, przerwa * 60);
        
    });
    


function startTimer(duration, breaking) {
    var timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer - hours * 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $('#czas').text(hours + ":" + minutes + ":" + seconds);

        if (--timer < 0) {
            timer = breaking;
        }
    }, 1000);
}

 
});