import * as puremvc from 'puremvc';

import BaseMediator from '../BaseMediator';
import MsgCode from '../../consts/MsgCode';
import RequestSchema from '../../../../modules/Schema/request';
import NotificationName from '../../consts/NotificationName';
import { validate, log, dsTrans, handler, iface } from '../../../../modules/Decorator/';

export default class HttpConnectorMediator extends BaseMediator {

    public constructor(app: any, mediatorName: string) {
        super(mediatorName, app);
    }
    // /****************************** handle pomelo push ***********************************/
    public listNotificationInterests(): any[] {
        return [];
    }

    public handleNotification(note: puremvc.INotification): void {
        const notificationName = <string>note.getName();
        const notificationBody = <any>note.getBody();
    }

    /**
     * ****************************** handle pomelo request notify ***********************************
     * 客户端发起请求的处理函数，相当于pomelo的handler，包了一层 puremvc mediator
     * @param handler 此装饰器用于注册此函数到pomelo对应服务器的handler中，支持拆分文件进行注册,如果没有注册，则pomelo调用不到
     * @param validate 此装饰器用于使用Joi进行入参验证，并自动转换入参
     * @param dsTrans 此装饰器用于将返回值根据结构体转换，达到减小传输量并加密的目的
     * @param log 自定义的log函数，每一次请求都打印了转换后的 请求、响应的详细信息
     */

    // 用户注册
    @handler('httpconnector.handler.userHandler', __filename)
    @log(__filename)
    public signUp(args: any, session: any, next: Function) {
        const account = args.account;
        const password = args.password;
        this.sendNotification(NotificationName.USER_SIGNUP, { account, password }, (err: Error, data: any) => {
            next(err, data);
        });
    }

    // 用户登录,发放token供连接服务器使用
    @handler('httpconnector.handler.userHandler', __filename)
    @validate(RequestSchema.USER_SIGNIN, false)
    @log(__filename)
    public signIn(args: any, session: any, next: Function) {
        const account = args.account;
        const password = args.password;
        const systemConfig = this.app.get('systemConfig');
        const JWT_SECRET = systemConfig.JWT.JWT_SECRET;

        this.sendNotification(NotificationName.USER_SIGNIN, { account, password, JWT_SECRET },(err: Error, data: any) => {
            next(err, data);
        });
    }

    // 用户连接服务器
    @handler('httpconnector.handler.userHandler', __filename)
    @validate(RequestSchema.AUTH_CONNECT, false)
    @log(__filename)
    public connect(args: any, session: any, next: Function) {
        const token = args.token;
        this.app.rpc.auth.authRemote.auth(session, token, (err: Error, decoded: any) => {
            if (err) return next(err);
            const uid = decoded.uid;
            session.bind(uid, (err: Error) => {
                if (err) return next(MsgCode.CONNECT_FAIL, err.message);

                next(null, {
                    c: MsgCode.SUCCESS,
                    b: {
                        sid: session.id,
                    },
                });
            });
        });
    }
}
