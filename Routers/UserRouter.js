const express = require("express");
const UserRouter = express.Router();
const {
    getCurrentUser,
    addToWishlist,
    getUserWishlist,
} = require("../Controllers/UserController");
const { protectRouteMiddleWare } = require("../Controllers/AuthController");


UserRouter.use(protectRouteMiddleWare);
UserRouter.get("/", getCurrentUser);
UserRouter.post("/wishlist", addToWishlist);
UserRouter.get("/wishlist", getUserWishlist);

module.exports = UserRouter;