import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import Conversation from "../models/conversation.model.js";
import AppError from '../utils/AppError.js'

export const newConversation = asyncHandler(async (req, res, next) => {
    const { senderId, receiverId } = req.body

    if (!senderId || !receiverId) {
        return next(new AppError('All field is required', 400));
    }



    const exist = await Conversation.findOne({
        members: { $all: [senderId, receiverId] }
    })

    if (exist) {
        return res.status(200).json({success:true ,msg:'conversation already exists'});
    }

    const newConversation = await Conversation.create({
        members: [senderId, receiverId]
    })

    return res.status(200).json({success : true , msg:'conversation saved successfully'})
})


export const getConversation = asyncHandler(async (req, res, next) => {
    const { senderId, receiverId } = req.body
    if (!senderId || !receiverId) {
        return next(new AppError('All field is required', 400));
    }

    const data = await Conversation.findOne({ members: { $all: [receiverId, senderId] } })

    if (!data) {
        return next(new AppError('this conversation does not exist', 400));
    }

    return res.status(200).json({
        success: true,
        data: data
    })
})
