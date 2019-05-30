import { Router } from 'express';
import Respone from './base/respone';

import Jwt from '../lib/jwt';

export default ({ db }) => {
    let sysApi = Router();

    // 登录
    sysApi.get('/login', (req, res) => {
        const json = new Respone();
        // 生成token返回给前端
        const token = Jwt.tokenGenerator({name: 'user'}, 60 * 60 * 24 * 1000);
        json.data = {token, exp: 60 * 60 * 24 * 1000};
        res.json(json);
    })

    // 测试token
    sysApi.get('/testjwt', (req, res) => {
        const token = req.get('Authorization');
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