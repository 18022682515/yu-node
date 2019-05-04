# yu-node
  *仅用于node*
    
# 安装
```javascript
npm install yu-node --save
```
  
**引入**
```
const { emptyDir,rmDir,getAllFiles } = require('yu-node');
```
  
### emptyDir(dirPath)`：清空目录，完成返回true，否则返回false
```
let bool = emptyDir('./目录a');  //true 或 false
```
  
### `rmDir(dirPath)`：清空并删除目录，完成返回true，否则返回false
```
let bool = rmDir('./目录a');  //true 或 false
```

### `getAllFiles(dirName)`：获取目录下的所有文件名
```
let arr = getAllFiles('./目录名');  
//[ 'D:\\demo\\node-babel\\src\\foo\\a.css','D:\\demo\\node-babel\\src\\foo\\b.js',]
```