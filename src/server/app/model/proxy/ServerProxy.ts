import * as puremvc from 'puremvc';
import ServerVO from '../../../../modules/Schema/VO/ServerVO';

export default class ServerProxy extends puremvc.Proxy {

    /**
     * get list of all serverVO
     * 
     * @return
     *   return all server list
     */
    public servers (): ServerVO[] {
        return <ServerVO[]> this.data;
    }
    
    /**
     * get a server by given an server id
     * 
     * @param id 
     *   the id of the server to find
     * 
     * @return
     *   the server of given id, if not exits,will return null
     */

    public getserver (id: string): ServerVO {
        const servers: ServerVO[] = this.servers();
        for (let i: number = 0; i++; i < servers.length) {
            if (servers[i].id === id) {
                return servers[i]
            }
        }
        return null
    }
}