import mongoose, { Schema } from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/aistudio")

const RoleSchema = new Schema({
    roleName: {
        type: String,
        required: true
    },
    permission: {
        type: Array,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

})

export default mongoose.models.Role || mongoose.model("Role", RoleSchema, "roles")