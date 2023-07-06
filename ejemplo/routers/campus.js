import express from 'express'

const appCamper = express()

appCamper.use((req,res, next)=>{
    // console.log(req);
    next();
})

appCamper.get('/',(req,res)=>{
    res.send('GET');
})
appCamper.get('/:id',(req,res)=>{
    res.send(`GET ${req.params.id}`);
})
appCamper.post('/:nombre',(req,res)=>{
    let obj = {
        DATA : req.body,
        'URL-GET':req.query,
        PARAMETROS : req.params
    }
    res.send(obj);
})

export default appCamper