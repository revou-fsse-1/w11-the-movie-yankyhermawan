async function getAllWatchList() {
	const response = await fetch("http://localhost:3000/watchlist");
	const rawData = await response.json();
	const data = rawData.sort((a, b) => a.id - b.id);
	const watchList = [];
	data.forEach((element) => {
		watchList.push(`
		<a href = "../details/index.html?id=${element.id}">
		<img src="${element.image}" class="rounded-2xl w-40 h-60 lg:w-48 lg:h-72"/>
		</a>
		`);
	});
	document.querySelector("#section-container").innerHTML = watchList.join("");
}

if (sessionStorage.getItem("username") !== null) {
	getAllWatchList();
} else {
	window.location.href = "../login";
}
