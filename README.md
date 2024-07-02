# FitTrack - EDA Solo Project 

## Description

_Duration: 2 Week Sprint_

Ever find yourself wondering if you've hit your fitness goals for the week or if that extra slice of pizza is going to set you back? FitTrack is here to simplify your fitness journey. This user-friendly app helps you effortlessly track your workouts and calorie intake, empowering you to achieve your fitness goals without the guesswork. Whether you're a fitness enthusiast or just starting out, FitTrack provides the tools and motivation you need to stay on track and see real progress.

To see the fully functional site, please visit: [FitTrack](https://lweigel-fit-track.fly.dev/#/fit-track/home)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)

## Installation

1. Create a database named `fit_track`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Create an `.env` file and add an environment variable `SERVER_SESSION_SECRET` with a nice random string for password hashing
4. Open up your editor of choice and run an `npm install`
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal
7. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Search our exercise library to view step by step tutorials or gain insight on proper form and technique
2. Track your exercises with ease
3. Easily record your daily meals and snacks to track calories and macros



## Built With

- React.js
- Express.js
- Moment.js
- Redux
- Passport.js
- Material UI

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. 

## Support
If you have suggestions or issues, please email me at [weigelog@gmail.com](www.google.com)
