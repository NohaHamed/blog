
const express = require("express");

//install bcrypt to deal with password: npm install --save bcrypt
const bcrypt = require("bcrypt");
//token
const jwt = require("jsonwebtoken")
const User = require('../models/user');

const router = express.Router();

router.post("/signup", (req, res, next) => {
// 10 is the maximum no of digits to use
//bcrypt crypts the password only and saves it as hash
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
    });
    user.save()
        .then(result =>{
            res.status(201).json({
                message: 'User Created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

    })
});
// For webtoken: npm install --save jsonwebtoken
router.post("/login", (req, res, next) => {
    //we used fetchedUSEr to be able to access in 2 then blocks
    let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
