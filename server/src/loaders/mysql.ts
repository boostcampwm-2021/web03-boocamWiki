import * as mysql from 'mysql2'
import config from '../config'

export default () => {
    const connection = mysql.createConnection({
        host : config.DB_HOST,
        port : parseInt(config.DB_PORT),
        user : config.DB_USER,
        password : config.DB_PASS,
        database : config.DB_DB
    })
    connection.query('select 1')
    return
}
