import React from 'react';
import UserList from '../views/user-list';
import { getUserList, deleteUser } from '../../api/user-api';

const UserListContainer = React.createClass({

  getInitialState: function() {
    return {
      users: []
    }
  },

  componentWillMount: function() {
    this.refreshUserList();
  },

  refreshUserList: function() {
    getUserList().then(users => {
      this.setState({users: users})
    });
  },

  deleteUser: function(userId) {
    deleteUser(userId).then(() => {
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
