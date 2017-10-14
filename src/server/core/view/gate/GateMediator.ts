import * as puremvc from 'puremvc';
import * as Pomelo from 'pomelo';

import RequestSchema from '../../../../modules/Schema/request';
import { validate, log } from '../../../../modules/Decorator/';

export default class GateMediator extends puremvc.Mediator implements puremvc.IMediator {

    public static instance: GateMediator = null;
    public static getinstance (app:any, mediatorName?: string) {
        if (!this.instance) this.instance = new GateMediator(app, mediatorName);
        return this.instance;
    }

    public app: Pomelo.Application;
    public channelService: Pomelo.ChannelService;

    public constructor (app: any, mediatorName: string) {
        super(mediatorName, app);
        this.app = app;
        this.channelService = app.get('channelService');
    }

    public listNotificationInterests(): any[] {
        return [];
    }

    public handleNotification(note: puremvc.INotification): void {
        const notificationName = note.getName();
    }

    // /****************************** pomelo handler methods ***********************************/
    @validate(RequestSchema.ID)
    @log(__filename)
    public queryConnector (args: any, session: any, next: Function) {
        const connections = this.app.getServersByType('connector');
        // 暂时写死，error第一个参数应该读消息表
        if (!connections || connections.length === 0) return next('hasNoConnector', 'cannot find connectors!');

        next(null, {
            code: 'ok',
            body: connections[0],
        });
    }
}
