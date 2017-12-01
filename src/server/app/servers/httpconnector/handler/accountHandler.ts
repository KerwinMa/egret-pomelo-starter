import * as pomelo from 'pomelo';

import { validate, log } from '../../../../decorator/handler';
import RequestSchema from '../../../../core/validate';

import * as AccountController from '../../../../core/controller/accountController';

class AccountHandler {
    app: pomelo.Application;

    constructor (app: pomelo.Application) {
        this.app = app;
    }

    /**
     * 通过账户名、密码进行注册。账户名一般由渠道提供，如微信js-sdk获取到的用户id
     * @param args 请求参数
     * @param session 请求session
     * @param next 请求上下文
     */
    @validate(RequestSchema.ACCOUNT_SIGNUP)
    @log(__filename)
    public async signUp (args: any, session: any, next: Function) {
        const accountName = args.accountName;
        const password = args.password;

        try {
            const result = await AccountController.signUp(accountName, password);
            next(null, result);
        } catch (err) {
            next(err);
        }
    }

    /**
     * 通过账户名、密码进行登录，用于测试使用。上线时使用渠道接口进行直接登录
     * @param args 请求参数
     * @param session 请求session
     * @param next 请求上下文
     */
    @validate(RequestSchema.ACCOUNT_SIGNIN)
    @log(__filename)
    public async signIn (args: any, session: any, next: Function) {
        const accountName = args.accountName;
        const password = args.password;

        try {
            const result = await AccountController.signIn(accountName, password);
            next(null, result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = (app: pomelo.Application) => {
    return new AccountHandler(app);
};
