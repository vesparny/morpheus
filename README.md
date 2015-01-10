# Morpheus
### The next generation web publishing platform
<p align="center">
<img src="https://cloud.githubusercontent.com/assets/82070/5554757/28bfa2a8-8c73-11e4-9433-bb814bd2bf11.png"/>
</p>
[![Build Status](https://secure.travis-ci.org/vesparny/morpheus.svg)](http://travis-ci.org/vesparny/morpheus) [![Dev dependencies status](https://david-dm.org/vesparny/morpheus/dev-status.svg?style=flat)](https://david-dm.org/vesparny/morpheus#info=devDependencies "Dependency status") [![dependencies status](https://david-dm.org/vesparny/morpheus/status.svg?style=flat)](https://david-dm.org/vesparny/morpheus#info=dependencies "Dependency status")

**The idea is to create a new isomorphic web publishing platform, with the speed of a single page application, but server side rendered on the first load.**

**Built with [React](http://facebook.github.io/react/), [express](http://expressjs.com/) and [browserify](http://browserify.org/).**

### Working demo

You can see **Morpheus** running on my own [website](http://alessandro.arnodo.net).

### Articles

* [Introducing Morpheus](http://alessandro.arnodo.net/2015/01/07/introducing-morpheus)

### What and Why

At the time being, developers are building entire applications in the browser using JavaScript. The big part of the logic is living on the client and it talks to the server to an API.

Once the application is fully loaded, the user can gain a good experience navigating between pages without the need of fully reloading each time.

This is good, what happens when your website is run by a crawler (google bot or whatever)? If the website can only be executed on the client it won't be able to serve HTML to crawlers, and this will have negative impacts on SEO.

This is why Morpheus is totally rendered on the server on the first load. Once done, React will attach events to the DOM, and the user will feel the benefits of a single page application, without having to wait for tedious spinners before seeing the content.


### Getting started

Morpheus doesn't need a database, it just renders static markdown files.

* Choose a name for you website, for this example we will call it `my-website`. Replace it with your name in the following commands.
* Create a directory for your blog and create a new git repo

```shell
mkdir my-website && cd my-website
git init
```

* Checkout the `Morpheus` repository

```shell
git remote add morpheus -m master https://github.com/vesparny/morpheus.git
git pull -s recursive -X theirs morpheus master
```

* Install the dependencies, create the example post and run the application

```shell
npm install
gulp install #this is important, it will create an example post.
gulp watch
```

* Access your fresh-new website at [http://localhost:3000](http://localhost:3000)

* Create a new post or page inside the `content/posts` or `content/pages` folder, then commit changes.
Please note that the filename structure must follow the convention `yyyy-mm-dd HHmmss-post-tile.md`
Any page or post that contains a YAML front matter block will be processed by Morpheus as a special file. The front matter must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines. Take a look at the example post and page for more details.

If you have an existing repository

* Add the Morpheus remote to your local repository, then merge its master branch with your local branch.


```shell
git remote add morpheus https://github.com/vesparny/morpheus.git
git fetch morpheus
git checkout master
git merge morpheus/master
```

### What’s done

- [x] The basic technology stack (React express and browserify)
- [x] Post and pages displaying, markdown render, posts pagination.
- [x] Server side rendering.
- [x] Comments managed with [Disqus](https://disqus.com/).
- [x] Configurable permalinks.
- [x] fully working default theme (it's called **blablabla**)
- [x] RSS support


### What’s next

Below is a list of the things to work on immediately, with links to the relevant discussion.

- [ ] Logo design ([#3](https://github.com/vesparny/morpheus/issues/3))
- [ ] Sitemap generation ([#5](https://github.com/vesparny/morpheus/issues/5))
- [ ] Authors page ([#6](https://github.com/vesparny/morpheus/issues/6))
- [ ] Tag listing page ([#7](https://github.com/vesparny/morpheus/issues/7))
- [ ] Setup testing ([#8](https://github.com/vesparny/morpheus/issues/8))
- [ ] Reserve some routes for future development ([#9](https://github.com/vesparny/morpheus/issues/9))
- [ ] Split react components ([#10](https://github.com/vesparny/morpheus/issues/10))
- [ ] Create wiki taking inspiration from [Jekyll](http://jekyllrb.com/docs/home/) ([#11](https://github.com/vesparny/morpheus/issues/11))
- [ ] Create beautiful 404 and 500 pages and handle error also on the frontend ([#12](https://github.com/vesparny/morpheus/issues/12))
- [ ] Split Morpheus in smaller npm packages ([#13](https://github.com/vesparny/morpheus/issues/13))
- [ ] Publish to npm ([#14](https://github.com/vesparny/morpheus/issues/14))


Please feel free to join the discussions ;)



### Run in production

* build the app for production, commit your production ready build, and run it.

```shell
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

PR and issues reporting are always welcome :) See more in CONTRIBUTING.md file.

### Contributors

All this wouldn't have been possible without these great [contributors](https://github.com/vesparny/morpheus/graphs/contributors)! So THANK YOU!

### License

Morpheus is open-source software released under the [MIT license](https://github.com/vesparny/morpheus/blob/master/LICENSE).

### Changelog

See CHANGELOG.md file.

### Stability

Currently Morpheus is in its very early stages, and it isn’t pretty. **It is far from usable.** Set it up only if you know what you’re doing, and expect it to break a lot.
