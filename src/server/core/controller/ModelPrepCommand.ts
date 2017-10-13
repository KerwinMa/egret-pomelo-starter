import * as puremvc from 'puremvc';
import ProxyName from '../consts/ProxyName';
import UserProxy from '../model/proxy/UserProxy';

export default class ModelPrepCommand extends puremvc.SimpleCommand {

    /**
     * @override
     */
    public execute (note: puremvc.INotification): void {
        // get pomelo application
        const app = note.getBody();

        // init proxy by given name and data
        const userProxy: puremvc.IProxy = new UserProxy(ProxyName.userProxy, []);

        this.facade.registerProxy(userProxy);
    }
}
