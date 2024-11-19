const  express = require("express");
const  { engine } = require("express-handlebars")
//const bodyParser = require("body-parser")
const app = express();
const port = 3000

//Controller

//Routes
const router = require("./routes/router");
const Controller = require("./controllers/Controllers")

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())
//Testando git
app.engine("handlebars", engine());
app.set("view engine", "handlebars")

//Renderizando estilos
app.use(express.static("public"))

app.use("/", router)
app.use("/", Controller.home)

app.listen(port, (err) => {
    if (err){
        console.log(err);
    };
    console.log(`Rodando na porta: ${port}`); 
})