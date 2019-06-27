import Jwt from '../lib/jwt';
import Respone from '../lib/respone';

/** 
 * 验证token
 * token不合法则返回401，合法则next
 * 维护一个白名单, 无需验证token
 */ 
const pathWhiteList = ['/system/login', '/system/logout'];
function tokenValidator(req, res, next) {
  const { path } = req; // 请求路径
  if (pathWhiteList.indexOf(path) <= -1) {
    const token = req.get('Authorization').split(' ')[1];
    const isTokenOk = Jwt.tokenVerifier(token);
    const json = new Respone();
    if(!isTokenOk) {
      res.status(401);
      json.errcode = 40000;
      json.errmsg = 'Authentication Failed';
      res.json(json);
    }
  }
  next();
}

export default tokenValidator;