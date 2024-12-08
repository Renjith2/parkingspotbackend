const mongoose=require('mongoose')
const spotSchema= new mongoose.Schema({
spotID:{
    type:String,
    required:true
},
vehicleType:{
    type:String,
    required:true
},
status:{
type:String,
required:true
},
charge:{
    type:String,
    required:true
    }
})

module.exports=mongoose.model('parkingSpots',spotSchema)