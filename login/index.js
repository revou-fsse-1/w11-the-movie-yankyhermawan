async function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const userResponse = await fetch("http://localhost:3000/users");
	const userData = await userResponse.json();
	const result = userData.filter(
		(element) => element.email === email && element.password === password
	);
	return result;
}

document.getElementById("btn").addEventListener("click", async () => {
	const result = await login();
	if (result.length === 1) {
		sessionStorage.setItem("username", result[0].username);
		window.location.href = "../home";
	} else {
		const warning = document.getElementById("warning");
		warning.textContent = "Invalid Username or Password";
		warning.classList.remove("hidden");
		warning.classList.add("block");
	}
});
