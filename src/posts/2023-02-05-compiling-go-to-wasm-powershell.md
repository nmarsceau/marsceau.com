---
title: Compiling Go to Web Assembly in PowerShell
description: This week I learned the syntax for declaring environment variables in PowerShell, which was helpful in compiling Go to Web Assembly.
date: 2023-02-05T11:00:00-05:00
tags:
    - this-week-i-learned
    - go
    - web-assembly
    - powershell
---
I've been learning Go lately, and I wanted to experiment with web assembly as well. I whipped up an example that will pass a user-specified message to a WASM function, which will return a JSON object containing the value it received.

<picture class="content-image">
    <source srcset="/assets/images/compile-go-wasm-1.avif" type="image/avif">
    <source srcset="/assets/images/compile-go-wasm-1.webp" type="image/webp">
    <img src="/assets/images/compile-go-wasm-1.jpg" alt="Screenshot of my sample web assembly web page. I entered the value 'Hello World'.">
</picture>

<picture class="content-image">
    <source srcset="/assets/images/compile-go-wasm-2.avif" type="image/avif">
    <source srcset="/assets/images/compile-go-wasm-2.webp" type="image/webp">
    <img src="/assets/images/compile-go-wasm-2.jpg" alt="Another screenshot of my sample web assembly web page. I clicked the button, and the browser alerted the JSON object it received from the web assembly function.">
</picture>

The command for compiling Go to web assembly without any tools like TinyGo is this:

<pre class="codeWrapper"><code class="language-bash">
GOOS=js GOARCH=wasm go build -o "./path/to/output/file.wasm" "./path/to/source/file.go"
</code></pre>

That syntax works for Bash (and probably other Linux-based shells like Zsh, etc.), but I currently use PowerShell as my primary shell. I learned from <a href="https://stackoverflow.com/questions/1420719/powershell-setting-an-environment-variable-for-a-single-command-only">this StackOverflow thread</a> what the correct syntax for setting environment variables in PowerShell is:

<pre class="codeWrapper"><code class="language-powershell">
$env:GOOS = 'js'; $env:GOARCH = 'wasm'; go build -o "./path/to/output/file.wasm" "./path/to/source/file.go"
</code></pre>

For convenience, I wrote a PowerShell function to encapsulate that command:

<script src="https://gist.github.com/nmarsceau/8643d9dbafbf8f30b74e5adcd3c7d665.js"></script>

This function sets the environment variables and compiles the code in a child process or "subshell" so the variables don't overwrite any that may already be set in the current shell. <a href="https://lazyadmin.nl/powershell/powershell-profile/">Place this function in your PowerShell profile</a> to use it.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-bash.min.js" integrity="sha512-35RBtvuCKWANuRid6RXP2gYm4D5RMieVL/xbp6KiMXlIqgNrI7XRUh9HurE8lKHW4aRpC0TZU3ZfqG8qmQ35zA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-powershell.min.js" integrity="sha512-dnJS1fxEUNZirzvtoG39P8JWa8DajX420LajzUbn+taV6hd9BfnHHgpPAWNADYjNRPT1Gt4v4/XGMULqi0uqVQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>