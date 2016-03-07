import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/main-layout';
import SearchLayout from './components/search-layout';

// Pages
import Home from './components/home';
import UserList from './components/user-list';
import UserProfile from './components/user-profile';
import WidgetList from './components/widget-list';

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Home} />
      <Route component={SearchLayout}>
        <Route path="users" component={UserList} />
        <Route path="users/:userId" component={UserProfile} />
        <Route path="widgets" component={WidgetList} />
      </Route> 
    </Route>
  </Router>
  );

/*
The user paths could have also been written as

<Route path="users">
  <IndexRoute component={UserList} />
  <Route path=":userId" component={UserProfile} />
</Route>
*/