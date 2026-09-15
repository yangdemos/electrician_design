const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname,port=Number(process.env.PORT)||5186;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.png':'image/png'};
http.createServer((req,res)=>{let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}const file=path.resolve(root,'.'+(name.endsWith('/')?name+'index.html':name));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end('<body style="background:#1c1115;color:#f2cabb;font-family:system-ui;padding:15vw"><h1>这里还没有接通。</h1><a style="color:inherit" href="/">返回港湾电气首页 →</a></body>');return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)})}).listen(port,'127.0.0.1',()=>console.log('HARBOURLINE ELECTRICAL: http://127.0.0.1:'+port));

