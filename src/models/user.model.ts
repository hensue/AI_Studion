import mongoose, { Schema } from "mongoose"

mongoose.connect("mongodb+srv://StartupSphere:Freelancer123-@startupsphere.gr5qamc.mongodb.net");

const UserSchema = new Schema({
    fullName: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    _salt: {
        type: String,
    },
    company: {
        type: String,
    },
    country:{
        type: String,
    },
    contact: {
        type: Number,
        default: 0
    },
    billing: {
        type: String,
    },
    role: {
        type: String,
    },
    currentPlan: {
        type: String, 
    },
    avatar: {
        type: String,
        default: "8.png"
    },
    tax_id: {
        type: String,
    },
    language: {
        type: Array<string>,
        default: [ "English" ]
    },
    status: {
        type: String,
        default: "pending"
    },
    start_date: {
        type: Date,
        default: Date.now()
    },
    last_login: {
        type: Date,
        default: Date.now()
    },
    shipping_address: {
        type: Boolean,
        default: false
    }

})

export default mongoose.models.User || mongoose.model("User", UserSchema, "users")
