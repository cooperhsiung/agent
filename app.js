/**
 * Created by Cooper on 2018/06/28.
 */
const http = require('http');
const request = require('request').defaults({ gzip: true, json: true, timeout: 20000 });

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
