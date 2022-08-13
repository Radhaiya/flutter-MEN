const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://flutterproject:flutterproject@cluster0.1cjtedo.mongodb.net/Users?retryWrites=true&w=majority').then(response => console.log('Connected to Db'))
    .catch(error => console.log("error :", error))


module.exports=mongoose