
import mongoose, { Schema, Types } from "mongoose";


const noteSchema = new Schema({
    title : {
        type: String,
        required: true,
        validate : {
            validator : function (value) {
                return value !== value.toUpperCase()
            }
        }
    },
    content : {
        type: String,
        required : true
    },
    userId :{
        type : Types.ObjectId,
        required : true,
        ref : "user"
    },


},{timestamps : true})

export const noteModel =mongoose.model("note" , noteSchema)