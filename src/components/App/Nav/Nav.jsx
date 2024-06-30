import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton/LogOutButton';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ModalClose,
} from '@mui/joy';
import {
  FitnessCenter,
  Home,
  Logout,
  Menu,
  RestaurantMenu,
} from '@mui/icons-material';

function Nav() {
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

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
      {/* If a user is logged in, show these links */}
      {user.id && user.registered === true && (
        <>
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' } }}>
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
          </Box>
          <Box
            sx={{
              flex: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'right',
            }}
          >
            <IconButton
              variant='plain'
              color='neutral'
              size='lg'
              onClick={() => setOpen(true)}
            >
              <Menu />
            </IconButton>
            <Drawer
              size='sm'
              open={open}
              onClose={() => setOpen(false)}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  ml: 'auto',
                  mt: 1,
                  mr: 2,
                }}
              >
                <ModalClose
                  id='close-icon'
                  sx={{ position: 'initial' }}
                />
              </Box>
              <List
                size='lg'
                component='nav'
                sx={{
                  flex: '1',
                  fontSize: 'xl',
                  '& > a': { justifyContent: 'center' },
                  background: 'inherit',
                }}
              >
                <ListItemButton
                  sx={{ fontWeight: 'lg' }}
                  component='a'
                  href='#/fit-track/home'
                  onClick={() => setOpen(false)}
                >
                  <Home />
                  Home
                </ListItemButton>
                <ListItemButton
                  component='a'
                  href='#/fit-track/workout-log'
                  onClick={() => setOpen(false)}
                >
                  <FitnessCenter /> Workout Log
                </ListItemButton>
                <ListItemButton
                  component='a'
                  href='#/fit-track/nutrition-log'
                  onClick={() => setOpen(false)}
                >
                  <RestaurantMenu />
                  Nutrition Log
                </ListItemButton>
                <ListItemButton
                  component='a'
                  href='#/fit-track/home'
                  onClick={() => {
                    setOpen(false);
                    dispatch({ type: 'LOGOUT' });
                  }}
                >
                  <Logout />
                  Log Out
                </ListItemButton>
              </List>
            </Drawer>
          </Box>
        </>
      )}
    </div>
  );
}

export default Nav;
