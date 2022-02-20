import express, { Application } from 'express';
import cors from 'cors';

import authRoutes from '../routes/auth';
import syncRoutes from '../routes/sync';
import MongoDb from '../db/config';

class Server {

    private app: Application;
    private port: string;
    private paths = {
        auth: '/api/auth',
        sync: '/api/sync'
    };
    private mongoDb: MongoDb;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.mongoDb = new MongoDb();

        this.mongoDb.connect();

        this.middlewares();

        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors({}));

        // Serialize JSON
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.auth, authRoutes );
        this.app.use(this.paths.sync, syncRoutes );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server runnig on http://localhost:${this.port}/`);
        });
    }
}

export default Server;