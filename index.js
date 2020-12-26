// const Logger = require('./Logger');

// const logger = new Logger();

// logger.on('message', (data) =>{
//     //call event
//     console.log("Called listener: ", data);
// });

// logger.log("Hello world!");

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // if (req.url === '/'){
        //read file
    //     fs.readFile(path.join(__dirname, "Public", "index.html"), (err, content) =>{
    //             if (err) throw err;
    //             res.writeHead(200, {'Content-Type':'text/html'});
    //             res.end(content);
    //     });
    // } else if(req.url ==='/about'){ 
            //read file
    //         fs.readFile(path.join(__dirname, "Public", "about.html"), (err, content) => {
    //             if (err) throw err;
    //             res.writeHead(200, {"Content-Type": "text/html"});
    //             res.end(content);
    //         });
    //         }

    //Create file path
    const filePath = path.join(__dirname, "Public", req.url === '/' ? "index.html" : req.url);

    //Get extension of file
    const extType = path.extname(filePath);

    //Create default Content Type
    let contentType = "text/html";
    
    //Set content type based on extension type
    switch(extType){
        case'.js':
            contentType = "text/javascript";
            break;
        case '.png':
            contentType = "image/png";
            break;
        case '.jpg':
            contentType = "image/jpg";
            break;
        case '.css':
            contentType = "text/css";
            break;
        case '.json':
            contentType = "application/json"
            break;
    };

    //read file
    fs.readFile(filePath, (err, content) =>{
        if(err){
            if (err.code === 'ENONET'){
                //file or page not found
                fs.readFile(path.join(__dirname, "Public", "404.html"), {}, (err, content) =>{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            } else {
                //some server error
                res.end("Server Error", err.code);
            }
        } else {
            //Successful response
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        };
    });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=> { 
    console.log("Server running on port: " + PORT);
});