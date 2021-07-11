const fs = require('fs')
const cors = require('cors')
const crypto = require('crypto')
const express = require('express')
const request = require('request')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

function sha256 (data) {
  return crypto.createHash('sha256').update(data).digest('hex')
}

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public/build'))

global.txn = ''
global.token = ''

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test@test.com', // Enter Email-ID for newsletter on  the website.
    pass: 'password' // Enter password for newsletter on  the website.
  }
})

contactEmail.verify(error => {
  if (error) {
    console.log(error)
  } else {
    console.log('Ready to Send')
  }
})

app.post('/', (req, res) => {
  const email = req.body.email
  const mail = {
    from: 'anonymous',
    to: 'test@test.com',
    subject: 'Contact Form Submission',
    html: `<p>Email: ${email}</p>`
  }
  contactEmail.sendMail(mail, error => {
    if (error) {
      res.json({ status: 'ERROR' })
    } else {
      res.json({ status: 'Message Sent' })
    }
  })
})

// GOVT. HOSPITAL CONNECTION

conn1 = mongoose.createConnection('DBURL1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// PVT. HOSPITAL CONNECTION

conn2 = mongoose.createConnection('DBURL2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// SERVICE CONNECTION

conn3 = mongoose.createConnection('DBURL3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// COMPLAINTS CONNECTION

conn4 = mongoose.createConnection('DBURL4', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const dataSchema = new mongoose.Schema({
  District: String,
  Name: String,
  Vacant: Number,
  Address: String,
  PhoneNumber: String
})

const pvtSchema = new mongoose.Schema({
  Name: String,
  PhoneNumber: String,
  HospName: String,
  Description: String,
  DateAdded: String,
  TimeAdded: String,
  District: String
})

const serviceSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  service: String,
  district: String,
  date: String,
  homeDelivery: String,
  bloodGroup: String,
  dateOfRecovery: String,
  description: String
})

const complaintSchema = new mongoose.Schema({
  Name: String,
  PhoneNumber: String,
  DateAdded: String,
  Description: String
})

// GET REQUEST FOR STATE -> GOVT. HOSPITAL

app.get('/hospital/:state', (req, res) => {
  const State = conn1.model(req.params.state, dataSchema)

  State.find().sort({ Vacant: -1 }).exec((err, foundData) => {
    if (err) {
      console.log(err)
    } else {
      res.send(foundData)
    }
  })
})

// GET REQUEST FOR STATE -> PVT. HOSPITAL

app.get('/private/:state', (req, res) => {
  const State = conn2.model(req.params.state, pvtSchema)

  State.find().sort({ _id: -1 }).exec((err, foundData) => {
    if (err) {
      console.log(err)
    } else {
      res.send(foundData)
    }
  })
})

// POST REQUEST FOR STATE -> PVT. HOSPITAL

app.post('/private/:state', (req, res) => {
  const State = conn2.model(req.params.state, pvtSchema)

  const newData = new State({
    Name: req.body.Name,
    PhoneNumber: req.body.PhoneNumber,
    HospName: req.body.HospName,
    Description: req.body.Description,
    DateAdded: req.body.DateAdded,
    TimeAdded: req.body.TimeAdded,
    District: req.body.District
  })

  newData.save(err => {
    if (err) {
      console.log(err)
    } else {
      res.send('Successfully added new data.')
    }
  })
})

// GET REQUEST FOR STATE -> ALL SERVICE

app.get('/service/:state', function (req, res) {
  const State = conn3.model(req.params.state, serviceSchema)

  State.find().sort({ _id: -1 }).exec((err, foundData) => {
    if (err) {
      console.log(err)
    } else {
      res.send(foundData)
    }
  })
})

// GET REQUEST FOR STATE -> SPECIFIC SERVICE

app.get('/service/:state/:service', function (req, res) {
  const State = conn3.model(req.params.state, serviceSchema)

  State.find({ service: req.params.service })
		.sort({ _id: -1 })
		.exec((err, foundData) => {
  if (err) {
    console.log(err)
  } else {
    res.send(foundData)
  }
})
})

// POST REQUEST FOR STATE -> ALL SERVICE

app.post('/service/:state', function (req, res) {
  const State = conn3.model(req.params.state, serviceSchema)

  const newData = new State({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    service: req.body.service,
    district: req.body.district,
    date: req.body.date,
    homeDelivery: req.body.homeDelivery,
    bloodGroup: req.body.bloodGroup,
    dateOfRecovery: req.body.dateOfRecovery,
    description: req.body.description
  })

  newData.save(err => {
    if (err) {
      console.log(err)
    } else {
      res.send('Successfully added new data.')
    }
  })
})

// GET REQUEST FOR COMPLAINTS

app.get('/complaints', (req, res) => {
  const Complaint = conn4.model('complaint', complaintSchema)
  Complaint.find({}, (err, foundData) => {
    if (err) {
      console.log(err)
    } else {
      res.send(foundData)
    }
  })
})

// POST REQUEST FOR COMPLAINTS

app.post('/complaints', (req, res) => {
  const Complaint = conn4.model('complaint', complaintSchema)

  const newComplaint = new Complaint({
    Name: req.body.Name,
    PhoneNumber: req.body.PhoneNumber,
    DateAdded: req.body.DateAdded,
    Description: req.body.Description
  })

  newComplaint.save(err => {
    if (err) {
      console.log(err)
    } else {
      res.send('Successfully added new data.')
    }
  })
})

// GET REQUEST FOR OTP

app.get('/genOTP/:num', (req, res) => {
  let num = req.params.num
  var options = {
    method: 'POST',
    url: 'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mobile: `${num}`
    })
  }
  request(options, (error, response) => {
    if (error) {
      console.log(error)
    } else {
      if (response.body != 'OTP Already Sent') {
        txn = JSON.parse(response.body)['txnId']
        res.send(response.body)
      } else {
        res.send('Try again later.')
      }
    }
  })
})

// GET REQUEST FOR CONFIRMATION OF OTP

app.get('/conOTP/:otp', (req, res) => {
  let otp = sha256(req.params.otp)
  var options = {
    method: 'POST',
    url: 'https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      otp: `${otp}`,
      txnId: `${txn}`
    })
  }
  request(options, (error, response) => {
    if (error) {
      console.log(error)
    } else {
      token = JSON.parse(response.body)['token']
      res.send(response.body)
    }
  })
})

// GET REQUEST FOR VACCINE CERTIFICATE

app.get('/getCert/:beneficid', (req, res) => {
  let beneficid = req.params.beneficid
  var options = {
    method: 'GET',
    url:
			'https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=' +
			beneficid,
    encoding: 'binary',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  request(options, (error, response, body) => {
    var file = 'vaccine_certificate_' + beneficid + '.pdf'
    fs.writeFile(file, body, 'binary', err => {
      if (err) {
        console.log(err)
      } else {
        console.log('File successfully saved on local.')
        res.download('./vaccine_certificate_' + beneficid + '.pdf', err => {
          if (err) {
            console.log(err)
          } else {
            fs.unlink('./vaccine_certificate_' + beneficid + '.pdf', err => {
              if (err) {
                console.log(err)
              } else {
                console.log('File successfully deleted from remote.')
              }
            })
          }
        })
      }
    })
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/build/index.html')
})

app.get('*', (req, res) => {
  res.redirect('/')
})

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Server running.')
})
