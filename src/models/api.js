import system from '../api/system';

// 定义api入口
export default (app, db) => {
  app.use('/system', system({db}))
}