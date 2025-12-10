import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

export const SendWelcomeMail = (receiverName, receiverEmail) => {
  const template = `

  `;
  
  const mailOptions = {
    from: `"Uceestar" <${process.env.EMAIL}>`,
    to: receiverEmail,
    subject: `Welcome ${receiverName}`,

  }

  transporter.sendMail(mailOptions)
}

export const NotifyNewUser = () => {

}

export const SendOrdersMail = () => {

}

export const NotifyNewOrders = () => {

}