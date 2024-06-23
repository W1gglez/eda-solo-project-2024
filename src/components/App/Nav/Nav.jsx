import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className='nav'>
      <Link to='/home'>
        <h2 className='nav-title'>Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {(!user.id || user.registered === false) && (
          // If there's no user, show login/registration links
          <Link
            className='navLink'
            to='/login'
          >
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && user.registered === true && (
          <>
            <Link
              className='navLink'
              to='/home'
            >
              Home
            </Link>

            <Link
              className='navLink'
              to='/workout-log'
            >
              Workout Log
            </Link>

            <Link
              className='navLink'
              to='/nutrition-diary'
            >
              Nutrition Diary
            </Link>

            <LogOutButton className='navLink' />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
