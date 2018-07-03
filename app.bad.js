/**
 * Created by Cooper on 2018/06/28.
 */
const http = require('http');
const request = require('request').defaults({ gzip: true, json: true, timeout: 20000 });

/*
*
* 有坑 ！！
* 1.post的时候不允许 pipe req
* 2.不适用代理部分请求，content-lenth解析问题，比如https://www.jd.com
* 3.https://stackoverflow.com/questions/25042725/edit-response-headers-before-piping
* */

http
  .createServer((req, res) => {
    let options = [];
    if (req.method === 'POST') {
      req.on('data', chunk => {
        options.push(chunk);
      });
      req.on('end', () => {
        options = Buffer.concat(options).toString();
        try {
          options = JSON.parse(options);
        } catch (err) {
          console.log('req', err);
          return req.destroy(err);
        }
        request(options)
          .on('error', err => {
            console.log('req', err);
            req.destroy(err);
          })
          .pipe(res)
          .on('error', err => {
            console.log('res', err);
            res.destroy(err);
          });
      });
    } else {
      res.end('hello agent!');
    }
  })
  .listen(2345);
