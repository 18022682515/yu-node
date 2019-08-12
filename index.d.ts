// emptyDir,rmDir,getAllFiles,request,session,token

declare function emptyDir(dirPath:string):boolean;
declare function rmDir(dirPath:string):boolean;
declare function copyDir(source:string,dest:string):void;
declare function getAllFiles(dirPath:string, ext?:string ,recursion?:boolean):string[];
declare function request(url:string,options:Object):Promise<Object>;
declare function session(options:Object):(ctx:any,next:Function)=>Promise<any>;
declare function token(options:Object):(ctx:any,next:Function)=>Promise<any>;

export { emptyDir,rmDir,copyDir,getAllFiles,request,session,token };