const fs= require('fs');  //importing file system i.e built in module

//Synchrnous
fs.writeFileSync('./text.txt','hey there !!'); 
// fs.writeFileSync("./text.txt",'hello i am here')  //this will overwrite the content

fs.appendFileSync("./text.txt","this is line 2");
//it will create a file named text.txt and write the contents to it


fs.copyFileSync("./text.txt","duplicate.txt");  //copies the content of a file

// fs.unlinkSync("./duplicate.txt")     //  =>  deletes the file

