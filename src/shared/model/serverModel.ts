/**
 * 模型层 model
 * 模型层不实现业务逻辑、域逻辑，只是对系统数据的高度抽象,更不依赖于运行环境,这样使得前后端可以共享模型层。
 * 对模型层的操作使用代理(proxy) 进行，前端的代理即是http/socket service，后端的代理即是数据库service
 * 
 * by PengJu
 */
export default class ServerModel {
    /**
     * 数据库主键id
    */
    id: string;
    /**
     * 服务器名称
    */
    serverName: string;

    /**
     * 服务器的状态
    */
    state: string;

    /**
     * 服务器的创建时间
     */
    createTime: Date;
    
    /**
     * 服务器最后更新时间
     */
    updateTime: Date;

    constructor (data: any) {
        this.id = data.id;
        this.state = data.state;
        this.createTime = data.createTime;
        this.updateTime = data.updateTime;
    }

    export () {
        const temp = {
            id: this.id,
            state: this.state,
            createTime: this.createTime,
            updateTime: this.updateTime,
        };
        return temp;
    }
}
