const NUM_EXP = /(^([\-]?[\d]+)$)|(^([\-]?[\d]+\.[\d]+)$)/;

export interface anyObj {
    [propName: string]: any;
}

export interface funcObj {
    [propName: string]: Function;
}

const handlers: funcObj = {
    toStr (value: number | string) {
        return value + '';
    },
    strToArr (value: string) {
        let stringArr = value;
        stringArr = (stringArr + '').replace(/，/g, ','); // 为了防止策划误填，先进行转换
        stringArr = stringArr.trim();
        if (stringArr === '') return null;
        const tempArr = stringArr.split(',');
        const arr = [];
        for (let i = 0, li = tempArr.length; i < li; i++) {
            let v: string | number = tempArr[i].trim();
            if ((v + '').search(NUM_EXP) === 0) {
                v = v.indexOf('.') > 0 ? parseFloat(v) : parseInt(v, 0);
            }
            arr.push(v);
        }
        return arr;
    },
    strToObj (value: string) {
        let stringObj: string = value;
        stringObj = (value + '').replace(/，/g, ',').replace(/：/g, ':'); // 为了防止策划误填，先进行转换
        stringObj = stringObj.trim();
        if (stringObj === '') return null;
        const obj: anyObj = {};
        const tempArr0 = stringObj.split(',');
        for (let i = 0, li = tempArr0.length; i < li; ++i) {
            const strI = tempArr0[i].trim();
            if (strI === '') {
                continue;
            }
            const tempArr1 = strI.split(':');
            let v: string | number = tempArr1[1];
            if ((v + '').search(NUM_EXP) === 0) {
                v = v.indexOf('.') > 0 ? parseFloat(v) : parseInt(v, 0);
            }
            obj[tempArr1[0]] = v;
        }
        return obj;
    },
    strToArrInAr (value: string) {
        let stringArr = value;
        stringArr = (value + '').replace(/，/g, ',').replace(/；/g, ';'); // 为了防止策划误填，先进行转换
        stringArr = stringArr.trim();
        if (stringArr === '') return null;
        const arr = [];
        const tempArr0 = stringArr.split(';');
        for (let i = 0, li = tempArr0.length; i < li; ++i) {
            const strI = tempArr0[i].trim();
            if (strI === '') {
                continue;
            }
            const tempArr1 = strI.split(',');
            const arr1 = [];
            for (let j = 0, lj = tempArr1.length; j < lj; j++) {
                let v: string | number = tempArr1[j].trim();
                if ((v + '').search(NUM_EXP) === 0) {
                    v = v.indexOf('.') > 0 ? parseFloat(v) : parseInt(v, 0);
                }
                arr1.push(v);
            }
            arr.push(arr1);
        }
        return arr;
    },
};

export default handlers;
