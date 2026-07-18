const express = require("express");

const authRouter = express.Router();

const authController = require("../controllers/auth.Controllers");

const authMiddleware = require("../middleware/auth.middleware");


/**
 * @route /api/auth/register  POST
 * @description register new user  user
 */

authRouter.post("/register", authController.registerUserController);

/**
 * @route /api/auth/login POST
 * @description login user
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route /api/auth/logout POST
 * @description clear token user from cookie and add to blacklist 
 */

authRouter.get("/logout", authController.logoutUserController);

/**
 * @route /api/auth/get-me
 * @description get the user data from token and send into response 
 * @access private 
 */

authRouter.get("/get-me", authMiddleware, authController.getMeController)

module.exports = authRouter;
