const express = require("express");
const {
    getUpcoming,
    getTopRated,
    getTrending,
    getNowPlaying,
    getSearchResult,
} = require("../Controllers/DiscoverController.js");
 
const DiscoverRouter = express.Router();
DiscoverRouter.get("/now-playing", getNowPlaying);
DiscoverRouter.get("/trending", getTrending);
DiscoverRouter.get("/upcoming", getUpcoming);
DiscoverRouter.get("/top-rated", getTopRated);
DiscoverRouter.get("/explore", getSearchResult);

module.exports = DiscoverRouter;