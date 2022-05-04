const config = require('../config');
const axios = require('axios');

axios.defaults.baseURL = config.COCKTAIL_API_URL;

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

const CocktailService = {
  async searchByName(drinkName) {
    try {
      const res = await axios.get(`/search.php?s=${drinkName}`);

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

  async searchByIngredient(ingredientName) {
    try {
      const res = await axios.get(`/filter.php?i=${ingredientName}`);

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

      let parsedData = res.data.drinks.map(drink => {
        
        let tags = drink.strTags.split(',');
        let ingredients = [];
        let measure = [];
        console.log(drink['strIngredient' + 1])
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
          alcholic: drink.strAlcoholic,
          ingredients: ingredients,
          measure: measure,
        };
      });
      console.log(parsedData)
      return {
        drinks: parsedData
      };
    }
    catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  },
};

module.exports = CocktailService;