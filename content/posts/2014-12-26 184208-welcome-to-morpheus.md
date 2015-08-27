---
type: post
author: Your Name
email: youreamail@yourwebsite.something
tags: general
slug: welcome-to-morpheus
permalink: /welcome-to-morpheus
title: Welcome to morpheus
---
You're live! Nice. We've put together a little post to introduce you to Morpheus and Markdown.
You can manage your content by creating posts and pages inside the `/content/` .folder

*Note: Feel free to play with this page.*

## Basic formatting

Paragraphs can be written like so. A paragraph is the basic block of Markdown. A paragraph is what text will turn into when there is no reason it should become anything else.

Paragraphs must be separated by a blank line. Basic formatting of *italics* and **bold** is supported. This *can be **nested** like* so.

## Lists

### Ordered list

1. Item 1
2. A second item
3. Number 3
4. Ⅳ

### Unordered list

* An item
* Another item
* Yet another item
* And there's more...

## Paragraph modifiers

### Code block

```javascript
var hello = 'hello Morpheus!';
console.log(hello);
```
You can also make `inline code` to add code into other things.

### Quote

> Here is a quote. What this is should be self explanatory. Quotes are automatically indented when they are used.

## Headings

There are six levels of headings. They correspond with the six levels of HTML headings. You've probably noticed them already in the page. Each level down uses one more hash character.

### Headings *can* also contain **formatting**

### They can even contain `inline code`

## URLs

URLs can be made in a handful of ways:

* Another named link to [Morpheus](https://github.com/vesparny/morpheus/)
* Sometimes you just want a URL like https://github.com/vesparny/morpheus/.

## Horizontal rule

A horizontal rule is a line that goes across the middle of the page.

---

It's sometimes handy for breaking things up.

## Images

Markdown can also contain images. You can organize images as you want inside the `/content/images/` folder
![Morpheus](/content/images/posts/home.png)

## HTML
You can write plain old HTML and it'll still work! Very flexible.

<input type="text" placeholder="I'm an input field!" />

Have fun :)
