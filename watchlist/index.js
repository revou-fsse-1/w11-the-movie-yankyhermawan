async function getAllWatchList() {
	const response = await fetch("http://localhost:3000/watchlist");
	const data = await response.json();
	const watchList = [];
	data.forEach((element) => {
		watchList.push(`<img
            src="${element.image}"
            class="rounded-2xl w-40 h-60 lg:w-48 lg:h-72"
        />`);
	});
	document.querySelector("#section-container").innerHTML = watchList.join("");
}

getAllWatchList();
