import './database/connection';
import routes from './routes'
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

const application = express();
application.use(cors());
application.use(express.json());
application.use(routes);

application.listen(process.env.PORT || 3001, () => {
    console.log('📦 Server running');
});