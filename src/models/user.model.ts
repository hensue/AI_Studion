import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
mongoose.connect("mongodb://127.0.0.1:27017/aistudio")

const UserSchema = new Schema({
    fullName: {
        type: String,
        // required: true
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
        // required: true
    },
    company: {
        type: String,
        // required: true
    },
    country:{
        type: String,
        // required: true
    },
    contact: {
        type: Number,
        // required: true,
        default: 0
    },
    billing: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        // required: true
    },
    currentPlan: {
        type: String, 
        // required: true
    },
    avatar: {
        type: String,
        default: "8.png"
    },
    tax_id: {
        type: String,
    },
    language: {
        type: Array<String>,
        // required: true,
        default: [ "English" ]
    },
    status: {
        type: String,
        // required: true,
        default: "pending"
    },
    start_date: {
        type: Date,
        // required: true,
        default: Date.now()
    },
    last_login: {
        type: Date,
        // required: true,
        default: Date.now()
    },
    shipping_address: {
        type: Boolean,
        default: false
    }

})
UserSchema.virtual("id").get(function(){
    return this._id.toString();
})
UserSchema.pre('save', async function(next) {
    this._salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, this._salt)

    next()
})
UserSchema.method('comparePassword', async function(currentPassword: string) {
    const password = bcrypt.hashSync(currentPassword, this._salt);
    return password === this.password;
})
export default mongoose.models.User || mongoose.model("User", UserSchema, "users")