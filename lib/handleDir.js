const fs = require('fs');
const path = require('path');
const { getAllFiles } = require('./getAllFiles.js');

function empty(dirPath){
    
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
            empty(child);
            fs.rmdirSync(child);
        }
    });
}

function emptyDir(dirPath){
    const bool = fs.existsSync(dirPath); //判断目录是否存在
    if(!bool) return;

    empty(dirPath); //清空目录的子孙目录和所有文件
    return true;
};

function rmDir(dirPath){
    const bool = fs.existsSync(dirPath); //判断目录是否存在
    if(!bool) return;

    empty(dirPath); //清空目录的子孙目录和所有文件
    fs.rmdirSync(dirPath);  //删除本目录
    return true;
}

function copyDir(source,dest){
    source = path.resolve(source);
    dest = path.resolve(dest);
    let files = getAllFiles(source);
    files.forEach(file=>{
        let newPath = file.replace(source,dest);
        const pathO = path.parse(newPath);
        fs.mkdirSync(pathO.dir,{ recursive:true });
        let rStream = fs.ReadStream(file);
        let wStream = fs.WriteStream(newPath);
        rStream.pipe(wStream);
    });
}

module.exports = { emptyDir,rmDir,copyDir };