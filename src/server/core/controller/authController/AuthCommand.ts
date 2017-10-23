import * as puremvc from 'puremvc';
import * as jwt from 'jsonwebtoken';

import msgCode from '../../consts/MsgCode';
import ProxyName from '../../consts/ProxyName';

export default class AuthCommand extends puremvc.SimpleCommand {
    /**
     * @override
     */
    public async execute (note: puremvc.INotification) {
        const token = note.getBody().token;
        const JWT_SECRET = note.getBody().JWT_SECRET;
        const cb = note.getType();
        const userProxy = <any>this.facade.retrieveProxy(ProxyName.userProxy);
        jwt.verify(token, JWT_SECRET, async (err: Error, decoded: any) => {
            try {
                if (err) throw new Error(msgCode.AUTH_FAIL);
                const user = await userProxy.findById(decoded.uid);
                if (!user) throw new Error(msgCode.AUTH_FAIL);
                if (cb) cb(null, decoded);
            } catch (err) {
                if (cb) cb(err.message);
            }
        });
    }
}
