const {mongoose}=require('mongoose');

const userSchenma=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});
const User=mongoose.model('User',userSchenma);

module.exports=User;