export function excuteAsyncFunc(promise: Promise<any>) {
    return promise
    .then((data: any) => [null, data])
    .catch((err: any) => [err]);
}

export class ApiError extends Error {
    code: number;
    body: any;
    msg: string;

    constructor (code: number, msg?: string, body?: any) {
        super();
        
        this.code = code;
        if (body) this.body = body;
        if (msg) this.msg = msg;
    }
}
