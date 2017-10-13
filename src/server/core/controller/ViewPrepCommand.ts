import * as puremvc from 'puremvc';
import MediatorName from '../consts/MediatorName';
import GateMediator from '../view/gate/GateMediator';

export default class ViewPrepCommand extends puremvc.SimpleCommand {
    /**
     * @override
     */
    public execute (note: puremvc.INotification): void {
        // pomelo application
        const app = note.getBody();

        const gateMediator = GateMediator.getinstance(app, MediatorName.GateHandlerMediator)
        this.facade.registerMediator(gateMediator)
    }
}