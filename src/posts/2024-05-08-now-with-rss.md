---
title: This Blog Has RSS Now!
description: Discussing how easy it is to set up an RSS feed on an Eleventy site using the official RSS plugin.
date: 2024-05-08T11:00:00-05:00
tags:
    - housekeeping
    - rss
---
This blog has an [RSS feed](/blog/feed.xml) now! I've wanted to get one set up for a while, but I built it up to be a huge task in my head and I kept putting it off.

I use [Eleventy](https://www.11ty.dev/) for this site, and there's an official [RSS plugin](https://www.11ty.dev/docs/plugins/rss/). It's so easy to set up. All I had to do was copy/paste the command to <code class="code">npm install</code> the plugin, copy/paste the line to initialize the plugin in my <code class="code">.eleventy.js</code> file, and make minimal changes to the sample feed template provided in the documentation.

As always, Eleventy is just the best.

I did run into one "[gotcha](http://catb.org/jargon/html/G/gotcha.html)" when I was validating the RSS feed. When I opened the feed page in my browser, it applied some formatting that lets you expand and collapse sections, etc. I initially copy/pasted from that page into the [W3C Validation Service](https://validator.w3.org/feed/#validate_by_input), and it threw all sorts of errors. Eventually, I realized that the special browser formatting removes some of the XML attributes, specifically the namespace declaration. I had to "view source" on that browser-generated XML page and copy that code into the validator. Then it passed validation with just a couple minor warnings. 😎
