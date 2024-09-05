let randomNumber1
let randomNumber2 
const dices = ["./images/dice1.png", "./images/dice2.png", "./images/dice3.png", "./images/dice4.png", "./images/dice5.png", "./images/dice6.png" ]
const title = document.querySelector("h1")
const button = document.querySelector(".btn")

button.addEventListener("click", function(){
    randomNumber1 = Math.floor(Math.random() * 6)
    randomNumber2 = Math.floor(Math.random() * 6)
    document.querySelector(".img1").setAttribute("src", dices[randomNumber1])
    document.querySelector(".img2").setAttribute("src", dices[randomNumber2])
    button.textContent = "Play Again!"
    anounceWinner()
})

function anounceWinner(){
    if (randomNumber1 > randomNumber2){
        title.textContent = "🚩 Player 1 wins!"
    } else if (randomNumber2 > randomNumber1){
        title.textContent = "Player 2 wins 🚩"
    } else {
        title.textContent = "Draw"
    }
}

