import * as puremvc from 'puremvc';
import * as Pomelo from 'pomelo';

export default class GateMediator extends puremvc.Mediator implements puremvc.IMediator {

    public static instance: GateMediator = null
    public static getinstance (app:any, mediatorName?: string) {
        if (!this.instance) this.instance = new GateMediator(app, mediatorName)
        return this.instance;
    }

    public app: Pomelo.Application
    public channelService: Pomelo.ChannelService

    public constructor (app: any, mediatorName: string) {
        super(mediatorName, app);
        this.app = app;
        this.channelService = app.get('channelService');
    }

    public listNotificationInterests(): Array<any> {
        return [];
    }

    public handleNotification(note: puremvc.INotification): void {
        const notificationName = note.getName();
    }

    /****************************** pomelo handler methods ***********************************/
    public queryConnector (args: any, session: any, next: any) {
        const connections = this.app.getServersByType('connector');
        if (!connections || connections.length ===0) {
            next(null, {
                code: 500,
                msg: 'cannot find connectors!'
            })
        }
        next(null, {
            code: 200,
            body: connections[0]
        })
    }
}
