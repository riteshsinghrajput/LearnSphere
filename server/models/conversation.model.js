

import { model, Schema } from "mongoose";

const conversationSchema  = Schema({
    members:{
        type: Array
    },  
    message:{
        type: String
    }
},{
    timestamps: true
})

const Conversation = model('conversation',conversationSchema);

export default  Conversation