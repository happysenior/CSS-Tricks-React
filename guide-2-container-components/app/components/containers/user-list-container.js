import React from 'react';
import UserList from '../views/user-list';
import * as userApi from '../../api/user-api';

const UserListContainer = React.createClass({

  getInitialState: function() {
    return {
      users: []
    }
  },

  componentDidMount: function() {
    this.refreshUserList();
  },

  refreshUserList: function() {
    userApi.getList().then(users => {
      this.setState({users: users})
    });
  },

  deleteUser: function(userId) {
    userApi.deleteUser(userId).then(() => {
      this.refreshUserList();
    });
  },

  render: function() {
    return (
      <UserList users={this.state.users} deleteUser={this.deleteUser} />
    );
  }

});

export default UserListContainer;
