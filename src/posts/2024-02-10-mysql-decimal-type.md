---
title: MySQL's Decimal Type
description: This week, I learned about one option for avoiding floating point precision limitations in MySQL.
date: 2024-02-10T11:00:00-05:00
tags:
    - this-week-i-learned
    - mysql
---
Recently, I had to fix a web app that was demonstrating some unexpected behavior with monetary values. I traced the problem to a floating point precision issue in the database. There was an insert statement storing a value in a <code class="language-sql">float</code> column, but when I selected that value back from the database, it was different.

To demonstrate this issue, I created an example table in a local MySQL Docker container:

<pre class="codeWrapper"><code class="language-sql">
create table financial_ledger (
    id int not null auto_increment primary key,
    amount float(10, 2),
    description text
);
</code></pre>

Then, I inserted this value into the table:

<pre class="codeWrapper"><code class="language-sql">
insert into financial_ledger (amount, description) values (278992.57, '&lt;- this is a problematic value!');
</code></pre>

Finally, I selected the data from financial_ledger:

<pre class="codeWrapper"><code class="language-sql">
select * from financial_ledger;
</code></pre>

<pre class="codeWrapper"><code class="language-wiki">
+----+-----------+---------------------------------+
| id | amount    | description                     |
+----+-----------+---------------------------------+
|  1 | 278992.56 | &lt;- this is a problematic value! |
+----+-----------+---------------------------------+
</code></pre>

The amount is 278992.**56**, not 278992.**57**!

In this example, <code class="language-sql">amount</code> is a float field, and according to the [MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html), that is an "approximate value" numeric type. This type should only be used when having an approximate value is acceptable. I can't think of a situation where it makes sense to use this type for monetary values.

Instead, MySQL has a type called <code class="language-sql">decimal</code> that stores exact numeric values ([documentation here](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html)). I had always assumed decimal was just an alias for float, so I was really excited to learn that they are very different! If I redo the example using decimal, the correct value gets stored in the database:

<pre class="codeWrapper"><code class="language-sql">
drop table financial_ledger;
create table financial_ledger (
    id int not null auto_increment primary key,
    amount decimal(10, 2),
    description text
);
insert into financial_ledger (amount, description) values (278992.57, '&lt;- this is the right value!');
select * from financial_ledger;
</code></pre>

<pre class="codeWrapper"><code class="language-wiki">
+----+-----------+-----------------------------+
| id | amount    | description                 |
+----+-----------+-----------------------------+
|  1 | 278992.57 | &lt;- this is the right value! |
+----+-----------+-----------------------------+
</code></pre>

If I was building a new system dealing with monetary values, I would always opt for storing monetary values as integers. (For instance, $150.99 -> 15099) This has the added benefit of also helping avoid floating point issues after the value has been read from the database and is being handled in a programming language like PHP or JavaScript. However, in an existing system that has already mistakenly used the float type for monetary values, decimal is a lovely drop-in replacement that helps avoid bugs due to floating point precision limitations!

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-sql.min.js" integrity="sha512-fmx2W52F+6sZ8IYcsuKsFV0PjADeu32K3PdJGhxCKB+5VRVXpmuKgkfzTsW/B8cy/FPnEOlZX4fP/ZQk057tPQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-wiki.min.js" integrity="sha512-qE6cD2pOD5Hi3WIo1xqTEbH4MpAkuOlOnfD/xdzPJQSEMO4yGHZT1mpnqwiJECPD5XwqqPY/8/ydm3TVKA7XXQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>