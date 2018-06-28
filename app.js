/**
 * Created by Cooper on 2018/06/28.
 */
const http = require('http');
const request = require('request').defaults({ gzip: true, json: true, timeout: 20000 });

http
  .createServer((req, res) => {
    let body = [];
    if (req.method === 'POST') {
      req.on('data', chunk => {
        body.push(chunk);
      });
      req.on('end', () => {
        body = Buffer.concat(body).toString();
        req
          .pipe(request(JSON.parse(body)))
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
  .listen(2350);
