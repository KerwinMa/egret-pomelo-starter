// import MediaHandlerMap from '../../../../core/view/MediatorHandlerMap';

// module.exports = MediaHandlerMap.HANDLERS['httpconnector.handler.userHandler'];

import HttpConnector from '../../../../core/view/httpconnector/HttpConnectorMediator';

module.exports = () => HttpConnector.instance;
