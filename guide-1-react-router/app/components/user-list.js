import React from 'react';
import { Link } from 'react-router';

const UserList = React.createClass({
  render: function() {
    return (
      <ul className="user-list">
        <li><Link to="users/1">Ryan</Link></li>
        <li><Link to="users/2">Michael</Link></li>
        <li><Link to="users/3">Dan</Link></li>
      </ul>
      );
  }
});

export default UserList;