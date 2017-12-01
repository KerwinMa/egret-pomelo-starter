/**
 * 业务逻辑层 controller
 * 在这里写业务逻辑的代码，一个函数实现一个业务
 * 错误的抛出使用thro new ApiError的形式，这样就可以在handler中捕获
 * 
 * by PengJu
 */
import * as ServerProxy from '../proxy/dbProxy/ServerProxy';
import ServerState from '../../../shared/consts/ServerState';
import code from '../../../shared/code';
import { ApiError } from '../util/common';
import ServerModel from '../../../shared/model/serverModel';

export const connectServer = async (serverId: string) => {
    const serverData = await ServerProxy.findByServerId(serverId);
    if (!serverData) throw new ApiError(code.ENTRY.FA_SERVER_NOT_EXIT);
    if (serverData.state !== ServerState.NORMAL) throw new ApiError(code.ENTRY.FA_SERVER_AVAILABLE);
    return new ServerModel(serverData);
};
