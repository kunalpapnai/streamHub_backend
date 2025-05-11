const express = require("express");

const {loginHandler, signupHandler, forgotPasswordHandler, resetPasswordHandler, logoutController} = require("../Controllers/AuthController");

const AuthRouter = express.Router();

AuthRouter.post("/login", loginHandler);
AuthRouter.post("/signup", signupHandler);
AuthRouter.patch("/forgotPassword", forgotPasswordHandler);
AuthRouter.patch("/resetPassword", resetPasswordHandler);
AuthRouter.get("/logout", logoutController);

module.exports = AuthRouter;