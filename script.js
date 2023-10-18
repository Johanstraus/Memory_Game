const cards = document.querySelectorAll(".card");

let cardOne = null;
let cardTwo = null;

function flipCard(e) {
    let clickedCard = e.target;

    if (clickedCard !== cardOne) {
        clickedCard.classList.add("flip");

        if (cardOne) {
            cardTwo = clickedCard;

            let cardOneImg = cardOne.querySelector("img").getAttribute("src");
            let cardTwoImg = cardTwo.querySelector("img").getAttribute("src");

            matchCards(cardOneImg, cardTwoImg);
        } else {
            cardOne = clickedCard;
        }
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) { // If two cards' image sources match
        console.log("Card matched");
    } else {
        // Handle non-matching cards
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
