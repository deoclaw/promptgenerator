// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
	initializeFirestore,
	collection,
	getDocs,
	onSnapshot,
	addDoc, //needed to add to firebase
	doc, //needed for deleteDoc
	deleteDoc,
	persistentLocalCache, //import it to use with initializeFirestore
	persistentSingleTabManager, //import it to use with initializeFirestore}
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDXuQbpnHkmzRlXI-buIxzoyqsk1XocBZI",
	authDomain: "promptgenerator-20167.firebaseapp.com",
	projectId: "promptgenerator-20167",
	storageBucket: "promptgenerator-20167.appspot.com",
	messagingSenderId: "36806277886",
	appId: "1:36806277886:web:589cfcf109bb33102e43af",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig); // my app
//my database
const db = initializeFirestore(app, {
	localCache: persistentLocalCache({
		tabeManager: persistentSingleTabManager({}),
	}),
});

//getting prompts from our database (provided any are there)
async function getPrompts(db) {
	const promptsCol = collection(db, "prompts"); //the collection of prompts --> what if i used a collection of users to handle multiuser prompt collections?
	const promptSnapshot = await getDocs(promptsCol); //takea snapshot of the collection
	const promptList = promptSnapshot.docs.map((doc) => doc); //all documents in prompts collection
	return promptList;
}

//adding a prompt to our database when the user clicks save
const addPrompt = () => {
	const prompt = promptText.textContent;
	addDoc(collection(db, "prompts"), {
		prompt: prompt,
	}).catch((error) => console.log(error));
	renderSavePrompt(prompt);
};

btnSavePrompt.addEventListener("click", addPrompt);
