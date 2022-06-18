(async () => {
	const status = document.getElementById("status");
	const usersEl = document.getElementById("users");
	
	status.textContent = "Loading...";
	status.className = "";
	
	let auth;
	try {
		auth = await window.getAuth();
	} catch (e) {
		status.textContent = "Error logging in, the servers are probably down or you are logged out.";
		status.className = "error";
		return;
	}
	
	if (auth.errror || (!auth.account.admin)) {
		status.textContent = "You must be logged in as an admin account to use the admin panel (duh)!";
		status.className = "error";
		return;
	}
	
	status.textContent = "";
	status.className = "";
	
	const usersReq = await fetch("https://appelldb-server.cst1229.repl.co/users");
	const users = await usersReq.json();
	
	for (const user of users) {
		addUserCard(user);
	}
	
	
	function addUserCard(user) {
		const card = crEl("div", {
			className: "card",
		});
		
		function addField(name, text) {
			card.appendChild(
				crEl("b", {
					textContent: name + ": ",
				})
			);
			if (text instanceof HTMLElement) {
				card.appendChild(text);
			} else {
				card.appendChild(
					document.createTextNode(text)
				);
			}
			card.appendChild(crEl("br", {}));
			
			return text;
		}
		function updateUserInfo(id, banned, admin, ultra) {
			fetch("https://appelldb-server.cst1229.repl.co/admin/users/" + id, {
				method: "POST",
				body: JSON.stringify({
					banned,
					admin,
					ultra,
					sessionId: auth.sessionId
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
		
		card.appendChild(crEl("h2", {
			textContent: user.scratchUsername,
		}))
		
		addField("ID", user.id) 
		
		const date = new Date(user.created);
		const dateString = date.toLocaleString();
		const dateHover = `Time is in your local timezone (UTC+${-(date.getTimezoneOffset()/60)}).
12-hour time: ${date.toLocaleString([], {hourCycle: "h12"})}
24-hour time: ${date.toLocaleString([], {hourCycle: "h24"})}
ISO: ${date.toISOString()}`;
		addField("Created", 
			crEl("span", {
				textContent: dateString,
				title: dateHover,
				className: "date",
			})
		);
		
		const cantEditUser = (user.ultra && !auth.account.ultra);
		
		
		const bannedCB = addField("Banned", 
			crEl("input", {
				type: "checkbox",
				disabled: cantEditUser,
				checked: user.banned,
			})
		);
		const adminCB = addField("Admin", 
			crEl("input", {
				type: "checkbox",
				disabled: cantEditUser,
				checked: user.admin,
			})
		);
		const ultraCB = addField("Ultra-admin", 
			crEl("input", {
				type: "checkbox",
				disabled: cantEditUser || !auth.account.ultra,
				checked: user.ultra,
			})
		);
		
		const change = () => updateUserInfo(
			user.id,
			bannedCB.checked,
			adminCB.checked,
			ultraCB.checked,
		);
		bannedCB.addEventListener("change", change);
		adminCB.addEventListener("change", change);
		ultraCB.addEventListener("change", change);
		
		usersEl.appendChild(card);
	}
	function crEl(el, args) {
		return Object.assign(document.createElement(el), args);
	}
})();