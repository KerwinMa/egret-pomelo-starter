import * as puremvc from 'puremvc';
import * as Pomelo from 'pomelo';

export default class BaseMediator extends puremvc.Mediator implements puremvc.IMediator {
    public app: Pomelo.Application;
    public channelService: Pomelo.ChannelService;

    public constructor(app: any, mediatorName: string) {
        super(mediatorName, app);

        this.app = app;
        this.channelService = this.app.get('channelService');

    }

    // /****************************** handle pomelo push ***********************************/
    public listNotificationInterests(): any[] {
        return [];
    }

    public handleNotification(note: puremvc.INotification): void {
        const notificationName = <string>note.getName();
        const notificationBody = <any>note.getBody();
    }

}
