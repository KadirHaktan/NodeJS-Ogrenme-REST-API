const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>
{
   const token=req.headers['x-access-token']||req.body.token||req.query.token

   if(!token){
       res.json({
           status:false,
           message:'No token provided'
       })
   }else{
       jwt.verify(token,req.app.get('api_secret_key'),(error,decode)=>{
          if(error){
              res.json({
                  status:false,
                  message:'Fail to authenticated'
              })
          }else{
              req.decode=decode
              next()
          }
       })
   }
}