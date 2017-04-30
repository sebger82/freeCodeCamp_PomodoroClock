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
        $('#czas').text(lekcja);
    });
    
});