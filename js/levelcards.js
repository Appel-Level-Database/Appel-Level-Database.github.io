
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
		};
		
		const cardRoot = crEl("div", {className: "level-card"});
		
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
		
		const leftArea = crEl("div",
			{className: "level-area level-left-area"}
		);
		leftArea.appendChild(
			crEl("h1", {
				className: "level-name",
				textContent: info.name,
			})
		);
		leftArea.appendChild(
			crEl("span", {
				className: "level-author",
				textContent: "by " + info.author,
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
		
		const codeBtnSubarea = rightArea.appendChild(crEl("div",
			{className: "level-subarea level-code-button-subarea"}
		));
		codeBtnSubarea.appendChild(
			crEl("div", {
				className: "level-compatibility-notice" + (info.compat === "vanilla" || info.compat === "other" ? "" : " warn"),
				textContent: compatStrings[info.compat] || info.compat,
			})
		);
		const copyCodeBtn = codeBtnSubarea.appendChild(
			crEl("button", {
				textContent: "Copy code",
			})
		);
		
		cardRoot.appendChild(thumbArea);
		cardRoot.appendChild(leftArea);
		cardRoot.appendChild(rightArea);
		
		return cardRoot;
	}

	window.createLevelCard = createLevelCard;
})();