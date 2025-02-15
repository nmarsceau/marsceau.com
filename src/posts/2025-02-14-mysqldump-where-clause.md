---
title: mysqldump WHERE Clause
description: This week, I learned that mysqldump allows you to specify a WHERE clause.
date: 2025-02-14T11:00:00-05:00
tags:
    - this-week-i-learned
---
I've used mysqldump before, but only for taking backups of entire tables. I learned recently that mysqldump has a <code class="code">--where</code> option that can be used to filter the data being dumped. For example:

<pre class="codeWrapper"><code class="language-bash">
mysqldump mysql_prod orders --where="completed_at &lt; DATE_SUB(NOW(), INTERVAL 3 MONTH)" > order_archive.sql
</code></pre>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-bash.min.js" integrity="sha512-35RBtvuCKWANuRid6RXP2gYm4D5RMieVL/xbp6KiMXlIqgNrI7XRUh9HurE8lKHW4aRpC0TZU3ZfqG8qmQ35zA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
