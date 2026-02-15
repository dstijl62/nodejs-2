import express from 'express';
import configViewEngine from './config/Viewengine';
import initWebRoute from './router/web';
import initAPIRoute from './router/api'; // <---
// import connection from './config/connectDB';

require('dotenv').config();

//Khai báo morgan
var morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;
console.log('>>> check port: ', port);

//Định nghĩa middleware
app.use((req, res, next) => {
    // check => return res.send()
    console.log('>>> run into my middleware');
    console.log(req.method);
    next(); // nếu hợp lệ thì => next ()
})

// in order to use morgan
app.use(morgan('combined'));

//config lấy data lên server
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//set up view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init API rout   <---
initAPIRoute(app); 

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

//Example app listening at http://localhost:3001