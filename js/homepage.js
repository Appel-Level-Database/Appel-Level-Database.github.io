(async () => {
	const auth = await window.getAuth();
	
	if (auth.error) return;
	
	document.getElementById("login-user").textContent = auth.username;
	
	window.logOut = async function() {
		await fetch("https://appelldb-server.cst1229.repl.co/logout?sessionId=" + auth.sessionId);
		location.reload();
	}
})();