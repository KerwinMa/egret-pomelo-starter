import * as puremvc from 'puremvc';
import * as md5 from 'md5';

import msgCode from '../../consts/MsgCode';
import ProxyName from '../../consts/ProxyName';

export default class UserSignUpCommand extends puremvc.SimpleCommand {
    /**
     * @override
     */
    public async execute (note: puremvc.INotification) {
        const account = note.getBody().account;
        const password = note.getBody().password;
        const cb = note.getType();

        const userProxy = <any>this.facade.retrieveProxy(ProxyName.userProxy);

        try {
            let user = await userProxy.findOne({ account });
            if (user) throw new Error(msgCode.USER_SIGNUP_ACCOUNT_EXIST);
            
            user = await userProxy.create({ account, password: md5(password) });
            if (cb) cb(null, user);
        } catch (err) {
            if (cb) cb(err);
        }
    }
}
