import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";



// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("Error:", error));

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Deployment

if(process.env.NODE_ENV === "production"){
   const dirPath =path.resolve();
   app.use(express.static("Frontend/dist"));
   app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,"Frontend","dist","index.html"));

   })
}

app.listen(PORT, () => {
  console.log(`Bookstore app listening on port ${PORT}`);
});
