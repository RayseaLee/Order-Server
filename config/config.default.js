/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-09 14:32:30
 * @FilePath: \koa2-generator\config\config.default.js
 * @LastEditTime: 2022-05-24 08:56:42
 * @LastEditors: RayseaLee
 */
module.exports = {
  db_config: {
    database: 'order_cms_db',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: ''
  },
  upload_config: {
    baseURL: 'http://192.168.255.196:3000'
    // baseURL: 'http://192.168.0.103:3000'
    // baseURL: 'http://172.19.0.39:3000'
    // baseURL: 'http://172.19.11.201:3000'
    // baseURL: 'http://192.168.59.196:3000'
    // baseURL: 'http://172.19.11.0:3000'
    // baseURL: 'http://192.168.0.100:3000'
  },
  jwtSecret: 'RayseaLeeAndSgwzg',
  appId: '',
  appSecret: ''
}
