import React from 'react';

const SearchLayout = React.createClass({
  render: function() {
    return (
      <div className="search">
        <header className="search-header">
          Users
        </header>
        <div className="search-results">
          {this.props.children}
        </div>
        <footer className="search-footer">
          3 Results
        </footer>
      </div>
      );
  }
});

export default SearchLayout;
