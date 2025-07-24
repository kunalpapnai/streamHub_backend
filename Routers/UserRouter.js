const express = require("express");
const UserRouter = express.Router();
const {
    getCurrentUser,
    addToWishlist,
    getUserWishlist,
    deleteFromWishlist,
} = require("../Controllers/UserController");
const { protectRouteMiddleWare } = require("../Controllers/AuthController");


UserRouter.use(protectRouteMiddleWare);
UserRouter.get("/wishlist", getUserWishlist);
UserRouter.get("/", getCurrentUser);
UserRouter.post("/wishlist", addToWishlist);
UserRouter.delete("/wishlist", deleteFromWishlist);

module.exports = UserRouter;