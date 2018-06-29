import fs from 'fs';
import gm from 'gm';

const R = 6;
const C = 4;
const iconW = 120;
const paddingW = 54;
const iconH = 120;
const paddingH = 56;
const w = iconW + paddingW;
const h = iconH + paddingH;
const extraBottom = 222; // app bar
const targetWidth = paddingW + w * C;
const targetHeight = paddingH + h * R + extraBottom;
const aspectRatio = targetHeight / targetWidth;


export default (imgSrc, idx, cbk) => {
  idx = parseInt(idx) - 1;
  const y = Math.floor(idx / C);
  const x = idx % C;

  if (Number.isNaN(x) || Number.isNaN(y) || x < 0 || y < 0 || x >= R || y >= C) {
    throw new Error(`Invalid Index: ${idx}`);
  }
  console.log({x,y});

  console.log(paddingW + w * C);
  console.log(paddingH + h * R + extraBottom);
  gm(imgSrc).size((err, {width, height}) => {
    const newWidth = Math.min(width, height / aspectRatio);
    const newHeight = Math.min(height, width * aspectRatio);
    gm(imgSrc)
      .crop(
        newWidth,
        newHeight,
        '!'
      ) // gm doesn't have this resize option built-in :(
      .resize(
        targetWidth,
        targetHeight,
        '^')
      .crop(
        iconW,
        iconH,
        paddingW + x * w,
        paddingH + y * h)
      .write('/tmp/img/b.png', (err) => {
        if (err) {
          console.log('err', err);
        }
        console.log('written');
        cbk();
      });
  });
};
