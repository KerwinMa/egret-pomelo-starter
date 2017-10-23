import * as puremvc from 'puremvc';

import BaseMediator from '../BaseMediator';
import NotificationName from '../../consts/NotificationName';
import { validate, log, dsTrans, handler, iface } from '../../../../modules/Decorator/';

export default class AuthMediator extends BaseMediator {

    public constructor (app: any, mediatorName: string) {
        super(mediatorName, app);

    }

    /**
     * ****************************** handle pomelo request notify ***********************************
     * 客户端发起请求的处理函数，相当于pomelo的handler，包了一层 puremvc mediator
     * @param handler 此装饰器用于注册此函数到pomelo对应服务器的handler中，支持拆分文件进行注册,如果没有注册，则pomelo调用不到
     * @param validate 此装饰器用于使用Joi进行入参验证，并自动转换入参
     * @param dsTrans 此装饰器用于将返回值根据结构体转换，达到减小传输量并加密的目的
     * @param log 自定义的log函数，每一次请求都打印了转换后的 请求、响应的详细信息
     */

    // 用户连接服务器,绑定session
    @handler('auth.remote.authRemote', __filename)
    public auth(token: any, next: Function) {
        const systemConfig = this.app.get('systemConfig');
        const JWT_SECRET = systemConfig.JWT.JWT_SECRET;

        this.sendNotification(NotificationName.AUTH, { token, JWT_SECRET }, (err: Error, data: any) => {
            next(err, data);
        });
    }
}
