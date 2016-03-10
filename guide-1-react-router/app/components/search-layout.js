import React from 'react';

const SearchLayout = React.createClass({
  render: function() {
    return (
      <div className="search">
        <header className="search-header">
          Search Layout Header
        </header>
        <div className="search-results">
          {this.props.children}
        </div>
        <footer className="search-footer">
          Search Layout Footer
        </footer>
      </div>
    );
  }
});

export default SearchLayout;
