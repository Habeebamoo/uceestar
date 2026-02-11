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

export const SendOrdersMail = (receiverName, receiverEmail) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        body {
          padding: 15px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .head {
          background-color: rgb(16, 35, 122);
          color: white;
          text-align: center;
          padding: 10px 0;
          border-bottom: 5px solid rgb(187, 175, 9);
          margin-bottom: 5px;
        }

        .head h1 {
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }

        .head p {
          font-family: monospace;
          font-size: 12px;
        }

        .img-cont {
          margin-top: 20px;
          margin-bottom: 40px;
        }

        .img {
          height: 50px;
        }

        h1 {
          font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }

        p {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 18px;
        }

        .text-cont {
          margin-top: 30px;
          margin-bottom: 60px;
        }

        button {
          padding: 15px 20px;
          background-color: rgb(16, 35, 122);
          border: none;
          cursor: pointer;
        }

        a {
          color: white;
          text-decoration: none;
          font-family: sans-serif;
        }
      </style>
    </head>
    <body>
      <div class="head">
        <h1>Uceestar</h1>
        <p>By PJStar Ltd</p>
      </div>
      <h1>Your order has been confirmed.</h1>
      <div class="text-cont">
        <p>Hi ${receiverName},</p>
        <p>Your Order has been confirmed.</p>
        <p>We will pass the order to our delivery department and your packaged will depart soon</p>
        <p>You will be notified by email or phone about your order.</p>
      </div>
      <button>
        <a href="${process.env.CLIENT_URL}/orders">View My Orders</a>
      </button>
    </body>
    </html>
  `

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
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        body {
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          padding: 16px;
        }

        .head-cont {
          background-color: rgb(16, 35, 122);
          padding: 10px;
          color: white;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          margin-bottom: 20px;
          text-align: center;
          border-bottom: 5px solid rgb(187, 175, 9);
        }

        p {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 18px;
        }

        th, td {
          border: 1;
          border: 1px solid black;
          padding: 10px;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          text-align: left;
        }

      </style>
    </head>
    <body>
      <div class="head-cont">
        <h1>New Order</h1>
      </div>
      <p>You've received the following order from ${buyerName}</p>
      <table width="100%" style="border-collapse: collapse; margin-top: 30px;">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>${prdName}</td>
          <td>${quantity}</td>
          <td>&#x20A6; ${price}</td>
        </tr>
      </table>

      <p style="color: rgb(16, 35, 122); font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-weight: bold; margin-top: 50px;">Customer Address</p>

      <table width="100%" style="border-collapse: collapse; margin-top: 30px;">
        <tr>
          <th>State</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
        <tr>
          <td>${city}</td>
          <td>${location}</td>
          <td>${phone}</td>
        </tr>
      </table>

      <p style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; margin-top: 60px; font-size: 16px;">Congratulations on the sale.</p>
      <p style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 16px;">
        <span>Process your orders on the </span>
        <a href="${process.env.CLIENT_URL}/admin/orders">website</a>
      </p>
    </body>
    </html>
  `

  //send mail
  const mailOptions = {
    from: `"Uceestar" <${process.env.EMAIL}>`,
    to: "habeebamoo08@gmail.com",
    subject: `New Order`,
    html
  }

  transporter.sendMail(mailOptions)
}

export const SendOrderDispatchMail = (receiverName, receiverEmail) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        body {
          padding: 15px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .head {
          background-color: rgb(16, 35, 122);
          color: white;
          text-align: center;
          padding: 10px 0;
          border-bottom: 5px solid rgb(187, 175, 9);
          margin-bottom: 40px;
        }

        .head h1 {
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }

        .head p {
          font-family: monospace;
          font-size: 12px;
        }

        .img-cont {
          margin-top: 20px;
          margin-bottom: 40px;
        }

        .img {
          height: 50px;
        }

        h2 {
          font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }

        p {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 18px;
        }

        .text-cont {
          margin-top: 30px;
          margin-bottom: 30px;
        }

        button {
          padding: 15px 20px;
          background-color: rgb(16, 35, 122);
          border: none;
          cursor: pointer;
        }

        a {
          color: white;
          text-decoration: none;
          font-family: sans-serif;
        }
      </style>
    </head>
    <body>
      <div class="head">
        <h1>Uceestar</h1>
        <p>By PJStar Ltd</p>
      </div>

      <h2>We've just shipped your order.</h2>
      
      <div class="text-cont">
        <p>Hi ${receiverName},</p>

        <p>
          This is just a quick update to let you know that your order is now on its way to you. To track your shipment and view it's delivery status, click the link below
        </p>
      </div>

      <button>
        <a href="${process.env.CLIENT_URL}/orders">Track My Orders</a>
      </button>
    </body>
    </html>
  `

  //send mail
  const mailOptions = {
    from: `"Uceestar" <${process.env.EMAIL}>`,
    to: receiverEmail,
    subject: `Your Order is on it's way`,
    html
  }

  transporter.sendMail(mailOptions)
}