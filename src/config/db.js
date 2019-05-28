
const host = process.env.npm_lifecycle_event === 'dev' ? 'localhost' : '';

export default {
    host     : host,
    user     : 'root',
    password : '123456',
    database : 'aylin'
}