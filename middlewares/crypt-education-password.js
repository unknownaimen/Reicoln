import bcrypt from 'bcrypt';
import EducationDepartment from "../models/education-department-model.js";

const hashPasswordIfNeeded = async (education) => {
    if (!education.educationPassword.startsWith('$2b$')) { // Проверка, захеширован ли пароль
        const salt = await bcrypt.genSalt(10);
        education.educationPassword = await bcrypt.hash(education.educationPassword, salt);
        await education.save();
    }
};

const startEducationAdminPasswordHashing = async () => {
    const changeStream = EducationDepartment.watch();

    changeStream.on('change', async (change) => {
        if (change.operationType === 'insert' || change.operationType === 'update') {
            const educationDepartment = await EducationDepartment.findById(change.documentKey._id);
            if (educationDepartment) {
                await hashPasswordIfNeeded(educationDepartment);
            }
        }
    });
};

export default startEducationAdminPasswordHashing;
