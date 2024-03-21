---
title: Progressively Enhancing a Netlify Form
description: TODO
date: 2024-03-21T11:00:00-05:00
tags:
    - this-week-i-built
    - progressive-enhancement
---
I currently host most of my websites on Netlify, and I have a pain point with the way they handle form submissions. After submitting a form and landing on the "success" page (either their default one or a custom one), refreshing that page will re-submit the form, creating a duplicate entry on the back-end. This is an age-old problem, and is solved very easily using the [post-redirect-get workflow](https://en.wikipedia.org/wiki/Post/Redirect/Get). However, Netlify does not implement post-redirect-get, and based on the discussion in [this support article](https://answers.netlify.com/t/receiving-multiple-entries-for-a-single-form/25581/29?page=2), they do not intend to.

I have a client who has complained about receiving too many duplicate form submissions, and I think it's an issue worth solving. Since I don't control Netlify's backend, I'll have to find a front-end solution.

The ideal solution is to submit the form with JavaScript using an XHR or fetch request. That way, refreshing the page has no effect on form submissions. However, then the form will only work when JavaScript is available, and [there are many reasons why JavaScript might not be available](https://www.kryogenix.org/code/browser/everyonehasjs.html). This is why I really prefer using the browser's built-in form submission system instead of relying on JavaScript.

Fortunately, it is *really* easy to progressively enhance forms to get the best of both worlds. All you need to do is set the form up like a normal form, and it will work that way when JavaScript is disabled. Then, when JavaScript is enabled, you can intercept the submit event and send the data yourself.

<pre class="codeWrapper"><code class="language-javascript">
document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault()
	fetch(event.target.action, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(new FormData(event.target)).toString()
	})
		.then(() => {
			// handle success
		})
		.catch(() => {
			// handle errors
		})
})
</code></pre>

Netlify's form setup documentation has an [example of how to set this up](https://docs.netlify.com/forms/setup/#submit-javascript-rendered-forms-with-ajax). If your form has a file input, [follow this example instead](https://docs.netlify.com/forms/setup/#submit-file-uploads-with-ajax).

I love when progressive enhancement is this simple!

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-javascript.min.js" integrity="sha512-yvw5BDA/GQu8umskpIOBhX2pDLrdOiriaK4kVxtD28QEGLV5rscmCfDjkrx52tIgzLgwzs1FsALV6eYDpGnEkQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
