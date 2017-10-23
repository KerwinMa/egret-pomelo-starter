import * as Mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as fs from 'fs';
import * as path from 'path';
import * as Logger from 'pomelo-logger';

const logger = Logger.getLogger('MongoClient', __filename);

export default class MongoClient {
    public static definedModels: any = {};

    public static connect (uri: string = 'mongodb://localhost:32768/test', cfg: Mongoose.ConnectionOptions = { useMongoClient: true }) {
        Mongoose.connect(uri, cfg);
        (<any>Mongoose).Promise = Promise;

        const mongoDb = Mongoose.connection;
        mongoDb.on('error', () => {
            console.error(`Unable to connect to mongo database`);
        });
        mongoDb.once('open', () => {
            console.debug(`Connected to mongo database`);
        });
    }

    public static defineModel (name: string, attributes: any, opts: any = {}) {
        const defaultOptions = {
            versionKey: false,
            collection: name,
            timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
        };

        const overrideOptions = Object.assign({}, defaultOptions, opts);
        const schema = new Mongoose.Schema(attributes, overrideOptions);
        const model = Mongoose.model(name, schema);
        this.definedModels[name] = model;
    }

    public static initModel (dirPath: string) {
        const files = fs.readdirSync(dirPath);

        for (const file of files) {
            if (file.endsWith('.js')) {
                const name = file.substring(0, file.length - 9);
                const attributes = require(path.join(dirPath, file)).attributes;
                const opts = require(path.join(dirPath, file)).opts;
                this.defineModel(name, attributes, opts);
                logger.debug(`import model from file ${file}...`);
            }
        }
    }
}
