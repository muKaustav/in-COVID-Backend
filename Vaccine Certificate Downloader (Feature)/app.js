const express = require('express')
const request = require('request')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

global.txn = ''
global.token = ''

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

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Server running.')
})
