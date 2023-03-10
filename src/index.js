// import library
const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const { urlencoded, json } = require("express")

// route user
const routeUsers = require("./users/index")
const routeAuth = require("./auth/index")
const routeUploads = require("./uploads/index")

const app = express()
dotenv.config()

// setup cors
let whitelist = ["http://localhost:3000"]
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
}

app.use(cors(corsOptions))
app.use(json())
app.use(urlencoded({
    extended: true
}))

//url app
app.get("/", (req, res) => {
    res.json({
        message: "welcome "
    })
})
app.use("/users", routeUsers)
app.use("/auth", routeAuth)
app.use("/uploads", routeUploads)


// menjalankan aplikasi
const port = process.env.APP_PORT || 7002
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})
