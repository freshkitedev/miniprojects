import exp from "express"
import mon from "mongoose"
import dot from "dotenv"
import adminRouter from "./Routes/adminRoute.js"

const app = exp()

dot.config();

app.use(exp.json())
app.use("/admin", adminRouter);

const connect = async () => {
    try {
      await mon.connect(process.env.MONGO, {
        dbName: "course_selling_app",
      });
      console.log("Connection to DB successful");
    } catch (err) {
      console.log("Error while connecting to DB", err);
    }
}

app.listen(process.env.PORT, () => {
    connect()
    console.log("Server is listening on 5001");
})