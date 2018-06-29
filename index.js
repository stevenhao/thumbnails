import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import _ from 'lodash';
import template from './template';
import url from 'url';
import graphics from './graphics';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/page/:pid/:id', (req, res) => {
  const { pid, id } = req.params;
  const total = 24;
  const img = `/img/${pid}/${id}.png`;
  const body = id == total
    ? 'Done<br/><img src="${img}"/>'
    : `<a href="/page/${pid}/${parseInt(id)+1}">Next</a><br/><img src="${img}"/>`;
  res.send(template({
    body,
    title: `${id} of ${total}`,
    icon: img,
  }));
});

app.get('/img/:pid/:id.png', (req, res) => {
  const idx = req.params.id;
  graphics('/tmp/img/a.png', idx, () => {
    res.sendFile('/tmp/img/b.png');
  })
});
app.listen(process.env.PORT || 3001);
console.log(`server listening on ${process.env.PORT || 3001}`);
