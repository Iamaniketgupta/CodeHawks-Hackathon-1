import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Team} from '../models/team.model.js'
import {uploadToCloudinary} from '../utils/cloudinary.js'

const createTeam = asyncHandler(async(req,res)=>{
    const ownerId = req.user?._id;
    console.log(req.body)
    const {members , name , description , category} = req.body;
    if(!(name && category)){
        throw new ApiError(400 , "All fields are required");
    }
    if(!ownerId){
        throw new ApiError(400 , "User dont exist");
    }

    const createdBy  = await User.findById(ownerId);


    const team = await Team.create(
        {
            name,
            description,
            members,
            createdBy:createdBy._id,
            category
        }
    )

    if(!team){
        throw new ApiError(500 , "SOmething went wrong while creating team");
    }

    team.members.push(createdBy._id)


    return res.status(200).json(
        new ApiResponse(
            200,
            team,
            "Team created successfully"
        )
    )

})

const findTeam = asyncHandler(async (req, res) => {
    const { searchQuery } = req.query;
    // console.log(searchQuery)
  
    if (!searchQuery) {
      throw new ApiError(400, "No input provided");
    }
  
    // Creating a case-insensitive regex pattern for the search query
    const regexPattern = new RegExp(`.*${searchQuery}.*`, 'i');
    // console.log(regexPattern)
  
    // Searching teams whose names match the regex pattern
    const teams = await Team.find({ name: regexPattern });
  
    if (!teams) {
      throw new ApiError(500, "Something went wrong while fetching teams");
    }
  
    return res.status(200).json(
      new ApiResponse(
        200,
        teams,
        "Teams fetched successfully"
      )
    );
  });


const addMembers = asyncHandler(async(req,res) =>{
    // complete it later
})
  

export {
    createTeam,
    findTeam
}
