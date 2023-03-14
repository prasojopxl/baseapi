const { users } = require("../../models")


// get All data
const getData = async (req, res, next) => {
    const getData = await users.findAll()
    try {
        res.status(200).json({
            data: getData
        });
    } catch (error) {
        console.log(error)
    }
}

// get By ID
const getDataID = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = await users.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ["password"]
            }
        })
        res.status(200).json({
            data: userId
        })
    } catch (error) {
        console.log(error)
    }
}



module.exports = { getData, getDataID }
