
// H1 at the top to display title and winner
let banner = document.getElementById("banner");

// Player and Computer Scores to be updated
let playerScoreCard = document.querySelector(".home");
let computerScoreCard = document.querySelector(".away");

//Player and computer names on scoreboard
const playerScoreboardName = document.querySelector(".player-score-name");
const computerScoreboardName = document.querySelector(".computer-score-name");

// Active game round
let roundDisplay = document.querySelector(".round");

// Player choice and notification element for player win
let playerChoice = document.querySelector(".player-half .choice");
let playerNotification = document.querySelector(".notification-player");

// Computer choice and notification element for computer win
let computerChoice = document.querySelector(".computer-half .choice");
let computerNotification = document.querySelector(".notification-computer");

// section under player choice display
const controls = document.querySelector(".controls");
const buttonSection = document.querySelector(".buttons");
const setUsernameSection = document.querySelector(".start-game");
const playerNameWarning = document.querySelector("#warning");

// Player Name Input for entering player name
const playerNameInput = document.querySelector("#player-name");
const startButton = document.querySelector("#start");

//Add event listener for Q, W and E Keys
document.addEventListener("keydown", (e) => {
    if(e.key.toLowerCase() == "q" && gameOn){ //Get value of the key that was pressed
        playerPick = "✊"; //Take player's choice and execute the same code in setUserChoice function
        let computerPick = setComputerPick(choices);
        showChoices(playerPick, computerPick);
        compareChoices(playerPick, computerPick);
        updateScoreboard();
        checkWinner();
}

})

document.addEventListener("keydown", (e) => {
    if(e.key.toLowerCase() == "w" && gameOn){ 
        playerPick = "👋";
        let computerPick = setComputerPick(choices); //TODO - Create funciton for setting the computer's choice
        showChoices(playerPick, computerPick);
        compareChoices(playerPick, computerPick); //TODO - Create function for comparing user and computer choices and displaying winner
        updateScoreboard(); //TODO - Create function to update the scoreboard
        checkWinner();
}
})

document.addEventListener("keydown", (e) => {
    if(e.key.toLowerCase() == "e" && gameOn){
        playerPick = "✌️";
        let computerPick = setComputerPick(choices); //TODO - Create funciton for setting the computer's choice
        showChoices(playerPick, computerPick);
        compareChoices(playerPick, computerPick); //TODO - Create function for comparing user and computer choices and displaying winner
        updateScoreboard(); //TODO - Create function to update the scoreboard
        checkWinner();
}
})

//Set Game Variables
let gameOn = false; //Is the game currently running or is there a winner?
let currentRound = 0; //What is the current round?
let playerName; //Declare variable for player's name to be entered
let playerPick; //Variable for player's pick
let playerScore = 0; //Variable for player's score
let computerScore = 0; //variable for computer's score

const choices = ["✊", "👋", "✌️"]; //Array of choices that computer can select from

playerNameInput.addEventListener("keydown", (event) => { //This is an event listener for press of "Enter" key to start game when user has entered their name
    if(event.key == "Enter"){
        startGame(event);
    }
})

startButton.addEventListener("click", startGame); //This is for start game button to run startGame function when clicked

function startGame(event){ // startGame function

    event.preventDefault(); //Prevent Default behaviour of button to submit form

    let isPlayerName = setPlayerName(playerNameInput); //Take user input and set their name on scoreboard

    if(isPlayerName){ //If PlayerName has been set? Replace input with buttons panel
        const buttonSection = document.createElement("div");
        buttonSection.id = "buttons";
        buttonSection.innerHTML =  
        `<button type="button" id="rock" class="options">
            <span class="sign">✊</span>
            <span class="tip">Rock <span>Q</span></span>
        </button>
        <button type="button" id="paper" class="options">
            <span class="sign">👋</span>
            <span class="tip">Paper <span>W</span></span>
        </button>
        <button type="button" id="scissors" class="options">
            <span class="sign">✌️</span>
            <span class="tip">Scissors <span>E</span></span>
        </button>`;

        controls.removeChild(setUsernameSection);
        controls.append(buttonSection);
        const choiceButtons = document.querySelectorAll(".options");
        for(let button of choiceButtons){
            button.addEventListener("click", setUserChoice);
        }

        gameOn = true; //set gameOn variable to true to show that game has started
        currentRound = 1; //set current round to round 1
        roundDisplay.textContent = `Round ${currentRound}`;
    }

}

function setPlayerName(input){

    if(input.value == ""){ //If there is nothing in input, show a notification to user
        playerNameWarning.style = "opacity: 100%; bottom: 120%;";
        setTimeout(() => {
            playerNameWarning.style = "bottom: 110%; opacity: 0%;";
        }, 2000)
        return false; //return boolean that can be used to check if the player's name has been set so that game can start
    }
    else{ //Otherwise, take the input and set it on scoreboard
        playerName = input.value;
        playerScoreboardName.innerHTML =   `${playerName.slice(0, 9)} <span class="trophy-badge">👤</span>`;
        return true;
    }
}


function setUserChoice(event){ //Takes a user's pick, shows their choice against computer's, compares them, updates scoreboard and checks winner
        if(gameOn){
            let pick = event.target.querySelector(".sign").textContent;
            playerPick = pick;
            let computerPick = setComputerPick(choices); //TODO - Create funciton for setting the computer's choice
            showChoices(playerPick, computerPick);
            compareChoices(playerPick, computerPick); //TODO - Create function for comparing user and computer choices and displaying winner
            updateScoreboard(); //TODO - Create function to update the scoreboard
            checkWinner();
        }
    
}

function setComputerPick(choiceArray){ //Set the computer's pick
    for(let i = choiceArray.length - 1; i > 0; i--){ //Shuffle choice array using Fisher-Yates
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [choiceArray[i], choiceArray[randomIndex]] = [choiceArray[randomIndex], choiceArray[i]];
    }

    return choiceArray[0]; //return first element of shuffled array
}

function compareChoices(playerPick, computerPick){//Compare player and computer's choices
    
    let message; //declare variable for message that will be displayed or notified by tags

    switch(true){
        case (playerPick == computerPick):
            message =  "It's a Tie!";
            notifyTie(message);
            break;
        case (playerPick == "✊" && computerPick == "✌️"):
            message = `${playerName} Wins!`;
            notifyPlayerWon(message);
            playerScore += 1;
            break;
        case (playerPick == "✌️" && computerPick == "✊"):
            message = "Computer Wins!";
            notifyComputerWon(message);
            computerScore += 1;
            break;
        case (playerPick == "✌️" && computerPick == "👋"):
            message = `${playerName} Wins!`;
            notifyPlayerWon(message);
            playerScore += 1;
            break;
        case (playerPick == "👋" && computerPick == "✌️"):
            message = "Computer Wins!";
            notifyComputerWon(message);
            computerScore += 1;
            break;
        case (playerPick == "👋" && computerPick == "✊"):
            message = `${playerName} Wins!`;
            notifyPlayerWon(message);
            playerScore += 1;
            break;
        case (playerPick == "✊" && computerPick == "👋"):
            message = "Computer Wins!";
            notifyComputerWon(message);
            computerScore += 1;
            break;
        
    }
}

function notifyPlayerWon(message){ //function for notifying that player won the round

    playerNotification.textContent = message;

    //function to set transitions for flap tags to show winner - open tag, show winner, close after 1.5s
    playerNotification.style = "opacity: 100%; transform: rotateY(0deg);";
    setTimeout(() => {
        playerNotification.style = "opacity: 0%; transform: rotateY(-100deg);";
    }, 1500); 

}

function notifyComputerWon(message){

    computerNotification.textContent = message;
    computerNotification.style = "opacity: 100%; transform: rotateY(0deg);";
    setTimeout(() => {
        computerNotification.style = "opacity: 0%; transform: rotateY(100deg);";
    }, 1500);

}

function notifyTie(message){

    playerNotification.textContent = message;
    computerNotification.textContent = message;
    playerNotification.style = "opacity: 100%; transform: rotateY(0deg); width: 50px;";
    computerNotification.style = "opacity: 100%; transform: rotateY(0deg); width: 50px;";
    setTimeout(() => {
        playerNotification.style = "opacity: 0%; transform: rotateY(-100deg); width: 50px;";
        computerNotification.style = "opacity: 0%; transform: rotateY(100deg); width: 50px;";
    }, 1000);

}

function updateScoreboard(){

    playerScoreCard.textContent = playerScore;
    computerScoreCard.textContent = computerScore;

}

function showChoices(playerPick, computerPick){ //Display player and computer picks with animation

    playerChoice.textContent = playerPick;
    computerChoice.textContent = computerPick;

    playerChoice.classList.add("animated-choice"); //Add animation utility class
    computerChoice.classList.add("animated-choice");

    setTimeout(() => {
        playerChoice.classList.remove("animated-choice"); //Remove it so that it can be added again next time this is called. Delay by 500ms to allow the animation to load first
        computerChoice.classList.remove("animated-choice");
    }, 500)
}

function checkWinner(){ //Check for the winner of the game at round 5. If current round is not 5 yet, update current round
    if(currentRound == 5){
        switch(true){
            case computerScore > playerScore:
                banner.textContent = "Computer Wins! 🏆";
                gameOn = false;
                restartGame();
                break;
            
            case playerScore > computerScore:
                banner.textContent = `${playerName} Wins! 🏆`;
                gameOn = false;
                restartGame();
                break;

            default:
                banner.textContent = `It's a Tie! 🏳️`;
                gameOn = false;
                restartGame();
                break;
        }
    }
    else{
        currentRound++;
        roundDisplay.textContent = `Round ${currentRound}`;
    }
}

function restartGame(){ //Ask user if they want to restart game with their player name

    const restartSection = document.createElement("div");
        restartSection.id = "restartSection";
        restartSection.innerHTML =  
        `<div class="restart">
            <button type="button" id="restartBtn">Restart?</button>
        </div>`;

    const buttonSection = document.querySelector("#buttons");

    controls.removeChild(buttonSection);
    controls.append(restartSection);

    const restartBtn = document.querySelector("#restartBtn");

    restartBtn.addEventListener("click", (e) => { //If restart button is clicked, set defaults back

        currentRound = 0;
        playerPick = null;
        playerScore = 0;
        computerScore = 0;
        updateScoreboard();
        banner.textContent = "Rock, Paper, Scissors";

        const buttonSection = document.createElement("div");
        buttonSection.id = "buttons";
        buttonSection.innerHTML =  
        `<button type="button" id="rock" class="options">
            <span class="sign">✊</span>
            <span class="tip">Rock <span>Q</span></span>
        </button>
        <button type="button" id="paper" class="options">
            <span class="sign">👋</span>
            <span class="tip">Paper <span>W</span></span>
        </button>
        <button type="button" id="scissors" class="options">
            <span class="sign">✌️</span>
            <span class="tip">Scissors <span>E</span></span>
        </button>`;


        //Replace restart button with original button panel
        controls.removeChild(restartSection);
        controls.append(buttonSection);
        const choiceButtons = document.querySelectorAll(".options");
        for(let button of choiceButtons){
            button.addEventListener("click", setUserChoice);
        }

        //Start the game from beginnning by setting gameOn to true and round back to 1
        gameOn = true;
        currentRound = 1;
        roundDisplay.textContent = `Round ${currentRound}`;

    })
}

