var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).keydown(function(){
    if(!started)
    {
        //$("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});


function nextSequence(){
    userClickedPattern = [];
    
    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColor);
}

function checkAnswer(currLevel)
{
    if(userClickedPattern[currLevel] === gamePattern[currLevel]){
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");  
        }, 400);
        
        

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function playSound(name){
    
    var aud = new Audio("sounds/" + name + ".mp3");
    aud.play();
}

function animatePress(currColor)
{
    $("#" + currColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currColor).removeClass("pressed");
    }, 50);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
