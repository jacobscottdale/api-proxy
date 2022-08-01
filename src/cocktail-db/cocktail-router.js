const express = require('express');
const path = require('path');
const CocktailService = require('./cocktail-service');
const bodyParser = express.json();
const cocktailRouter = express.Router();

/*
search cocktail by name, 
/search.php?s=

ingredients
/filter.php?i=

glass type
/filter.php?g=

id
/lookup.php?i=

list glasses
/list.php?g=list

ingredients
/list.php?i=list

random cocktail
/random.php
*/

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

cocktailRouter
  .route('/ingredient/:ingredientName')
  .get((req, res, next) => {
    CocktailService.searchByIngredient(req.params.ingredientName)
      .then(drinks => 
        res
          .status(200)
          .json(drinks))
      .catch(next)
  })


  cocktailRouter
  .route('/id/:drinkId')
  .get((req, res, next) => {
    CocktailService.searchById(req.params.drinkId)
      .then(drinks => 
        res
          .status(200)
          .json(drinks))
      .catch(next)
  })

  cocktailRouter
  .route('/list/ingredient')
  .get((req, res, next) => {
    CocktailService.listIngredient()
      .then(ingredients => 
        res
          .status(200)
          .json(ingredients))
      .catch(next)
  })

  cocktailRouter
  .route('/list/glass')
  .get((req, res, next) => {
    CocktailService.listGlass()
      .then(glasses => 
        res
          .status(200)
          .json(glasses))
      .catch(next)
  })

module.exports = cocktailRouter;