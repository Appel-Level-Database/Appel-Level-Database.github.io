(async () => {
	const navbar = document.createElement("div");
	navbar.id = "navbar";
	navbar.innerHTML = `
<a class="title-link" href="index.html"><h1>Appel Level Database</h1></a>

<span class="navbar-pad"></span>

<a class="home-btn" href="index.html"><button>Home</button></a>
<a href="levels.html"><button>Levels</button></a>
<span class="auth-only">
	<a href="create.html"><button>Submit a Level</button></a>
</span>
<a class="admin-only" href="admin.html"><button>Admin</button></a>

<div class="navbar-right">
	<span class="auth-only">
		<b id="login-user"></b>
		<button onclick="logOut()">Log Out</button>
	</span>
	<span class="no-auth">
		<a href="https://auth.itinerary.eu.org/auth/?redirect=QXBwZWwtTGV2ZWwtRGF0YWJhc2UuZ2l0aHViLmlvL2F1dGguaHRtbA==&name=Appel Level Database"><button>Log in</button></a>
	</span>
</div>
`;
	
	document.head.after(navbar);
	
	let auth;
	
	try {
		auth = await window.getAuth();
	} catch(e) {return};
	
	if (auth.error) return;
	document.getElementById("login-user").textContent = auth.username;
	
	window.logOut = async function() {
		await fetch("https://appelldb-server.cst1229.repl.co/logout?sessionId=" + auth.sessionId);
		location.reload();
	}
})();