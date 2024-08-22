//models/group.js
import mongoose from 'mongoose';

const createGroupSchema = (collectionName) => {

    const subjectSchema = new mongoose.Schema({
        LessonName: { type: String, required: true },
        LessonType: { type: String, enum: ['lecture', 'practical', 'lab'], required: true },
        lessonNumber: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0 && value <= 4;
                },
                message: 'Lesson number must be between 0 and 4'
            }
        }
    },{ _id: false });

    const scheduleSchema = new mongoose.Schema({
        numerator: {
            monday: [subjectSchema],
            tuesday: [subjectSchema],
            wednesday: [subjectSchema],
            thursday: [subjectSchema],
            friday: [subjectSchema],
            saturday: [subjectSchema]
        },
        denominator: {
            monday: [subjectSchema],
            tuesday: [subjectSchema],
            wednesday: [subjectSchema],
            thursday: [subjectSchema],
            friday: [subjectSchema],
            saturday: [subjectSchema]
        }
    }, { _id: false });

    const groupSchema = new mongoose.Schema({
        groupNumber: { type: Number, required: true },
        specialityNumber: { type: Number, required: true },
        groupName: { type: String, required: true },
        facultyName: { type: String, required: true },
        currentCourse: { type: Number, required: true },
        currentSemester: { type: Number, required: true },
        students: [{
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
            studentName: { type: String, required: true }
        }],
        scheduleLessons: scheduleSchema,

    }, { collection: collectionName });

    return groupSchema;
};

const MuhGroup = mongoose.model('MuhGroup', createGroupSchema('MUH'));
const MtpGroup = mongoose.model('MtpGroup', createGroupSchema('MTP'));
const OpaGroup = mongoose.model('OpaGroup', createGroupSchema('OPA'));
const TelecomGroup = mongoose.model('TelecomGroup', createGroupSchema('Telecom'));
const ArtGroup = mongoose.model('ArtGroup', createGroupSchema('ART'));
const SydGroup = mongoose.model('SydGroup', createGroupSchema('SYD'));

export { MuhGroup, MtpGroup, OpaGroup, TelecomGroup, ArtGroup, SydGroup };
