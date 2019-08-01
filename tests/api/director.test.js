
const chai=require('chai')
const chai_http=require('chai-http')

const server=require('../../app')

const should=chai.should()


chai.use(chai_http)

let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkFsaXp5IiwiaWF0IjoxNTYzNTI0OTYzLCJleHAiOjE1NjM1MjY0MDN9.VFQtyUd8CX0dKnth_marHH7KatOcBmJ5UPIUMnsjdK0"


describe('Control to Authenicated',()=>{
    before((done)=>{
        chai.request(server)
        .post('/Authenication')
        .send({UserName:"Alizy",Password:"a1a2"})
        .end((err,res)=>{
            res.body.token=token
            done()
        })
    })
})

describe('GET All Director',()=>{
    it('it should be work',(done)=>{
        chai.request(server)
        .get('/api/directors')
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            done()
        })
    })
})


describe("Add new Director",()=>{
    it("it should be work",(done)=>{
        
        chai.request(server)
        .post('/api/directors')
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200)
            done()
        })
    })
})

describe("Delete director",()=>{

})