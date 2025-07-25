const { tmdbApi, TMDB_ENDPOINT } = require("../services/tmdb.services");
 
const getActionTvShows = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/actionTv.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchActionTvShows);
        }

        data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getComedyTvShows = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/comedyTv.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchComedyTvShows);
        }

        data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getMysteryTvShows = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/mysteryTv.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchMysteryTvShows);
        }

        data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getDramaTvShows = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/dramaTv.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchDramaTvShows);
        }

        data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getCrimeTvShows = async (req, res) => {
    try {
        let data;
        if(process.env.NODE_ENV === "development"){
            console.log("seed file");
            data = require("../seed_files/crimeTv.json")
        } else{
            data = await tmdbApi.get(TMDB_ENDPOINT.fetchCrimeTvShows);
        }

        data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getTvShowDetails = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) throw new Error("Video Id is not defined.");
        const details = await tmdbApi.get(TMDB_ENDPOINT.fetchTvShowVideos(id));
        res.status(200).json({
            status: "success",
            data: details,
        });
    } catch (err) {
        console.log('err: ', err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

module.exports = {
    getActionTvShows,
    getComedyTvShows,
    getMysteryTvShows,
    getDramaTvShows,
    getCrimeTvShows,
    getTvShowDetails,
};