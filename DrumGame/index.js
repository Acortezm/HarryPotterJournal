const buttons = document.querySelectorAll(".drum")
const audioTon1 = new Audio("./sounds/tom-1.mp3")

for (i = 0; i < buttons.length; i++){

    buttons[i].addEventListener("click", function(){
        const button = this.innerHTML;
        makeSound(button)
        buttonAnimation(button)
    })
}

document.addEventListener('keydown', function(event) {
    makeSound(event.key)
    buttonAnimation(event.key)
  });
    

function makeSound(key){
    switch(key){
        case "w":
            const crash = new Audio("./sounds/crash.mp3");
            crash.play();
            break;
        case "a":
            const kick = new Audio("./sounds/kick-bass.mp3");
            kick.play();
            break;
        case "s":
            const snare = new Audio("./sounds/snare.mp3");
            snare.play();
            break;

        case "d":
            const tom1 = new Audio("./sounds/tom-1.mp3");
            tom1.play();
            break;
        case "j":
            const tom2 = new Audio("./sounds/tom-2.mp3");
            tom2.play();
            break;
        case "k":
            const tom3 = new Audio("./sounds/tom-3.mp3");
            tom3.play();
            break;
        case "l":
            const tom4 = new Audio("./sounds/tom-4.mp3");
            return tom4.play();
            break;
        default:
            console.log("Wrong key")
    }

}

function buttonAnimation(currentKey){
    const currentButton = document.querySelector("."+currentKey)
    currentButton.classList.add("pressed")
    setTimeout(function(){
        currentButton.classList.remove("pressed")
    }, 200)
}

