import {Schema, model, Types} from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    places: [{type: Types.ObjectId, required: true, ref: 'Place'}]
})
userSchema.plugin(uniqueValidator)

export default model('User', userSchema)
