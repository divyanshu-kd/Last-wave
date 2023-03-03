require("dotenv").config({path: "./config.env"})

const express = require("express");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const users = require("./models/user");
const mongoose = require("mongoose");
const PORT = process.env.PORT||5000;
const {checkUser,checkAuth} = require("./middleware/authmiddleware");

const app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Conected to DB");
    app.listen(PORT , ()=>{
        console.log(`Runnning at port: ${PORT}`)
    })
}).catch((e)=>{
    console.log(e);
})

// getting json data
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());

// setting view-engine
app.set("view engine", "ejs");
app.set("views", "templates");

app.get('*', checkUser);
app.get("/",(req,res)=>{res.render("index");

});


// signup

app.get("/signup",(req,res)=> {res.render("signup")})
app.get("/login",(req,res)=> {res.render("login")})


const maxage = 3 * 24 * 60 * 60;
function createToken(id){
    return jwt.sign({id}, process.env.SECRET , {expiresIn : maxage});
}

app.post("/signup",async(req,res)=>{

    const {username , password, email} = req.body;

    const newUser = await users.create({username , password,email});
    const token = createToken(newUser._id);

    res.cookie("jwt" , token , {maxAge : maxage * 1000 , httpOnly: true});
    res.redirect("/");

})

app.post("/login",async(req,res)=>{

    const {email,passsword} = req.body;

    const user = await users.findOne({email});

    if(user.passsword === passsword){
        const token = createToken(user._id);
        res.cookie("jwt",token , {maxAge:maxage * 1000 , httpOnly:true});
        res.redirect('/')
    }
    else{
        res.redirect("/login");
    }

})

app.get("/logout",(req,res)=>{
    res.cookie("jwt","frostHack" , {maxAge : 1, httpOnly:true});
    res.redirect("/");
})
