import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Team} from '../models/team.model.js'
import {uploadToCloudinary} from '../utils/cloudinary.js'
import { Room } from "../models/room.model.js";
import { Mongoose, mongoose } from "mongoose";

const createTeam = asyncHandler(async(req,res)=>{
    const ownerId = req.user?._id;
    // console.log(req.body)
    const {members, name , description , category} = req.body;
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
        throw new ApiError(500 , "Something went wrong while creating team");
    }

    team.members.push(createdBy._id)
    await team.save();

    const room = await Room.create(
        {
            name:team.name + " Chatroom",
            members:[...team.members],
            team:team._id
        }
    )


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
    
    const {members} = req.body;
    const {teamId} = req.params;
    const ownerId = req.user?._id;

    if(!(members && teamId)){
        throw new ApiError(400 , "All fields are required");
    }

    const team = await Team.findById(teamId);
    if(!team){
        throw new ApiError(400 , "Team dont exist");
    }

    team.members.push(...members);
    await team.save();

    const includeAll  = includesAllElements(team.members , members);
    if(!includeAll){
        throw new ApiError(500 , "Something went worng... members are not included in the db");
    }

    const room = await Room.find(
        {
            team:team._id
        }
    );

    if(!room){
        throw new ApiError("Room dont exist with this team id");
    }

    room.members.push(...members);
    await room.save();


    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Members added successfully"
        )
    )
})

const addOneMember = asyncHandler(async(req,res) =>{
    
    const {teamId , member} = req.params;
    const ownerId = req.user?._id;

    if(!(member && teamId)){
        throw new ApiError(400 , "All fields are required");
    }

    const team = await Team.findById(teamId);
    if(!team){
        throw new ApiError(400 , "Team dont exist");
    }

    // if(team.createdBy !== ownerId){
    //     throw new ApiError(400 , "This team doesnt belong to the user");
    // }

    team.members.forEach(element => {
        if(element.equals(member)) {
            throw new ApiError(400 , "Member is already in the team");
        }
    });


    team.members.push(member);
    await team.save();

    const room = await Room.find(
        {
            team:team._id
        }
    );

    if(!room){
        throw new ApiError("Room dont exist with this team id");
    }

    room.members.push(member);
    await room.save();


    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Members added successfully"
        )
    )
    
})
const removeMember = asyncHandler(async (req, res) => {
    const { teamId, member } = req.params;
    const ownerId = req.user?._id;

    if (!(member && teamId)) {
        throw new ApiError(400, "All fields are required");
    }

    const team = await Team.findById(teamId);
    if (!team) {
        throw new ApiError(400, "Team doesn't exist");
    }

    // Uncomment and modify this check if you want to restrict removal to the team owner
    // if (team.createdBy !== ownerId) {
    //     throw new ApiError(403, "You don't have permission to remove members");
    // }

    const memberIndex = team.members.findIndex((element) => element.equals(member));

    // if (memberIndex === -1 && team.createdBy !== member) {
    //     throw new ApiError(400, "User is not a member of the team");
    // }

    if(team.createdBy.equals(member)){
        await Team.findByIdAndDelete(team._id)
        return res.json(
            200 , 
            {},
            "removed successfully"
        )
    }

    team.members.splice(memberIndex, 1);
    console.log(team.members)
    await team.save();

    // const room = await Room.findOne({ team: team._id });

    // if (!room) {
    //     throw new ApiError(400, "Room not found");
    // }

    // room.members.splice(memberIndex, 1);
    // await room.save();

    return res.status(200).json(
        new ApiResponse(200, { user: "unda" }, "Member removed successfully")
    );
});

const getRoomByTeamId = asyncHandler(async(req,res)=>{
    const {teamId} = req.params;
    if(!teamId){
        throw new ApiError(400 , "Team Id is required");
    }
    console.log(typeof teamId)

    const teamIdObject = new mongoose.Types.ObjectId(teamId);
    const team = await Team.findById(teamIdObject);
    
    if(!team){
        throw new ApiError(400 , "Team dont exist");
    }

    const room = await Room.findOne(
        {
            team : team._id
        }
    );

    if(!room){
        throw new ApiError(500 , "Something went wrong while fetchinf room from the database");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            room,
            "Romm data fetched succesfully"
        )
    )
})

const getAllTeams  = asyncHandler(async(req,res)=>{
    const allTeams = await Team.find({}).populate({
        path: "createdBy",
        select: "fullName email" // Add other fields you want to include, excluding the password
    });
    if(!allTeams){
        throw new ApiError(500 , "Error while fetching all teams");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            allTeams,
            "All teams fetched successfully"
        )
    )
})


const getMyTeams = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    
    const teams = await Team.find({
        $or: [
            { createdBy: userId },                       // User is the creator of the team
            { members: { $in: [userId] } }               // User is a member of the team
        ]
    }).populate({
        path: "createdBy",
        select: "fullName email" // Add other fields you want to include, excluding the password
    });

    if(!teams){
        throw new ApiError(500 , "Error while fetching teams");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            teams,
            "My teams fetched successfully"
        )
    )
})


// const getRoomByTeamId = asyncHandler(async(req,res)=>{
//     const {teamId} = req.params;
//     id
// })

const getTextByRoomId = asyncHandler(async(req,res)=>{
    const {roomId} = req.params;
    if(!roomId){
        throw new ApiError(400 , "required")
    }

    const room = await Room.findById(roomId);
    return res.status(200).json(
        new ApiResponse(
            200 ,
            room.messages,
            "sucesss"
        )
    )
})

const addMessageByRoomId = asyncHandler(async(req,res)=>{
    const {roomId} = req.params;
    const {text} = req.body;
    const userId = req.user._id;
    if(!roomId){
        throw new ApiError(400 , "required")
    }

    const room = await Room.findById(roomId);
    const obj = {
        user : userId,
        text
    }
    room.messages.push(obj);
    await room.save();
    return res.status(200).json(
        new ApiResponse(
            200 ,
            room.messages,
            "sucesss"
        )
    )
})

export {
    createTeam,
    findTeam,
    addMembers,
    removeMember,
    addOneMember,
    getRoomByTeamId,
    getAllTeams,
    getMyTeams,
    getTextByRoomId,
    addMessageByRoomId
}
