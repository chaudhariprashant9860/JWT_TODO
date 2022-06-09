const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const create = (req,res,next) => {
   
    
     const {name,password} = req.body
 
     UserModel.create({
         name,
         password
     }, (err,result) => {
         if(err)
         next(err)
         else
         res.status(200).json({
             status: "Success",
             message: "User Added Successfully",
             data: result
         })
     })
 } 



 const login = (req,res,next) => {
    
    UserModel.findOne({name:req.body.name}, (err,result) => {
        if(err){
            next(err)
        }
        else{
            if(bcrypt.compare(req.body.password, result.password)){
                const token = jwt.sign({id:result._id},req.app.get('secretKey'), {expiresIn:'2h'})
                res.json({
                    status:"Login Success",
                    message:"Successfully Logged in",
                    data: {
                        user: result,
                        token: token
                    }
                })
            }
        }
    })
}

module.exports = {create, login}
 