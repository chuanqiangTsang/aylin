import Resopne from './respone';
export default {
    dberror(res){
        const json = new Resopne();
        res.status(500);
        res.errcode = 50000;
        res.errmsg = '服务器错误';
        res.json(json);
    }
}