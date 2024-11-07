require('dotenv').config();
const cors=require("cors")
const bcrypt = require('bcryptjs');
const Express= require("express")
const port=process.env.PORT
const mongoose=require("mongoose")
const mongodbUrl=process.env.MONGO_URL
const app=Express();
const User=require("./models/User")
const salt=bcrypt.genSaltSync(10)
const secret=("rundup")
const parser=require("cookie-parser")
const JWT=require("jsonwebtoken")
const multer=require("multer")
const uploadMiddleWear=multer({dest:"uploads/"})
const fs= require("fs");
const Post = require ("./models/Post");


app.use(Express.json())
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(parser())
app.use('/uploads', Express.static('uploads'));
mongoose.connect(mongodbUrl)
  
app.post("/Register",async(req,res)=>{
  const {userName,password}=req.body;
  try {      
    const UserCredentialData=await User.create({userName,password:bcrypt.hashSync(password,salt)})
    res.json(UserCredentialData)
  } catch (error) {
    console.log(error)
    res.send(error);
    
  }
        
  
})

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ userName });
    
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "User not found" });
    }
    
    // Compare the provided password with the stored hashed password
    const matchingPassword = await bcrypt.compare(password, user.password);
    
    if (matchingPassword) {
      JWT.sign({userName,id:user.id},secret,{},(err,token)=>{
        if(err) throw err;
        return res.cookie("token",token).json({id:user.id,userName});
        
        
      })
      console.log("Login successful");
    } else {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/logout",(req,res)=>{
  res.cookie("token","").json("ok")
  
  
})



app.get("/profile", (req, res) => {
  const {token}=req.cookies
  JWT.verify(token,secret,{},(err,info)=>{
    if(err) throw err;
    res.json(info);
    
    
  })
  
  res.json(req.cookies)
});
app.post("/createPost", uploadMiddleWear.single("file"), async (req, res) => {
  try {
    // 1. **JWT Verification Before File Handling**
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const info = JWT.verify(token, secret); // Moved verification to the beginning

    // 2. **Check for File Upload Success**
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed." });
    }

    const { originalname, path } = req.file;
    const extension = originalname.split(".").pop();
    const newPath = `${path}.${extension}`;

    // 3. **Rename the File**
    fs.rename(path, newPath, async (renameError) => {
      if (renameError) {
        console.error("File rename error:", renameError);
        return res.status(500).json({ message: "Error renaming the file." });
      }

      // 4. **Get Title and Description from Body**
      const { tittle, description } = req.body;

      try {
        // 5. **Create the Post Document with Author**
        const postDoc = await Post.create({
          tittle,
          description,
          file: newPath,
          author: info.id, // Using `info.id` from verified JWT
        });
        return res.json(postDoc); // Respond with the created document
      } catch (dbError) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Error saving post to database." });
      }
    });
  } catch (error) {
    console.error("Error in /createPost:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
});


app.get("/createPost", async (req, res) => {
  try {
    const allPosts = await Post.find()// Populates 'author' with User data
    res.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.use((err, req, res, next) => {
console.error("Global error handler:", err);
res.status(500).json({ message: "Something went wrong!" });
});

  
  app.listen(port,()=>{
    console.log(`we are runninig on port ${port}`)
})