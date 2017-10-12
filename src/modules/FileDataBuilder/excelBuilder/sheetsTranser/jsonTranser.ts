import * as valHandlers from '../valHandlers/jsonValHandler';
import { BuilderOpts } from '../interface';

const NUM_EXP =  /(^([\-]?[\d]+)$)|(^([\-]?[\d]+\.[\d]+)$)/;

export interface anyObj {
    [propName: string]: any;
}

export class JsonTranser {
    sheet: anyObj;
    input: string;
    out: string;
    idName: string = 'id';
    ignores: string[] = [];
    valHandler: anyObj = {};
    result: anyObj = {};
    idResult: anyObj = {};
    colMap: anyObj = {};
    rows: number = 0;
    isUglified: boolean = false;

    constructor (sheet: anyObj, opts: BuilderOpts) {
        this.sheet = sheet;
        this.input = opts.input;
        this.out = opts.out;
        this.idName = opts.idName;
    }

    initRows () {
        const keys = Object.keys(this.sheet);
        for (const index in keys) {
            if (!keys[index] || keys[index].startsWith('!')) {
                continue;
            }
            this.rows ++;
        }
    }

    initColMap () {
        const keys = Object.keys(this.sheet);
        for (const index in keys) {
            const key = keys[index];
            if (key.startsWith('!')) continue;
            const numberL = key.match(/\d+$/)[0];
            const row = parseInt(numberL, 0);
            if (row === 2) {
                if (this.sheet[key] && this.sheet[key].v) {
                    const colChar = key.match(/^[A-Za-z]+/)[0];
                    const name = this.sheet[key].v;
                    this.colMap[name] = colChar;
                }
            }
        }
    }

    parse () { 
        for (let i = 3; i <= this.rows; i++) {
            const rowData: anyObj = {};
            for (const name in this.colMap) {
                const char = this.colMap[name];
                const key = char + i;
                const cellData = this.getCellData(this.sheet[key], i, name);
                if (!!cellData) rowData[this.getKey(name)] = cellData;
            }
            this.getRowData(rowData, i);

            for (let i = 0; i < this.ignores.length; i++) {
                const key = this.getKey(this.ignores[i]);
                if (key) delete rowData[key];
            }
        }
    }

    getCellData (cell: anyObj, row: number, name: string): any {
        if (!cell || !cell.v) return null;
        let value = cell.v;
        for (const funcName in this.valHandler) {
            const nameArr = this.valHandler[funcName];
            if (nameArr.indexOf(name) >= 0) {
                const func: Function = valHandlers.default[funcName];
                if (func) {
                    return func(value);
                }
            }
        }
        if (value.toString().search(NUM_EXP) === 0) {
            if (typeof value === 'string') {
                value = value.indexOf('.') > 0 ? parseFloat(value) : parseInt(value, 0);
            }
            const numStr = value + '';
            const index = numStr.indexOf('.');
            // 处理到小数点后5位
            if (index > 0 && numStr.length - index > 5) {
                const num1 = Math.round(value * 100000) / 100000;
                const num2 = Math.round(value);
                if (num1 === num2) {
                    value = num2;
                } else {
                    value = num1;
                }
            }
        } else if (typeof value === 'string') {
            value = value.replace(/[\r\n]/g, '');
        }
        return value;
    }

    getRowData (rowData: any, row: number) {
        const idKey = this.getKey(this.idName);
        const id = rowData[idKey];
        if (!id || id === '') return;
        if (this.result[id] != null) {
            console.warn(`${this.input}: 数据结果中已经存在id为[${id}]的数据，将会进行覆盖！[${row}]`);
        }
        this.result[id] = rowData;
    }

    getKey (name: string) {
        if (this.isUglified) return this.colMap[name];
        return name;
    }

    trans () {
        this.initRows();
        this.initColMap();
        this.parse();
    }

}
