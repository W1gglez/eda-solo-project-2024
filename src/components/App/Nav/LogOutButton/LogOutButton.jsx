import { Button } from '@mui/joy';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Link
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      to='/home'
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Link>
  );
}

export default LogOutButton;
