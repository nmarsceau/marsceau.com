---
title: Experimenting With the Drag And Drop API
description: This week I built an experiment to practice using the drag and drop web API.
date: 2025-01-24T11:00:00-05:00
tags:
    - js
    - drag-and-drop
    - experiment
---
I recently built something for work using the drag and drop API, and to help me remember what I learned, I wanted to build a little sample page that showcases the drag and drop API.
Help this little duck hop between each pond by dragging and dropping him. (Only available on devices with a physical mouse at this time.)

<style>
	.drag-and-drop {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(2, 1fr);
		aspect-ratio: 1/1;
		gap: 1em;

		& > div {
			background: #63b0cd;

			display: grid;
			align-items: center;
			justify-items: center;
		}

		& > div.darker {
			background: #3e92cc;
		}

		.pond1 {
			border-radius: 66% 55% 70% 60%;
			transform: rotate(-10deg);
			position: relative;
			top: -15px;
			left: -10px;
		}

		.pond2 {
			border-radius: 37% 60% 44% 51%;
			transform: rotate(30deg);
		}

		.pond3 {
			border-radius: 80% 55% 70% 65%;
			transform: rotate(15deg);
			position: relative;
			top: -20px;
			right: -10px;
		}

		.pond4 {
			border-radius: 70% 85% 88% 99%;
			transform: rotate(-20deg);
			position: relative;
			right: -15px;
		}

		.duck {
			width: 50%;
			cursor: grab;
		}

		.duck:active {
			cursor: grabbing;
		}

		.duck.hidden {
			visibility: hidden;
		}
	}
</style>
<div class="drag-and-drop experiment">		
	<div class="pond1">
		<img src="/assets/images/drag-and-drop/duck.png" alt="A hand-drawn duck. He is a handsome young man." class="duck" draggable="true">
	</div>
	<div class="pond2"></div>
	<div class="pond3"></div>
	<div class="pond4"></div>
</div>
{% js %}
{% include "assets/scripts/drag-and-drop-experiment.js" %}
{% endjs %}
