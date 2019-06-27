import { Router } from 'express';
import Respone from '../lib/respone';
import { dbErrorHandler } from './base/dberror';
import errcodeMap from './base/errcodes';

import Jwt from '../lib/jwt';

export default ({ db }) => {
  let productApi = Router();

  /**
   * 添加商品分类
   * @params cateName 分类名称
   * @params orderNum 排序序号
   */ 
  productApi.post('/addCategory', (req, res) => {
    
    const token = req.get('Authorization').split(' ')[1];
    const json = new Respone();

    const isTokenOk = Jwt.tokenVerifier(token);
    
    if (!isTokenOk) {
      res.status(401);
      json.errcode = 40000;
      json.errmsg = 'Authentication Failed';
      res.json(json);
    } else {
      const { cateName, orderNum } = req.body;
      const sql = `INSERT INTO category(cateName, orderNum) VALUES ('${cateName}', ${orderNum})`;
      db.query(sql, (err, rows) => {
        if (err) {
          dbErrorHandler(res);
        } else {
          if (rows.insertId) {
            json.errcode = 0;
            res.json(json);
          }
        }
      })
    }
  });
  

  return productApi;

}