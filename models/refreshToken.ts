import { Schema, model } from 'mongoose';

const RefreshTokenSchema = new Schema({
    userId: {
        type: String,
        required: [true, "You have to provide a valid id"]
    },
    token: {
        type: String,
        required: [true, "You have to provide a valid token"],
        unique: true
    }
});

export default model('RefreshToken', RefreshTokenSchema);