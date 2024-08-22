import mongoose from 'mongoose';

const EducationDepartmentSchema = new mongoose.Schema({
    educationName: { type: String, required: true },
    educationPassword: { type: String, required: true },

}, { collection: 'EducationDepartment' })

const EducationDepartment = mongoose.model('EducationDepartment',EducationDepartmentSchema);

export default EducationDepartment;