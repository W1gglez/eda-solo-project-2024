import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import { useDispatch, useSelector } from 'react-redux';

import Nav from './Nav/Nav';
import Footer from './Footer/Footer';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ExerciseLibrary from '../ExerciseLibraryPage/ExerciseLibraryPage';

import './App.css';
import WorkoutLogPage from '../WorkoutLogPage/WorkoutLogPage';
import AddExercisePage from '../AddExercisePage/AddExercisePage';
import NutritionLogPage from '../NutritionLogPage/NutritionLogPage';
import ExerciseDetailsPage from '../ExerciseDetailsPage/ExerciseDetailsPage';
import UserInfoForm from '../RegisterPage/UserInfoForm/UserInfoForm';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Router basename='/fit-track'>
        <div className='content'>
          <Nav />
          <Switch>
            {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
            <Redirect
              exact
              from='/'
              to='/home'
            />

            <Route
              exact
              path='/home'
            >
              <ExerciseLibrary />
            </Route>
            <Route
              exact
              path='/exercise-details/:id'
            >
              <ExerciseDetailsPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
            <ProtectedRoute
              // logged in shows WorkoutLogPage else shows LoginPage
              exact
              path='/workout-log'
            >
              <WorkoutLogPage />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path='/add-exercise'
            >
              <AddExercisePage />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path='/nutrition-log'
            >
              <NutritionLogPage />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path='/register-user-info'
            >
              <UserInfoForm />
            </ProtectedRoute>

            <Route
              exact
              path='/login'
            >
              {user.id ? (
                user.registered === false ? (
                  <Redirect to='/register-user-info' />
                ) : (
                  // If the user is already logged in, and registration has been completed
                  // redirect them to the /home page
                  <Redirect to='/home' />
                )
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route
              exact
              path='/registration'
            >
              {user.id ? (
                user.registered === false ? (
                  <Redirect to='/register-user-info' />
                ) : (
                  // If the user is already logged in, and registration has been completed
                  // redirect them to the /home page
                  <Redirect to='/home' />
                )
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>
        {/* <Footer /> */}
      </Router>
    </CssVarsProvider>
  );
}

export default App;
