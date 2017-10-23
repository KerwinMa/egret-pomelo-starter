import * as puremvc from 'puremvc';
import * as jwt from 'jsonwebtoken';
import * as md5 from 'md5';

import msgCode from '../../consts/MsgCode';
import ProxyName from '../../consts/ProxyName';

export default class UserSignInCommand extends puremvc.SimpleCommand {
    /**
     * @override
     */
    public async execute (note: puremvc.INotification) {
        const account = note.getBody().account;
        const password = note.getBody().password;
        const JWT_SECRET = note.getBody().JWT_SECRET;

        const cb = note.getType();

        const userProxy = <any>this.facade.retrieveProxy(ProxyName.userProxy);

        try {
            const user = await userProxy.findOne({ account });
            if (!user) throw new Error(msgCode.USER_SIGNIN_NO_USER);
            if (md5(password) !== user.password) throw new Error(msgCode.USER_SIGNIN_PWD_NOT_CORRECT);

            const token = jwt.sign({ uid: user.id }, JWT_SECRET);
            if (cb) cb(null, { token });
        } catch (err) {
            if (cb) cb(err);
        }
    }
}
