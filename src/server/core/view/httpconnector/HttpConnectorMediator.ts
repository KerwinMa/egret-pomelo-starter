import * as puremvc from 'puremvc';
import * as Pomelo from 'pomelo';
import * as jwt from 'jsonwebtoken';

import MsgCode from '../../consts/MsgCode';
import RequestSchema from '../../../../modules/Schema/request';
import { validate, log, dsTrans, handler, iface } from '../../../../modules/Decorator/';

export default class HttpConnectorMediator extends puremvc.Mediator implements puremvc.IMediator {

    public static instance: HttpConnectorMediator = null;
    public static getinstance (app:any, mediatorName?: string) {
        if (!this.instance) this.instance = new HttpConnectorMediator(app, mediatorName);
        return this.instance;
    }

    public app: Pomelo.Application;
    public channelService: Pomelo.ChannelService;

    public constructor (app: any, mediatorName: string) {
        super(mediatorName, app);

        this.app = app;
        this.channelService = this.app.get('channelService');

    }
    // /****************************** handle pomelo push ***********************************/
    public listNotificationInterests(): any[] {
        return [];
    }

    public handleNotification(note: puremvc.INotification): void {
        const notificationName = note.getName();
    }

    /**
     * ****************************** handle pomelo request notify ***********************************
     * 客户端发起请求的处理函数，相当于pomelo的handler，包了一层 puremvc mediator
     * @param handler 此装饰器用于注册此函数到pomelo对应服务器的handler中，支持拆分文件进行注册,如果没有注册，则pomelo调用不到
     * @param validate 此装饰器用于使用Joi进行入参验证，并自动转换入参
     * @param dsTrans 此装饰器用于将返回值根据结构体转换，达到减小传输量并加密的目的
     * @param log 自定义的log函数，每一次请求都打印了转换后的 请求、响应的详细信息
     */

    // 用户登录,发放token供连接服务器使用
    @handler('httpconnector.handler.user', __filename)
    @validate(RequestSchema.AUTH_LOGIN, false)
    @log(__filename)
    public signIn (args: any, session: any, next: Function) {
        console.log('===========>>>', session.uid);
        const user = {
            id: 1,
            account: '123456',
            password: '123456',
        };
        const account = args.account;
        const password = args.password;
        if (user.account !== account) return next(MsgCode.LOGIN_NO_USER, 'has no user found');
        if (user.password !== password) return next(MsgCode.LOGIN_PWD_NOT_CORRECT, 'password not correct');
        // auth success,send jwt token
        const systemConfig = this.app.get('systemConfig');
        const token = jwt.sign({ uid: user.id }, systemConfig.JWT.JWT_SECRET);
        // 执行登录逻辑
        next(null, {
            b: {
                token,
            },
            c: MsgCode.SUCCESS,
        });
    }

    // 用户连接服务器,绑定session
    @handler('httpconnector.handler.user', __filename)
    @validate(RequestSchema.AUTH_CONNECT, false)
    @log(__filename)
    public connect (args: any, session: any, next: Function) {
        const token = args.token;
        const systemConfig = this.app.get('systemConfig');

        jwt.verify(token, systemConfig.JWT.JWT_SECRET, (err: Error, decoded: any) => {
            if (err) return next(MsgCode.AUTH_FAIL, '验证失败');

            // token verify success, bind the uid to session
            const uid = decoded.uid;
            session.bind(uid);
            next(null, {
                c: MsgCode.SUCCESS,
                b: {
                    sid: session.id,
                },
            });
        });
    }
}
