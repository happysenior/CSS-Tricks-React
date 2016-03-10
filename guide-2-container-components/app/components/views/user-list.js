import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="user-list">

      {props.users.map(function(user) {

        return (
          <div key={user.id} className="user">
            <div className="details">
              <Link to={'/users/' + user.id}>{user.name}</Link>
            </div>
            <div className="controls">
              <button onClick={props.deleteUser.bind(null, user.id)} className="delete">Delete</button>
            </div>
          </div>
        );
        
      })}

    </div>
  );
}