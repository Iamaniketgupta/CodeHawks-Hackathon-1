import dotenv from 'dotenv';
import {app} from './app.js'
import connectDB from "./src/db/index.js";

dotenv.config({
    path:'./.env'
})


const port = 8000;
connectDB()
.then(()=>{
    app.listen(port || 8000 , ()=>{
        console.log(`Server started at port ${port}`)
    }) 
})
.catch((err)=>{
    console.log("Mongodb connection failed :: " , err)
})