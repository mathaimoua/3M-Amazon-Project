
# 3M x Amazon Project
A small project created to fetch the highest rated 3M products from Amazon.com. Uses the Rainforest API for data.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  REACT_APP_RAINFOREST_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  ```
  While you're in your new `.env` file, register for an API key from https://www.rainforestapi.com/ and replace the X's with your key.
- Run `npm run client`
- Navigate to `localhost:3000`

## Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App used in conjunction with redux-logger to view data received from the Rainforest API.

- src/components
  - App/App
  - Nav/Nav

