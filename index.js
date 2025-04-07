import { createTransport } from "nodemailer";
import twilio from "twilio";

async function sendSMS() {
  const { ACCOUNT_SID, AUTH_TOKEN, FROM, TO } = process.env;
  try {
    const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

    const message = await client?.messages?.create({
      body: "Hi from Frotadores de 💡 - Pago procesado con éxito.",
      from: FROM,
      to: TO,
    });

    if (message?.errorMessage) {
      return {
        data: {
          sms: null,
        },
        error: message?.errorMessage,
      };
    }

    return {
      data: {
        sms: "OK",
      },
      error: null,
    };
  } catch (error) {
    console.log(error);
  }
}

//sendSMS().then((res) => console.log(res))

async function sendWhatsApp() {
  const { ACCOUNT_SID, AUTH_TOKEN, FROM_WHATSAPP, TO_WHATSAPP, CONTENT_SID } =
    process.env;
  try {
    const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);
    console.log({
      from: FROM_WHATSAPP,
      contentSid: CONTENT_SID,
      contentVariables: '{"1":"409173"}',
      to: TO_WHATSAPP,
    });
    const message = await client?.messages?.create({
      from: FROM_WHATSAPP,
      contentSid: CONTENT_SID,
      contentVariables: '{"1":"409173"}',
      to: TO_WHATSAPP,
    });

    if (message?.errorMessage) {
      return {
        data: {
          sms: null,
        },
        error: message?.errorMessage,
      };
    }

    return {
      data: {
        sms: "OK",
      },
      error: null,
    };
  } catch (error) {
    console.log(error);
  }
}

//sendWhatsApp().then((res) => console.log(res))

//Esto debe ir en utils o la carpeta de config

const transporter = createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS,
  },
});

async function sendEmail() {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: "destinatario@example.com",
    subject: "Correo desde los frotadores de 💡",
    text: "Tu pago ha sido realizado con exito",
  };

  try {
    const information = await transporter.sendMail(mailOptions)
    console.log('Correo enviado: ' + information.response);
  } catch (error) {
    console.error(error);
  }
}


sendEmail().then((res) => console.log(res))