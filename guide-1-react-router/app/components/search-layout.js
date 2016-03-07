import React from 'react';

const SearchLayout = React.createClass({
  render: function() {
    return (
      <div className="search">
        <header className="search-header"></header>
        <div className="results">
          {this.props.children}
        </div>
        <div className="search-footer pagination"></div>
      </div>
      );
  }
});

export default SearchLayout;