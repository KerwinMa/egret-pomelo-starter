import * as Pomelo from 'pomelo';

class Event {
    public app: Pomelo.Application;
    public opts: object;

    constructor (app: Pomelo.Application, opts: object) {
        this.app = app;
        this.opts = opts;
    }

    // do something when application add servers
    add_servers (servers: any) {

    }

    // do something when application remove servers
    remove_servers (ids: any) {

    }

    // do something when server reconnected
    replace_servers (servers: any) {

    }    

    // do something when session binded
    bind_session (session: object) {

    }

    // do something when session closed
    close_session (session: object) {

    }
}

module.exports = function (app: Pomelo.Application, opts: object) {
    return new Event(app, opts);
};
