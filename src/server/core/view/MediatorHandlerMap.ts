export default class MediaHandlerMap {
    public static HANDLERMAP: any = {};
    public static HANDLERS: any = {};

    public static bindHandlerFunc () {
        Object.keys(this.HANDLERMAP).forEach((route) => {
            const map = this.HANDLERMAP[route];

            if (!this.HANDLERS[route]) this.HANDLERS[route] = {};

            map.forEach((value: any, key: any) => {
                const instance = require(value.fileName).default.instance;
                this.HANDLERS[route][key] = value.func.bind(instance);
            });

        });
    }
}


