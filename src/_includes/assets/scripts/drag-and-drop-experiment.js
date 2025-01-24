const container = document.querySelector(".drag-and-drop")
const duck = document.querySelector(".duck")
const dragImage = duck.cloneNode(true)
const ponds = container.querySelectorAll("div")

let currentPond = null

duck.addEventListener("dragstart", event => {
	currentPond = duck.parentElement
	duck.classList.add("hidden")
	event.dataTransfer.clearData()
	event.dataTransfer.setData("text/plain", "Movin the duck!")
	event.dataTransfer.effectAllowed = "move"
	event.dataTransfer.setDragImage(dragImage, 70, 60)
})

duck.addEventListener("dragend", () => {
	duck.classList.remove("hidden")
})

ponds.forEach(pond => {
	pond.addEventListener("dragenter", event => {
		event.preventDefault()
		pond.classList.add("darker")
	})
	pond.addEventListener("dragover", event => {
		event.preventDefault()
	})
	pond.addEventListener("dragleave", () => {
		pond.classList.remove("darker")
	})
	pond.addEventListener("drop", event => {
		event.preventDefault()
		event.target.appendChild(duck)
		pond.classList.remove("darker")
	})
})
