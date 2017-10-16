import * as puremvc from 'puremvc';
import MediatorName from '../consts/MediatorName';
import GateMediator from '../view/gate/GateMediator';
import ConnectorMediator from '../view/connector/ConnectorMediator';
import MediatorHandlerMap from '../view/MediatorHandlerMap';

export default class ViewPrepCommand extends puremvc.SimpleCommand {
    /**
     * @override
     */
    public execute (note: puremvc.INotification): void {
        // pomelo application
        const app = note.getBody();

        // get all the mediators
        const gateMediator = GateMediator.getinstance(app, MediatorName.GATE_MEDIATOR);
        const connectorMediator = ConnectorMediator.getinstance(app, MediatorName.CONNECTOR_MEDIATOR);

        // register all mediators
        this.facade.registerMediator(gateMediator);
        this.facade.registerMediator(connectorMediator);

        // when all mediator register, bind the handlers funcs to maped mediator
        MediatorHandlerMap.bindHandlerFunc();
    }
}
