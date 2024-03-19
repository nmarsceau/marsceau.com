---
title: Useful TAR Commands
description: This week, I learned how to search a tarball (.tar or .tar.gz) and pull certain files out of it without needing to extract the whole thing.
date: 2024-03-19T11:00:00-05:00
tags:
    - this-week-i-learned
    - tar
    - linux
---
A few weeks ago, I needed to pull a handful of files out of a very large tarball. Not knowing any other way to do that, I started fully extracting the archive. After 15 minutes, over 20,000 files had been extracted, and it was only about 10% done. I knew I was going to need to find a more efficient way to achieve what I wanted. After a few quick searches, I found several options for interacting with tarballs while they are still tarred or even zipped.

## List the Contents of a Tarball
<pre class="codeWrapper"><code class="language-bash">
tar tf archive.tar
</code></pre>

You can grep the output to search for a specific filename or all files with a certain extension.

<pre class="codeWrapper"><code class="language-bash">
tar tf archive.tar | grep -E '\.jpg$|\.webp$'
</code></pre>

## Search Within a Tarball
<pre class="codeWrapper"><code class="language-bash">
tar tf archive.tar | while read -r FILE;
do
    MATCHES=$(tar xf archive.tar "$FILE" -O | grep "the pattern to match")
    if test -n "$MATCHES"; then
        echo "$FILE:"$'\n'"$MATCHES"
    fi;
done
</code></pre>

If the contents of a file within the tarball matches the pattern you search for, this will print out its internal path within the tarball followed by the grep output. This is based on [the accepted answer for this Stack Overflow](https://stackoverflow.com/questions/2407111/performing-grep-operation-in-tar-files-without-extracting#2407231).

Given the length of this snippet, it might be a good candidate to set up as a custom function in your shell profile's initialization script.

## Extract a Single File From a Tarball
<pre class="codeWrapper"><code class="language-bash">
tar xf archive.tar internal/path
</code></pre>

The internal path specified must exactly match the full path to the file within the tarball (as seen in the output of <code class="language-bash">tar tf archive.tar</code>).

## Interact With Zipped Tarballs
To perform any of these operations on a gzipped tarball, just add the <code class="language-bash">z</code> flag.
<pre class="codeWrapper"><code class="language-bash">
tar tzf archive.tar.gz                  # List the contents
tar xzf archive.tar.gz internal/path    # Extract a single file
# etc.
</code></pre>

As far as I know, the <code class="language-bash">j</code> option will allow tar to operate on bzipped tarballs.

## Putting It All Together
One line to extract all the webp images from a gzipped tarball:

<pre class="codeWrapper"><code class="language-bash">
tar tzf archive.tar.gz | grep "\.webp" | xargs tar xzf archive.tar.gz
</code></pre>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-bash.min.js" integrity="sha512-35RBtvuCKWANuRid6RXP2gYm4D5RMieVL/xbp6KiMXlIqgNrI7XRUh9HurE8lKHW4aRpC0TZU3ZfqG8qmQ35zA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>