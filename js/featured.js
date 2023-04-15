(async () => {
	const levels = document.getElementById("featured");
	const status = document.getElementById("status");
	
	levels.style.display = "";
	
	status.textContent = "Loading...";
	status.className = "";
	
	let auth;
	try {
		auth = await window.getAuth();
	} catch(e) {}
	
	let req;
	try {
		req = await fetch("https://appelldb-server.cst1229.repl.co/levels");
	} catch (e) {
		status.textContent = `Error loading levels: ${e}
The servers might be down.`;
		status.className = "error";
		return;
	}
	
	if (!req.ok) {
		status.textContent = `Error loading levels: ${await req.text()}`;
		status.className = "error";
		return;
	}
	
	let resp = await req.json();
	
	resp = resp.filter(l => l.featured);
	resp = resp.reverse();
	
	for (const id in resp) {
		const level = resp[id];
		levels.appendChild(createFeaturedCard({
			...level,
			author: level.by.scratchUsername,
		}));
	}
	
	status.textContent = "";
	status.className = "";
})();