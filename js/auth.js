import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDXuQbpnHkmzRlXI-buIxzoyqsk1XocBZI",
	authDomain: "promptgenerator-20167.firebaseapp.com",
	projectId: "promptgenerator-20167",
	storageBucket: "promptgenerator-20167.appspot.com",
	messagingSenderId: "36806277886",
	appId: "1:36806277886:web:589cfcf109bb33102e43af",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
	e.preventDefault();
	//get user info
	const email = signupForm["signup-email"].value;
	const password = signupForm["signup-password"].value;

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			//signed in
			const user = userCredential.user;
			const modal = document.querySelector("#modal-signup");
			M.Modal.getInstance(modal).close();
			signupForm.reset();
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
	e.preventDefault();
	signOut(auth)
		.then(() => {
			console.log("Signed out");
		})
		.catch((error) => {
			console.log(error.message);
		});
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = loginForm["login-email"].value;
	const password = loginForm["login-password"].value;
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			//signed in
			const user = userCredential.user;
			console.log("Signed in!");
			const modal = document.querySelector("#modal-login");
			M.Modal.getInstance(modal).close();
			loginForm.reset();
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
});
