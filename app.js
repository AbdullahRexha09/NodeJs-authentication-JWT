const express = require('express');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const app = express();

app.use(express.json());
app.use("/auth",auth);
app.use("/posts",posts)


app.get("/",(res,req) => {
    res.send("Ji i am working");
});


app.listen(3000,()=> console.log("Server is listening"))

