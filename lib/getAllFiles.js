const fs = require('fs');
const path = require('path');
const { getType } = require('yu-util');

exports.getAllFiles = (dirPath, ext, recursion=true) => {
    getType(ext)==='Boolean' && (recursion = ext);
    ext = getType(ext)==='String' ? ext : '*';
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
                let file = path.parse(dirent.name);
                let bool = (ext==='*' || file.ext==='.'+ext) ? true :false;
                bool && arr.push(child);
            }
        });
    })(dirPath);

    return arr;
}
