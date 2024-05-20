const express = require("express");
const app = express(); 
const accountRoutes = require("./src/routes/accountRoute");
const bodyParser = require('body-parser');


app.listen(5000 , ()=> {
    console.log("server has started on port 5000");
});

// Middleware 
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/v1/account" , accountRoutes);
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/" , (req,res) => {
    res.send("hello world");  
} );         
    

