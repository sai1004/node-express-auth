const express = require("express");

const router = express.Router();

const authService = require("../Services/AuthService");
// const

router.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/login.html`);
});

router.get("/register", (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});

router.post("/register", authService.register);

module.exports = router;
