const execa = require("execa");
const path = require("path");
const fs = require("fs");

(async ()=>{
	const { stdout } = await execa('adb', ['exec-out','screencap -p']);
    fs.appendFileSync(path.resolve("cap.png"),stdout,'binary');
    return stdout;
})
()
.then(e=>{
    console.log("end");
    console.log(e);
})
.catch(e=>{
    console.log("err");
    console.log(e);
})