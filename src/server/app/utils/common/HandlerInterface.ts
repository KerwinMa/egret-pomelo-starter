import * as Pomelo from 'pomelo';

export interface HandlerArgs {
    args: Object;
}

export interface HandlerSession {
    session: Pomelo.Session;
}

export interface HandlerNext {
    (err: Error, data?: { v?: any, m: string}) : void;
}
