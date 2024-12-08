const http=require('http')
const express=require('express')
require('dotenv').config()
const dbInfo=require('./dbConfig/dbConfig')
const userRoute=require('./router/userRoute')
const spotRoute=require('./router/parkSpot')
const walletRoute =require('./router/updateWallet')
var cors=require('cors')

const app=express();
app.use(cors())
app.use(express.json())

app.use('/api/user',userRoute)
app.use('/api/spot',spotRoute)
app.use('/api/wallet',walletRoute)

app.listen('9087',()=>{
    console.log("Server have started!")
})

app.get('/', (req,res)=>{
    res.send("Server have started here")
})