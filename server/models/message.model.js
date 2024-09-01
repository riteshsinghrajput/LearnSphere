import { model, Schema } from "mongoose";

const MessageSchema = Schema({
    conversationId:{
        type:String
    },
    senderId:{
        type: String
    },
    receiverId:{
        type:String
    },
    text:{
        type:String
    },
    type:{
        type: String
    }

},{
    timestamps: true
})


const Message = model('messages',MessageSchema);

export default Message;