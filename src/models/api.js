import config from '../config.json';
import api from '../api';

export default (app, db) => {
  app.use('/api', api({ config, db }));
}