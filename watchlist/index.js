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

function titleCase(string) {
	var sentence = string.toLowerCase().split(" ");
	for (var i = 0; i < sentence.length; i++) {
		sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
	}
	return sentence;
}

async function searchMovie() {
	const input = titleCase(document.getElementById("search").value);
	const response = await fetch(`http://localhost:3000/movies?title=${input}`);
	const data = await response.json();
	const text = [];
	data.forEach((element) => {
		text.push(`
		<a href="../details/index.html?id=${element.id}" class="w-fit">
		<div class="flex flex-row gap-8"><img
		src="${element.image}"
		class="w-40 h-60 rounded-2xl blur-0"
	/>
	<span class="text-2xl">${element.title}</span></div></a>`);
	});
	const parent = `<div class="flex flex-col gap-8">
	<span class = "text-blue-700 ml-auto text-2xl w-fit" id="close-btn">X</span>
	${text.join("")}
	</div>`;
	const searchResult = document.getElementById("search-result");
	searchResult.innerHTML = parent;
	document.getElementById("close-btn").addEventListener("click", () => {
		const parent = document.getElementById("search-result");
		document.getElementById("search").value = "";
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	});
}

document
	.getElementById("search")
	.addEventListener("change", () => searchMovie());

if (sessionStorage.getItem("username") !== null) {
	getAllWatchList();
} else {
	window.location.href = "../login";
}
