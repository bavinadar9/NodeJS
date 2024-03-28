const fs= require("fs");
const os=  require("os");


console.log("1");

//Synchronous .. Blocking Req - It assings the work to a thread /worker 

const result = fs.readFileSync('text.txt', 'utf-8'); //to read the file in string form
console.log("Sync :", result);

//Asynchronous.... Non Blocking request it processes

// const result1 = fs.readFile('text.txt','utf-8')
// console.log(result1)   => It will throw an error because asynchronous function does not 
// return anything it expects a call back function where it can give the error or result

fs.readFile('./text.txt', "utf-8", (err, res) => {
    if (err) {
        console.log("Error", err);
    }
    else {
        console.log("Async: ",res)
    }
})


console.log("2");
console.log("3");


//by default there are 4 threads in the thread pool 

// we can increase the no of threads depending upom the cpu core if it is 8 then we can have 8 threads max

//To Check cpu core
console.log(os.cpus().length);



