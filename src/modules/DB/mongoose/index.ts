import * as Mongoose from 'mongoose';
import * as Promise from 'bluebird';

export class MongoClient {
    constructor (uri: string, cfg: Mongoose.ConnectionOptions) {
        Mongoose.connect(uri, cfg);
        (<any>Mongoose).Promise = Promise;

        let mongoDb = Mongoose.connection;
        mongoDb.on('error', () => {
            console.log(`Unable to connect to database`);
        });
        mongoDb.once('open', () => {
            console.log(`Connected to database`);
        });

        return mongoDb;
    }
}
