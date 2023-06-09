async function getCurrentWatch() {
	const response = await fetch("http://localhost:3000/currentWatch");
	const data = await response.json();
	const currentWatch = [];
	data.forEach((element) => {
		currentWatch.push(
			`<a href = "../details/index.html?id=${
				element.id
			}" class="relative w-max">
			<img src = ${element.image} class = "w-40 h-60 rounded-2xl"/>
			<span class="bg-black text-white rounded-2xl absolute top-0 opacity-0 w-full h-full flex items-center justify-center text-center text-5xl font-extrabold hover:opacity-80">${
				element.rating * 10
			}%</span>
			</a>`
		);
	});
	return currentWatch;
}

async function getSuggested() {
	const response = await fetch("http://localhost:3000/isSuggested");
	const data = await response.json();
	const suggestedWatch = [];
	data.forEach((element) => {
		suggestedWatch.push(
			`<a href = "../details/index.html?id=${
				element.id
			}" class="relative w-max">
			<img src = ${element.image} class = "w-40 h-60 rounded-2xl"/>
			<span class="bg-black text-white rounded-2xl absolute top-0 opacity-0 w-full h-full flex items-center justify-center text-center text-5xl font-extrabold hover:opacity-80">${
				element.rating * 10
			}%</span>
			</a>`
		);
	});
	return suggestedWatch;
}

async function getPrevious() {
	const response = await fetch("http://localhost:3000/isPrevious");
	const data = await response.json();
	const previousWatch = [];
	data.forEach((element) => {
		previousWatch.push(
			`<a href = "../details/index.html?id=${
				element.id
			}" class="relative w-max">
            	<img src = ${element.image} class = "w-40 h-60 rounded-2xl" />
				<span class="bg-black text-white rounded-2xl absolute top-0 opacity-0 w-full h-full flex items-center justify-center text-center text-5xl font-extrabold hover:opacity-80">${
					element.rating * 10
				}%</span>
			</a>`
		);
	});
	return previousWatch;
}

async function renderElement() {
	const currentWatch = await getCurrentWatch();
	const suggestedWatch = await getSuggested();
	const previousWatch = await getPrevious();
	document.body.style.opacity = "1";
	const text = `
    <div class="w-fit">
        <span class="text-xl font-medium">Currently Watching</span>
        <div class="flex flex-row gap-4">
            ${currentWatch.join("")}
        </div>
    </div>
    <div>
        <span class="text-xl font-medium">Suggested To Watch</span>
        <div class="flex flex-row gap-4">
            ${suggestedWatch.join("")}
        </div>
    </div>
    <div>
        <span class="text-xl font-medium">Previously Watched</span>
        <div class="flex flex-row gap-4 flex-wrap lg:flex-nowrap xl:flex-nowrap">
            ${previousWatch.join("")}
        </div>  
    </div>
    
        `;
	document.getElementById("section-container").innerHTML += text;
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

document.getElementById("search-mini").addEventListener("click", () => {
	document.getElementById("search-mini").classList.add("hidden");
	document.getElementById("search-container").classList.remove("hidden");
	document.getElementById("search-container").classList.add("block");
});

if (sessionStorage.getItem("username") !== null) {
	renderElement();
} else {
	window.location.href = "../login";
}
