import React from 'react';

export default React.createClass({

  render: function() {
    return (
      <form onSubmit={this.props.search} className="search">
        <input type="text" ref="search" placeholder="Search" />
        <button>Search</button>
      </form>
    );
  },

  getQuery: function() {
    return this.refs.search.value;
  }

});
