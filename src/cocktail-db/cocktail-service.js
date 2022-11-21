const config = require('../config');
const axios = require('axios');

axios.defaults.baseURL = config.COCKTAIL_API_URL;

const CocktailService = {

  async searchByName(drinkName) {
    try {
      const res = await axios.get(`/search.php?s=${drinkName}`);

      // If API returns no drink data, return 0 results and an empty array
      if (res.data.drinks === null) {
        return {
          numberOfResults: 0,
          drinks: []
        };
      }

      // If API does return drink data, parse out only each drink's id, name and thumbnail url
      let parsedData = res.data.drinks.map(drink => {
        return {
          id: drink.idDrink,
          name: drink.strDrink,
          thumbnailURL: drink.strDrinkThumb
        };
      });

      // Finally, return number of results and the parsed drink data
      return {
        numberOfResults: res.data.drinks.length,
        drinks: parsedData
      };
    }
    catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  },

  async searchByIngredient(ingredientName) {
    try {
      const res = await axios.get(`/filter.php?i=${ingredientName}`);

      if (res.data.drinks === null) {
        return {
          numberOfResults: 0,
          drinks: []
        };
      }

      let parsedData = res.data.drinks.map(drink => {
        return {
          id: drink.idDrink,
          name: drink.strDrink,
          thumbnail: drink.strDrinkThumb
        };
      });

      return {
        numberOfResults: res.data.drinks.length,
        drinks: parsedData
      };
    }
    catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  },

  async searchByGlassType(glassType) {
    try {
      const res = await axios.get(`/filter.php?g=${glassType}`);

      if (res.data.drinks === null) {
        return {
          drinks: []
        };
      }

      let parsedData = res.data.drinks.map(drink => {
        return {
          id: drink.idDrink,
          name: drink.strDrink,
          thumbnail: drink.strDrinkThumb
        };
      });

      return {
        numberOfResults: res.data.drinks.length,
        drinks: parsedData
      };
    }
    catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  },

  async searchById(drinkId) {

    try {

      const res = await axios.get(`/lookup.php?i=${drinkId}`);

      if (res.data.drinks === null) {
        return {
          drinks: []
        };
      }
      let parsedData = res.data.drinks.map(drink => {

        let tags = drink.strTags.split(',');
        let ingredients = [];
        let measure = [];
        let alcohol = drink.strAlcoholic === 'alcoholic' ? true : false

        for (let i = 1; drink[ 'strIngredient' + i ] !== null; i++) {

          ingredients.push(drink[ 'strIngredient' + i ]);
          measure.push(drink[ 'strMeasure' + i ]);
        }


        return {
          id: drink.idDrink,
          name: drink.strDrink,
          thumbnail: drink.strDrinkThumb,
          category: drink.strCategory,
          tags: tags,
          IBA: drink.strIBA,
          glass: drink.strGlass,
          instructions: drink.strInstructions,
          alcholic: alcohol,
          ingredients: ingredients,
          measure: measure,
        };
      });

      return {
        drinks: parsedData
      };
    }
    catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  },

  async listGlass() {
    try {
      const res = await axios.get(`/list.php?g=list`);

      let parsedData = res.data.drinks.map(glass => glass.strGlass);

      return {
        glasses: parsedData
      };
    }
    catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  },

  async listIngredient() {
    try {
      const res = await axios.get(`/list.php?i=list`);

      let parsedData = res.data.drinks.map(ingredient => ingredient.strIngredient1);
      return {
        ingredients: parsedData
      };
    }
    catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  },

};

module.exports = CocktailService;