/*
 * @Description: RSA 私钥解密模块
 * @Author: RayseaLee
 * @Date: 2021-12-20 16:03:13
 * @FilePath: \koa2-generator\modules\decrypt.js
 * @LastEditTime: 2021-12-20 16:19:44
 * @LastEditors: RayseaLee
 */
const NodeRSA = require('node-rsa')
// 私钥
const priKey = '-----BEGIN RSA PRIVATE KEY-----MIICWwIBAAKBgQCpkW3SC2vG3X/QKur2StmjFHoC7be/0TxgVI9n55xWJFMRBVVx2RpiUeL1KGc96j49ODPhyAFUPTxGvHFWtYFNnrb3k58862qvyuy/JlcCzvCl+lOIZKT7njSP6LDrq1BBbCArh+DdVNddjnuCHJSleOxeah1fudwpqUe74QrI5wIDAQABAoGAVeUzSkk6yTv+uMZky2pTIMcIn18ny2UEPo/XLP0oNoKkCWU4STl+oft1ClbzJWv5Jy3HKkIUWkXCuNpQV2oOGx5vxl6QpyU9Q56KahmC/W71xV09ayKr4XLnHajjiYHCmbk74dZvgnqk4nTT4n3tuNsdtrVoT1mtM9xVEMNwwaECQQDXJSvoOIZVojo1076ZNSK6p0J3KmJ5ExXxKX7+u/EruP3fppu6sP66fZl4wsJ0+Erf47ocDJOuq4Dw7LiN0gDPAkEAycSfT7yan+2PO1KGCNwMwkpvWV/1C5RVQKYTDr7/DbGr3ltHY88tmKyrYUo0X+DmwIbUvR2zLrwlD5QlNGVMaQJAJWd/BLafFFBKEoWnw3crfIwL0C/8QtSAohb2z07ZlSJqcPHEbWbMQpwHjKk/qZppWhd7idjd7CZBGqHtTCrQnQJALhp2iKLA9jAzHUwDAn09kRuvC84IUSgIvufzzNfJsdhaPEnBK0ZI1e0GkAmDpDDgqTdl3vytV8137nJcefd3mQJAXu+7Z1gQzimBhry1Gq/xZuqoTbBy5uw8xH2UkO47Wq6WHbxFJXJtW4GWw3ByC9Q3qrva8ScZ6xoAZ8EJPAgIRQ==-----END RSA PRIVATE KEY-----'

module.exports = async (ctx, next) => {
  if(!ctx.request.body.password) {
    await next()
  } else {
    // 创建解密对象实例
    const privateKey = new NodeRSA(priKey)
    // 因为jsencrypt自身使用的是pkcs1加密方案, nodejs需要修改成pkcs1。
    privateKey.setOptions({encryptionScheme: 'pkcs1'}) 
    // 用私钥解密
    const decrypted = privateKey.decrypt(ctx.request.body.password, 'utf8')
    ctx.request.body.password = decrypted
    await next()
  }
}