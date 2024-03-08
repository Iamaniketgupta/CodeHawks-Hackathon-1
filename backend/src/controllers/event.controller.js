import Event from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadToCloudinary} from '../utils/cloudinary.js'


const createLocalEvent = asyncHandler(async(req,res)=>{
    const userId = req.user?.id;
    
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(400 , "User dotn exist");
    }

    const {title , description , date , location , category} = req.body;
    if(!(title && description && date && location && category)){
        throw new ApiError(400 , "All fields are required");
    }

    const event = await Event.create(
        {
            title,
            description,
            date,
            location,
            category,
            organiser:user._id
        }
    );
    if(!event){
        throw new ApiError(500 , "Something went wrong while creating event");
    }

    return res.status(200).json(
        new ApiResponse(
            200 ,
            event,
            "Event created successfully"
        )
    )
})


export {
    createLocalEvent
}