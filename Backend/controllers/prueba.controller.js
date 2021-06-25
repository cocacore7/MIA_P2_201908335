const db = require('../db/database')
const oracledb = require('oracledb')
oracledb.autoCommit = true
const add = async (req,res) => {
    let {numero} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `INSERT INTO NUMERO(NUM) VALUES('${numero}') `
        let result = await connection.execute(sql)
        res.send({
            status:200,
            data: "Numero Insertado"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const getAll = async (req, res) => {
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = 'SELECT * FROM NUMERO'
        let result = await connection.execute(sql,[],{ outFormat: oracledb.OUT_FORMAT_OBJECT });
        res.send({
            status: 200,
            data: result.rows
        })
    } catch (e) {
        console.error(e)
        res.send("Error")
    }

}



module.exports = {
    add,
    getAll
}
