import React from 'react';
import { connect } from 'react-redux';
import UserList from '../views/user-list';
import * as userApi from '../../api/user-api';

const UserListContainer = React.createClass({

  componentDidMount: userApi.getList,

  render: function() {
    return (
      <UserList users={this.props.users} deleteUser={userApi.deleteUser} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    users: store.userState.users
  };
};

export default connect(mapStateToProps)(UserListContainer);
