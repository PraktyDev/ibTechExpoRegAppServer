import mongoose from "mongoose";

const attendeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    course: {
        type: String,
        required: true,
        enum: ["Cyber Security", "Data Analysis", "Frontend Development", "Backend Development", "Fullstack Development", "UIUX Design"]
    },
},{ timestamps: true });

const Attendee = mongoose.model("Attendee", attendeeSchema);

export default Attendee;