import React from 'react';
import { connect } from 'react-redux';
import SearchLayout from '../layouts/search-layout';

const mapStateToProps = function(store) {
  return {
    title: store.searchLayoutState.title,
    totalResults: store.searchLayoutState.totalResults
  };
};

export default connect(mapStateToProps)(SearchLayout);
