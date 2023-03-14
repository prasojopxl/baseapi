const { users } = require("../../models")
const bcrypt = require("bcryptjs");

// post Data
const postData = async (req, res, next) => {
    const { body } = req
    const isEmailUsed = await users.findOne({
        where: {
            email: body.email
        }
    })
    if (isEmailUsed) {
        return res.status(400).json({
            message: "email already use"
        })
    }
    try {
        const password = await bcrypt.hashSync(body.password, 10)
        const addData = await users.create({
            email: body.email,
            password: password,
            name: body.name,
            status: false,
            role: "admin"
        })
        return res.json(addData)
    } catch (error) {
        console.log(error)
    }
}


// PUT
const putData = async (req, res, next) => {
    const body = req.body;
    const { id } = req.params
    const data = await users.findByPk(id)
    try {
        if (!data) return res.status(404).json({
            message: "data not found"
        })
        await data.update(body)
        return res.status(200).json({
            message: `data ${id} sudah diupdate`
        })
    } catch (error) {
        console.log(error)
    }
}

// Delete
const deleteData = async (req, res, next) => {
    const { id } = req.params
    const checkData = await users.findOne({
        where: {
            id: id
        }
    })
    try {
        if (!checkData) {
            res.status(400).json({
                message: "data not found"
            })
        }
        else {
            await checkData.destroy()
            res.status(201).json({
                message: `Success delete data ${id}`
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//Login
const loginData = async (req, res, next) => {
    try {
        const body = req.body;
        const isEmail = await users.findOne({
            where: {
                email: body.email
            }
        })

        if (!isEmail) {
            return res.status(400).json({
                message: "Email not found"
            })
        }
        return res.json({
            message: "OK"
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = { postData, putData, deleteData, loginData }
