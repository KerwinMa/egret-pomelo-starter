import * as Pomelo from 'pomelo';
import GateMediator from '../../../../core/view/gate/GateMediator';

module.exports = function (app: Pomelo.Application) {
    return GateMediator.getinstance(app);
};
