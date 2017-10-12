export interface BuilderInterface {
    dirPath: string;
    outDirPath: string;
    readDirFIles: (dirPath: string) => Promise<any>;
}

export interface BuilderOpts {
    input: string;
    out: string;
    idName: string;
    transer?: string;
    valHandler?: {
        strToArr?: string [];
        ignores?: string[];
        strToArrInArr?: string[];
    };
}
