import * as types from '../actions/action-types';

export function loadSearchLayout(title, totalResults) {
  return {
    type: types.LOAD_SEARCH_LAYOUT,
    title,
    totalResults,
  };
}
