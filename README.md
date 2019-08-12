# yu-node
  *仅用于node*
    
# 安装
```javascript
npm install yu-node --save
```
  
**引入**
```javascript
const { emptyDir,rmDir,copyDir,getAllFiles,request,session,token } = require('yu-node');
```
  
### emptyDir(dirPath)`：清空目录，完成返回true，否则返回false
```javascript
let bool = emptyDir('./目录a');  //true 或 false
```
  
### `rmDir(dirPath)`：清空并删除目录，完成返回true，否则返回false
```javascript
let bool = rmDir('./目录a');  //true 或 false
```

### `copyDir('目录路径','输出的目录路径')`：克隆目录
```javascript
copyDir('./a','./b');  //将a目录下的所有目录和文件，全部复制到b目录
```

### `getAllFiles('目录路径','文件后缀名',是否包含子孙目录)`：获取目录下的所有文件名
```javascript
let arr1 = getAllFiles('./a','*',true);  //获取a目录下的所有文件，返回多个文件名（数组）

let arr2 = getAllFiles('./a','js',true);  //获取a目录下的所有js文件，返回多个文件名（数组）

let arr3 = getAllFiles('./a','*',false);  //获取a目录下的文件(不包含它的子孙目录的文件)，返回多个文件名（数组）
```

### `request('第三方服务器的url',{ method:'get',data:{ user:'xxx',password:'xxx' } })`：转发前端请求到第三方服务器
```javascript
request('http://127.0.0.1:80',{ method:'get',data:{ user:'deng1234',password:'123456' } }).then(res=>{
    let { statusCode, headers, data } = res;
    //响应码，响应头，响应数据
});
```

### `session(cookies项目对象)`：koa的session中间件
```javascript
app.use( session({
    maxAge: 10*60*1000,  // cookie有效时长
    path: '/', // 该cookie所在的路径
    httpOnly: false,  // 前端js是否可以访问cookie
    overwrite: true, // 如果设置两个相同的key名，是否后者覆盖前者
    signed: false, //是否使用签名
    encrypt: false, //是否对cookie加密
}) );
```

### `token()`：koa的csrf令牌中间件(防止csrf攻击)，启用该中间件后，能在ctx.session['_csrf']和ctx.cookies.get('_csrf')获取到令牌
```javascript
app.use( token() );
```