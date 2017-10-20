import * as puremvc from 'puremvc';
import MediatorName from '../consts/MediatorName';
import GateMediator from '../view/gate/GateMediator';
import ConnectorMediator from '../view/connector/ConnectorMediator';
import HttpConnectorMediator from '../view/httpconnector/HttpConnectorMediator';
import SessionMediator from '../view/session/SessionMediator';
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
        const httpconnectorMediator = HttpConnectorMediator.getinstance(app, MediatorName.HTTP_CONNECTOR_MEDIATOR);
        const sessionMediator = SessionMediator.getinstance(app, MediatorName.SESSION_MEDIATOR);

        // register all mediators
        this.facade.registerMediator(gateMediator);
        this.facade.registerMediator(connectorMediator);
        this.facade.registerMediator(httpconnectorMediator);
        this.facade.registerMediator(sessionMediator);

        // when all mediator register, bind the handlers funcs to maped mediator
        MediatorHandlerMap.bindHandlerFunc();
    }
}
