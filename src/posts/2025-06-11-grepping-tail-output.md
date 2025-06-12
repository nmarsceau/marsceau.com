---
title: Grepping Tail Output
description: This week, I wrote a short bash alias for easily grepping tail output.
date: 2025-06-11T11:00:00-05:00
tags:
    - this-week-i-built
---
When <code class="code">tail</code>ing a log file in a Linux environment, there's usually more output than I can keep up with. Sometimes, it's helpful to pipe that output to <code class="code">grep</code> and only see lines that match a certain word or pattern. For this to work properly though, you have to pass the <code class="code">--line-buffered</code> option to grep, and I don't want to have to remember to do that. Here's a short bash alias for combining <code class="code">tail</code> + <code class="code">grep</code>:

<pre class="codeWrapper"><code class="language-bash">
function tailgrep {
	tail -f "$1" | grep --line-buffered "$2"
}
</code></pre>

Example usage:
<pre class="codeWrapper"><code class="language-bash">
tailgrep /var/log/microservice.log "total request time:"
</code></pre>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-bash.min.js" integrity="sha512-35RBtvuCKWANuRid6RXP2gYm4D5RMieVL/xbp6KiMXlIqgNrI7XRUh9HurE8lKHW4aRpC0TZU3ZfqG8qmQ35zA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
