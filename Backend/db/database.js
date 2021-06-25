const oracledb = require('oracledb')
let config = {
    user: "coca",
    password: "cocacore7",
    connectString: 'localhost:1521/xe',
    externalAuth: false
}

module.exports = config