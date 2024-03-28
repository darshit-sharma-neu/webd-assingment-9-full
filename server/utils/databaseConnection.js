import config from 'config'
import mongoose from 'mongoose';

export default async function connectDb(){
    const DB_NAME = config.get("database.NAME");
    const DB_HOST = config.get("database.HOST");
    const DB_PORT = config.get("database.PORT");
    try{
        logger.info(`Connecting MongoDb...`);
        logger.info(`Using Host -  ${DB_HOST}:${DB_PORT}`);
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
        logger.info(`Connected to Mongodb - Database ${DB_NAME}`);
    } catch(error){
        logger.error(error.message);
    }
}