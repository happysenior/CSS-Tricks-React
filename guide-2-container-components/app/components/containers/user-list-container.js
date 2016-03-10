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
    const _this = this;
    getUserList().then(function(users) {
      _this.setState({users: users})
    });
  },

  deleteUser: function(userId) {
    const _this = this;
    deleteUser(userId).then(function() {
      _this.refreshUserList();
    });
  },

  render: function() {
    return (
      <UserList users={this.state.users} deleteUser={this.deleteUser} />
    );
  }

});

export default UserListContainer;
