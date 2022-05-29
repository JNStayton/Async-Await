let baseURL = 'http://numbersapi.com';
let favNum = 753;
let $numFacts = $('#num-facts');

//1.
//function to generate basic HTML markup for the number fact
function makeHTML(data) {
	console.log(data);
	return `<li><b>${data.number}</b>: ${data.text}</li>`;
}

//function to make the API request from the baseURL
async function getNumFact() {
	let resp = await axios.get(`${baseURL}/${favNum}/?json`);
	$numFacts.append(makeHTML(resp.data));
}

//2.
//function to generate basic HTML markup for multiple number facts
function makeLotsOfHTML(data) {
	console.log(data);
	html = '';
	for (let num in data) {
		html += `<li><b>${num}</b>: ${data[num]}</li>`;
	}
	return html;
}

let favNums = [ 3, 6, 9 ];
//Function that generates multiple requests for different numbers at once
async function getNumFacts() {
	let resp = await axios.get(`${baseURL}/${favNums}/?json`);
	$numFacts.append(makeLotsOfHTML(resp.data));
}

//3.
//Get multiple facts about the one favorite number
async function getMultipleFacts() {
	let facts = await Promise.all([
		axios.get(`${baseURL}/${favNum}?json`),
		axios.get(`${baseURL}/${favNum}?json`),
		axios.get(`${baseURL}/${favNum}?json`),
		axios.get(`${baseURL}/${favNum}?json`)
	]);
	for (let fact of facts) {
		$numFacts.append(makeHTML(fact.data));
	}
}
