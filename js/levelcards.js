(function() {
	"use strict";

	function crEl(el, args) {
		return Object.assign(document.createElement(el), args);
	}

	const compatStrings = {
		vanilla: "Vanilla Appel-compatible",
		multiplayer: "Requires Appel Multiplayer",
		other: "Compatibility unknown",
	}

	function createLevelCard(d) {
		d = d || {};
		const info = {
			name: d.name || "Unnamed",
			thumbnail: d.thumbnail || "img/placeholder-thumb.png",
			author: d.author || "an unknown author",
			desc: d.desc || "No description provided.",
			compat: d.compat || "other",
			code: d.code || "",
			difficulty: d.difficulty || "Unknown",
			length: d.length || "Unknown",
			ondelete: d.ondelete,
			date: d.date || null,
		};
		
		const cardRoot = crEl("div", {className: "card level-card"});
		
		/*
		const thumbArea = crEl("div",
			{className: "level-area level-thumb-area"}
		);
		thumbArea.appendChild(
			crEl("img", {
				className: "level-thumb",
				src: info.thumbnail,
				alt: "",
			})
		);
		*/
		
		const leftArea = crEl("div",
			{className: "level-area level-left-area"}
		);
		leftArea.appendChild(
			crEl("h2", {
				className: "level-name",
				textContent: info.name,
			})
		);
		leftArea.appendChild(
			crEl("span", {
				className: "level-author",
				textContent: "uploaded by " + info.author,
			})
		);
		leftArea.appendChild(
			crEl("p", {
				className: "level-desc",
				textContent: info.desc,
			})
		);
		
		const rightArea = crEl("div",
			{className: "level-area level-right-area"}
		);
		const infoSubarea = rightArea.appendChild(crEl("div",
			{className: "level-subarea level-info-subarea"}
		));
		infoSubarea.appendChild(
			crEl("b", {
				textContent: "Difficulty: ",
			})
		);
		infoSubarea.appendChild(
			document.createTextNode(info.difficulty)
		);
		infoSubarea.appendChild(
			crEl("br", {})
		);
		infoSubarea.appendChild(
			crEl("b", {
				textContent: "Length: ",
			})
		);
		infoSubarea.appendChild(
			document.createTextNode(info.length)
		);
		if (info.date) {
			infoSubarea.appendChild(
				crEl("br", {})
			);
			infoSubarea.appendChild(
				crEl("b", {
					textContent: "Uploaded at: ",
				})
			);
			
			const date = new Date(info.date);
			const dateString = date.toLocaleString();
			const dateHover = `Time is in your local timezone (UTC+${-(date.getTimezoneOffset()/60)}).
12-hour time: ${date.toLocaleString([], {hourCycle: "h12"})}
24-hour time: ${date.toLocaleString([], {hourCycle: "h24"})}
ISO: ${date.toISOString()}`;
			
			infoSubarea.appendChild(
				crEl("span", {
					textContent: dateString,
					title: dateHover,
					className: "date",
				})
			);
		}
		
		const codeBtnSubarea = rightArea.appendChild(crEl("div",
			{className: "level-subarea level-code-button-subarea"}
		));
		codeBtnSubarea.appendChild(
			crEl("div", {
				className: "level-compatibility-notice" + (info.compat === "vanilla" || info.compat === "other" ? "" : " error"),
				textContent: compatStrings[info.compat] || info.compat,
			})
		);
		if (info.ondelete) {
			const deleteBtn = codeBtnSubarea.appendChild(
				crEl("button", {
					textContent: "Delete",
				})
			);
			deleteBtn.addEventListener("click", info.ondelete);
		}
		const copyCodeBtn = codeBtnSubarea.appendChild(
			crEl("button", {
				textContent: "Copy Code",
			})
		);
		copyCodeBtn.addEventListener("click", () => {
			navigator.clipboard.writeText(info.code);
		});
		
		// cardRoot.appendChild(thumbArea);
		cardRoot.appendChild(leftArea);
		cardRoot.appendChild(rightArea);
		
		return cardRoot;
	}

	window.createLevelCard = createLevelCard;
})();