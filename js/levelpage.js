(async () => {
	const levels = document.getElementById("levels");
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
	
	const resp = await req.json();
	
	for (const id in resp) {
		const level = resp[id];
		levels.appendChild(createLevelCard({
			...level,
			author: level.by.scratchUsername,
			ondelete: (
				auth && (
					level.by.id === auth.userId ||
					auth.account.admin
				)
			) ? () => {deleteLevel(id)} : null,
			onfeature: (
				auth && auth.account.admin
			) ? () => {featureLevel(id)} : null,
		}));
	}
	
	async function deleteLevel(id) {
		if (!confirm("Are you sure you want to delete this level? This cannot be undone."))
			return;
		await fetch(
			`https://appelldb-server.cst1229.repl.co/levels/${id}/?sessionId=${auth.sessionId}`,
			{
				method: "DELETE"
			}
		);
		location.reload();
	}
	
	async function featureLevel(id) {
		await fetch(
			`https://appelldb-server.cst1229.repl.co/levels/${id}/?sessionId=${auth.sessionId}`,
			{
				method: "PATCH",
				body: JSON.stringify({featured: !resp[id].featured}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		resp[id].featured = !resp[id].featured;
	}
	
	status.textContent = "";
	status.className = "";
})();