const nodemailer = require("nodemailer");

// Creacion del transporter (Es posible definir datos de user y pass)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "nc.betest@gmail.com",
    pass: "gloagymcfsasmfnt",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"nc-be" <maddison53@ethereal.email>', // sender address
    to: "nc.betest@gmail.com", // list of receivers
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
