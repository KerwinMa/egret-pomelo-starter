import * as Pomelo from 'pomelo';
import { HandlerArgs, HandlerSession, HandlerNext } from '../../../utils/common/HandlerInterface';

export class Handler{
    private app: Pomelo.Application;

    constructor (app: Pomelo.Application) {
        this.app = app;
    }

    async queryConnector (args: HandlerArgs, session: HandlerSession, next: HandlerNext) {
        const connectors: Pomelo.ServerInfo[] = this.app.getServersByType('connector');
        if (!connectors || connectors.length === 0) {
            next(new Error('cannot find connector servers!'));
        }
    }
}

module.exports = function (app: Pomelo.Application) {
    return new Handler(app);
};
