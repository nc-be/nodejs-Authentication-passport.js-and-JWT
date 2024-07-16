const nodemailer = require("nodemailer");

// Creacion del transporter (Es posible definir datos de user y pass)
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'maymie.okon@ethereal.email',
    pass: 'DZbKk9mU7GSv9f5hFT'
  },
});


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"nc-be" <maymie.okon@ethereal.email>', // sender address
    to: " maymie.okon@ethereal.email", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>NodeJS test - passport 15c</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Link preview del mensaje enviado
}

main()
.catch(console.error);  // Ejecutar el codigo main y atrapan el error en caso de ser necesario
