
const container = document.getElementsByClassName("container")[0];
const cards = [];
let selectedCards = [];
let goal = 0;
let plants = [];
let plantsLength = 0;


async function getPlants() {
    const request = await fetch("https://agexandro.github.io/memorama/plants.json");
    plants = await request.json();
    plantsLength = plants.plants.length;

    if (plants != null) {
        createCards();
        createCards();
        main();
    }
}

function randomCards() {
    const tempCards = [];
    cards.forEach(card => (
        tempCards.push(cards[card])
    ));
}


function createCards() {

    for (let i = 0; i < plantsLength; i++) {
        const id = i;
        const card = document.createElement("div");
        card.className = "card";
        const cardInner = document.createElement("div");
        cardInner.className = "card-inner";
        const cardFront = document.createElement("div");
        cardFront.className = "card-front";
        const cardBack = document.createElement("div");
        cardBack.className = "card-back";
        const cardImg = document.createElement("img");
        cardImg.src = plants.plants[i].image;

        cardBack.appendChild(cardImg);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        cards.push({
            id,
            card,
            cardInner,
            cardBack,
            cardFront,
            cardImg,
            flip: function () {
                this.cardInner.classList.add("card-flip");
            },
            unFlip: function () {
                this.cardInner.classList.remove("card-flip");
            }
        });

    }

}


function main() {
    for (let i = 0; i < cards.length; i++) {

        cards[i].cardFront.onclick = () => {
            selectedCards.push(cards[i]);

            if (selectedCards.length <= 2) {
                cards[i].flip();

                if (selectedCards.length == 2) {
                    if (selectedCards[0].id == selectedCards[1].id) {
                        goal++;
                        selectedCards = [];

                    } else {
                        setTimeout(() => {
                            selectedCards[0].unFlip();
                            selectedCards[1].unFlip();
                            selectedCards = [];
                        }, 800);

                    }
                }
                if (goal == plantsLength) {
                    setTimeout(() => {
                        alert("has ganado");
                    }, 500);
                }
            }
        }

        container.appendChild(cards[i].card);
    }

}

getPlants();
