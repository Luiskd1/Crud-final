import {Schema, model, models} from "mongoose"



const mongooseUseSchema = new Schema ({
    name: {
        type:String,
        required: [true, 'the name is required'],
        trim: true,
    },
    email: {
        type:String,
        required: [true, 'the email is required'],
        trim: true,
        unique:true,
    },
    type: {
        type:String,
        required: [true, 'the type is required'],
        trim: true,
    },
    gender: {
        type:String,
        required: [true, 'the type is required'],
        trim: true,
    }
},{
    timestamps:true
})

export default models.User || model('User', mongooseUseSchema)