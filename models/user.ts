import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "You have to provide a name"]
    },
    email: {
        type: String,
        required: [true, "You have to provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "You have to provide a password"]
    }
})

export default model('Users', UserSchema);