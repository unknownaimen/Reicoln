import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/student-model.js';
import FacultyAdmin from '../models/faculty-admin-model.js';
import EducationDepartment from '../models/education-department-model.js';

const loginController = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        let user = null;

        // Если identifier является числом, проверяем как студента
        if (!isNaN(identifier)) {
            user = await Student.findOne({ studentNumber: identifier });
            if (user) {
                const validPassword = await bcrypt.compare(password, user.studentPassword);
                if (!validPassword) {
                    return res.status(400).json({ message: 'Invalid password.' });
                }

                const token = jwt.sign(
                    { _id: user._id, studentNumber: user.studentNumber },
                    process.env.JWT_ACCESS_SECRET,
                    { expiresIn: '30d' }
                );
                return res.json({ token, role: "student" });
            }
        } else {
            // Если identifier не число, проверяем как админа факультета
            user = await FacultyAdmin.findOne({ facultyName: identifier });
            if (user) {
                const validPassword = await bcrypt.compare(password, user.facultyPassword);
                if (!validPassword) {
                    return res.status(400).json({ message: 'Invalid password.' });
                }

                const token = jwt.sign(
                    { _id: user._id, facultyName: user.facultyName },
                    process.env.JWT_ACCESS_SECRET,
                    { expiresIn: '1d' }
                );
                return res.json({ token, role: "faculty" });
            }

            // Если не найден как админ, проверяем как департамент образования
            user = await EducationDepartment.findOne({ educationName: identifier });
            if (user) {
                const validPassword = await bcrypt.compare(password, user.educationPassword);
                if (!validPassword) {
                    return res.status(400).json({ message: 'Invalid password.' });
                }

                const token = jwt.sign(
                    { _id: user._id, educationName: user.educationName },
                    process.env.JWT_ACCESS_SECRET,
                    { expiresIn: '1d' }
                );
                return res.json({ token, role: "education" });
            }
        }

        // Если ни один из логинов не сработал
        return res.status(400).json({ message: 'Invalid credentials.' });

    } catch (error) {
        console.error('Server error', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export default loginController;
