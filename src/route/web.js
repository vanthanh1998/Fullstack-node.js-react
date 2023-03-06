import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/get-create-user', userController.getUser);
    router.post('/post-create-user', userController.postUser);

    router.get('/get-list-user', userController.getListUser);

    router.get('/get-edit-user', userController.getEditUser);
    router.post('/post-edit-user', userController.postEditUser);

    router.get('/delete-user', userController.deleteUser);

    router.post('/api/login', userController.handleLogin);

    return app.use("/", router);
}

module.exports = initWebRoutes;