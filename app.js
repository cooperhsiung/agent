/**
 * Created by Cooper on 2018/07/03.
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
        request(options, (err, response, body) => {
          if (err) {
            console.error(err);
            return req.destroy(err);
          }
          for (let header in response.headers) {
            if (header.toLowerCase() !== 'content-length') {
              res.setHeader(header, response.headers[header]);
            }
          }
          if (Buffer.isBuffer(body)) {
            res.end(body);
          } else {
            res.end(JSON.stringify(body));
          }
        });
      });
    } else {
      res.end('hello agent!');
    }
  })
  .listen(2345);
