const db = require('../db/database')
const oracledb = require('oracledb')
oracledb.autoCommit = true
const registrar = async (req,res) => {
    let {usu,nom,pass,fot,fech} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin ingresar_usr('${usu}','${nom}','${pass}','${fot}','${fech}',:estado); end;`
        let result = await connection.execute(sql,{estado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }})
        if(result.outBinds.estado == 1){console.log("Usuario Ingresado Con Exito :D")}else{console.log("Usuario Ya Existe :c")}
        res.send({
            status:200,
            data: "Usuario Registrado"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const login = async (req, res) => {
    let {usu,pass} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin login('${usu}','${pass}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("Usuario No Existe O Contraseña Incorrecta")}else{console.log(row);}
        res.send({
            status:200,
            data: "Usuario Encontrado"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}



module.exports = {
    registrar,
    login
}
