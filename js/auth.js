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
	
	const authPromise = new Promise(async (resolve, reject) => {
		if (!cookies.sessionid) {reject(); return;}
		
		let req, resp;
		try {
			req = await fetch(
				"https://appelldb-server.cst1229.repl.co/session?sessionId="
				+ encodeURIComponent(cookies.sessionid)
			);
			resp = await req.json();
		} catch(e) {reject(); return;}
		
		if (resp.error) {reject(); return;}
		
		document.documentElement.classList.add("auth-authed");
		if (resp.account && resp.account.admin) {
			document.documentElement.classList.add("auth-admin");
		}
		resolve(resp);
	});
	
	document.documentElement.classList.add("js");
	
	window.getAuth = () => authPromise;
})();