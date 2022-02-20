import mongoose from "mongoose";

class MongoDb {

    private connectionString: string;

    constructor() {
        this.connectionString = process.env.MONGODBCNN || "";
    }

    async connect() {

        try {

            await mongoose.connect(this.connectionString);
            console.log('Successfuly connection');

        } catch (error) {

            throw new Error('Couldnt connect to MongoDb');

        }

    }
}

export default MongoDb;