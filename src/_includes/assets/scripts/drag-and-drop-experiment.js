const container = document.querySelector(".drag-and-drop")
const duck = document.querySelector(".duck")
const dragImage = duck.cloneNode(true)
const ponds = container.querySelectorAll("div")

let currentPond = null

duck.addEventListener("dragstart", event => {
	const parentElement = duck.parentElement
	if (parentElement !== null) {
		currentPond = duck.parentElement
		duck.classList.add("hidden")
	}
	event.dataTransfer.clearData()
	event.dataTransfer.setData("text/plain", "Movin the duck!")
	event.dataTransfer.effectAllowed = "move"
	event.dataTransfer.setDragImage(dragImage, 70, 60)
})

duck.addEventListener("dragend", event => {
	if (event.dataTransfer.dropEffect !== "none") {
		duck.classList.remove("hidden")
	}
})

ponds.forEach(pond => {
	pond.addEventListener("dragenter", event => {
		event.preventDefault()
	})
	pond.addEventListener("dragover", event => {
		event.preventDefault()
	})
	pond.addEventListener("drop", event => {
		event.preventDefault()
		event.target.appendChild(duck)
	})
})
