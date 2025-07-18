const cards = document.querySelectorAll(".card");
const totalPairs = cards.length / 2;  // Tính tự động số cặp

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      cardOne = clickedCard;
      return;
    }

    cardTwo = clickedCard;
    disableDeck = true;

    const cardOneImg = cardOne.querySelector(".back-view img").src;
    const cardTwoImg = cardTwo.querySelector(".back-view img").src;

    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched === totalPairs) {
      setTimeout(() => shuffleCard(), 1000);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    resetTurn();
    return;
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    resetTurn();
  }, 1200);
}

function resetTurn() {
  cardOne = cardTwo = "";
  disableDeck = false;
}

function shuffleCard() {
  matched = 0;
  resetTurn();

  // Tạo mảng hình ảnh: [1,1,2,2,...,N,N]
  const imageArray = [];
  for (let i = 1; i <= totalPairs; i++) {
    imageArray.push(i, i);
  }

  imageArray.sort(() => Math.random() - 0.5);

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    const imgTag = card.querySelector(".back-view img");
    imgTag.src = `img-${imageArray[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();
