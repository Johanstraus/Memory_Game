const cards = document.querySelectorAll(".card");


let matchedCard = 0;
let cardOne = null;
let cardTwo = null;
let disableDeck = false;

function flipCard(e) {
    if (disableDeck) return; // Ignore clicks while cards are shaking

    let clickedCard = e.target;

    if (clickedCard === cardOne || clickedCard === cardTwo || clickedCard.classList.contains("flip")) {
        return; // Ignore clicking the same card or already flipped card
    }

    clickedCard.classList.add("flip");

    //Setting both cards value to blank
    if (cardOne && cardTwo) { 
        cardOne = null;
        cardTwo = null;
    }

    if (cardOne) {
        cardTwo = clickedCard;
        let cardOneImg = cardOne.querySelector("img").getAttribute("src");
        let cardTwoImg = cardTwo.querySelector("img").getAttribute("src");

        matchCards(cardOne, cardTwo, cardOneImg, cardTwoImg);
    } else {
        cardOne = clickedCard; // Assign cardOne to the newly clicked card
    }
}


function matchCards(cardOne, cardTwo, img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if(matchedCard == 8){
            setTimeout(() =>{
                return shuffleCard();
            }, 1000); //calling shuffleCard function after 1 second
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //setting both cards value to blank
    } else {
        // If two cards do not match, add a shake class
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
        disableDeck = true; // Disable further clicks while cards shake

        setTimeout(() => {
            // Remove the shake class and flip class from both cards
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");

            setTimeout(() => {
                // Remove the "flip" class to reset the cards
                cardOne.classList.remove("flip");
                cardTwo.classList.remove("flip");
                cardOne = null;
                cardTwo = null;
                disableDeck = false; // Re-enable further clicks
            }, 100); // Adjust the delay (in milliseconds) as needed
        }, 1000); // Adjust the delay (in milliseconds) as needed
    }
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = null;
    cardTwo = null;
    disableDeck = false; // Reset the disableDeck flag
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // Shuffle the array items randomly

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        card.classList.remove("shake"); // Remove the "shake" class
        let imgTag = card.querySelector("img");
        imgTag.setAttribute("src", `Assets/img-${arr[index]}.jpeg`); // Assign shuffled images
        card.addEventListener("click", flipCard);
    });
}


shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
