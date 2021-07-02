const db = require('../db/database')
const oracledb = require('oracledb')
var path = require('path');
const Buffer = require('buffer').Buffer;
oracledb.autoCommit = true
var CryptoJS = require("crypto-js");
const fs = require('fs');
var base64 = require('base-64');

const registrar = async (req,res) => {
    let {usu,nom,pass,fot,fech} = req.body
    let connection
    let contra = CryptoJS.SHA256(pass).toString()
    let aux = fot.split(',')
    let base64String = aux[1]
    var fs = require('fs')
    var buf = Buffer.from(base64String,'base64');

    fs.writeFile(path.join('./public/Imagenes_Usuarios/',"imagen_"+usu+".jpg"), buf, function(error){
        if(error){
            throw error;
        }else{
            return true;
        }
    });
    let imagen_oracle = path.join('http://localhost:5000/Imagenes_Usuarios/',"imagen_"+usu+".jpg")
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin ingresar_usr('${usu}','${nom}','${contra}','${imagen_oracle}','${fech}',:estado); end;`
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
    let datos = []
    let contra = CryptoJS.SHA256(pass).toString()
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin login('${usu}','${contra}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("Usuario No Existe O Contraseña Incorrecta")}else{
            datos.push(row[0])
            datos.push(row[1])
            datos.push(row[3])
            datos.push(row[4])
        }
        res.send({
            status:200,
            data: "Usuario Encontrado",
            datos: datos
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const cargar_usrs = async (req, res) => {
    let connection
    let datos = []
    try {
        connection = await oracledb.getConnection(db)
        let sql = 'begin cargar_Usuarios(:busqueda); end;'
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("No Existen Usuarios :c")}
        else{
            datos.push(row)
            while ((row = await resultSet.getRow())) {
                datos.push(row)
            }
        }
        res.send({
            status: 200,
            data: datos
        })
    } catch (e) {
        console.error(e)
        res.send("Error")
    }

}

const crear_publicacion = async (req,res) => {
    let {cont,fot,fech_c,usr_act} = req.body
    let connection
    let datos = []
    let numero_public = 0
    if(fot == null || fot == undefined || fot == ""){
        try {
            connection = await oracledb.getConnection(db)
            let sql = `begin crear_publicacion('${cont}','${fot}','${fech_c}','${usr_act}',:busqueda); end;`
            let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
            const resultSet = result.outBinds.busqueda;
            let row = await resultSet.getRow();
            if(row == undefined){console.log("No Existen Publicaciones :O")}
            else{
                datos.push(row)
                while ((row = await resultSet.getRow())) {
                    datos.push(row)
                }
            }res.send({
                status:200,
                data: "Publicacion Creada",
                datos: datos
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: 400,
                data: error
            })
        }
    }else{
        connection = await oracledb.getConnection(db)
        let sql = `begin obtener_id_max(:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row != undefined){numero_public = row;}
        let aux = fot.split(',')
        let base64String = aux[1]
        var fs = require('fs')
        var buf = Buffer.from(base64String,'base64');

        fs.writeFile(path.join('./public/Imagenes_Publicaciones/',"imagen_"+numero_public+".jpg"), buf, function(error){
            if(error){
                throw error;
            }else{
                return true;
            }
        });
        let imagen_oracle = path.join('http://localhost:5000/Imagenes_Publicaciones/',"imagen_"+numero_public+".jpg")
        try {
            connection = await oracledb.getConnection(db)
            let sql = `begin crear_publicacion('${cont}','${imagen_oracle}','${fech_c}','${usr_act}',:busqueda); end;`
            let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
            const resultSet = result.outBinds.busqueda;
            let row = await resultSet.getRow();
            if(row == undefined){console.log("No Existen Publicaciones :O")}
            else{
                datos.push(row)
                while ((row = await resultSet.getRow())) {
                    datos.push(row)
                }
            }res.send({
                status:200,
                data: "Publicacion Creada",
                datos: datos
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: 400,
                data: error
            })
        }
    }   
}

const crear_tag = async (req,res) => {
    let {cont,ident} = req.body
    let connection
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin ingresar_tag('${cont}','${ident}',:estado); end;`
        let result = await connection.execute(sql,{estado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }})
        if(result.outBinds.estado == 1){console.log("Tag Creado Con Exito :D")}else{console.log("Tag No Se Creo :c")}
        res.send({
            status:200,
            data: "Tag Creada"
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
    let datos = []
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_publicacion('${usr_act}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("No Existen Publicaciones :O")}
        else{
            /*if(row[2] != null){
                console.log(row[2])
                var bitmap = fs.(row[2]);
                let base = new Buffer.from(bitmap).toString('base64')
                console.log(base)
            }*/
            datos.push(row)
            while ((row = await resultSet.getRow())) {
                /*if(row[2] != null){
                    console.log(row[2])
                    var bitmap = fs.readFileSync(row[2]);
                    let base = new Buffer.from(bitmap).toString('base64')
                    console.log(base)
                }*/
                datos.push(row)
            }
        }
        res.send({
            status:200,
            data: "Publicaciones Cargadas",
            datos: datos
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const cargar_publicacion_tag = async (req, res) => {
    let {usr_act,tag_pu} = req.body
    let connection
    let datos = []
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_publicacion_tag('${usr_act}','${tag_pu}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("No Existen Publicaciones con este tag :O")}
        else{
            datos.push(row)
            while ((row = await resultSet.getRow())) {
                datos.push(row)
            }
        }
        res.send({
            status:200,
            data: "Publicaciones para tag solicitado Cargados",
            datos: datos
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const cargar_tags = async (req, res) => {
    let {ident} = req.body
    let connection
    let datos = []
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_tags('${ident}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("No Existen Tags Para Esta Publicacion :O")}
        else{
            datos.push(row)
            while ((row = await resultSet.getRow())) {
                datos.push(row)
            }
        }
        res.send({
            status:200,
            data: "Tags Cargados",
            datos: datos
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

const cargar_solicitudes = async (req, res) => {
    let {usr_soli} = req.body
    let connection
    let datos = []
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_Solicitudes('${usr_soli}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("No Existen Solicitudes De Amistad :c")}
        else{
            datos.push(row)
            while ((row = await resultSet.getRow())) {
                datos.push(row)
            }
        }
        res.send({
            status: 200,
            data: "Solicitudes De Amistad Cargadas",
            datos: datos
        })
    } catch (e) {
        console.error(e)
        res.send("Error")
    }

}

const cargar_amigo = async (req, res) => {
    let {usr_act} = req.body
    let connection
    let datos = []
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_amigo('${usr_act}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("No Existen Amigos :c")}
        else{
            datos.push(row)
            while ((row = await resultSet.getRow())) {
                datos.push(row)
            }
        }
        res.send({
            status:200,
            data: "Amigos Cargados",
            datos: datos
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
    let datos = []
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_chat('${usr_act}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("No Existen Chats :c")}
        else{
            datos.push(row)
            while ((row = await resultSet.getRow())) {
                datos.push(row)
            }
        }
        res.send({
            status:200,
            data: "Chats Cargados",
            datos: datos
        })
        datos.clear()
    } catch (error) {
        console.log(error)
        res.send({
            status: 400,
            data: error
        })
    }
}

const cargar_noamigo = async (req, res) => {
    let {usr_act} = req.body
    let connection
    let datos = []
    try {
        connection = await oracledb.getConnection(db)
        let sql = `begin cargar_noamigo('${usr_act}',:busqueda); end;`
        let result = await connection.execute(sql,{busqueda: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }})
        const resultSet = result.outBinds.busqueda;
        let row = await resultSet.getRow();
        if(row == undefined){console.log("Todos Son Tus Amigos :O")}
        else{
            datos.push(row)
            while ((row = await resultSet.getRow())) {
                datos.push(row)
            }
        }
        res.send({
            status:200,
            data: "No Amigos Cargados",
            datos: datos
        })
        datos.clear()
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
    cargar_usrs,

    crear_publicacion,
    crear_tag,
    cargar_publicacion,
    cargar_publicacion_tag,
    cargar_tags,

    crear_solicitud,
    elim_solicitud,
    acep_solicitud,
    cargar_solicitudes,

    cargar_amigo,

    cargar_chat,

    cargar_noamigo
}
