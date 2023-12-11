let notification;

const refresh = () => {
	//check permissions
	if (Notification.permission === "granted") {
		//do notifs to update
		setInterval(() => {
			notification = new Notification("Inspired Yet?", {
				body: "Have you made anything? Or maybe it's time to re-roll your prompt...",
				icon: "../img/icons/book.svg",
				tag: "reroll",
			});
		}, 3600000);
	} else if (Notification.permission !== "denied") {
		//request perms
		Notification.requestPermission().then((perm) => {
			if (perm === "granted") {
				notification = new Notification("We'll Remind You", {
					body: "Every hour after you refresh a prompt, we'll check in to see what you've created!",
					icon: "../img/icons/book.svg",
					tag: "Welcome",
				});
			}
		});
		//refresh();
	}
};

//event listener
btnRefreshPrompt.addEventListener("click", refresh);
