const mongoose = require('mongoose');
const config=require('config');
const db=config.get('mongoURI');
const ConnectDataBase=async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology: true
            
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
   
}
module.exports=ConnectDataBase