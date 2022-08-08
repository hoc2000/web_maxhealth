const db = require("../models")

let createClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64
                || !data.descriptionHTML || !data.descriptionMarkDown) {
                resolve({
                    code: 1,
                    message: 'Missing param !'
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkDown
                })

                resolve({
                    code: 0,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({

            })
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }

            resolve({
                code: 0,
                message: 'OK',
                data
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailClinicByIdService = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    code: 1,
                    message: 'Missing param !'
                })
            }
            else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkDown'],
                })

                if (data) {
                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    })

                    data.doctorClinic = doctorClinic;
                } else data = {}

                resolve({
                    code: 0,
                    message: "OK",
                    data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    createClinicService: createClinicService,
    getDetailClinicByIdService: getDetailClinicByIdService,
    getAllClinicService: getAllClinicService
}