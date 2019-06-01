import jwt from 'jsonwebtoken';

import config from '../config/jwt';
 
class Jwt {
  /**
   * token生成器
   * @param data 需要存入token的数据
   * @param exp 过期时间，以秒计
   * @return token
   */
  tokenGenerator(data, exp){
    const token = jwt.sign(data, config.secret, { expiresIn: exp });
    return token;
  }

  /**
   * token校验器
   * @param token 被校验的token
   * @return boolean
   */
  tokenVerifier(token){
    try { 
      const data = jwt.verify(token, config.secret);
      return data;
    } catch(e) {
      return null;
    }
  }
}

export default new Jwt();