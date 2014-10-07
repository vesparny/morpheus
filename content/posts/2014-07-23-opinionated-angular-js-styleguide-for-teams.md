---
layout: post
author: Alessandro Arnodo
tags: tag1, tag2
date: 25/08/1984
slug: opinionated-angular-js-styleguide-for-teams
permalink: /opinionated-angular-js-styleguide-for-teams
title: Opinionated AngularJS styleguide for teams
path: 2014-07-23-opinionated-angular-js-styleguide-for-teams.md
---

<h5>Official styleguide repo <a href="//github.com/toddmotto/angularjs-styleguide" style="text-decoration: underline;">now on GitHub</a>, all future styleguide updates will be here!</h5>


After reading [Google's AngularJS guidelines](//google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html), I felt they were a little too incomplete and also guided towards using the Closure library. They [also state](//blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html) _"We don't think this makes sense for all projects that use AngularJS, and we'd love to see our community of developers come up with a more general Style that's applicable to AngularJS projects large and small"_, so here goes.

From my experience with Angular, [several talks](//speakerdeck.com/toddmotto) and working in teams, here's my opinionated styleguide for syntax, building and structuring Angular applications.

### Module definitions

Angular modules can be declared in various ways, either stored in a variable or using the getter syntax. Use the getter syntax at all times ([angular recommended](//docs.angularjs.org/guide/module)).

###### Bad:
{% highlight javascript %}
var app = angular.module('app', []);
app.controller();
app.factory();
{% endhighlight %}

###### Good:
{% highlight javascript %}
angular
  .module('app', [])
  .controller()
  .factory();
{% endhighlight %}

From these modules we can pass in function references.

### Module method functions

Angular modules have a lot of methods, such as `controller`, `factory`, `directive`, `service` and more. There are many syntaxes for these modules when it comes to dependency injection and formatting your code. Use a named function definition and pass it into the relevant module method, this aids in stack traces as functions aren't anonymous (this could be solved by naming the anonymous function but this method is far cleaner).

###### Bad:
{% highlight javascript %}
var app = angular.module('app', []);
app.controller('MyCtrl', function () {

});
{% endhighlight %}

###### Good:
{% highlight javascript %}
function MainCtrl () {

}
angular
  .module('app', [])
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

Define a module once using `angular.module('app', [])` setter, then use the `angular.module('app')` getter elsewhere (such as other files).

To avoid polluting the global namespace, wrap all your functions during _compilation/concatenation_ inside an IIFE which will produce something like this:

###### Best:
{% highlight javascript %}
(function () {
  angular.module('app', []);

  // MainCtrl.js
  function MainCtrl () {

  }

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  // AnotherCtrl.js
  function AnotherCtrl () {

  }

  angular
    .module('app')
    .controller('AnotherCtrl', AnotherCtrl);

  // and so on...

})();
{% endhighlight %}


### Controllers

Controllers are classes and can use a `controllerAs` syntax or generic `controller` syntax. Use the `controllerAs` syntax always as it aids in nested scoping and controller instance reference.

##### controllerAs DOM bindings

###### Bad:
{% highlight html %}
<div ng-controller="MainCtrl">
  {% raw %}{{ someObject }}{% endraw %}
</div>
{% endhighlight %}

###### Good:
{% highlight html %}
<div ng-controller="MainCtrl as main">
  {% raw %}{{ main.someObject }}{% endraw %}
</div>
{% endhighlight %}

Binding these `ng-controller` attributes couples the declarations tightly with our DOM, and also means we can only use that controller for that specific view (there are rare cases we might use the same view with different controllers). Use the router to couple the controller declarations with the relevant views by telling each `route` what controller to instantiate.

###### Best:
{% highlight html %}
<!-- main.html -->
<div>
  {% raw %}{{ main.someObject }}{% endraw %}
</div>
<!-- main.html -->

<script>
// ...
function config ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  });
}
angular
  .module('app')
  .config(config);
//...
</script>
{% endhighlight %}

This avoids using `$parent` to access any parent controllers from a child controller, simple hit the `main` reference and you've got it. This could avoid things such as `$parent.$parent` calls.

##### controllerAs this keyword

The `controllerAs` syntax uses the `this` keyword inside controllers instead of `$scope`. When using `controllerAs`, the controller is infact _bound_ to `$scope`, there is a degree of separation.

###### Bad:
{% highlight javascript %}
function MainCtrl ($scope) {
  $scope.someObject = {};
  $scope.doSomething = function () {

  };
}
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

You can also use the `prototype` Object to create controller classes, but this becomes messy very quickly as each dependency injected provider needs a reference bound to the `constructor` Object.

###### Bad and Good:
Good for inheritance, bad (verbose) for general use.

{% highlight javascript %}
function MainCtrl ($scope) {
  this.someObject = {};
  this._$scope = $scope;
}
MainCtrl.prototype.doSomething = function () {
  // use this._$scope
};
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

If you're using `prototype` and don't know why, then it's bad. If you are using `prototype` to inherit from other controllers, then that's good. For general use, the `prototype` pattern can be verbose.

###### Good:
{% highlight javascript %}
function MainCtrl () {
  this.someObject = {};
  this.doSomething = function () {

  };
}
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

These just show examples of Objects/functions inside Controllers, however we don't want to put logic in controllers...

##### Avoid controller logic

Avoid writing logic in Controllers, delegate to Factories/Services.

###### Bad:
{% highlight javascript %}
function MainCtrl () {
  this.doSomething = function () {

  };
}
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

###### Good:
{% highlight javascript %}
function MainCtrl (SomeService) {
  this.doSomething = SomeService.doSomething;
}
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

This maximises reusability, encapsulated functionality and makes testing far easier and persistent.

### Services

Services are instantiated and should be class-like also and reference the `this` keyword, keep function style consistent with everything else.

###### Good:
{% highlight javascript %}
function SomeService () {
  this.someMethod = function () {

  };
}
angular
  .module('app')
  .service('SomeService', SomeService);
{% endhighlight %}

### Factory

Factories give us a singleton module for creating service methods (such as communicating with a server over REST endpoints). Creating and returning a bound Object keeps controller bindings up to date and avoids pitfalls of binding primitive values.

Important: A "factory" is in fact a pattern/implementation, and shouldn't be part of the provider's name. All factories and services should be called "services".

###### Bad:
{% highlight javascript %}
function AnotherService () {

  var someValue = '';

  var someMethod = function () {

  };

  return {
    someValue: someValue,
    someMethod: someMethod
  };

}
angular
  .module('app')
  .factory('AnotherService', AnotherService);
{% endhighlight %}

###### Good:
We create an Object with the same name inside the function. This can aid documentation as well for comment-generated docs.

{% highlight javascript %}
function AnotherService () {

  var AnotherService = {};

  AnotherService.someValue = '';

  AnotherService.someMethod = function () {

  };

  return AnotherService;
}
angular
  .module('app')
  .factory('AnotherService', AnotherService);
{% endhighlight %}

Any bindings to primitives are kept up to date, and it makes internal module namespacing a little easier, we can easily see any private methods and variables.

### Directives

Any DOM manipulation should take place inside a directive, and only directives. Any code reusability should be encapsulated (behavioural and markup related) too.

##### DOM manipulation

DOM manipulation should be done inside the `link` method of a directive.

###### Bad:
{% highlight javascript %}
// do not use a controller
function MainCtrl (SomeService) {

  this.makeActive = function (elem) {
    elem.addClass('test');
  };

}
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

###### Good:
{% highlight javascript %}
// use a directive
function SomeDirective (SomeService) {
  return {
    restrict: 'EA',
    template: [
      '<a href="" class="myawesomebutton" ng-transclude>',
        '<i class="icon-ok-sign"></i>',
      '</a>'
    ].join(''),
    link: function ($scope, $element, $attrs) {
      // DOM manipulation/events here!
      $element.on('click', function () {
        $(this).addClass('test');
      });
    }
  };
}
angular
  .module('app')
  .directive('SomeDirective', SomeDirective);
{% endhighlight %}

Any DOM manipulation should take place inside a directive, and only directives. Any code reusability should be encapsulated (behavioural and markup related) too.

##### Naming conventions

Custom directives should _not_ be `ng-*` prefixed to prevent future core overrides if your directive name happens to land in Angular (such as when `ng-focus` landed, there were many custom directives called this beforehand). It also makes it more confusing to know which are core directives and which are custom.

###### Bad:
{% highlight javascript %}
function ngFocus (SomeService) {

  return {};

}
angular
  .module('app')
  .directive('ngFocus', ngFocus);
{% endhighlight %}

###### Good:
{% highlight javascript %}
function focusFire (SomeService) {

  return {};

}
angular
  .module('app')
  .directive('focusFire', focusFire);
{% endhighlight %}

Directives are the _only_ providers that we have the first letter as lowercase, this is due to strict naming conventions in the way Angular translates `camelCase` to hyphenated, so `focusFire` will become `<input focus-fire>` when used on an element.

##### Usage restriction

If you need to support IE8, you'll want to avoid using the comments syntax for declaring where a directive will sit. Really, this syntax should be avoided anyway - there are no real benefits of using it - it just adds confusion of what is a comment and what isn't.

###### Bad:
These are terribly confusing.
{% highlight html %}
<!-- directive: my-directive -->
<div class="my-directive"></div>
{% endhighlight %}

###### Good:
Declarative custom elements and attributes are clearest.
{% highlight html %}
<my-directive></my-directive>
<div my-directive></div>
{% endhighlight %}

You can restrict usage using the `restrict` property inside each directive's Object. Use `E` for `element`, `A` for `attribute`, `M` for `comment` (avoid) and `C` for `className` (avoid this too as it's even more confusing, but plays better with IE). You can have multiple restrictions, such as `restrict: 'EA'`.

### Resolve promises in router, defer controllers

After creating services, we will likely inject them into a controller, call them and bind any new data that comes in. This becomes problematic of keeping controllers tidy and resolving the right data.

Thankfully, using `angular-route.js` (or a third party such as `ui-router.js`) we can use a `resolve` property to resolve the next view's promises before the page is served to us. This means our controllers are instantiated when all data is available, which means zero function calls.

###### Bad:
{% highlight javascript %}
function MainCtrl (SomeService) {

  var self = this;

  // unresolved
  self.something;

  // resolved asynchronously
  SomeService.doSomething().then(function (response) {
    self.something = response;
  });

}
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

###### Good:
{% highlight javascript %}
function config ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    resolve: {
      doSomething: function (SomeService) {
        return SomeService.doSomething();
      }
    }
  });
}
angular
  .module('app')
  .config(config);
{% endhighlight %}

At this point, our service will internally bind the response of the promise to another Object which we can reference in our "deferred-instantiated" controller:

###### Good:
{% highlight javascript %}
function MainCtrl (SomeService) {
  // resolved!
  this.something = SomeService.something;
}
angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
{% endhighlight %}

We can go one better, however and create a `resolve` property on our own Controllers to couple the resolves with the Controllers and avoid logic in the router.

###### Best:
{% highlight javascript %}
// config with resolve pointing to relevant controller
function config ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main',
    resolve: MainCtrl.resolve
  });
}
// controller as usual
function MainCtrl (SomeService) {
  // resolved!
  this.something = SomeService.something;
}
// create the resolved property
MainCtrl.resolve = {
  doSomething: function (SomeService) {
    return SomeService.doSomething();
  }
};

angular
  .module('app')
  .controller('MainCtrl', MainCtrl)
  .config(config);
{% endhighlight %}

##### Route changes and ajax spinners
While the routes are being resolved we want to show the user something to indicate progress. Angular will fire the `$routeChangeStart` event as we navigate away from the page, which we can show some form of loading and ajax spinner, which can then be removed on the `$routeChangeSuccess` event ([see docs](https://docs.angularjs.org/api/ngRoute/service/$route)).

### Avoid $scope.$watch

Using `$scope.$watch` should be avoided unless there are no others options. It's less performant than binding an expression to something like `ng-change`, a list of supported events are in the Angular docs.

###### Bad:
{% highlight html %}
<input ng-model="myModel">
<script>
$scope.$watch('myModel', callback);
</script>
{% endhighlight %}

###### Good:
{% highlight html %}
<input ng-model="myModel" ng-change="callback">
<!--
  $scope.callback = function () {
    // go
  };
-->
{% endhighlight %}

### Project/file structure

One role, one file, rule. Separate all controllers, services/factories, directives into individual files. Don't add all controllers in one file, you will end up with a huge file that is very difficult to navigate, keeps things encapsulated and bitesize.

###### Bad:
{% highlight html %}
|-- app.js
|-- controllers.js
|-- filters.js
|-- services.js
|-- directives.js
{% endhighlight %}

Keep naming conventions for files consistent, don't invent fancy names for things, you'll just forget them.

###### Good:
{% highlight html %}
|-- app.js
|-- controllers/
|   |-- MainCtrl.js
|   |-- AnotherCtrl.js
|-- filters/
|   |-- MainFilter.js
|   |-- AnotherFilter.js
|-- services/
|   |-- MainService.js
|   |-- AnotherService.js
|-- directives/
|   |-- MainDirective.js
|   |-- AnotherDirective.js
{% endhighlight %}

Depending on the size of your code base, a "feature-driven" approach may be better to split into functionality chunks.

###### Good:
{% highlight html %}
|-- app.js
|-- dashboard/
|   |-- DashboardService.js
|   |-- DashboardCtrl.js
|-- login/
|   |-- LoginService.js
|   |-- LoginCtrl.js
|-- inbox/
|   |-- InboxService.js
|   |-- InboxCtrl.js
{% endhighlight %}

### Naming conventions and conflicts

Angular provides us many Objects such as `$scope` and `$rootScope` that are prefixed with `$`. This incites they're public and can be used. We also get shipped with things such as `$$listeners`, which are available on the Object but are considered private methods.

Avoid using `$` or `$$` when creating your own services/directives/providers/factories.

###### Bad:
Here we create `$$SomeService` as the definition, not the function name.

{% highlight javascript %}
function SomeService () {

}
angular
  .module('app')
  .factory('$$SomeService', SomeService);
{% endhighlight %}

###### Good:
Here we create `SomeService` as the definition, _and_ the function name for consistency/stack traces.

{% highlight javascript %}
function SomeService () {

}
angular
  .module('app')
  .factory('SomeService', SomeService);
{% endhighlight %}

### Minification and annotation

##### Annotation order
It's considered good practice to dependency inject Angular's providers in before our own custom ones.

###### Bad:
{% highlight javascript %}
// randomly ordered dependencies
function SomeCtrl (MyService, $scope, AnotherService, $rootScope) {

}
{% endhighlight %}

###### Good:
{% highlight javascript %}
// ordered Angular -> custom
function SomeCtrl ($scope, $rootScope, MyService, AnotherService) {

}
{% endhighlight %}

##### Minification methods, automate it
Use `ng-annotate` for automated dependency injection annotation, as `ng-min` is [deprecated](https://github.com/btford/ngmin). You can find `ng-annotate` [here](https://github.com/olov/ng-annotate).

With our function declarations outside of the module references, we need to use the `@ngInject` comment to explicitly tell `ng-annotate` where to inject our dependencies. This method uses `$inject` which is faster than the Array syntax.

Manually specifiying the dependency injection arrays costs too much time.

###### Bad:
{% highlight javascript %}
function SomeService ($scope) {

}
// manually declaring is time wasting
SomeService.$inject = ['$scope'];
angular
  .module('app')
  .factory('SomeService', SomeService);
{% endhighlight %}

###### Good:
Using the `ng-annotate` keyword `@ngInject` to instruct things that need annotating:

{% highlight javascript %}
/**
 * @ngInject
 */
function SomeService ($scope) {

}
angular
  .module('app')
  .factory('SomeService', SomeService);
{% endhighlight %}

Will produce:

{% highlight javascript %}
/**
 * @ngInject
 */
function SomeService ($scope) {

}
// automated
SomeService.$inject = ['$scope'];
angular
  .module('app')
  .factory('SomeService', SomeService);
{% endhighlight %}
