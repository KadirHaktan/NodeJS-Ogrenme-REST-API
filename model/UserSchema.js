

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        UserName: {
            type: String,
            minlength: 5,
            maxlength: 20,
            required: true,
            unique:true
        },

        Password:
        {
            type: String,
            minlength: 8
        }
    }
)

module.exports=mongoose.model("users",UserSchema)