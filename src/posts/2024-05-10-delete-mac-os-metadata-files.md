---
title: A Quick Way to Delete Mac OS Metadata Files
description: This week, I learned how to quickly delete all the Mac OS metadata files in a directory.
date: 2024-05-10T11:00:00-05:00
tags:
    - this-week-i-learned
---
If you've ever migrated a directory of files from Mac OS to Windows, you may have noticed that there are a lot of extra files you didn't see before. <code class="code">.DS_STORE</code> is probably the most well-known of these hidden Mac OS metadata files. There are usually many more that match the name of another file in the directory prefixed with <code class="code">._ </code> or <code class="code">._.</code>.

I hate leaving these lying around, and in the past, my solution has been to manually go through each directory and delete them. However, I was doing this for a very deeply nested directory earlier this week, and I realized there must be a way to automate this. Instead of trying to write my own solution, I found [an incredible guide for recursively deleting Mac OS metadata files](https://awesometoast.com/delete-all-instances-of-ds_store-in-windows/) on awesometoast.com! Big thanks to Awesome Toast because this saved me hours of tedious work.
