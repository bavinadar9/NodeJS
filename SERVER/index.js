//without using express example

const http= require("http");
const fs= require("fs");
const url= require("url");   //first it will search in the dependencies if not there then it will search in the node built in packages

const myServer= http.createServer((req,res) => {      

    const date= new Date();
    const d = date.getDate();
    const mon = date.getMonth();
    const y = date.getFullYear();
    const h = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const myUrl = url.parse(req.url, true);    //this will parse the query string and give me it in objects 

    console.log(myUrl);

    const log= `${d}:${mon}:${y} ${h}:${min}:${sec} ${myUrl.pathname} ${req.method} New Req Received\n`;
    // const myUrl = url.parse(req.url);  //this will not parse the query in the url
    
    fs.appendFile("./log.txt",log, (err, data)=> {
        switch(myUrl.pathname){
            case '/':
                if(req.method === 'GET'){
                    res.end("This is home page");   
                }
                break;
            case '/about':
                const username= myUrl.query.user; 
                res.end(`Hi, ${username}`);             //to get space between the name pass the query parametere in url as bavi+nadar
                break;

            // youtube eg
            case '/search':
                const search = myUrl.query.search_query;   // execute this url and see the o/p ->  localhost:8000/search?search_query=javascript+tutorials+for+beginners
                //it will fetch the results from the db according to search value

                res.end(`Here are the results for ${search}`);
                break;

            case '/signup':
                if(req.method === 'GET'){
                    res.end("This is the signup form");
                }
                else if(req.method === 'POST'){
                    // DB Query i.e we will send the data to the database
                    res.end("Success");
                }

            default:
                res.end("404 Page not Found");
        }
                                                   
    });                 
});

myServer.listen(8000, () => {
    console.log("Server Started");  // this call back is optional which will be called on success of server listen to that port   
});


// createServer will create a nodejs server on my localhost and whenever a client sends req it will call the call back function
// console.log(req)     //=> this req object contains all info of the client like ip_addr, 

// console.log => will be printed in the terminal

// res.end  => will be sent as a response to the client

// Only one server can be run on a port

// call back function in appServer.listen is optional which will be called on success of server listen to that port   