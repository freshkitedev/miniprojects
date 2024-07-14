import exp from "express"
import config from "./config/config.js"
import authRoute from "./routes/auth.js"
import mon from "mongoose"
import { todo_router } from "./routes/todo_route.js";

const app = exp();
app.use(exp.json())
app.use("/user", authRoute)
app.use("/todo", todo_router)

async function connect_to_db() {
    try {
      await mon.connect(config.db);
      console.log("Connected to db...");
    } catch (err) {
      console.log("Error connecting to DB:", err);
    }
}
app.listen(config.port, () => {
    connect_to_db();
    console.log("Server started on port:", config.port);
})
