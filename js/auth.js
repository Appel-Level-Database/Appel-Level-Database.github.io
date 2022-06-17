(async () => {	
	const parseCookie = str =>
		str
		.split(';')
		.map(v => v.split('='))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
			return acc;
		}, {});
	
	const cookies = document.cookie ? parseCookie(document.cookie) : {};
	
	const authOnly = document.getElementsByClassName("auth-only");
	const noAuth = document.getElementsByClassName("no-auth");
	
	for (const e of noAuth) e.style.display = "";
	for (const e of authOnly) e.style.display = "none";
	
	const authPromise = new Promise(async (resolve, reject) => {
		if (!cookies.sessionid) {reject(); return;}
		
		const req = await fetch(
			"https://appelldb-server.cst1229.repl.co/session?sessionId="
			+ encodeURIComponent(cookies.sessionid)
		);
		const resp = await req.json();
		
		if (resp.error) {reject(); return;}
			
		resolve(resp);
		
		for (const e of noAuth) e.style.display = "none";
		for (const e of authOnly) e.style.display = "";
	});
	
	window.getAuth = () => authPromise;
})();