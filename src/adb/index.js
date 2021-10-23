const execa = require("execa");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const keycode = [
    "UNKNOWN", 
    "MENU" ,
    "SOFT_RIGHT", 
    "HOME" ,
    "BACK" ,
    "ENDCALL" ,
    "CALL" ,
    "0" ,
    "1" ,
    "2" ,
    "4" ,
    "5" ,
    "6" ,
    "3" ,
    "7" ,
    "8" ,
    "9" ,
    "STAR" ,
    "POUND" ,
    "UP" ,
    "DOWN" ,
    "LEFT" ,
    "RIGHT" ,
    "CENTER" ,
    "VOLUME_UP" ,
    "VOLUME_DOWN" ,
    "POWER" ,
    "CAMERA" ,
    "CLEAR" ,
    "A" ,
    "B" ,
    "C" ,
    "D" ,
    "E" ,
    "F" ,
    "G" ,
    "H" ,
    "I" ,
    "J" ,
    "K" ,
    "L" ,
    "M" ,
    "N" ,
    "O" ,
    "P" ,
    "Q" ,
    "R" ,
    "S" ,
    "T" ,
    "U" ,
    "V" ,
    "W" ,
    "X" ,
    "Y" ,
    "Z" ,
    "COMMA" ,
    "PERIOD" ,
    "ALT_LEFT" ,
    "ALT_RIGHT" ,
    "SHIFT_LEFT" ,
    "SHIFT_RIGHT" ,
    "TAB" ,
    "SPACE" ,
    "SYM" ,
    "EXPLORER" ,
    "ENVELOPE" ,
    "ENTER" ,
    "DEL" ,
    "GRAVE" ,
    "MINUS" ,
    "EQUALS" ,
    "LEFT_BRACKET" ,
    "RIGHT_BRACKET" ,
    "BACKSLASH" ,
    "SEMICOLON" ,
    "APOSTROPHE" ,
    "SLASH" ,
    "AT" ,
    "NUM" ,
    "HEADSETHOOK" ,
    "FOCUS" ,
    "PLUS" ,
    "MENU" ,
    "NOTIFICATION" ,
    "SEARCH" ,
    "TAG_LAST_KEYCODE"
]

async function key(text=""){
    try{
        if(typeof text == "string"){
            const { stdout } = await execa("adb",[
                "shell",
                "input",
                "keyevent",
                keycode.indexOf(text.toLocaleUpperCase())
            ])
            return stdout;
        }else throw {err:"require string"}
    }catch(err){
        throw err
    }
}
async function text(text){
    try{
        if(typeof text == "string"){
            const { stdout } = await execa("adb",[
                "shell",
                "input",
                "keyboard",
                "text",
                `\'${text}\'`
            ])
            return stdout;
        }else throw {err:"require string"}
    }catch(err){
        throw err
    }
}

async function screencap(){
    try{
        await execa("adb",[
            "exec-out",
            "screencap",
            "-p",
            "sdcard/s.png"
        ])
        .then(async _=>await execa("adb",["pull","sdcard/s.png",path.resolve("s.png")]))
        .catch(async e=>{
            if(e.stderr){return await axios.get("http://http.cat/404").then(e=>e.data)}
        }).then(e=>fs.appendFile(path.resolve("s.png"),e,err=>{console.log(err)}))
        return fs.readFileSync(path.resolve("s.png"));
    }
    finally{
        // fs.rmSync(path.resolve("s.png"));
    }
}

module.exports = {
    input:{
        key,
        text
    },
    screencap
};