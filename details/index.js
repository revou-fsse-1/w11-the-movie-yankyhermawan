const queryString = window.location.search;
const queryParams = new URLSearchParams(queryString.substring(1));
const id = queryParams.get("id");

async function getData() {
	const url = `http://localhost:3000/movies/${id}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

async function getDetails() {
	const data = await getData();
	const genreList = [];
	document.querySelector("#title").textContent = data.title;
	document.querySelector("#image").setAttribute("src", data.image);
	document.querySelector("#caption").textContent = data.synopsis;
	data.genre.forEach((element) => {
		genreList.push(`<span class="border-2 py-2 px-4 rounded-full border-black"
        >${element}</span
    >`);
	});
	document.querySelector("#genre").innerHTML = genreList.join("");
	document.querySelector("#rating").textContent = `${data.rating}/10`;
	document.querySelector("#trailer").setAttribute("src", data.trailer);
}

async function isBookmark() {
	try {
		const url = `http://localhost:3000/watchlist/`;
		const response = await fetch(url);
		const data = await response.json();
		const findId = data.find((obj) => obj.id === Number(id));
		const bookmark = document.getElementById("bookmark");
		const bookmarkSmall = document.getElementById("btn-bm-sm");
		if (!findId) {
			bookmark.className =
				"fa-sharp fa-regular fa-bookmark fa-xl before:mt-5 before:block";
			bookmarkSmall.className =
				"fa-sharp fa-regular fa-bookmark fa-xl before:mt-5 before:block";
			document.querySelector("#bookmark-text").textContent = "Add to Watchlist";
		} else {
			bookmark.className =
				"fa-sharp fa-regular fa-bookmark-slash hidden before:content-['\\e0c2']";
			bookmarkSmall.className =
				"fa-sharp fa-regular fa-bookmark-slash fa-xl before:mt-5 before:block before:content-['\\e0c2']";
			document.querySelector("#bookmark-text").textContent =
				"Remove From Watchlist";
		}
	} catch (error) {
		console.error(error);
	}
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

async function addBookmark() {
	const dataToAdd = await getData();
	const url = `http://localhost:3000/watchlist`;
	const option = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataToAdd),
	};
	const response = await fetch(url, option);
	await response.json();
}

async function removeBookmark() {
	const url = `http://localhost:3000/watchlist/${id}`;
	const option = {
		method: "DELETE",
	};
	const response = await fetch(url, option);
	await response.json();
}

function options() {
	const bookmarkText = document.getElementById("bookmark-text").textContent;
	if (bookmarkText.toLocaleLowerCase().includes("add")) {
		addBookmark();
	} else {
		removeBookmark();
	}
}

function titleCase(string) {
	var sentence = string.toLowerCase().split(" ");
	for (var i = 0; i < sentence.length; i++) {
		sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
	}
	return sentence;
}

if (sessionStorage.getItem("username") !== null) {
	getDetails();
	isBookmark();
} else {
	window.location.href = "../login";
}

document.getElementById("btn").addEventListener("click", () => options());
document.getElementById("btn-sm").addEventListener("click", () => options());

document
	.getElementById("search")
	.addEventListener("change", () => searchMovie());
