import * as puremvc from 'puremvc';
import * as Pomelo from 'pomelo';

import RequestSchema from '../../../../modules/Schema/request';
import { validate, log, dsTrans, handler, iface } from '../../../../modules/Decorator/';

export default class ConnectorMediator extends puremvc.Mediator implements puremvc.IMediator {

    public static instance: ConnectorMediator = null;
    public static getinstance (app:any, mediatorName?: string) {
        if (!this.instance) this.instance = new ConnectorMediator(app, mediatorName);
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

    // 选择一台connector服务器进行链接
    @handler('connector.handler.handler', __filename)
    @validate(RequestSchema.AUTH_LOGIN)
    @log(__filename)
    public connect (args: any, session: any, next: Function) {
        next(null, {
            c: 'ok',
            b: {
                loginKey: 'ssssssssssssss',
            },
        });
    }
}
