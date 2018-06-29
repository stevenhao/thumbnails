import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import _ from 'lodash';
import url from 'url';

const app = express();
app.get('/a.png', (req, res) => {
  res.sendFile('images/a.png', {
    root: __dirname,
  });
});
app.listen(process.env.PORT || 3001);
console.log(`server listening on ${process.env.PORT || 3001}`);
