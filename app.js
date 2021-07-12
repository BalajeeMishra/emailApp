const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
})
app.post("/send", (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;


    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'bala.123@gmail.com', // generated ethereal user
    //         pass: 'balajee123'  // generated ethereal password
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });
    // let transporter = nodemailer.createTransport({
    //     host: "my.smtp.host",
    //     port: 465,
    //     secure: true, // use TLS
    //     auth: {
    //         user: "bala.123@gmail.com",
    //         pass: "balajee123"
    //     },

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "bdbef7509dca91",
            pass: "c62ed3b74f5d7b"
        },
        tls: {
            rejectUnauthorized: false
        }

    });


    // setup email data with unicode symbols
    let mailOptions = {
        from: '"balajee" <bala.44472@gmail.com>', // sender address
        to: 'balajee.84068@gmail.com', // list of receivers
        subject: 'for you', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('index', { msg: 'Email has been sent' });
    });
});




app.listen(3000, () => {
    console.log("connected");
})
