

const mongoose=require('mongoose')

const Schema=mongoose.Schema

const directorSchema=new Schema
(
    {
        name:{
            type:String,
            required:true
        },

        surname:String,
        bio:String,
    }
)

module.exports=mongoose.model('Director',directorSchema)