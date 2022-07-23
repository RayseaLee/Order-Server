/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-10 16:27:33
 * @FilePath: \koa2-generator\modules\websockets.js
 * @LastEditTime: 2022-05-05 11:43:46
 * @LastEditors: RayseaLee
 */
const WebSocket = require('ws')

// let online = 0 // 在线连接
// module.exports.WebSocketsInit = function(server) {
//   // 创建实例
//   ws = new WebSocket.Server({ server });
//   ws.on('connection', async (ws, request) => {
//     // if (!(request.url.includes('/**/**/websockets'))) {
//     //   return ws.close();
//     // }
//     online = ws._server._connections;
//     console.log(`socket当前在线${online}个连接`)
//     const {
//       query: { id }
//     } = quertString.parseUrl(request.url);
//     if (!id) {
//       return ws.close();
//     }
//     try {
//       //do something
//       // 这里可以做一些加强判断查询数据库等行为

//       ws.id = id // 添加ws实例的唯一标识
//       const obj = { "message": "连接成功", "retCode": 200 }
//       ws.send(JSON.stringify(obj))
//     } catch (error) {
//       console.log('websocket connection error', error)
//       return ws.close();
//     }
//   });
// }
// // 发送客户端数据
// module.exports.sendToCliect = function(Data) {
//   console.log(Data)
//   let iskeep = false // 加个变量做下发成功判断
//   if (!(ws instanceof WebSocket.Server)) {
//     return iskeep;
//   }
//   // const { id } = Data  && client.id === id
//   ws.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       // 发送给指定匹配id
//       client.send(JSON.stringify(Data));
//       console.log('websocket----------------------',JSON.stringify(Data))
//       iskeep = true
//     }
//   });
//   return iskeep;
// }

let WebSocketServer

module.exports.WebSocketsInit = function(server) {
  // 创建实例
  const wss = new WebSocket.Server({ server })
  wss.on('connection', (ws, request) => {
    WebSocketServer = ws
    console.log(request.url, '-------------------------------');
    if (!(request.url.includes('/websockets'))) {
      return ws.close();
    }
    const obj = { "message": "webSockeServer-connection", "retCode": 200 }
    ws.send(JSON.stringify(obj))
    // 对客户端的连接对象进行message事件的监听
    // msg: 由客户端发给服务端的数据
    // ws.on('message', msg => {
    //   try {
    //     const msgObj = JSON.parse(msg)
    //     msgObj.name = 'server'
    //     ws.send(JSON.stringify(msgObj))
    //   } catch (err) {
    //     console.log(err)
    //   }
    // })
  })
}

module.exports.sendToCliect = (Data) => {
  // console.log(WebSocketServer);
  console.log('sendToCliect--------------------------:')
  if(WebSocketServer.send) {
    WebSocketServer.send(JSON.stringify(Data))
  }
  // if (_client.readyState === WebSocket.OPEN) {
  //   _client.send(JSON.stringify(Data));
  // }
  // let iskeep = false // 加个变量做下发成功判断
  // if (!(wss instanceof WebSocket.Server)) {
  //   return iskeep;
  // }
  // const { id } = Data  && client.id === id
  // wss.clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN) {
  //     // 发送给指定匹配id
  //     client.send(JSON.stringify(Data));
  //     console.log('websocket----------------------',JSON.stringify(Data))
  //     iskeep = true
  //   }
  // });
  // return iskeep;
}