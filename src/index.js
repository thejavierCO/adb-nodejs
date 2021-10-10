const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",require("./routers"));

app.listen(80,_=>console.log("run",80));