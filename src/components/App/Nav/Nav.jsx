import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function Nav() {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  return (
    <div className='nav'>
      {location.pathname === '/login' ||
      location.pathname === '/registration' ? (
        <></>
      ) : (
        <>
          <Link to='/home'>
            <h2 className='nav-title rubik-glitch-regular'>Fit Track</h2>
          </Link>
          <div>
            {/* If no user is logged in, show these links */}
            {(!user.id || user.registered === false) && (
              // If there's no user, show login/registration links
              <Link
                className='navLink'
                to='/login'
              >
                Sign In
              </Link>
            )}
          </div>
        </>
      )}
      <div>
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
              to='/nutrition-log'
            >
              Nutrition Log
            </Link>

            <LogOutButton className='navLink' />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
