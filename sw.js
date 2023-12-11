// Questions to ask:
// - what kind of app are you considering
// - what are its main features (e.g. display blog posts? maintain shoping cart? etc?)
// - what data does app get from server (product type, prices, etc)
// - what should user be able to do when offline?
// - how does your current non-PWA app display data? (get from database and generate html on server?)

// Adding Cachable Items to array of assets
// must include / to include our root folder
const assets = [
	"/",
	"/index.html",
	"/pages/fallback.html",
	"/js/app.js",
	"/js/ui.js",
	"/js/dl.js",
	"/js/materialize.min.js",
	"/css/app.css",
	"/css/materialize.min.css",
	"/img/icons/book.svg",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
];

const dynamicCache = "Dynamic-cache-v1.1";
const staticCache = "Static-cache-v1.1";

//once we have installed and registered it in app.js all this will run

//cache size limit -- we want to limit our DYNAMIC cache so it doesn't get bloated
const limitCacheSize = (cacheName, size) => {
	//when our cache reaches size it will delete items in it
	caches.open(cacheName).then((cache) => {
		//opening takes a promise?
		cache.keys().then((keys) => {
			//takes a promise
			if (keys.length > size) {
				cache.delete(keys[0]).then(limitCacheSize(cacheName, size)); //recursively calls itself
			}
		});
	});
};

// we will use our cache to store things! caches return promises...key = request : value = response

self.addEventListener("install", function (event) {
	//fires when browser installs the app
	//here we are logging the event and the contents
	//purpose of event is to give SW place to set up local environment
	console.log(`SW: Event fired: ${event.type}`);
	//use event.waitUntil() so that this will wait until it is installed?
	event.waitUntil(
		caches.open(staticCache).then(function (cache) {
			console.log("SW: precaching app shell");
			cache.addAll(assets);
		})
	);
});

self.addEventListener("activate", function (event) {
	//SW only triggers active event when user reloads page->refresh or reopen
	//fires after SW completes installation
	//place for SW to clean up from previous SW versions
	//we want to clear out any older caches if we make more ones
	// we are only looking to see if we have our staticCache bc our dynamic one will be made when we grab things on network not in our cache
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== staticCache && key !== dynamicCache) //checks for both static and dynamic so we don't lose dynamic cache
					.map((key) => caches.delete(key))
			); //takes an iterable of promises --> our cached keys which are asynchronous promises? eahc key returns a promise. then we are filtering and mapping
		})
	);
});

self.addEventListener("fetch", function (event) {
	//fires when app requests resource
	// console.log(`SW: Fetching ${event.request.url}`);
	//next go get requested rsrc from network
	//this instructs browser to get whatever we ask for -- browser was doing leftthis anyway
	//The below: If a request doesn't match anything in the static(?) cache, get it from the network, send it to the page, and add it to the cache (dynamic) at the same time.
	//11/24/23 update - we don't want to populate this with the firestore requests --> need to wrap this in an if condition
	if (event.request.url.indexOf("firestore.googleapis.com") === -1) {
		event.respondWith(
			caches
				.match(event.request)
				.then((response) => {
					return (
						response ||
						fetch(event.request).then((fetchRes) => {
							return caches.open(dynamicCache).then((cache) => {
								cache.put(event.request.url, fetchRes.clone()); //we can only read/return a response ONCE so we're cloning the fetchRes? idk why i'm writing this
								limitCacheSize(dynamicCache, 15); //15 is a good size
								return fetchRes;
								// we use put method for dynamic caches-->put the request and response pair and then we can do fxns
								// we request the URL of the request of the event
							});
						})
					);
					//either it'll return response or return a call to request our dynamic cache
				})
				.catch(() => caches.match("/pages/fallback.html")) //if there's not internet, this catch will catch the error we'd get
		);
	}
	//going to use the CACHES again --> caches is the whole cache
	//match lets us see if what we're asking for -- the request (key) -- exists in our cache already
});
