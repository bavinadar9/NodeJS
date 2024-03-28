const express= require("express");
const PORT=8000;
const fs= require("fs");
const users= require("./MOCK_DATA.json");

const app=express();

//middleware -> plugin
app.use(express.urlencoded({extended: false})); // it will put the form encoded data that we send inside the body

//demo for html -> Server side renderring
app.get("/users", (req, res) => {
    const html = `
    <ul> 
       ${users.map((user) => `<li> ${user.first_name} </li>`).join("")}
    </ul>
    `
    res.send(html)
});

//Routes
app.get("/api/users", (req,res) => {
    res.setHeader("X-MyName", "Bavi Nadar");  //Custom header
    //Always add X to custom headers to distinguish between custom and built in headers
    return res.json(users);
});

app.post("/api/users/", (req,res) => {
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender){
        return res.status(400).json({msg: "All fields are required"});
    }
    users.push({id: users.length+1, ...body})   // ... is a spread operator which is used to destructure the body so that we can add id also
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.status(201).json({status: "success", id: users.length});
    });
});

// app.patch("/api/users/:id", (req,res) => {
//     return res.json({status: "pending"});
// });

// app.delete("/api/users/:id", (req,res) => {
//     return res.json({status: "pending"});
// });

// // Dynamic Routing
// app.get("/api/users/:userid", (req,res) => {
//     const id= Number(req.params.userid);
//     const user= users.find( (user) => user.id===id);
//     res.json(user);
// });

//grouping the same routes

app
   .route("/api/users/:userid")
   .get((req,res) => {
    const id= Number(req.params.userid);
    const user= users.find((user) => user.id === id);
    if(!user) return res.status(404).json({error: "No user found with this id"})
    return res.json(user);
   })

   .patch((req,res) => {
    const id= Number(req.params.userid);
    const body= req.body;
    const user= users.find((user) => user.id===id);
    const index= users.indexOf(user);   //if id=4 index =3
    Object.assign(user,body);
    users[index]= user;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status: "Success", data: `User with Id: ${id} is updated`})
    })
   })

   .delete((req,res) => {
    const id= Number(req.params.userid);
    const user= users.find((user) => user.id===id);
    const index= users.indexOf(user);
    users.splice(index,1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        res.json({status: "success", data: `User with Id: ${id} is deleted`})
    })
   });




app.listen( PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`)
});