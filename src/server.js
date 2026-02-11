import express from 'express';
import configViewEngine from './config/Viewengine';
import initWebRoute from './router/web';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
console.log('>>> check port: ', port);

//set up view engine
configViewEngine(app);

//init web route
initWebRoute(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

//Example app listening at http://localhost:3001