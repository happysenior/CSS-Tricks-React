# React: A Three-Part Series

This repo is for CSS-Tricks' [React: A Three-Part Series](#needurl). This documentation will show you:

- Steps for installing and running the code
- An explanation of the Webpack and Babel setup
- Extra Tips and Tricks

## Guide Documentation

Each guide will have a README file for its specific documentation:

- [Guide 1: React Router](https://github.com/bradwestfall/CSS-Tricks-React-Series/tree/master/guide-1-react-router)
- Guide 2: Container Components (Coming Soon)
- Guide 3: Redux (Coming Soon)


## Installing and Running Code

There are three guides in this repo that correspond to the three CSS-Tricks articles. Each guide serves as a distinct project and each will need to be npm-installed and ran separately.

Start by cloning this repo and installing the React Router guide:

```sh
cd guide-1-react-router
npm install
gulp
```

> The server will be available at localhost:3000

To run the code from the other guides, `cd` to their folders and run the `npm` steps again from their folder.


# Implementation Details

The articles at CSS Tricks will be focused on their respective topics. They don't cover 100% of the concepts and implementation details of the code in the GitHub Guides. However, each guide will come with its own README.md file that tries to cover some of the implementation details, especially for ES6 concepts.

It should also be noted that the guides leave out many formalities like validation, security (XSS, CSRF) and organizational details to stay focused on the topics. These guides are trying to convey the "bigger picture" of how React _can_ work in a Single Page Application. They do not necessarily serve as a "best-practices" starting point.


### Server

Each guide uses a very simple Express server which should take no configuration on your part to setup. The `gulp` step will launch the server so you can visit _localhost:3000_ in the browser to see the guide. Type `CTRL+C` to stop the server, and remember that only one guide can be ran at any given time since you'll `cd` to each guide and run its server separately.


## Webpack

Webpack is a bundler that allows you author multiple JavaScript files and have them bundled into one file for sending to the browser. If you're new to Webpack, here's a quick overview...

Your project (or in this case, each guide) will have a `webpack.config.js` file. This file tells Webpack about which JavaScript file is your main entry point. That entry file will "include" other JavaScript files that it needs, called dependencies. In turn, those files can "include" even more files. Webpack takes all the files in this process and bundles them into one output file, which you can also define in the `webpack.config.js` file.

Webpack allows multiple ways to "include" JavaScript files into each other such as CommonJS (`require()` statements) or AMD. More recently though we can now use the ES6 way with `include` statements -- assuming you tell Webpack about how to use Babel (See the section below). These guides will use the ES6 way with Babel.

The `bundle.js` file that Webpack creates will be the only JavaScript file sent to the browser. So the browser will start with all the JavaScript it will ever need for the application without making requests back to the server. However, the browser doesn't necessarily understand how some things work like CommonJS or ES6 includes. Therefore, Webpack will rewrite some of your JavaScript in ways that help the browser to understand it. Don't worry though, it won't break your code.

If you're worried that Webpack bundling the code will mean that DevTools (or similar) will show the incorrect line numbers for errors, you don't have to worry because we've setup something called a source map. With Webpack, we've created a source map to tell DevTools which lines of code in the bundle correspond to which lines from your original files. When DevTools tells you there's an error, or if you need to do a `console.log`, it will report the correct file line numbers from your original files.

For running the code in these guides, you don't even need to think about Webpack. The builds are already made before you do the clone of this repo. However, if you want to make any changes to the front-end (React) JavaScript, then you will have to use Webpack to re-build the `bundle.js` file.

### So how do you install Webpack?

For these guides you won't need to install Webpack globally. The `npm install` command will install a version of Webpack that gulp uses. To launch Webpack from gulp, type:

```sh
gulp watch
```

This launches Webpack watches for changes in the `/app` folder.

Note that the `gulp` command will launch the Node server and the `gulp watch` command takes care of the React/Webpack part. So you'll want to run these commands in two separate tabs if you want to have the server running and to be making React code changes.

### Other configurations

If you don't use a gulp strategy in other projects, it probably makes more sense to [install Webpack globally](http://webpack.github.io/docs/installation.html) and
run the `webpack` or `webpack -w` command directly from the command-line.


## Babel

Babel allows us to write ES6 (and even ES7) code before the browser supports it. Like Webpack, Babel will re-write our ES6 code so that it's valid ES5 and understood by the browser. You might ask why we would want to write in future versions of JavaScript that aren't even fully supported? Well, ES6 has all kinds of new syntaxes which is really nice to use. Plus, ES6 was finalized in 2015, which is why it's also called ES2015. It truly is the way of the future for JavaScript so getting familiar with it sooner-than-later is best. Many React guides use ES6, so getting familiar with it will also help you learn React.


# Extra Tips and Tricks


## JSX with Sublime

If you use Sublime Text Editor, you may notice the JSX syntax highlighting is weird in `.js` files. That's because the JavaScript syntax highlighter isn't familiar with markup. You'll probably want to install the [babel-sublime](https://github.com/babel/babel-sublime) plugin which encourages you to use the _JavaScript (Babel)_ syntax for your files over the _JavaScript_ syntax.

You might also notice that Emmet shortcuts don't work in JSX. Wes Bos wrote a [great guide](http://wesbos.com/emmet-react-jsx-sublime/) for setting that up.


## The multiple ways of creating components

For myself, I prefer the `React.createClass` way over the `extends React.Component` way. Pete Hunt (former Facebook React team developer) [once wrote](https://github.com/petehunt/react-howto#learning-es6):

> "You may see some talk about ES6 classes being the preferred way to create React components. This is untrue. Most people (including Facebook) are using React.createClass().""

I'm not saying there's anything wrong with the ES6 way, I'm just saying you don't have to feel so bad that you're not doing it the ES6 way.


## More to come...

If you want to make more beginner suggestions that help beginners break through the hurdles, start a GitHub issue and perhaps we can add more tips here.
