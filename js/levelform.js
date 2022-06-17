(() => {
	const levelForm = document.getElementById("submit-level");
	const submitStatus = document.getElementById("submission-status");
	levelForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		
		submitStatus.textContent = "Submitting...";
		submitStatus.className = "";
		
		const values = {};
		for (const e of levelForm.elements) {
			if (e.name) values[e.name] = e.value;
		}
		
		const auth = await window.getAuth();
		
		values.sessionId = auth ? auth.sessionId : undefined;
		
		let req;
		
		try {
			req = await fetch("https://appelldb-server.cst1229.repl.co/levels", {
				method: "POST",
				body: JSON.stringify(values),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (e) {
			submitStatus.textContent = `Error submitting level: ${e}
The servers might be down.`;
			submitStatus.className = "error";
			return;
		}
		
		if (!req.ok) {
			submitStatus.textContent = await req.text();
			submitStatus.className = "error";
			return;
		}
		submitStatus.textContent = "Level uploaded";
		submitStatus.className = "success";
		
	});
})();