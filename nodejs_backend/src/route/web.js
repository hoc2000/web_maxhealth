import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController'
import specialtyController from '../controllers/specialtyController'
import clinicController from '../controllers/clinicController'

let router = express.Router();
//app la 1 cai server ung dung
let initWebRoutes = (app) => {
	router.get('/', homeController.getHomePage);
	router.get('/about', homeController.getAboutPage);
	router.get('/crud', homeController.getCRUD);

	router.post('/post-crud', homeController.postCRUD);
	router.get('/get-crud', homeController.displayGetCRUD);
	router.get('/edit-crud', homeController.getEditCRUD);
	router.post('/put-crud', homeController.putCRUD);
	router.get('/delete-crud', homeController.deleteCRUD);

	//các API
	router.post('/api/login', userController.handleLogin);
	router.get('/api/get-all-users', userController.handleGetAllUsers);
	router.post('/api/create-user', userController.handleCreateUser);
	router.put('/api/edit-user', userController.handleEditUser);
	router.delete('/api/delete-user', userController.handleDeleteUser);

	router.get('/api/allcodes', userController.getAllCode);

	//doctor routes
	router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
	router.get('/api/get-all-doctor', doctorController.getAllDoctors);
	router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
	router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
	//schedule for doctor route
	router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
	router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
	router.get(`/api/get-extra-infor-doctor-by-id`, doctorController.getExtraInforDoctorById)
	router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)
	router.get(`/api/get-list-patient-for-doctor`, doctorController.getListPatientForDoctor)
	router.post(`/api/send-remedy`, doctorController.sendRemedy)

	//patient route
	router.post('/api/patient-booking-appointment', patientController.postBookAppointment)
	router.post('/api/verify-booking-appointment', patientController.postVerifyBookAppointment)

	//specialty
	router.post('/api/create-new-specialty', specialtyController.createSpecialty)
	router.get('/api/get-specialty', specialtyController.getAllSpecialty)
	router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById)

	//clinic
	router.post('/api/create-new-clinic', clinicController.createClinic)
	router.get('/api/get-clinic', clinicController.getAllClinic)
	router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById)

	//rest api
	return app.use('/', router);





};
//de su dung ham tren
module.exports = initWebRoutes;
