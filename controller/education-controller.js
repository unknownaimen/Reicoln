import Speciality from "../models/speciality-model.js";
import EducationDepartment from "../models/education-department-model.js";


class EducationController {

    async educationLogin(req, res) {
        const {educationName, educationPassword} = req.body;

        try{
            const education = await EducationDepartment.findOne({educationName});
            if (!educationName) return res.status(400).json({ message: 'Invalid Education name.' });
        }
        catch (error){
          console.log('error')
        }
    }

    async getSpecialties(req, res) {
        try {
            // Получаем все специальности из базы данных
            const specialties = await Speciality.find().lean();

            console.log('Полученные специальности:', specialties); // Отладочное сообщение

            // Инициализируем объект для хранения отсортированных данных
            const sortedData = {
                MUH: [],
                MTP: [],
                OPA: [],
                TELECOM: [],
                ART: [],
                SYD: []
            };

            // Обрабатываем каждую специальность
            specialties.forEach(speciality => {
                const facultyName = speciality.specialityFacultyName;
                console.log('Обрабатываем специальность:', speciality); // Отладочное сообщение
                if (sortedData[facultyName]) {
                    sortedData[facultyName].push(speciality.specialityName);
                } else {
                    console.warn(`Неизвестное значение facultyName: ${facultyName}`); // Отладочное сообщение
                }
            });

            console.log('Отсортированные данные:', sortedData); // Отладочное сообщение

            // Отправляем отсортированные данные клиенту
            res.json(sortedData);
        } catch (error) {
            console.error('Ошибка сервера:', error);
            res.status(500).json({message: "Ошибка сервера"});
        }
    }

    async getSpecialityDetails(req, res) {
        try {
            const specialityName = req.params.specialityName;
            const speciality = await Speciality.findOne({specialityName}).lean();

            if (speciality) {
                res.json(speciality);
            } else {
                res.status(404).json({message: 'Speciality not found'});
            }
        } catch (error) {
            console.error('Ошибка сервера:', error);
            res.status(500).json({message: "Ошибка сервера"});
        }
    }


}

const educationController = new EducationController();
export default educationController;
