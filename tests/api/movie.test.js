
const mocha = require('mocha')
const chai = require('chai')
const chai_http = require('chai-http')





const should = chai.should()

const server_app = require('../../app')
const config = require('../../config')

let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkFsaXp5IiwiaWF0IjoxNTYzNTI3NjYyLCJleHAiOjE1NjM1MjkxMDJ9.Ex1Ui95xn4zMnA4GowGi7mHHTDhJKfGHciPut3tD64c"

let movie_id


chai.use(chai_http)


describe('Authenicated Test', () => {
    before((done) => {
        chai.request(server_app)
            .post('/Authenication')
            .send({ UserName: "Alizy", Password: "a1a2" })
            .end((err, res) => {
                res.body.token=token
                done()
            })
    })
})

describe('Get All Movie Test',()=>{
    it('It should be work!!!',(done)=>{
       chai.request(server_app)
       .get('/api/movies/')
       .set('x-access-token',token)
       .end((err,res)=>{
           res.should.have.status(200)
           done()
       })
    })
})

describe('Add new Movie Test',()=>{
    it('It should be adding',(done)=>{
        const movie=
        {
           title:'Guardians of the Galaxy',
           category:'macera-bilim kurgu',
           country:'USA',
           year:2014,
           imdb_Score:8.1
        }

        chai.request(server_app)
        .post('/api/movies/')
        .send(movie)
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            //res.should.be.a('object')
           /* res.should.have.property('title')
            res.should.have.property('category')
            res.should.have.property('country')
            res.should.have.property('year')
            res.should.have.property('imdb_Score')
            res.should.have.property('director_id')*/

            movie_id=res.body._id
            done()

        })
    })
})


describe('Update to Movie Data',()=>{
    it('It should be updating',(done)=>{
        const movie=
        {
            _id:"5d2dc381c7baaf4810642f7a",
            title:"Yaz Çiçekleri",
            category:"Romantik-komedi",
            year:2001,
            country:"İrlanda",
            imdb_Score:8.3
        }

        chai.request(server_app)
        .put('/api/movies/ ',movie_id)
        .send(movie)
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            movie_id=res.body._id
            done()
        })
    })
})


describe('Delete to Movie Data',()=>{
    it('It should be deleting',(done)=>{
        chai.request(server_app)
        .delete('/api/movies/ ',movie_id)
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            movie_id=res.body._id
            done()
        })
    })
})






