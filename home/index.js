async function getCurrentWatch() {
	const response = await fetch("http://localhost:3000/currentWatch");
	const data = await response.json();
	const currentWatch = [];
	data.forEach((element) => {
		currentWatch.push(
			`<a href = "../details/index.html?id=${element.id}">
			<img src = ${element.image} class = "w-40 h-60 rounded-2xl"/>
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
			`<a href = "../details/index.html?id=${element.id}">
			<img src = ${element.image} class = "w-40 h-60 rounded-2xl"/>
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
			`<a href = "../details/index.html?id=${element.id}">
            <img src = ${element.image} class = "w-40 h-60 rounded-2xl" />
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
    <div>
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

if (sessionStorage.getItem("username") !== null) {
	renderElement();
} else {
	window.location.href = "../login";
}
