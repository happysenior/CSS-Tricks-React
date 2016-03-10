import React from 'react';
import UserProfile from '../views/user-profile';
import { getProfile } from '../../api/user-api';

const UserProfileContainer = React.createClass({

  getInitialState: function() {
    return {
      name: null,
      imageUrl: null,
      twitter: null,
      worksOn: null,
      repos: []
    }
  },

  componentWillMount: function() {
    let _this = this;
    let userId = this.props.params.userId
    getProfile(userId).then(function(profile) {
      _this.setState({
        name: profile.name,
        imageUrl: profile.imageUrl,
        twitter: profile.twitter,
        worksOn: profile.worksOn,
        repos: profile.repos
      });
    });
  },

  render: function() {
    return (
      <UserProfile {...this.state} />
    );
  }

});

export default UserProfileContainer;
