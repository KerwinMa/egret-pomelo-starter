import * as Mongoose from 'mongoose';

// mongo入参
interface DbConfig {
    server?: object;
    replset? : object;
    mongos?: object;
    useMongoClient: boolean;
}

// export class MongoClient {
//     constructor (uri: string, cfg: DbConfig) {
//         Mongoose.createConnection(uri, cfg);
//         const mongoDb = Mongoose.connection;
//         mongoDb.on('error', () => {
//             console.log(`Unable to connect to database: ${uri}`);
//         });
//         mongoDb.once('open', () => {
//             console.log(`Connected to database: ${uri}`);
//         });
//         return mongoDb;
//     }
// }
