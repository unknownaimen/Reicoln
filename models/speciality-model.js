import mongoose from 'mongoose';

// Схема предмета
const subjectSchema = new mongoose.Schema({
    LessonName: { type: String, required: true }
    // Добавить другие поля здесь в будущем
},{_id:false});

// Схема семестра
const semesterSchema = new mongoose.Schema({
    semesterNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 1 && value <= 9;
            },
            message: 'Semester number must be between 1 and 9'
        }
    },
    subjects: [subjectSchema]
},{_id:false});

// Схема специальности
export const specialitySchema = new mongoose.Schema({
    specialityNumber: { type: Number, required: true, unique: true },
    specialityName: { type: String, required: true },
    specialityFacultyName:{type: String,required:true},
    semesters: [semesterSchema]
},{collection:'specialties'});

// Создание модели Speciality
const Speciality = mongoose.model('Speciality', specialitySchema);

// Экспорт модели Speciality
export default Speciality;