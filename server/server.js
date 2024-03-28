import logger from './utils/logger.js';

global.logger = logger;

import Express from 'express';
import config from 'config';
import cors from 'cors';
import pingController from './controllers/ping.controller.js';
import userController from './controllers/user.controller.js';
import jobController from './controllers/job.controller.js';

import connectDb from './utils/databaseConnection.js';
import populateJobs from './scripts/seed.js'

const PORT = config.get('server.PORT');
const VERSION = config.get('server.VERSION')
const BASE_URL = `/api/v${VERSION}`
const app = Express();

connectDb();
app.use(cors());
app.use(Express.json());
app.use(Express.static('public'));
app.use(`${BASE_URL}/ping`, pingController);
app.use(`${BASE_URL}/users`, userController);
app.use(`${BASE_URL}/jobs`, jobController);
// populateJobs()
app.listen(PORT, (error) => {
    if(error){
        logger.error(error.message);
        return;
    }
    logger.info(`Server listening on -> localhost:${PORT}${BASE_URL} ...`);
})