import * as Pomelo from 'pomelo';
import * as Random from 'random-js';

const random = new Random();

// connector服务器分配函数,可以自由配置分配策划,此处为随机选择
export const serverDispatch = (servers: Pomelo.ServerInfo[]): Pomelo.ServerInfo => {
    const server = random.pick(servers);
    return server;
};
