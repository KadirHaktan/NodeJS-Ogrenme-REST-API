

const mongoose=require('mongoose')

module.exports=()=>{
mongoose.connect('mongodb://localhost/Movie-API')
mongoose.connection.on('open',()=>{
    console.log("MongoDB:Conncected")
})
mongoose.connection.on('error',(error)=>{
    console.log(error)
})

 mongoose.Promise=global.Promise
}