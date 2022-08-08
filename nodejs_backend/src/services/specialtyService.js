const { reject } = require("lodash")
const db = require("../models")

let createSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkDown) {
                resolve({
                    code: 1,
                    message: 'Missing param !'
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkDown: data.descriptionMarkDown
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

let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({

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

let getDetailSpecialtyByIdService = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    code: 1,
                    message: 'Missing param !'
                })
            }
            else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkDown'],
                })

                if (data) {
                    let doctorSpecialty = []
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId'],
                        })

                    } else {
                        //find by loation
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty;
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
    createSpecialtyService: createSpecialtyService,
    getAllSpecialtyService: getAllSpecialtyService,
    getDetailSpecialtyByIdService: getDetailSpecialtyByIdService
}