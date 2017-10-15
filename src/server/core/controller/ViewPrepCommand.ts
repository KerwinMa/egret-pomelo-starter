import * as puremvc from 'puremvc';
import MediatorName from '../consts/MediatorName';
import GateMediator from '../view/gate/GateMediator';
import MediatorHandlerMap from '../view/MediatorHandlerMap';

export default class ViewPrepCommand extends puremvc.SimpleCommand {
    /**
     * @override
     */
    public execute (note: puremvc.INotification): void {
        // pomelo application
        const app = note.getBody();

        const gateMediator = GateMediator.getinstance(app, MediatorName.GATEHANDLERMEDIATOR);
        this.facade.registerMediator(gateMediator);

        // when all mediator register, bind the handlers funcs to maped mediator
        MediatorHandlerMap.bindHandlerFunc();
    }
}
