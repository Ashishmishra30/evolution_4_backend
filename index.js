const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { auth } = require("./middlewares/authMiddlewares");
const { postRouter } = require("./routes/postRoutes");


const app = express();
app.use(express.json())

app.use("users", userRouter)

app.use(auth);
app.use("posts", postRouter);

app.listen(8080, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        console.log("Not Connected to DB")
    }
    console.log("server listening on 8080")
})