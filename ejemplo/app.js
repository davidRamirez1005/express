import express from 'express';
import dotenv from 'dotenv';
import appCamper from './routers/campus.js';

const appExpress = express();
dotenv.config();

appExpress.use(express.json());

appExpress.use('/campus', appCamper);

const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config.port, config.hostname, () => {
  console.log(`Servidor http://${config.hostname}:${config.port}`);
});
