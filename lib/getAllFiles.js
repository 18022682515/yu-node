const fs = require('fs');
const path = require('path');

exports.getAllFiles = dirPath => {
    const bool = fs.existsSync(dirPath); //判断目录是否存在
    if(!bool) return;
    
    let arr = [];
    fn(dirPath);

    function fn(dirPath){
        const dirents = fs.readdirSync(dirPath,{ withFileTypes:true });
        dirents.forEach((dirent,i)=>{
            let child = path.join(dirPath,dirent.name);
            if(dirent.isDirectory()){
                fn(child);
            }else{
                arr.push(child);
            }
        });
    }
    return arr;
}

exports.getAllFiles('./lib');