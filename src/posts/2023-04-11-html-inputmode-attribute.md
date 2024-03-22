---
title: HTML inputmode Attribute
description: This week I learned about the inputmode HTML attribute, which provides hints to devices with onscreen keyboards about which kind of keyboard to display.
date: 2023-04-11T11:00:00-05:00
tags:
    - this-week-i-learned
    - html
---
I've been writing HTML for almost 15 years at this point, and I'm still discovering language features I've never used before that have almost full browser support and Just Work&trade;. This week, I learned about the <code class="language-markup">inputmode</code> attribute. It hints to devices with onscreen keyboards that they should use a different keyboard mode for an input.

I always knew that mobile devices would display a number keyboard for <code class="language-markup">&lt;input type="number"&gt;</code>, and I vaguely knew that there was a way to specify different keyboard types for text inputs, but I had never seen this attribute before. There are values for phone numbers, email addresses, URLs, and more. This attribute does not affect the input's validation at all, it just tells the device that it would be useful to use a specialized keyboard layout when the user is typing in this input.

The [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) covers all the different options, and this [article on CSS Tricks](https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/) goes into more depth on how the main mobile browsers handle each of the input modes. It also includes a demo of each of them at the end.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-markup.min.js" integrity="sha512-ebGmE5FR6s8b4k/BC8DDNt0Q+Ap+tiUDxnnYC7uUBnx5XLf+ztbK+Oed+Ajai2rymIbpY8jIouHSCQpSav53uA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
