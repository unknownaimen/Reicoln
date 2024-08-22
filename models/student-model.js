import mongoose, {Schema, model} from "mongoose";

import {specialitySchema} from './speciality-model.js'

const StudentSchema = new Schema({
    studentName:{type:String,required:true},
    studentNumber: {type: Number, unique: true, required: true},
    studentPassword: {type: String, required: true},
    facultyName: {type: String, required: true},
    specialityNumber:{type:Number,required:true},
    currentCourse: {type: Number, required: true},
    currentSemester: {type: Number, required: true},
    groupName: {type: String, required: true},
    groupNumber:{type:Number,required:true},
    speciality: specialitySchema,

},{collection:'students'})

const Student = mongoose.model('Student', StudentSchema);

export default Student;
