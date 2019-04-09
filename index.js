const fs = require('fs');
const path = require('path');

const obj = {};

function emptyDir(dir){
    
    const files = fs.readdirSync(dir, {withFileTypes:true});
    //说明：withFileTypes:true, arr的元素是dirent对象，dirent可以判断：本资源是目录还是文件
    if(files.length<1){
        return;
    };
    files.forEach((dirent,index)=>{
        if(dirent.isFile()){   //判断本资源是不是文件
            fs.unlinkSync(dir+'/'+dirent.name);
        }else{
            emptyDir(dir+'/'+dirent.name);
            fs.rmdirSync(dir+'/'+dirent.name);
        }
    });
}

obj.emptyDir = dirPath => {
    const bool = fs.existsSync(dirPath); //判断目录是否存在
    if(!bool) return false;

    emptyDir(dirPath); //清空目录的子孙目录和所有文件
    return true;
};

obj.rmDir = dirPath => {
    const bool = fs.existsSync(dirPath); //判断目录是否存在
    if(!bool) return false;

    emptyDir(dirPath); //清空目录的子孙目录和所有文件
    fs.rmdirSync(dirPath);  //删除本目录
    return true;
}

module.exports = Object.freeze(obj);