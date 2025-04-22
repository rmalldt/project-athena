const { Router } = require('express');

const authenticator = require('../middlewares/authenticator');
const dashboardController = require('../controllers/dashboard');

const dashBoardRouter = Router();

dashBoardRouter.get('/', authenticator, dashboardController.dashboard);

module.exports = dashBoardRouter;
