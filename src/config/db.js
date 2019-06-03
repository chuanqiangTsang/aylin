
const host = process.env.NODE_ENV === 'dev' ? 'todo' : 'localhost';
const password = process.env.NODE_ENV === 'dev' ? 'todo' : '123456';
export default {
    host     : host,
    user     : 'root',
    password,
    database : 'aylin'
}