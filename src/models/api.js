import config from '../config.json';
import api from '../api';

import system from '../api/system';

// 定义api入口
export default (app, db) => {
  app.use('/api', api({ config, db }));

  app.use('/system', system({db}))
}