const node_url = require('url');
const { getType,toJSON } = require('yu-util');
const querystring = require('querystring');

module.exports = (url,options)=>{
    options = getType(options)==='Object' ? options : {};
    options.method = options.method || 'GET';
    options.data = getType(options.data)==='Object' ? options.data : {};
    let data = querystring.stringify(options.data);
    let headers = {}, postData = '';
    if(/post/i.test(options.method)){
        postData = data;
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        };
    }else{
        data.length>0 && (url += '?'+data);
    }
    
    let obj = node_url.parse(url);
    let { protocol,hostname,port,path } = obj;
    const { request,Agent } = protocol.includes('https') ? require('https') : require('http');
    return new Promise(result=>{
        const req = request({
            method: options.method,
            protocol,
            hostname,
            port,
            path,
            headers,
            agent:new Agent({ maxSockets:10 })
        },res=>{
            let buf = Buffer.from('');
            res.on('data', (d) => {
                buf = Buffer.concat([buf,d]);
            });
            res.on('end',()=>{
                let data = toJSON(buf.toString());
                result({ statusCode:res.statusCode, headers:res.headers, data });
            });
        });
        req.write(postData);
        req.end();
    });
}
