//models/faculty-admin-model.js
import mongoose from 'mongoose';

const facultyAdminSchema = new mongoose.Schema({
    facultyName: { type: String, required: true },
    facultyFullName: { type: String, required: true },
    facultyPassword: { type: String, required: true },

}, { collection: 'facultyAdmin' });

const FacultyAdmin = mongoose.model('FacultyAdmin', facultyAdminSchema);

export default FacultyAdmin;
