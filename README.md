# Morpheus
### The next generation web publishing platform
<p align="center">
<img src="https://cloud.githubusercontent.com/assets/82070/5554757/28bfa2a8-8c73-11e4-9433-bb814bd2bf11.png"/>
</p>
[![Build Status](https://secure.travis-ci.org/vesparny/morpheus.svg)](http://travis-ci.org/vesparny/morpheus) [![Dev dependencies status](https://david-dm.org/vesparny/morpheus/dev-status.svg?style=flat)](https://david-dm.org/vesparny/morpheus#info=devDependencies "Dependency status") [![dependencies status](https://david-dm.org/vesparny/morpheus/status.svg?style=flat)](https://david-dm.org/vesparny/morpheus#info=dependencies "Dependency status")

**The idea is to create a new isomorphic web publishing platform, with the speed of a single page application, but server side rendered on the first load.**

**Built with [React](http://facebook.github.io/react/) and [express](http://expressjs.com/)**

### Working demo

You can see **Morpheus** running on my own [website](http://alessandro.arnodo.net).

### Articles

* [Introducing Morpheus](http://alessandro.arnodo.net/introducing-morpheus)

### What and Why

At the time being, developers are building entire applications in the browser using JavaScript. The big part of the logic is living on the client and it talks to the server to an API.
  
Once the application is fully loaded, the user can gain a good experience navigating between pages without the need of fully reloading each time.
  
This is good, what happens when your website is run by a crawler (google bot or whatever)? If the website can only be executed on the client it won't be able to serve HTML to crawlers, and this will have negative impacts on SEO.
  
This is why Morpheus is totally rendered on the server on the first load. Once done, React will attach events to the DOM, and the user will feel the benefits of a single page application, without having to wait for tedious spinners before seeing the content.

### Tech Features

* Built with express, React and Browserify
* Blazing fast
* Static markdown rendering
* Disqus support out of the box
* Server-side rendered
* Crawlable by default
* No dababase needed
* Do you need more? Just [ask](https://github.com/vesparny/morpheus/issues).
  
### Getting started

* Choose a name for you website, for this example we will call it `my-website`. Replace it with your name in the following commands.
* Create a directory for your blog and create a new git repo

```
mkdir my-website && cd my-website
git init
```

* Checkout the `Morpheus` repository

```
git remote add morpheus -m master https://github.com/vesparny/morpheus.git
git pull -s recursive -X theirs morpheus master
```

* Install the dependencies, create the example post and run the application

```
npm install
gulp install
gulp watch
```

* Create a new post or page inside the `content` directory, then commit changes


* Access your fresh-new website at [http://localhost:3000](http://localhost:3000)

If you have an existing repository

* Add the Morpheus remote to your local repository, then merge its master branch with your local branch.


```
git remote add morpheus https://github.com/vesparny/morpheus.git
git fetch morpheus
git checkout master
git merge morpheus/master
```

   
### In production

* build the app for production, commit your production ready build, and run it.

```
gulp build --env=production
git add -A
git commit -m "ready"
NODE_ENV=production node server.js
```

### Configuration

You can also override configuration in the proper environment-specific configuration file inside the `config` folder.
Below the production config file I use for hosting my website on OpenShift PaaS.

```javascript
'use strict';

var path = require('path');

module.exports = {
  log: {
    level: 'error',
    file: path.resolve(process.env.OPENSHIFT_DATA_DIR || '', 'log.log'),
  },
  debug: false,
  siteUrl: 'https://alessandro.arnodo.net',
  useSSL: true,
  port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
  ip: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  disqusComments: 'arnodo',
  siteTitle: 'Alessandro Arnodo',
  siteDescription: '- Just another code monkey -',
};
```

### Contributing

PR and issues reporting are always welcome :)

### License

See LICENSE file

### Changelog

See CHANGELOG.md file

### Stability

Morpheus is currently in **experimental** stage.
