import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

const initWebRoute = (app) => {
    // app.METHOD(PATH, HANDLER)
    //======================
    router.get ('/',homeController.getHomepage);

//========================
router.get('/about', (req, res) => {
    res.send(`I'm Eric!`)
});

//=============return
return app.use('/', router);


};

// module.export = initWebRoute;
export default initWebRoute;