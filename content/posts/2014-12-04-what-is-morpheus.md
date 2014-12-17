---
type: post
author: Alessandro Arnodo
email: alessandro@arnodo.net
slug: what-is-morpheus
permalink: /what-is-morpheus
title: What is morpheus?
---

The world have plenty of cms, blogging platform and web publishing platform, so why another one?

**because [morpheus](https://github.com/vesparny/morpheus) is the first [isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) open-source web publishing platform, and it's  built with [react](http://facebook.github.io/react/) and [flux](http://facebook.github.io/flux/) (thanks to the great [fluxible-app](https://github.com/yahoo/fluxible-app/)) by yahoo.**

##### please note that this idea is just at the beginning, is not ready for production, and the roadmap/ list of features has to be defined

Chekout the source code [here](https://github.com/vesparny/morpheus)

### Reasons behind morpheus

At the time being, developers are building entire applications in the browser using JavaScript.
The big part of the logic is living on the client and it talks to the server to an API.

Once the application is fully loaded, the user can gain a good experience navigating between pages without the need of fully reloading each time.

**this is good, BUT**

what happens when your website is run by a crawler (google bot or whatever)?
If the website can run only on the client it won't be able to serve HTML to crawlers, and this will have negative impacts on **SEO**

This is why [morpheus](https://github.com/vesparny/morpheus) is totally rendered on the server on the first load. Once done, React will attach events to the DOM, and the user will feel the benefits of a single page application, without having to see tedious spinners before seeing the content.

**THATS GREAT**

What happens if you disable JavaScript on your browser?

Let's try, and this website will still work.

### Features

* markdown rendering (files are stored on filesystem)
* code syntax highlighting
* static pages
* no database needed (so far)
* template centric (find the default template inside `content/themes/blablabla`)
* code is shared between server and client
* easy configurable and easy to deploy

```javascript
//the openshift configuration for running morpheus on openshift
var path = require('path');

module.exports = {
  log: {
    level: 'info',
    file: path.resolve(process.env.OPENSHIFT_DATA_DIR, 'log.log'),
  },
  siteUrl: 'https://morpheusdemo-arnodo.rhcloud.com',
  port: process.env.OPENSHIFT_NODEJS_PORT,
  ip: process.env.OPENSHIFT_NODEJS_IP
};

```


### Roadmap

This has to be defined, I'm looking for ideas and contributions, feel free to contact me or use the project [issue tracker](https://github.com/vesparny/morpheus/issues) on GitHub.

Stay tuned.

[@vesparny](http://twitter.com/vesparny/)
