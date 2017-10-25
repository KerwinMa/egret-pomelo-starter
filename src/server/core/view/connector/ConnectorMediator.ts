import * as puremvc from 'puremvc';

import BaseMediator from '../BaseMediator';
import RequestSchema from '../../../../modules/Schema/request';

export default class ConnectorMediator extends BaseMediator {

    public constructor (app: any, mediatorName: string) {
        super(app, mediatorName);
    }
}
