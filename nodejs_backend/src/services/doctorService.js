import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import emailService from '../services/emailService'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcodes, as: 'positionData', attributes: ['valueEN', 'valueVI'] },
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEN', 'valueVI'] }
                ],
                raw: true,
                nest: true
            })



            resolve({
                code: 0,
                data: users
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })

            resolve({
                code: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}

let checkRequiredFields = (inputData) => {
    let arrFields = ['doctorId', 'contentHTML', 'contentMarkdown', 'action',
        'selectedPrice', 'selectedPayment', 'selectedProvince', 'nameClinic',
        'addressClinic', 'note', 'specialtyId'
    ]

    let isValid = true
    let element = ''
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false
            element = arrFields[i]
            break
        }
    }

    return {
        isValid: isValid,
        element: element
    }
}

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObj = checkRequiredFields(inputData)
            if (checkObj.isValid === false) {
                resolve({
                    code: 1,
                    Message: `Missing parameter: ${checkObj.element}`
                })
            } else {
                //upsert to markdown
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.updateAt = new Date();
                        await doctorMarkdown.save()
                    }
                }
                //upsert to doctor_info
                let doctorInfor = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    },
                    raw: false
                })

                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = inputData.doctorId
                    doctorInfor.priceId = inputData.selectedPrice
                    doctorInfor.provinceId = inputData.selectedProvince
                    doctorInfor.paymentId = inputData.selectedPayment
                    doctorInfor.nameClinic = inputData.nameClinic
                    doctorInfor.addressClinic = inputData.addressClinic
                    doctorInfor.note = inputData.note
                    doctorInfor.specialtyId = inputData.specialtyId
                    doctorInfor.clinicId = inputData.clinicId

                    await doctorInfor.save()
                } else {
                    //create
                    await db.Doctor_Info.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId

                    })
                }

                resolve({
                    code: 0,
                    Message: 'Save info doctor success!!'
                })
            }


        } catch (error) {
            reject(error)
        }
        // try {
        //    let CheckObj = checkRequiredFields(inputData)
        //    if(CheckObj.isValid === false){
        //        resolve({
        //             code: 1,
        //             message: `Missing parameter: ${CheckObj.element}`
        //         })
        //    } else {

        //         //upsert to Markdown
        //         if (inputData.action === 'CREATE') {
        //             await db.Markdown.create({
        //                 contentHTML: inputData.contentHTML,
        //                 contentMarkdown: inputData.contentMarkdown,
        //                 description: inputData.description,
        //                 doctorId: inputData.doctorId
        //             })
        //         } else if (inputData.action === 'EDIT') {
        //             let doctorMarkdown = await db.Markdown.findOne({
        //                 where: { doctorId: inputData.doctorId },
        //                 raw: false
        //             })

        //             if (doctorMarkdown) {
        //                 doctorMarkdown.contentHTML = inputData.contentHTML,
        //                     doctorMarkdown.contentMarkdown = inputData.contentMarkdown,
        //                     doctorMarkdown.description = inputData.description,

        //                     await doctorMarkdown.save()
        //             }

        //         }

        //         //upsert to doctor_info
        //         let doctorInfor = await db.Doctor_Info.findOne({
        //             where: {
        //                 doctorId: inputData.doctorId
        //             },
        //             raw: false
        //         })

        //         if (doctorInfor) {
        //             //update
        //             doctorInfor.doctorId = inputData.doctorId
        //             doctorInfor.priceId = inputData.selectedPrice
        //             doctorInfor.provinceId = inputData.selectedProvince
        //             doctorInfor.paymentId = inputData.selectedPayment
        //             doctorInfor.nameClinic = inputData.nameClinic
        //             doctorInfor.addressClinic = inputData.addressClinic
        //             doctorInfor.note = inputData.note
        //             doctorInfor.specialtyId = inputData.specialtyId
        //             doctorInfor.clinicId = inputData.clinicId
        //             await doctorInfor.save()
        //         } else {
        //             //create
        //             await db.Doctor_Info.create({
        //                 doctorId: inputData.doctorId,
        //                 priceId: inputData.selectedPrice,
        //                 provinceId: inputData.selectedProvince,
        //                 paymentId: inputData.selectedPayment,
        //                 nameClinic: inputData.nameClinic,
        //                 addressClinic: inputData.addressClinic,
        //                 note: inputData.note,
        //                 specialtyId: inputData.specialtyId,
        //                 clinicId: inputData.clinicId
        //             })
        //         }
        //         resolve({
        //             code: 0,
        //             message: 'Save infor successful'
        //         })
        //     }

        // } catch (error) {
        //     reject(error)
        // }

    })
}

let getDetailDoctorIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    code: 1,
                    message: 'Missing parameter'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },

                        { model: db.Allcodes, as: 'positionData', attributes: ['valueEN', 'valueVI'] },

                        {
                            model: db.Doctor_Info,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEN', 'valueVI'] },
                                { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEN', 'valueVI'] },
                                { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEN', 'valueVI'] },
                            ]

                        },
                    ],
                    raw: false,
                    nest: true,
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) {
                    data = {}
                }

                resolve({
                    code: 0,
                    data: data
                })

            }
        } catch (error) {
            reject(error)
        }
    })
}

let bulkCreateScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    code: 1,
                    message: 'Missing param !'
                })
            } else {
                let schedule = data.arrSchedule
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item
                    })
                }


                // console.log('Check data send: ', schedule);

                //Validate các bản ghi trước khi cập nhật vào database

                //Get những bản ghi đã tồn tại trong db
                let existing = await db.Schedule.findAll(
                    {
                        where: { doctorId: data.doctorId, date: data.formatedDate },
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                        raw: true
                    });




                //Compare các bản ghi đã có trong db với dữ liệu truyển lên  => tránh lưu trùng lặp
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date
                })

                //Tìm ra ản ghi khác biệt => tạo bản ghi
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }

                // console.log('Check cretae: ', toCreate);
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

let getScheduleByDateService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(doctorId)
            // console.log(date)
            if (!doctorId || !date) {
                resolve({
                    code: 1,
                    message: 'Missing param'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcodes, as: 'timeTypeData', attributes: ['valueEN', 'valueVI'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
                    ],
                    raw: false,
                    nest: true
                })

                if (!dataSchedule) dataSchedule = []

                resolve({
                    code: 0,
                    data: dataSchedule
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getExtraInforDoctorByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    code: 1,
                    message: 'Missing param'
                })
            } else {
                let data = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: inputId
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEN', 'valueVI'] },
                        { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEN', 'valueVI'] },
                        { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEN', 'valueVI'] },
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) data = {}
                resolve({
                    code: 0,
                    data: data
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}

let getProfileDoctorByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    code: 1,
                    message: 'Missing param'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {
                            model: db.Allcodes,
                            as: 'positionData',
                            attributes: ['valueVI', 'valueEN']
                        },
                        {
                            model: db.Doctor_Info,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEN', 'valueVI'] },
                                { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEN', 'valueVI'] },
                                { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEN', 'valueVI'] },
                            ],
                            raw: false,
                            nest: true
                        },

                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }

                if (!data) data = {}

                resolve({
                    code: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getListPatientForDoctorService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    code: 1,
                    message: 'Missing param'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address', 'phoneNumber', 'gender'],
                            include: [
                                {
                                    model: db.Allcodes, as: 'genderData', attributes: ['valueEN', 'valueVI']
                                }
                            ]
                        },
                        {
                            model: db.Allcodes, as: 'timeTypeDataPatient', attributes: ['valueEN', 'valueVI']
                        }
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    code: 0,
                    message: 'OK',
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let sendRemedyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    code: 1,
                    message: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S3';
                    await appointment.save()
                }

                //send email remedy
                await emailService.sendAttachment(data);

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

module.exports = {
    getTopDoctorHomeService: getTopDoctorHomeService,
    getAllDoctorService: getAllDoctorService,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorIdService: getDetailDoctorIdService,
    bulkCreateScheduleService: bulkCreateScheduleService,
    getScheduleByDateService: getScheduleByDateService,
    getExtraInforDoctorByIdService: getExtraInforDoctorByIdService,
    getProfileDoctorByIdService: getProfileDoctorByIdService,
    checkRequiredFields: checkRequiredFields,
    getListPatientForDoctorService: getListPatientForDoctorService,
    sendRemedyService: sendRemedyService
}