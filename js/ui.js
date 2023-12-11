document.addEventListener("DOMContentLoaded", function () {
	let sidenav = document.querySelectorAll(".sidenav");
	M.Sidenav.init(sidenav, { edge: "right" });
	var modals = document.querySelectorAll(".modal");
	M.Modal.init(modals);
	var items = document.querySelectorAll(".collapsible");
	M.Collapsible.init(items);
	refreshPrompt(); //takes out the ... on initial load
});

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

//setup UI-->load saved prompts
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
	console.log(typeof promptData);
	//enforce no immediate repeats
	let oldprompt = promptText.textContent;
	//console.log(oldprompt);
	let prompt = promptData[Math.floor(Math.random() * promptData.length)];
	//test and reroll
	while (oldprompt === prompt) {
		prompt = promptData[Math.floor(Math.random() * promptData.length)];
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

//get prompt json
// async function getPromptTopics(p) {
// 	let response = await fetch("js/prompts.json");
// 	let obj = await response.json();
// 	let topicList = obj.topics;
// 	p = topicList;
// }

//add eventlisteners
btnRefreshPrompt.addEventListener("click", refreshPrompt);

//since the json isn't fetching right
promptData = [
	"your favorite tree or flower",
	"geomagnetic storms",
	"your favorite season",
	"embarrassing memories",
	"family dynamics",
	"death",
	"illness",
	"ancient mysteries",
	"declassified documents",
	"spontaneous combustion",
	"a random wikipedia article",
	"lies you told",
	"overheard conversations",
	"the worst apartment you ever lived in",
	"a traumatic experience",
	"lies others have told",
	"the perfect society",
	"beauty",
	"ugliness",
	"a cryptid that truly creeps you out",
	"your search history",
	"a website you remember but can never find",
	"a catch-22",
	"fractals",
	"found objects",
	"how others see you",
	"privacy",
	"your favorite poem",
	"your favorite quote",
	"your least favorite quote",
	"an uncommon body part you find sexy or fascinating",
	"imaginary friends",
	"deep sea creatures",
	"two friends, two enemies",
	"a long rivalry, a lost love",
	"being lost at sea",
	"divine revelations",
	"alien artifacts",
	"alien communication received from outer space",
	"fairy tales",
	"greek mythology",
	"trickster tales",
	"conspiracy theories",
	"cults",
	"prejudice",
	"the best/worst dad jokes",
	"something you wish more people knew about",
	"something you have special expertise in",
	"something you know nothing about",
	"things you find in your kitchen",
	"your experiences in public transportation",
	"things you noticed the last time you went out on a walk",
	"the last time you cried",
	"one of the seven deadly sins",
	"minor demons",
	"an unusual phobia",
	"the first sex scene you ever saw",
	"the last thing you ate",
	"an article of clothing you are currently wearing",
	"what you want but cannot have",
	"an impossible desire",
	"a childhood pet",
	"the last thing that made you cry",
	"the feeling of anger in your body",
	"your desires that scare you",
	"strange divination methods",
	"squatting",
	"tea",
	"coffee",
	"media that awakened your sexuality",
	"pottery",
	"umbrellas",
	"personal hygiene",
	"your art insecurities",
	"the concept of friendship",
	"your personal superstitions",
	"socks",
	"knitting and nail polish",
	"snacks",
	"breakfast",
	"cooking",
	"your favorite food",
	"foods you grew up eating",
	"your friends' favorite foods",
	"foods you dislike",
	"the best meal you ever had",
	"recipes",
	"foods you would like to eat someday",
	"comfort foods",
	"the local food specialties where you live",
	"foods you are suspicious of",
	"bland foods",
	"spicy foods",
	"pretentious meal presentations",
	"edible plants native to your region",
	"the hobbies you had as a child",
	"something inherited from your parents",
	"acts of blasphemy",
	"the levels of hell in dante's inferno",
	"your favorite sins",
	"shoplifting",
	"dumpster diving",
	"scout badges",
	"your favorite songs",
	"moldy foods growing in the back of your fridge",
	"plants you've killed",
	"plants you own",
	"movies you watched on repeat as a child",
	"cleaning products",
	"every day objects you cant bring yourself to throw away",
	"uncommon vegetables",
	"skills taught to you as a child",
	"pet toys",
	"things you have stolen (or wish you had)",
	"hairstyles",
	"food packaging",
	"fish",
	"mirrors",
	"microwavable foods",
	"transgender figures of history",
	"in-jokes of nuclear physicists",
	"things that smell bad",
	"your favorite smells",
	"the most secondhand-embarrassing thing you ever witnessed",
	"instruments you wish you could play",
	"songs you lack the range for",
	"lies you believed when you were a child",
	"folklore of a region you are not familiar with",
	"bad outfits",
	"places your pet sleeps",
	"a weird childhood talent",
	"an abandoned project",
	"animals that would make awesome pets",
	"haircuts you've had",
	"angels",
	"history's greatest losers",
	"bad cats",
	"baby animals",
	"the worst book you've ever read",
	"local cryptids",
	"extremely specific life experiences",
	"genres of milk",
	"near extinct animals or plants",
	"paint deterioration",
	"coding languages",
	"shoemaking in Eastern Europe",
	"speculative playground games",
	"cat thoughts",
	"things that happen(ed) at 3 AM",
	"books/shows/etc you remember the plot but not the title of",
	"alternatives to zodiac signs",
	"beverage/emotion parings",
	"anime music videos",
	"lost jewelry",
	"fast food induced night terrors",
	"martian interlopers",
	"divorcees",
	"old people medicine",
	"xenoproctology",
	"illegal insects",
	"famous jailbreaks",
	"fictional illnesses",
	"impractical firearms modifications",
	"brand new numbers",
	"family recipes",
	"secret messages to your crush",
	"local history",
	"the concept of good and evil",
	"things stolen from you",
	"human nature",
	"chronic illness",
	"screenshots in your camera roll",
	"the last jpegs you saved",
	"doppelgängers",
	"your doppelgänger",
	"unnecessarily gendered things",
	"your failures",
	"your successes",
	"the future",
	"an unlikely dystopia",
	"a likely dystopia",
	"a road trip",
	"the end of the world",
	"cyberspace",
	"canned fruit",
	"bodily fluids",
	"saliva",
	"a historical event from your birth year",
	"your life 10 years ago",
	"analog computers",
	"automatons",
	"things bugs eat",
	"your destiny",
	"cannibalism",
	"emotions no one has heard of",
	"thrift store treasures",
	"imaginary plants and/or animals",
	"your neighborhood",
	"surface tension",
	"disturbing insect/animal behaviors",
	"remarkably shaped fruits or vegetables",
	"your relationship with your body",
	"the closest object behind you",
	"software from your childhood",
	"types of needles",
	"the last dream you remember",
	"a number that's meaningful to you",
	"an abandoned project",
	"things you can buy for a dollar",
	"the most obscure topic you are knowledgeable about",
	"clandestine activities",
	"embarrassing ways to die",
	"the inner lives of bacteria",
	"tattoo origin stories",
	"conversations you have had in your head",
	"a part of your body that is in pain",
	"something you have mixed feelings about",
	"local urban legends",
	"childhood nightmares",
	"your favorite -ism",
	"the last thing you made",
	"drugs of the future",
	"histories greatest accidents",
	"your earliest memory",
	"incorrect assumptions people make about you",
	"the coolest thing you got for free",
	"an embarrassing family recipe ",
	"a secret you keep from your family",
	"the 1st sentence on the 12th page of the nearest book",
	"your darkest secret",
	"personality quirks that you admire",
	"a remarkable conceptual artist or work",
	"unusual things you could pickle",
	"an unreasonable request",
	"a forgetton historical event from your lifetime",
	"madness",
	"something misunderstood",
	"other people's dreams",
	"anagrams",
	"riddles",
	"loss",
	"wild versions of common things",
	"pottery",
	"home improvement ",
	"criminal schemes",
	"old advertisements ",
	"the food chain",
	"desert inhabitants",
	"your least favorite aesthetic ",
	"dangerous incantations",
	"ridiculous rules",
	"campfire stories",
	"impossible pizza toppings ",
	"boring parties",
	"something that confuses you",
	"mannequins ",
	"a clinic for objects ",
	"object permanence ",
	"bathroom graffiti ",
	"mysterious pies",
	"something you are embarrassed about",
	"something you are proud of",
	"unrequited love",
	"a modest contest",
	"patronizing awards",
	"the theater",
	"imposter syndrome",
	"fake expertise ",
	"ship wrecks",
	"absurd fashion advice",
	"government cheese reserves",
	"a secret society",
	"a local business with shady dealings",
	"roadside attractions",
	"a local legend",
	"a local landmark",
	"somewhere you have always wanted to go",
	"your most recent dream",
	"a childhood lie that you believed into adulthood",
	"birth",
	"ideas about the afterlife",
	"last meals",
	"last words",
	"a silly world record",
	"negative space",
	"sexual health",
	"a medieval beast",
	"original cryptids",
	"creepy crawlies",
	"things that melt",
	"nontraditional building materials",
	"the way horses move",
	"songs from your teen years",
	"cold war propaganda",
	"your favorite date activities",
	"body parts",
	"parasites",
	"mosquito breeds",
	"extinct lifeforms",
	"space phenomena",
	"deep sea mysteries",
	"unsolved mysteries",
	"lost media",
	"types of jam",
	"broken machinery",
	"obsolete technology",
	"ancient inventions",
	"alternate realities",
	"lesser known gods and demons",
	"new circles of hell",
	"rotting fruit",
	"failed revolutions",
	"flower arrangements",
	"the contents of your bag",
	"cave exploration",
	"your dream home",
	"embarrassing moments",
	"simple pleasures",
	"ridiculous fantasies",
	"inventors killed by their own inventions",
	"an industrial disaster",
	"a riot in history",
	"people who disappeared",
	"sexually active popes",
	"micronations",
	"famous replicas",
	"unsolved math problems",
	"a type of humanoid",
	"something overly expensive",
	"your favorite recipes",
	"unanswered prayers",
	"a memory palace",
	"drag names",
	"vitamins",
	"made up words",
	"precious stones",
	"lost items",
	"mundane passions",
	"heist plans",
	"mating dances",
	"family history",
	"ancient cultures",
	"ancient graffiti",
	"something that grosses you out",
	"something only nostalgic to you",
];
