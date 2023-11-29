import exp from "express"
import dot from "dotenv"
import mon from "mongoose"
import cors from "cors"
const app = exp()
dot.config();
app.use(exp.json())
app.use(cors())

const tschema = new mon.Schema({
    title : {
        type:String
    },
    description: String
});

const todoCollection = mon.model('todo', tschema);

app.post('/todos', async (req, res) => {
    const data = { title: req.body.title, description: req.body.description };

    try {
        const entry = new todoCollection(data);
        await entry.save();
        res.status(200).json(data);
        console.log("Added successfully:", data);
    } catch (err) {
        console.log(err);
        res.status(400).json({message:"Add failed"});
    }
})

const middleware = (req, res, next) => {
    console.log("Middleware");
    const user = true;
    if (user) {
        next();
    } else {
        res.status(400).json("Invalid user")
    }
}

// app.get('/', (req,res) => {

// })
app.get('/todos', middleware,  async (req, res) => {
    try {
        const data = await todoCollection.find({}).exec();
        console.log("Get success:", data);
        res.status(200).json(data);
    } catch(err) {
        console.log("Get failure:", data);
        res.status(400).json(err);
    }
})

app.put('/todos/:id', async (req, res) => {
    try {
        const entry = await todoCollection.findByIdAndUpdate(req.params.id, 
            req.body, {new:true});
        console.log("Updated:", entry);
        res.status(200).json(entry);
    } catch(err) {
        console.log("Update failure:", req.params.id);
        res.status(400).json(err);
    }
})

app.delete('/todos/:id', async (r, p) => {
    try {
        await todoCollection.findByIdAndDelete(r.params.id);
        p.status(200).json({message: `Deleted ${r.params.id} succesfully`});
    } catch(err) {
        console.log("Deleted failure:");
        p.status(400).json(err);
    }
})

const connect = async () => {
    try {
        await mon.connect(process.env.MONGO);
        console.log("Connection to DB successfull");
    } catch(err) {
        console.log("Error while connecting to DB:", err);
    }
}


// Start the http server
app.listen(process.env.PORT, () => {
    connect();
    console.log("Server is running...");
})