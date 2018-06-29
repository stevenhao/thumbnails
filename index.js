import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import _ from 'lodash';
import template from './template';
import url from 'url';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/page/:pid/:id', (req, res) => {
  const { pid, id } = req.params;
  const total = 16;
  res.send(template({
    body: '',
    title: `${id} of ${total}`,
    icon: `/img/${pid}/${id}.png`,
  }));
});

app.get('/img/:pid/:id.png', (req, res) => {
  res.sendFile('images/a.png', {
    root: __dirname,
  });
});
app.listen(process.env.PORT || 3001);
console.log(`server listening on ${process.env.PORT || 3001}`);
