// cache the ds consts
export class DSTrans {
    private static instance: DSTrans = null;

    private ds: any = {};
    private dsRule: any = {};

    constructor () {
        const dsJsonFile = '../../../../files/data/datastructure/ds.json';
        const dsRuleFile  = '../../../../files/data/datastructure/dsRule.json';
        // get the dsconsts cache
        try {
            this.ds = require(dsJsonFile);
        } catch (e) {
            console.error(`cannot get dsjson file from ${dsJsonFile}`);
        }

        // get the dsRule cache
        try {
            this.dsRule = require(dsRuleFile);
        } catch (e) {
            console.error(`cannot get dsjson file from ${dsRuleFile}`);        
        }
    }

    public static getInstance() {
        if (!this.instance) this.instance = new DSTrans();
        return this.instance;
    }

    // 服务端返回json数据时 调用此方法将json转化，节省流量，且有加密作用
    public transJson(json: Object, dsName: string) {
        const jsonToTrans: any = json;
        const jsonTransed: any = {};
        if (this.ds[dsName]) {
            // do trans
            Object.keys(jsonToTrans).forEach((key: string) => {
                if (this.ds[dsName].indexOf(key) >= 0) {
                    // 先检查dsRule
                    if (this.dsRule[dsName] && this.dsRule[dsName][key]) {
                        if (jsonToTrans[key] instanceof Array) {
                            jsonTransed[this.ds[dsName].indexOf(key)] = jsonToTrans[key].map((v: object) => this.transJson(v, key));
                        } else if (typeof jsonToTrans[key] === 'object') {
                            jsonTransed[this.ds[dsName].indexOf(key)] = this.transJson(jsonToTrans[key], key);
                        } else {
                            console.warn(`${key} of ${dsName} is in the dsRule, but value is not object or array, skip ...`);
                        }
                    } else {
                        jsonTransed[this.ds[dsName].indexOf(key)] = jsonToTrans[key];
                    }
                } else {
                    console.warn(`${key} is not in ${dsName}!\n`);
                }
            });
            return jsonTransed;
        } else {
            console.warn(`cannot find the ${dsName} in your ds file!`);
            return jsonToTrans;
        }
    }

    // 客户端调用此方法还原json数据
    public convertTransedJson (json: Object, dsName: string) {
        const jsonToConvert: any = json;
        const jsonConverted: any = {};
        if (this.ds[dsName]) {
            Object.keys(jsonToConvert).forEach((key: string) => {
                const numberReg = new RegExp('^[0-9]*$');
                if (!numberReg.test(key)) {
                    console.warn(`key: ${key} is not in ${dsName}!\n`);
                } else {
                    const index = parseInt(key, 0);
                    if (this.ds[dsName][index]) {
                        const dsKey = this.ds[dsName][index];
                        // 先检查dsRule
                        if (this.dsRule[dsName] && this.dsRule[dsName][dsKey]) {
                            if (jsonToConvert[key] instanceof Array) {
                                jsonConverted[dsKey] = jsonToConvert[key].map((v: any) => this.convertTransedJson(v, dsKey));
                            } else if (typeof jsonToConvert[key] === 'object') {
                                jsonConverted[dsKey] = this.convertTransedJson(jsonToConvert[key], dsKey); 
                            } else {
                                console.warn(`key: ${key} of ${dsName} is in the dsRule, but value is not object or array, skip ...`);
                            }
                        } else {
                            jsonConverted[dsKey] = jsonToConvert[key];
                        }
                    } else {
                        console.warn(`key: ${key} is not in ${dsName}!\n`);
                    }
                }
            });
            return jsonConverted;
        } else {
            console.warn(`cannot find the ${dsName} in your ds file!`);
            return jsonToConvert;
        }
    }
}
