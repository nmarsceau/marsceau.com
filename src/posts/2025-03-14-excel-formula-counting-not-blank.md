---
title: Excel Formula For Counting Non-Blank Cells
description: This week, I learned a good Excel formula for counting cells in a range that are non-blank.
date: 2025-03-14T11:00:00-05:00
tags:
    - this-week-i-learned
---
I had a situation recently where I was trying to count the number of non-blank cells in a spreadsheet, but I was having trouble getting the count I wanted. Turns out, some of the cells had empty strings, and others had whitespace in them. I wanted those cells to be treated as blank, but the usual <code class="language-">COUNTA</code> and <code class="language-">COUNTIF</code> formulas both count them as non-blank.

After some searching, I found a formula that will treat those cells as blank and only count cells that have a real value:

<pre class="codeWrapper"><code class="language-bash">
=SUMPRODUCT(--(TRIM(A:A)&lt;&gt;""))
</code></pre>

Replace <code class="language-">A:A</code> with any range of cells as needed.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-bash.min.js" integrity="sha512-35RBtvuCKWANuRid6RXP2gYm4D5RMieVL/xbp6KiMXlIqgNrI7XRUh9HurE8lKHW4aRpC0TZU3ZfqG8qmQ35zA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
