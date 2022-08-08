import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

//build verify booking url in Email
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let postBookAppointmentService = (data) => {
    // console.log(data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName || !data.selectedGender || !data.address || !data.phoneNumber
            ) {
                resolve({
                    code: 1,
                    message: 'Missing param !'
                })
            } else {
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    phoneNumber: data.phoneNumber,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })


                //upsert patient 
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
                        phoneNumber: data.phoneNumber

                    },
                });

                //create a booling record
                // console.log(user[0]);
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token

                        }

                    })
                }
                resolve({
                    code: 0,
                    message: 'Save infor for patient successful'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let postVerifyBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    code: 1,
                    message: 'Missing param !'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();

                    resolve({
                        code: 0,
                        message: 'Update appointment status success'
                    })
                } else {
                    resolve({
                        code: 2,
                        message: 'Apponitment has been activated or does not exist'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    postBookAppointmentService: postBookAppointmentService,
    postVerifyBookAppointmentService: postVerifyBookAppointmentService
}