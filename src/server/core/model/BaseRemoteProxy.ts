import * as puremvc from 'puremvc';

export default class BaseRemoteProxy extends puremvc.Proxy implements puremvc.IProxy {
    public dbModel: any;
    public vo: any;

    constructor (proxyName: string, dbModel: any) {
        super(proxyName, dbModel);

        this.dbModel = dbModel;
    }

    public async create (...args: any[]): Promise<object> {
        const user = await this.dbModel.create(...args);
        return new this.vo(user);
    }

    public async findOne (...args: any[]): Promise<object> {
        const user = await this.dbModel.findOne(...args);
        return user ? new this.vo(user) : null;
    }

    public async findById (...args: any[]): Promise<object> {
        const user = await this.dbModel.findById(...args);
        return user ? new this.vo(user) : null;
    }
}
