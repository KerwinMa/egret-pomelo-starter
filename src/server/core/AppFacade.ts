import * as puremvc from 'puremvc';

import StartupCommand from './controller/StartupCommand';

export class AppFacade extends puremvc.Facade implements puremvc.IFacade {
    public static START: string = 'start';
    public static instance: AppFacade = null;
    
    public static getInstance(multitonKey: string): AppFacade {
        if (this.instance == null) this.instance = new AppFacade(multitonKey);
        return <AppFacade><any>(this.instance);
    }

    public constructor (multitonKey: string) {
        super(multitonKey);
    }

    /**
     * @override
     */
    public initializeController(): void {
        super.initializeController();
        this.registerCommand(AppFacade.START, StartupCommand);
    }

    /**
     * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
     * @param	app	-	pomelo应用程序的实例引用
     */
    public start(app: any): void {
        this.sendNotification(AppFacade.START, app);
        this.removeCommand(AppFacade.START); // PureMVC初始化完成，注销STARUP命令

        // application start with puremvc ...
        app.start();
        console.info(`================>>>> pureMvc appfacade start up in ${AppFacade.instance.multitonKey}...`);
    }
}
