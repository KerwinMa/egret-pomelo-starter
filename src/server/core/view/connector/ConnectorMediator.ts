import * as puremvc from 'puremvc';

import BaseMediator from '../BaseMediator';
import RequestSchema from '../../../../modules/Schema/request';
import { validate, log, dsTrans, handler, iface } from '../../../../modules/Decorator/';

export default class ConnectorMediator extends BaseMediator {

    public constructor (app: any, mediatorName: string) {
        super(mediatorName, app);
    }
}
