const express = require('express')
const router = express.Router();
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')




router.post('/login', (req, res) => {
    res.send("Login Page")
})

router.post('/register', async (req, res) => {

    const userExist = await User.findOne({ Email: req.body.email })

    if (userExist) {
        return res.status(400).send("User Exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({ Name: req.body.name, Email: req.body.email, Password: hashedPass })
    await newUser.save().then(response => res.send("User Regsitered"))
        .catch(error => console.log("error :", error))
})

module.exports = router