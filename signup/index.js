async function register() {
	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	console.log(await checkEmail(email));
	if ((await checkEmail(email)) === true) {
		const dataJSON = {
			username: username,
			email: email,
			password: password,
		};
		const url = "http://localhost:3000/users";
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataJSON),
		};
		await fetch(url, option);
		window.location.href = "../login";
	} else {
		alert("Email already registered");
	}
}

function confirmPassword() {
	const password = document.getElementById("password").value;
	const passwordConfirm = document.getElementById("password-confirm").value;
	const confirmText = document.getElementById("confirm-text");
	const i = document.createElement("i");
	if (passwordConfirm !== password) {
		confirmText.textContent = "Password didn't Match";
		confirmText.className = "text-red-800";
		i.className = "fa-solid fa-xmark fa-xl";
		confirmText.appendChild(i);
	} else {
		confirmText.textContent = "Password Match";
		confirmText.className = "text-green-800";
		i.className = "fa-solid fa-check fa-xl";
		confirmText.appendChild(i);
	}
}

async function checkEmail(email) {
	const response = await fetch("http://localhost:3000/users");
	const data = await response.json();
	const available = data.filter((element) => element.email === email);
	if (available.length === 1) {
		return false;
	} else {
		return true;
	}
}

document
	.getElementById("password-confirm")
	.addEventListener("input", () => confirmPassword());

document.getElementById("form").addEventListener("input", () => {
	const email = document.getElementById("email").value;
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const passwordConfirm = document.getElementById("password-confirm").value;
	if (
		email.length > 0 &&
		username.length > 0 &&
		password.length > 0 &&
		passwordConfirm == password
	) {
		document.getElementById("btn").removeAttribute("disabled");
	}
});

document.getElementById("form").addEventListener("submit", async (e) => {
	e.preventDefault();
	await register();
});
