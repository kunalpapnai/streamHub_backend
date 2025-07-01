const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config(); // env ke variables

/****************db connection*****************/
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ifwh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink)
    .then(function(connection){
        console.log("connected to db");
    }).catch(err => console.log(err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
const corsConfig = {
    origin: true,
    credentials: true,
};
// every route can be used by some other server
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

const AuthRouter = require("./Routers/AuthRouter");
const MovieRouter = require("./Routers/MovieRouter");
const TvShowsRouter = require("./Routers/TvRouter");
const DiscoverRouter = require("./Routers/DiscoverRouter");
const UserRouter = require("./Routers/UserRouter");
const PaymentRouter = require("./Routers/PaymentRouter");
const VideoRouter = require("./Routers/VideoRouter");

app.use("/api/auth", AuthRouter);
app.use("/api/movies", MovieRouter);
app.use("/api/tv", TvShowsRouter);
app.use("/api/discover", DiscoverRouter);
app.use("/api/user", UserRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/video", VideoRouter);

app.use("/", function(req, res){
    console.log("Thank you for making a request");
    res.status(200).send("Hello from server");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log(`server started on port ${PORT}`);
})