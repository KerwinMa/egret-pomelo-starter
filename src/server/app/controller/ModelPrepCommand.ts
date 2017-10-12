import * as puremvc from 'puremvc';
import ProxyName from '../consts/ProxyName';
import UserProxy from '../model/proxy/UserProxy';
import ServerProxy from '../model/proxy/ServerProxy';

export default class ModelPrepCommand extends puremvc.SimpleCommand {

    /**
     * @override
     */
    public execute (note: puremvc.INotification): void {
        // init proxy by given name and data
        const userProxy: puremvc.IProxy = new UserProxy(ProxyName.userProxy, []);
        const serverProxy: puremvc.IProxy = new ServerProxy(ProxyName.serverProxy, []);

        this.facade.registerProxy(userProxy);
        this.facade.registerProxy(serverProxy);
    }
}
