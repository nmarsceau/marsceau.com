// Initialize the rubiksMixup function from WASM
// https://binx.io/2022/04/22/golang-webassembly/
const go = new Go()
WebAssembly.instantiateStreaming(fetch("/assets/scripts/rubiksMixup.wasm"), go.importObject).then((result) => { go.run(result.instance) })

function randomColorClass() {
	const colorClasses = ["green", "blue", "yellow"]
	return colorClasses[Math.floor(Math.random() * colorClasses.length)]
}

// Define the handler that will connect the WASM function to the UI
function rubiksMixup() {
	if (typeof wasmRubiksMixup !== "function") {
		console.error("Function wasmRubiksMixup does not exist.")
		return
	}

	const rubiksOutput = document.getElementById("rubiksOutput")
	const stepsInput = document.getElementById("steps")
	const steps = parseInt(stepsInput.value ?? 25)
	
	rubiksOutput.innerHTML = "" // Clear previous output

	for (const mixupInstruction of wasmRubiksMixup(steps)) {
		const element = document.createElement("span")
		element.innerText = mixupInstruction;
		element.classList.add(randomColorClass())
		rubiksOutput.append(element)
	}
}
