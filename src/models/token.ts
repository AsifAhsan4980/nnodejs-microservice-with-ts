import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: [true, "Please provide a product name"],
    }
},{
    timestamps: true
})


const Token = mongoose.model("blacklist", TokenSchema)

export default Token