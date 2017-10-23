import * as puremvc from 'puremvc';
import * as path from 'path';

import MongoClient from '../../../modules/DB/mongoose';
import ProxyName from '../consts/ProxyName';
import UserProxy from '../model/proxy/UserProxy';

export default class ModelPrepCommand extends puremvc.SimpleCommand {

    /**
     * @override
     */
    public execute (note: puremvc.INotification): void {

        // init db and define all models by dir at once
        const dbSchemaDir = path.resolve(__dirname, '../model/dbSchema');
        MongoClient.connect();
        MongoClient.initModel(dbSchemaDir);

        // register remote proxy
        const userProxy: puremvc.IProxy = new UserProxy(ProxyName.userProxy, MongoClient.definedModels['User']);

        this.facade.registerProxy(userProxy);
    }
}
