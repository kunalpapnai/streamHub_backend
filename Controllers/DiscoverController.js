const { tmdbApi, TMDB_ENDPOINT } = require("../services/tmdb.services");
 
const getNowPlaying = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/nowPlaying.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchNowPlaying);
        }
        
        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        //console.log("12",err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getTrending = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/trending.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchTrending);
        }

        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        //console.log("29",err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getTopRated = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/topRated.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchTopRated);
        }

        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        //console.log("46",err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getUpcoming = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/upcoming.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchUpcoming);
        }

        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        //console.log("63",err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getSearchResult = async (req, res) => {
  try {
    const { search_query } = req.query;
    const data = await tmdbApi.get(TMDB_ENDPOINT.fetchSearchQuery(search_query));
    res.status(200).json({
      status: "success",
      data: data.results,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
}

module.exports = {
    getNowPlaying,
    getTrending,
    getTopRated,
    getUpcoming,
    getSearchResult,
};