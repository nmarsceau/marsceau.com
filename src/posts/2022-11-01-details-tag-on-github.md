---
title: Details Tag on GitHub
description: This week I learned how to use the details tag on GitHub to hide screenshots or large snippets of code and make pull requests more readable.
date: 2022-11-01T22:30:00-05:00
tags:
    - this-week-i-learned
    - how-to
    - github
---
This week I learned that you can use the <code class="language-markup">&lt;details&gt;</code> tag when writing on GitHub to tuck screenshots or large snippets of code out of sight until you need them. Thank you to Wes for [mentioning that on Syntax episode 522](https://syntax.fm/show/522/use-the-platform)! 🙏

If you're not familiar with the [<code class="language-markup">&lt;details&gt;</code> tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details), it's essentially an accordion element that's built into HTML. This tag has excellent browser support, as it's [available everywhere except IE](https://caniuse.com/details).

Here's an example of this in use on GitHub:

<picture class="content-image">
    <source srcset="/assets/images/details-tag-github.avif" type="image/avif">
    <source srcset="/assets/images/details-tag-github.webp" type="image/webp">
    <img src="/assets/images/details-tag-github.jpg" alt="Screenshot of a GitHub comment containing two detail tags">
</picture>

And the code behind it:

<pre class="codeWrapper"><code class="language-markup">
Here are screenshots of this UI change:

&lt;details&gt;
&lt;summary&gt;Before:&lt;/summary&gt;

![image](https://user-images.githubusercontent.com/53009141/199368627-93243263-e63e-493f-b0b6-53083f42123f.png)

&lt;/details&gt;

&lt;details&gt;
&lt;summary&gt;After:&lt;/summary&gt;

![image](https://user-images.githubusercontent.com/53009141/199368577-4e266869-6011-46fc-a27d-c7504021dd96.png)

&lt;/details&gt;
</code></pre>

Note the blank lines before and after the images. Those seem to be necessary for images and code blocks to render correctly inside this tag.

I have already found this very useful. I think it really improves readability when supplemental information like screenshots, code snippets, or stack traces is hidden away until you need to reference it.

[You can use other tags on GitHub too](https://gist.github.com/seanh/13a93686bf4c2cb16e658b3cf96807f2)! There is a select list of tags they allow that can really come in handy to format and style different aspects of your writing.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-markup.min.js" integrity="sha512-ebGmE5FR6s8b4k/BC8DDNt0Q+Ap+tiUDxnnYC7uUBnx5XLf+ztbK+Oed+Ajai2rymIbpY8jIouHSCQpSav53uA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>