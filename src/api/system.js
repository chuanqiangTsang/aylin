import { Router } from 'express';
import Respone from './base/respone';

import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwt';

export default ({ db }) => {
    let sysApi = Router();

    // 登录
    sysApi.get('/login', (req, res, next) => {
        const json = new Respone();
        // 生成token返回给前端
        const token = jwt.sign({ name: 'token' }, jwtConfig.secret);
        json.data = token;
        res.json(json);
    })

    // 测试token
    sysApi.get('/testjwt', (req, res, next) => {
        const token = req.get('Authorization');
        const json = new Respone();
        try{
            const verifyData = jwt.verify(token, jwtConfig.secret);
            json.data = 'Authentication Successful';
            res.json(json);
        }catch(err) {
            res.status(401);
            json.errcode = 40000;
            json.data = 'Authentication Failed';
            res.json(json);
          }
        
    });

    return sysApi; // 需要将router返回出去以便外层中间件使用
}