import bcrypt from 'bcrypt';
import Student from "../models/student-model.js";

const hashPasswordIfNeeded = async (student) => {
    if (!student.studentPassword.startsWith('$2b$')) { // Проверка, захеширован ли пароль
        const salt = await bcrypt.genSalt(10);
        student.studentPassword = await bcrypt.hash(student.studentPassword, salt);
        await student.save();
    }
};

const startStudentPasswordHashing = async () => {
    const changeStream = Student.watch();

    changeStream.on('change', async (change) => {
        if (change.operationType === 'insert' || change.operationType === 'update') {
            const students = await Student.findById(change.documentKey._id);
            if (students) {
                await hashPasswordIfNeeded(students);
            }
        }
    });
};

export default startStudentPasswordHashing;
