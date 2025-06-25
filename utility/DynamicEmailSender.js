const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
const fs = require("fs");


async function updateTemplateHelper(templatePath, toReplaceObject) {
    // 1. Read the file content at the given path
    let templateContent = await fs.promises.readFile(templatePath, "utf-8");

    // 2. Get keys from the replacement object
    const keyArrs = Object.keys(toReplaceObject);

    // 3. Replace placeholders like #{key} with actual values
    keyArrs.forEach((key) => {
        templateContent = templateContent.replace(`#{${key}}`, toReplaceObject[key]);
    })
    
    // 4. Return the updated content
    return templateContent;
}

async function emailSender(templatePath, recieverEmail, toReplaceObject) {
    try {
        const content = await updateTemplateHelper(templatePath, toReplaceObject);
        // thorugh which service you have to send the mail 
        const sendGridDetails = {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.GMAIL_APP_PASSWORD,
            }
        }

        const msg = {
            to: recieverEmail,
            from: process.env.EMAIL_ID, // Change to your verified sender
            subject: 'Sending First Email',
            text: "",
            html: content,
        }

        const transporter = nodemailer.createTransport(sendGridDetails);
        await transporter.sendMail(msg);
    } catch (err) {
        console.log("email not send because of the error", err);
    }
}

module.exports = emailSender;