baseURL = 'http://deckofcardsapi.com/api/deck';

//1.
//Make a request to the Deck of Cards API to request a single card from a newly shuffled deck and console.log the value and suit.
async function getOneCard() {
	let resp = await axios.get(`${baseURL}/new/draw?count=1`);
	let card = resp.data.cards[0];
	console.log(`${card.value} of ${card.suit}`);
}

//2.
//Make a request to the deck of cards API to request a single card from a newly shuffled deck. Then, make a request to the same API to get one more card from the same deck.

async function getTwoCardsOneDeck() {
	let firstResp = await axios.get(`${baseURL}/new/draw?count=1`);
	let card1 = firstResp.data.cards[0];
	let deckID = firstResp.data.deck_id;
	let secondResp = await axios.get(`${baseURL}/${deckID}/draw?count=1`);
	let card2 = secondResp.data.cards[0];
	console.log(`First card: ${card1.value} of ${card1.suit}`);
	console.log(`Second card: ${card2.value} of ${card2.suit}`);
}

//3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card until there are no cards left in the deck.

let $gimmeBtn = $('#gimme');
let $cardContainer = $('#card-container');
let deckID;
let remaining;

//this function makes the image element for the card to be appended to the $cardContainer
function makeHTML(card) {
	return `<img src = ${card.image} style='position: absolute;'>`;
}

//this shuffles a new deck and draws the first card
async function initializeDeck() {
	let resp = await axios.get(`${baseURL}/new/draw?count=1`);
	//save the deckID from the JSON response to use later
	deckID = resp.data.deck_id;
	//update the number of cards remaining in the deck
	remaining = parseInt(resp.data.remaining);
	//get individual card data
	let card = resp.data.cards[0];
	console.log(`${card.value} of ${card.suit}`);
	//append card image to HTML page
	$cardContainer.append(makeHTML(card));
}

initializeDeck();

async function drawCard() {
	let resp = await axios.get(`${baseURL}/${deckID}/draw?count=1`);
	//update the number of cards remaining in the deck
	remaining = parseInt(resp.data.remaining);
	//if there are no more cards in the deck, remove the button
	if (remaining == 0) {
		$gimmeBtn.remove();
	}
	//get individual card data
	let card = resp.data.cards[0];
	console.log(`${card.value} of ${card.suit}`);
	//append card image to HTML page
	$cardContainer.append(makeHTML(card));
}

$gimmeBtn.on('click', drawCard);
