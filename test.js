/**
 * Created by Cooper on 2018/06/28.
 */
const request = require('request');
const CookieJar = require('tough-cookie').CookieJar;

let options = {
  url: 'https://www.jd.com/',
  headers: {
    Host: 'www.jd.com',
    Connection: 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.8'
  },
  encoding: null,
  jar: request.jar()
  // proxy: `http://127.0.0.1:2351`,
};

// let options = {
//   url: 'http://127.0.0.1:2351'
// };

options = {
  url: 'https://www.baidu.com/',
  headers: {
    Host: 'www.baidu.com',
    Connection: 'keep-alive',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36',
    'Upgrade-Insecure-Requests': '1',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6'
  },
  encoding: null,
  jar: request.jar(),
  proxy: `http://127.0.0.1:2351`,
  // __jar:'asd'
};
//
// options = {
//   url: 'http://127.0.0.1:3003/p',
//   method: 'post'
// };

request(options,(err,res,body)=>{
  // console.log(body)
  console.log(options.jar)
});

function wrapr(options, cb) {
  if (options.jar) {
    options.__jar = JSON.stringify(options.jar._jar);
  }
  request(
    {
      url: `http://127.0.0.1:2345`,
      method: 'POST',
      json: options,
      // headers:options.headers
      encoding: options.encoding === null ? null : 'utf-8'
    },
    (err, res, body) => {
      console.log(res);
      if (err) {
          return cb(err)
      } else {
        if (options.jar) {
          options.jar._jar = CookieJar.fromJSON(res.headers.__jar);
          console.log('========= options.jar', options.jar);
        }
        cb(null, res, body);
      }
    }
  );
}

wrapr(options, function(err, res, body) {
  console.log(err);
  // console.log(res);
  // console.log(body);

  // console.log(JSON.stringify(body))
});
