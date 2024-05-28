const express = require("express");
const cors = require("cors");
const app = express();
const accountRoutes = require("./src/routes/accountRoute");
const RoomRoutes = require("./src/routes/RoomRoute");
const JobRoutes = require("./src/routes/jobRoute");
const addressRoutes = require("./src/routes/addressRoute");
const InvoiceRoutes = require("./src/routes/invoiceRoute");
const RatingRoutes = require("./src/routes/RatingRoute");
const ReviewRoutes = require("./src/routes/ReviewRoute");
const userJobRoutes = require("./src/routes/UserJobRoute");
const RecommendRoutes = require("./src/routes/RecommendRoute");
const TimeWeightRoute = require("./src/routes/timeWeightRoute");

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON");
    return res.status(400).send({ error: "Invalid JSON" });
  }
  next();
});
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/room", RoomRoutes);
app.use("/api/v1/job", JobRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/invoice", InvoiceRoutes);
app.use("/api/v1/userJob", userJobRoutes);
app.use("/api/v1/rating", RatingRoutes);
app.use("/api/v1/review", ReviewRoutes);
app.use("/api/v1/recommend", RecommendRoutes);
app.use("/api/v1/timeWeight", TimeWeightRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(4800, () => {
  console.log("server has started on port 5000");
});
