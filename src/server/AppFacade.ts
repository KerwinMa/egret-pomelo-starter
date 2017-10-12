import * as puremvc from 'puremvc';

import StartupCommand from './app/controller/StartupCommand';

export class AppFacade extends puremvc.Facade implements puremvc.IFacade {
    public static START: string = 'start';
    public static instance: AppFacade = null;

    public constructor () {
        super('server');
    }

    public static getInstance(): AppFacade {
        if (this.instance == null) this.instance = new AppFacade();
        return <AppFacade><any>(this.instance);
    }

    public initializeController(): void {
        super.initializeController();
        this.registerCommand(AppFacade.START, StartupCommand);
    }

    public start(): void {
        this.sendNotification(AppFacade.START);
        this.removeCommand(AppFacade.START); // PureMVC初始化完成，注销STARUP命令

        console.info('================>>>> pureMvc appfacade start up...');
    }
}
