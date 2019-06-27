import { Router } from 'express';
import Respone from '../lib/respone';
import { dbErrorHandler } from './base/dberror';
import errcodeMap from './base/errcodes';

import Jwt from '../lib/jwt';

export default ({ db }) => {
    let sysApi = Router();

    // 登录
    sysApi.post('/login', (req, res) => {
        const { username, password } = req.body;

        // 查询数据库
        let sql = `select * from user where username = '${username}' and password = '${password}'`;
        const json = new Respone();
        db.query(sql, (err, rows, fidles) => {
            if(err){
                dbErrorHandler(res);
            } else {
                if (rows.length === 0) {
                    json.errcode = errcodeMap.loginError;
                    json.errmsg = '用户名或密码错误'
                } else {
                    // 用户信息存入session
                    req.session.userInfo = rows[0];

                    const token = Jwt.tokenGenerator({userInfo: rows[0]}, 60 * 60);
                    json.errcode = errcodeMap.success;
                    json.data = {token, exp: 60 * 60};
                    json.errmsg = '登录成功';
                }
                res.json(json);
            }
        })
    });

    sysApi.get('/logout', (req, res) => {
        const { session } = req;
        session.destroy();
        const json = new Respone();
        json.errcode = errcodeMap.success;
        res.json(json);
    })

    // 测试token
    sysApi.get('/testjwt', (req, res) => {
        const token = req.get('Authorization').split(' ')[1];
        const json = new Respone();
        
        const isTokenOk = Jwt.tokenVerifier(token);

        if (!isTokenOk) {
            res.status(401);
            json.errcode = 40000;
            json.errmsg = 'Authentication Failed';
            res.json(json);
        } else {
            // logic go here...
            res.json(json);
        }
    });

    return sysApi; // 需要将router返回出去以便外层中间件使用
}