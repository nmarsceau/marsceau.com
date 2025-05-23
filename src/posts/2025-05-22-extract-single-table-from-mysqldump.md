---
title: Extract a Single Table From a mysqldump File
description: This week, I learned an easy way to extract the data for a single table from a mysqldump file.
date: 2025-05-22T11:00:00-05:00
tags:
    - this-week-i-learned
---
This week, I was in a situation where I had a full mysqldump of an entire database, but I needed to restore just one table from the file. I've had to do this before, and in the past I've tried to manually pull out the data I need using a text editor. The problem with that approach is that database dumps are often gigantic and are just too much to wrangle in a text editor.

This time, I came across <a href="https://stackoverflow.com/questions/1013852/can-i-restore-a-single-table-from-a-full-mysql-mysqldump-file">this Stack Overflow post explaining how to use <code class="code">sed</code> to do it</a>. I ended up using <a href="https://stackoverflow.com/a/15857815">this version that includes the <code class="code">DROP TABLE</code> statement.</a> And my SQL file was zipped, so I had to modify the command slightly:

<pre class="codeWrapper"><code class="language-bash">
zcat dump.sql.gz | sed -n -e '/DROP TABLE.*`TABLE_NAME`/,/UNLOCK TABLES/p' > singleTable.sql
</code></pre>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-bash.min.js" integrity="sha512-35RBtvuCKWANuRid6RXP2gYm4D5RMieVL/xbp6KiMXlIqgNrI7XRUh9HurE8lKHW4aRpC0TZU3ZfqG8qmQ35zA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
