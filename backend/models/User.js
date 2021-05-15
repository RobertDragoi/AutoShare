const mongoose=require('mongoose');
const UserSchema = mongoose.Schema({
    name:{type:String,
        required:true},
    email:{type:String,
        required:true,
        lowercase: true,
        unique:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,default:"Nespecificata"},
    date:{type:Date,default:Date.now}

})

module.exports=mongoose.model("User",UserSchema);