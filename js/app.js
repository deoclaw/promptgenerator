// does the browser support service workers - check

if ("serviceWorker" in navigator) {
	//defer installation until after pageload
	window.addEventListener("load", () => {
		//register service worker
		navigator.serviceWorker
			.register("/sw.js")
			.then((reg) => {
				//display success msg
				console.log(`Service Worker Registration (Scope: ${reg.scope})`);
			})
			.catch((error) => {
				//if cannot register, display error message to console
				console.log(`Service Worker Error: ${error}`);
			});
	});
} else {
	//if app is not served over TLS (HTTPS) or browser support is nonexistent
	console.log("Service Worker not available");
}
