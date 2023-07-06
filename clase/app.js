import dotenv from 'dotenv'
import express from 'express'

dotenv.config();

const appExpress = express()

let validate = (req, res, next) => {
    console.log("hola mundo");
        let data = ""
        req.on("data",(input)=>{
            data += input;
        })
        req.on("end",()=>{
            console.log(data);
            next();
        })
}

appExpress.get("/campus",validate,(req,res)=>{
    console.log("data url ",req.query);
    console.log("data paramentro ",req.params);
    console.log("data cuerpo ",req.body);
    console.log("data path ",req.path);
    res.send();
})
// appExpress.get("/",(req,res)=>{
//     res.send("Hello World get 2");
// })
// appExpress.post("/campus",(req,res)=>{
//     res.send("Hello World post");
// })

let config = JSON.parse(process.env.MY_CONFIG)
appExpress.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`)
})
