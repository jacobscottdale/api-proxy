const express = require('express');
const CocktailService = require('./cocktail-service');
const cocktailRouter = express.Router();

// Returns an array of drinks that match query string
cocktailRouter
  .route('/drink/:drinkName')
  .get((req, res, next) => {
    CocktailService.searchByName(req.params.drinkName)
      .then(drinks =>
        res
          .status(200)
          .json(drinks))
      .catch(next);
  });

// Returns an array of ingredients that match query string
cocktailRouter
  .route('/ingredient/:ingredientName')
  .get((req, res, next) => {
    CocktailService.searchByIngredient(req.params.ingredientName)
      .then(drinks =>
        res
          .status(200)
          .json(drinks))
      .catch(next);
  });

// Returns the drink with id that matches the query string
cocktailRouter
  .route('/id/:drinkId')
  .get((req, res, next) => {
    CocktailService.searchById(req.params.drinkId)
      .then(drink => {
        if (!drink) {
          return res
            .sendStatus(404);
        }
        return res
          .status(200)
          .json(drink);
      })
      .catch(next);
  });

// Returns an array of all drinks served in the type of glass matching the query string
cocktailRouter
  .route('/glass/:glassType')
  .get((req, res, next) => {
    CocktailService.searchByGlassType(req.params.glassType)
      .then(drinks =>
        res
          .status(200)
          .json(drinks))
      .catch(next);
  });

cocktailRouter
  .route('/list/')
  .get((req, res, next) => {
    CocktailService.listGlassesAndIngredients()
      .then(lists =>
        res
          .status(200)
          .json(lists))
      .catch(next);
  });

// Returns an array of all possible ingredients
cocktailRouter
  .route('/list/ingredient')
  .get((req, res, next) => {
    CocktailService.listIngredient()
      .then(ingredients =>
        res
          .status(200)
          .json(ingredients))
      .catch(next);
  });

// Returns an array of all possible glasses
cocktailRouter
  .route('/list/glass')
  .get((req, res, next) => {
    CocktailService.listGlass()
      .then(glasses =>
        res
          .status(200)
          .json(glasses))
      .catch(next);
  });

module.exports = cocktailRouter;