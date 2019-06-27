
const host = process.env.NODE_ENV === 'dev' ? '188.131.241.66' : 'localhost';
const password = process.env.NODE_ENV === 'dev' ? '123456' : '123456';
export default {
    host     : '188.131.241.66',
    user     : 'root',
    password,
    database : 'aylin',
    multipleStatements: true
}