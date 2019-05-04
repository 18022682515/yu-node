const fs = require('fs');
const path = require('path');

function emptyDir(dirPath){
    
    const files = fs.readdirSync(dirPath, {withFileTypes:true});
    //说明：withFileTypes:true, arr的元素是dirent对象，dirent可以判断：本资源是目录还是文件
    if(files.length<1){
        return;
    };
    files.forEach((dirent,index)=>{
        let child = path.join(dirPath,dirent.name);
        if(dirent.isFile()){   //判断本资源是不是文件
            fs.unlinkSync(child);
        }else{
            emptyDir(child);
            fs.rmdirSync(child);
        }
    });
}

exports.emptyDir = dirPath => {
    const bool = fs.existsSync(dirPath); //判断目录是否存在
    if(!bool) return;

    emptyDir(dirPath); //清空目录的子孙目录和所有文件
    return true;
};

exports.rmDir = dirPath => {
    const bool = fs.existsSync(dirPath); //判断目录是否存在
    if(!bool) return;

    emptyDir(dirPath); //清空目录的子孙目录和所有文件
    fs.rmdirSync(dirPath);  //删除本目录
    return true;
}
