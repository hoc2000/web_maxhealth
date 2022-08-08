require('dotenv').config();
// import { reject } from 'lodash';
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    //create reuseable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 456, false for other ports
        auth: {
            user: process.env.EMAIL_APP,  //create ethereal user
            pass: process.env.EMAIL_APP_PASSWORD,  //create ethereal password
        }, tls: {
            rejectUnauthorized: false
        }
    });

    //send mail with define transport object
    let info = await transporter.sendMail({
        from: '"✉ Max Health Medical App ✉" <vutuhoc@gmail.com>',
        to: dataSend.receiverEmail,
        subject: "Thông tin đặt lịch khám bệnh tại Max Health",
        html: emailContentHTML(dataSend),

    });
}

let emailContentHTML = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
       <h3> Xin chào, ${dataSend.patientName} ! </h3>
       <p> Đây là email gửi từ Max Health khi bạn đặt lịch khám bệnh online trên ứng dụng của chúng tôi. </p>
       <p> Thông tin về lịch đặt khám của bạn: </p>
       <div> <b>Thời gian: ${dataSend.time}</b>. </div>
       <div> <b>Bác sĩ: ${dataSend.doctorName}</b>. </div>
       
       <p>Nếu như những thông tin phía trên là chính xác vui lòng click vào đường link phía bên dưới
       để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh. Chúng tôi sẽ liên hệ lại với bạn qua số điện thoại:
       <b>${dataSend.phoneNumber}</b> sau khi xác nhận 
       </p>
       <div>
        <a href=${dataSend.redirectLink} target=_"blank" >Click Here</a>
       </div>
       <div> Max Health xin chân thành cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi! </div>
       `
    }
    if (dataSend.language === 'en') {
        result =
            `
       <h3> Dear, ${dataSend.patientName} ! </h3>
       <p> This is an email from Max Health when you book an online medical appointment on our app. </p>
       <p> Your's booking information: </p>
       <div> <b>Time: ${dataSend.time}</b>. </div>
       <div> <b>Doctor: ${dataSend.doctorName}</b>. </div>
       
       <p>
       If the information above is correct, please click on the link below
              to confirm and complete the procedure to book a medical appointment. We will contact you soon 
              by this phone number ${dataSend.phoneNumber}
       </p>
       <div>
        <a href=${dataSend.redirectLink} target=_"blank" >Click Here</a>
       </div>
       <div> Max Health would like to sincerely thank you for trusting and choosing us! </div>
       `
    }

    return result
}

let getHTMLemailRemedy = (dataSend) => {
    let result = ''

    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào, ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này sau khi đã hoàn thành đặt lịch khám bệnh online từ hệ thống chăm sóc sức khỏe Max Health.</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>
        <h3>Max Health xin chân thành cảm ơn quý khách !</h3>
        `
    }

    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear, ${dataSend.patientName}!</h3>
        <p>You have received this email after completing the online appointment booking from the Max Health operating system.</p>
        <p>Prescription/invoice information is sent in the attached file.</p>
        <h3>Max Health sincerely thank you!</h3>
        `
    }

    return result
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 456, false for other ports
                auth: {
                    user: process.env.EMAIL_APP,  //create ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD,  //create ethereal password
                }, tls: {
                    rejectUnauthorized: false
                }
            });

            let info = await transporter.sendMail({
                from: '"✉ Max Health Medical App ✉" <maxhealthmedical2021@gmail.com>',
                to: dataSend.email,
                subject: "Kết quả khám bệnh tại Max Health",
                html: getHTMLemailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split('base64,')[1],
                        encoding: 'base64'
                    },
                ],
            })



            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
}