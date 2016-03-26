import * as types from '../actions/action-types';

const initialState = {
  title: '',
  totalResults: 0
};

const searchLayoutReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.LOAD_SEARCH_LAYOUT:
      return Object.assign({}, state, {
        title: action.title,
        totalResults: action.totalResults
      });

  }

  return state;

}

export default searchLayoutReducer;
