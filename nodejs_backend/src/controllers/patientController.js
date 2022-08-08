import patientService from '../services/patientService'

//Lấy thông tin form đăng kí
let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointmentService(req.body)
        return res.status(200).json(infor)
    } catch (error) {
        console.log('ERROR: ', error);
        return res.status(200).json({
            code: -1,
            message: 'Error from server...'
        })
    }
}
let postVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookAppointmentService(req.body)
        return res.status(200).json(infor)
    } catch (error) {
        console.log('ERROR: ', error);
        return res.status(200).json({
            code: -1,
            message: 'Error from server...'
        })
    }
}



module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
}