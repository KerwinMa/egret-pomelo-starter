import * as Pomelo from 'pomelo';
import { 
    PomeloHandler,
    HandlerArgs, 
    HandlerSession, 
    HandlerNext,
    HandlerFunc,
} from '../../../utils/common/HandlerInterface';

import { serverDispatch } from '../route/dispatch';

export class Handler  implements PomeloHandler{
    app: Pomelo.Application;
    channelService: Pomelo.ChannelService;

    constructor (app:Pomelo.Application) {
        this.app = app;
        this.channelService = app.get('channelService');
    }

    async queryConnector
    (args: HandlerArgs, session: HandlerSession, next: HandlerNext) : Promise <void> {
        const connectors: Pomelo.ServerInfo[] = this.app.getServersByType('connector');
        if (!connectors || connectors.length === 0) {
            return next(new Error('cannot find connector servers!'));
        }
        const server = serverDispatch(connectors);
        next(null, { host: server.host, port: server.port, id: server.id });
    }

}

module.exports = function (app: Pomelo.Application) {
    return new Handler(app);
};
