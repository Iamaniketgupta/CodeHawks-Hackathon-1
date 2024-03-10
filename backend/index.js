import dotenv from 'dotenv';
import {app} from './app.js'
import connectDB from "./src/db/index.js";
import http from 'http';
import cors from 'cors'
import {Server} from 'socket.io';
import { Room } from './src/models/room.model.js';
const server = http.createServer(app);
const io = new Server(server);

dotenv.config({
    path:'./.env'
})




const port = 8000;
connectDB()
.then(()=>{
    server.listen(port || 8000 , ()=>{
        console.log(`Server started at port ${port}`)
    }) 
})
.catch((err)=>{
    console.log("Mongodb connection failed :: " , err)
})