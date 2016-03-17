# Guide 2: Container Components

## Installing and Running

To start, make sure you're in the `guide-2-container-components` folder in command-line.

```sh
# Install Node Modules
npm install

# Start the Server
gulp
```

> The server will be available at localhost:3000

If you want to edit the React code, you'll have to re-build the `public/js/bundle.js` file with Webpack. You'll probably want to open a new terminal tab so you can keep your server running. To rebuild with webpack, type:

```sh
gulp watch
```

# Learning the code

If you jump into the code, I would advise looking at Widgets before Users. There's much less code to look at for Widgets and the code that is there is basically the exact same as for Users, although Users just has more.


# Implementation Details

Here are some details for this guide that weren't covered in the tutorial:


## JSON Server

For Guide 2 and 3, we will use __JSON Server__ to give us the feel of having a real database. It will need to run on a different port from our Node server though, so it runs on _localhost:3001_.

Launching the Node server with `gulp` now also launches JSON Server.

They have [great documentation](https://github.com/typicode/json-server) if you want to learn more about how it works, but in short, they create a RESTful API for us to `GET`, `POST`, `PUT`, and `DELETE` to. In this guide, we can use those HTTP verbs on the `/users` path as follows:

A `GET` request to _localhost:3001/users_ will return a JSON array which resembles:

```
[
    {
      "id": 3,
      "name": "Dan Abramov",
      "github": "gaearon",
      "twitter": "dan_abramov",
      "worksOn": "Redux"
    },

    ...

]
```

A `DELETE` request to _localhost:3001/users/3_ will delete the record where `id:3`.

Since I knew that you might mess with the data (like a few deletes), I made it so each time you restart the server with the `gulp` command, the original database data will be restored - so delete away!


## Organization

The `/app/components` folder is now organized by:

- containers
- layouts
- views

This was just the simplest way to organize this small codebase. I make no claims that this is amazing organization :)


## Search Layout

The main purpose of the Search Layout component was to convey nested layouts in the first tutorial. It doesn't yet serve us any in the Container Components tutorial to utilize it. Therefore, it just has some static information which is not yet hooked up to state. In the third guide, we will make this information more meaningful.


## Axios

As discussed in the tutorial, we use [axios](https://github.com/mzabriskie/axios) for our AJAX (XHR) requests. However, the components don't make XHR requests directly from their `componentDidMount()` methods as the tutorial showed. Instead, all database API requests exist in the `/app/api` folder. The `componentDidMount()` methods will use those outside files for XHR requests. This just helps keep the component size down and helps them to look cleaner.


## ES6 Arrow Functions

ES6 arrow functions are very popular in React tutorials online. While the CSS-Tricks tutorial doesn't use ES6 features, the code at this guide will. Here's a brief explaination of how they work:

```js
// Old way with ES5
deleteUser: function(userId) {
  var _this = this;
  userApi.deleteUser(userId).then(function() {
    _this.refreshUserList();
  });
},

// New way with ES6 Arrow Functions
deleteUser: (userId) => {
  userApi.deleteUser(userId).then(() => {
    this.refreshUserList();
  });
},
```

At first, it may seem that it's just new syntax sugar and that it only saves some characters, so who cares? But actually, there's a cool feature they have that the old way doesn't.

The API call is a Promise which has a `.then` method and a callback. In the first example, we must bind `this` to `_this` to preserve it for the callback. But arrow functions don't use lexical scope which means the `this` keyword inside them is still referencing the outer `this`. This means we no longer need to do the `var _this = this` trick.

For this guide, all callback functions use arrow functions.

## ES6 Spread Operator

Be sure to look up and study the new [ES6 spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator). It goes really well with React!

Considering how React uses attributes to pass props and state from parent to child component, the spread operator can make this process even easier.

Imagine we wanted to pass an object from parent component to child component:

```js
// Parent Component's render method
render: function() {
  const user = {
    name: 'Brad',
    occupation: 'Web Development',
    state: 'Arizona'
  };

  return (<ChildComponent user={user} />);
}
```

This would do the trick but now the child component must access the user's name like this: `this.props.user.name`

On the parent, we could do this instead:

```js
// Parent Component's render method
render: function() {
  const user = {
    name: 'Brad',
    occupation: 'Web Development',
    state: 'Arizona'
  };

  return (<ChildComponent name={user.name} occupation={user.occupation} state={user.state} />);
}
```

Which would allow the child component to now access the user's name like this: `this.props.name`. This nicer for the child component, but it's obnoxious to create an attribute for each property on the parent component.

### Spread operator to the rescue!

With the spread operator, we can now write the parent component like this:

```js
// Parent Component's render method
render: function() {
  const user = {
    name: 'Brad',
    occupation: 'Web Development',
    state: 'Arizona'
  };

  return (<ChildComponent {...user} />);
}
```

This is a nice way to write code for the parent and the child gets to access the props like this: `this.props.name`, `this.props.occupation` and `this.props.state`.

In the guide, you can see this behavior on the [`user-profile-container.js`](https://github.com/bradwestfall/CSS-Tricks-React-Series/blob/master/guide-2-container-components/app/components/containers/user-profile-container.js#L33) file.

## Delete Strategy

In the CSS-Tricks tutorial, we showed how events can be passed from Container Components down to Presentational Components. But in the case of our _delete_ functionality, we have a new problem to solve that wasn't covered well in the tutorial directly, however there was reference to it in the [CodePen example](http://codepen.io/bradwestfall/pen/oxBGRa).

The problem is that sometimes functions like `deleteUser()` need to have arguments based on the context of the event binding. In other words, all the delete buttons are created in a loop which is where we happen to have access to the rest of the user's information via the `user` object. With the reference to the 'deleteUser()' method being in a loop, how do we ensure that when each one is called, it will call `deleteUser` with the correct user context?

### .bind()

To do this, we can use the `.bind()` method:

```js
<button onClick={props.deleteUser.bind(null, user.id)}>Delete</button>
```

Note that we don't want to call the `deleteUser()` method right now while the button is being created. Had we done:

```js
<button onClick={props.deleteUser(user.id)}>Delete</button>
```

This would call `deleteUser()` the very moment the button is created. By leaving off the parenthisis, we are indicating in JavaScript that this is a reference to a function name, not actually calling the function. Then with the `.bind()` part, we're telling JavaScript that when it does call this method, do so with `user.id` as it's first argument.

## Refresh the user list after the XHR request

The `deleteUser()` method on the Container Component will now receive a `userId` which is correct for each user. When it does so, it will delete the user with a XHR request and then it refreshes the whole user list with another XHR request. I chose this strategy simply because it was easier to write and understand. Another strategy could be to simply remove the DOM node of the user that was deleted when the first XHR request returned. These are the types of implementation strategies that you'll have to decide on your own.

One important thing to know is that with either strategy, you don't need to reach into the DOM yourself to make the update. That would be a very jQuery-ish way of thinking about how to solve this problem. With either strategy, all we need to do for the DOM update is to change the state. By doing that, the component will re-render automatically and the DOM will be changed.
