// import MediaHandlerMap from '../../../../core/view/MediatorHandlerMap';

// module.exports = MediaHandlerMap.HANDLERS['connector.handler.handler'];

import HttpConnector from '../../../../core/view/httpconnector/HttpConnectorMediator';

module.exports = () => HttpConnector.instance;
