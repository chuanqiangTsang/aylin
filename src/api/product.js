import { Router } from 'express';
import Respone from '../lib/respone';
import { dbErrorHandler } from './base/dberror';
import errcodeMap from './base/errcodes';


export default ({ db }) => {
  let productApi = Router();

  /**
   * 添加商品分类
   * @params cateName 分类名称
   * @params orderNum 排序序号
   */ 
  productApi.post('/addCategory', (req, res) => {
    const json = new Respone();
  
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
  });

  /**
   * 获取所有分类列表 
  */ 
  productApi.get('/getCategory', (req, res) => {
    const { page } = req.query;
    const size = 20;
    const offsetLeft = (page - 1) * size;
      const sql = `SELECT * FROM 
                      category 
                      WHERE
                      isDel = 0 AND isChild = 0
                      ORDER BY orderNum DESC
                      LIMIT ${offsetLeft}, ${size};
                      SELECT * FROM 
                      category
                      WHERE
                      isDel = 0 AND isChild = 1
                      ORDER BY orderNum DESC;
                      SELECT COUNT(*) FROM
                      category
                      WHERE
                      isDel = 0 AND isChild = 0;
                  `;
      db.query(sql, (err, rows) => {
        if (err) {
          dbErrorHandler(res);
        } else {
          const json = new Respone('withPage');
          const [data, children,  total] = rows;
          children.forEach(item => {
            item.active = item.active === 1;
            item.isChild = item.isChild === 1;
          })
          data.forEach(item => {
            item.active = item.active === 1;
            item.isChild = item.isChild === 1;
            item.children = children.filter(child => child.parentId === item.id);
            delete item.isDel;
          })
          json.errcode = 0 ;
          json.data.list = data;
          json.data.total = total[0]['COUNT(*)'];
          json.errmsg = '查询分类成功';
          res.json(json);
        }
      })
  });

  /** 
   * 更新分类名称和排序编号 
  */  
  productApi.put('/update', (req, res) => {
    const { id, cateName, orderNum } = req.body;
    const sql = ` UPDATE
                  category
                  SET
                  cateName = '${cateName}', orderNum = ${orderNum}
                  WHERE
                  id = ${id}
                `;
    db.query(sql, (err, rows) => {
      if (err) {
        dbErrorHandler(err)
      } else {
        const json = new Respone();
        if (rows.affectRows < 1) {
          json.errcode = errcodeMap.updateError;
          json.errmsg = '更新失败';
        } 
        res.json(json);
      }
    })
  });

  /** 
   * 更新分类状态
  */
  productApi.put('/updateStatus', (req, res) => {
    const { status, id } = req.body;
    const sql = `UPDATE
                  category
                  SET 
                  active = ${status ? 1 : 0}
                  WHERE
                  id = ${id}
                  `;
    db.query(sql, (err, rows) => {
      if (err) {
        dbErrorHandler(res);
      } else {
        const json = new Respone();
        if (rows.affectRows < 1) {
          json.errcode = errcodeMap.updateError;
          json.errmsg = '更新失败';
        }
        res.json(json);
      }
    })                
  })

  /** 
   * 删除分类 
  */ 
  productApi.delete('/delete', (req, res) => {
    const { id } = req.query;
    const sql = ` UPDATE
                  category
                  SET
                  isDel = 1
                  WHERE
                  id = ${id}
                `
    db.query(sql, (err, rows) => {
      if (err) {
        dbErrorHandler(res);
      } else {
        const json = new Respone();
        if (rows.affectRows < 1) {
          json.errcode = errcodeMap.updateError;
          json.errmsg = '删除失败';
        }
        res.json(json);
      }
    });
  })

  /** 
   * 添加子类 
  */ 
  productApi.post('/addSubCate', (req, res) => {
    const { parentId, cateName, orderNum } = req.body;
    const sql = `
                  INSERT INTO 
                  category (cateName, orderNum, parentId, isChild)
                  VALUES('${cateName}', ${orderNum}, ${parentId}, 1);
                `
    db.query(sql, (err, rows) => {
      if (err) {
        dbErrorHandler(err);
      } else {
        const json = new Respone();
        if (rows.insertId) {
          json.errcode = 0;
          json.errmsg = '添加子类成功';
        }
        res.json(json);
      }
    });
  })
  
  return productApi;

}