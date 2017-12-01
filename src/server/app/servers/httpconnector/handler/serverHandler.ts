import * as pomelo from 'pomelo';
import * as bluebird from 'bluebird';

import { validate, log } from '../../../../decorator/handler';
import RequestSchema from '../../../../core/validate';
import * as AccountController from '../../../../core/controller/accountController';
import * as ServerController from '../../../../core/controller/serverController';
import { ApiError } from '../../../../core/util/common';
import code from '../../../../../shared/code';

class ServerHandler {
    app: pomelo.Application;

    constructor (app: pomelo.Application) {
        this.app = app;
    }

    /**
     * 提供以http方式登录游戏服务器的方法，与socket登录效果一致，选择其一即可
     * @param args 请求参数
     * @param session 请求session
     * @param next 请求上下文
     */
    // @validate(RequestSchema.SERVER_CONNECT)
    @log(__filename)
    public async entry (args: any, session: any, next: Function) {
        try {
            const token = args.token;
            const serverId = args.serverId;

            const rpcPromise = bluebird.promisify(this.app.rpc.auth.authRemote.jwtAuth as (session: any, token: string, cb:Function) => void, { context: this.app.rpc.auth.authRemote });
            const sessionBindPromise = bluebird.promisify(session.bind as (uid: string, cb:Function) => void, { context: session });
            const sessionPushPromise = bluebird.promisify(session.pushAll, { context: session });

            // auth认证
            const account = <any> await rpcPromise(session, token)
            .catch((err) => {
                throw new ApiError(err.message);
            });

            // 选择服务器
            // const server = await ServerController.connectServer(serverId);
            
            // 检测是否已经登录，如果是则踢出
            const sessionService: pomelo.SessionService = this.app.get('sessionService');
            if (sessionService.getByUid(account.id)) {
                sessionService.kick(account.id, code.ENTRY.FA_DUPLICATE_ENTRY);
            }
            // 绑定session
            await sessionBindPromise(account.id)
            .catch((err) => {
                throw new ApiError(code.ENTRY.FA_SESSION_ALREADY_BIND);
            });
            session.set('accountNo', account.accountNo);
            session.set('serverId', serverId);
            await sessionPushPromise()
            .catch((err) => {
                throw new ApiError(code.ENTRY.FA_SET_SESSION_FAIL);
            });
            next(null, { sid: session.id });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = (app: pomelo.Application) => {
    return new ServerHandler(app);
};
