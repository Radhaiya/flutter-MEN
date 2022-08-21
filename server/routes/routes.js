const express = require('express')
const router = express.Router();
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')




router.post('/logi', async (req, res) => {

    const userExist = await User.findOne({ Email: req.body.email })

    if (!userExist) {
        return res.status(400).send("User Doesnt Exist")
    }

    const validpass = await bcrypt.compare(req.body.password, userExist.Password)

    if (!validpass) {
        return res.status(400).send("Invalid Password")
    }

    res.send("Login Success")
})



router.post('/register', async (req, res) => {

    const userExist = await User.findOne({ Email: req.body.email })

    if (userExist) {
        return res.status(400).send("User Exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({ Name: req.body.name, Email: req.body.email, Password: hashedPass })
   
    await newUser.save().then(() => res.send("User Regsitered"))
        .catch(error => console.log("error :", error))
})

module.exports = router