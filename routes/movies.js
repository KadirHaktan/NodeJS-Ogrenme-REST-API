
const express=require('express')
const movie=require('../model/MovieSchema')

const router=express.Router()
const Movie=require('../model/MovieSchema')

//router.get('/',(req,res,next)=>{
    //res.json({status:1})
//})

router.post('/',(req,res,next)=>{
    const {title,category,country,year,imdb_score,director_id,date}=req.body

    const movie=new Movie(req.body)
    const promise=movie.save()
    promise.then((data)=>{
        res.json(data)

    }).catch((error)=>{
        res.send(error)
    })
})


router.get('/top10/littleToBig',(req,res,next)=>{
    const promise=movie.find({}).limit(10).sort({imdb_Score:1})

    promise.then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.send(error)
    })
})

router.get('/top10/BigToLittle',(req,res,next)=>{
    const promise=movie.find({}).limit(10).sort({imdb_Score:-1})

    promise.then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.send(error)
    })
})

router.get('/between/:start_year/:end_year',(req,res,next)=>{
    const{start_year,end_year}=req.params
    const promise=movie.find(
    {
        year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}
    })

    promise.then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.send(error)
    })
})


router.get('/',(req,res,next)=>{
    const promise=movie.find({})

    promise.then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.send(error)
    })
})

router.get('/:movie_id',(req,res)=>{
    const promise=movie.findById(req.params.movie_id)
    promise.then((data)=>{
       res.json(data)
    }).catch((error)=>{
        res.send(error)
    })
})

router.put('/:movie_id',(req,res)=>{
    const promise=movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true})  
    promise.then((data)=>
    {
        res.json(data)
    }).catch((error)=>{
        res.send(error)
    })
})

router.delete('/:movie_id',(req,res)=>{
    const promise=movie.findByIdAndRemove(req.params.movie_id)

    promise.then(()=>{
        res.json({message:'Remove was successed!!'})
    }).catch((error)=>{
        res.json({message:error})
    })
})





module.exports=router

