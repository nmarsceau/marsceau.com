---
title: Remove PowerShell Version Number
description: I rediscovered how to hide the PowerShell version number that is printed at the beginning of every session.
date: 2023-10-09T11:00:00-05:00
tags:
    - for-future-reference
    - powershell
---
I was setting up PowerShell on a new computer a week or two ago, and I was reminded that by default, PowerShell prints out its version number every time you start a new session:

<picture class="content-image">
    <source srcset="/assets/images/remove-powershell-version-number/1-displaying-version-number.avif" type="image/avif">
    <source srcset="/assets/images/remove-powershell-version-number/1-displaying-version-number.webp" type="image/webp">
    <img src="/assets/images/remove-powershell-version-number/1-displaying-version-number.jpg" alt="A screenshot of a new PowerShell session with 'PowerShell 7.3.7' printed before the command prompt." loading="lazy">
</picture>

I turned that off a long time ago on my other computers, but since then I have completely forgotten how to make that change. I did not have much luck googling for the answer. It seemed like everything I searched just came back with results for how to get the PowerShell version number, not how to hide it on startup.

I finally figured it out, and in the hopes of saving myself some time the next time this issue comes up, I am documenting this solution for my own future reference. And I figured, why not toss it on the blog and make it public. 🤷🏻‍♂️

To prevent PowerShell from printing its version number every time a new session is started, you need to add the <code class="language-">-NoLogo</code> option to the command that launches PowerShell. That version number is apparently called a "Logo". (If I had known that to begin with, googling for this solution would have been a lot easier.)

If you use Windows Terminal, adding this option is very easy, and I am including the steps for making this change below. If you don't use Windows Terminal, you may need to make a custom shortcut to launch PowerShell that includes this option in the command.

In Windows Terminal:
1. Open Settings, and under **Profiles**, select your PowerShell profile. Mine is just called "PowerShell".

    <picture class="content-image">
        <source srcset="/assets/images/remove-powershell-version-number/2-settings-profiles-powershell.avif" type="image/avif">
        <source srcset="/assets/images/remove-powershell-version-number/2-settings-profiles-powershell.webp" type="image/webp">
        <img src="/assets/images/remove-powershell-version-number/2-settings-profiles-powershell.jpg" alt="A screenshot of the PowerShell settings window. In the left-hand menu, there is a section labeled 'Profiles', and the 'PowerShell' profile is highlighted." loading="lazy">
    </picture>

2. Expand the **Command line** section, and edit the command to add the <code class="language-">-NoLogo</code> option at the end. If any portion of your command is in quotes, add this option outside the quotes.

    <picture class="content-image">
        <source srcset="/assets/images/remove-powershell-version-number/3-add-nologo-option.avif" type="image/avif">
        <source srcset="/assets/images/remove-powershell-version-number/3-add-nologo-option.webp" type="image/webp">
        <img src="/assets/images/remove-powershell-version-number/3-add-nologo-option.jpg" alt="A screenshot of the settings for the 'PowerShell' profile with the 'Command line' section expanded. The text '-NoLogo' has been added to the command for launching PowerShell." loading="lazy">
    </picture>

3. Save your change and open a new PowerShell session to make sure the version number, or "Logo", is no longer printed on startup.

    <picture class="content-image">
        <source srcset="/assets/images/remove-powershell-version-number/4-no-version-number.avif" type="image/avif">
        <source srcset="/assets/images/remove-powershell-version-number/4-no-version-number.webp" type="image/webp">
        <img src="/assets/images/remove-powershell-version-number/4-no-version-number.jpg" alt="A screenshot of a new PowerShell session with nothing printed before the command prompt." loading="lazy">
    </picture>

Note: This may also suppress update notifications when PowerShell starts up if a new version is available. However, if your PowerShell is connected to Windows Update, that may not be an issue.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
