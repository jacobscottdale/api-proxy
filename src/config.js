module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  COCKTAIL_API_URL: process.env.COCKTAIL_API_URL || 'http://www.thecocktaildb.com/api/json/v1/1',
  COKTAIL_API_KEY: process.env.TMDB_API_KEY || '1'
}