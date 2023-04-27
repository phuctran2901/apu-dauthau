import express from 'express'
import cors from 'cors'
import http from 'http'
import * as cron from 'node-cron'
import * as nodemailer from 'nodemailer'
import * as sendmail from 'sendmail'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userMail = 'phuctran2901.dev@gmail.com'
const passwordEmail = 'zezhhycjzzynzbuk'
let testAccount = await nodemailer.createTestAccount()
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: userMail, // generated ethereal user
    pass: passwordEmail // generated ethereal password
  }
})

const dataToTable = (data) => {
  return `   <table border='black'>
  <tr>
    <th>Gói thầu</th>
    <th>Bên mời thầu</th>
    <th>Thời gian công bố</th>
    <th>Hết hạn</th>
  </tr>
  ${data
    .map((item) => {
      return `<tr>
    <td>${item.package.title.text}</td>
    <td>${item.bidSolicitor.title}</td>
    <td>${item.publicTime}</td>
    <td>${item.expired}</td>
  </tr>`
    })
    .join('')}
</table>`
}

const debit = cron.schedule('* * 12 * *', async () => {
  console.log('run')
  const data = await AppControllers.getDataNotRes({}, {})
  transporter.sendMail(
    {
      from: '[Phần mềm truy xuất thông tin đấu thầu] - Nhóm Sao cũng được',
      to: 'hoangphuc@tlus.edu.vn, anhthuthqb@gmail.com, duongbaoquoccv@gmail.com, tranvotin2001@gmail.com, danh6234@gmail.com',
      subject: `Thông tin đấu thầu ngày ${new Date().getDay()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      html: dataToTable(data)
    },
    (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(nodemailer.getTestMessageUrl(info))
      }
    }
  )
})
// const Route = require('./routes/index')
import Route from './routes/index.js'
import AppControllers from './controllers/index.js'
const PORT = 5000
app.use('/api', Route)
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('App running is port :', PORT)

  debit.start()
})
