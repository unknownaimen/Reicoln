import bcrypt from 'bcrypt';
import FacultyAdmin from '../models/faculty-admin-model.js'

const hashPasswordIfNeeded = async (admin) => {
    if (!admin.facultyPassword.startsWith('$2b$')) { // Проверка, захеширован ли пароль
        const salt = await bcrypt.genSalt(10);
        admin.facultyPassword = await bcrypt.hash(admin.facultyPassword, salt);
        await admin.save();
    }
};

const startAdminPasswordHashing = async () => {
    try {
        const changeStream = FacultyAdmin.watch();

        changeStream.on('change', async (change) => {
            console.log('Change detected:', change); // Добавьте этот лог для отладки
            if (change.operationType === 'insert' || change.operationType === 'update') {
                try {
                    const facultyAdmin = await FacultyAdmin.findById(change.documentKey._id);
                    if (facultyAdmin) {
                        console.log('Admin found:', facultyAdmin); // Отладка
                        await hashPasswordIfNeeded(facultyAdmin);
                        console.log('Password hashed successfully for:', facultyAdmin.facultyName); // Отладка
                    }
                } catch (err) {
                    console.error('Error during password hashing:', err);
                }
            }
        });


    } catch (err) {
        console.error('Error starting change stream:', err);
    }
};
export default startAdminPasswordHashing;
