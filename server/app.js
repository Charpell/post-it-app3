import express from 'express';
import path from 'path';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import 'dotenv/config';

import routes from './router';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  res.setHeader('Access-Control-Allow-Headers',
   'X-Requested-With, content-type, Authorization');
  next();
});

app.use('/', routes);

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

app.listen(port);

export default app;
