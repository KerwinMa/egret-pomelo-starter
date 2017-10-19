import * as pomelo from 'pomelo';
import SessionService from '../service/sessionService';

const importFuncs = ['get', 'create', 'bind', 'unbind', 'getByUid', 'remove', 'import', 'importAll', 'kick', 'kickBySessionId', 'getClientAddressBySessionId', 'getClientAddressBySessionId', 'sendMessage', 'sendMessageByUid', 'forEachSession', 'forEachBindedSession'];

/**
 * 重写的Session component. Manage sessions.
 *
 * @param {Object} app  current application context
 * @param {Object} opts attach parameters
 */

class Component {
    [key: string]: any;

    public app: pomelo.Application;
    public service: any;

    constructor (app: pomelo.Application, opts: any = {}) {
        this.app = app;
        this.service = new SessionService(opts);

        const getFun = function (m: any) {
            return (function () {
                return function () {
                    return this.service[m].apply(this.service, arguments);
                };
            })();
        };
        for (let i = 0; i < importFuncs.length; i ++) {
            const name = importFuncs[i];
            this[name] = getFun(name);
        }
    }
}

Component.prototype.name = '__session__';

module.exports = function (app: pomelo.Application, opts: object) {
    const cmp = new Component(app, opts);
    app.set('sessionService', cmp, true);
    return cmp;
};
