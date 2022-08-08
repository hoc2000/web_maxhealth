import clinicService from '../services/clinicService'

let createClinic = async (req, res) => {
    try {
        let infor = await clinicService.createClinicService(req.body)
        return res.status(200).json(infor)
    } catch (error) {
        console.log('ERROR: ', error);
        return res.status(200).json({
            code: -1,
            message: 'Error from server...'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinicService()
        return res.status(200).json(infor)
    } catch (error) {
        console.log('ERROR: ', error);
        return res.status(200).json({
            code: -1,
            message: 'Error from server...'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicByIdService(req.query.id)
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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}