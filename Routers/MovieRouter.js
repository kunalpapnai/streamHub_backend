const express = require("express");
const {getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getMovieDetails,
    getRomanceMovies,
    getAnimeMovies} = require("../Controllers/MovieController");
const MoviesRouter = express.Router();

MoviesRouter.get("/action", getActionMovies);
MoviesRouter.get("/comedy", getComedyMovies);
MoviesRouter.get("/horror", getHorrorMovies);
MoviesRouter.get("/romance", getRomanceMovies);
MoviesRouter.get("/anime", getAnimeMovies);
MoviesRouter.get("/details", getMovieDetails);

module.exports = MoviesRouter;