const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
contactNumber:{
    type:String,
    required:true
},
password:{
type:String,
required:true
},
walletBalance: {
    type: Number,
    default: 0,
},
})

module.exports=mongoose.model('users',userSchema)