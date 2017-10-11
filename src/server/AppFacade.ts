import * as puremvc from '../modules/puremvc';

import { StartupCommand } from './app/controller/StartupCommand';

export class AppFacade extends puremvc.Facade implements puremvc.IFacade {
    public static STARTUP: string = 'startup';
    public static instance: AppFacade = null;

    public constructor () {
        super();
    }

    public static getInstance(): AppFacade {
        if (this.instance == null) this.instance = new AppFacade();
        return <AppFacade><any>(this.instance);
    }

    public initializeController(): void {
        super.initializeController();
        this.registerCommand(AppFacade.STARTUP, StartupCommand);
    }

    public startUp(): void {
        this.sendNotification(AppFacade.STARTUP);
        this.removeCommand(AppFacade.STARTUP); // PureMVC初始化完成，注销STARUP命令

        console.info('================>>>> pureMvc appfacade start up...');
    }
}
