require("dotenv").config({ path: "./config.env" })

const cors = require("cors");
const express = require("express");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const users = require("./models/user");
const eyepower = require("./models/eyePower");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const { checkUser, checkAuth } = require("./middleware/authmiddleware");

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Conected to DB");
    app.listen(PORT, () => {
        console.log(`Runnning at port: ${PORT}`)
    })
}).catch((e) => {
    console.log(e);
})

// getting json data
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(cors());

// setting view-engine
app.set("view engine", "ejs");
app.set("views", "templates");

app.get('*', checkUser);
app.post('*', checkUser);
app.get("/", (req, res) => { res.render("index") });
app.get("/checkup", (req, res) => { res.render("app") });


// signup

app.get("/signup", (req, res) => { res.render("signup") })
app.get("/login", (req, res) => { res.render("login") })


const maxage = 3 * 24 * 60 * 60;
function createToken(id) {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxage });
}

app.post("/signup", async (req, res) => {

    const { username, password, email } = req.body;
    const image = `https://robohash.org/${Date.now()}.png?size=50x50&set=set1`;

    const newUser = await users.create({ username, password, email, image });
    const token = createToken(newUser._id);

    res.cookie("jwt", token, { maxAge: maxage * 1000, httpOnly: true });
    res.redirect("/");

})

app.post("/login", async (req, res) => {

    const { email, passsword } = req.body;
    console.log(req.body)

    const user = await users.findOne({ email });

    if (user.passsword === passsword) {
        const token = createToken(user._id);
        res.cookie("jwt", token, { maxAge: maxage * 1000, httpOnly: true });
        res.redirect('/')
    }
    else {
        res.redirect("/login");
    }

})

app.get("/logout", (req, res) => {
    res.cookie("jwt", "frostHack", { maxAge: 1, httpOnly: true });
    res.redirect("/");
})

app.get("/profile", checkAuth, async (req, res) => {

    const user_id = res.locals.user._id;
    const usereyePower = await eyepower.find({ user: user_id });

    res.render("profile", { userData: usereyePower });
});

app.post("/saveResult" ,checkAuth, async (req, res) => {
    const { leftEye, rightEye } = req.body;

    console.log(req.body)

    let date = Date.now();

    if (leftEye == "" || rightEye == "") {
        res.json("false");
    }
    else {
        try {
            await eyepower.create({ leftEye, rightEye, date ,user:res.locals.user._id })
            res.json("true");

        } catch (error) {
            console.log(error)
            res.json("false");
        }
    }
})




app.post("/send", (req, res) => {
    const data = req.body;
    console.log(data)

    data.subject += `Message from ${data.email}`;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        pool: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        from: data.email,
        to: "b21193@students.iitmandi.ac.in",
        subject: data.subject,
        text: data.body
    }

    let resData = { bool: true }
    transporter.sendMail(mailOptions, (err, info) => {
        transporter.close();
        if (err) {
            console.log(err)
            resData.bool = false;
        }
    })
    res.json(JSON.stringify(resData));
})
