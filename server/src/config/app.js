const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
dotenv.config();
app.use(cors({
  origin: "*",
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use(cookieParser())


// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


// const { auth } = require('express-oauth2-jwt-bearer');

// const jwtCheck = auth({
//   audience: 'http://localhost:8700',
//   issuerBaseURL: 'https://dev-1xn20zw4434lds0n.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });

// // enforce on all endpoints
// app.use(jwtCheck);

//routers
const userRouter = require("../routers/user.routes")
app.use("/api/user", userRouter)

const centerRouter = require("../routers/center.routes")
app.use("/api/center", centerRouter)

const busBookRouter = require("../routers/busBook.routes")
app.use("/api/busBook", busBookRouter)

const attendanceRouter = require("../routers/attendance.routes")
app.use("/api/attendance", attendanceRouter)

const orderRouter = require("../routers/order.routes")
app.use("/api/order", orderRouter)

module.exports = app