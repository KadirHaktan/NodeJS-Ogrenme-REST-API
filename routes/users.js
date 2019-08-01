const express = require('express');
const router = express.Router();
const User = require('../model/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




router.post('/register', function (req, res, next) {

  const { UserName, Password } = req.body
  bcrypt.hash(Password, saltRounds = 10)
    .then((hash) => {

      const user = new User({
        UserName: UserName,
        Password: hash
      })

      const promise = user.save()
      promise.then((data) => {
        res.json(data)
      }).catch((err) => {
        res.send(err)
      })
    })


});

router.post('/Authenication', (req, res) => {
  const { UserName, Password } = req.body

  User.findOne({ UserName }, (error, user) => {
    if (error) {
      throw error
    }

    if (!user) {
      res.json({
        status: false,
        message: 'Authenication fail,user not found'
      })

    } else {
      bcrypt.compare(Password, user.Password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Authenication fail,wrong password'
          })
        } else {
          const payload = { UserName }
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 1440
          })
          res.json({ status: true, token })
        }
      })
    }

  })
})




module.exports = router;
