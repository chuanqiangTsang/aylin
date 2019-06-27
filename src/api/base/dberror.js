import Resopne from '../../lib/respone';
export default {
    dbErrorHandler(res){
        const json = new Resopne();
        res.status(500);
        res.errcode = 50000;
        res.errmsg = '服务器错误';
        res.json(json);
    }
}