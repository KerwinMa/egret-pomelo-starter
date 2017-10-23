import * as puremvc from 'puremvc';
import MediatorName from '../consts/MediatorName';
import GateMediator from '../view/gate/GateMediator';
import ConnectorMediator from '../view/connector/ConnectorMediator';
import HttpConnectorMediator from '../view/httpconnector/HttpConnectorMediator';
import AuthMediator from '../view/auth/AuthMediator';
import MediatorHandlerMap from '../view/MediatorHandlerMap';

export default class ViewPrepCommand extends puremvc.SimpleCommand {
    /**
     * @override
     */
    public execute (note: puremvc.INotification): void {
        // pomelo application
        const app = note.getBody();

        // get all the mediators
        const gateMediator = new GateMediator(app, MediatorName.GATE_MEDIATOR);
        const connectorMediator = new ConnectorMediator(app, MediatorName.CONNECTOR_MEDIATOR);
        const httpconnectorMediator = new HttpConnectorMediator(app, MediatorName.HTTP_CONNECTOR_MEDIATOR);
        const authMediator = new AuthMediator(app, MediatorName.AUTH_MEDIATOR);

        // register all mediators
        this.facade.registerMediator(gateMediator);
        this.facade.registerMediator(connectorMediator);
        this.facade.registerMediator(httpconnectorMediator);
        this.facade.registerMediator(authMediator);

        // when all mediator register, bind the handlers funcs to maped mediator
        MediatorHandlerMap.bindHandlerFunc();
    }
}
