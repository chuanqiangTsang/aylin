import system from '../api/system';
import product from '../api/product'

// 定义api入口
export default (app, db) => {
  app.use('/system', system({db}));

  app.use('/product', product({db}))
}