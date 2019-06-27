export default class Respone {
    constructor(type){
        this.errcode = 0;
        this.errmsg = '';
        if (type === 'withPage') {
            this.data = {
                list: [],
                total: 0
            }
        } else {
            this.data = '';
        }
    }
}