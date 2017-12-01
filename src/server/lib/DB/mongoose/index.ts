import * as Mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as fs from 'fs';
import * as path from 'path';
import * as Logger from 'pomelo-logger';

interface IModel {
    [name: string]: Mongoose.Model<any>;
}

const logger = Logger.getLogger('MongoClient', __filename);

const DEFAULT_ADDRESS = 'mongodb://127.0.0.1:27017';
const DEFAULT_DB = 'game';
const DEFAULT_URL = `${DEFAULT_ADDRESS}/${DEFAULT_DB}`;


export default class MongoClient {
    public static schemas: IModel = {};
    public static types = Mongoose.Schema.Types;

    public static connect (uri: string = DEFAULT_URL, cfg: Mongoose.ConnectionOptions = { useMongoClient: true }) {
        Mongoose.connect(uri, cfg);
        (<any>Mongoose).Promise = Promise;

        const mongoDb = Mongoose.connection;
        mongoDb.on('error', () => {
            logger.error(`unable to connect to mongo database`);
        });
        mongoDb.once('open', () => {
            logger.debug(`successfully connected to mongo database`);
        });
    }

    public static defineModel (name: string, attributes: any, opts: any = {}) {
        const defaultOptions = {
            id: true,
            versionKey: false,
            collection: name,
            timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
        };

        const overrideOptions = Object.assign({}, defaultOptions, opts);
        const schema = new Mongoose.Schema(attributes, overrideOptions);
        const model = Mongoose.model(name, schema);
        this.schemas[name] = model;
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
