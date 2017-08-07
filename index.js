var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 3000;
var nodemailer = require('nodemailer');
var axios = require('axios');
var app = express();
var corsOptions = {origin: '*'};
var config = require('./config.js')

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

app.post('/api/form', (req, res) => {
  console.log(req.body)
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.email,
        pass: config.password
    }
  })
  let mailOptions = {

      from: req.body.email,
      to: config.email,
      subject: "New message from " + req.body.name,
      text: req.body.message,
      html: '<b>' + req.body.message + '</b><p>Phone: ' + req.body.phone + '</p><p>Email: ' + req.body.email +'</p>'
  }

    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return res.status(500).json(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      return res.status(200).json(info)
  });


});


app.listen(port, function() {
  console.log('listening on port ' + port)
})
