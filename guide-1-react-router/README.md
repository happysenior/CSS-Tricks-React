# Guide 1: React Router

## Installing and Running

To start, make sure you're in the `guide-1-react-router` folder in command-line.

```sh
# Install Node Modules
npm install

# Start the Server, navigate to locahost:3000
npm start
```

If you want to edit the React code, you'll have to re-build the `bundle.js` file with Webpack. You'll probably want to open a new terminal tab so you can keep your server running. To rebuild with webpack, type:

```sh
webpack -w
```

## Keeping it simple

For simplicity, components are missing some formalities like [prop types](https://facebook.github.io/react/docs/reusable-components.html). I've tried to keep the components as simple as possible to get them working with the router. Since it's the minimal code to get the router working, the guide is missing many React best practices.


## ES6 Modules

In the [CodePen](http://codepen.io/bradwestfall/pen/reaWYL) demo from the CSS-Tricks tutorial, we brought React and React Router into our application via CDNs. When a JavaScript tool is brought in through CDN, the tool will be in the global namespace, which is why `React` and `ReactRouter` were available to us as objects. With bundlers like Webpack though, we are trying to avoid placing things in the global namespace. Each JavaScript module that we want to use (third-part or our own) will have to use `include` statements to get access to it. This is why you'll see this at the top of most the files in the `/app` folder:

```js
include React from 'react'
```

Importing works similarly to CommonJS' `require()` statement which automatically looks for our module (`react`) inside of the `node_modules` folder.

In the `app.js` file (the entry file for our application), you'll see this code:

```
import Router from './router';
```

Since it's a relative path, the `import` won't look inside `node_modules`, but rather wherever our relative path points. The import statement is going to take whatever the `/router.js` file wants to export, and it will place that content (usually an object) in our `Router` variable. Then we can take the `Router` variable and mount it to the DOM `'root'`:

```js
ReactDOM.render(Router, document.getElementById('root'));
```

This may seen different from the CSS-Tricks article, but it's actually the same. If you look at what the `/router.js` file is exporting, you'll see that it's a `<Router>`. Just think of this as a way to organize our code so not everything is in the `app.js` file.


## ES Destructuring

[Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) allows us to extract the intermal parts of an object into normal variables. So you may see lines of code like this:

```js
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
```

This is a combination of destructuring and imports. It's saying we want to import `react-router`, but instead of getting the `ReactRouter` object back, we want to extract certain properties from that object and create normal variables like `Router`, `Route` etc...

## Components

Here is a sample of the `Home` component. Notice it must `import` React to work. Also notice that it's creating a constant called `Home` instead of using `var`. As you read more about these new ES6 ways of creating "variables", you'll see that we should only use `var` if we truly need something to _be_ variable -- in other words, something that will change over time. In our case, the reference to `Home` (for this file) will _always_ be the same thing and is not something that incurs variable change. Therefore it is a constant.

```js
import React from 'react';

const Home = React.createClass({
  render: function() {
    return (<h1>Welcome to the Home Page</h1>);
  }
});

export default Home;
```

## Exports

One of the more confusing parts about ES6 modules (to those familiar with `require()`) is the word `default`. With ES6 modules, each module can actually export more than one thing. So to say `default` means that this `export` is the primary export of this file. It's more than just a formality though, using the `default` syntax also makes importing easier. Since we are exporting our `default` as `Home`, we can import like this:

```js
import Home from './components/home'
```

Had we not specified the `default`, the import would look something more like this:

```js
import HomeComponent from './components/home'
const Home = HomeComponent.Home

// or...
import { Home } from './components/home'
```

If you look at all the components, you'll see that they pretty much all follow the same pattern of declaring a constant, then exporting that constant as a `default`. But on purpose, I wrote the `WidgetList` component a little differently. It exports the component directly without creating a constant:

```
import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <ul className="widget-list">
        <li>Widget 1</li>
        <li>Widget 2</li>
        <li>Widget 3</li>
      </ul>
      );
  }
});
```

The important thing to know is that it's all the same thing. The way this component gets imported is the same as all the rest.