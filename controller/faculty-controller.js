import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import FacultyAdmin from "../models/faculty-admin-model.js";
import {MuhGroup, MtpGroup, OpaGroup, TelecomGroup, ArtGroup, SydGroup} from '../models/group-model.js';


class FacultyController {

    async facultyLogin(req, res) {
        const { facultyName, facultyPassword } = req.body;
        try {
            const facultyAdmin = await FacultyAdmin.findOne({facultyName});
            if (!facultyAdmin) return res.status(400).json({ message: 'Invalid faculty name.' });

            // Проверка на наличие пароля в базе данных
            if (!facultyAdmin.facultyPassword) {
                return res.status(400).json({ message: 'Password not set for this faculty.' });
            }

            const validPassword = await bcrypt.compare(facultyPassword, facultyAdmin.facultyPassword);
            if (!validPassword) return res.status(400).json({ message: 'Invalid faculty password.' });

            const token = jwt.sign({ _id: facultyAdmin._id, facultyName: facultyAdmin.facultyName }, process.env.JWT_SECRET, { expiresIn: '1d' });

            res.json({ token });
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: 'Something went wrong.' });
        }
    }



    async getGroups(req, res) {
        const {facultyName} = req.admin; // Имя коллекции извлекается из токена
        console.log(`Fetching groups for faculty: ${facultyName}`);
        const groupCollections = {
            MUH: MuhGroup, MTP: MtpGroup, OPA: OpaGroup, Telecom: TelecomGroup, ART: ArtGroup, SYD: SydGroup
        };
        const Group = groupCollections[facultyName.toUpperCase()];
        if (!Group) {
            return res.status(400).json({message: 'Invalid faculty name in token.'});
        }
        try {
            const groups = await Group.find({}, 'groupName currentCourse');
            res.json(groups); // Отправить краткую информацию о группах
        } catch (error) {
            console.error('Error fetching groups:', error);
            res.status(500).json({message: 'Something went wrong.'});
        }

    }

    async getGroupById(req, res) {
        const {facultyName} = req.admin;
        const {id} = req.params;
        const groupCollections = {
            MUH: MuhGroup, MTP: MtpGroup, OPA: OpaGroup, Telecom: TelecomGroup, ART: ArtGroup, SYD: SydGroup
        };

        const Group = groupCollections[facultyName.toUpperCase()];
        if (!Group) {
            return res.status(400).json({ message: 'Invalid faculty name in token.' });
        }
        try {
            const group = await Group.findById(id);
            if (!group) {
                return res.status(404).json({ message: 'Group not found.' });
            }
            res.json(group); // Отправить полную информацию о группе
        } catch (error) {
            console.error('Error fetching group by ID:', error);
            res.status(500).json({ message: 'Something went wrong.' });
        }
    }




}

const facultyController = new FacultyController();
export default facultyController;