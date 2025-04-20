const symbols = ['🍎', '🍌', '🍎', '🍌'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  const shuffled = shuffle(symbols);
  cards = [];

  shuffled.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  });

  document.getElementById('status').textContent = '';
  matchedPairs = 0;
  lock = false;
}

function flipCard(e) {
  const card = e.currentTarget;
  if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.textContent = card.dataset.symbol;
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lock = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedPairs++;

      if (matchedPairs === 2) {
        document.getElementById('status').textContent = '🎉 You Win!';
      }

      resetTurn();
    } else {
      setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lock = false;
}

createBoard();
