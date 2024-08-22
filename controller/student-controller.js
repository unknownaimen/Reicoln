import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from "../models/student-model.js";

class StudentController{

 async studentLogin(req,res){
     const { studentNumber, studentPassword } = req.body;

     try {
         const student = await Student.findOne({ studentNumber });
         if (!student) return res.status(400).send('Invalid studentNumber.');

         const validPassword = await bcrypt.compare(studentPassword, student.studentPassword);
         if (!validPassword) return res.status(400).send('Invalid password.');

         const token = jwt.sign({ _id: student._id, studentNumber: student.studentNumber }, process.env.JWT_SECRET, { expiresIn: '1d' });
         res.send({ token });
     } catch (error) {
         res.status(500).send('Something went wrong.');
     }
 }

}
const studentController = new StudentController();
export default studentController;
