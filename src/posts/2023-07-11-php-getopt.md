---
title: PHP getopt Function
description: This week I learned about the getopt function in PHP. It is used to parse the arguments passed to a PHP script when run from the command line.
date: 2023-07-11T11:00:00-05:00
tags:
    - this-week-i-learned
    - php
---
A few months ago, I read an article in <em><a href="https://www.phparch.com/magazine/">PHP Architect</a></em> called "The Role of PHP in Ubiquitous Computing" by Jack Polifka. He made the case that PHP is incredibly useful as a language for writing APIs, even if you don't use it for its templating abilities.

What other types of software could PHP be useful for besides traditional websites or APIs? One of the first categories of software that comes to mind is command line applications. PHP is a scripting language, and as such is very well suited for a CLI (command-line interface) environment. However, that got me thinking, how difficult would it be to parse command line arguments in a raw PHP script without any frameworks or libraries?

Parsing command line arguments is very different across scripting languages. In Bash, for example, my experience has been that an unfortunate amount of boilerplate code is required to parse arguments. In PowerShell on the other hand, all you have to do is define the parameters and add a few annotations, and PowerShell does everything else including certain validations.

My research led me to PHP's built-in function for parsing script arguments called <code class="language-php">getopt</code>. It is more full-featured than I expected to find, and it takes care of the vast majority of the heavy lifting! I won't get into the weeds about exactly how this function works, <a href="https://www.php.net/manual/en/function.getopt.php">you can read the documentation for that</a>. Instead, let's jump right into some examples.

## Example 1 - Short Flags
<pre class="codeWrapper"><code class="language-php">
// Command:
// ps -ef

// getopt to parse such arguments:
$arguments = getopt('ef');

// $arguments:
[
    'e' => false,
    'f' => false
]
</code></pre>

> Gotcha: When set, a flag argument will have a value of false in the argument array. When not set, the flag argument will be absent from the array.

## Example 2 - Long Flags
<pre class="codeWrapper"><code class="language-php">
// Command:
// docker container ls --all

// getopt to parse such arguments:
$arguments = getopt('', ['all']);

// $arguments:
[
    'all' => false
]
</code></pre>

## Example 3 - Short Parameter With Value
<pre class="codeWrapper"><code class="language-php">
// Command:
// tail -n50

// getopt to parse such arguments:
$arguments = getopt('n:');

// $arguments:
[
    'n' => '50'
]
</code></pre>

## Example 4 - Long Parameter With Value
<pre class="codeWrapper"><code class="language-php">
// Command:
// {% raw %}docker image ls --format "table {{.Repository}}:{{.Tag}}\t{{.ID}}\t{{.CreatedSince}}"{% endraw %}

// getopt to parse such arguments:
$arguments = getopt('', ['format:']);

// $arguments:
[
    {% raw %}'format' => 'table {{.Repository}}:{{.Tag}}\t{{.ID}}\t{{.CreatedSince}}'{% endraw %}
]
</code></pre>

## Example 5 - Multiple Parameter Values
<pre class="codeWrapper"><code class="language-php">
// Command:
// git commit -m "Refactor getCustomer query" -m "This commit improves performance for the getCustomer query by refactoring it to hit the customerCategory index."

// getopt to parse such arguments:
$arguments = getopt('m:');

// $arguments:
[
    'm' => [
        'Refactor getCustomer query',
        'This commit improves performance for the getCustomer query by refactoring it to hit the customerCategory index.'
    ]
]
</code></pre>

> This is something else I learned recently. You can pass multiple commit messages to git, and it will add them all to your commit. The first one is meant to be a short summary of what the commit does. In any following messages, you can add as much detail about the commit as you would like.

## Example 6 - Optional Value, Specified
<pre class="codeWrapper"><code class="language-php">
// Command:
// git --exec-path="/usr/local/bin/git" status

// getopt to parse such arguments:
$arguments = getopt('', ['exec-path::']);

// $arguments:
[
    'exec-path' => '/usr/local/bin/git'
]
</code></pre>

> Gotcha: Arguments with optional values require the <code class="language-bash">--param="value"</code> syntax. If you pass the parameter using the <code class="language-bash">--param value</code> syntax, <code class="language-php">getopt</code> will think that no value was passed and treat everything from <code class="language-bash">value</code> to the end of the command as positional arguments.

## Example 7 - Optional Value, Not Specified
<pre class="codeWrapper"><code class="language-php">
// Command:
// git --exec-path

// getopt to parse such arguments:
$arguments = getopt('', ['exec-path::']);

// $arguments:
[
    'exec-path' => false
]
</code></pre>

## Example 8 - Positional Arguments
<pre class="codeWrapper"><code class="language-php">
// Command:
// rm -rf ./node_modules ./vendor ./dist

// getopt to parse such arguments:
$restIndex = null;
$arguments = getopt('rf', [], $restIndex);
$positionalArguments = array_slice($argv, $restIndex);

// $arguments:
[
    'r' => false,
    'f' => false
]

// $positionalArguments:
[
    './node_modules',
    './vendor',
    './dist'
]
</code></pre>

> <code class="language-php">$argv</code> is a [predefined PHP variable](https://www.php.net/manual/en/reserved.variables.argv.php) similar to <code class="language-php">$_SERVER</code>, <code class="language-php">$_REQUEST</code>, or <code class="language-php">$_GET</code>.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-php.min.js" integrity="sha512-6UGCfZS8v5U+CkSBhDy+0cA3hHrcEIlIy2++BAjetYt+pnKGWGzcn+Pynk41SIiyV2Oj0IBOLqWCKS3Oa+v/Aw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-bash.min.js" integrity="sha512-35RBtvuCKWANuRid6RXP2gYm4D5RMieVL/xbp6KiMXlIqgNrI7XRUh9HurE8lKHW4aRpC0TZU3ZfqG8qmQ35zA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
