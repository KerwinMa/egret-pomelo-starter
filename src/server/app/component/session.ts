import * as pomelo from 'pomelo';

/**
 * 重写的Session component. Manage sessions.
 *
 * @param {Object} app  current application context
 * @param {Object} opts attach parameters
 */

class Component {

    public app: pomelo.Application;
    public service: pomelo.SessionService;

    constructor (app: pomelo.Application, opts: object = {}) {
        this.app = app;
    }
}
