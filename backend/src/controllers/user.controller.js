import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const exampleFunc = asyncHandler(async(req,res)=>{

    const data = "something";

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "data fetched successfully"
        )
    )
})

export {
    exampleFunc
}