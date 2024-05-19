const express = require("express");
const app = express(); 
const controllersRoutes = require("./src/routes");


app.listen(5000 , ()=> {
    console.log("server has started on port 5000");
});

// Middleware 
app.use(express.json());

app.use("/api/v1/Account" , controllersRoutes);


app.get("/" , (req,res) => {
    res.send("hello world");  
} );         


