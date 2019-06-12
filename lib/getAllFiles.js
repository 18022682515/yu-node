const fs = require('fs');
const path = require('path');

exports.getAllFiles = (dirPath, recursion=true) => {
    let arr = [];
    const bool = fs.existsSync(dirPath); //判断目录是否存在
    if(!bool) return arr;

    dirPath = path.resolve(dirPath);

    (function fn(dirPath){
        const dirents = fs.readdirSync(dirPath,{ withFileTypes:true });
        dirents.forEach(dirent=>{
            
            let child = path.join(dirPath,dirent.name);
            if(dirent.isDirectory()){
                recursion && fn(child);
            }else{
                arr.push(child);
            }
        });
    })(dirPath);

    return arr;
}
