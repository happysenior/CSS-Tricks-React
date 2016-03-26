import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="search">
      <header className="search-header">
        {props.title}
      </header>
      <div className="search-results">
        {props.children}
      </div>
      <footer className="search-footer">
        {props.totalResults} Results
      </footer>
    </div>
    );
}
