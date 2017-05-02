$(function () {
    var lesson = 25; //default time for lesson
    var pause = 5; //default time for break
    var refreshIntervalId;
    var isPaused = false;
    var myVar = setInterval(myTimer, 1000); //var for global clock
    var type = 1; //1 for duration of leesson, 2 for break
    
    // function for global clock
    function myTimer() {
        var d = new Date();
        document.getElementById("global_time").innerHTML = d.toLocaleTimeString();
    }
    
    // main program function for calculaing time
    function startTimer(duration, breaking) {
        var timer = duration, hours, minutes, seconds;
        refreshIntervalId = setInterval(function () {
            if (!isPaused) {
                hours = parseInt(timer / 3600, 10);
                minutes = parseInt((timer - hours * 3600) / 60, 10);
                seconds = parseInt(timer % 60, 10);
                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                $('#current_time').text(hours + ":" + minutes + ":" + seconds);
                timer = timer - 1;
                if (timer <= 0 && type === 1) {
                    $('#current_event').text("BREAK");
                    timer = breaking;
                    type = 2;
                } else if (timer <= 0 && type === 2) {
                    $('#current_event').text("WORKING");
                    timer = duration;
                    type = 1;
                }
            }
        }, 1000);
    }
    
    // event for the START button
    $("#start").on("click", function () {
        $("#lesson, #pause").attr("disabled", true);
        event.preventDefault();
        lesson = $('#lesson').val();
        pause = $('#pause').val();
        startTimer(lesson * 60, pause * 60);
        $(".min_circle").css({"animation-play-state" : "running", "animation-name" : "rotate_1"});
        $(".sec_circle").css({"animation-play-state" : "running", "animation-name" : "rotate_1"});
        $(this).hide();
        isPaused = false;
        $("#stop").show();
        $('#current_event').text("WORKING");
    });

    // event for the STOP button
    $("#stop").on("click", function () {
        $(this).hide();
        $("#resume").show();
        $(".min_circle").css({"animation-play-state" : "paused", "animation-name" : "rotate_1"});
        $(".sec_circle").css({"animation-play-state" : "paused", "animation-name" : "rotate_1"});
        isPaused = !isPaused;
        $('#current_event').text("PAUSED");
    });

    // event for the RESUME button
    $("#resume").on("click", function () {
        $(this).hide();
        $("#stop").show();
        $(".min_circle").css({"animation-play-state" : "running", "animation-name" : "rotate_1"});
        $(".sec_circle").css({"animation-play-state" : "running", "animation-name" : "rotate_1"});
        isPaused = !isPaused;
        if ( type === 1) {
            $('#current_event').text("WORKING");
        } else if (type === 2) {
            $('#current_event').text("BREAK");
        }
    });

    // event for the RESET button
    $("#reset").on("click", function () {
        $("#lesson, #pause").attr("disabled", false);
        $("#stop").hide();
        $("#resume").hide();
        $("#start").show();
        $(".min_circle").css({"animation-play-state" : "paused", "animation-name" : "rotate_2"});
        $(".sec_circle").css({"animation-play-state" : "paused", "animation-name" : "rotate_2"});
        clearInterval(refreshIntervalId);
        $("#current_event").text("");
        $("#current_time").text("00:00:00");
    });
});