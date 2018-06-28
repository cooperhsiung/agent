/**
 * Created by Cooper on 2018/06/28.
 */
const request = require('request');
// const request = require('request').defaults({ gzip: true, json: true, timeout: 20000 });

// let options = {
//   url: 'https://www.baidu.com/',
//   headers: {
//     Host: 'www.baidu.com',
//     Connection: 'keep-alive',
//     'Upgrade-Insecure-Requests': '1',
//     'User-Agent':
//       'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
//     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
//   },
//   proxy: 'http://127.0.0.1:2353',
// };

let options = {
  url: 'http://127.0.0.1:2351'
};

function wrapr(options, cb) {
  request(
    {
      url: `http://127.0.0.1:2350`,
      method: 'POST',
      json: options,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    },
    cb
  );
}

wrapr(options, function(err, res, body) {
  console.log(err);
  // console.log(res);
  console.log(body);
});
