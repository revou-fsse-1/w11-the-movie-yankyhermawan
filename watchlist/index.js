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

async function searchMovie() {
	const input = document.getElementById("search").value;
	const response = await fetch(`http://localhost:3000/movies`);
	const rawData = await response.json();
	const multipleData = rawData.filter((element) =>
		element.title.toLowerCase().includes(input.toLowerCase())
	);
	const data = multipleData.filter(
		(obj, index, self) =>
			index === self.findIndex((t) => t.id === obj.id && t.title === obj.title)
	);
	const text = [];
	data.forEach((element) => {
		text.push(`
		<a href="../details/index.html?id=${element.id}" class="w-fit ml-4">
			<div class="flex flex-row gap-8">
				<img src="${element.image}" class="w-40 h-60 rounded-2xl blur-0"/>
				<span class="text-3xl text-white">${element.title}</span>
			</div>
		</a>`);
	});
	const parent = `<div class="flex flex-col gap-8">
	<span class = "text-blue-700 ml-auto text-2xl w-fit mr-4" id="close-btn">X</span>
	${text.join("")}
	</div>`;
	const searchResult = document.getElementById("search-result");
	searchResult.innerHTML = parent;
	document.getElementById("search-result").classList.remove("hidden");
	document.getElementById("search-result").classList.add("flex");
	document.getElementById("close-btn").addEventListener("click", () => {
		const parent = document.getElementById("search-result");
		parent.classList.remove("flex");
		parent.classList.add("hidden");
		document.getElementById("search").value = "";
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	});
}
document
	.getElementById("search")
	.addEventListener("input", () => searchMovie());

if (sessionStorage.getItem("username") !== null) {
	getAllWatchList();
} else {
	window.location.href = "../login";
}
