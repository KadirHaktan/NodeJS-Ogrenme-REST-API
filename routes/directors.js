
const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')

const Director=require('../model/DirectorSchema')


router.get('/',(req,res)=>{
    const promise = Director.aggregate([
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'director_id',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);
   promise.then((data)=>{
       res.json(data)
   }).catch((error)=>{
       res.send(error)
   })
})

router.get('/:director_id',(req,res)=>{
    const promise = Director.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.director_id)
            }
        },

		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'director_id',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);
   promise.then((data)=>{
       res.json(data)
   }).catch((error)=>{
       res.send(error)
   })
})


router.post('/',(req,res)=>{
    const director=new Director(req.body)

    const promise=director.save()
    promise.then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.send(error)
    })
})

router.put('/:director_id',(req,res)=>{
    const promise=Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true})

    promise.then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.send(error)
    })
})

router.delete('/:director_id',(req,res)=>{

    const promise=Director.findByIdAndRemove(req.params.director_id)

    promise.then(()=>{
        res.json({message:'Remove was successed'})
    }).catch((error)=>{
        res.send(error)
    })
})

module.exports=router