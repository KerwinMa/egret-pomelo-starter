import * as pomelo from 'pomelo';
import * as puremvc from 'puremvc';

class UserHandler {
    public app: pomelo.Application;

    constructor (app: pomelo.Application) {
        this.app = app;
    }

    public signIn (args: any, session: any, next: Function) {
        console.log(next);
    }
}

module.exports = function (app: pomelo.Application) {
    return new UserHandler(app);
};
