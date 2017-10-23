import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import 'dotenv/config';

import routes from './router';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static(path.join(__dirname, '../client/src/build/')));
app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/client/src/build/index.html`);
});

app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

app.listen(port);

export default app;
