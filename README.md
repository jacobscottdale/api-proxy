# Express API Proxy

This express server acts as a proxy to consume 3rd party APIs used by my personal projects.

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone https://github.com/jacobscottdale/api-proxy.git NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-api-proxy",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

## cocktail-db

This router listens for the base URL `/api/cocktail/` to retrieve data from `www.thecocktaildb.com/api/json/v1/1/`, parse it and send it on to the front-end application.

The front-end application that consumes this proxy API can be found [here](https://github.com/jacobscottdale/cocktail-app).

### /api/cocktail/drink/:drinkName

Returns an array of cocktails that match the query string.

### /api/cocktail/ingredient/:ingredientName

Returns an array of ingredients that match the query string.

### /api/cocktail/id/:drinkId

Returns a an object containing the drink with an ID that matches the query string.

### /api/cocktail/glass/:glassType

Returns an array of all drinks served in the glass type matching the query string.

### /api/cocktail/list/ingredient

Returns an array of all possible cocktail ingredients in the database.

### /api/cocktail/list/glass

Returns an array of all possible cocktail glass types in the database.