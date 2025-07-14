---
title: Rubik's Cube Mixup
description: As an experiment with WASM and Go, I built a little tool that will randomly give me moves to mix up my rubik's cube, which I can then solve.
date: 2025-07-13T11:00:00-05:00
tags:
    - this-week-i-built
    - experiment
---
As an excuse to mess around with Go and WASM, I wrote a little program that will spit out a list of random moves to mix up a rubik's cube. The program that generates the random moves is written in Go and compiled to WASM, and then there's a little bit of JS that calls the WASM program and outputs the moves to the UI. Here is <a href="https://jperm.net/3x3/moves">an explanation of what rubik's cube moves mean</a>.

<div class="experiment">
	<div class="inputContainer">
		<label for="steps">How many moves?</label>
		<input type="number" id="steps" min="0" max="50" step="1" value="25">
		<button type="button" id="run" onclick="rubiksMixup()">Mix it up</button>
	</div>
	<div id="rubiksOutput">
	</div>
</div>

(Just so you know, the colors I used for the moves are just there for some visual spice. They're randomly assigned, and they don't mean anything.)

<link rel="stylesheet" href="/assets/styles/rubiksMixup.css">
<script src="/assets/scripts/wasm_exec.js"></script>
<script src="/assets/scripts/rubiksMixup.js"></script>
