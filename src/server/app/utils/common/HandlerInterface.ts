import * as Pomelo from 'pomelo';

// handler函数的入参
export interface HandlerArgs {
    args: Object;
}

export interface HandlerSession {
    session: Pomelo.Session;
}

export interface HandlerNext {
    (err: Error, data?: Object) : void;
}

// handler类函数
export interface HandlerFunc {
    (args: HandlerArgs, session: HandlerSession, next: HandlerNext) : Promise <void>;
}

// handler类接口
export interface PomeloHandler{
    app: Pomelo.Application;
    channelService: Pomelo.ChannelService;
}

export interface PomeloServerInfo {
    serverInfo: Pomelo.ServerInfo;
}

