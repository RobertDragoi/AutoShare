const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
//Logare utilizator
router
  .route("/")
  .post(
    [check("email").isEmail().exists(), check("password").exists()],
    async (req, res) => {
      //Validate date
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
      }
      const { email, password } = req.body;
      //Verificare email
      let user = await User.findOne({ email });
      try {
        if (!user) {
          return res.status(400).json({ msg: "Email invalid!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Parola invalida!" });
        }
        const payload = {
          user: {
            id: user.id,
          },
        };
        //Generare token
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: "1h" },
          (err, token) => {
            if (err) throw err;
            console.log("Logare reusita");
            res.json(token);
          }
        );
      } catch (error) {
        console.error(error.message);
        console.log("Logare nereusita");
        res.status(500).send(`Error logging`);
      }
    }
  )
  //Obtinere utilizator logat
  .get(
    async (req, res, next) => {
      //Prelucrare header
      const token = await req.header("x-auth-token");
      const decoded = await jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded.user;
      next();
    },
    async (req, res) => {
      try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Eroare obtinere date utilizator");
      }
    }
  );
module.exports = router;
