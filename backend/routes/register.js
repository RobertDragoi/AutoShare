const express=require('express');
const { check, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('config');
const User = require('../models/User');
const router=express.Router();
//Inregistrare utilizator
router.post('/',[
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('phone').isString(),
    check('password').isLength({min:6})
],async (req,res)=>{
const validationErrors=validationResult(req)
//Validare date
if(!validationErrors.isEmpty()){
    return res.status(400).json({errors:validationErrors.array()})
}
const {name,email,phone,password,address}=req.body;
try {
    //Verificare existenta utilizator in baza de date
    let user= await User.findOne({email});
    if(user){
        return res.status(400).json({msg:'Acest utilizator exista deja'});
    }
    //Creare utilizator
    user=new User({name,email,phone,password,address});
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(password,salt);
    //Salvare in baza de date
    await user.save();
    //Generate token
    const payload={
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:"1h"},(err,token)=>{
        if(err)throw err;
        res.json(token);
        console.log("Inregistrare reusita");
    })
} catch (error) {
        console.log("Inregistrare nereusita");
        res.status(500).send(`Eroare inregistrare user ${email}!`);
}
})
module.exports=router;