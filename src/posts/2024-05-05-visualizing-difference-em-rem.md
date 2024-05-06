---
title: Visualizing the Difference Between em and rem Units in CSS
description: Releasing an old visualizer I built for myself when I was learning the difference between em and rem units.
date: 2024-05-05T11:00:00-05:00
tags:
    - css
    - experiment
---
When I was first learning CSS, the first 2 sizing units I learned were <code class="code">px</code> and <code class="code">em</code>. Since <code class="code">em</code> units are relative, I have always preferred using them whenever it makes sense. However, it took me years to fully understand how they work. When styling web pages, I used to just fiddle with numbers until I got something to look close to how I wanted, and I just accepted that this was how it was supposed to be.

I remember learning about <code class="code">rem</code> units for the first time and being really confused about how they are different from <code class="code">em</code> units. The difference is, of course, that <code class="code">em</code> units are relative to the font size of their parent element, and <code class="code">rem</code> units are always relative to the root font size. Looking back, I think the way <code class="code">rem</code> works is how I started out thinking that em worked. I guess it took me learning about <code class="code">rem</code> to finally realize that I didn't understand <code class="code">em</code> units.

At the time, I put together the example below to help me visualize how these units are different, and it really helped!

<style>
	.visualizer {
		h2 {
			margin-block-start: 0;
			margin-inline-start: 30px;
			font-weight: bold;
		}

		p {
			margin-block-start: 0;
			margin-block-end: 0.75rem;
			line-height: 1.1;
		}

		.rem {
			margin-block-end: 2rem;
		}

		.rem, .em {
			div {
				border: 4px solid var(--sapphireBlue);
				padding: 1rem;
			}

			> div {
				border-radius: 30px;
			}
			
			> div > div {
				border-radius: 22px;
			}

			> div > div > div {
				border-radius: 14px;
			}
		}

		.font-size-14-px { font-size: 14px; }
		.font-size-2-em { font-size: 2em; }
		.font-size-2-rem { font-size: 2rem; }
	}
</style>
<div class="visualizer experiment">		
	<div class="rem">
		<h2>rem</h2>
		<div class="font-size-2-rem">
			<p>font-size: 2rem</p>
			<div class="font-size-2-rem">
				<p>font-size: 2rem</p>
				<div class="font-size-2-rem">
					<p>font-size: 2rem</p>
				</div>
			</div>
		</div>
	</div>
	<div class="em">
		<h2>em</h2>
		<div class="font-size-14px">
			<p>font-size: 14px</p>
			<div class="font-size-2-em">
				<p>font-size: 2em</p>
				<div class="font-size-2-em">
					<p>font-size: 2em</p>
				</div>
			</div>
		</div>
	</div>
</div>

I've had this buried in a folder on my laptop for years, and I figured this was a better home for it. I think little experiments like this are a great way to get started with something new.
