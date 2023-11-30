document.addEventListener("DOMContentLoaded", function () {
	let sidenav = document.querySelectorAll(".sidenav");
	M.Sidenav.init(sidenav, { edge: "right" });
	var modals = document.querySelectorAll(".modal");
	M.Modal.init(modals);
	var items = document.querySelectorAll(".collapsible");
	M.Collapsible.init(items);
});

const testData = [
	"I am a new prompt",
	"I am yet another prompt",
	"Lorem ipsum dolor prompt amet",
];

//grab html items
const promptText = document.querySelector("#generated-txt"); //p tag with generated text
const savedPromptContainer = document.querySelector("#saved-prompt-container"); //area where the saved prompts will go
const btnRefreshPrompt = document.querySelector("#btn-refresh-prompt"); //btn to add event listener to refresh prompt
const btnSavePrompt = document.querySelector("#btn-save-prompt"); //btn to add event listener to save prompt
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
	if (user) {
		loggedOutLinks.forEach((item) => {
			item.style.display = "none";
		});
		loggedInLinks.forEach((item) => {
			if (item.nodeName === "BUTTON") {
				item.style.display = "inline-block";
			} else {
				item.style.display = "block";
			}
		});
	} else {
		loggedOutLinks.forEach((item) => {
			if (item.nodeName === "BUTTON") {
				item.style.display = "inline-block";
			} else {
				item.style.display = "block";
			}
		});
		loggedInLinks.forEach((item) => {
			item.style.display = "none";
		});
	}
};

//setup UI
const setupPrompts = (data) => {
	savedPromptContainer.innerHTML = "";
	data.forEach((doc) => {
		const id = doc.id;
		const prompt = doc.data().prompt;
		const promptCard = `<div class="card-panel deep-purple accent-1">
		<i class="material-icons right white-text delete-btn" data-id="${id}" style="cursor:pointer;">delete_forever</i>
			<p class="white-text">${prompt}</p>
		</div>`;
		const div = document.createElement("div");
		div.innerHTML = promptCard;
		div.classList.add("col", "s12", "m6", "l4", "prompt-card");
		div.setAttribute("data-id", id);
		console.log(div);
		savedPromptContainer.prepend(div);
	});
};

//Update UI with generated prompt
const refreshPrompt = () => {
	//enforce no immediate repeats
	let oldprompt = promptText.textContent;
	//console.log(oldprompt);
	let prompt = testData[Math.floor(Math.random() * testData.length)];
	//test and reroll
	while (oldprompt === prompt) {
		prompt = testData[Math.floor(Math.random() * testData.length)];
		//console.log(prompt);
	}
	promptText.textContent = prompt;
};

const renderSavePrompt = (prompt, id) => {
	const promptCard = `<div class="card-panel deep-purple accent-1">
		<i class="material-icons right white-text delete-btn" data-id="${id}" style="cursor:pointer;">delete_forever</i>
			<p class="white-text">${prompt}</p>
		</div>`;
	const div = document.createElement("div");
	div.innerHTML = promptCard;
	div.classList.add("col", "s12", "m6", "l4", "prompt-card");
	div.setAttribute("data-id", id);
	console.log(div);
	savedPromptContainer.prepend(div);
};

//remove prompt from DOM
const removePrompt = (id) => {
	const prompt = document.querySelector(`.prompt-card[data-id='${id}']`);
	console.log(prompt);
	prompt.remove();
};

//add eventlisteners
btnRefreshPrompt.addEventListener("click", refreshPrompt);
