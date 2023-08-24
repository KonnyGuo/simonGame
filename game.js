
let gamePattern = [];

let userClickedPattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let level = 0;

let first = true;


$(document).on("keydown", function(){
    if(first){
        nextSequence();
        first = false;
        $("h1").text("level " + level);

    }
});


$(".btn").on("click", function(){
    //get the id color of chosen
    let userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    //userClickPattern-1
    checkAnswer(userClickedPattern.length-1)
})



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    //get random color
    let randomNum = Math.floor((Math.random()*4));
    let randomChosenColour = buttonColors[randomNum];

    //add color to array
    gamePattern.push(randomChosenColour);

    //get the id and add fade effect
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
 
}

function playSound(name){
    let playAudio = new Audio("sounds/" + name + ".mp3");
    playAudio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    } else {
        console.log("fail");
        playAudio = new Audio("sounds/wrong.mp3");
        playAudio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 500);

        $("h1").text("Game Over! Press any key to restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    first = true;
}
