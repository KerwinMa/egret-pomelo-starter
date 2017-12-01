/**
 * 数据代理层 proxy
 * 在这里实现对本地数据或数据库数据的操作，并返回相应的模型实例或实例列表
 * 业务逻辑代码中需要用到的数据都来源于proxy,这样使得如果数据库发生变化时，业务逻辑代码不用重构
 * 
 * by PengJu
 */

import MongoClient from '../../../lib/DB/mongoose';
import ServerModel from '../../../../shared/model/ServerModel';

const mongoSchemas = MongoClient.schemas;

/**
 * 通过id查找服务器
 * @param serverId 服务器id
 */
export const findByServerId = async (serverId: string): Promise<ServerModel> => {
    const serverData = await mongoSchemas.Server.findById(serverId)
    .catch((err) => {
        throw err;
    });
    if (!serverData) return null;
    return new ServerModel(serverData);
};

/**
 * 通过名称查找服务器
 * @param serverName 服务器名称
 */
export const findByServerName = async (serverName: string): Promise<ServerModel> => {
    const serverData = await mongoSchemas.Server.findOne({ serverName })
    .catch((err) => {
        throw err;
    });
    if (!serverData) return null;
    return new ServerModel(serverData);
};
