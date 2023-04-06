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

if (sessionStorage.getItem("username") !== null) {
	getDetails();
	isBookmark();
} else {
	window.location.href = "../login";
}

document.getElementById("btn").addEventListener("click", () => options());
document.getElementById("btn-sm").addEventListener("click", () => options());
