const router = require("express").Router();
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middlewares/auth.middleware.js")

const {
  register,

  login,
} = require("../controllers/auth.controller");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authMiddleware.isAuthenticated, authController.logout);

router.get("/get-me", authMiddleware.isAuthenticated, authController.getMe);




module.exports = router;
