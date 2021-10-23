const { Router } = require("express");
const buffer = require("buffer");
const adb = require("../adb");
const app = Router();

app.get("/",async (req,res,next)=>{
    if(req.query.key)res.json({ok:true,data:await adb.input.key(req.query.key)});
    else next();
})

app.get("/",async (req,res,next)=>{
    if(req.query.text)res.json({ok:true,data:await adb.input.text(req.query.text)});
    else next();
})

app.get("/cap",async (req,res,next)=>{
    try{
        const cap = await adb.screencap();
        res.status(200).type("png").end(cap);
    }catch(err){
        res.json({ok:false,err})
    }
})

module.exports = app;