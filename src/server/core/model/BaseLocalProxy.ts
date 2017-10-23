import * as puremvc from 'puremvc';
import * as Mongoose from 'mongoose';

export default class BaseProxy<T> extends puremvc.Proxy implements puremvc.IProxy {
    public model: object;

    constructor (VO: object) {
        super();

        
    }
}
