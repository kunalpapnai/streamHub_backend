const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config(); // env ke variables

/****************db connection*****************/
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ifwh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink)
    .then(function(connection){
        console.log("connected to db");
    }).catch(err => console.log(err));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

const corsConfig = {
    origin: true,
    credentials: true,
};

// middlewares
// every route can be used by some other server
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(expressMongoSanitize());
app.use(helmet());


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