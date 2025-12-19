import nodemailer from "nodemailer";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";

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

export const SendOrdersMail = (receiverName, receiverEmail) => {
  //read templates
  const templatesPath = path.join(process.cwd(), "templates", "orderMail.html")
  let html = fs.readFileSync(templatesPath, "utf-8")

  //variables
  const data = {
    name: receiverName,
    url: `${process.env.CLIENT_URL}/orders`
  }

  //manual replacement
  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, "g");
    html = html.replace(regex, data[key])
  }

  //send mail
  const mailOptions = {
    from: `"Uceestar" <${process.env.EMAIL}>`,
    to: receiverEmail,
    subject: `Order Confirmed`,
    html
  }

  transporter.sendMail(mailOptions)
}

export const NotifyNewOrders = (buyerName, prdName, quantity, price, city, location, phone) => {
//read templates
  const templatesPath = path.join(process.cwd(), "templates", "orderNotifier.html")
  let html = fs.readFileSync(templatesPath, "utf-8")

  //variables
  const data = {
    name: buyerName,
    productName: prdName,
    quantity: quantity,
    price: price,
    city: city,
    location: location,
    phone: phone,
    url: `${process.env.CLIENT_URL}/admin/orders`
  }

  //manual replacement
  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, "g");
    html = html.replace(regex, data[key])
  }

  //send mail
  const mailOptions = {
    from: `"Uceestar" <${process.env.EMAIL}>`,
    to: "habeebamoo08@gmail.com",
    subject: `New Order`,
    html
  }

  transporter.sendMail(mailOptions)
}