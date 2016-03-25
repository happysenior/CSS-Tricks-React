import * as types from '../actions/action-types';

export function userListSuccess(users) {
  return {
    type: types.USER_LIST_SUCCESS,
    users
  };
}

export function deleteUserSuccess(userId) {
  return {
    type: types.DELETE_USER_SUCCESS,
    userId
  };
}

export function userProfileSuccess(userProfile) {
  return {
    type: types.USER_PROFILE_SUCCESS,
    userProfile
  };
}
