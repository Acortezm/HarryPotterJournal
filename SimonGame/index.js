const buttonColours= ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0



$(document).on("keydown", ()=>{
   if (gamePattern.length == 0){
        nexSecuence()
   }  
})

function patternCheck(index){
    if(gamePattern[index-1] === userClickedPattern[index-1]){
        console.log("success")
        if(gamePattern.length === userClickedPattern.length ){
            setTimeout(()=>{
                nexSecuence()
            },200)
        }
    } else {
        wrongAnswer()
        gamePattern = []
        userClickedPattern = []
        level = 0
        
    }
}

function nexSecuence(){
    const randomNumber = Math.floor(Math.random() * 4 )
    let randomChosenColour = buttonColours[randomNumber]
   
    gamePattern.push(randomChosenColour)
    makeSound(randomChosenColour)
    
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100)
    $("h1").text(`Level ${level}`);
    level++
    userClickedPattern = []
}

function makeSound(color){
    const colourAudio = new Audio(`./sounds/${color}.mp3`)
     return colourAudio.play()
}

$(".btn").on("click", function(){
    if (gamePattern.length > 0){
        const userChosenColour= $(this).attr("id")
        userClickedPattern.push(userChosenColour)
        makeSound(userChosenColour)
        animatePress(userChosenColour)
        patternCheck(userClickedPattern.length)
    }
})


function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed")
        setTimeout(()=>{
            $(`#${currentColour}`).removeClass("pressed")
    },"100")
}

function wrongAnswer(){
    const wrongSound = new Audio("./sounds/wrong.mp3")
    wrongSound.play()
    $("h1").text(`Game Over`)
    $("body").addClass("game-over")
    setTimeout(()=>{
        $("body").removeClass("game-over")
        $("h1").text(`Press A Key to Start`)
    }, 600)
}

