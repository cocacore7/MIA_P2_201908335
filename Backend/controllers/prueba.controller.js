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

const crear_solicitud = async (req,res) => {
    let {fech_c,estado,usr_sol,usr_pet} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin crear_solicitud('${fech_c}','${estado}','${usr_sol}','${usr_pet}',:est_cs); end;`
        let result = await connection.execute(sql,{est_cs: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }})
        if(result.outBinds.est_cs == 1){console.log("Solicitud Ingresada Con Exito :D")}else{console.log("Usuario Solicitud No Existe :c")}
        res.send({
            status:200,
            data: "Solicitud Creada"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const elim_solicitud = async (req,res) => {
    let {usr_act,usr_rech} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin elim_solicitud('${usr_act}','${usr_rech}',:estado); end;`
        let result = await connection.execute(sql,{estado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }})
        if(result.outBinds.estado == 1){console.log("Solicitud Eliminada Con Exito :D")}else{console.log("Solicitud No Se Elimino, No Existe El Usuario :c")}
        res.send({
            status:200,
            data: "Solicitud Eliminada"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const acep_solicitud = async (req,res) => {
    let {fech_c,usr_act,usr_acept} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin acep_solicitud('${fech_c}','${usr_act}','${usr_acept}',:estado); end;`
        let result = await connection.execute(sql,{estado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }})
        if(result.outBinds.estado == 1){console.log("Solicitud Aceptada Con Exito :D")}
        else if(result.outBinds.estado == 2){console.log("Solicitud Eliminada Al Aceptar, El Usuario Ya Era Un Amigo -_-")}
        else{console.log("Solicitud No Se Acepto, No Existe El Usuario :c")}
        res.send({
            status:200,
            data: "Solicitud Aceptada"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const crear_publicacion = async (req,res) => {
    let {cont,fot,fech_c,usr_act} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin crear_publicacion('${cont}','${fot}','${fech_c}','${usr_act}',:estado); end;`
        let result = await connection.execute(sql,{estado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }})
        if(result.outBinds.estado == 1){console.log("Publicacion Creada Con Exito :D")}else{console.log("Error, No Se Creo La Publicacion")}
        res.send({
            status:200,
            data: "Publicacion Creada"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const cargar_publicacion = async (req, res) => {
    let {usr_act} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_publicacion('${usr_act}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row;
        if(resultSet == undefined){console.log("No Existen Publicaciones :O")}
        else{
            while ((row = await resultSet.getRow())) {
                console.log(row);
            }
        }
        res.send({
            status:200,
            data: "Publicaciones Cargadas"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const cargar_amigo = async (req, res) => {
    let {usr_act} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_amigo('${usr_act}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row;
        if(resultSet == undefined){console.log("No Existen Amigos :c")}
        else{
            while ((row = await resultSet.getRow())) {
                console.log(row);
            }
        }
        res.send({
            status:200,
            data: "Amigos Cargados"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const cargar_chat = async (req, res) => {
    let {usr_act} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_chat('${usr_act}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row;
        if(resultSet == undefined){console.log("No Existen Chats :c")}
        else{
            while ((row = await resultSet.getRow())) {
                console.log(row);
            }
        }
        res.send({
            status:200,
            data: "Chats Cargados"
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
    login,
    crear_solicitud,
    elim_solicitud,
    acep_solicitud,
    crear_publicacion,
    cargar_publicacion,
    cargar_amigo,
    cargar_chat
}
