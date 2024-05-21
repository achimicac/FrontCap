const express = require("express");
const app = express(); 
const accountRoutes = require("./src/routes/accountRoute");
const RoomRoutes = require("./src/routes/RoomRoute");
const JobRoutes = require("./src/routes/jobRoute");
const addressRoutes = require("./src/routes/addressRoute");  
const InvoiceRoutes = require("./src/routes/invoiceRoute"); 
const invoiceJobRoutes = require("./src/routes/invoiceJobRoute");  
const RatingRoutes = require("./src/routes/RatingRoute");  
const ReviewRoutes = require("./src/routes/ReviewRoute");  
const maidJobRoutes = require('./src/routes/maidJobRoute');  

app.listen(5000 , ()=> {
    console.log("server has started on port 5000");
});
// Middleware 
app.use(express.json());  
  
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ error: 'Invalid JSON' }); 
    }
    next();
});
app.use("/api/v1/account" , accountRoutes);
app.use("/api/v1/room" , RoomRoutes); 
app.use("/api/v1/job", JobRoutes);
app.use("/api/v1/address", addressRoutes); 
app.use("/api/v1/invoice", InvoiceRoutes); 
app.use("/api/v1/invoiceJob", invoiceJobRoutes);
app.use("/api/v1/maidJob", maidJobRoutes);
app.use("/api/v1/rating", RatingRoutes);
app.use("/api/v1/review", ReviewRoutes);


app.get("/" , (req,res) => {
    res.send("hello world");  
} );         
       
  
   