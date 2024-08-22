import express from 'express';
import facultyController from "../controller/faculty-controller.js";
import educationController from "../controller/education-controller.js";
import authenticateToken from "../middlewares/auth-middleware.js";
import studentController from "../controller/student-controller.js";

const router = express.Router();

// Объединенный маршрут логина
router.post('/faculty-login',facultyController.facultyLogin);
router.post('/student-login',studentController.studentLogin);
router.post('/education-login',educationController.educationLogin);
// Остальные маршруты остаются без изменений
router.get('/groups', authenticateToken, facultyController.getGroups);
router.get('/getGroupInfo/:id', authenticateToken, facultyController.getGroupById);

router.get('/getSpecialties', educationController.getSpecialties);
router.get('/getSpecialityDetails/:specialityName', educationController.getSpecialityDetails);


export default router;