const { Router } = require("express");
const adb = require("../adb");
const app = Router();

app.get("/",async (req,res,next)=>{
    try{
        console.log(adb);
        res.json({ok:true})
    }catch(err){res.json({ok:false,err})}
})

module.exports = app;